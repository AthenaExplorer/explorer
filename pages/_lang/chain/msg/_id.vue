<template>
  <div class="mb-3">
    <div class='flex items-center'>
      <p class='text-2xl my-3'>{{$t('Lang.Message details')}}</p>
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
        <span class="lg:text-lg font-medium text-dark">{{$t('Lang.Transfer information')}}</span>
      </div>
      <div class="hidden lg:block">
        <table class="table-fixed w-full">
          <thead>
            <tr class="">
              <th class="w-1/12 py-4 font-bold pl-6">{{$t('Lang.Sender')}}</th>
              <th class="w-1/12 py-4 font-medium font-bold"></th>
              <th class="w-1/12 py-4 font-medium font-bold">{{$t('Lang.Receiver')}}</th>
              <th class="w-1/12 py-4 font-medium font-bold">{{$t('Lang.Amount')}}</th>
              <th class="w-1/12 py-4 font-medium font-bold">{{$t('Lang.Types')}}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in transferAccounts" class="" :key="index + '_index'">
              <td class="w-1/12 py-3 text-center truncate pl-6 ">
                <div class='flex items-center justify-center'>
                  <el-popover
                    placement="right"
                    trigger="hover"
                    :content="item.from">
                    <n-link class="text-main truncate lg:break-all" :to="`/${lang}/chain/addr/${item.from}`" slot="reference">{{item.from | getSubStr}}</n-link>
                  </el-popover>
                  <template v-if="item.fromTag.en_tag">
                    <div class="border border-solid border-E8E7EB rounded ml-3 flex items-center">
                      <span class="mx-3 text-75737F">{{item.fromTag.en_tag }}</span>
                      <img v-show="item.fromTag.signed" src="@/assets/imgs/isSigned.png" alt="" class='mr-2' style='width:12px;height:14px'>
                    </div>
                  </template>
                </div>
              </td>
              <td class="w-1/12 py-3 text-center truncate">
                <img src="../../../../assets/imgs/to.png" alt="" style='width:13px' class='m-auto'>
              </td>
              <td class="w-1/12 py-3 text-center truncate">
                <div class='flex items-center justify-center'>
                  <el-popover
                    placement="right"
                    trigger="hover"
                    :content="item.to">
                    <n-link  class="text-main truncate lg:break-all" :to="`/${lang}/chain/addr/${item.to}`" slot="reference">{{item.to | getSubStr}}</n-link>
                  </el-popover>
                  <div v-if="tagShowFlag">
                    <template v-if="item.toTag.en_tag">
                      <div class="border border-solid border-E8E7EB rounded ml-3 flex items-center">
                        <span class="mx-3 text-75737F">{{item.toTag.en_tag}}</span>
                        <img v-show="item.toTag.signed" src="@/assets/imgs/isSigned.png" alt="" class='mr-2' style='width:12px;height:14px'>
                      </div>
                    </template>
                  </div>
                </div>
              </td>
              <td class="w-1/12 py-3 text-center truncate">{{item.money | formatEasyFil}}</td>
              <td class="w-1/12 py-3 text-center truncate">{{$t(item.type)}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="lg:hidden block">
        <div v-for="(item, index) in transferAccounts" class="p-3 border-b border-solid border-E8E7EB" :key="index + 'index'">
          <div class="flex items-center justify-end">
            <span class="flex-1">{{$t('Lang.Sender')}}</span>
            <div class=" text-right truncate flex justify-end items-center">
              <n-link :to="`/${lang}/chain/addr/${item.from}`">{{item.from | getSubStr}}</n-link>
            </div>
          </div>
          <div class="flex items-center justify-between">
            <span class="flex-1">{{$t('Lang.Receiver')}}</span>
            <div class=" text-right truncate flex justify-end items-center">
              <n-link :to="`/${lang}/chain/addr/${item.to}`">{{item.to | getSubStr}}</n-link>
              <div v-if="tagShowFlag">
                <div class="border border-solid border-E8E7EB rounded ml-3 flex items-center" v-if="item.toTag.en_tag">
                  <span class="mx-3 text-75737F">{{item.toTag.en_tag}}</span>
                  <img v-show="item.toTag.signed" src="@/assets/imgs/isSigned.png" alt="" class='mr-2' style='width:12px;height:14px'>
                </div>
              </div>
            </div>
          </div>
          <div class="flex items-center justify-between">
            <span class="flex-1">{{$t('Lang.Amount')}}</span>
            <div class="w-1/2 text-right truncate">
              <span>{{item.money | formatEasyFil}}</span>
            </div>
          </div>
          <div class="flex items-center justify-between">
            <span class="flex-1">{{$t('Lang.Types')}}</span>
            <div class="w-1/2 text-right truncate">
              <span>{{$t(item.type)}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-3 lg:border-0 border border-solid border-E8E7EB bg-white rounded-md">
      <div class="flex items-center h-16 lg:h-20 px-3 lg:px-6 border-b border-solid border-E8E7EB">
        <span class="lg:text-lg font-medium text-dark">{{$t('Lang.Other Information')}}</span>
      </div>
      <ul class="py-3 px-3 lg:px-6">
        <li class="flex lg:items-center justify-between lg:justify-start leading-8" v-for="item in otherMsgOverview" :key="item.title">
          <div class="min-w-32 text-848599 flex-shrink-0">
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
        msg_cid = {},
          height,
          msg_to,
          msg_from,
          height_time,
          msg_method_name,
          msg_value,
          msgrct_exit_code
      } = this.overview
      return [
        { title: 'Lang.Message ID', val: utils.formatOverview(msg_cid) },
        { title: 'Lang.Height', val: height, href: `/${this.lang}/chain/tipset/${height}` },
        { title: 'Lang.time', val: height_time },
        { title: 'Lang.Sender', val: msg_from, href: `/${this.lang}/chain/addr/${msg_from}`, from: true },
        { title: 'Lang.Receiver', val: msg_to, href: `/${this.lang}/chain/addr/${msg_to}`, to: true },
        { title: 'Lang.Method', val: msg_method_name },
        { title: 'Lang.Amount', val: utils.formatEasyFil(msg_value, 4) },
        { title: 'Lang.Status', val: msgrct_exit_code == 0 ? 'OK' : 'Error' },
      ]
    },
    otherMsgOverview: function() {
      let {
        msg_nonce,
        msg_params,
        msg_return,
        msg_gas_fee_cap,
        msg_gas_premium,
        gascost_gas_used,
        base_fee,
        msg_gas_limit
      } = this.overview

      return [
        { title: 'Lang.Nonce', val: msg_nonce },
        { title: 'Lang.Gas Fee Cap', val: utils.formatEasyFil(msg_gas_fee_cap, true) },
        { title: 'Lang.Gas Premium', val: utils.formatEasyFil(msg_gas_premium, true) },
        { title: 'Lang.Gas limit', val: utils.formatterAmount(msg_gas_limit), popover: 'Lang.The maximum amount of gas that this transaction can consume' },
        { title: 'Lang.Gas usage', val: utils.formatterAmount(gascost_gas_used), popover: 'Lang.The actual amount of Gas consumed to complete this transaction' },
        { title: 'Lang.Base Fee', val: utils.formatEasyFil(base_fee, true) },
        { title: 'Lang.PParameter', html: msg_params },
        { title: 'Lang.Return value', html: msg_return },
      ]
    },
    transferAccounts: function() {
      let transfers = []
      if(this.overview.msg_params == ''){
        if (this.overview.msg_value != '0') {
          transfers.push({
            type: 'Lang.Transfer',
            from: this.overview.msg_from,
            to: this.overview.msg_to,
            money: this.overview.msg_value,
            toTag: this.globalMinerTag[this.overview.msg_to] || {},
            fromTag: this.globalMinerTag[this.overview.msg_from] || {}
          })
        } 
      }else{
        if (this.overview.msg_value != '0') {
          transfers.push({
            type: 'Lang.Transfer',
            from: this.overview.msg_from,
            to: this.overview.msg_to,
            money: this.overview.msg_value,
            toTag: this.globalMinerTag[this.overview.msg_to] || {},
            fromTag: this.globalMinerTag[this.overview.msg_from] || {}
          })
        } 
        else if (JSON.parse(this.overview.msg_params).AmountRequested) {
          transfers.push({
            type: 'Lang.Transfer',
            from: this.overview.msg_to,
            to: this.overview.msg_from,
            money: JSON.parse(this.overview.msg_params).AmountRequested,
            toTag: this.globalMinerTag[this.overview.msg_to] || {},
            fromTag: this.globalMinerTag[this.overview.msg_from] || {}
          })
        }
      }
      if (this.overview.fee_burn != '0') {
        transfers.push({
          type: 'Lang.Burn Fee',
          from: this.overview.msg_from,
          to: 'f099',
          money: this.overview.fee_burn,
          toTag: { miner_no: "", en_tag: "销毁账户", signed: true },
          fromTag: this.globalMinerTag[this.overview.msg_from] || {}
        })
      }
      if (this.overview.gascost_miner_tip != '0' && this.overview.tip_miner_id) {
        transfers.push({
          type: 'Lang.Miner fee',
          from: this.overview.msg_from,
          to: this.overview.tip_miner_id,
          money: this.overview.gascost_miner_tip,
          toTag: this.globalMinerTag[this.overview.msg_to] || {},
          fromTag: this.globalMinerTag[this.overview.msg_from] || {}
        })
      }

      if(this.overview.msg_method_name == 'ProveCommitAggregate'  || this.overview.msg_method_name ==  "PreCommitSectorBatch"){
        transfers.push({
          type: 'Lang.Burn',
          from: this.overview.msg_to,
          to: 'f099',
          money: this.overview.batch_gas_charge,
          toTag: { miner_no: "", en_tag: "销毁账户", signed: true },
          fromTag: this.globalMinerTag[this.overview.msg_from] || {}
        })
      }
      return transfers
      
    }
  },

  asyncData({ app, params }) {
    let data = {
      msg_cid: params.id,
      overview: {},
      errFlag: false
    }
    return app.$axios.post('/api/explorer/get_message_info', {
        msg_cid: params.id.split('-')[0],
        height: params.id.split('-')[1],
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