<template>
  <div class="">
    <p class='lg:block hidden text-2xl mb-4'>{{$t('Lang.FIL index')}}</p>
    <div class="rounded-md bg-white ">
      <div class="flex items-center h-16 lg:h-20 px-3 lg:px-6 lg:border-b border-solid border-E8E7EB">
        <span class="lg:text-lg text-xl font-medium text-dark ">{{$t('Lang.FIL index')}}</span>
        <div class="ml-3 flex">
          <template v-if="fil_main_data.changed > 0">
            <span class="text-xl lg:text-3xl font-medium text-54B786">{{table_score | formatterAmount(2)}}</span>
            <div class="ml-3 px-3 rounded-full flex items-center bg-54B786">
              <span class="text-base text-white">+{{fil_main_data.changed}}%</span>
            </div>
          </template>
          <template v-else>
            <span class="text-xl lg:text-3xl font-medium text-red-500">{{table_score | formatterAmount(2)}}</span>
            <div class="ml-3 px-3 rounded-full flex items-center bg-red-500">
              <span class="text-base text-white">{{fil_main_data.changed}}%</span>
            </div>
          </template>
        </div>
      </div>
      <ul class="w-full flex flex-wrap py-2">
        <li class="w-1/2 lg:w-1/4 h-20 flex items-center mb-2" v-for="(item, index) in fil_exponent_list" :key="item.title">
          <div class="flex-1 flex flex-col justify-center items-center mx-1 rounded-md lg:border-0 border border-solid border-E8E7EB py-3">
            <span class="text-xl lg:text-2xl">{{item.val}}</span>
            <div>
              <el-popover v-if="item.popover" trigger="hover" :content="$t(item.popover)">
                <i class="el-icon-info cursor-pointer text-base text-gray-500" slot="reference"></i>
              </el-popover>
              <span class="text-848599">{{$t(item.title)}}</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="mt-3 lg:flex">
      <div id="echartsExponent" class="h-64 lg:h-96 flex-1 rounded-md bg-white"></div>
      <div class="w-3 h-full hidden lg:block"></div>
      <div id="echartsExponentDimension" class="mt-3 lg:mt-0 h-64 lg:h-96 flex-1 rounded-md bg-white"></div>
    </div>
    <div class='lg:hidden h-3 bgbox'></div>
    <div class="mt-3 rounded-md bg-white">
      <div class="flex items-center justify-between lg:border-b border-solid border-E8E7EB">
        <div class="flex items-center lg:text-xl h-16 lg:h-20 px-3 lg:px-6 font-bold">
          <span class='lg:text-lg text-xl font-medium text-dark lg:mb-0 mb-2'>{{$t('Lang.Index details')}}</span>
        </div>
        <span class="text-75737F pr-3 lg:pr-6">*{{table_detail_date}}</span>
      </div>
      <div class="hidden lg:block">
        <table class="table-fixed w-full">
          <thead>
            <tr>
              <th class="w-1/12 h-20 font-medium" v-for="(item, index) in table_detail_header" :key="index + '_title_index'">
                <span>{{$t(item.title)}}</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in table_detail_data" class="border-t border-solid border-E8E7EB" :key="index + '_fil_index'">
              <td class="w-1/12 text-center">
                <span class="font-medium">{{$t(item.name)}}</span>
                <span class="font-normal">({{item.ratio | formatPercentage(0)}})</span>
              </td>
              <td class="w-1/12 text-center py-2">
                <div v-for="(sub, i) in item.child" :key="'fil_sub' + i" class="leading-8">{{$t(sub.name)}}</div>
              </td>
              <td class="w-1/12 text-center py-2">
                <div v-for="(sub, i) in item.child" :key="'fil_sub' + i" class="leading-8">{{sub.real_time_data_format}}</div>
              </td>
              <td class="w-1/12 text-center py-2">
                <div v-for="(sub, i) in item.child" :key="'fil_sub' + i" class="leading-8">{{sub.basic_scores | formatNumberFixed(2)}}</div>
              </td>
              <td class="w-1/12 text-center">
                <span class="text-xl text-E59D29 font-medium">{{item.grade | formatterAmount(2)}}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="lg:hidden">
        <div v-for="(item, index) in table_detail_data" class="p-3 border border-solid border-E8E7EB mb-2 rounded-md" :key="index + '_fil_index'">
          <div class="flex items-center justify-between">
            <div class='mb-2'>
              <span class="font-medium">{{$t(item.name)}}</span>
              <span class="font-normal">({{item.ratio | formatPercentage(0)}})</span>
            </div>
            <span class="text-xl text-E59D29 font-medium">{{item.grade | formatterAmount(2)}}</span>
          </div>
          <div v-for="(sub, i) in item.child" :key="'fil_sub' + i" class="flex items-center justify-between leading-8">
            <div class="w-32 mr-4 leading-6 mb-2">{{$t(sub.name)}}</div>
            <div class="flex-1 leading-6">{{sub.real_time_data_format}}</div>
            <div class="flex-1 text-right">{{sub.basic_scores | formatNumberFixed(2)}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="py-3 lg:py-5 bg-white mb-3 px-4">
      <div class="text-75737F">{{$t('Lang.FIL index description')}}</div>
      <div class="text-75737F">{{$t('Lang.FIL text1')}}</div>
      <div class="text-75737F">{{$t('Lang.FIL text2')}}</div>
      <div class="text-75737F">{{$t('Lang.FIL text3')}}</div>
    </div>
  </div>
</template>
<script>
import echartsUtils from '@/static/echarts-utils.js'
import utils from '@/static/utils.js'
export default {
  name: 'FilInfex',

  mixins: [],

  props: [],

  components: {

  },

  watch: {

  },

  computed: {
    fil_exponent_list: function() {
      let {
        wallet_added,
        turnover_value,
        coin_price,
        effective_power,
        mine_cost,
        google_index,
        storage_num, 
        storage_size,
        effective_power_str
      } = this.fil_main_data
      return [
        { title: 'Lang.New wallet addresses', val: utils.formatNumberFixed(wallet_added, 0) },
        { title: 'Lang.FIL circulation market value', val: `${utils.formatterAmount(turnover_value, 0)} USDT` },
        { title: 'Lang.Effective computing power', val: `${effective_power_str}` },
        { title: 'Lang.Mining cost1', val: `${mine_cost} F/TiB` },
        { title: 'Lang.Google index', val: utils.formatNumberFixed(google_index, 0) },
        { title: 'Lang.Store order volume', val: utils.formatterAmount(storage_num, 0) },
        { title: 'Lang.Stored data size', val: `${utils.formatPower(storage_size)[0]} ${utils.formatPower(storage_size)[1]}` },
      ]
    },

    fil_exponent_list_last: function() {
      return this.fil_exponent_list[this.fil_exponent_list.length - 1]
    },

    table_detail_data: function() {
      let sortKey = ['Lang.Market heat', 'Lang.Mining heat', 'Lang.Ecological heat'] 
      let dataKey = {}
      this.table_main_data.map(item => {
        switch (item.identifier) {
          case 'market_heat':
            item.name = sortKey[0]
            break;
          case 'mine_heat': 
            item.name = sortKey[1]
            break;
          case 'eco_heat':
            item.name = sortKey[2]
            break;
        }
        let index = sortKey.indexOf(item.name)
        item.child = [] 
        item.sortIndex = index
        dataKey[item.identifier] = item
      })

      this.table_sub_data.map(item => {
        switch (item.identifier) {
          case 'trans_num': 
            item.real_time_data_format = utils.formatterAmount(item.real_time_data)
            item.ref_data_format = utils.formatterAmount(item.ref_data)
            break;
          case 'google_index': 
            item.real_time_data_format = utils.formatterAmount(item.real_time_data)
            item.ref_data_format = utils.formatterAmount(item.ref_data)
            break;
          case 'gas_used_daliy':
            item.real_time_data_format = utils.formatFil(item.real_time_data, false)
            item.ref_data_format = utils.formatFil(item.ref_data, false)
            break;
          case 'impawn_daliy': 
            item.real_time_data_format = utils.formatTrueFil(item.real_time_data, false)
            item.ref_data_format = utils.formatTrueFil(item.ref_data, false)
            break;
          case 'wallet_added':
            item.real_time_data_format = utils.formatterAmount(item.real_time_data, 0)
            item.ref_data_format = utils.formatterAmount(item.ref_data, 0)
            break;
          case 'turnover':
            item.real_time_data_format = utils.formatFil(item.real_time_data, false)
            item.ref_data_format = utils.formatFil(item.ref_data, false)
            break;
          case 'effective_power': 
            item.real_time_data_format = `${utils.formatPower(item.real_time_data)[0]} ${utils.formatPower(item.real_time_data)[1]}`
            item.ref_data_format = utils.formatPower(item.ref_data)
            break;
          case 'participation_miner':
            item.real_time_data_format = utils.formatterAmount(item.real_time_data)
            item.ref_data_format = utils.formatterAmount(item.ref_data)
            break;
          case 'active_miner':
            item.real_time_data_format = utils.formatterAmount(item.real_time_data)
            item.ref_data_format = utils.formatterAmount(item.ref_data)
            break;
          case 'storage_num': 
            item.real_time_data_format = utils.formatterAmount(item.real_time_data)
            item.ref_data_format = utils.formatterAmount(item.ref_data)
            break;
          case 'storage_size': 
            item.real_time_data_format = `${utils.formatPower(item.real_time_data)[0]} ${utils.formatPower(item.real_time_data)[1]}`
            item.ref_data_format = utils.formatPower(item.ref_data)
            break;
          case 'github_commits':
            item.real_time_data_format = utils.formatterAmount(item.real_time_data)
            item.ref_data_format = utils.formatterAmount(item.ref_data)
            break;
          case 'turnover_value':
            item.real_time_data_format = utils.formatterAmount(item.real_time_data)+' USDT'
            item.ref_data_format = utils.formatterAmount(item.ref_data)
            break;
          case 'trade_vol': 
            item.real_time_data_format = utils.formatterAmount(item.real_time_data)+' USDT'
            item.ref_data_format = utils.formatterAmount(item.ref_data)
            break;
          case 'coin_price':
            item.real_time_data_format = utils.formatterAmount(item.real_time_data)+' USDT'
            item.ref_data_format = utils.formatterAmount(item.ref_data)
            break;
          case 'turnover_ratio': 
            item.real_time_data_format = utils.formatterAmount(item.real_time_data)
            item.ref_data_format = item.ref_data
            break;
          case 'mine_cost':
            item.real_time_data_format = (item.real_time_data)+' F/TiB'
            item.ref_data_format = item.ref_data
            break;
          case 'stars':
            item.real_time_data_format = utils.formatterAmount(item.real_time_data)
            item.ref_data_format = item.ref_data
            break;
          case 'forks': 
            item.real_time_data_format = utils.formatterAmount(item.real_time_data)
            item.ref_data_format = item.ref_data
            break;
        }

        if (dataKey[item.parent_identifier]) {
          dataKey[item.parent_identifier].child.push(item)
        }
      })

      let arr = []
      for (let prop in dataKey) {
        arr.push(dataKey[prop])
      }

      arr.sort((a, b) => {
        return a.sortIndex - b.sortIndex
      })
      let langArr = [
        {name:'换手率',langText:'Lang.Turnover rate'},
        {name:'新增地址数',langText:'Lang.Number of new addresses'},
        {name:'流通量',langText:'Lang.Circulation'},
        {name:'FIL流通市值',langText:'Lang.FIL circulation market value'},
        {name:'交易额',langText:'Lang.Transaction Amount'},
        {name:'币价',langText:'Lang.Market Price'},
        {name:'链上转账数',langText:'Lang.Transfers on the chain'},
        {name:'当日消耗Gas',langText:'Lang.Gas consumption on the day'},
        {name:'当日新增质押',langText:'Lang.New pledge on the day'},
        {name:'有效算力',langText:'Lang.Effective computing power'},
        {name:'参与矿工数',langText:'Lang.Number of participating miners'},
        {name:'活跃矿工数',langText:'Lang.Number of active miners'},
        {name:'google指数',langText:'Lang.Google index'},
        {name:'github提交数',langText:'Lang.github submissions'},
        {name:'存储订单量',langText:'Lang.Store order volume'},
        {name:'存储数据大小',langText:'Lang.Stored data size'},

        {name:'挖矿成本',langText:'Lang.Mining cost1'},
        {name:'stars数量',langText:'Lang.Number of stars'},
        {name:'forks数量',langText:'Lang.Number of forks'},
      ]
      for (let i = 0;i<arr.length;i++){
        for (let j = 0;j<arr[i].child.length;j++){
          for (let k = 0;k<langArr.length;k++){
            if(arr[i].child[j].name == langArr[k].name ){
              arr[i].child[j].name = langArr[k].langText
            }
          }
        }
      }

      arr.map(i=>{
        i.child.map((j,m)=>{
          if(j.name == 'Lang.Market Price'){
            i.child.splice(m,1)
          }
        })
      })

      return arr
    },

    table_detail_header: function() {
      return [
        { title: '' },
        { title: '' },
        { title: 'Lang.Data of the day', popover: '当日的实际数据' },
        { title: 'Lang.Weighted index', popover: '基础指数x权重系数' },
        { title: 'Lang.Dimension index', popover: '该维度中各项指标加权得分之和/权重系数之和' },
      ]
    }
  },

  asyncData({ app }) {
    let date = utils.getDateMiusDays(new Date(), 31)
    let data = {
      table_detail_date: date[date.length - 2],
      fil_score: [],
      fil_main_data: '',
      line_data: [],
      table_main_data: [],
      table_sub_data: [],
      table_score: []
    }
    return app.$axios.post('/api/explorer/get_index_scores', {
        start_date: date[0],
        end_date: date[date.length - 1]
      })
      .then(res => {
        if (res.code != 0) return data
        data.fil_score = res.data
        data.fil_main_data = res.data[0] || {}
        return app.$axios.post('/api/explorer/get_latitude_score', {
          start_date: date[0],
          end_date: date[date.length - 1]
        })
      })
      .then(res => {
        if (!res || res.code != 0) return data
        data.line_data = res.data
        return app.$axios.post('/api/explorer/get_index_details', {
          date: date[date.length - 2]
        })
      })
      .then(res => {
        if (!res || res.code != 0) return data
        data.table_main_data = res.data.main_dimension_data
        data.table_sub_data = res.data.sub_dimension_data
        data.table_score = res.data.score
        return data
      })
  },

  data: function() {
    return {
      lang:this.$store.state.locale
    }
  },

  methods: {
    initFIlExponentHandler: function() {
      let echarts = this.$echarts.init(document.getElementById('echartsExponent'))
      let y1 = [], 
          y2 = [], 
          date = [], 
          echartTitle = []

      if(this.lang == 'zh'){
        echartTitle = ['存储区块奖励指数','全网存储']
      }else if(this.lang == 'en'){
        echartTitle = ['Storage block reward index','Network Storage Power']
      }else if(this.lang == 'ja'){
        echartTitle = ['ストレージブロックの報酬インデックス','全ネット計ストレージ']
      }else{
        echartTitle = ['스토리지 블록 보상지수','네트워크 채굴파워']
      }

      this.fil_score.reverse().map(item => {
        y1.push(item.score)
        y2.push(item.effective_power)
        date.push(item.day)
      })
      echarts.setOption(echartsUtils.optionsForFIlExponent({
        date,
        y1,
        y2,
        echartTitle
      }))
    },
    initFIlExponentDimensionHandler: function() {
      let echarts = this.$echarts.init(document.getElementById('echartsExponentDimension'))
      let y1 = [], 
          y2 = [], 
          y3 = [], 
          date = [],
          echartTitle = []

      if(this.lang == 'zh'){
        echartTitle = ['市场热度','存储热度','生态热度']
      }else if(this.lang == 'en'){
        echartTitle = ['Market heat','Mining heat','Ecological heat']
      }else if(this.lang == 'ja'){
        echartTitle = ['市场热度','採掘熱','生態熱']
      }else{
        echartTitle = ['시장 열도','채광 열도','생태 열도']
      }

      this.line_data.reverse().map(item => {
        y1.push(item.market_heat_grade)
        y2.push(item.mine_heat_grade)
        y3.push(item.eco_heat_grade)
        date.push(item.day)
      })
      echarts.setOption(echartsUtils.optionsFIlExponentDimension({
        title: '维度指数',
        date,
        value: [
          { title: echartTitle[0], value: y1 },
          { title: echartTitle[1], value: y2 },
          { title: echartTitle[2], value: y3 },
        ]
      }))
    }
  },

  mounted: function() {
    this.initFIlExponentHandler()
    this.initFIlExponentDimensionHandler()
  },

  beforeDestroy: function() {

  }
}
</script>
<style>
.border-b-0.fil-table-detail {
  border-bottom-width: 0;
}
</style>