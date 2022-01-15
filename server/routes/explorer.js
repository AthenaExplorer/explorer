const express = require('express');
var router = express.Router();

var expApi = require('../api/explorer.js');
var utils = require('../common/utils.js')


router.post('/get_miner_index', function (req, res, next) {
  expApi.get_miner_index(req.body, req).then(data => { res.send(data) });
});

router.post('/get_miner_index_line', function (req, res, next) {
  expApi.get_miner_index_line(req.body, req).then(data => { res.send(data) });
});

router.post('/get_miner_ranking', function (req, res, next) {
  expApi.get_miner_ranking(req.body, req).then(data => { res.send(data) });
})

router.post('/get_miner_overview_by_no', function (req, res, next) {
  expApi.get_miner_overview_by_no(req.body, req).then(data => { res.send(data) });
})

router.post('/get_transfer_list_by_no', function (req, res, next) {
  expApi.get_transfer_list_by_no(req.body, req).then(data => { res.send(data) });
})

router.post('/get_tipsets', function (req, res, next) {
  expApi.get_tipsets(req.body, req).then(data => { res.send(data) });
})

router.post('/get_tipset_info', function (req, res, next) {
  expApi.get_tipset_info(req.body, req).then(data => { res.send(data) });
})

router.post('/get_block_by_cid', function (req, res, next) {
  expApi.get_block_by_cid(req.body, req).then(data => { res.send(data) });
})

router.post('/get_block_message', function (req, res, next) {
  expApi.get_block_message(req.body, req).then(data => { res.send(data) });
})

router.post('/get_memory_pool_message', function (req, res, next) {
  expApi.get_memory_pool_message(req.body, req).then(data => { res.send(data) });
})

router.post('/get_message_list', function (req, res, next) {
  expApi.get_message_list(req.body, req).then(data => { res.send(data) });
})

router.post('/get_message_detail', function (req, res, next) {
  expApi.get_message_detail(req.body, req).then(data => { res.send(data) });
})

router.post('/get_base_fee_trends', function (req, res, next) {
  expApi.get_base_fee_trends(req.body, req).then(data => { res.send(data) });
})

router.post('/get_overview', function (req, res, next) {
  expApi.get_overview(req.body, req).then(data => { res.send(data) });
})

router.post('/get_overview_day_records', function (req, res, next) {
  expApi.get_overview_day_records(req.body, req).then(data => { res.send(data) });
})

router.post('/get_miner_list_by_raw_power', function (req, res, next) {
  expApi.get_miner_list_by_raw_power(req.body, req).then(data => { res.send(data) });
})

router.post('/get_miner_list_by_power_inc', function (req, res, next) {
  expApi.get_miner_list_by_power_inc(req.body, req).then(data => { res.send(data) });
})

router.post('/get_miner_list_by_block', function (req, res, next) {
  expApi.get_miner_list_by_block(req.body, req).then(data => { res.send(data) });
})

router.post('/get_miner_list_by_avg_reward', function (req, res, next) {
  expApi.get_miner_list_by_avg_reward(req.body, req).then(data => { res.send(data) });
})

router.post('/get_gas_cost_stat', function (req, res, next) {
  expApi.get_gas_cost_stat(req.body, req).then(data => { res.send(data) });
})

router.post('/get_index_details', function (req, res, next) {
  expApi.get_index_details(req.body, req).then(data => { res.send(data) });
})

router.post('/get_index_scores', function (req, res, next) {
  expApi.get_index_scores(req.body, req).then(data => { res.send(data) });
})

router.post('/get_latitude_score', function (req, res, next) {
  expApi.get_latitude_score(req.body, req).then(data => { res.send(data) });
})

router.post('/new_search', function (req, res, next) {
  expApi.new_search(req.body, req).then(data => { res.send(data) });
})

router.post('/search_miner_or_wallet', function (req, res, next) {
  expApi.search_miner_or_wallet(req.body, req).then(data => { res.send(data) });
})

router.post('/search_miner_type', function (req, res, next) {
  expApi.search_miner_type(req.body, req).then(data => { res.send(data) });
})

router.post('/get_miner_wallet_line_chart_by_no', function (req, res, next) {
  expApi.get_miner_wallet_line_chart_by_no(req.body, req).then(data => { res.send(data) });
})

