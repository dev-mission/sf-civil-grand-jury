'use strict';

const express = require('express');
const router = express.Router();
const models = require('../../models');
const interceptors = require('../interceptors');
const helpers = require('../helpers');

router.get('/', async function(req, res, next) {
  const statuses = await models.Status.findAll({
    order: [['id', 'ASC']]
  });
  res.json(statuses.map(s => s.toJSON()));
});

module.exports = router;
