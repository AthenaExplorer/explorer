<template>
   <div class="pb-3">
    <p class='lg:block hidden text-2xl mb-3'>{{$t('Lang.Gas fee trend')}}</p>
    <div class="lg:block hidden rounded-md bg-white">
      <div class="flex items-center justify-between h-16 lg:h-20 px-3 lg:px-6 border-b border-solid border-E8E7EB">
        <div class="flex items-center">
          <span class="lg:text-lg font-medium text-dark">{{$t('Lang.Production Costs')}}</span>
        </div>
        <div class='flex items-center'>
          <el-date-picker
            v-model="date"
            type="daterange"
            :picker-options="pickerOptions"
            value-format="yyyy-MM-dd"
            range-separator="-"
            :start-placeholder="$t('Lang.Start date')"
            :end-placeholder="$t('Lang.End date')"
            @change='changeDate'>
          </el-date-picker>
          <ul class="lg:flex hidden justify-center checkbox-content ml-6">
            <li class="cursor-pointer py-1 px-3 lg:px-5 border border-solid border-E6E6EA" @click="selectTimehandler(item.value)" :class="{ 'first': index == 0, 'last':  checkboxList.length - 1 == index, 'active': item.value == time }" v-for="(item, index) in checkboxList" :key="item.key">
              {{$t(item.key)}}
            </li>
          </ul>
        </div>
      </div>
      <div id="echartsBasicRate" class="h-64 lg:h-96 px-3"></div>
    </div>
    <div class="lg:hidden block items-center">
      <span class="lg:text-lg text-xl font-medium text-dark" >{{$t('Lang.Daily gas cost')}}</span>
      <div v-show="overview_day_list.length !== 0">
        <div class="bg-white mt-3 rounded-md bg-white border border-solid border-E8E7EB">
        <table class="table-fixed w-full">
          <thead>
            <tr>
              <th class="w-1/12 py-4 font-medium text-6C757E">{{$t('Lang.date')}}</th>
              <th class="w-1/12 py-4 font-medium text-6C757E">{{$t('Lang.32G production Gas')}}</th>
              <th class="w-1/12 py-4 font-medium text-6C757E">{{$t('Lang.64G production Gas')}}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in overview_day_list" class="border-t border-solid border-E8E7EB" :key="index + 'data_index'">
              <td class="w-1/12 py-3 text-center text-dark">{{item.date}}</td>
              <td class="w-1/12 py-3 text-center text-dark">{{item.rrm_create_gas_32 | formatTrueFil(true)}}/TiB</td>
              <td class="w-1/12 py-3 text-center text-dark">{{item.rrm_create_gas_64 | formatTrueFil(true)}}/TiB</td>
            </tr>
          </tbody>
        </table>
      </div>
      </div>
      <div v-show="overview_day_list.length == 0" class='flex items-center justify-center' style='height:40vh'>
        <div class='text-center'>
          <img src="@/assets/imgs/noMsg.png" alt="" style='width:150px'>
          <p style='color:#5F6578' class='mb-10'>{{$t('Lang.No data')}}</p>
        </div>
      </div>
      <div class="py-3 lg:pt-6 lg:hidden block" v-show="overview_day_list.length !== 0">
        <Pagination :pageSize="page_size" :pageIndex="page_index" :totalCount="total_count" @indexChange="searchRecordHandler"></Pagination>
      </div>
    </div>
    <p class='lg:block hidden text-2xl my-3'>{{$t('Lang.Gas statistics')}}</p>
    <div class="mt-3 rounded-md bg-white">
      <div class="flex lg:items-end items-center justify-between h-16 lg:h-20  lg:px-6 lg:border-b border-solid border-E8E7EB">
        <div class="hidden lg:flex items-center">
          <span class="font-bold text-6C757E h-16 pt-4 cursor-pointer" :class="{'titleActive':flag=='24h'}" @click='change24h'>{{$t('Lang.24-hour gas statistics')}}</span>
          <span class="font-bold ml-10 text-6C757E h-16 pt-4 cursor-pointer" :class="{'titleActive':flag=='Day'}"  @click='changeDay'>{{$t('Lang.Daily gas cost')}}</span>
        </div>
        <div class="lg:hidden flex items-center">
          <span class="lg:text-lg text-xl font-medium text-dark" >{{$t('Lang.24-hour gas statistics')}}</span>
        </div>
      </div>
      <div v-show="flag == '24h'">
        <div v-show="stat_list.length !== 0">
          <div class="hidden lg:block px-3">
            <table class="table-fixed w-full">
              <thead>
                <tr>
                  <th class="w-1/12 py-4 font-medium text-6C757E">{{$t('Lang.Message type')}}</th>
                  <th class="w-1/12 py-4 font-medium text-6C757E">{{$t('Lang.Gas Premium')}}</th>
                  <th class="w-1/12 py-4 font-medium text-6C757E">{{$t('Lang.Average Gas Limit')}}</th>
                  <th class="w-1/12 py-4 font-medium text-6C757E">{{$t('Lang.Average gas consumption')}}</th>
                  <th class="w-1/12 py-4 font-medium text-6C757E">{{$t('Lang.Average gas fee')}}</th>
                  <th class="w-1/12 py-4 font-medium text-6C757E">{{$t('Lang.Total Gas Fees/Proportion')}}</th>
                  <th class="w-1/12 py-4 font-medium text-6C757E">{{$t('Lang.Total number of messages/proportion')}}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in stat_list" class="border-b border-solid border-E8E7EB" :key="index + 'data_index'">
                  <td class="w-1/12 py-3 text-center" v-if="item.key == 'total'">{{ $t('Lang.All') }}</td>
                  <td class="w-1/12 py-3 text-center" v-else>{{item.key}}</td>
                  <td class="w-1/12 py-3 text-center">{{item.gas_premium | formatEasyFil}}</td>
                  <td class="w-1/12 py-3 text-center">{{item.avg_gas_limit | formatterAmount(0)}}</td>
                  <td class="w-1/12 py-3 text-center">{{item.avg_gas_used | formatterAmount(0)}}</td>
                  <td class="w-1/12 py-3 text-center">{{item.avg_cost | formatEasyFil}}</td>
                  <td class="w-1/12 py-3 text-center">{{item.total_cost | formatEasyFil}}/{{(item.total_cost/stat.total.total_cost) | formatPercentage}}</td>
                  <td class="w-1/12 py-3 text-center">{{item.count | formatterAmount(0)}}/{{(item.count/stat.total.count) | formatPercentage}}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="lg:hidden bg-white">
            <div v-for="(item, index) in stat_list" class="p-3 mb-3  rounded-md bg-white border border-solid border-E8E7EB" :key="index + 'data_index'">
              <div class="flex items-center justify-between">
                <span>{{$t('Lang.Message type')}}</span>
                <span v-if="item.key == 'total'">{{ $t('Lang.All') }}</span>
                <span v-else>{{item.key}}</span>
              </div>
              <div class="flex items-center justify-between">
                <span>{{$t('Lang.Gas Premium')}}</span>
                <span>{{item.gas_premium | formatEasyFil}}</span>
              </div>
              <div class="flex items-center justify-between">
                <span>{{$t('Lang.Average Gas Limit')}}</span>
                <span>{{item.avg_gas_limit | formatterAmount(0)}}</span>
              </div>
              <div class="flex items-center justify-between">
                <span>{{$t('Lang.Average gas consumption')}}</span>
                <span>{{item.avg_gas_used | formatterAmount(0)}}</span>
              </div>
              <div class="flex items-center justify-between">
                <span>{{$t('Lang.Average gas fee')}}</span>
                <span>{{item.avg_cost | formatEasyFil}}</span>
              </div>
              <div class="flex items-center justify-between">
                <span>{{$t('Lang.Total Gas Fees/Proportion')}}</span>
                <span>{{item.total_cost | formatEasyFil}}/{{(item.total_cost/stat.total.total_cost) | formatPercentage}}</span>
              </div>
              <div class="flex items-center justify-between">
                <span>{{$t('Lang.Total number of messages/proportion')}}</span>
                <span>{{item.count | formatterAmount(0)}}/{{(item.count/stat.total.count) | formatPercentage}}</span>
              </div>
            </div>
          </div>
        </div>
        <div v-show="stat_list.length == 0" class='flex items-center justify-center' style='height:40vh'>
          <div class='text-center'>
            <img src="@/assets/imgs/noMsg.png" alt="" style='width:150px'>
            <p style='color:#5F6578' class='mb-10'>{{$t('Lang.No data')}}</p>
          </div>
        </div>
      </div>
      <div v-show="flag == 'Day'">
        <div class="">
          <div v-show="overview_day_list.length !== 0">
            <div class="hidden lg:block">
              <table class="table-fixed w-full">
                <thead>
                  <tr>
                    <th class="w-1/12 py-4 font-medium text-6C757E">{{$t('Lang.date')}}</th>
                    <th class="w-1/12 py-4 font-medium text-6C757E">{{$t('Lang.32G production Gas')}}</th>
                    <th class="w-1/12 py-4 font-medium text-6C757E">{{$t('Lang.64G production Gas')}}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in overview_day_list" class="border-b border-solid border-E8E7EB" :key="index + 'data_index'">
                    <td class="w-1/12 py-3 text-center text-dark">{{item.date}}</td>
                    <td class="w-1/12 py-3 text-center text-dark">{{item.rrm_create_gas_32 | formatTrueFil(true)}}/TiB</td>
                    <td class="w-1/12 py-3 text-center text-dark">{{item.rrm_create_gas_64 | formatTrueFil(true)}}/TiB</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="py-3 lg:pt-6 hidden lg:block">
              <Pagination :pageSize="page_size" :pageIndex="page_index" :totalCount="total_count" @indexChange="searchRecordHandler" @sizeChange='handleCurrentChange'></Pagination>
            </div>
          </div>
          <div v-show="overview_day_list.length == 0" class='flex items-center justify-center' style='height:40vh'>
            <div class='text-center'>
              <img src="@/assets/imgs/noMsg.png" alt="" style='width:150px'>
              <p style='color:#5F6578' class='mb-10'>{{$t('Lang.No data')}}</p>
            </div>
          </div>
        </div>
        <div class="py-3 lg:pt-6 lg:hidden block" v-show="overview_day_list.length !== 0">
          <Pagination :pageSize="page_size" :pageIndex="page_index" :totalCount="total_count" @indexChange="searchRecordHandler"></Pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import echartsUtils from "@/static/echarts-utils.js";
