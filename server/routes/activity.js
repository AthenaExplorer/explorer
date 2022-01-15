const express = require('express');
var router = express.Router();

var actApi = require('../api/activity.js');

router.post('/get_lookups', function(req, res, next) {
  let today = Math.floor((new Date() - new Date('2020/08/25 06:00:00')) / (24 * 60 * 60 * 1000)) - 30
  actApi.get_lookups(req.body, req).then(data => { 
    let _data = data.data.slice(today, (data.data.length - 210))
    data.data = _data
    res.send(data) });
});

router.post('/get_pool_miners', function(req, res, next) {
  req.body['is_pool'] = 1
  actApi.get_pool_miners(req.body, req).then(data => { res.send(data) });
});

router.post('/get_pool_overview', function(req, res, next) {
  actApi.get_pool_overview(req.body, req).then(data => { res.send(data) });
});

module.exports = router;