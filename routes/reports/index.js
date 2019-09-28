const express = require('express');
const router = express.Router();

const unresolvedRouter = require('./unresolved');

router.use('/unresolved', unresolvedRouter);

module.exports = router;
