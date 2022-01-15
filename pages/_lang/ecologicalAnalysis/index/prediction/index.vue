<template>
  <div>
    <p class='lg:block hidden text-2xl mb-4'>{{$t('Lang.Forecast and analysis')}}</p>
    <div class="mb-3 rounded-md ">
        <div class="rounded-md lg:bg-white mb-3">
            <div class="flex items-center justify-between lg:h-20  lg:px-6 lg:border-b border-solid border-E8E7EB">
                <div class="flex items-center">
                    <span class="lg:text-lg text-xl font-medium text-dark ">{{$t('Lang.Node block prediction')}}</span>
                </div>
                <div class='w-60'>
                  <el-input clearable v-model="orderSeach" size="mini" :trigger-on-focus="false" @clear='changeSelect'  @keyup.enter.native="searchChange" :placeholder="$t('Lang.Search node')">
                    <el-button slot="append" size='mini' @click="changeSelect">
                      GO
                    </el-button>
                  </el-input>
                </div>
            </div>
            <div class='bg-white lg:px-6 px-2 rounded-md'>
                <p class='mt-4'>{{$t('Lang.Current node')}} ： {{myNode}}</p>
                <div id="echartsBlockPrediction" class='h-64 lg:h-96 '></div>
                <div class=' py-4'>
                    <p class='text-main mb-2'>*{{$t('Lang.Node block prediction description')}}：</p>
                    <p class='text-6C757E'>1. {{$t('Lang.Calculate based on historical computing power, computing power growth rate, and node output efficiency to predict the node output efficiency in the next 30 days')}}</p>
                    <p class='text-6C757E'>2. {{$t('Lang.The result is a calculation result, which may be different from the actual data, and is for reference only')}}</p>
                </div>

            </div>
        </div>
    </div>
    <div class='lg:hidden h-3 bgbox'></div>
    <div class="lg:mt-0 mt-12 mb-3 rounded-md ">
        <div class="rounded-md lg:bg-white mb-3">
            <div class="flex items-center justify-between lg:h-20  lg:px-6 lg:border-b border-solid border-E8E7EB">
                <div class="flex items-center">
                    <span class="lg:text-lg text-xl font-medium text-dark lg:mb-0 mb-2">{{$t('Lang.FIL value analysis')}}</span>
                </div>
            </div>
            <div class='bg-white lg:px-6 px-2 rounded-md'>
              <div id="echartsFILCirculation" class='h-64 lg:h-96 '></div>
              <div class=' py-4'>
                  <p class='text-main mb-2'>*{{$t('Lang.FIL value analysis description')}}：</p>
                  <p class='text-6C757E'>1. {{$t('Lang.The value of FIL aims to reflect how much effective storage each FIL carries')}}</p>
                  <p class='text-6C757E'>2. {{$t('Lang.The higher the value, it means that a FIL contains more stored data, and the higher the value of the FIL')}}</p>
              </div>
            </div>
        </div>
    </div>
    <div class='lg:hidden h-3 bgbox'></div>
    <div class="lg:mt-0 mt-12 mb-3 rounded-md ">
      <div class="rounded-md lg:bg-white mb-3">
          <div class="flex items-center justify-between lg:h-20  lg:px-6 lg:border-b border-solid border-E8E7EB">
              <div class="flex items-center">
                  <span class="lg:text-lg text-xl font-medium text-dark lg:mb-0 mb-2">{{$t('Lang.Sector pledge prediction')}}</span>
              </div>
          </div>
          <div class='bg-white lg:px-6 px-2 rounded-md'>
              <div id="echartsSectorPledge" class="h-64 lg:h-96"></div>
              <div class=' py-4'>
                  <p class='text-main mb-2'>*{{$t('Lang.Sector pledge prediction description')}}：</p>
                  <p class='text-6C757E'>1. {{$t('Lang.Sector pledge will count the past daily sector pledge amount, and use algorithms to predict the future sector pledge')}}</p>
                  <p class='text-6C757E'>2. {{$t('Lang.The result is a calculation result, which may be different from the actual data, and is for reference only')}}</p>
              </div>
          </div>
      </div>
     </div>
    <div class='lg:hidden h-3 bgbox'></div>
    <div class="lg:mt-0 mt-12 mb-3 rounded-md ">
      <div class="rounded-md lg:bg-white mb-3">
          <div class="flex items-center justify-between lg:h-20  lg:px-6 lg:border-b border-solid border-E8E7EB">
              <div class="flex items-center">
                  <span class="lg:text-lg text-xl font-medium text-dark lg:mb-0 mb-2">{{$t('Lang.Network circulation forecast')}}</span>
              </div>
          </div>
          <div class='bg-white lg:px-6 px-2 rounded-md'>
              <div id='echartsNetworkCirculation' class='h-64 lg:h-96 '></div>
              <div class=' py-4'>
                  <p class='text-main mb-2'>*{{$t('Lang.Network circulation forecast description')}}：</p>
                  <p class='text-6C757E'>1. {{$t('Lang.The network circulation will count the daily FIL circulation in the past, and use algorithms to predict the future FIL circulation')}}</p>
                  <p class='text-6C757E'>2. {{$t('Lang.The result is a calculation result, which may be different from the actual data, and is for reference only')}}</p>
                    
              </div>

          </div>
      </div>
    </div>

    
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import utils from '@/static/utils.js'
import echartsUtils from '@/static/echarts-utils.js'


