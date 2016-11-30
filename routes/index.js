var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Task = mongoose.model('Task');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/tasks');
});

module.exports = router;
