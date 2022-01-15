<template>
  <div>
    <nuxt-child />
  </div>
</template>
<script>
import Childlink from '@/components/common/Childlink'
import Cookie from 'js-cookie'

export default {

  name: 'Index',

  mixins: [],

  props: [],

  components: {
    Childlink
  },

  watch: {
    $route(to) {

    }
  },

  computed: {

  },

  asyncData({ app }) {
    return {

    }
  },

  data: function() {
    return {
      chainRouter: [
        { path: '/', title: 'Lang.Data', active: false },
        { path: '/gas', title: 'Lang.GAS', active: false },
        { path: '/tipset', title: 'Lang.BLOCK', active: false },
        { path: '/order', title: 'Lang.order', active: false }
      ]
    }
  },

  methods: {

  },

  mounted: function() {

  },

  beforeDestroy: function() {

  }
}
</script>
<style lang="scss">
.el-dialog__header{
  .el-dialog__title{
    font-weight: normal;
  }
  text-align: center;
}
.el-popover{
  text-align: center;
}
</style>