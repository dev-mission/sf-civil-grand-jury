'use strict';

const express = require('express');
const _ = require('lodash');
const models = require('../../models');

const router = express.Router();


router.get('/', async function(req, res, next) {
  const STATUS_NO_RESPONSE = await models.Status.findOne({where: {value: models.Status.VALUE_NO_RESPONSE}});
  const STATUS_IMPLEMENTED = await models.Status.findOne({where: {value: models.Status.VALUE_IMPLEMENTED}});
  const STATUS_NOT_IMPLEMENTED = await models.Status.findOne({where: {value: models.Status.VALUE_NOT_IMPLEMENTED}});

  const reports = await models.Report.findAll({
    attributes: [models.sequelize.fn('DISTINCT', models.sequelize.col('year')), 'year'],
    order: [['year', 'DESC']]
  });
  const year = req.query.year || reports[0].year;
  let assignments = await models.RecommendationAssignment.findAll({
    include: [
      {
        model: models.Recommendation,
        as: 'recommendation',
        include: [
          {
            model: models.Report,
            as: 'report'
          }
        ]
      },
      {
        model: models.RecommendationAssignmentResponse,
        as: 'responses',
        include: [
          {
            model: models.Status,
            as: 'normalizedStatus'
          }
        ]
      },
    ],
    order: [
      [{model: models.Recommendation, as: 'recommendation'}, {model: models.Report, as: 'report'}, 'year', 'DESC'],
      [{model: models.Recommendation, as: 'recommendation'}, {model: models.Report, as: 'report'}, 'title', 'ASC'],
      [{model: models.Recommendation, as: 'recommendation'}, 'code', 'ASC'],
      ['assignee', 'ASC'],
    ],
    where: {
      '$recommendation.report.year$': year
    }
  });
  assignments = _.compact(_.map(assignments, function(assignment) {
    assignment.responses.sort(function(a, b) {
      a = parseInt(a.year);
      b = parseInt(b.year);
      if (a > b) {
        return -1;
      } else if (a < b) {
        return 1;
      }
      return 0;
    });
    assignment.responses = _.compact(_.map(assignment.responses, function(response) {
      if (response.statusId == STATUS_NO_RESPONSE.id) {
        return null;
      }
      return response;
    }));
    if (assignment.responses.length > 0) {
      const response = assignment.responses[0];
      if (response.statusId == STATUS_IMPLEMENTED.id || response.statusId == STATUS_NOT_IMPLEMENTED.id) {
        return null;
      }
    }
    return assignment;
  }));
  res.render('reports/unresolved', {year, reports, assignments});
});

module.exports = router;
