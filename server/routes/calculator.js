const express = require('express');
var router = express.Router();

var calApi = require('../api/calculator.js');

router.post('/get_calculate_info', function(req, res, next) {
  calApi.get_calculate_info(req.body, req).then(data => { res.send(data) });
});


router.post('/get_calculate_sum', function(req, res, next) {
  calApi.get_calculate_sum(req.body, req).then(data => { res.send(data) });
});

router.post('/get_calculate_sum_v2', function(req, res, next) {
  calApi.get_calculate_sum_v2(req.body, req).then(data => { res.send(data) });
});

module.exports = router;