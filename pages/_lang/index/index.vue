<template>
  <div class="">
    <div class='border border-solid border-E8E7EB  py-4 lg:hidden flex rounded-md bg-white'>
      <n-link class='text-center w-1/4 ' v-for="i in phoneRouter" :key="i.name" :to="`/${lang}${i.path}`">
        <img :src="i.imgUrl" alt="" class='w-16 m-auto'>
        <p>{{$t(i.name)}}</p>
      </n-link>
    </div>
    <div class="rounded-md">
      <p class='lg:hidden text-xl pt-6 text-dark'>{{$t('Lang.Overview of the whole network')}}</p>
      <div class="flex items-center bg-white rounded-md ">
        <ul class="lg:hidden flex w-full flex-wrap py-4">
          <li class="w-1/2 lg:w-1/6 mb-2 flex items-center" v-for="(item, index) in dataOverview" :key="item.title" :class="{'hidden lg:flex' : index > 7 && !showAll}">
            <div v-if="item.price" class="flex-1 flex flex-col justify-center items-center lg:border-0 border border-solid border-E8E7EB py-3 rounded-md mx-1">
              <p class="text-848599 text-center px-4 text-lg mb-1">
                {{ $t(item.title) }}
                <el-popover v-if="item.popover" trigger="hover">
                  <div class='text-left'>
                    <p>{{$t('Lang.24h lowest price')}}: ${{item.low}}</p>
                    <p>{{$t('Lang.24h highest price')}}: ${{item.high}}</p>
                  </div>
                  <i class="el-icon-info cursor-pointer text-gray-500 text-base" slot="reference"></i>
                </el-popover>
              </p>
              <div class='flex items-end' :class="{'text-FB4D56':item.unit<0,'text-01B464':item.unit>0}">
                <span class="text-xl lg:text-2xl">{{ item.val }}</span>
                <img v-show="item.unit>0" src="@/assets/imgs/index-up.png" alt="" style='width:10px;padding-bottom:5px' class='mx-1'>
                <img v-show="item.unit<0" src="@/assets/imgs/index-down.png" alt="" style='width:10px;padding-bottom:6px' class='mx-1'>
                <span class="text-lg lg:text-xl" style='padding-bottom:2px'>{{ item.unit }}%</span>
              </div>
            </div>
            <div v-else-if="item.heightTime" class="flex-1 flex flex-col justify-center items-center lg:border-0 border border-solid border-E8E7EB py-3 rounded-md mx-1">
              <p class="text-848599 text-center px-4 text-lg mb-1">
                {{ $t(item.title) }}
                <el-popover v-if="item.popover" trigger="hover" :content="$t(item.popover)">
                  <i class="el-icon-info cursor-pointer text-gray-500 text-base" slot="reference"></i>
                </el-popover>
              </p>
              <div>
                <span class="text-xl lg:text-2xl " v-if="newTime==''">--</span>
                <span class="text-xl lg:text-2xl " v-else>{{newTime}}</span>
                <span class="text-base">{{$t('Lang.Seconds ago')}}</span>
              </div>
            </div>

            <div v-else class="flex-1 flex flex-col justify-center items-center lg:border-0 border border-solid border-E8E7EB py-3 rounded-md mx-1">
              <p class="text-848599 text-center px-4 text-lg mb-1">
                {{ $t(item.title) }}
                <el-popover v-if="item.popover" trigger="hover" :content="$t(item.popover)">
                  <i class="el-icon-info cursor-pointer text-gray-500 text-base" slot="reference"></i>
                </el-popover>
              </p>
              <div>
                <span class="text-xl lg:text-2xl ">{{ item.val }}</span>
                <span class="text-base">{{ item.unit }}</span>
              </div>
            </div>
          </li>
        </ul>
         <ul class="hidden lg:flex w-full flex-wrap py-4 px-4">
          <li class="w-1/6 mb-2 flex items-center" v-for="(item, index) in dataOverview" :key="item.title" :class="{'hidden lg:flex' : index > 7 && !showAll}">
            <div v-if="item.price" class="flex-1 flex flex-col justify-center items-center border-t border-b border-solid border-E3E7F8 py-6 ">
              <p class="text-848599 text-center px-4 text-base mb-1">
                {{ $t(item.title) }}
                <el-popover v-if="item.popover" trigger="hover">
                  <div class='text-left'>
                    <p>{{$t('Lang.24h lowest price')}}: ${{item.low}}</p>
                    <p>{{$t('Lang.24h highest price')}}: ${{item.high}}</p>
                  </div>
                  <i class="el-icon-info cursor-pointer text-gray-500 text-base" slot="reference"></i>
                </el-popover>
              </p>
              <div class='flex items-end' :class="{'text-FB4D56':item.unit<0,'text-01B464':item.unit>0}">
                <span class="text-xl lg:text-2xl">{{ item.val }}</span>
                <img v-show="item.unit>0" src="@/assets/imgs/index-up.png" alt="" style='width:10px;padding-bottom:5px' class='mx-1'>
                <img v-show="item.unit<0" src="@/assets/imgs/index-down.png" alt="" style='width:10px;padding-bottom:6px' class='mx-1'>
                <span class="text-lg lg:text-xl" style='padding-bottom:2px'>{{ item.unit }}%</span>
              </div>
            </div>
            <div v-else-if="item.heightTime" class="flex-1 flex flex-col justify-center items-center lg:border-0 border border-solid border-E3E7F8 py-3 ">
              <p class="text-848599 text-center px-4 text-base mb-1">
                {{ $t(item.title) }}
                <el-popover v-if="item.popover" trigger="hover" :content="$t(item.popover)">
                  <i class="el-icon-info cursor-pointer text-gray-500 text-base" slot="reference"></i>
                </el-popover>
              </p>
              <div>
                <span class="text-xl lg:text-2xl " v-if="!newTime">--</span>
                <span class="text-xl lg:text-2xl " v-else>{{newTime}}</span>
                <span class="text-base">{{$t('Lang.Seconds ago')}}</span>
              </div>
            </div>

            <div v-else class="flex-1 flex flex-col justify-center items-center border-solid border-E3E7F8 py-3 " :class="{'border-t':index>5&&index<12,'border-b':index>5&&index<18,'py-6':index>5&&index<18}">
              <p class="text-848599 text-center px-4 text-base mb-1" :class="{'h-10':lang == 'en' || lang == 'ja'}">
                {{ $t(item.title) }}
                <el-popover v-if="item.popover" trigger="hover" :content="$t(item.popover)">
                  <i class="el-icon-info cursor-pointer text-gray-500 text-base" slot="reference"></i>
                </el-popover>
              </p>
              <div>
                <span class="text-xl lg:text-2xl ">{{ item.val }}</span>
                <span class="text-base">{{ item.unit }}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="h-10 flex items-center justify-center lg:hidden -mt-4 mb-2" @click="overviewShowHandler">
        <span class="text-848599">{{ showAll ? $t('Lang.Fold') : $t('Lang.Expand') }}</span>
        <i class="ml-1 text-848599" :class="showAll ? 'el-icon-caret-top' : 'el-icon-caret-bottom'"></i>
      </div>
    </div>
    <div class='lg:hidden h-3 bgbox'></div>
    <p class='lg:hidden text-xl pt-6 text-dark'>{{$t('Lang.Common tool')}}</p>
    <div class='flex pb-3'>
      <n-link class="w-1/2 mr-1 " :to="`/${lang}/tool/calculator/effective`">
        <div class="flex items-center justify-between lg:hidden mt-3 p-4 rounded-md" style='background:#F9F9FD'>
            <div class="">
              <p class='text-xl flex items-center mb-2'><img src="../../../assets/imgs/phone_effective.png" alt="" class='mr-2' style='width:16px;height:16px'> {{$t('Lang.FIL calculator2')}}</p>
              <p class='text-6C757E '>{{$t('Lang.Professional exclusive features')}}</p>
            </div>
            <div>
              <img src="../../../assets/imgs/phone_go.png" alt="" style='height:16px'>
            </div>
        </div>
      </n-link>
      <n-link class="w-1/2 ml-1" :to="`/${lang}/tool/pro`">
        <div class="flex items-center justify-between lg:hidden mt-3 p-4 rounded-md" style='background:#F9F9FD'>
            <div class="">
              <p class='text-xl flex items-center mb-2'><img src="../../../assets/imgs/phone_pro.png" alt="" class='mr-2' style='width:16px;height:16px'>{{$t('Lang.Health Report')}}</p>
              <p class='text-6C757E'>{{$t('Lang.Professional exclusive features')}}</p>
            </div>
            <div>
              <img src="../../../assets/imgs/phone_go.png" alt="" style='height:16px'>
            </div>
        </div>
      </n-link>
    </div>
    <div class='lg:hidden h-3 bgbox'></div>
    
    <div class="">
      <div class="lg:flex hidden">
        <div class="flex-1 rounded-md bg-white">
          <div class="flex items-center justify-between h-16 lg:h-20 px-3 lg:px-6 border-b border-solid border-E8E7EB">
            <div class="flex items-center">
              <img src="@/assets/imgs/powerTrend.png" alt="" class='w-5 mr-2'>
              <span class="text-lg">{{$t('Lang.Network Storage Power')}}</span>
            </div>
            <n-link class="text-848599 flex items-center" :to="`/${lang}/statistics/powerTrend`">
              <span>{{$t('Lang.More')}}</span>
              <i class="el-icon-arrow-right"></i>
            </n-link>
          </div>
          <div id="echartsDataAllPower" class="h-64 lg:h-96 lg:px-6 px-4 pb-2"></div>
        </div>
        <div class="w-3 h-full hidden lg:block"></div>
        <div class="mt-3 lg:mt-0 flex-1 rounded-md bg-white">
          <div class="flex items-center justify-between h-16 lg:h-20 px-3 lg:px-6 border-b border-solid border-E8E7EB">
            <div class="flex items-center">
              <img src="@/assets/imgs/productionCosts.png" alt="" class='w-6 mr-2'>
              <span class="text-lg">{{$t('Lang.Production Costs')}}</span>
            </div>
            <n-link class="text-848599 flex items-center" :to="`/${lang}/statistics/gas`">
              <span>{{$t('Lang.More')}}</span>
              <i class="el-icon-arrow-right"></i>
            </n-link>
          </div>
          <div id="echartsServiceCharge" class="h-64 lg:h-96 lg:px-6 px-4 pb-2"></div>
        </div>
      </div>
      <div class="mt-3 hidden">
      </div>
      <div class="mt-3 hidden">
      </div>
    </div>
    <div class='bg-white my-3 pb-1 lg:px-6 rounded-md'>
      <Childlink v-model="chainRouter" :routerTitle='routerTitle' />
      <nuxt-child />
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import echartsUtils from '@/static/echarts-utils.js'
import utils from '@/static/utils.js'
import Childlink from '@/components/common/Childlink'

