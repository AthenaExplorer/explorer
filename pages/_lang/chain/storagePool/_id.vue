<template>
  <div class=''>
      <p class='lg:text-2xl text-xl lg:mb-4 mb-2'>{{$t('Lang.Storage pool details')}}</p>
      <div class='bg-white rounded-md mb-3 lg:border-0 border border-solid border-E8E7EB'>
            <ul class="py-3 px-3 lg:px-6">
                <li class="flex items-center justify-between lg:justify-start leading-8" v-for="(item, index) in pooList" :key="index + '_index'">
                    <template v-if="!item.node && item.val!=='--'">
                        <div class="w-48 text-848599 flex-shrink-0">{{$t(item.title)}}</div>
                        <div class="truncate lg:break-all" >{{item.val}}</div>
                    </template>

                    <template v-if="item.node && item.val.length!==0">
                        <div class="w-48 text-848599 flex-shrink-0">{{$t(item.title)}}</div>
                        <div v-if='item.val.length!==0' class="flex items-end flex-wrap truncate">
                            <n-link v-for="(i,j) in item.val" :key="j+'node__'" class="text-main break-all ml-6 lg:ml-0 lg:mr-6 mr-0 truncate " :class="{'w-full':item.wrap}" :to="`/${lang}/chain/addr/${i}`">{{i}}</n-link>
                        </div>
                    </template>
                </li>
            </ul>
      </div>
      <div class="lg:flex">
        <div class="flex-1 lg:border-0 border border-solid border-E8E7EB bg-white rounded-md">
          <div class="flex items-center h-16 lg:h-20 px-3 lg:px-6 border-b border-solid border-E8E7EB">
            <span class="lg:text-lg font-medium text-dark">{{$t('Lang.Wallet overview')}}</span>
          </div>
          <div class="flex justify-center items-center">
            <div class="pb-3 lg:pb-0 w-3/5">
              <ul class="px-3 lg:px-6">
                <li class=" lg:mt-0 mt-6 mb-6">
                  <p><span class="mr-3">{{$t('Lang.Account Balance')}}</span></p>
                  <p class='text-2xl'>
                    <span class="ml-auto">{{minerData.total_balance | formatTrueFil(false)}}</span>
                    <span class="ml-2">F</span>
                  </p>
                </li>
                <li class="my-3 flex ">
                  <div class='flex items-center'>
                    <div class='inline-block w-3 h-3 rouned-lg mr-2 ' style='background:#0EEACE'></div>
                    <span class="mr-3">{{$t('Lang.Available Balance')}}：</span>
                  </div>
                  <div>
                    <span class="ml-auto">{{minerData.available_balance | formatTrueFil(false)}}</span>
                    <span class="ml-2">F</span>
                  </div>
                </li>
                <li class="my-3 flex">
                  <div class='flex items-center'>
                    <div class='inline-block w-3 h-3 bg-red-500 rouned-lg mr-2' style='background:#B19DE6'></div>
                    <span class="mr-3">{{$t('Lang.Sector pledge')}}：</span>
                  </div>
                  <div>
                    <span class="ml-auto">{{minerData.initial_pledge_balance | formatTrueFil(false)}}</span>
                    <span class="ml-2">F</span>
                  </div>
                </li>
                <li class="flex">
                  <div class='flex items-center'>
                    <div class='inline-block w-3 h-3 bg-red-500 rouned-lg mr-2' style='background:#F5D298'></div>
                    <span class="mr-3">{{$t('Lang.Reward lock-up')}}：</span>
                  </div>
                  <div>
                    <span class="ml-auto">{{minerData.locked_balance | formatTrueFil(false)}}</span>
                    <span class="ml-2">F</span>
                  </div>
                </li>
              </ul>
            </div> 
            <div id="echartsMinerBalance" class="w-2/5 h-48 lg:h-64 pt-3"></div>
          </div>
        </div>
        <div class="w-3 h-full hidden lg:block"></div>
        <div class="mt-3 lg:mt-0 flex-1 lg:border-0 border border-solid border-E8E7EB bg-white rounded-md">
          <div class="flex items-center h-16 lg:h-20 px-3 lg:px-6 border-b border-solid border-E8E7EB">
            <span class="lg:text-lg font-medium text-dark">{{$t('Lang.Hash power overview')}}</span>
          </div>
          <ul class="w-full lg:h-64 px-3 lg:px-6 py-0 lg:py-3">
            <li class="lg:mt-6 mt-6 mb-6">
              <p>
                <span class="mr-3">{{$t('Lang.Effective computing power')}}</span>
                <el-popover placement="right" trigger="hover">
                  <p>{{$t('Lang.Effective computing power')}} {{minerData.power}} bytes</p>
                  <p>{{$t('Lang.Original computing power')}} {{minerData.raw_power}} bytes</p>
                  <i class="el-icon-info cursor-pointer text-gray-500 text-base" slot="reference"></i>
                </el-popover>
              </p>
              <div class='text-2xl flex justify-between'>
                <div>
                  <span class="ml-auto">{{minerData.actual_power | formatPower(2)[0]}}</span>
                  <span class="ml-2">{{minerData.actual_power | formatPower(2)[1]}}</span>
                </div>
                <div class='flex items-end text-lg'>
                  <p class='mr-6'>{{$t('Lang.Proportion')}}:{{(minerData.actual_power/globalOverview.power) | formatPercentage}} </p>
                  <p>{{$t('Lang.Rank')}}:{{minerData.ranking}}</p>
                </div>
              </div>
            </li>
            <li class="my-3 flex justify-between items-center">
              <div class="flex justify-center items-center">
                <div class="text-848599 mr-6">
                  <span>{{$t('Lang.Original computing power')}}:</span>
                  <el-popover placement="right" trigger="hover">
                    <p>{{$t('Lang.Effective computing power')}} {{minerData.power}} bytes</p>
                    <p>{{$t('Lang.Original computing power')}} {{minerData.raw_power}} bytes</p>
                    <i class="el-icon-info cursor-pointer text-gray-500 text-base" slot="reference"></i>
                  </el-popover>
                </div>
                <div>
                  <span class="lg:text-lg">{{minerData.raw_power | formatPower(2)[0]}}</span>
                  <span>{{minerData.raw_power | formatPower(2)[1]}}</span>
                </div>
              </div>
              <div class="flex justify-center items-end">
                <div class="text-848599 text-right mr-6">{{$t('Lang.Sector size')}}:</div>
                <div>
                  <span class="lg:text-lg">{{minerData.sector_size | formatPower(0)[0]}}</span>
                  <span>{{minerData.sector_size | formatPower(0)[1]}}</span>
                </div>
              </div>
            </li>
            <li class="my-3 flex justify-between items-center">
              <div class="flex itemg-center justify-center">
                <span class="text-848599 mr-6">{{$t('Lang.Cumulative number of blocks')}}:</span>
                <span class="lg:text-lg">{{minerData.total_block_count}}</span>
              </div>
              <div class="flex justify-center items-end">
                <span class="text-848599 text-right mr-6">{{$t('Lang.Cumulative block reward')}}:</span>
                <div>
                  <span class="lg:text-lg">{{minerData.total_reward | formatTrueFil(false)}}</span>
                  <span>F</span>
                </div>
              </div>
            </li>
            <li class="my-3 flex justify-between">
              <div class="flex  justify-center">
                <span class="text-848599">{{$t('Lang.Sector status')}}</span>
              </div>
              <div class="flex items-center justify-between lg:justify-start">
                <span class="mr-2 lg:mr-6">{{$t('Lang.All')}} {{Number(minerData.sector_effect)+ Number(minerData.sector_faults)}}</span>
                <span class="mr-2 lg:mr-6 text-54B786">{{$t('Lang.Effective')}} {{minerData.sector_effect}}</span>
                <span class="mr-2 lg:mr-6 text-AB6D55">{{$t('Lang.Recovering')}} {{minerData.sector_recovering}}</span>
                <span class="text-F26B6B">{{$t('Lang.Error')}} {{minerData.sector_faults}}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div class='lg:flex'>
        <div class="mt-3 lg:border-0 border border-solid border-E8E7EB bg-white rounded-md lg:w-1/2">
          <div class="flex items-center justify-between h-16 lg:h-20 px-3 lg:px-6 border-b border-solid border-E8E7EB">
            <div class="flex items-center">
              <span class="lg:text-lg font-medium text-dark">{{$t('Lang.Output statistics')}}</span>
            </div>
            <ul class="hidden lg:flex justify-center checkbox-content">
              <li class="checkbox-list cursor-pointer py-1 px-3 lg:px-5 border border-solid border-E6E6EA" @click="selectCostStatistics(item)" :class="{ 'first': index == 0, 'last':  outStatList.length - 1 == index, 'active' : item.value == outStatTime }" v-for="(item, index) in outStatList" :key="item.value">
                {{$t(item.key)}}
              </li>
            </ul>
            <div class='w-40 lg:hidden block '>
              <el-select v-model="outStatTime" placeholder="请选择" @change='changeOutStatTime'>
                <el-option
                  v-for="item in outStatList"
                  :key="item.value+'_'"
                  :label="$t(item.key)"
                  :value="item.value"
                  >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="flex flex-wrap py-3 px-3 lg:px-6">
            <div class="w-1/2 lg:flex items-center py-4 " v-for="(item, index) in minerStatistics" :key="item.title">
              <div class="flex" >
                <span class="text-848599 lg:w-32 mr-4" v-if="index == 6">{{$t(item.title)}}:</span>
                <span class="text-848599 lg:w-32 mr-4" v-if="index < 6">{{$t(item.title)}}:
                  <el-popover v-if="item.popover" trigger="hover" :content="$t(item.popover)">
                    <i class="el-icon-info cursor-pointer text-gray-500 text-base" slot="reference"></i>
                  </el-popover>
                </span>
                <div :class="{'text-red-500' : item.danger}">
                  <span class="lg:text-lg">{{item.val}}</span>
                  <span>{{item.unit}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="w-3 h-full hidden lg:block"></div>
        <div class="mt-3 lg:border-0 border border-solid border-E8E7EB bg-white rounded-md lg:w-1/2">
          <div class="flex items-center justify-between h-16 lg:h-20 px-3 lg:px-6 border-b border-solid border-E8E7EB">
            <div class="flex items-center">
              <span class="lg:text-lg font-medium text-dark">{{$t('Lang.Cost statistics')}}</span>
            </div>
            <ul class="hidden lg:flex justify-center checkbox-content">
              <li class="checkbox-list cursor-pointer py-1 px-3 lg:px-5 border border-solid border-E6E6EA" @click="selectStatTimehandler(item)" :class="{ 'first': index == 0, 'last':  costStatisticsList.length - 1 == index, 'active' : item.value == costStatistics }" v-for="(item, index) in costStatisticsList" :key="item.value">
                {{$t(item.key)}}
              </li>
            </ul>
            <div class='w-40 lg:hidden block '>
              <el-select v-model="costStatistics" :placeholder="$t('Lang.Please Select')" @change='changeCostStatistics'>
                <el-option
                  v-for="item in costStatisticsList"
                  :key="item.value+'_'"
                  :label="$t(item.key)"
                  :value="item.value"
                  >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="flex flex-wrap py-3 px-3 lg:px-6">
            <div class="w-1/2 lg:flex items-center py-4 " v-for="(item, index) in minerCost" :key="item.title">
              <div class="lg:flex" >
                <span class="text-848599 lg:w-40 mr-4" v-if="index == 6">{{$t(item.title)}}:</span>
                <span class="text-848599 lg:w-40 mr-4" v-if="index < 6">{{$t(item.title)}}:
                  <el-popover v-if="item.popover" trigger="hover" :content="$t(item.popover)">
                    <i class="el-icon-info cursor-pointer text-gray-500 text-base" slot="reference"></i>
                  </el-popover>
                </span>
                <div v-if="item.color" :class="{'text-green-500' : item.danger,'text-red-500' : !item.danger}">
                  <span class="lg:text-lg">{{item.val}}</span>
                  <span>{{item.unit}}</span>
                </div>
                <div v-else >
                  <span class="lg:text-lg">{{item.val}}</span>
                  <span>{{item.unit}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
       
      <div class="lg:flex mt-3 mb-3">
        <div class="flex-1 lg:border-0 border border-solid border-E8E7EB bg-white rounded-md">
          <div class="flex items-center justify-between h-16 lg:h-20 px-3 lg:px-6 border-b border-solid border-E8E7EB">
            <div class="flex items-center">
              <span class="lg:text-lg font-medium text-dark">{{$t('Lang.Change in computing power')}}</span>
            </div>
            <ul class="hidden  lg:flex justify-center checkbox-content">
              <li class="checkbox-list cursor-pointer py-1 px-3 lg:px-5 border border-solid border-E6E6EA" @click="selectPowerhandler(item.value)" :class="{ 'first': index == 0, 'last':  powerList.length - 1 == index, 'active' : item.value == powerTime }" v-for="(item, index) in powerList" :key="item.value">
                {{$t(item.key)}}
              </li>
            </ul>
            <div class='w-40 lg:hidden block '>
              <el-select v-model="powerTime" placeholder="请选择" @change='changePowerTime'>
                <el-option
                  v-for="item in powerList"
                  :key="item.value+'__'"
                  :label="$t(item.key)"
                  :value="item.value"
                  >
                </el-option>
              </el-select>
            </div>
          </div>
          <div id="echartsMinerPower" class="h-64 lg:h-96 px-3"></div>
        </div>
        <div class="w-3 h-full hidden lg:block"></div>
        <div class="mt-3 lg:mt-0 flex-1 lg:border-0 border border-solid border-E8E7EB bg-white rounded-md">
          <div class="flex items-center justify-between h-16 lg:h-20 px-3 lg:px-6 border-b border-solid border-E8E7EB">
            <div class="flex items-center justify-between">
              <span class="lg:text-lg font-medium text-dark">{{$t('Lang.Reward')}}</span>
            </div>
            <div>
              <ul class="hidden lg:flex justify-center checkbox-content">
                <li class="checkbox-list cursor-pointer py-1 px-3 lg:px-5 border border-solid border-E6E6EA" @click="selectBlockhandler(item.value)" :class="{ 'first': index == 0, 'last':  blockList.length - 1 == index, 'active' : item.value == blockTime }" v-for="(item, index) in blockList" :key="item.value">
                  {{$t(item.key)}}
                </li>
              </ul>
              <div class='w-40 lg:hidden block '>
                <el-select v-model="blockTime" placeholder="请选择" @change='changeBlockTime'>
                  <el-option
                    v-for="item in blockList"
                    :key="item.value+'___'"
                    :label="$t(item.key)"
                    :value="item.value"
                    >
                  </el-option>
                </el-select>
              </div>

            </div>
            
          </div>
            <div id="echartsMinerOutputReward" class="h-64 lg:h-96 px-3"></div>
        </div>
      </div>
   
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Childlink from '@/components/common/Childlink'
import echartsUtils from '@/static/echarts-utils.js'
import utils from '@/static/utils.js'


export default {

  name: 'ChainMiner',

  mixins: [],

  props: [],

  components: {
    Childlink
  },

  computed: {
    ...mapGetters({
      globalMinerTag: 'getGlobalMinerTag',
      globalOverview: 'getGlobalOverview'
    }),
    minerStatistics: function() {
      let {
        increase_power,
        increase_power_offset,
        block_reward, 
        block_count,
        win_count, 
        avg_reward, 
        lucky,
      } = this.miner_stats_by_no || {}
      return [{
        title: 'Lang.Power growth rate',
        val: `${utils.formatPower(increase_power)[0]}`,
        popover: 'Lang.The total effective computing power of the packaged sector completed within the selected time',
        unit: `${utils.formatPower(increase_power)[1]}`
      }, {
        title: 'Lang.Power Growth',
        val: `${utils.formatPower(increase_power_offset)[0]}`,
        unit: `${utils.formatPower(increase_power_offset)[1]}`,
        popover: 'Lang.Increment of effective computing power within the selected time',
        danger: increase_power_offset < 0
      }, {
        title: 'Lang.Block reward',
        val: utils.formatTrueFil(block_reward, false),
        popover: 'Lang.The sum of block rewards within the selected time',
        unit: 'F'
      }, {
        title: 'Lang.Number of blocks produced',
        popover: 'Lang.The total number of rewards within the selected time',
        val: utils.formatterAmount(win_count,0)
      }, {
        title: 'Lang.Number of blocks',
        popover: 'Lang.The total number of blocks produced in the selected time',
        val: utils.formatterAmount(block_count,0)
      }, {
        title: 'Lang.Production Efficiency',
        popover: 'Lang.The average number of FIL produced per TiB effective computing power during the selected time',
        val: `${utils.formatTrueFil(avg_reward, false)}`,
        unit: 'F/TiB'
      }, {
        title: 'Lang.Lucky value',
        val: utils.formatterAmount(lucky * 100, 2),
        unit: '%',
        danger: lucky * 100 < 99.7
      }]
    },
    minerCost : function() {
      let {
        total_pledge,
        create_gas,
        create_gas_overview, 
        total_gas, 

      } = this.miner_gas_stats_by_no || {}
      
      return [{
        title: 'Lang.Total cost',
        val:  (Number(utils.myFormatTrueFil(total_gas || 0,false,4))+Number(utils.myFormatTrueFil(total_pledge || 0,false,4))).toFixed(4) ,
        unit: 'F',
      },{
        title: 'Lang.Sector pledge',
        val: utils.formatTrueFil(total_pledge, true),
      },{
        title: 'Lang.Single T production gas',
        val: utils.formatNewEasyFil(create_gas)[0],
        unit: utils.formatNewEasyFil(create_gas)[1]+'/TiB'
      },{
        title: 'Lang.Gas Used Reference',
        popover: 'Lang.Average Gas Production in the Whole Network',
        val: utils.formatTrueFil(create_gas_overview, false),
        unit: 'F/TiB'
      },{
        title: 'Lang.Gas Consume',
        val: utils.formatTrueFil(total_gas, true),
      },{
        title: 'Lang.Gas Difference',
        popover: 'Lang.Production Gas minus production Gas reference value',
        val: utils.formatTrueFil(Number(create_gas)-Number(create_gas_overview), false).split(' ')[0],
        unit: 'F/TiB',
        danger: utils.formatTrueFil(Number(create_gas)-Number(create_gas_overview), false).split(' ')[0] < 0,
        color:true,
      }]
    },
    pooList:function(){
        let {
          owner_id,
          owner_address,
          miner_list
        } = this.minerData || {}

        return [
          {title: 'Lang.ID', val: owner_id},
          {title:'Lang.Owner',val:[owner_address],node:true},
          {title:'Lang.Node under name',val:miner_list,node:true}    
        ]
    },
  },

  asyncData({ app, params }) {
    let data = {
      miner_no: params.id,
      type: null,
      minerData: {},
      minerDataGas: {},
      minerLineDataLeft: [],
      minerLineDataRight: [],
      childRouter: [],
      walletData: {},
      walletLineData: [],
      address_type: '',
      errFlag: false,
      miners_by_address:{}
    }

    return app.$axios.post('/api/explorer/get_miner_pool_by_owner_id', {
        owner_id: data.miner_no
      })
      .then(res => {
        if (!res || res.code != 0) return data
          data.minerData = res.data 
          data.minerDataGas = res.data
          let dates = utils.getDateMiusDays(new Date(), 30)
          return app.$axios.post('/api/explorer/get_miner_pool_line_chart_by_owner_id', {
            owner_id: data.miner_no,
            stats_type: '30d'
          })
      })
      .then(res => {
        if (!res || res.code != 0) return data
          data.minerLineDataLeft = res.data
          data.minerLineDataRight = res.data
          return data
      })
      .then(res=>{
        if(res.code !== 0 ) return data;
          return data
      })
  },

  data: function() {
    return {
      copyText:'',
      dialogWidth:'',
      imgLoading:true,
      imgUrl:'',
      shareFlag:false,
      nowtime:'',
      dialogVisible:false,
      user_info:{},
      isSignIn:false,
      collectionFlag:false,
      collection:false,
      miner_no: null,
      type: null,
      minerData: {},
      childRouter: [],
      routerTitle:{
        title:'',
        img:require('~/assets/imgs/row.png')
      },
      walletData: {},
      walletLineData: [],
      address_type: '',
      outStatTime: '24h',
      outStatList: [
        { value: '24h', key: 'Lang.24 hours' },
        { value: '7d', key: 'Lang.Latest seven days' },
        { value: '30d', key: 'Lang.Latest one month' },
      ],
      costStatistics:'1d',
      costStatisticsList: [
        { value: '1d', key: 'Lang.Yesterday' },
        { value: '7d', key: 'Lang.Latest seven days' },
        { value: '30d', key: 'Lang.Latest one month' },
      ],
      powerTime: '30d',
      powerList: [
        { value: '30d', key: 'Lang.30days' },
        { value: '180d', key: 'Lang.180days' },
      ],
      blockTime: '30d',
      blockList: [
        { value: '24h', key: 'Lang.24 hours' },
        { value: '30d', key: 'Lang.30days' },
        { value: '180d', key: 'Lang.180days' },
      ],
      blockTitle:'奖励',
      blockTitleList: [
        { value: '奖励', key: 'Lang.Block reward' },
        { value: '出块预测', key: 'Lang.Block prediction' },
      ],
      blockPrediction:'30',
      blockPredictionList: [
        { value: '30', key: 'Lang.Next 30 days' },
      ],
      predictionList:[],
      gasTime:'24h',
      gasList: [
        { value:'24h', key: 'Lang.Yesterday' },
        { value:'7d' , key: 'Lang.Latest seven days' },
        { value:'30d' , key: 'Lang.30days' },
        { value:'90d' , key: 'Lang.90days' },
      ],
      lang: this.$store.state.locale,
      tagFlag: false,
      tagForm: {
        enUser: '',
        chUser: '',
        phone: '',
        autograph: ''
      },
      rules: {
        enUser: [
          { required: true, message: ' ', trigger: 'blur' },
        ],
        phone: [
          { required: true, message: ' ', trigger: 'blur' },
        ],
        autograph: [
          { required: true, message: ' ', trigger: 'blur' },
        ],
      },
      langOwmerAddress: '',
      OkLoading: false,
      nowTime: '',
      singedMsg: '5369676e617475726520666f722066696c666f780a66303132373539350a323032312d30352d31345431313a30373a33312e3833355a',
      miner_stats_by_no:[],
      miner_gas_stats_by_no:[]
    }
  },

  methods: {
    copyBtn(val) {
      const input = document.createElement('input');
      document.body.appendChild(input);
      input.setAttribute('value', val);
      input.select();

      if (document.execCommand('copy')) {
        document.execCommand('copy');
        if (this.lang == 'zh') {
          this.$message({
            message: '复制成功',
            type: 'success'
          })
        } else if (this.lang == 'en') {
          this.$message({
            message: 'Copy successfully',
            type: 'success'
          })
        } else if (this.lang == 'ja') {
          this.$message({
            message: 'コピー成功',
            type: 'success'
          })
        } else {
          this.$message({
            message: '성공적으로 복사',
            type: 'success'
          })
        }
      }
      document.body.removeChild(input);
    },
    updateGlobalMinerTagHandler() {
      let list = []
      this.$axios.post('/api/explorer/get_pool_miner_list', { is_pool: 1, page_size: 150 }, { progress: false })
        .then(res => {
          if (res.code != 0) return
          res.data.objs.map(per => {
            if (per.power < Math.pow(1024, 5) * 10) {
              list.push(per.miner_no)
            }
          })
          return this.$axios.post('/api/explorer/get_miner_apply_tag', {}, { progress: false })
        })
        .then(res => {
          if (!res || res.code != 0) return
          let _tags = {}
          res.data.map(per => {
            if (list.indexOf(per.miner_no) == -1) {
              _tags[per.miner_no] = per
            }
          })
          this.$store.commit('setGlobalMinerTag', _tags)
        })
    },
    initEchartsMinerPowerHandler: function() {
      let y1 = [], 
        y2 = [], 
        date = [],
        echartTitle = []

      if (this.lang == 'zh') {
        echartTitle = ['算力增量', '有效算力']
      } else if (this.lang == 'en') {
        echartTitle = ['Power Growth', 'Effective computing power']
      } else if (this.lang == 'ja') {
        echartTitle = ['計算力の増加', '有効計算力']
      } else {
        echartTitle = ['채굴파워 증가량', '유효 채굴파워']
      }

      this.minerLineDataLeft.map(item => {
        y1.unshift(item.increase_power_offset)
        y2.unshift(item.power)
        date.unshift(item.date)
      })
      let echarts = this.$echarts.init(document.getElementById('echartsMinerPower'))
      echarts.setOption(echartsUtils.optionsForMinerPower({
        y1,
        y2,
        date,
        echartTitle
      }))
    },
    initEchartsMinerBalance: function() {
      let echarts = this.$echarts.init(document.getElementById('echartsMinerBalance'))
      let echartTitle = []
      if (this.lang == 'zh') {
        echartTitle = ['可用余额', '扇区Pledge', '奖励锁仓']
      } else if (this.lang == 'en') {
        echartTitle = ['Available \n Balance', 'Sector \n pledge', 'Reward\nlock-up']
      } else if (this.lang == 'ja') {
        echartTitle = ['可用の余额', 'セクタ\n 抵当', 'ロックを \n 奨励する']
      } else {
        echartTitle = ['사용 가능한 \n 잔액', '섹터 \n 서약', '보상 \n 락업']
      }
      echarts.setOption(echartsUtils.optionsForMinerBalance({
        balance: this.minerData.available_balance,
        init_pledge: this.minerData.initial_pledge_balance,
        locked_pledge_balance: this.minerData.locked_balance,
        echartTitle
      }))
    },
    initEchartsMinerOutputReward: function() {
      let y1 = [], 
        y2 = [], 
        date = [],
        echartTitle = []

      if (this.lang == 'zh') {
        echartTitle = ['出块数量', '奖励']
      } else if (this.lang == 'en') {
        echartTitle = ['Number of blocks', 'Reward']
      } else if (this.lang == 'ja') {
        echartTitle = ['ブロック数', '報酬をブロックする']
      } else {
        echartTitle = ['생성 된 블록 수', '블록 보상']
      }

      this.minerLineDataRight.map(item => {
        y1.unshift(item.block_count)
        y2.unshift(item.block_reward)
        date.unshift(item.date)
      })
      let echarts = this.$echarts.init(document.getElementById('echartsMinerOutputReward'))
      echarts.setOption(echartsUtils.optionsForMinerOutputReward({
        y1,
        y2,
        date,
        echartTitle
      }))
    },
    initEchartsBlockPrediction: function() {
      let y1 = [],
        y2 = [],
        date = [],
        echartTitle = []

      if (this.lang == 'zh') {
        echartTitle = ['出块数量', '奖励']
      } else if (this.lang == 'en') {
        echartTitle = ['Number of blocks', 'Reward']
      } else if (this.lang == 'ja') {
        echartTitle = ['ブロック数', '報酬をブロックする']
      } else {
        echartTitle = ['생성 된 블록 수', '블록 보상']
      }

      this.predictionList.map(item => {
        y1.push(item.block_count)
        y2.push(item.block_reward)
        date.push(item.date)
      })
      let echarts = this.$echarts.init(document.getElementById('echartsBlockPrediction'))
      echarts.setOption(echartsUtils.optionsForMinerOutputReward({
        y1,
        y2,
        date,
        echartTitle
      }))
    },
    initEchartsWalletAccountChange: function() {
      let keys = [
        { val: 'owner_balance_value', key: 'owner' },
        { val: 'post_balance_value', key: 'post' },
        { val: 'worker_balance_value', key: 'worker' }
      ]
      let key = keys.filter(item => {
        return this.address_type.indexOf(item.key) > -1
      })
      let y1 = [],
        date = [],
        echartTitle = []

      if (this.lang == 'zh') {
        echartTitle = ['账户余额']
      } else if (this.lang == 'en') {
        echartTitle = ['Account Balance']
      } else if (this.lang == 'ja') {
        echartTitle = ['アカウント余额']
      } else {
        echartTitle = ['계정 잔액']
      }
      this.walletLineData.map(item => {
        y1.push(item.value)
        date.push(item.height_time)
      })
      let echarts = this.$echarts.init(document.getElementById('echartsWalletAccountChange'))
      echarts.setOption(echartsUtils.optionsForWalletAccountChange({
        title: '账户变化',
        date,
        value: [
          { title: echartTitle[0], value: y1 }
        ]
      }))
    },
    initEchartsGasConsumption(){
      let y1 = [],
          y2 = [],
        date = [],
        echartTitle = [];
      if (this.lang == 'zh') {
        echartTitle = ['当前存储供应商','全网均值']
      } else if (this.lang == 'en') {
        echartTitle = ['Current Storage Provider','Network average']
      } else if (this.lang == 'ja') {
        echartTitle = ['現在のストレージベンダー','全ネットワーク平均値']
      } else {
        echartTitle = ['현재 저장 공급자','네트워크 평균']
      }

      this.gasConsumptionList.map(item => {
        y1.unshift(item.day_create_gas)
        y2.unshift(item.overview_day_create_gas)
        date.unshift(item.date)
      })
      let echarts = this.$echarts.init(document.getElementById('echartsGasConsumption'))
      echarts.setOption(echartsUtils.revenueAnalysisEchart({
        y1,
        y2,
        date,
        echartTitle
      }))

    },
    selectCostStatistics: function(item) {
      if (this.outStatTime == item.value) return
      this.outStatTime = item.value
      this.get_miner_stats_by_no(this.outStatTime)
    },
    changeOutStatTime(){
      this.get_miner_stats_by_no(this.outStatTime)
    },

    selectStatTimehandler: function(item) {
      if (this.costStatistics == item.value) return
      this.costStatistics = item.value
      this.get_miner_gas_stats_by_no(this.costStatistics)
    },
    changeCostStatistics(){
      this.get_miner_gas_stats_by_no(this.costStatistics)
    },

    selectPowerhandler: function(item) {
      if (this.powerTime == item) return
      this.powerTime = item

      this.$axios.post('/api/explorer/get_miner_pool_line_chart_by_owner_id', {
        owner_id: this.miner_no,
        stats_type: item
      }).then(res => {
        this.minerLineDataLeft = res.data
        this.initEchartsMinerPowerHandler()
      })
    },
    changePowerTime(){
      this.$axios.post('/api/explorer/get_miner_pool_line_chart_by_owner_id', {
        owner_id: this.miner_no,
        stats_type: this.powerTime
      }).then(res => {
        this.minerLineDataLeft = res.data
        this.initEchartsMinerPowerHandler()
      })
    },
    selectBlockhandler: function(item) {
      if (this.blockTime == item) return
      this.blockTime = item

      this.$axios.post('/api/explorer/get_miner_pool_line_chart_by_owner_id', {
        owner_id: this.miner_no,
        stats_type: item
      }).then(res => {
        this.minerLineDataRight = res.data
        this.initEchartsMinerOutputReward()
      })
    },
    changeBlockTime(){
      this.$axios.post('/api/explorer/get_miner_pool_line_chart_by_owner_id', {
        owner_id: this.miner_no,
        stats_type: this.blockTime
      }).then(res => {
        this.minerLineDataRight = res.data
        this.initEchartsMinerOutputReward()
      })
    },
    back(){
      window.history.back(-1)
    },
    get_miner_stats_by_no(item='24h'){
      let list = {
        owner_id:this.miner_no,
        stats_type:item
      }
      this.$axios.post('/api/explorer/get_miner_pool_stats_by_owner_id',list).then(res=>{
        if(res.code !== 0) return 
        this.miner_stats_by_no = res.data
      })
    },
    get_miner_gas_stats_by_no(item){
      let list = {
        owner_id:this.miner_no,
        stats_type:item
      }
      this.$axios.post('/api/explorer/get_miner_pool_gas_by_owner_id',list).then(res=>{
        if(res.code !== 0) return 
        this.miner_gas_stats_by_no = res.data
      })
    }
  },

  filters:{
  },

  mounted: function() {
    document.body.scrollTop = document.documentElement.scrollTop = 0

      this.initEchartsMinerBalance()
      this.initEchartsMinerPowerHandler()
      this.initEchartsMinerOutputReward()

      this.get_miner_stats_by_no()
      this.get_miner_gas_stats_by_no(this.costStatistics)

  },

  beforeDestroy() {
  }
}
</script>
<style lang="scss">
.el-message-box {
  width: 60vw;
}
.activeTiele{
  font-weight: bold;
  color: #000;
}
.el-dialog__body {
  padding-top: 10px;
  padding-left: 10px;
  padding-right: 10px;
}

.el-dialog {
  margin-top: 10vh !important;
}

@media (min-width: 768px) {
  .el-dialog__body {
    padding-top: 10px;
    padding-left: 20px;
    padding-right: 20px;
  }

  .el-message-box {
    width: 40vw;
  }
}

@media (min-width: 1024px) {
  .el-dialog__body {
    padding-top: 10px;
  }

  .el-message-box {
    width: 20vw;
  }
}

.el-dialog__title {
  font-weight: bold;
}

.el-dialog__footer {
  .el-button {
    height: 2.5rem;
    width: 20%;
  }
}



.el-form--label-top .el-form-item__label {
  padding-bottom: 5px;
}

.collection-false{
  transition: all 0.2s linear;
}
.collectionBox{
  cursor: pointer;
  &:hover{
    .collection-false{
      transform:scale(1.1);
    }
  }
}
#shareBox{
  width: 340px;
  position:fixed;
  top: -99999px;
}
.showImgs{
  overflow: auto;
}
</style>