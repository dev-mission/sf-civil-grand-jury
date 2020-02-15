'use strict';

const express = require('express');
const router = express.Router();
const models = require('../../models');
const interceptors = require('../interceptors');
const helpers = require('../helpers');

let STATUS_IMPLEMENTED = null;
let STATUS_NOT_IMPLEMENTED = null;

router.get('/', async function(req, res, next) {
  //// initialize consts once
  if (STATUS_IMPLEMENTED == null) {
    STATUS_IMPLEMENTED = await models.Status.findOne({where: {value: models.Status.VALUE_IMPLEMENTED}});
  }
  if (STATUS_NOT_IMPLEMENTED == null) {
    STATUS_NOT_IMPLEMENTED = await models.Status.findOne({where: {value: models.Status.VALUE_NOT_IMPLEMENTED}});
  }
  const query = {
    page: req.query.page || 1,
    include: [
      {
        model: models.RecommendationAssignment,
        as: 'assignment',
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
            as: 'latestResponse'
          },
        ]
      },
      {
        model: models.Status,
        as: 'normalizedStatus'
      }
    ],
    order: [
      [{model: models.RecommendationAssignment, as: 'assignment'}, {model: models.Recommendation, as: 'recommendation'}, {model: models.Report, as: 'report'}, 'year', 'DESC'],
      [{model: models.RecommendationAssignment, as: 'assignment'}, {model: models.Recommendation, as: 'recommendation'}, {model: models.Report, as: 'report'}, 'title', 'ASC'],
      [{model: models.RecommendationAssignment, as: 'assignment'}, {model: models.Recommendation, as: 'recommendation'}, 'code', 'ASC'],
      [{model: models.RecommendationAssignment, as: 'assignment'}, 'assignee', 'ASC'],
      ['year', 'ASC']
    ],
    where: {}
  }
  if (req.query.year) {
    query.where['$assignment.recommendation.report.year$'] = req.query.year;
  }
  if (req.query.status) {
    switch (req.query.status) {
    case '-1':
      query.where['$assignment.latestResponse.status_id$'] = {[models.Sequelize.Op.notIn]: [STATUS_IMPLEMENTED.id, STATUS_NOT_IMPLEMENTED.id]};
      break;
    default:
      query.where['$assignment.latestResponse.status_id$'] = req.query.status;
    }
  }
  if (req.query.search && req.query.search != '') {
    query.where[models.Sequelize.Op.or] = [
      {'$assignment.recommendation.report.title$': {[models.Sequelize.Op.iLike]: `%${req.query.search}%`}},
      {'$assignment.recommendation.content$': {[models.Sequelize.Op.iLike]: `%${req.query.search}%`}},
      {'$assignment.assignee$': {[models.Sequelize.Op.iLike]: `%${req.query.search}%`}},
      {'content': {[models.Sequelize.Op.iLike]: `%${req.query.search}%`}},
    ];
  }
  const {docs, pages, total} = await models.RecommendationAssignmentResponse.paginate(query);
  helpers.setPaginationHeaders(req, res, query.page, pages, total);
  res.json(docs.map(d => d.toJSON()));
});

module.exports = router;