export default {

  name: 'Data',

  mixins: [],

  props: [],

  components: {
    Childlink
  },

  computed: {
    ...mapGetters({
      globalOverview: 'getGlobalOverview',
      myprice: 'getFilPrice',
      overviewStat: 'getOverviewStat',
    }),
    dataOverview: function() {
      let {
        height,
        height_time,
        power,
        increase_power_offset,
        block_reward,
        avg_reward,
        reward_24,
        pledge,
        msg_count,
        total_pledge,
        base_fee,
        total_account,
        active_miner_count,
        circulating_supply,
        burnt_supply,
        avg_tipset_blocks
      } = this.globalOverview

      let {
        create_gas_32,
        create_gas_64,
        increase_power_loss
      } = this.overviewStat

      let {
        price,
        price_change,
        high,
        low,
      } = this.myprice



      return [
        {
          title: 'Lang.Block Height',
          val: utils.formatterAmount(height, 0),
          popover: 'Lang.Latest Block'
        },
        {
          title: 'Lang.Latest block time',
          val: height_time,
          heightTime:true
        },
        {
          title: 'Lang.Network Storage Power',
          val: utils.formatPower(power, 4)[0],
          unit: utils.formatPower(power)[1]
        },
        {
          title: 'Lang.Power Growth in 24 hours',
          val: utils.formatPower(increase_power_offset, 4)[0],
          unit: utils.formatPower(increase_power_offset)[1]
        },
        {
          title: 'Lang.Abnormal computing power',
          popover: 'Lang.Total of the latest abnormal computing power in the whole network',
          val: utils.formatPower(increase_power_loss, 4)[0],
          unit: utils.formatPower(increase_power_loss)[1]
        },
        {
          title: 'Lang.Output in latest 24 hours',
          val: utils.formatTrueFil(reward_24, false, 0),
          popover: 'Lang.The number of FIL produced in the past 24 hours',
          unit: 'F'
        },
        {
          title: 'Lang.Production Efficiency',
          val: utils.formatTrueFil(avg_reward, 4).split(' ')[0],
          popover: 'Lang.Latest 24h Mining Efficiency',
          unit: 'F/TiB'
        },
        {
          title: 'Lang.Sector pledge',
          val: Number(pledge || 0).toFixed(4),
          popover: 'Lang.Sector pledge at current block',
          unit: 'F/TiB'
        },
        {
          title: 'Lang.32GiB production gas(Real time)',
          val: utils.formatTrueFil(create_gas_32) || '--',
          unit: 'F/TiB'
        },
        {
          title: 'Lang.64GiB production gas(Real time)',
          val: utils.formatTrueFil(create_gas_64) || '--',
          unit: 'F/TiB'
        },
        {
          title: 'Lang.32GiB production gas(Yesterday)',
          val: utils.formatTrueFil(this.get_overview_day_list[0].rrm_create_gas_32) || '--',
          unit: 'F/TiB'
        },
        {
          title: 'Lang.64GiB production gas(Yesterday)',
          val: utils.formatTrueFil(this.get_overview_day_list[0].rrm_create_gas_64) || '--',
          unit: 'F/TiB'
        },
        {
          title: 'Lang.Current base rate',
          val: utils.formatNewEasyFil(base_fee)[0]  || '--',
          unit: utils.formatNewEasyFil(base_fee)[1]
        },
        {
          title: 'Lang.Number of wallet addresses',
          val: utils.inComdify(total_account) || '--' ,
        },
        {
          title: 'Lang.Number of active miners',
          val: utils.inComdify(active_miner_count)  || '--' ,
        },
        {
          title: 'Lang.Total FIL supply',
          val: utils.formatterAmount(2000000000, 0),
          unit: 'F'
        },
        {
          title: 'Lang.FIL circulation',
          val:  utils.formatTrueFil(circulating_supply, false, 0),
          unit: 'F'
        },
        {
          title: 'Lang.FIL circulation rate',
          val: circulating_supply ? utils.formatterAmount(circulating_supply / Math.pow(10, 18) / 2000000000 * 100, 4) : '--',
          popover: 'Lang.Circulation / total supply',
          unit: '%'
        },
        {
          title: 'Lang.FIL destruction quantity',
          val: utils.formatTrueFil(burnt_supply, false, 0),
          unit: 'F'
        },
        {
          title: 'Lang.Number of messages in 24 hours',
          val:utils.inComdify(msg_count)  || '--' ,
        },
        {
          title: 'Lang.Average Blocks per Tipset',
          val: utils.formatterAmount(avg_tipset_blocks) ,
        },
        {
          title: 'Lang.Rewards per block',
          val: utils.formatTrueFil(block_reward, false),
          popover: 'Lang.Block reward at current height',
          unit: 'F'
        },
        {
          title: 'Lang.FIL total pledge amount',
          val: utils.formatTrueFil(total_pledge, false, 0),
          unit: 'F'
        },
      ]
    },
    pledgeForOneTiB: function() {
      let t = []
      this.lookups.map(per => {
        if (t.length < this.today + 360) {
          t.push([per.date, per.avg_pledge])
        }
      })
      return t
    },
    circulation: function() {
      let t = []
      this.lookups.map(per => {
        if (t.length < this.today + 360) {
          t.push([per.date, per.circulating_supply / Math.pow(10, 18)])
        }
      })
      return t
    },
    circulationReversePostion: function() {
      let t = []
      this.lookups.map(per => {
        if (t.length < this.today + 360) {
          t.push([per.date, utils.formatPower(per.power, 8, 'TiB')[0].replace(/,/g, '') / parseFloat(per.circulating_supply / Math.pow(10, 18))])
        }
      })
      return t
    }
  },

  asyncData({ app }) {
    let dates = utils.getDateMiusDays(new Date(), 30)
    let data = {
      line: [],
      gas: [],
      lookups: [],
      get_overview_day_list:{}
    }
    return app.$axios.post('/api/explorer/get_overview_power_trends', {
        stats_type:'30d'
      })
      .then(res => {
        if (res.code != 0) return data
        data.line = res.data.reverse()
        return app.$axios.post('/api/explorer/get_gas_trends', {})
      })
      .then(res => {
        if (!res || res.code != 0) return data
        data.gas = res.data.reverse()
        return  app.$axios.post('/api/explorer/get_overview_day_list', {
          page_size:5,
          page_index:1
        }).then(res=>{
          if (res.code != 0) return data
          data.get_overview_day_list = res.data.objects
          return data
        })
      })
  },

  data: function() {
    return {
      line: [],
      gas: [],
      lookups: [],
      showAll: false,
      today: Math.floor((new Date() - new Date('2020/08/25 06:00:00')) / (24 * 60 * 60 * 1000)),
      chainRouter: [
        { path: `/`, title: 'Lang.Storage pool', active: false },
        { path: `/base/power`, title: 'Lang.Effective computing power', active: false },
        { path: `/base/growth`, title: 'Lang.Power growth rate', active: false },
        { path: '/base/block', title: 'Lang.Number of blocks', active: false },
        { path: `/base/efficiency`, title: 'Lang.Production Efficiency', active: false }
      ],
      routerTitle:{
        title:'Lang.Ranking List',
        img:require('~/assets/imgs/row.png')
      },
      interval: null,
      lang: this.$store.state.locale,
      phoneRouter:[
        {name:'Lang.Blockchain',path:'/blockChain/tipset',imgUrl:require('~/assets/imgs/blockChain.png')},
        {name:'Lang.Stats',path:'/statistics/panoramicData',imgUrl:require('~/assets/imgs/statistics.png')},
        {name:'Lang.Ecological analysis',path:'/ecologicalAnalysis/filindex',imgUrl:require('~/assets/imgs/ecologicalAnalysis.png')},
        {name:'Lang.Tool',path:'/tool/calculator/effective',imgUrl:require('~/assets/imgs/tool.png')},
        {name:'Lang.DataCap',path:'/dataCap',imgUrl:require('~/assets/imgs/dataCap.png')},
      ],
      newTime:'',
      timeInterval:null
    }
  },

  methods: {
    overviewShowHandler() {
      this.showAll = !this.showAll
    },
    initEchartsAllPowerHandler: function() {
      let y1 = [],
        date = [],
        y2 = [],
        y3 = [],
        y4 = [],
        echartTitle = [];

      if (this.lang == "zh") {
        echartTitle = ["全网算力", "算力增速", "算力增量"];
      } else if (this.lang == "en") {
        echartTitle = ["Network Storage Power", "Power growth rate", "Power Growth"];
      } else if (this.lang == "ja") {
        echartTitle = ["全ネット計ストレージ", "ストレージの成長", "漸増ストレージ"];
      } else {
        echartTitle = ["네트워크 채굴파워", "채굴파워 증가 속도", "채굴파워 증가량"];
      }

      this.line.map((item) => {
        y1.push(item.power);
        y2.push(item.increase_power);
        y3.push(item.increase_power_offset);
        date.push(item.date+"  03:00:00");
      });


      let echarts = this.$echarts.init(
        document.getElementById("echartsDataAllPower")
      );
      echarts.clear();
      echarts.setOption(
        echartsUtils.overviewPowerTrendsEchart({
          y1,
          y2,
          y3,
          date,
          echartTitle,
        }),
        false
      );
    },
    initEchartsServiceChargeHandler: function() {
      let y1 = [],
        date = [],
        y2 = [],
        y3 = [],
        echartTitle = []

      if (this.lang == 'zh') {
        echartTitle = ['Base Fee', '32GiB生产Gas', '64GiB生产Gas']
      } else if (this.lang == 'en') {
        echartTitle = ['Base Fee', '32GiB production gas', '64GiB production gas']
      } else if(this.lang == 'ja'){
        echartTitle = ['Base Fee','32GiB生産Gas','64GiB生産Gas']
      } else {
        echartTitle = ['Base Fee', '32GiB생산Gas', '64GiB생산Gas']
      }
      this.gas.map(item => {
        y2.push(item.create_gas_32)
        y3.push(item.create_gas_64)
        y1.push(item.base_fee)
        date.push(item.height_time)
      })
      let echarts = this.$echarts.init(document.getElementById('echartsServiceCharge'))
      echarts.hideLoading()
      echarts.setOption(echartsUtils.optionsForServiceCharge({
        y1,
        y2,
        y3,
        date,
        echartTitle
      }))
    },
    initEchartsEfficiencyHandler: function() {
      let y1 = [],
        date = [],
        echartTitle = []

      if (this.lang == 'zh') {
        echartTitle = ['产出效率']
      } else if (this.lang == 'en') {
        echartTitle = ['Production Efficiency']
      } else if(this.lang == 'ja'){
        echartTitle = ['生産効率']
      } else {
        echartTitle = ['생산 효율']
      }

      this.line.map(item => {
        y1.push(item.avg_reward)
        date.push(item.date)
      })
      let echarts = this.$echarts.init(document.getElementById('echartsEfficiency'))
      echarts.setOption(echartsUtils.optionsForEfficiency({
        y1,
        date,
        echartTitle
      }))
    },
    initEchartsCurrencyTrendHandler: function() {
      let y1 = [],
        date = [],
        echartTitle = []

      if (this.lang == 'zh') {
        echartTitle = ['价格']
      } else if (this.lang == 'en') {
        echartTitle = ['Price']
      } else if(this.lang == 'ja'){
        echartTitle = ['価格']
      } else {
        echartTitle = ['가격']
      }

      this.line.map(item => {
        y1.push(item.price)
        date.push(item.date)
      })
      let echarts = this.$echarts.init(document.getElementById('echartsCurrencyTrend'))
      echarts.setOption(echartsUtils.optionsForCurrencyTrend({
        y1,
        date,
        echartTitle
      }))
    },
    initEchartsSectorPledgeHandler: function() {
      let echarts = this.$echarts.init(document.getElementById('echartsSectorPledge'))
      echarts.hideLoading()
      let echartTitle = []

      if (this.lang == 'zh') {
        echartTitle = ['Pledge', '网络流通']
      } else if (this.lang == 'en') {
        echartTitle = ['Sector pledge', 'Circulating']
      } else if(this.lang == 'ja'){
        echartTitle = ['セクタ抵当','ネットワーク循環']
      } else {
        echartTitle = ['섹터 서약', '네트워크 유통']
      }

      echarts.setOption(echartsUtils.optionsForSectorPledge({ y1: this.pledgeForOneTiB, y2: this.circulation, echartTitle }))
    },
    initEchartsFILCirculationHandler: function() {
      let echarts = this.$echarts.init(document.getElementById('echartsFILCirculation'))
      echarts.hideLoading()
      let echartTitle = []

      if (this.lang == 'zh') {
        echartTitle = ['全网算力', '网络流通']
      } else if (this.lang == 'en') {
        echartTitle = ['Network Storage Power', 'Circulating']
      } else if(this.lang == 'ja'){
        echartTitle = ['全ネット計算力','ネットワーク循環']
      }  else {
        echartTitle = ['네트워크 채굴파워', '네트워크 유통']
      }

      echarts.setOption(echartsUtils.optionsForFILCirculation({
        echartTitle,
        y1: this.circulationReversePostion,
        date: this.circulationReversePostion[this.today][0],
        power: `${ utils.formatPower(this.globalOverview.power, 4)[0] } ${ utils.formatPower(this.globalOverview.power, 4)[1] }`,
        circulation: `${ utils.formatTrueFil(this.globalOverview.circulating_supply, false, 0) } F`,
        result: utils.formatPower(this.globalOverview.power, 8, 'TiB')[0].replace(/,/g, '') / parseFloat(this.globalOverview.circulating_supply / Math.pow(10, 18))
      }))
    },
    getGasDataHandler() {
      let charge = this.$echarts.init(document.getElementById('echartsServiceCharge'))
      charge.showLoading('default', {
        text: '',
        color: '#333FC6'
      })
      this.$axios.post('/api/explorer/get_gas_trends', {}, { progress: false })
        .then(res => {
          if (res.code != 0) return
          this.gas = res.data.reverse()
          this.initEchartsServiceChargeHandler()
        })
    },
    getLookupsHandler() {
      let pledge = this.$echarts.init(document.getElementById('echartsSectorPledge'))
      pledge.showLoading('default', {
        text: '',
        color: '#333FC6'
      })
      let circulation = this.$echarts.init(document.getElementById('echartsFILCirculation'))
      circulation.showLoading('default', {
        text: '',
        color: '#333FC6'
      })
      this.$axios.post('/api/activity/get_lookups', {}, { progress: false })
        .then(res => {
          if (res.code != 0) return
          this.lookups = res.data
          this.initEchartsSectorPledgeHandler()
          this.initEchartsFILCirculationHandler()
        })
        .catch(err => {
          pledge.hideLoading()
          circulation.hideLoading()
        })
    },
    getNewTime(){
      var arr = this.globalOverview.height_time.split(/[- : \/]/),
      date2 = new Date(arr[0], arr[1]-1, arr[2], arr[3], arr[4], arr[5]);
      let offset = Number(new Date().getTimezoneOffset()/60) + 8
      var oldTime = date2.getTime()
      var nowTime = Date.parse(new Date())
      this.newTime = (Number(nowTime) + Number(offset*3600000) - Number(oldTime))/1000
    }
  },

  mounted: function() {
    this.initEchartsAllPowerHandler()
    this.initEchartsServiceChargeHandler()
    this.interval = setInterval(() => {
      this.getGasDataHandler()
    }, 2 * 60 * 1000)
    this.timeInterval = setInterval(()=>{
      this.getNewTime()
    },1000)

    
  },

  beforeDestroy: function() {
    clearInterval(this.interval)
    this.interval = null

    clearInterval(this.timeInterval)
    this.timeInterval = null
  }

}
</script>
<style scoped>

</style>