router.post('/get_miner_tag', function (req, res, next) {
  expApi.get_miner_tag(req.body, req).then(data => { res.send(data) });
})

router.post('/get_deal_list', function (req, res, next) {
  expApi.get_deal_list(req.body, req).then(data => { res.send(data) });
})

router.post('/get_deal_info', function (req, res, next) {
  expApi.get_deal_info(req.body, req).then(data => { res.send(data) });
})

router.post('/get_miner_mining_stats_by_no', function (req, res, next) {
  expApi.get_miner_mining_stats_by_no(req.body, req).then(data => { res.send(data) });
})

router.post('/get_miner_apply_tag', function (req, res, next) {
  expApi.get_miner_apply_tag(req.body, req).then(data => { res.send(data) });
})

router.post('/set_miner_apply_tag', function (req, res, next) {
  expApi.set_miner_apply_tag(req.body, req).then(data => { res.send(data) });
})

router.post('/get_miner_gas_chart_by_no', function (req, res, next) {
  expApi.get_miner_gas_chart_by_no(req.body, req).then(data => { res.send(data) });
})

router.post('/login', function (req, res, next) {
  req.body.mobile = utils.getDAes(req.body.mobile)
  req.body.password = utils.getDAes(req.body.password)
  expApi.login(req.body, req).then(data => {
    if (data.code == 0) {
      req.session.user = data.data,
        req.session.isLogin = true
    }
    res.send(data)
  });
})

router.post('/get_user_info', function (req, res, next) {
  if (req.session.isLogin) {
    req.session.user.lang = req.cookies.lang
    res.send(utils.formatReturn(0, req.session.user))
  } else {
    res.send(utils.formatReturn(99905, req.cookies.lang))
  }
})

router.post('/get_lang', function (req, res, next) {
  res.send(utils.formatReturn(99905, req.cookies.lang))
})

router.post('/clear_user_info', function (req, res, next) {
  req.session.isLogin = false
  req.session.user = {}
  console.log('清除登录信息====>', req.session)
  res.send(utils.formatReturn(0, req.session.isLogin))

})

router.post('/register_explorer', function (req, res, next) {
  expApi.register_explorer(req.body, req).then(data => { res.send(data) });
})

router.post('/get_register_vercode', function (req, res, next) {
  expApi.get_register_vercode(req.body, req).then(data => { res.send(data) });
})

router.post('/get_mobile_prefix', function (req, res, next) {
  expApi.get_mobile_prefix(req.body, req).then(data => { res.send(data) });
})

router.post('/get_collectible_miner', function (req, res, next) {
  let user = req.session.user || {}
  expApi.get_collectible_miner(req.body, req, user.token).then(data => { res.send(data) });
})

router.post('/add_collectible_miner', function (req, res, next) {
  let user = req.session.user || {}
  expApi.add_collectible_miner(req.body, req, user.token).then(data => { res.send(data) });
})

router.post('/get_pro_user_info', function (req, res, next) {
  let user = req.session.user || {}
  expApi.get_pro_user_info(req.body, req, user.token).then(data => { res.send(data) });
})

router.post('/get_change_password_vercode', function (req, res, next) {
  let user = req.session.user || {}
  expApi.get_change_password_vercode(req.body, req, user.token).then(data => { res.send(data) });
})

router.post('/change_password', function (req, res, next) {
  let user = req.session.user || {}
  expApi.change_password(req.body, req, user.token).then(data => { res.send(data) });
})

router.post('/get_collectible_miner_list', function (req, res, next) {
  let user = req.session.user || {}
  expApi.get_collectible_miner_list(req.body, req, user.token).then(data => { res.send(data) });
})

router.post('/del_collectible_miner', function (req, res, next) {
  let user = req.session.user || {}
  expApi.del_collectible_miner(req.body, req, user.token).then(data => { res.send(data) });
})

router.post('/add_collectible_wallet_address', function (req, res, next) {
  let user = req.session.user || {}
  expApi.add_collectible_wallet_address(req.body, req, user.token).then(data => { res.send(data) });
})

