<template>
  <div>
    <p class='lg:block hidden text-2xl mb-3'>{{$t('Lang.DataCap')}}</p>
    <div class='hidden lg:flex justify-between mb-3 '>
      <div v-for="(i,j) in dashboardList" :key="i.title" @click='goRouter(i.path)' class='cursor-pointer w-1/2 lg:w-1/5 bg-white px-6 py-8 flex items-center justify-between rounded-md' :class="{'mr-4':j<4}">
        <div >
          <p class='text-6C757E mb-2'>{{$t(i.title)}}
            <el-popover trigger="hover" :content="$t(i.tips)">
              <i class="el-icon-info cursor-pointer text-gray-500 text-base" slot="reference"></i>
            </el-popover>
          </p>
          <p class='text-2xl'>{{i.value}}</p>
        </div>
        <img src="@/assets/imgs/go_right.png" alt="">
      </div>
    </div>
    <div class='lg:hidden flex flex-wrap'>
      <div v-for="i in dashboardList" :key="i.title+'phone'" @click='goRouter(i.path)' class='w-1/2  pb-3 lg:pt-6'>
        <div class='flex justify-between items-center mr-2 py-2 px-2 rounded-md bg-white border border-solid border-E8E7EB'>
          <div>
            <p class='text-6C757E'>{{$t(i.title)}}</p>
            <p class='text-xl'>{{i.value}}</p>
          </div>
          <img src="@/assets/imgs/go_right.png" alt="">
        </div>
      </div>
    </div>
    <div class='bg-white rounded-md lg:h-84 mb-3 lg:flex items-center'>
      <div class='h-48 lg:w-1/2 flex items-center lg:justify-center'>
        <div id="echartsDCtotal" class="w-2/5 h-64"></div>
        <div class='lg:w-2/5'>
          <p class='' style='color:#333'>{{$t('Lang.Total datacap granted to notary public')}}</p>
          <p class='text-2xl mt-1 mb-4'>{{this.list.notaries_datacap.total | formatPower(2)[0]}} {{this.list.notaries_datacap.total | formatPower(2)[1]}}</p>
          <div class='flex items-center mb-2'>
            <div class='inline-block w-3 h-3 rouned-lg mr-2' style='background:#0EEACE;margin-top:-1px'></div>
            <p>{{$t('Lang.Assigned')}}：{{this.list.notaries_datacap.allocated | formatPower(2)[0]}} {{this.list.notaries_datacap.allocated | formatPower(2)[1]}}</p>
          </div>
          <div class='flex items-center'>
            <div class='inline-block w-3 h-3 rouned-lg mr-2' style='background:#FED595;margin-top:-1px'></div>
            <p>{{$t('Lang.Unassigned')}}：{{Number(Number(this.list.notaries_datacap.total) - Number(this.list.notaries_datacap.allocated)) | formatPower(2)[0]}} {{Number(Number(this.list.notaries_datacap.total) - Number(this.list.notaries_datacap.allocated)) | formatPower(2)[1]}}</p>
          </div>
          
        </div>
      </div>
      <div class='w-px bg-E3E7F8 h-44 hidden lg:block'></div>
      <div class='h-48 lg:w-1/2 flex items-center lg:justify-center'>
        <div id="echartsDCdistribution" class="w-2/5 h-64"></div>
        <div calss='w-2/5'>
          <p class='mb-2'>{{$t('Lang.Datacap distribution')}}</p>
          <div v-for="i in DCdistributionList" :key="i.title" class='flex items-center mb-2'>
            <div class='inline-block w-3 h-3 rouned-lg mr-2' :style="{background:i.color,marginTop:'-1px'}"></div>
            <p>{{$t(i.name)}}: {{i.value}} ({{i.percentage}})</p>
          </div>
        </div>
      </div>
    </div>
    <div class='lg:flex block mb-3'>
      <div class='bg-white rounded-md lg:h-108 lg:w-1/2 lg:mb-0 mb-3'>
        <div class="mt-3 lg:mt-0 flex-1 lg:border-0 border border-solid border-E8E7EB bg-white rounded-md">
          <div class="flex items-center justify-between h-16 lg:h-20 px-3 lg:px-6 border-b border-solid border-E8E7EB">
            <div class="flex items-center justify-between">
              <span class="lg:text-lg font-medium text-dark">{{$t('Lang.Datacap active statistics')}}</span>
            </div>
            <div>
              <ul class="hidden lg:flex justify-center checkbox-content">
                <li class="checkbox-list cursor-pointer py-1 px-3 lg:px-5 border border-solid border-E6E6EA" 
                  @click="selectBriskhandler(item.value)" 
                  :class="{ 'first': index == 0, 'last':  briskList.length - 1 == index, 'active' : item.value == brisk }" 
                  v-for="(item, index) in briskList" :key="index+'brisk'">
                {{$t(item.key)}}
                </li>
              </ul>
              <div class='w-40 lg:hidden block '>
                <el-select v-model="brisk" placeholder="请选择" @change='changeBrisk'>
                <el-option
                  v-for="item in briskList"
                  :key="item.value+'___'"
                  :label="$t(item.key)"
                  :value="item.value"
                  >
                </el-option>
                </el-select>
              </div>
            </div>
          </div>
          <div id="echartsBrisk" class="h-64 lg:h-96 px-3"></div>
        </div>
      </div>
      <div class='hidden lg:block w-3'></div>
      <div class='bg-white rounded-md lg:h-108 lg:w-1/2'>
        <div class="mt-3 lg:mt-0 flex-1 lg:border-0 border border-solid border-E8E7EB bg-white rounded-md">
          <div class="flex items-center justify-between h-16 lg:h-20 px-3 lg:px-6 border-b border-solid border-E8E7EB">
            <div class="flex items-center justify-between">
              <span class="lg:text-lg font-medium text-dark">{{$t('Lang.Datacap data statistics')}}</span>
            </div>
            <div>
              <ul class="hidden lg:flex justify-center checkbox-content">
                <li class="checkbox-list cursor-pointer py-1 px-3 lg:px-5 border border-solid border-E6E6EA" 
                  @click="selectRecordhandler(item.value)" 
                  :class="{ 'first': index == 0, 'last':  recordList.length - 1 == index, 'active' : item.value == record }" 
                  v-for="(item, index) in recordList" :key="index+'dc'">
                {{$t(item.key)}}
                </li>
              </ul>
              <div class='w-40 lg:hidden block '>
                <el-select v-model="record" placeholder="请选择" @change='changeRecord'>
                <el-option
                  v-for="item in recordList"
                  :key="item.value+'_'"
                  :label="$t(item.key)"
                  :value="item.value"
                  >
                </el-option>
                </el-select>
              </div>
            </div>
          </div>
          <div id="echartsRecord" class="h-64 lg:h-96 px-3"></div>
        </div>
      </div>
    </div>
    <div class='mb-3'>
      <div class='bg-white rounded-md lg:h-108 w-full lg:mb-0 mb-3'>
        <div class="mt-3 lg:mt-0 flex-1 lg:border-0 border border-solid border-E8E7EB bg-white rounded-md">
          <div class="flex items-center justify-between h-16 lg:h-20 px-3 lg:px-6 border-b border-solid border-E8E7EB">
            <div class="flex items-center justify-between">
              <span class="lg:text-lg font-medium text-dark">DataCap{{$t('Lang.Issuing cost')}}</span>
            </div>
            <div>
              <ul class="hidden lg:flex justify-center checkbox-content">
                <li class="checkbox-list cursor-pointer py-1 px-3 lg:px-5 border border-solid border-E6E6EA" 
                  @click="selectInvoicehandler(item.value)" 
                  :class="{ 'first': index == 0, 'last':  invoiceList.length - 1 == index, 'active' : item.value == invoice }" 
                  v-for="(item, index) in invoiceList" :key="index+'invoice'">
                {{$t(item.key)}}
                </li>
              </ul>
              <div class='w-40 lg:hidden block '>
                <el-select v-model="invoice" placeholder="请选择" @change='changeInvoice'>
                <el-option
                  v-for="item in invoiceList"
                  :key="item.value+'___'"
                  :label="$t(item.key)"
                  :value="item.value"
                  >
                </el-option>
                </el-select>
              </div>
            </div>
          </div>
          <div id="echartsInvoice" class="h-64 lg:h-96 px-3"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import echartsUtils from '@/static/echarts-utils.js'
