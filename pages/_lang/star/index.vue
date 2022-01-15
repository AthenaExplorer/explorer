<template>
  <div class="pt-3">
    <div class="border border-solid border-E8E7EB">
      <div class="lg:flex  items-center justify-between h-20 lg:h-20 px-3 lg:px-6 lg:border-b border-solid border-E8E7EB">
        <div class="flex-1 flex items-center lg:my-0 my-2">
          <i class="inline-block bg-3A70FF w-1 h-4 lg:h-5 rounded mr-2"></i>
          <span class="lg:text-xl font-bold">{{$t('Lang.Node starme')}}</span>
          <n-link class="text-main lg:text-lg font-bold ml-1 lg:ml-3 mr-2" :to="`/${lang}/chain/addr/${miner_exponent.miner_no}`">{{miner_exponent.miner_no}}</n-link>
          <template v-if="globalMinerTag[miner_exponent.miner_no]">
            <div class="border border-solid border-E8E7EB rounded mr-3 flex items-center">
              <span class="mx-3 text-75737F">{{globalMinerTag[miner_exponent.miner_no].en_tag}}</span>
              <el-popover trigger="hover" :content="$t('Lang.The user has completed signature verification for the owner')">
                <img v-show="globalMinerTag[miner_exponent.miner_no].signed" src="@/assets/imgs/isSigned.png"  alt="" class='ml-2 mr-2'  style='width:12px; height:14px' slot="reference">
              </el-popover>
            </div>
          </template>
        </div>
        <div class="title-box ">
          <el-input clearable v-model="miner_no" size="mini" :trigger-on-focus="false" :placeholder="$t('Lang.View other nodes')">
            <el-button slot="append" size='mini' @click="searchMinerHandler">
              GO
            </el-button>
          </el-input>
        </div>
      </div>
      <ul class="flex flex-wrap">
        <li class="w-1/2 lg:flex-1 flex items-center h-20 lg:h-24">
          <div class="flex-1 flex flex-col items-center">
            <div class="h-10 flex items-center justify-center">
              <Star className="h-6" :score="miner_exponent.synthesize_i | formatNumberFixed(1)" type="full"></Star>
              <img class="h-5 w-2 ml-2" :src="all_net_exponent.synthesize_i < miner_exponent.synthesize_i ? imgRise : imgLower" alt="">
            </div>
            <div class="text-75737F">{{$t('Lang.Node starme')}}</div>
          </div>
          <div class="h-12 w-px bg-E6E6EA"></div>
        </li>
        <template v-for="(item, index) in miner_exponent_list" v-key="'miner_exponent_list' + index">
          <li class="w-1/2 lg:flex-1 flex items-center h-20 lg:h-24">
            <div class="flex-1 flex flex-col items-center">
              <div>{{item.val}}</div>
              <div class="mb-1 text-75737F text-center px-2">{{$t(item.title)}}
                <el-popover v-if="item.popover" trigger="hover" :content="$t(item.popover)">
                  <i class="el-icon-info cursor-pointer text-gray-500 text-base" slot="reference"></i>
                </el-popover>
              </div>
            </div>
            <div class="h-12 w-px bg-E6E6EA hidden lg:block" v-if="index < miner_exponent_list.length - 1"></div>
            <div class="h-12 w-px bg-E6E6EA block lg:hidden" v-if="index % 2 == 1"></div>
          </li>
        </template>
      </ul>
      <div class="lg:flex border-t border-solid border-E8E7EB hidden">
        <div id="minerIndexTrend" class="flex-1 h-96 lg:h-112 border-b lg:border-b-0 border-solid border-E8E7EB"></div>
        <div class="flex-1 lg:flex flex-wrap lg:border-l border-solid border-E8E7EB">
          <template v-for="(item, j) in minerDimensionalityList">
            <div class="h-64 lg:h-56 lg:w-1/2 border-solid border-E8E7EB" :class="{'lg:border-l': j % 2, 'lg:border-b-0': j >= 2, 'border-b': j < 3}" :id="`minerDimensionality${j}`" :key="j"></div>
          </template>
        </div>
      </div>
    </div>
    <div class="mt-3 border border-solid border-E8E7EB">
      <div class="flex items-center justify-between lg:border-b border-solid border-E8E7EB">
        <div class="flex items-center  h-16 lg:h-20 px-3 lg:px-6">
          <i class="inline-block bg-3A70FF w-1 h-4 lg:h-5 rounded mr-2"></i>
          <span class="lg:text-xl font-bold">{{$t('Lang.Star details')}}</span>
        </div>
      </div>
      <div class="hidden lg:block">
        <table class="table-fixed w-full">
          <thead>
            <tr>
              <th class="w-1/12 h-20 font-medium" v-for="item in table_detail_header" :key="item.title">
                <span class='px-2'>{{$t(item.title)}}</span>
                <el-popover v-if="item.popover" trigger="hover" :content="$t(item.popover)">
                  <i class="el-icon-info cursor-pointer text-base text-gray-500" slot="reference"></i>
                </el-popover>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in mine_detail_list" class="border-t border-solid border-E8E7EB" :key="index + '_star_detail'">
              <td class="w-1/12 h-20 text-center font-medium">
                <n-link v-if="index == 0" :to="`/${lang}/chain/addr/${item.miner_no}`">{{item.miner_no}}</n-link>
                <span v-else>{{$t(item.lang_miner_no)}}
                  <el-popover v-if="item.popover" trigger="hover" :content="$t(item.popover)">
                    <i class="el-icon-info cursor-pointer text-gray-500 text-base" slot="reference"></i>
                  </el-popover>
                </span>
              </td>
              <td class="w-1/12 h-20 text-center">
                <div class="text-lg font-medium flex items-center justify-center">
                  <span>{{item.total_power_v}}</span>
                  <template v-if="item.miner_no != 'Lang.Base Line'">
                    <img class="h-5 w-2 ml-2" :src="all_net_exponent.total_power_i < item.total_power_i ? imgRise : imgLower">
                  </template>
                  <template v-else>
                    <div class="h-5 w-2 ml-2"></div>
                  </template>
                </div>
                <div class="text-75737F">{{Math.round(item.total_power_i) / 2 | formatNumberFixed(1)}}</div>
              </td>
              <td class="w-1/12 h-20 text-center">
                <div class="text-lg font-medium flex items-center justify-center">
                  <span>{{item.avg_reward_v | formatFil(true)}}/TiB</span>
                  <template v-if="item.miner_no != '基准值'">
                    <img class="h-5 w-2 ml-2" :src="all_net_exponent.avg_reward_i < item.avg_reward_i ? imgRise : imgLower">
                  </template>
                  <template v-else>
                    <div class="h-5 w-2 ml-2"></div>
                  </template>
                </div>
                <div class="text-75737F">{{Math.round(item.avg_reward_i) / 2 | formatNumberFixed(1)}}</div>
              </td>
              <td class="w-1/12 h-20 text-center">
                <div class="text-lg font-medium flex items-center justify-center">
                  <span>{{item.power_increment_7day_v | formatPower()[0]}} {{item.power_increment_7day_v | formatPower()[1]}}</span>
                  <template v-if="item.miner_no != '基准值'">
                    <img class="h-5 w-2 ml-2" :src="all_net_exponent.power_increment_7day_i < item.power_increment_7day_i ? imgRise : imgLower">
                  </template>
                  <template v-else>
                    <div class="h-5 w-2 ml-2"></div>
                  </template>
                </div>
                <div class="text-75737F">{{Math.round(item.power_increment_7day_i) / 2 | formatNumberFixed(1)}}</div>
              </td>
              <td class="w-1/12 h-20 text-center">
                <div class="text-lg font-medium flex items-center justify-center">
                  <span>{{item.keep_gas_week_v}} F/TiB</span>
                  <template v-if="item.miner_no != '基准值'">
                    <img class="h-5 w-2 ml-2" :src="all_net_exponent.keep_gas_week_i < item.keep_gas_week_i ? imgRise : imgLower">
                  </template>
                  <template v-else>
                    <div class="h-5 w-2 ml-2"></div>
                  </template>
                </div>
                <div class="text-75737F">{{Math.round(item.keep_gas_week_i) / 2 | formatNumberFixed(1)}}</div>
              </td>
              <td class="w-1/12 h-20 text-center">
                <div class="text-lg font-medium flex items-center justify-center">
                  <span>{{item.section_fault_rate_v | formatPercentage}}</span>
                  <template v-if="item.miner_no != '基准值'">
                    <img class="h-5 w-2 ml-2" :src="all_net_exponent.section_fault_rate_i < item.section_fault_rate_i ? imgRise : imgLower">
                  </template>
                  <template v-else>
                    <div class="h-5 w-2 ml-2"></div>
                  </template>
                </div>
                <div class="text-75737F">{{Math.round(item.section_fault_rate_i) / 2 | formatNumberFixed(1)}}</div>
              </td>
              <td class="w-1/12 h-20 text-center">
                <div class="flex items-center justify-center">
                  <Star className="h-5" :score="item.synthesize_i | formatNumberFixed(1)" type="full"></Star>
                  <template v-if="item.miner_no != '基准值'">
                    <img class="h-5 w-2 ml-2" :src="all_net_exponent.synthesize_i < item.synthesize_i ? imgRise : imgLower">
                  </template>
                  <template v-else>
                    <div class="h-5 w-2 ml-2"></div>
                  </template>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="lg:hidden">
        <div v-for="(item, index) in mine_detail_list" class="p-3 border-t border-solid border-E8E7EB" :key="index + '_star_detail'">
          <div class="flex items-center justify-between">
            <n-link v-if="index == 0" :to="`/${lang}/chain/addr/${item.miner_no}`">{{item.miner_no}}</n-link>
            <span v-else>{{$t(item.lang_miner_no)}}
              <el-popover v-if="item.popover" trigger="hover" :content="$t(item.popover)">
                <i class="el-icon-info cursor-pointer text-gray-500 text-base" slot="reference"></i>
              </el-popover>
            </span>
            <div class="flex items-center justify-center">
              <Star className="h-5" :score="item.synthesize_i | formatNumberFixed(1)" type="full"></Star>
              <template v-if="index != 1">
                <img class="h-5 w-2 ml-2" :src="all_net_exponent.synthesize_i < item.synthesize_i ? imgRise : imgLower">
              </template>
              <template v-else>
                <div class="h-5 w-2 ml-2"></div>
              </template>
            </div>
          </div>
          <div class="flex items-center justify-between pt-1">
            <span class="w-56">{{$t('Lang.Yesterday effective hashrate')}}</span>
            <div class="flex-1 flex items-center justify-between">
              <div class="text-75737F">{{Math.round(item.total_power_i) / 2 | formatNumberFixed(1)}}</div>
              <div class="flex items-center">
                <span>{{item.total_power_v}}</span>
                <template v-if="index != 1">
                  <img class="h-5 w-2 ml-2" :src="all_net_exponent.total_power_i < item.total_power_i ? imgRise : imgLower">
                </template>
                <template v-else>
                  <div class="h-5 w-2 ml-2"></div>
                </template>
              </div>
            </div>
          </div>
          <div class="flex items-center justify-between pt-1">
            <span class="w-56">{{$t('Lang.Yesterday output efficiency')}}</span>
            <div class="flex-1 flex items-center justify-between">
              <div class="text-75737F">{{Math.round(item.avg_reward_i) / 2 | formatNumberFixed(1)}}</div>
              <div class="flex items-center">
                <span>{{item.avg_reward_v | formatFil(true)}}/TiB</span>
                <template v-if="index != 1">
                  <img class="h-5 w-2 ml-2" :src="all_net_exponent.avg_reward_i < item.avg_reward_i ? imgRise : imgLower">
                </template>
                <template v-else>
                  <div class="h-5 w-2 ml-2"></div>
                </template>
              </div>
            </div>
          </div>
          <div class="flex items-center justify-between pt-1">
            <span class="w-56">{{$t('Lang.7-day computing power growth')}}</span>
            <div class="flex-1 flex items-center justify-between">
              <div class="text-75737F">{{Math.round(item.power_increment_7day_i) / 2 | formatNumberFixed(1)}}</div>
              <div class="flex items-center">
                <span>{{item.power_increment_7day_v | formatPower()[0]}} {{item.power_increment_7day_v | formatPower()[1]}}</span>
                <template v-if="index != 1">
                  <img class="h-5 w-2 ml-2" :src="all_net_exponent.power_increment_7day_i < item.power_increment_7day_i ? imgRise : imgLower">
                </template>
                <template v-else>
                  <div class="h-5 w-2 ml-2"></div>
                </template>
              </div>
            </div>
          </div>
          <div class="flex items-center justify-between pt-1">
            <span class="w-56">{{$t('Lang.7-day computing power maintenance Gas')}}</span>
            <div class="flex-1 flex items-center justify-between">
              <div class="text-75737F">{{Math.round(item.keep_gas_week_i) / 2 | formatNumberFixed(1)}}</div>
              <div class="flex items-center">
                <span>{{item.keep_gas_week_v}} F/TiB</span>
                <template v-if="index != 1">
                  <img class="h-5 w-2 ml-2" :src="all_net_exponent.keep_gas_week_i < item.keep_gas_week_i ? imgRise : imgLower">
                </template>
                <template v-else>
                  <div class="h-5 w-2 ml-2"></div>
                </template>
              </div>
            </div>
          </div>
          <div class="flex items-center justify-between pt-1">
            <span class="w-56">{{$t('Lang.7-day sector error rate')}}</span>
            <div class="flex-1 flex items-center justify-between">
              <div class="text-75737F">{{Math.round(item.section_fault_rate_i) / 2 | formatNumberFixed(1)}}</div>
              <div class="flex items-center">
                <span>{{item.section_fault_rate_v | formatPercentage}}</span>
                <template v-if="index != 1">
                  <img class="h-5 w-2 ml-2" :src="all_net_exponent.section_fault_rate_i < item.section_fault_rate_i ? imgRise : imgLower">
                </template>
                <template v-else>
                  <div class="h-5 w-2 ml-2"></div>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <nuxt-child />
    <div class="py-3 lg:py-5">
      <div class="text-75737F">{{$t('Lang.star description title')}}</div>
      <div class="text-75737F">{{$t('Lang.star description text')}}</div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Star from '@/components/common/Stars.vue'