export default {

  components: {

  },

  watch: {

  },

  computed: {
    ...mapGetters({
      globalOverview: 'getGlobalOverview',
    }),
    pledgeForOneTiB: function() {
      let t = []
      this.lookups.map(per => {
        t.push([per.date, per.avg_pledge])
      })
      return t
    },
    circulation: function() {
      let t = []
      this.lookups.map(per => {
        t.push([per.date, per.circulating_supply / Math.pow(10, 18)])
      })
      return t
    },
    circulationReversePostion: function() {
      let t = []
      this.lookups.map(per => {
        t.push([per.date, utils.formatPower(per.power, 8, 'TiB')[0].replace(/,/g, '') / parseFloat(per.circulating_supply / Math.pow(10, 18))])
      })
      return t
    }
  },

  asyncData({ app }) {
  },

  data: function() {
    return {
        lang: this.$store.state.locale,
        lookups:[],
        collectionNode:'',
        collectionNodeList:[],
        predictionList:[],
        user_info:'',
        miner_no:'',
        orderSeach:'',
        myNode:''
    }
  },

  methods: {
    getNode(item){
      this.$axios.post('/api/explorer/get_calculate_block_and_reward', {
        miner_no: item
      }).then(res => {
          this.predictionList = res.data.slice(0,30)
          this.initEchartsBlockPrediction()
      })
    },
    searchChange: function(e) {
      if (!e) return;
      let me = this;
      setTimeout(function() {
        me.changeSelect(e);
      }, 200);
    },
    changeSelect(){
      if(this.orderSeach == ''){
        this.myNode = this.collectionNode
        this.getNode(this.collectionNode)
      }else{
        this.$axios.post('/api/explorer/search_miner_or_wallet', {
          value: this.orderSeach
        }).then(res=>{
          if(res.data.type == 'shot'){
            this.myNode = this.orderSeach
            this.getNode(this.orderSeach)
          }else{
            let lang_errTitle = '',
              lang_errMsg_empyt = '';

            switch (this.lang) {
              case 'zh':
                lang_errTitle = '错误'
                lang_errMsg_empyt = '请输入正确存储供应商'
                break;
              case 'en':
                lang_errTitle = 'Error'
                lang_errMsg_empyt = 'Storage Provider cannot be empty'
                break;
              case 'ko':
                lang_errTitle = '오류'
                lang_errMsg_empyt = '저장 공급자는 비워 둘 수 없습니다'
                break;
              case 'ja':
                lang_errTitle = 'エラー'
                lang_errMsg_empyt = 'ストレージベンダーを空にすることはできません'
                break;
              }
            this.$notification.error({
                title:lang_errTitle,
                message:lang_errMsg_empyt
              });
            }

        })
      }
    },
    initEchartsBlockPrediction: function() {
      let y1 = [],
        y2 = [], 
        date = [],
        echartTitle = []

      if (this.lang == 'zh') {
        echartTitle = ['验证成功数量', '奖励']
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
      echarts.hideLoading()
      echarts.setOption(echartsUtils.optionsForMinerOutputReward({
        y1,
        y2,
        date,
        echartTitle
      }))
      window.addEventListener("resize", () => {
        echarts.resize();
      });
    },
    initEchartsSectorPledgeHandler: function() {
      let echarts = this.$echarts.init(document.getElementById('echartsSectorPledge'))
      echarts.hideLoading()
      let echartTitle = []

      if (this.lang == 'zh') {
        echartTitle = ['Pledge']
      } else if (this.lang == 'en') {
        echartTitle = ['Sector pledge']
      } else if(this.lang == 'ja'){
        echartTitle = ['セクタ抵当']
      } else {
        echartTitle = ['섹터 서약']
      }
      echarts.setOption(echartsUtils.optionsForSectorPledge({ y1: this.pledgeForOneTiB, echartTitle, color:'#ff00ff',unit:'F/TiB',sunUnit:'F/TiB' }))
    },
    initEchartsFILCirculationHandler: function() {
      let echarts = this.$echarts.init(document.getElementById('echartsFILCirculation'))
      echarts.hideLoading()
      let echartTitle = []

      if (this.lang == 'zh') {
        echartTitle = ['全网存储', '网络流通']
      } else if (this.lang == 'en') {
        echartTitle = ['Network Storage Power', 'Circulating']
      } else if(this.lang == 'ja'){
        echartTitle = ['全ネット計ストレージ','ネットワーク循環']
      }  else {
        echartTitle = ['네트워크 채굴파워', '네트워크 유통']
      }

      echarts.setOption(echartsUtils.optionsForFILCirculation({
        echartTitle,
        y1: this.circulationReversePostion,
        date: this.circulationReversePostion[30][0],
        power: `${ utils.formatPower(this.globalOverview.power, 4)[0] } ${ utils.formatPower(this.globalOverview.power, 4)[1] }`,
        circulation: `${ utils.formatTrueFil(this.globalOverview.circulating_supply, false, 0) } F`,
        result: utils.formatPower(this.globalOverview.power, 8, 'TiB')[0].replace(/,/g, '') / parseFloat(this.globalOverview.circulating_supply / Math.pow(10, 18))
      }))
    },
    initEchartsNetworkCirculation(){
      let echarts = this.$echarts.init(document.getElementById('echartsNetworkCirculation'))
      echarts.hideLoading()
      let echartTitle = []

      if (this.lang == 'zh') {
        echartTitle = ['网络流通']
      } else if (this.lang == 'en') {
        echartTitle = ['Circulating']
      } else if(this.lang == 'ja'){
        echartTitle = ['ネットワーク循環']
      } else {
        echartTitle = ['네트워크 유통']
      }

      echarts.setOption(echartsUtils.optionsForSectorPledge({y1: this.circulation, echartTitle, color:'#F9BC59',unit:'F',sunUnit:'F' }))
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
      let networkCirculation = this.$echarts.init(document.getElementById('echartsNetworkCirculation'))
      networkCirculation.showLoading('default', {
        text: '',
        color: '#333FC6'
      })
      this.$axios.post('/api/activity/get_lookups', {}, { progress: false })
        .then(res => {
          if (res.code != 0) return
          this.lookups = res.data
          this.initEchartsSectorPledgeHandler()
          this.initEchartsNetworkCirculation()
          this.initEchartsFILCirculationHandler()
        })
        .catch(err => {
          pledge.hideLoading()
          circulation.hideLoading()
          networkCirculation.hideLoading()
        })
    },
    
  },

  beforeMount(){
    if(this.$route.query.val){
      this.collectionNode = this.myNode = this.$route.query.val
      this.changeSelect()
    }else{
      this.$axios.post("/api/explorer/get_user_info").then(res=>{
        if(res.code == 0){
          this.user_info = res.data
          return this.$axios.post("/api/explorer/get_collectible_miner",{
            user_id:this.user_info.user_id
          })
        }else{
          return this.$axios.post('/api/explorer/get_miner_index', {
            method: 'miner'
          })
        }
      }).then(res=>{
        if(res.data.length !== 0){
          this.collectionNode = res.data[0].miner_no
          this.myNode = res.data[0].miner_no
          this.getNode(this.collectionNode)
        }else{
          return this.$axios.post('/api/explorer/get_miner_index', {
            method: 'miner'
          })
        }
      }).then(res=>{
        this.collectionNode = res.data[0].miner_no
        this.myNode = res.data[0].miner_no
        this.getNode(this.collectionNode)
      })
    }
  },

  mounted: function() {
      document.body.scrollTop = document.documentElement.scrollTop = 0

      this.getLookupsHandler()
      let blockPrediction = this.$echarts.init(document.getElementById('echartsBlockPrediction'))
      blockPrediction.showLoading('default', {
        text: '',
        color: '#333FC6'
      })
  },

  beforeDestroy: function() {

  }
}
</script>
<style>

</style>