import utils from '@/static/utils.js'

  export default {
    asyncData({ app, params }) {
      let data = {
          list:{}
      }
      return app.$axios.post('/api/explorer/get_datacap_dashboard')
      .then(res => {
        if (res.code != 0) return data
        data.list = res.data
        return data
      })
    },
    data() {
      return {
        lang: this.$store.state.locale,
        brisk: '30d',
        briskList: [
          { value: '30d', key: 'Lang.30days' },
          { value: '90d', key: 'Lang.90days' },
        ],
        record:'30d',
        recordList: [
          { value: '30d', key: 'Lang.30days' },
          { value: '90d', key: 'Lang.90days' },
        ],
        invoice:'30d',
        invoiceList: [
          { value: '30d', key: 'Lang.30days' },
          { value: '90d', key: 'Lang.90days' },
        ],
        statisticsListLeft:[],
        statisticsListRight:[],
        invoiceEchartList:[],
      }
    },
    computed:{
        dashboardList(){
            let {
                notaries_count,
                client_count,
                provider_count,
                deal_count,
                data_size
            } = this.list
            
            return [
                {title:'Lang.Notary public',path:'/dataCap/myIndex/notaryPublic',tips:'Lang.The trustee of the distributed storage incentive layer is responsible for allocating the DataCap to customers with legitimate storage use cases',value: notaries_count || '--'},
                {title:'Lang.Datacap customers',path:'/dataCap/myIndex/customer',tips:'Lang.Valid data provider',value: client_count || '--'},
                {title:'Lang.Datacap storage provider',path:'/dataCap/myIndex/storageProvider',tips:'Lang.Suppliers providing effective data storage services',value: provider_count || '--'},
                {title:'Lang.Datacap order',path:'/dataCap/myIndex/order',tips:'Lang.Effective data order quantity',value: deal_count || '--'},
                {title:'Lang.Uplink DataCap data',path:'/dataCap/myIndex/data',tips:'Lang.The amount of valid data that has been stored',value: utils.formatPower(data_size)[0]+utils.formatPower(data_size)[1]},
            ]
        },
        DCdistributionList(){
            let {
                Oceania,
                Europe,
                NA,
                GCR,
                Asia_GCN
            } = this.list.distributed

            let total = Number(Oceania)+Number(Europe)+Number(NA)+Number(GCR)

            return[
                {name:'Lang.GCR',value:utils.formatPower(GCR)[0]+utils.formatPower(GCR)[1],color:'#8AFAC5',percentage:utils.GetPercent(GCR,total)},
                {name:'Lang.NA',value:utils.formatPower(NA)[0]+utils.formatPower(NA)[1],color:'#A5E5FF',percentage:utils.GetPercent(NA,total)},
                {name:'Lang.Europe',value:utils.formatPower(Europe)[0]+utils.formatPower(Europe)[1],color:'#FFA897',percentage:utils.GetPercent(Europe,total)},
                {name:'Lang.Asia-GCN',value:utils.formatPower(Asia_GCN)[0]+utils.formatPower(Asia_GCN)[1],color:'#FED595',percentage:utils.GetPercent(Asia_GCN,total)},
                {name:'Lang.Oceania',value:utils.formatPower(Oceania)[0]+utils.formatPower(Oceania)[1],color:'#BABCFF',percentage:utils.GetPercent(Oceania,total)},
            ]
        }
    },
    methods:{
      initEchartsDCtotal: function() {
        let echarts = this.$echarts.init(document.getElementById('echartsDCtotal'))
        let echartTitle = []
        if (this.lang == 'zh') {
          echartTitle = ['已分配', '未分配']
        } else if (this.lang == 'en') {
          echartTitle = ['Allocated', 'Unallocated']
        } else if (this.lang == 'ja') {
          echartTitle = ['割り当て済み', '未割り当て']
        } else {
          echartTitle = ['할당 됨', '할당 되 지 않 음']
        }
        let num = Math.abs(Number(Number(this.list.notaries_datacap.total) - Number(this.list.notaries_datacap.allocated))) 
        echarts.setOption(echartsUtils.DCtotal({
          balance: this.list.notaries_datacap.allocated, 
          init_pledge: num, 
          echartTitle,
          color:['#94EFEB', '#FED595']
        }))
        window.addEventListener("resize", () => {
          echarts.resize();
        });
      },
      initEchartsDCdistribution: function() {
        let echartTitle = []
        if (this.lang == 'zh') {
          echartTitle = ['大中华区', '北美区','欧洲区','除大中华区外的亚洲地区','大洋洲地区']
        } else {
          echartTitle = ['GCR', 'NA','Europe','Asia-GCN','Oceania']
        }
        let echarts = this.$echarts.init(document.getElementById('echartsDCdistribution'))
        echarts.setOption(echartsUtils.DCdistribution({
          Gcr:this.list.distributed.GCR,
          Na:this.list.distributed.NA,
          Europe:this.list.distributed.Europe,
          Asia:this.list.distributed.Asia_GCN,
          Oceania:this.list.distributed.Oceania,
          echartTitle,
          color:['#8AFAC5', '#A5E5FF', '#FFA897','#FED595', '#BABCFF']
        }))
        window.addEventListener("resize", () => {
          echarts.resize();
        });
      },
      selectBriskhandler(item){
        if (this.brisk == item) return
        this.brisk = item
        this.getStatisticsList(item)
      },
      changeBrisk(){
        this.getStatisticsList(this.brisk)
      },
      selectRecordhandler(item){
        if (this.record == item) return
        this.record = item
        this.getDataList(item)
      },
      changeRecord(){
        this.getDataList(this.record)
      },
      selectInvoicehandler(item){
        if (this.invoice == item) return
        this.invoice = item
        this.getInvoiceList(item)
      },
      changeInvoice(){
        this.getInvoiceList(this.invoice)
      },

      initEchartsBrisk(){
        let y1 = [],
          y2 = [], 
          date = [],
          echartTitle = []

        if (this.lang == 'zh') {
          echartTitle = ['活跃客户', '活跃存储供应商']
        } else if (this.lang == 'en') {
          echartTitle = ['Active customers', 'Active storage provider']
        } else if (this.lang == 'ja') {
          echartTitle = ['取引先を活発にさせる', 'アクティブストレージプロバイダ']
        } else {
          echartTitle = ['활발 한 고객', '활성 저장 소 공급 자']
        }

        this.statisticsListLeft.map(item => {
          y1.unshift(item.client_count)
          y2.unshift(item.provider_count)
          date.unshift(item.date)
        })
        let echarts = this.$echarts.init(document.getElementById('echartsBrisk'))
        echarts.setOption(echartsUtils.DCbrisk({
          y1,
          y2,
          date,
          echartTitle
        }))
        window.addEventListener("resize", () => {
          echarts.resize();
        });
      },
      initEchartsRecord(){
        let y1 = [], 
          y2 = [], 
          date = [],
          echartTitle = []

        if (this.lang == 'zh') {
          echartTitle = ['DataCap订单数', '上链DataCap数据大小']
        } else if (this.lang == 'en') {
          echartTitle = ['Number of DataCap orders', 'Uplink DataCap data size']
        } else if (this.lang == 'ja') {
          echartTitle = ['DataCapオーダー数', '上鎖DataCapデータサイズ']
        } else {
          echartTitle = ['DataCap 주문 수', '상단 체인 DataCap 데이터 크기']
        }

        this.statisticsListRight.map(item => {
          y1.unshift(item.deal_count)
          y2.unshift(item.use_size)
          date.unshift(item.date)
        })
        let echarts = this.$echarts.init(document.getElementById('echartsRecord'))
        echarts.setOption(echartsUtils.DCrecord({
          y1,
          y2,
          date,
          echartTitle
        }))
        window.addEventListener("resize", () => {
          echarts.resize();
        });
      },
      initEchartsInvoice(){
        let y1 = [], 
          y2 = [],
          date = [],
          echartTitle = []

        if (this.lang == 'zh') {
          echartTitle = ['发单成本']
        } else if (this.lang == 'en') {
          echartTitle = ['Issuing cost']
        } else if (this.lang == 'ja') {
          echartTitle = ['発注コスト']
        } else {
          echartTitle = ['인보이스 코스트']
        }

        this.invoiceEchartList.map(item => {
          y1.unshift(item.deal_gas_by_t)
          date.unshift(item.date)
        })
        let echarts = this.$echarts.init(document.getElementById('echartsInvoice'))
        echarts.setOption(echartsUtils.DCinvoice({
          y1,
          date,
          echartTitle
        }))
        window.addEventListener("resize", () => {
          echarts.resize();
        });
      },
      getStatisticsList(item){
        this.$axios.post('/api/explorer/get_datacap_stats',{
          stats_type:item
        }).then(res=>{
          this.statisticsListLeft = res.data
          this.initEchartsBrisk()
        })
      },
      getDataList(item){
        this.$axios.post('/api/explorer/get_datacap_stats',{
          stats_type:item
        }).then(res=>{
          this.statisticsListRight = res.data
          this.initEchartsRecord()

        })
      },
      getInvoiceList(item){
        this.$axios.post('/api/explorer/get_datacap_stats',{
          stats_type:item
        }).then(res=>{
          this.invoiceEchartList = res.data
          this.initEchartsInvoice()
        })
      },
      goRouter(item){
        this.$router.push(`/${this.lang}${item}`)
      }
    },
    mounted(){
      this.initEchartsDCtotal()
      this.initEchartsDCdistribution()
      this.getStatisticsList('30d')
      this.getDataList('30d')
      this.getInvoiceList('30d')
    }
  }
</script>

<style lang="scss" scoped>

</style>