router.post('/get_collectible_address_list', function (req, res, next) {
  let user = req.session.user || {}
  expApi.get_collectible_address_list(req.body, req, user.token).then(data => { res.send(data) });
})

router.post('/del_collectible_wallet_address', function (req, res, next) {
  let user = req.session.user || {}
  expApi.del_collectible_wallet_address(req.body, req, user.token).then(data => { res.send(data) });
})

router.post('/get_set_mobile_vercode', function (req, res, next) {
  let user = req.session.user || {}
  expApi.get_set_mobile_vercode(req.body, req, user.token).then(data => { res.send(data) });
})

router.post('/set_mobile', function (req, res, next) {
  let user = req.session.user || {}
  expApi.set_mobile(req.body, req, user.token).then(data => { res.send(data) });
})

router.post('/get_collectible_status', function (req, res, next) {
  let user = req.session.user || {}
  expApi.get_collectible_status(req.body, req, user.token).then(data => { res.send(data) });
})

router.post('/update_collectible', function (req, res, next) {
  let user = req.session.user || {}
  expApi.update_collectible(req.body, req, user.token).then(data => { res.send(data) });
})

router.post('/get_miner_day_gas_list_by_no', function (req, res, next) {
  expApi.get_miner_day_gas_list_by_no(req.body, req).then(data => { res.send(data) });
})

router.post('/get_miner_gas_by_no', function (req, res, next) {
  expApi.get_miner_gas_by_no(req.body, req).then(data => { res.send(data) });
})

router.post('/get_sms_login_explorer_vercode', function (req, res, next) {
  expApi.get_sms_login_explorer_vercode(req.body, req).then(data => { res.send(data) });
})

router.post('/sms_login', function (req, res, next) {
  expApi.sms_login(req.body, req).then(data => {
    if (data.code == 0) {
      req.session.user = data.data,
      req.session.isLogin = true
    }
    res.send(data)
  });
})

router.post('/sms_login_explorer', function (req, res, next) {
  expApi.sms_login_explorer(req.body, req).then(data => { 
    if (data.code == 0) {
      req.session.user = data.data,
      req.session.isLogin = true
    }
    res.send(data) 
  });
})

router.post('/miner_health_report_24h', function (req, res, next) {
  let user = req.session.user || {}
  expApi.miner_health_report_24h(req.body, req, user.token).then(data => { res.send(data) });
})

router.post('/miner_health_report_days', function (req, res, next) {
  let user = req.session.user || {}
  expApi.miner_health_report_days(req.body, req, user.token).then(data => { res.send(data) });
})

router.post('/miner_health_report_gas_stat', function (req, res, next) {
  let user = req.session.user || {}
  expApi.miner_health_report_gas_stat(req.body, req, user.token).then(data => { res.send(data) });
})

router.post('/miner_health_report_messages_stat', function (req, res, next) {
  let user = req.session.user || {}
  expApi.miner_health_report_messages_stat(req.body, req, user.token).then(data => { res.send(data) });
})

router.post('/get_miner_health_report_stats', function (req, res, next) {
  let user = req.session.user || {}
  expApi.get_miner_health_report_stats(req.body, req, user.token).then(data => { res.send(data) });
})

router.post('/miner_health_report_wallet_estimated_day', function (req, res, next) {
  let user = req.session.user || {}
  expApi.miner_health_report_wallet_estimated_day(req.body, req, user.token).then(data => { res.send(data) });
})

router.post('/get_miner_monitor', function (req, res, next) {
  let user = req.session.user || {}
  expApi.get_miner_monitor(req.body, req, user.token).then(data => { res.send(data) });
})

router.post('/create_update_miner_monitor', function (req, res, next) {
  let user = req.session.user || {}
  expApi.create_update_miner_monitor(req.body, req, user.token).then(data => { res.send(data) });
})

router.post('/del_miner_monitor', function (req, res, next) {
  let user = req.session.user || {}
  expApi.del_miner_monitor(req.body, req, user.token).then(data => { res.send(data) });
})

router.post('/del_warn_mobile', function (req, res, next) {
  let user = req.session.user || {}
  expApi.del_warn_mobile(req.body, req, user.token).then(data => { res.send(data) });
})