import echartsUtils from '@/static/echarts-utils.js'
import utils from '@/static/utils.js'

export default {
  name: 'MinerStar',

  mixins: [],

  props: [],

  components: {
    Star
  },

  watch: {

  },

  computed: {
    ...mapGetters({
      globalMinerTag: 'getGlobalMinerTag'
    }),
    miner_exponent_list: function() {
      let {
        total_power_v,
        avg_reward_v,
        power_increment_7day_v,
        keep_gas_week_v,
        section_fault_rate_v
      } = this.miner_exponent

      return [{
        title: "Lang.Yesterday effective hashrate",
        val: utils.formatOverview(total_power_v)
      }, {
        title: "Lang.Yesterday output efficiency",
        val: avg_reward_v ? utils.formatFil(avg_reward_v, true) + '/TiB' : utils.formatOverview(''),
        popover: 'Lang.The average number of FIL produced per TiB of effective computing power yesterday'
      }, {
        title: 'Lang.7-day computing power growth',
        val: power_increment_7day_v ? `${utils.formatPower(power_increment_7day_v)[0]} ${utils.formatPower(power_increment_7day_v)[1]}` : utils.formatOverview(''),
        popover: 'Lang.Increment of effective computing power in the past 7 days'
      }, {
        title: "Lang.7-day computing power maintenance Gas",
        val: keep_gas_week_v ? utils.formatFil(keep_gas_week_v, true) + '/TiB' : utils.formatOverview(''),
        popover: 'Lang.Gas consumed by maintaining effective computing power in the past 7 days'
      }, {
        title: 'Lang.7-day sector error rate',
        val: section_fault_rate_v ? utils.formatPercentage(section_fault_rate_v) : utils.formatOverview(''),
        popover: 'Lang.Number of error sectors/total number of sectors in the past 7 days'
      }]
    },

    mine_detail_list: function() {
      let dataList = [this.miner_exponent].concat(this.statistics_exponent)
      let sortKey = {
        '基准值': 1,
        'TOP10': 2,
        'TOP30': 3
      }
      sortKey[this.miner_exponent.miner_no] = 0
      let popoverKey = {
        '基准值': 'Lang.Network average',
        'TOP10': 'Lang.Top 10 average value of network computing power ranking',
        'TOP30': 'Lang.Top 30 average value of network computing power ranking'
      }
      dataList.map(item => {
        item._sort_id = sortKey[item.miner_no]
        item.popover = popoverKey[item.miner_no]
        return item
      })

      let langArr = [
        { name: '基准值', langText: 'Lang.Base Line' },
        { name: 'TOP10', langText: 'Lang.TOP10' },
        { name: 'TOP30', langText: 'Lang.TOP30' },
      ]

      for (let i = 0; i < dataList.length; i++) {
        for (let k = 0; k < langArr.length; k++) {
          if (dataList[i].miner_no == langArr[k].name) {
            dataList[i].lang_miner_no = langArr[k].langText
          }
        }
      }
      return dataList.sort((a, b) => {
        return a.id - b.id
      })

    },

    all_net_exponent: function() {
      return this.mine_detail_list[1] || {}
    },

    table_detail_header: function() {
      return [
        { title: '' },
        { title: "Lang.Yesterday effective hashrate" },
        { title: "Lang.Yesterday output efficiency", popover: 'Lang.The average number of FIL produced per TiB of effective computing power yesterday' },
        { title: 'Lang.7-day computing power growth', popover: 'Lang.Increment of effective computing power in the past 7 days' },
        { title: 'Lang.7-day computing power maintenance Gas', popover: 'Lang.Gas consumed by maintaining effective computing power in the past 7 days' },
        { title: 'Lang.7-day sector error rate', popover: 'Lang.Number of error sectors/total number of sectors in the past 7 days' },
        { title: 'Lang.Node starme' }
      ]
    }
  },

  asyncData({ app }) {
    let dates = utils.getDateMiusDays(new Date(), 14)
    let data = {
      dates,
      miner_no: undefined,
      start_time: dates[0],
      end_time: dates[dates.length - 1],
      miner_exponent: {},
      statistics_exponent: [],
      miner_exponent_line: [],
      statistics_exponent_line: []
    }
    return app.$axios.post('/api/explorer/get_miner_index', {
        miner_no: data.miner_no,
        method: 'miner'
      })
      .then(res => {
        if (res.code != 0) return data
        data.miner_exponent = res.data[0]
        return app.$axios.post('/api/explorer/get_miner_index', {
          method: 'statistics'
        })
      })
      .then(res => {
        if (!res || res.code != 0) return data
        data.statistics_exponent = res.data
        return app.$axios.post('/api/explorer/get_miner_index_line', {
          miner_no: data.miner_no,
          method: 'miner',
          start_time: data.start_time,
          end_time: data.end_time
        })
      })
      .then(res => {
        if (!res || res.code != 0) return data
        data.miner_exponent_line = res.data
        return app.$axios.post('/api/explorer/get_miner_index_line', {
          method: 'statistics',
          start_time: data.start_time,
          end_time: data.end_time
        })
      })
      .then(res => {
        if (!res || res.code != 0) return data
        data.statistics_exponent_line = res.data
        return data
      })
  },

  data: function() {
    return {
      dates: [],
      miner_exponent: {},
      statistics_exponent: [],
      miner_exponent_line: [],
      statistics_exponent_line: [],
      minerDimensionalityList: [],
      imgRise: require('~/assets/img/icon-rise.png'),
      imgLower: require('~/assets/img/icon-lower.png'),
      lang: this.$store.state.locale,
      timer: null
    }
  },
  methods: {
    searchMinerHandler: function() {
      this.$axios.post('/api/explorer/get_miner_index', {
          miner_no: this.miner_no,
          method: 'miner'
        })
        .then(res => {
          if (res.code != 0) {
            if (this.lang == 'zh') {
              this.$notification.error({
                title: '错误',
                message: '存储供应商不存在'
              })
            } else if (this.lang == 'en-US') {
              this.$notification.error({
                title: 'Error',
                message: "The Storage Provider don't exist"
              })
            } else if (this.lang == 'ja-JP') {
              this.$notification.error({
                title: 'エラー',
                message: '鉱夫は存在しません'
              })
            } else {
              this.$notification.error({
                title: '오류',
                message: '광부 가 존재 하지 않 습 니 다.'
              })
            }
            return
          }
          this.miner_exponent = res.data[0]
          return this.$axios.post('/api/explorer/get_miner_index', {
            method: 'statistics',
            miner_type: this.miner_exponent.miner_type == 1 ? 'big' : 'small'
          })
        })
        .then(res => {
          if (!res || res.code != 0) return
          this.statistics_exponent = res.data
          return this.$axios.post('/api/explorer/get_miner_index_line', {
            miner_no: this.miner_no,
            method: 'miner',
            start_time: this.start_time,
            end_time: this.end_time
          })
        })
        .then(res => {
          if (!res || res.code != 0) return
          this.miner_exponent_line = res.data
          return this.$axios.post('/api/explorer/get_miner_index_line', {
            method: 'statistics',
            start_time: this.start_time,
            end_time: this.end_time,
            miner_type: this.miner_exponent.miner_type == 1 ? 'big' : 'small'
          })
        })
        .then(res => {
          if (!res || res.code != 0) return
          this.statistics_exponent_line = res.data
          this.minerIndexTrendHandler()
          this.minerDimensionalityHandler()
        })
    },
    minerIndexTrendHandler: function() {

      let date = [],
        y1 = [], 
        y2 = [], 
        y3 = [], 
        y4 = [],
        echartTitle = []

      if (this.lang == 'zh') {
        echartTitle = ['基准值', '星']
      } else if (this.lang == 'en-US') {
        echartTitle = ['Base Line', 'star']
      } else if (this.lang == 'ja-JP') {
        echartTitle = ['基準値', '星']
      } else {
        echartTitle = ['기준값', '별']
      }

      let dataKey = {}
      this.dates.map(item => {
        dataKey[item] = {}
      })

      let dataList = [...this.miner_exponent_line, ...this.statistics_exponent_line]
      dataList.map(item => {
        switch (item.miner_no) {
          case 'TOP30':
            dataKey[item.day].top30 = item.synthesize_i
            break;
          case 'TOP10':
            dataKey[item.day].top10 = item.synthesize_i
            break;
          case '基准值':
            dataKey[item.day].all = item.synthesize_i
            break;
          case this.miner_exponent.miner_no:
            dataKey[item.day].miner = item.synthesize_i
        }
      })

      this.dates.map(item => {
        let data = dataKey[item]
        if (Object.keys(data).length) {
          date.push(item) 
          y1.push(data.all)
          y2.push(data.top10) 
          y3.push(data.top30) 
          y4.push(data.miner) 
        }
      })

      let echarts = this.$echarts.init(document.getElementById('minerIndexTrend'))
      echarts.setOption(echartsUtils.optionsForMinerIndexTrend({
        date,
        value: [
          { title: echartTitle[0], value: y1 },
          { title: 'TOP10', value: y2 },
          { title: 'TOP30', value: y3 },
          { title: this.miner_exponent.miner_no, value: y4 }
        ],
        echartTitle
      }))
    },

    minerDimensionalityHandler: function() {
      
      let echartsOpt = []


      if (this.lang == 'zh') {
        echartsOpt = [
          { title: '', mainColor: '#0DEBCF', splitAreaColor: '#FFFFFF', splitLineColor: '#0DEBCF', areaStyleColor: '#0DEBCF', data: [] },
          { title: '基准值', mainColor: '#333FC6', splitAreaColor: '#FFFFFF', splitLineColor: '#333FC6', areaStyleColor: '#333FC6', data: [] },
          { title: 'TOP10', mainColor: '#F9BC59', splitAreaColor: '#FFFFFF', splitLineColor: '#F9BC59', areaStyleColor: '#F9BC59', data: [] },
          { title: 'TOP30', mainColor: '#E7A2F2', splitAreaColor: '#FFFFFF', splitLineColor: '#E7A2F2', areaStyleColor: '#E7A2F2', data: [] }
        ]
      } else if (this.lang == 'en-US') {
        echartsOpt = [
          { title: '', mainColor: '#0DEBCF', splitAreaColor: '#FFFFFF', splitLineColor: '#0DEBCF', areaStyleColor: '#0DEBCF', data: [] },
          { title: 'Base Line', mainColor: '#333FC6', splitAreaColor: '#FFFFFF', splitLineColor: '#333FC6', areaStyleColor: '#333FC6', data: [] },
          { title: 'TOP10', mainColor: '#F9BC59', splitAreaColor: '#FFFFFF', splitLineColor: '#F9BC59', areaStyleColor: '#F9BC59', data: [] },
          { title: 'TOP30', mainColor: '#E7A2F2', splitAreaColor: '#FFFFFF', splitLineColor: '#E7A2F2', areaStyleColor: '#E7A2F2', data: [] }
        ]
      } else if (this.lang == 'ja-JP') {
        echartsOpt = [
          { title: '', mainColor: '#0DEBCF', splitAreaColor: '#FFFFFF', splitLineColor: '#0DEBCF', areaStyleColor: '#0DEBCF', data: [] },
          { title: '基準値', mainColor: '#333FC6', splitAreaColor: '#FFFFFF', splitLineColor: '#333FC6', areaStyleColor: '#333FC6', data: [] },
          { title: 'TOP10', mainColor: '#F9BC59', splitAreaColor: '#FFFFFF', splitLineColor: '#F9BC59', areaStyleColor: '#F9BC59', data: [] },
          { title: 'TOP30', mainColor: '#E7A2F2', splitAreaColor: '#FFFFFF', splitLineColor: '#E7A2F2', areaStyleColor: '#E7A2F2', data: [] }
        ]
      } else {
        echartsOpt = [
          { title: '', mainColor: '#0DEBCF', splitAreaColor: '#FFFFFF', splitLineColor: '#0DEBCF', areaStyleColor: '#0DEBCF', data: [] },
          { title: '기준값', mainColor: '#333FC6', splitAreaColor: '#FFFFFF', splitLineColor: '#333FC6', areaStyleColor: '#333FC6', data: [] },
          { title: 'TOP10', mainColor: '#F9BC59', splitAreaColor: '#FFFFFF', splitLineColor: '#F9BC59', areaStyleColor: '#F9BC59', data: [] },
          { title: 'TOP30', mainColor: '#E7A2F2', splitAreaColor: '#FFFFFF', splitLineColor: '#E7A2F2', areaStyleColor: '#E7A2F2', data: [] }
        ]
      }


      let keyOrder = [
        'total_power_i',
        'avg_reward_i',
        'power_increment_7day_i',
        'keep_gas_week_i', 
        'section_fault_rate_i' 
      ]

      this.statistics_exponent.concat([this.miner_exponent]).map(item => {
        switch (item.miner_no) {
          case 'TOP30':
            keyOrder.map(key => {
              echartsOpt[3].data.push(Math.round(item[key]) / 2)
            })
            break;
          case 'TOP10':
            keyOrder.map(key => {
              echartsOpt[2].data.push(Math.round(item[key]) / 2)
            })
            break;
          case '基准值':
            keyOrder.map(key => {
              echartsOpt[1].data.push(Math.round(item[key]) / 2)
            })
            break;
          case this.miner_exponent.miner_no:
            keyOrder.map(key => {
              echartsOpt[0].data.push(Math.round(item[key]) / 2)
            })
            echartsOpt[0].title = item.miner_no
        }
      })
      this.minerDimensionalityList = echartsOpt
      this.$nextTick(() => {
        let echartTitle = []
        if (this.lang == 'zh') {
          echartTitle = ['昨日有效算力', '昨日产出效率', '7日算力增量', '7日算力维护Gas', '7日扇区错误率']
        } else if (this.lang == 'en') {
          echartTitle = ['Yesterday Effective Power', 'Yesterday output \n rate', '7-day power growth', '7-day maintenance \n Consumption', '7-day sector \n error rate']
        } else if (this.lang == 'ja') {
          echartTitle = ['昨日の有効計ストレージ', '昨日の出力効率', '7日に増量を計算する', '7日間の計ストレージ維持Gas', '7日セクターエラー率']
        } else {
          echartTitle = ['어제 유효한 계산력', '어제 생산 효율', '7일 계산력 증가량', '7일 계산력 유지하다 Gas다', '7 일 섹터 오류율']
        }
        this.minerDimensionalityList.map((item, index) => {
          let echarts = this.$echarts.init(document.getElementById(`minerDimensionality${index}`))
          let options = echartsUtils.optionsForDimensionality(item, echartTitle)
          echarts.setOption(options)
        })
      })
    },

  },

  mounted: function() {
    this.minerIndexTrendHandler()
    this.minerDimensionalityHandler()
  },

  beforeDestroy: function() {

  }
}
</script>
<style>
.title-box .el-input-group__append .el-button {
  background: #333FC6;
  color: #fff;
}

.title-box .el-input-group__append,
.title-box .el-input-group__prepend {
  background: #333FC6;
  border: 1px solid #333FC6;

}
</style>