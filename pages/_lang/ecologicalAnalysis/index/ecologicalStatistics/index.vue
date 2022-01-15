<template>
   <div class="pb-3">
    <p class='lg:block hidden text-2xl mb-3'>{{$t('Lang.Statistical overview')}}</p>
    <div class="rounded-md lg:bg-white ">
      <div class=" lg:px-6 pb-3 lg:pb-6 flex flex-wrap">
        <div v-for="i in statList" :key="i.title" class='lg:w-1/6 w-1/2 text-center lg:pb-0 pb-3 lg:pt-6'>
          <div  class=' mr-2 py-2 rounded-md bg-white lg:border-0 border border-solid border-E8E7EB'>
            <p class='text-xl lg:text-2xl'>{{i.val}} {{i.unit}}</p>
            <p class='text-6C757E lg:mt-2'>
              {{$t(i.title)}}
              <el-popover v-if="i.popover" trigger="hover">
                <div class='text-left'>
                  <p>{{$t(i.popover)}}</p>
                </div>
                <i class="el-icon-info cursor-pointer text-gray-500 text-base" slot="reference"></i>
              </el-popover>
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="lg:flex mt-3 mb-3">
    <div class="flex-1 lg:border-0 border border-solid border-E8E7EB bg-white rounded-md">
        <div class="flex items-center justify-between h-16 lg:h-20 px-3 lg:px-6 border-b border-solid border-E8E7EB">
        <div class="flex items-center">
            <span class="lg:text-lg font-medium text-dark">{{$t('Lang.Transaction cost statistics')}}</span>
        </div>
        
        <ul class="hidden  lg:flex justify-center checkbox-content">
            <li class="checkbox-list cursor-pointer py-1 px-3 lg:px-5 border border-solid border-E6E6EA" 
            @click="selectTransactionhandler(item.value)" 
            :class="{ 'first': index == 0, 'last':  transactionList.length - 1 == index, 'active' : item.value == transactionTime }" 
            v-for="(item, index) in transactionList" :key="item.value">
            {{$t(item.key)}}
            </li>
        </ul>
        
        <div class='w-40 lg:hidden block '>
            <el-select v-model="transactionTime" placeholder="请选择" @change='changeTransaction'>
            <el-option
                v-for="item in transactionList"
                :key="item.value+'order'"
                :label="$t(item.key)"
                :value="item.value"
                >
            </el-option>
            </el-select>
        </div>
        </div>
        <div id="echartsTransaction" class="h-64 lg:h-96 px-3"></div>
    </div>
    <div class="w-3 h-full hidden lg:block"></div>
    <div class="mt-3 lg:mt-0 flex-1 lg:border-0 border border-solid border-E8E7EB bg-white rounded-md">
        <div class="flex items-center justify-between h-16 lg:h-20 px-3 lg:px-6 border-b border-solid border-E8E7EB">
        <div class="flex items-center justify-between">
            <span class="lg:text-lg font-medium text-dark">{{$t('Lang.Active customer statistics')}}</span>
        </div>
        <div>
            <ul class="hidden lg:flex justify-center checkbox-content">
            <li class="checkbox-list cursor-pointer py-1 px-3 lg:px-5 border border-solid border-E6E6EA" 
                @click="selectCustomerhandler(item.value)" 
                :class="{ 'first': index == 0, 'last':  customerList.length - 1 == index, 'active' : item.value == customerTime }" 
                v-for="(item, index) in customerList" :key="item.value">
                {{$t(item.key)}}
            </li>
            </ul>
            <div class='w-40 lg:hidden block '>
            <el-select v-model="customerTime" placeholder="请选择" @change='changeCustomer'>
                <el-option
                v-for="item in customerList"
                :key="item.value+'customer'"
                :label="$t(item.key)"
                :value="item.value"
                >
                </el-option>
            </el-select>
            </div>

        </div>
        
        </div>
        <div id="echartsCustomer" class="h-64 lg:h-96 px-3"></div>
    </div>
    </div>

    <div class="flex-1 lg:border-0 border border-solid border-E8E7EB bg-white rounded-md">
        <div class="flex items-center justify-between h-16 lg:h-20 px-3 lg:px-6 border-b border-solid border-E8E7EB">
        <div class="flex items-center">
            <span class="lg:text-lg font-medium text-dark">{{$t('Lang.Order data statistics')}}</span>
        </div>
        <ul class="hidden  lg:flex justify-center checkbox-content">
            <li class="checkbox-list cursor-pointer py-1 px-3 lg:px-5 border border-solid border-E6E6EA" 
            @click="selectOrderhandler(item.value)" 
            :class="{ 'first': index == 0, 'last':  orderList.length - 1 == index, 'active' : item.value == orderTime }" 
            v-for="(item, index) in orderList" :key="item.value">
            {{$t(item.key)}}
            </li>
        </ul>
        <div class='w-40 lg:hidden block '>
            <el-select v-model="orderTime" placeholder="请选择" @change='changeOrderTime'>
                <el-option
                    v-for="item in orderList"
                    :key="item.value+'order'"
                    :label="$t(item.key)"
                    :value="item.value"
                    >
                </el-option>
            </el-select>
        </div>
        </div>
        <div id="echartsOrder" class="h-64 lg:h-96 px-3"></div>
    </div>
    
  </div>
