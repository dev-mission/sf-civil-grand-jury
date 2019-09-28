'use strict';

const express = require('express');
const router = express.Router();
const models = require('../models');


router.get('/', async function(req, res, next) {
  const reports = await models.Report.findAll({
    attributes: [models.sequelize.fn('DISTINCT', models.sequelize.col('year')), 'year'],
    order: [['year', 'DESC']]
  });
  const year = req.query.year || reports[0].year;
  const responses = await models.RecommendationAssignmentResponse.findAll({
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
          }
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
    where: {
      '$assignment.recommendation.report.year$': year
    }
  });
  res.render('index', {year, reports, responses});
});

router.get('/logout', function(req,res,next){
  req.logout();
  req.flash('info', 'You have been logged out.');
  res.redirect('/');
});

module.exports = router;
