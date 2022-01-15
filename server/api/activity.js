var utils = require('../common/utils.js');
var consts = require('../common/consts.js');

module.exports = {

  get_lookups(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl('/activity/api/calculator/viewer/get_lookups'),
      data,
      utils.getCommonHeaders(req)
    )
  },

  get_pool_miners(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl(`/data/api/miner/get_miner_list`),
      data,
      utils.getCommonHeaders(req)
    )
  },

  get_pool_overview(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl(`/activity/api/dashboard/v2/get_pool_overview`),
      data,
      utils.getCommonHeaders(req)
    )
  }

}