router.post('/get_warn_mobile', function (req, res, next) {
  let user = req.session.user || {}
  expApi.get_warn_mobile(req.body, req, user.token).then(data => { res.send(data) });
})

router.post('/add_warn_mobile', function (req, res, next) {
  let user = req.session.user || {}
  expApi.add_warn_mobile(req.body, req, user.token).then(data => { res.send(data) });
})

router.post('/set_warn_mobile', function (req, res, next) {
  let user = req.session.user || {}
  expApi.set_warn_mobile(req.body, req, user.token).then(data => { res.send(data) });
})

router.post('/get_change_mobile_vercode', function (req, res, next) {
  let user = req.session.user || {}
  expApi.get_change_mobile_vercode(req.body, req, user.token).then(data => { res.send(data) });
})

router.post('/get_invite_info', function (req, res, next) {
  let user = req.session.user || {}
  expApi.get_invite_info(req.body, req, user.token).then(data => { res.send(data) });
})

router.post('/get_invite_record_list', function (req, res, next) {
  let user = req.session.user || {}
  expApi.get_invite_record_list(req.body, req, user.token).then(data => { res.send(data) });
})

router.post('/get_reward_record_list', function (req, res, next) {
  let user = req.session.user || {}
  expApi.get_reward_record_list(req.body, req, user.token).then(data => { res.send(data) });
})

router.post('/update_pro_tips_flag', function (req, res, next) {
  let user = req.session.user || {}
  expApi.update_pro_tips_flag(req.body, req, user.token).then(data => { res.send(data) });
})

router.post('/get_pool_miner_list', function (req, res, next) {
  expApi.get_pool_miner_list(req.body, req).then(data => { res.send(data) });
})

router.post('/get_calculate_block_and_reward', function (req, res, next) {
  expApi.get_calculate_block_and_reward(req.body, req).then(data => { res.send(data) });
})

router.post('/get_overview_stat', function (req, res, next) {
  expApi.get_overview_stat(req.body, req).then(data => { res.send(data) });
})

router.post('/get_overview_day_list', function (req, res, next) {
  expApi.get_overview_day_list(req.body, req).then(data => { res.send(data) });
})

router.post('/get_gas_trends', function (req, res, next) {
  expApi.get_gas_trends(req.body, req).then(data => { res.send(data) });
})

router.post('/get_gas_stat_all', function (req, res, next) {
  expApi.get_gas_stat_all(req.body, req).then(data => { res.send(data) });
})

router.post('/get_overview_power_trends', function (req, res, next) {
  expApi.get_overview_power_trends(req.body, req).then(data => { res.send(data) });
})

router.post('/get_overview_stat_list', function (req, res, next) {
  expApi.get_overview_stat_list(req.body, req).then(data => { res.send(data) });
})

router.post('/get_overview_stat_trends', function (req, res, next) {
  expApi.get_overview_stat_trends(req.body, req).then(data => { res.send(data) });
})

router.post('/get_mpool_list', function (req, res, next) {
  expApi.get_mpool_list(req.body, req).then(data => { res.send(data) });
})

router.post('/get_message_method_list', function (req, res, next) {
  expApi.get_message_method_list(req.body, req).then(data => { res.send(data) });
})

router.post('/get_wallets_list', function (req, res, next) {
  expApi.get_wallets_list(req.body, req).then(data => { res.send(data) });
})

router.post('/get_message_info', function (req, res, next) {
  expApi.get_message_info(req.body, req).then(data => { res.send(data) });
})

router.post('/get_block_info', function (req, res, next) {
  expApi.get_block_info(req.body, req).then(data => { res.send(data) });
})

router.post('/get_wallet_info', function (req, res, next) {
  expApi.get_wallet_info(req.body, req).then(data => { res.send(data) });
})

router.post('/get_wallet_record', function (req, res, next) {
  expApi.get_wallet_record(req.body, req).then(data => { res.send(data) });
})

router.post('/get_price', function (req, res, next) {
  expApi.get_price(req.body, req).then(data => { res.send(data) });
})

router.post('/get_miner_ranking_list_by_power', function (req, res, next) {
  expApi.get_miner_ranking_list_by_power(req.body, req).then(data => { res.send(data) });
})

