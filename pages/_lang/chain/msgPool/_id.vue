<template>
  <div class="mb-3">
    <div class='flex items-center'>
      <p class='text-2xl my-3'>{{$t('Lang.Message pool details')}}</p>
    </div>
    <div class="mt-3 lg:border-0 border border-solid border-E8E7EB bg-white rounded-md">
      <div class="flex items-center h-16 lg:h-20 px-3 lg:px-6 border-b border-solid border-E8E7EB">
        <span class="lg:text-lg font-medium text-dark">{{$t('Lang.News overview')}}</span>
      </div>
      <ul class="py-3 px-3 lg:px-6">
        <li class="flex items-center justify-between lg:justify-start leading-8" v-for="item in msgOverview" :key="item.title">
          <div class="w-48 text-848599 flex-shrink-0">{{$t(item.title)}}</div>
          <template v-if="item.href">
            <div class="truncate lg:break-all flex items-center">
              <n-link class="text-main truncate lg:break-all mr-2" :to="item.href">{{item.val}}</n-link>
              <div v-if="tagShowFlag">
              <template v-if="globalMinerTag[item.val]">
                <div class="border border-solid border-E8E7EB rounded mr-3 flex items-center">
                  <span class="mx-3 text-75737F">{{globalMinerTag[item.val].en_tag}}</span>
                  <img v-show="globalMinerTag[item.val].signed"  src="@/assets/imgs/isSigned.png"  alt=""  class='mr-2'  style='width:12px;height:12px'>
                </div>
              </template>
              </div>
            </div>
          </template>
          <div v-else class="text-dark truncate lg:break-all">{{item.val}}</div>
        </li>
      </ul>
    </div>
    <div class="mt-3 lg:border-0 border border-solid border-E8E7EB bg-white rounded-md">
      <div class="flex items-center h-16 lg:h-20 px-3 lg:px-6 border-b border-solid border-E8E7EB">
        <span class="lg:text-lg font-medium text-dark">{{$t('Lang.Other Information')}}</span>
      </div>
      <ul class="py-3 px-3 lg:px-6">
        <li class="flex lg:items-center justify-between lg:justify-start leading-8" v-for="item in otherMsgOverview" :key="item.title">
          <div class="min-w-48 text-848599 flex-shrink-0">
            <span>{{$t(item.title)}}</span>
            <template v-if="item.popover">
              <el-popover trigger="hover" :content="$t(item.popover)">
                <i class="el-icon-info cursor-pointer text-gray-500 text-base" slot="reference"></i>
              </el-popover>
            </template>
          </div>
          <div v-if="item.href">
            <div>
              <n-link class="text-main break-all" :to="item.href">{{item.val}}</n-link>
            </div>
          </div>
          <div class="break-all refuse-content w-full" v-else-if="item.html && item.html!=='{}'" v-html="item.html"></div>
          <div class="text-dark break-all" v-else-if="item.html && item.html=='{}'">N/A</div>
          <div v-else class="text-dark break-all">{{item.val}}</div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import utils from '@/static/utils.js'
import { mapGetters } from 'vuex'

export default {

  scrollToTop: true,

  name: 'ChainMsgDetail',

  mixins: [],

  props: [],

  components: {

  },

  watch: {

  },

  computed: {
    ...mapGetters({
      globalMinerTag: 'getGlobalMinerTag',
      tagShowFlag: 'getTagShowFlag'
    }),
    msgOverview: function() {
      let {
        cid,
        height,
        msg_to,
        msg_from,
        height_time,
        method_name,
        value,
      } = this.overview
      return [
        { title: 'Lang.Message ID', val: cid },
        { title: 'Lang.Height', val: height, href: `/${this.lang}/chain/tipset/${height}` },
        { title: 'Lang.time', val: height_time },
        { title: 'Lang.Sender', val: msg_from, href: `/${this.lang}/chain/addr/${msg_from}`, from: true },
        { title: 'Lang.Receiver', val: msg_to, href: `/${this.lang}/chain/addr/${msg_to}`, to: true },
        { title: 'Lang.Method', val: method_name },
        { title: 'Lang.Amount', val: utils.formatTrueFil(value, true) },
      ]
    },
    otherMsgOverview: function() {
      let {
        nonce,
        msg_params,
        msg_return,
        msg_gas_fee_cap,
        gascost_gas_used,
        base_fee,
        gas_limit,
        gas_fee_cap,
        gas_premium,
        version
      } = this.overview

      return [
        { title: 'Lang.Version', val: version },
        { title: 'Lang.Nonce', val: nonce },
        { title: 'Lang.Gas Fee Cap', val: utils.formatEasyFil(gas_fee_cap, true) },
        { title: 'Lang.Gas limit', val: utils.formatterAmount(gas_limit), popover: 'Lang.The maximum amount of gas that this transaction can consume' },
        { title: 'Lang.Gas Premium', val: utils.formatEasyFil(gas_premium, true) },
        { title: 'Lang.PParameter', html: msg_params },
      ]
    },
  },

  asyncData({ app, params }) {
    let data = {
      msg_cid: params.id,
      overview: {},
      errFlag: false
    }
    return app.$axios.post('/api/explorer/get_mpool_info', {
        cid: params.id,
      })
      .then(res => {
        data.overview = res.data
        return data
      })
  },

  data: function() {
    return {
      lang: this.$store.state.locale
    }
  },

  beforeMount() {
    if (this.errFlag) {
      this.$router.push(`/${this.lang}/noMsg`)
    }
  },

  methods: {
    back(){
      window.history.back(-1)
    }
  },

  mounted: function() {
    document.body.scrollTop = document.documentElement.scrollTop = 0
  },

  beforeDestroy: function() {

  }
}
</script>
<style>
.refuse-content {
  margin-top: 8px;
  padding: 12px;
  line-height: 17px;
  background-color: #f2f6fcc0;
  border-radius: 4px;
  overflow: hidden;
  white-space: pre-wrap
}
</style>