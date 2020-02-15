'use strict';

const express = require('express');
const router = express.Router();
const models = require('../../models');
const interceptors = require('../interceptors');
const helpers = require('../helpers');

router.get('/years', async function(req, res, next) {
  const reports = await models.Report.findAll({
    attributes: [models.sequelize.fn('DISTINCT', models.sequelize.col('year')), 'year'],
    order: [['year', 'DESC']]
  });
  res.json(reports.map(r => r.year));
});

module.exports = router;
