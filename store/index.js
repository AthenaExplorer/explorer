export const state = () => ({
  menu: false,
  globalMinerTag: {},
  globalOverview: {},
  openRRMQurey: {},
  locales: ['ko', 'en','zh','ja'],
  locale: 'zh',
  isSignIn:false,
  isProActive:false,
  userList:{},
  proUserList:{},
  filPrice:{},
  overviewStat:{},
  tagShowFlag:false,
})

export const getters = {
  getMenu: (state) => {
    return state.menu
  },
  getGlobalMinerTag: (state) => {
    return state.globalMinerTag
  },
  getGlobalOverview: (state) => {
    return state.globalOverview
  },
  getFilPrice: (state) => {
    return state.filPrice
  },
  getOverviewStat: (state) => {
    return state.overviewStat
  },
  getOpenRRMQuery: (state) => {
    return state.openRRMQurey
  },
  getIsSignIn: (state) => {
    return state.isSignIn
  },
  getIsProActive: (state) => {
    return state.isProActive
  },
  getUserList: (state) => {
    return state.userList
  },
  getProUserList: (state) => {
    return state.proUserList
  },
  getTagShowFlag: (state) => {
    return state.tagShowFlag
  },
}

export const mutations = {
  setMenu: (state, data) => {
    state.menu = data
  },
  setGlobalMinerTag: (state, data) => {
    state.globalMinerTag = data
  },
  setGlobalOverview: (state, data) => {
    state.globalOverview = data
  },
  setFilPrice: (state, data) => {
    state.filPrice = data
  },
  setOverviewStat: (state, data) => {
    state.overviewStat = data
  },
  setOpenRRMQuery: (state, data) => {
    state.openRRMQurey = data
  },
  SET_LANG(state, locale) {
    if (state.locales.indexOf(locale) !== -1) {
      state.locale = locale
    }
  },
  SET_IsSignIn(state, data) {
    state.isSignIn = data
  },
  SET_IsProActive(state, data) {
    state.isProActive = data
  },
  SET_UserList(state, data) {
    state.userList = data
  },
  SET_ProUserList(state, data) {
    state.proUserList = data
  },
  SET_TagShowFlag(state, data) {
    state.tagShowFlag = data
  }
}

export const actions = {
  changeMenu({ commit, state }, data) {
    commit('setMenu', data)
  },
  changeOpenRRMQuery({ commit, state }, data) {
    commit('setOpenRRMQuery', data)
  },
  changeIsSignIn({ commit, state }, data) {
    commit('SET_IsSignIn', data)
  },
  changeIsProActive({ commit, state }, data) {
    commit('SET_IsProActive', data)
  },
  changeUserList({ commit, state }, data) {
    commit('SET_UserList', data)
  },
  changeProUserList({ commit, state }, data) {
    commit('SET_ProUserList', data)
  },
}