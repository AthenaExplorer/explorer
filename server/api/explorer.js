var utils = require('../common/utils.js');
var consts = require('../common/consts.js');

module.exports = {

  get_miner_index(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl(`/explorer/api/exponent/get_miner_index`),
      data,
      utils.getCommonHeaders(req)
    )
  },

  get_miner_index_line(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl(`/explorer/api/exponent/get_miner_index_line`),
      data,
      utils.getCommonHeaders(req)
    )
  },

  get_miner_ranking(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl(`/explorer/api/exponent/get_miner_ranking`),
      data,
      utils.getCommonHeaders(req)
    )
  },

  get_miner_overview_by_no(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl(`/explorer/api/detail/get_miner_overview_by_no`),
      data,
      utils.getCommonHeaders(req)
    )
  },

  get_transfer_list_by_no(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl(`/explorer/api/detail/get_transfer_list_by_no`),
      data,
      utils.getCommonHeaders(req)
    )
  },

  get_tipsets(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl(`/explorer_v2/block_chain/get_tipsets`),
      data,
      utils.getCommonHeaders(req)
    )
  },

  get_tipset_info(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl(`/explorer_v2/block_chain/get_tipset_info`),
      data,
      utils.getCommonHeaders(req)
    )
  },

  get_block_by_cid(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl(`/explorer/api/detail/get_block_by_cid`),
      data,
      utils.getCommonHeaders(req)
    )
  },

  get_block_message(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl(`/explorer/api/detail/get_block_message`),
      data,
      utils.getCommonHeaders(req)
    )
  },

  get_memory_pool_message(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl(`/explorer/api/master_overview/get_memory_pool_message`),
      data,
      utils.getCommonHeaders(req)
    )
  },

  get_message_list(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl(`/explorer_v2/block_chain/get_message_list`),
      data,
      utils.getCommonHeaders(req)
    )
  },

  get_message_detail(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl(`/explorer/api/detail/get_message_detail`),
      data,
      utils.getCommonHeaders(req)
    )
  },

  get_base_fee_trends(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl(`/explorer/api/master_overview/get_base_fee_trends`),
      data,
      utils.getCommonHeaders(req)
    )
  },

  get_overview(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl(`/explorer_v2/homepage/get_overview`),
      data,
      utils.getCommonHeaders(req)
    )
  },

  get_overview_day_records(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl(`/explorer/api/master_overview/get_overview_day_records`),
      data,
      utils.getCommonHeaders(req)
    )
  },

  get_miner_list_by_raw_power(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl(`/explorer/api/master_overview/get_miner_list_by_raw_power`),
      data,
      utils.getCommonHeaders(req)
    )
  },

  get_miner_list_by_power_inc(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl(`/explorer/api/master_overview/get_miner_list_by_power_inc`),
      data,
      utils.getCommonHeaders(req)
    )
  },

  get_miner_list_by_avg_reward(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl(`/explorer/api/master_overview/get_miner_list_by_avg_reward`),
      data,
      utils.getCommonHeaders(req)
    )
  },

  get_miner_list_by_block(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl(`/explorer/api/master_overview/get_miner_list_by_block`),
      data,
      utils.getCommonHeaders(req)
    )
  },

  get_gas_cost_stat(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl(`/explorer/api/master_overview/get_gas_cost_stat`),
      data,
      utils.getCommonHeaders(req)
    )
  },

  get_index_details(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl(`/explorer/api/index/details`),
      data,
      utils.getCommonHeaders(req)
    )
  },

  get_index_scores(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl(`/explorer/api/index/scores`),
      data,
      utils.getCommonHeaders(req)
    )
  },

  get_latitude_score(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl(`/explorer/api/index/latitude_score`),
      data,
      utils.getCommonHeaders(req)
    )
  },

  new_search(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl(`/explorer/api/master_overview/search`),
      data,
      utils.getCommonHeaders(req)
    )
  },

  search_miner_type(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl(`/explorer_v2/common/search_miner_type`),
      data,
      utils.getCommonHeaders(req)
    )
  },

  get_miner_wallet_line_chart_by_no(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl(`/explorer/api/detail/get_miner_wallet_line_chart_by_no`),
      data,
      utils.getCommonHeaders(req)
    )
  },

  get_miner_tag(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl(`/explorer/api/master_overview/get_miner_tag`),
      data,
      utils.getCommonHeaders(req)
    )
  },

  get_deal_list(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl(`/explorer_v2/block_chain/get_deal_list`),
      data,
      utils.getCommonHeaders(req)
    )
  },

  get_deal_info(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl(`/explorer_v2/block_chain/get_deal_info`),
      data,
      utils.getCommonHeaders(req)
    )
  },

  get_miner_mining_stats_by_no(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl(`/explorer/api/detail/get_miner_mining_stats_by_no`),
      data,
      utils.getCommonHeaders(req)
    )
  },

  get_miner_apply_tag(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl(`/explorer/api/master_overview/get_miner_apply_tag`),
      data,
      utils.getCommonHeaders(req)
    )
  },

  set_miner_apply_tag(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl(`/explorer/api/master_overview/set_miner_apply_tag`),
      data,
      utils.getCommonHeaders(req)
    )
  },

  get_miner_gas_chart_by_no(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl(`/explorer/api/detail/get_miner_gas_chart_by_no`),
      data,
      utils.getCommonHeaders(req)
    )
  },

  login(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl('/account/api/login'),
      data,
      utils.getCommonHeaders(req)
    )
  },

  register_explorer(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl('/account/api/register_explorer'),
      data,
      utils.getCommonHeaders(req)
    )
  },

  get_register_vercode(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl('/account/api/get_register_vercode'),
      data,
      utils.getCommonHeaders(req)
    )
  },

  get_mobile_prefix(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl('/account/api/get_mobile_prefix'),
      data,
      utils.getCommonHeaders(req)
    )
  },

  get_collectible_miner(data, req, token) {
    return utils.promiseRequest(
      utils.getServerUrl('/explorer/api/pro/get_collectible_miner'),
      data,
      utils.getCommonHeaders(req, token)
    )
  },

  add_collectible_miner(data, req, token) {
    return utils.promiseRequest(
      utils.getServerUrl('/explorer/api/pro/add_collectible_miner'),
      data,
      utils.getCommonHeaders(req, token)
    )
  },

  get_pro_user_info(data, req, token) {
    return utils.promiseRequest(
      utils.getServerUrl('/explorer/api/pro/get_pro_user_info'),
      data,
      utils.getCommonHeaders(req, token)
    )
  },

  get_change_password_vercode(data, req, token) {
    return utils.promiseRequest(
      utils.getServerUrl('/account/api/get_change_password_vercode'),
      data,
      utils.getCommonHeaders(req, token)
    )
  },

  change_password(data, req, token) {
    return utils.promiseRequest(
      utils.getServerUrl('/account/api/change_password'),
      data,
      utils.getCommonHeaders(req, token)
    )
  },

  get_collectible_miner_list(data, req, token) {
    return utils.promiseRequest(
      utils.getServerUrl('/explorer/api/pro/get_collectible_miner_list'),
      data,
      utils.getCommonHeaders(req, token)
    )
  },

  del_collectible_miner(data, req, token) {
    return utils.promiseRequest(
      utils.getServerUrl('/explorer/api/pro/del_collectible_miner'),
      data,
      utils.getCommonHeaders(req, token)
    )
  },

  add_collectible_wallet_address(data, req, token) {
    return utils.promiseRequest(
      utils.getServerUrl('/explorer/api/pro/add_collectible_wallet_address'),
      data,
      utils.getCommonHeaders(req, token)
    )
  },

  get_collectible_address_list(data, req, token) {
    return utils.promiseRequest(
      utils.getServerUrl('/explorer/api/pro/get_collectible_address_list'),
      data,
      utils.getCommonHeaders(req, token)
    )
  },

  del_collectible_wallet_address(data, req, token) {
    return utils.promiseRequest(
      utils.getServerUrl('/explorer/api/pro/del_collectible_wallet_address'),
      data,
      utils.getCommonHeaders(req, token)
    )
  },

  get_set_mobile_vercode(data, req, token) {
    return utils.promiseRequest(
      utils.getServerUrl('/account/api/get_set_mobile_vercode'),
      data,
      utils.getCommonHeaders(req, token)
    )
  },

  set_mobile(data, req, token) {
    return utils.promiseRequest(
      utils.getServerUrl('/account/api/set_mobile'),
      data,
      utils.getCommonHeaders(req, token)
    )
  },

  get_collectible_status(data, req, token) {
    return utils.promiseRequest(
      utils.getServerUrl('/explorer/api/pro/get_collectible_status'),
      data,
      utils.getCommonHeaders(req, token)
    )
  },

  update_collectible(data, req, token) {
    return utils.promiseRequest(
      utils.getServerUrl('/explorer/api/pro/update_collectible'),
      data,
      utils.getCommonHeaders(req, token)
    )
  },

  get_miner_day_gas_list_by_no(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl('/explorer_v2/miner/get_miner_day_gas_list_by_no'),
      data,
      utils.getCommonHeaders(req)
    )
  },

  get_miner_gas_by_no(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl('/explorer/api/detail/get_miner_gas_by_no'),
      data,
      utils.getCommonHeaders(req)
    )
  },

  get_sms_login_explorer_vercode(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl('/account/api/get_sms_login_explorer_vercode'),
      data,
      utils.getCommonHeaders(req)
    )
  },

  sms_login(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl('/account/api/sms_login'),
      data,
      utils.getCommonHeaders(req)
    )
  },

  miner_health_report_24h(data, req, token) {
    return utils.promiseRequest(
      utils.getServerUrl('/explorer/api/pro/miner_health_report_24h'),
      data,
      utils.getCommonHeaders(req, token)
    )
  },

  miner_health_report_days(data, req, token) {
    return utils.promiseRequest(
      utils.getServerUrl('/explorer/api/pro/miner_health_report_days'),
      data,
      utils.getCommonHeaders(req, token)
    )
  },

  miner_health_report_gas_stat(data, req, token) {
    return utils.promiseRequest(
      utils.getServerUrl('/explorer/api/pro/miner_health_report_gas_stat'),
      data,
      utils.getCommonHeaders(req, token)
    )
  },

  miner_health_report_messages_stat(data, req, token) {
    return utils.promiseRequest(
      utils.getServerUrl('/explorer/api/pro/miner_health_report_messages_stat'),
      data,
      utils.getCommonHeaders(req, token)
    )
  },

  get_miner_health_report_stats(data, req, token) {
    return utils.promiseRequest(
      utils.getServerUrl('/explorer/api/pro/get_miner_health_report_stats'),
      data,
      utils.getCommonHeaders(req, token)
    )
  },

  miner_health_report_wallet_estimated_day(data, req, token) {
    return utils.promiseRequest(
      utils.getServerUrl('/explorer/api/pro/miner_health_report_wallet_estimated_day'),
      data,
      utils.getCommonHeaders(req, token)
    )
  },

  get_miner_monitor(data, req, token) {
    return utils.promiseRequest(
      utils.getServerUrl('/explorer/api/pro/get_miner_monitor'),
      data,
      utils.getCommonHeaders(req, token)
    )
  },

  create_update_miner_monitor(data, req, token) {
    return utils.promiseRequest(
      utils.getServerUrl('/explorer/api/pro/create_update_miner_monitor'),
      data,
      utils.getCommonHeaders(req, token)
    )
  },

  del_miner_monitor(data, req, token) {
    return utils.promiseRequest(
      utils.getServerUrl('/explorer/api/pro/del_miner_monitor'),
      data,
      utils.getCommonHeaders(req, token)
    )
  },

  del_warn_mobile(data, req, token) {
    return utils.promiseRequest(
      utils.getServerUrl('/explorer/api/pro/del_warn_mobile'),
      data,
      utils.getCommonHeaders(req, token)
    )
  },

  get_warn_mobile(data, req, token) {
    return utils.promiseRequest(
      utils.getServerUrl('/explorer/api/pro/get_warn_mobile'),
      data,
      utils.getCommonHeaders(req, token)
    )
  },

  add_warn_mobile(data, req, token) {
    return utils.promiseRequest(
      utils.getServerUrl('/explorer/api/pro/add_warn_mobile'),
      data,
      utils.getCommonHeaders(req, token)
    )
  },

  set_warn_mobile(data, req, token) {
    return utils.promiseRequest(
      utils.getServerUrl('/explorer/api/pro/set_warn_mobile'),
      data,
      utils.getCommonHeaders(req, token)
    )
  },

  get_change_mobile_vercode(data, req, token) {
    return utils.promiseRequest(
      utils.getServerUrl('/explorer/api/pro/get_change_mobile_vercode'),
      data,
      utils.getCommonHeaders(req, token)
    )
  },

  get_invite_info(data, req, token) {
    return utils.promiseRequest(
      utils.getServerUrl('/explorer/api/pro/get_invite_info'),
      data,
      utils.getCommonHeaders(req, token)
    )
  },

  get_invite_record_list(data, req, token) {
    return utils.promiseRequest(
      utils.getServerUrl('/explorer/api/pro/get_invite_record_list'),
      data,
      utils.getCommonHeaders(req, token)
    )
  },

  get_reward_record_list(data, req, token) {
    return utils.promiseRequest(
      utils.getServerUrl('/explorer/api/pro/get_reward_record_list'),
      data,
      utils.getCommonHeaders(req, token)
    )
  },

  update_pro_tips_flag(data, req, token) {
    return utils.promiseRequest(
      utils.getServerUrl('/explorer/api/pro/update_pro_tips_flag'),
      data,
      utils.getCommonHeaders(req, token)
    )
  },

  get_pool_miner_list(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl('/data/api/miner/get_miner_list'),
      data,
      utils.getCommonHeaders(req)
    )
  },

  get_calculate_block_and_reward(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl('/explorer/api/detail/get_calculate_block_and_reward'),
      data,
      utils.getCommonHeaders(req)
    )
  },
  
  get_overview_stat(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl('/explorer_v2/stat/get_overview_stat'),
      data,
      utils.getCommonHeaders(req)
    )
  },

  get_overview_day_list(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl('/explorer_v2/stat/get_overview_day_list'),
      data,
      utils.getCommonHeaders(req)
    )
  },

  get_gas_trends(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl('/explorer_v2/stat/get_gas_trends'),
      data,
      utils.getCommonHeaders(req)
    )
  },

  get_gas_stat_all(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl('/explorer_v2/stat/get_gas_stat_all'),
      data,
      utils.getCommonHeaders(req)
    )
  },

  get_overview_power_trends(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl('/explorer_v2/stat/get_overview_power_trends'),
      data,
      utils.getCommonHeaders(req)
    )
  },

  get_overview_stat_list(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl('/explorer_v2/stat/get_overview_stat_list'),
      data,
      utils.getCommonHeaders(req)
    )
  },

  get_overview_stat_trends(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl('/explorer_v2/stat/get_overview_stat_trends'),
      data,
      utils.getCommonHeaders(req)
    )
  },

  get_mpool_list(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl('/explorer_v2/block_chain/get_mpool_list'),
      data,
      utils.getCommonHeaders(req)
    )
  },

  get_message_method_list(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl('/explorer_v2/block_chain/get_message_method_list'),
      data,
      utils.getCommonHeaders(req)
    )
  },

  get_wallets_list(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl('/explorer_v2/block_chain/get_wallets_list'),
      data,
      utils.getCommonHeaders(req)
    )
  },

  get_message_info(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl('/explorer_v2/block_chain/get_message_info'),
      data,
      utils.getCommonHeaders(req)
    )
  },

  get_block_info(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl('/explorer_v2/block_chain/get_block_info'),
      data,
      utils.getCommonHeaders(req)
    )
  },

  get_wallet_info(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl('/explorer_v2/block_chain/get_wallet_info'),
      data,
      utils.getCommonHeaders(req)
    )
  },

  get_wallet_record(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl('/explorer_v2/block_chain/get_wallet_record'),
      data,
      utils.getCommonHeaders(req)
    )
  },

  get_price(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl('/explorer_v2/common/get_price'),
      data,
      utils.getCommonHeaders(req)
    )
  },

  get_miner_ranking_list_by_power(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl('/explorer_v2/homepage/get_miner_ranking_list_by_power'),
      data,
      utils.getCommonHeaders(req)
    )
  },

  get_miner_ranking_list(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl('/explorer_v2/homepage/get_miner_ranking_list'),
      data,
      utils.getCommonHeaders(req)
    )
  },

  search(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl('/explorer_v2/common/search'),
      data,
      utils.getCommonHeaders(req)
    )
  },

  search_miner_or_wallet(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl(`/explorer_v2/common/search_miner_or_wallet`),
      data,
      utils.getCommonHeaders(req)
    )
  },

  get_miner_by_no(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl(`/explorer_v2/miner/get_miner_by_no`),
      data,
      utils.getCommonHeaders(req)
    )
  },  

  get_miner_stats_by_no(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl(`/explorer_v2/miner/get_miner_stats_by_no`),
      data,
      utils.getCommonHeaders(req)
    )
  },

  get_miner_gas_stats_by_no(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl(`/explorer_v2/miner/get_miner_gas_stats_by_no`),
      data,
      utils.getCommonHeaders(req)
    )
  },

  get_miner_line_chart_by_no(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl(`/explorer_v2/miner/get_miner_line_chart_by_no`),
      data,
      utils.getCommonHeaders(req)
    )
  },

  get_transfer_list(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl(`/explorer_v2/miner/get_transfer_list`),
      data,
      utils.getCommonHeaders(req)
    )
  },

  get_transfer_method_list(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl(`/explorer_v2/miner/get_transfer_method_list`),
      data,
      utils.getCommonHeaders(req)
    )
  },

  get_miner_blocks(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl(`/explorer_v2/miner/get_miner_blocks`),
      data,
      utils.getCommonHeaders(req)
    )
  },

  get_miners_by_address(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl(`/explorer_v2/block_chain/get_miners_by_address`),
      data,
      utils.getCommonHeaders(req)
    )
  },

  get_mpool_info(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl(`/explorer_v2/block_chain/get_mpool_info`),
      data,
      utils.getCommonHeaders(req)
    )
  },

  get_datacap_dashboard(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl(`/explorer_v2/datacap/get_datacap_dashboard`),
      data,
      utils.getCommonHeaders(req)
    )
  },

  get_datacap_stats(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl(`/explorer_v2/datacap/get_datacap_stats`),
      data,
      utils.getCommonHeaders(req)
    )
  },

  get_notaries_list(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl(`/explorer_v2/datacap/get_notaries_list`),
      data,
      utils.getCommonHeaders(req)
    )
  },

  get_plus_client_list(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl(`/explorer_v2/datacap/get_plus_client_list`),
      data,
      utils.getCommonHeaders(req)
    )
  },

  get_provider_list(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl(`/explorer_v2/datacap/get_provider_list`),
      data,
      utils.getCommonHeaders(req)
    )
  },

  get_miner_pool_ranking_list(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl(`/explorer_v2/homepage/get_miner_pool_ranking_list`),
      data,
      utils.getCommonHeaders(req)
    )
  },

  get_miner_pool_by_owner_id(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl(`/explorer_v2/miner_pool/get_miner_pool_by_owner_id`),
      data,
      utils.getCommonHeaders(req)
    )
  },

  get_miner_pool_stats_by_owner_id(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl(`/explorer_v2/miner_pool/get_miner_pool_stats_by_owner_id`),
      data,
      utils.getCommonHeaders(req)
    )
  },

  get_miner_pool_gas_by_owner_id(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl(`/explorer_v2/miner_pool/get_miner_pool_gas_by_owner_id`),
      data,
      utils.getCommonHeaders(req)
    )
  },

  get_miner_pool_line_chart_by_owner_id(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl(`/explorer_v2/miner_pool/get_miner_pool_line_chart_by_owner_id`),
      data,
      utils.getCommonHeaders(req)
    )
  },

  get_is_wallet(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl(`/explorer_v2/tool/get_is_wallet`),
      data,
      utils.getCommonHeaders(req)
    )
  },

  get_wallet_message_list(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl(`/explorer_v2/tool/get_wallet_message_list`),
      data,
      utils.getCommonHeaders(req)
    )
  },

  get_tag_status(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl(`/explorer/api/master_overview/get_tag_status`),
      data,
      utils.getCommonHeaders(req)
    )
  },

  get_wallet_flow_list(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl(`/explorer_v2/tool/get_wallet_flow_list`),
      data,
      utils.getCommonHeaders(req)
    )
  },

  sms_login_explorer(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl(`/account/api/sms_login_explorer`),
      data,
      utils.getCommonHeaders(req)
    )
  },

  get_deal_stat(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl(`/explorer_v2/ecology/get_deal_stat`),
      data,
      utils.getCommonHeaders(req)
    )
  },

    get_deal_day(data, req) {
      return utils.promiseRequest(
        utils.getServerUrl(`/explorer_v2/ecology/get_deal_day`),
        data,
        utils.getCommonHeaders(req)
      )
    },


}