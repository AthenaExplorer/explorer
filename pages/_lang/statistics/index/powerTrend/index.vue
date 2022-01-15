<template>
   <div class="pb-3">
    <p class='lg:block hidden text-2xl mb-3'>{{$t('Lang.Hash power trend')}}</p>
    <div class='mb-3 rounded-md bg-white' v-loading='loading'>
      <div class="flex items-center justify-between lg:h-20 lg:px-6 lg:border-b border-solid border-E8E7EB">
        <div class="flex items-center">
          <span class="lg:text-lg text-xl font-medium text-dark mb-2">{{$t('Lang.Today real-time computing power statistics')}}</span>
        </div>
      </div>
      <div class=" lg:px-6 pb-3 lg:pb-6 flex flex-wrap">
        <div v-for="item in dataOverviewStat" :key="item.title" class='lg:w-1/4 w-1/2 text-center lg:pb-0 pb-2 lg:pt-6'>
          <div class=' mr-2 py-2 rounded-md bg-white lg:border-0 border border-solid border-E8E7EB'>
            <p class='lg:font-medium text-lg'>{{item.val}} {{item.unit}}</p>
            <p class='text-6C757E lg:mt-2'>{{$t(item.title)}}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="lg:block hidden rounded-md bg-white">
      <div class="flex items-center justify-between h-20 px-3 lg:px-6 border-b border-solid border-E8E7EB">
        <div class="flex items-center">
          <span class="lg:text-lg font-medium text-dark">{{$t('Lang.Hash rate statistics trend chart')}}</span>
        </div>
        <ul class="lg:flex hidden justify-center checkbox-content">
          <li class="cursor-pointer py-1 px-3 lg:px-5 border border-solid border-E6E6EA" @click="selectTimehandler(item.value)" :class="{ 'first': index == 0, 'last':  checkboxList.length - 1 == index, 'active': item.value == time }" v-for="(item, index) in checkboxList" :key="item.key">
            {{$t(item.key)}}
          </li>
        </ul>
      </div>
      <div id="echartsEfficiency" class="h-64 lg:h-96 lg:px-6"></div>
    </div>
    <div class='lg:hidden h-3 bgbox'></div>

    <div class="lg:mt-3 mt-12 rounded-md lg:bg-white bg-white">
      <div class="lg:flex block items-center justify-between lg:h-20 lg:px-6 lg:border-b border-solid border-E8E7EB">
        <div class="flex items-center">
          <span class="lg:text-lg text-xl font-medium text-dark mb-2">{{$t('Lang.Historical force statistics')}}</span>
        </div>
        <div class='flex'>
           <el-date-picker
            v-model="date"
            :picker-options="pickerOptions"
            value-format="yyyy-MM-dd"
            type="date"
            :placeholder="$t('Lang.Select date')"
            @change='changeDate'>
          </el-date-picker>
          <div class='w-2'></div>
          <div class='lg:ml-4'>
            <el-input clearable :placeholder="$t('Lang.Search height')" @clear='changeHeight' v-model="seach" class="input-with-select"  @keyup.enter.native='changeHeight'>
                <el-button slot="append" icon="el-icon-search" @click='changeHeight'></el-button>
            </el-input>
          </div>
        </div>
      </div>
      <div v-show="objs.length !== 0">
        <div class="hidden lg:block px-6">
          <table class="table-fixed w-full">
            <thead>
              <tr>
                <th class="w-1/12 py-4 font-medium text-6C757E">{{$t('Lang.Height')}}</th>
                <th class="w-1/12 py-4 font-medium text-6C757E">{{$t('Lang.date')}}</th>
                <th class="w-1/12 py-4 font-medium text-6C757E">{{$t('Lang.time')}}</th>
                <th class="w-1/12 py-4 font-medium text-6C757E">{{$t('Lang.Network Storage Power')}}</th>
                <th class="w-1/12 py-4 font-medium text-6C757E">{{$t('Lang.Power growth rate')}}</th>
                <th class="w-1/12 py-4 font-medium text-6C757E">{{$t('Lang.Power Growth')}}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in objs" class="border-b border-solid border-E8E7EB" :key="index + 'data_index'">
                <td class="w-1/12 py-3 text-center text-dark">
                  <n-link :to="`/${lang}/chain/tipset/${item.height}`" class='text-main cursor-pointer hover:opacity-75'>{{item.height}}</n-link>
                </td>
                <td class="w-1/12 py-3 text-center text-dark">{{item.height_time.split(' ')[0]}}</td>
                <td class="w-1/12 py-3 text-center text-dark">{{item.height_time.split(' ')[1]}}</td>
                <td class="w-1/12 py-3 text-center text-dark">{{item.power | formatPower(2)[0] }}{{item.power | formatPower(2)[1] }}</td>
                <td class="w-1/12 py-3 text-center text-dark">{{item.increase_power | formatPower(2)[0] }}{{item.increase_power | formatPower(2)[1] }}</td>
                <td class="w-1/12 py-3 text-center text-dark">{{item.increase_power_offset | formatPower(2)[0] }}{{item.increase_power_offset | formatPower(2)[1] }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="lg:hidden block bg-white mt-3">
          <div v-for="(item, index) in objs" class="p-3 mb-3  rounded-md bg-white border border-solid border-E8E7EB" :key="index + 'data_index'">
            <div class="flex items-center justify-between pb-1">
              <span>{{$t('Lang.Height')}}</span>
              <n-link :to="`/${lang}/chain/tipset/${item.height}`" class='text-main cursor-pointer hover:opacity-75'>{{item.height}}</n-link>
            </div>
            <div class="flex items-center justify-between pb-1">
              <span>{{$t('Lang.date')}}</span>
              <span>{{item.height_time.split(' ')[0]}}</span>
            </div>
            <div class="flex items-center justify-between pb-1">
              <span>{{$t('Lang.time')}}</span>
              <span>{{item.height_time.split(' ')[1]}}</span>
            </div>
            <div class="flex items-center justify-between pb-1">
              <span>{{$t('Lang.Network Storage Power')}}</span>
              <span>{{item.power | formatPower(2)[0] }}{{item.power | formatPower(2)[1] }}</span>
            </div>
            <div class="flex items-center justify-between pb-1">
              <span>{{$t('Lang.Power growth rate')}}</span>
              <span>{{item.increase_power | formatPower(2)[0] }}{{item.increase_power | formatPower(2)[1] }}</span>
            </div>
            <div class="flex items-center justify-between pb-1">
              <span>{{$t('Lang.Power Growth')}}</span>
              <span>{{item.increase_power_offset | formatPower(2)[0] }}{{item.increase_power_offset | formatPower(2)[1] }}</span>
            </div>
          </div>
        </div>
        <div class="py-3 lg:pt-6 hidden lg:block">
          <Pagination :pageSize="page_size" :pageIndex="page_index" :totalCount="total_count" @indexChange="searchRecordHandler" @sizeChange='handleCurrentChange'></Pagination>
        </div>
      </div>
      <div v-show="objs.length == 0" class='flex items-center justify-center' style='height:40vh'>
        <div class='text-center'>
          <img src="@/assets/imgs/noMsg.png" alt="" style='width:150px'>
          <p style='color:#5F6578' class='mb-10'>{{$t('Lang.No data')}}</p>
        </div>
      </div>
    </div>
    <div class="py-3 lg:pt-6 lg:hidden block" v-show="line.length !== 0">
      <Pagination :pageSize="page_size" :pageIndex="page_index" :totalCount="total_count" @indexChange="searchRecordHandler"></Pagination>
    </div>
  </div>
</template>
<script>
import echartsUtils from "@/static/echarts-utils.js";
import utils from "@/static/utils.js";
import { mapGetters } from 'vuex'

export default {
  scrollToTop: true,

  name: "ChainGas",

  mixins: [],

  props: [],

  components: {},

  watch: {},

  computed: {
    ...mapGetters({
      overviewStat: 'getOverviewStat',
    }),
    dataOverviewStat(){
      let {
        power,
        increase_power,
        increase_power_offset,
        increase_power_loss
      } = this.overviewStat

      if(this.overviewStat.power == null){
        this.loading = true
      }else{
        this.loading = false
      }

      return [
        {
          title: 'Lang.Network Storage Power',
          val: utils.formatPower(power, 4)[0],
          unit: utils.formatPower(power)[1]
        },
        {
          title: 'Lang.Power growth rate',
          val: utils.formatPower(increase_power, 4)[0],
          unit: utils.formatPower(increase_power)[1]
        },
        {
          title: 'Lang.Incremental computing power',
          val: utils.formatPower(increase_power_offset, 4)[0],
          unit: utils.formatPower(increase_power_offset)[1]
        },
        {
          title: 'Lang.Loss of computing power',
          val: utils.formatPower(increase_power_loss, 4)[0],
          unit: utils.formatPower(increase_power_loss)[1]
        },
      ]
    }
  },

  asyncData({ app }) {
    let dates = utils.getDateMiusDays(new Date(), 20)
    let data = {
      line: [],
      page_size: 20,
      page_index: 1,
      total_count: 0,
      objs:[]
    }
    return app.$axios.post('/api/explorer/get_overview_power_trends', {
      stats_type:'30d'
    })
    .then(res => {
      if (res.code != 0) return data
      data.line = res.data.reverse()
      return app.$axios.post('/api/explorer/get_overview_stat_list', {
        date:dates[dates.length - 1],
        page_size:data.page_size,
        page_index:data.page_index
      })
    }).then(res=>{
      if (res.code != 0) return data
      data.objs = res.data.objects
      data.total_count = res.data.total_count
      return data
    })
  },

  data: function () {
    return {
      time: "30d",
      checkboxList: [
        { value: "30d", key: "Lang.30days" },
        { value: "180d", key: "Lang.180days" },
        { value: "360d", key: "Lang.a year" },
      ],
      line: [],
      stat: {},
      stat_list: [],
      interval: null,
      lang: this.$store.state.locale,
      seach:'',
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
      date:null,
      page_size: 20,
      page_index: 1,
      total_count: 0,
      loading:true
    };
  },
  beforeMount(){
    if(this.date == null){
      let dates = utils.getDateMiusDays(new Date(), 20)
      this.date = dates[dates.length - 1]
    }
  },
  methods: {
    selectTimehandler(item, hand = true) {
      if (hand) {
        if (this.time == item) return;
      }
      this.time = item;
      this.changeEcharts()
    },
    changeEcharts(){
      this.$axios.post('/api/explorer/get_overview_power_trends', {
        stats_type:this.time
      }).then(res=>{
        if (res.code != 0) return data
        this.line = res.data.reverse()
        this.initEchartsoverviewPowerTrends()
      })
    },
    changeTime(){
    },
    initEchartsoverviewPowerTrends: function() {
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
        document.getElementById("echartsEfficiency")
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
    changeDate(){
      this.seach = null
      if(this.date == null){
        let dates = utils.getDateMiusDays(new Date(), 20)
        this.date = dates[dates.length - 1]
      }
      this.$axios.post('/api/explorer/get_overview_stat_list', {
        date:this.date,
        page_size:this.page_size,
        page_index:1,
        height:this.seach
      }).then(res=>{
        if (res.code != 0) return data
        this.objs = res.data.objects
        this.total_count = res.data.total_count
        this.page_index = 1
      })
    },
    changeHeight(){
      if( this.seach == null){
        if(this.lang == 'zh'){
          this.$notification.error({
            title: '错误',
            message: '请输入高度'
          })
        }else if(this.lang == 'en'){
          this.$notification.error({
            title: 'Error',
            message: 'Please enter the height'
          })
        }else if(this.lang == 'ja'){
          this.$notification.error({
            title: 'エラー',
            message: '高さを入力してください'
          })
        }else{
          this.$notification.error({
            title: '오류',
            message: '높이 입력.'
          })
        }
        return
      }
      this.date = null
      if (!/^([1-9]\d*|0)(\.\d{1,})?$/g.test(this.seach) && this.seach !== '') {
        if(this.lang == 'zh'){
          this.$notification.error({
            title: '错误',
            message: '高度只能是数字'
          })
        }else if(this.lang == 'en'){
          this.$notification.error({
            title: 'Error',
            message: 'Height can only be a number'
          })
        }else if(this.lang == 'ja'){
          this.$notification.error({
            title: 'エラー',
            message: '高さは数字だけです。'
          })
        }else{
          this.$notification.error({
            title: '오류',
            message: '높이 는 숫자 밖 에 없어 요.'
          })
        }
        return
      }
      this.$axios.post('/api/explorer/get_overview_stat_list', {
        page_size:this.page_size,
        page_index:1,
        height:this.seach
      }).then(res=>{
        if (res.code != 0) return data
        this.objs = res.data.objects
        this.total_count = res.data.total_count
        this.page_index = 1
        this.date = null
      })
    },
    searchRecordHandler(pageIndex){
      if(this.date == null){
        let dates = utils.getDateMiusDays(new Date(), 20)
        this.date = dates[dates.length - 1]
      }
      this.$axios.post('/api/explorer/get_overview_stat_list', {
        date:this.date,
        page_index: pageIndex,
        page_size: this.page_size,
        height:this.seach
      })
      .then(res => {
        if (res.code != 0) return
        this.objs = res.data.objects
        this.total_count = res.data.total_count
        this.page_index = pageIndex
      })
    },
    handleCurrentChange(size){
      this.page_size = size
      this.searchRecordHandler(1)
    },
  },

  mounted: function() {
    this.initEchartsoverviewPowerTrends()
  },

  beforeDestroy: function () {
  },
};
</script>
<style>
</style>