import utils from "@/static/utils.js";

export default {
  scrollToTop: true,

  name: "ChainGas",

  mixins: [],

  props: [],

  components: {},

  watch: {},

  computed: {},

  asyncData({ app }) {
    let dates = utils.getDateMiusDays(new Date(), 1)
    let dates20 = utils.getDateMiusDays(new Date(), 20)
    let data = {
      line: [],
      stat: {},
      stat_list: [],
      overview_day_list:[],
      page_size: 20,
      page_index: 1,
      total_count: 0,
    };
    return app.$axios
      .post("/api/explorer/get_gas_trends", {
        start_date: dates[0],
        end_date: dates[dates.length - 1],
        search_type: "day",
      })
      .then((res) => {
        if (res.code != 0) return data;
        data.line = res.data.reverse();
        return app.$axios.post("/api/explorer/get_gas_stat_all", {});
      })
      .then((res) => {
        if (!res || res.code != 0) {
          data.stat_list = []
          return data;
        }
        let arr = Object.keys(res.data).map((key) => {
          let item = res.data[key];
          item["key"] = key;
          return item;
        });
        arr.sort(function compare(a, b) {
          return parseFloat(a.count) > parseFloat(b.count) ? -1 : 1;
        });
        data.stat_list = arr;
        data.stat = res.data;
        return app.$axios.post("/api/explorer/get_overview_day_list", {
          page_size:data.page_size,
          page_index:data.page_index
        });
      }).then(res=>{
        if (!res || res.code != 0) return data;
        data.overview_day_list = res.data.objects
        data.total_count = res.data.total_count
        return data
      })
  },

  data: function () {
    return {
      time: "day",
      checkboxList: [
        { value: "day", key: "Lang.24 hours" },
        { value: "week", key: "Lang.Latest seven days" },
        { value: "month", key: "Lang.Latest one month" },
        { value: "season", key: "Lang.Latest three months" },
      ],
      line: [],
      stat: {},
      stat_list: [],
      interval: null,
      lang: this.$store.state.locale,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
      date:'',
      flag:'24h'
    };
  },

  methods: {
    selectTimehandler(item, hand = true) {
      if (hand) {
        if (this.time == item) return;
      }
      this.date = null
      this.getOverviewDayRecords(item);
    },
    handleCurrentChange(size){
      this.page_size = size
      this.searchRecordHandler(1)
    },
    changeDate(){
      if(this.date !== null){
        let list = {
          search_type: 'day',
          start_date:this.date[0],
          end_date:this.date[1],
        }
        this.$axios.post("/api/explorer/get_gas_trends", list).then((res) => {
          if (res.code != 0) return;
          this.line = res.data.reverse();
          this.initEchartsBasicRate_24();
          this.time = 'test';
        });
      }else{
        this.getOverviewDayRecords('day')
        this.time = 'day'
      }
    },
    initEchartsBasicRate_24() {
      let y1 = [],
        date = [],
        y2 = [],
        y3 = [],
        echartTitle = [];

      if (this.lang == "zh") {
        echartTitle = ["Base Fee", "32GiB生产Gas", "64GiB生产Gas"];
      } else if (this.lang == "en") {
        echartTitle = [
          "Base Fee",
          "32GiB production gas",
          "64GiB production gas",
        ];
      } else if (this.lang == "ja") {
        echartTitle = ["Base Fee", "32GiB生産Gas", "64GiB生産Gas"];
      } else {
        echartTitle = ["Base Fee", "실시간32GiB생산Gas", "실시간64GiB생산Gas"];
      }
      this.line.map((item) => {
        y2.push(item.create_gas_32);
        y3.push(item.create_gas_64);
        y1.push(item.base_fee);
        date.push(item.height_time);
      });

      let echarts = this.$echarts.init(
        document.getElementById("echartsBasicRate")
      );
      echarts.clear();
      echarts.setOption(
        echartsUtils.optionsForServiceCharge({
          y1,
          y2,
          y3,
          date,
          echartTitle,
        }),
        false
      );
    },
    getOverviewDayRecords(item) {
      let list = {}
      if(item == 'day'){
        let dates = utils.getDateMiusDays(new Date(), 1)
        list = {
          search_type: item,
          start_date: dates[0],
          end_date: dates[dates.length - 1],
        }
      }else{
        list = {
          search_type: item,
        }
      }
      this.$axios.post("/api/explorer/get_gas_trends", list).then((res) => {
        if (res.code != 0) return;
        this.line = res.data.reverse();
        this.initEchartsBasicRate_24();
        this.time = item;
      });
    },

    getGasDataHandler() {
      this.selectTimehandler(this.time, false);
      this.$axios.post("/api/explorer/get_gas_stat_all", {}, { progress: false }).then((res) => {
        if (res.code != 0) return;
        let arr = Object.keys(res.data).map((key) => {
          let item = res.data[key];
          item["key"] = key;
          return item;
        });
        arr.sort(function compare(a, b) {
          return parseFloat(a.count) > parseFloat(b.count) ? -1 : 1;
        });
        this.stat_list = arr;
        this.stat = res.data;
      });
    },
    change24h(){
      this.flag = '24h'
    },
    changeDay(){
      this.flag = 'Day'
    },
    searchRecordHandler(pageIndex) {
      this.$axios.post('/api/explorer/get_overview_day_list', {
        page_index: pageIndex,
        page_size: this.page_size,
      })
      .then(res => {
        if (res.code != 0) return
        this.overview_day_list = res.data.objects
        this.total_count = res.data.total_count
        this.page_index = pageIndex
      })
    },
  },

  mounted: function () {
    this.initEchartsBasicRate_24();

    this.interval = setInterval(() => {
      this.getGasDataHandler();
    }, 2 * 60 * 1000);
  },

  beforeDestroy: function () {
    clearInterval(this.interval);
    this.interval = null;
  },
};
</script>
<style lang="scss" scoped>
.titleActive{
  color: #3633C6!important;
  border-bottom: 2px solid #3633C6;
}
</style>