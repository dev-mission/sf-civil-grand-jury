'use strict';

const express = require('express');
const router = express.Router();
const models = require('../models');
const fs = require('fs');

router.get('/logout', function(req,res,next){
  req.logout();
  req.flash('info', 'You have been logged out.');
  res.redirect('/');
});

router.get('/*', function(req, res, next) {
  const webpackStats = JSON.parse(fs.readFileSync('./client/webpack-stats.json'));
  res.render('index', {
    webpackStats: webpackStats,
  });
});

module.exports = router;