router.post('/get_miner_ranking_list', function (req, res, next) {
  expApi.get_miner_ranking_list(req.body, req).then(data => { res.send(data) });
})

router.post('/search', function (req, res, next) {
  expApi.search(req.body, req).then(data => { res.send(data) });
})

router.post('/get_miner_by_no', function (req, res, next) {
  expApi.get_miner_by_no(req.body, req).then(data => { res.send(data) });
})

router.post('/get_miner_stats_by_no', function (req, res, next) {
  expApi.get_miner_stats_by_no(req.body, req).then(data => { res.send(data) });
})

router.post('/get_miner_gas_stats_by_no', function (req, res, next) {
  expApi.get_miner_gas_stats_by_no(req.body, req).then(data => { res.send(data) });
})

router.post('/get_miner_line_chart_by_no', function (req, res, next) {
  expApi.get_miner_line_chart_by_no(req.body, req).then(data => { res.send(data) });
})

router.post('/get_transfer_list', function (req, res, next) {
  expApi.get_transfer_list(req.body, req).then(data => { res.send(data) });
})

router.post('/get_transfer_method_list', function (req, res, next) {
  expApi.get_transfer_method_list(req.body, req).then(data => { res.send(data) });
})

router.post('/get_miner_blocks', function (req, res, next) {
  expApi.get_miner_blocks(req.body, req).then(data => { res.send(data) });
})

router.post('/get_miners_by_address', function (req, res, next) {
  expApi.get_miners_by_address(req.body, req).then(data => { res.send(data) });
})

router.post('/get_mpool_info', function (req, res, next) {
  expApi.get_mpool_info(req.body, req).then(data => { res.send(data) });
})

router.post('/get_datacap_dashboard', function (req, res, next) {
  expApi.get_datacap_dashboard(req.body, req).then(data => { res.send(data) });
})

router.post('/get_datacap_stats', function (req, res, next) {
  expApi.get_datacap_stats(req.body, req).then(data => { res.send(data) });
})

router.post('/get_notaries_list', function (req, res, next) {
  expApi.get_notaries_list(req.body, req).then(data => { res.send(data) });
})

router.post('/get_plus_client_list', function (req, res, next) {
  expApi.get_plus_client_list(req.body, req).then(data => { res.send(data) });
})

router.post('/get_provider_list', function (req, res, next) {
  expApi.get_provider_list(req.body, req).then(data => { res.send(data) });
})

router.post('/get_miner_pool_ranking_list', function (req, res, next) {
  expApi.get_miner_pool_ranking_list(req.body, req).then(data => { res.send(data) });
})

router.post('/get_miner_pool_by_owner_id', function (req, res, next) {
  expApi.get_miner_pool_by_owner_id(req.body, req).then(data => { res.send(data) });
})

router.post('/get_miner_pool_stats_by_owner_id', function (req, res, next) {
  expApi.get_miner_pool_stats_by_owner_id(req.body, req).then(data => { res.send(data) });
})

router.post('/get_miner_pool_gas_by_owner_id', function (req, res, next) {
  expApi.get_miner_pool_gas_by_owner_id(req.body, req).then(data => { res.send(data) });
})

router.post('/get_miner_pool_line_chart_by_owner_id', function (req, res, next) {
  expApi.get_miner_pool_line_chart_by_owner_id(req.body, req).then(data => { res.send(data) });
})

router.post('/get_is_wallet', function (req, res, next) {
  expApi.get_is_wallet(req.body, req).then(data => { res.send(data) });
})

router.post('/get_wallet_message_list', function (req, res, next) {
  expApi.get_wallet_message_list(req.body, req).then(data => { res.send(data) });
})

router.post('/get_tag_status', function (req, res, next) {
  expApi.get_tag_status(req.body, req).then(data => { res.send(data) });
})

router.post('/get_wallet_flow_list', function (req, res, next) {
  expApi.get_wallet_flow_list(req.body, req).then(data => { res.send(data) });
})

router.post('/get_deal_stat', function (req, res, next) {
  expApi.get_deal_stat(req.body, req).then(data => { res.send(data) });
})

router.post('/get_deal_day', function (req, res, next) {
  expApi.get_deal_day(req.body, req).then(data => { res.send(data) });
})

module.exports = router;