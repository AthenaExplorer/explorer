var utils = require('../common/utils.js');
var consts = require('../common/consts.js');

module.exports = {

  get_calculate_info(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl('/activity/api/calculator/get_calculate_info'),
      data,
      utils.getCommonHeaders(req)
    )
  },

  get_calculate_sum(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl('/activity/api/calculator/get_calculate_sum'),
      data,
      utils.getCommonHeaders(req)
    )
  },

  get_calculate_sum_v2(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl('/activity/api/calculator/get_calculate_sum_v2'),
      data,
      utils.getCommonHeaders(req)
    )
  }

}