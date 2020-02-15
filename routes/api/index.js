'use strict'

const express = require('express');
const router = express.Router();
const interceptors = require('../interceptors');

const reportsRouter = require('./reports');
const responsesRouter = require('./responses');
const statusesRouter = require('./statuses');
const uploadsRouter = require('./uploads');
const usersRouter = require('./users');

router.use('/reports', reportsRouter);
router.use('/responses', responsesRouter);
router.use('/statuses', statusesRouter);
router.use('/uploads', interceptors.requireLogin);
router.use('/uploads', uploadsRouter);
router.use('/users', interceptors.requireLogin);
router.use('/users', usersRouter);

module.exports = router;
