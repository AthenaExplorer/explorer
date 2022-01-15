import Vue from 'vue'
import utils from '@/static/utils.js'


Vue.filter('formatDate', function(...args) {
  if(!args[0]) return utils.formatOverview('')
  args[0] = new Date(args[0])
  return utils.formatDate.apply(utils, args)
})

Vue.filter('formatFil', function(...args) {
  return utils.formatFil.apply(utils, args)
})

Vue.filter('formatTrueFil', function(...args) {
  return utils.formatTrueFil.apply(utils, args)
})

Vue.filter('formatEasyFil', function(...args) {
  return utils.formatEasyFil.apply(utils, args)
})

Vue.filter('formatPower', function(...args) {
  return utils.formatPower.apply(utils, args)
})

Vue.filter('formatterAmount', function(...args) {
  return utils.formatterAmount.apply(utils, args)
})

Vue.filter('formatOverview', function(...args) {
  return utils.formatOverview.apply(utils, args)
})

Vue.filter('formatPercentage', function(...args) {
  return utils.formatPercentage.apply(utils, args)
})

Vue.filter('formatNumberFixed', function(...args) {
  return utils.formatNumberFixed.apply(utils, args)
})

Vue.filter('getTipsetTime', function(...args) {
  return utils.getTipsetTime.apply(utils, args)
})

Vue.filter('piece_size', function(...args) {
  return utils.piece_size.apply(utils, args)
})

Vue.filter('getSubStr', function(...args) {
  return utils.getSubStr.apply(utils, args)
})

Vue.filter('PhoneGetSubStr', function(...args) {
  return utils.PhoneGetSubStr.apply(utils, args)
})

Vue.filter('getProSubStr', function(...args) {
  return utils.getProSubStr.apply(utils, args)
})

Vue.filter('GetPercentEasy', function(...args) {
  return utils.GetPercentEasy.apply(utils, args)
})

Vue.filter('messageListType', function(...args) {
  return utils.messageListType.apply(utils, args)
})

Vue.filter('getAllSubStr', function(...args) {
  return utils.getAllSubStr.apply(utils, args)
})

Vue.prototype.$_utils = utils