</template>
<script>
import echartsUtils from "@/static/echarts-utils.js";
import utils from "@/static/utils.js";

export default {
    data() {
        return {
            lang: this.$store.state.locale,
            orderTime:'30d',
            orderList:[
                { value:'30d' , key: 'Lang.30days' },
                { value:'90d' , key: 'Lang.90days' },
                { value:'180d' , key: 'Lang.180days' },
            ],
            customerTime:'30d',
            customerList:[
                { value:'30d' , key: 'Lang.30days' },
                { value:'90d' , key: 'Lang.90days' },
                { value:'180d' , key: 'Lang.180days' },
            ],
            transactionTime:'30d',
            transactionList:[
                { value:'30d' , key: 'Lang.30days' },
                { value:'90d' , key: 'Lang.90days' },
                { value:'180d' , key: 'Lang.180days' },
            ],
            dealStat:{},
            EchartsListOrder:[],
            EchartsListCustomer:[],
            EchartsListTransaction:[],
        }
    },
    mounted(){
        this.getList();
        this.getEchartsAllList()
    },
    computed:{
        statList(){
            let {
                deal_count,
                verified_deal_count,
                verified_data_size,
                client_count,
                deal_gas_by_t,
                avg_price,
                piece_cid_count

            } = this.dealStat;

            return [
                { title:'Lang.24h order quantity', val:deal_count || '--', unit:'',popover:'Lang.ecologicalStatisticsText1'},
                { title:'Lang.24h verify order quantity', val:verified_deal_count || '--', unit:'',popover:'Lang.ecologicalStatisticsText2'},
                { title:'Lang.24h order data', val: utils.formatPower(verified_data_size)[0], unit:utils.formatPower(verified_data_size)[1],popover:'Lang.ecologicalStatisticsText3'},
                { title:'Lang.24h active customers', val:client_count || '--', unit:'',popover:'Lang.ecologicalStatisticsText4'},
                { title:'Lang.24h transaction cost', val: utils.formatTrueFil(deal_gas_by_t), unit:'F/TiB',popover:'Lang.ecologicalStatisticsText5'},
                { title:'Lang.24h unique data CID', val:piece_cid_count || '--', unit:'',popover:'Lang.Number of CID files stored in order in recent 24 hours after de duplication'},
            ]
        },
    },
    methods:{
        getList(){
            this.$axios.post('/api/explorer/get_deal_stat').then(res=>{
                if(res.code == 0){
                    this.dealStat = res.data
                }
            })
        },
        getEchartsList(name,type){
            this.$axios.post('/api/explorer/get_deal_day',{
                stats_type:type
            }).then(res=>{
                if(res.code == 0){
                    this[name] = res.data
                    switch (name) {
                        case 'EchartsListOrder':
                            this.initEchartsOrder();
                            break;
                        case 'EchartsListCustomer':
                            this.initEchartsCustomer();
                            break;
                        case 'EchartsListTransaction':
                            this.initEchartsTransaction()
                            break;
                    }
                }
            })
        },
        getEchartsAllList(){
            this.$axios.post('/api/explorer/get_deal_day',{
                stats_type:'30d'
            }).then(res=>{
                if(res.code == 0){
                    this.EchartsListOrder = this.EchartsListCustomer = this.EchartsListTransaction = res.data;
                    this.initEchartsOrder();
                    this.initEchartsCustomer();
                    this.initEchartsTransaction();
                }
            })
        },
        selectTransactionhandler(item){
            if (this.transactionTime == item) return
            this.transactionTime = item;
            this.getEchartsList('EchartsListTransaction',item);
        },
        changeTransaction(){
            this.getEchartsList('EchartsListTransaction',this.transactionTime);
        },
        initEchartsTransaction(){
            let y1 = [],
                date = [],
                echartTitle = []

            if (this.lang == 'zh') {
                echartTitle = ['交易成本']
            } else if (this.lang == 'en') {
                echartTitle = ['Cost']
            } else if(this.lang == 'ja'){
                echartTitle = ['オーダー数']
            } else {
                echartTitle = ['주문 수량']
            }

            this.EchartsListTransaction.map(item => {
                y1.unshift(utils.formatTrueFil(item.deal_gas_by_t));
                date.unshift(item.date);
            })
            let echarts = this.$echarts.init(document.getElementById('echartsTransaction'))
            echarts.setOption(echartsUtils.ecologicalStatisticsOrder({
                y1,
                date,
                echartTitle,
                type:'bar',
                unit:'F/TiB',
                color:['#0DEBCF']
            }))
        },
        selectCustomerhandler(item){
            if (this.customerTime == item) return;
            this.customerTime = item;
            this.getEchartsList('EchartsListCustomer',item);
        },
        changeCustomer(){
            this.getEchartsList('EchartsListCustomer',this.customerTime);
        },
        initEchartsCustomer(){
            let y1 = [],
                date = [],
                echartTitle = []

            if (this.lang == 'zh') {
                echartTitle = ['活跃客户数']
            } else if (this.lang == 'en') {
                echartTitle = ['Active clients']
            } else if(this.lang == 'ja'){
                echartTitle = ['アクティブな顧客数']
            } else {
                echartTitle = ['활성 고객 수']
            }

            this.EchartsListCustomer.map(item => {
                y1.unshift(item.client_count);
                date.unshift(item.date);
            })
            let echarts = this.$echarts.init(document.getElementById('echartsCustomer'))
            echarts.setOption(echartsUtils.ecologicalStatisticsOrder({
                y1,
                date,
                echartTitle,
                type:'bar',
                unit:'',
                color:['#F9BC59']
            }))
        },
        selectOrderhandler(item){
            if (this.orderTime == item) return
            this.orderTime = item;
            this.getEchartsList('EchartsListOrder',item)
        },
        changeOrderTime(){
            this.getEchartsList('EchartsListOrder',this.orderTime);
        },
        initEchartsOrder(){
            let y1 = [],
                y2 = [],
                date = [],
                echartTitle = []

            if (this.lang == 'zh') {
                echartTitle = ['订单总数','验证订单数量']
            } else if (this.lang == 'en') {
                echartTitle = ['Number of deals','Number of verified deals']
            } else if(this.lang == 'ja'){
                echartTitle = ['オーダー数','受注数量の検証']
            } else {
                echartTitle = ['주문 수량','주문 수량 확인']
            }

            this.EchartsListOrder.map(item => {
                y1.unshift(item.deal_count);
                y2.unshift(item.verified_deal_count);
                date.unshift(item.date);
            })
            let echarts = this.$echarts.init(document.getElementById('echartsOrder'))
            echarts.setOption(echartsUtils.ecologicalStatisticsOrder({
                y1,
                y2,
                date,
                echartTitle,
                unit:'',
                type:'bar',
                color:['#9ae2ff','#4f7eff']
            }));
        },
        
        
    }
};
</script>
<style>
</style>