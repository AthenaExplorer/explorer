<template>
   <div class="pb-3">
    <p class='lg:block hidden text-2xl mb-3'>{{$t('Lang.Statistical overview')}}</p>
    <div class="rounded-md lg:bg-white " v-loading='loading'>
      <div class="flex items-center justify-between lg:h-20  lg:px-6 lg:border-b border-solid border-E8E7EB">
        <div class="flex items-center">
          <span class="lg:text-lg text-xl font-medium text-dark lg:mb-0 mb-2">{{$t('Lang.Real-time data on the chain')}}</span>
        </div>
      </div>
      <div class=" lg:px-6 pb-3 lg:pb-6 flex flex-wrap">
        <div v-for="i in overview_stat" :key="i.title" class='lg:w-1/5 w-1/2 text-center lg:pb-0 pb-3 lg:pt-6'>
          <div v-if="!i.price"  class=' mr-2 py-2 rounded-md bg-white lg:border-0 border border-solid border-E8E7EB'>
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
          <div v-if="i.price" class=" mr-2 py-2 rounded-md bg-white lg:border-0 border border-solid border-E8E7EB">
            <div class='flex items-end justify-center' :class="{'text-red-500':i.unit<0,'text-green-500':i.unit>0}">
              <span class="text-xl lg:text-2xl">{{ i.val }}</span>
              <img v-show="i.unit>0" src="@/assets/imgs/index-up.png" alt="" style='width:8px;padding-bottom:3px' class='mx-1 lg:flex hidden'>
              <img v-show="i.unit<0" src="@/assets/imgs/index-down.png" alt="" style='width:8px;padding-bottom:5px' class='mx-1  lg:flex hidden'>
              <span class="text-base lg:text-lg  lg:flex hidden">{{ i.unit }}%</span>
            </div>
            <div class='flex lg:hidden items-center justify-center' :class="{'text-red-500':i.unit<0,'text-green-500':i.unit>0}">
              <img v-show="i.unit>0" src="@/assets/imgs/index-up.png" alt="" style='width:8px;padding-bottom:3px' class='mx-1'>
              <img v-show="i.unit<0" src="@/assets/imgs/index-down.png" alt="" style='width:8px;padding-bottom:5px' class='mx-1'>
              <span class="lg:font-medium text-lg">{{ i.unit }}%</span>
            </div>
            <p class="text-6C757E lg:mt-2">
              {{ $t(i.popover) }}
              <el-popover v-if="i.popover" trigger="hover">
                <div class='text-left'>
                  <p>{{$t('Lang.24h lowest price')}}: ${{i.low}}</p>
                  <p>{{$t('Lang.24h highest price')}}: ${{i.high}}</p>
                </div>
                <i class="el-icon-info cursor-pointer text-gray-500 text-base" slot="reference"></i>
              </el-popover>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class='lg:hidden h-3 bgbox'></div>
    <div class="mt-8 lg:mt-3 mb-3 rounded-md bg-white  px-0 pb-2 mb-4">
      <div class="lg:flex block items-center justify-between lg:h-20  lg:px-6 lg:border-b border-solid border-E8E7EB mb-3">
        <div class="flex items-center justify-between lg:mb-0 mb-2">
          <p class="lg:text-lg text-xl font-medium text-dark">{{$t('Lang.Data on the historical chain')}}</p>
        </div>
        <div class='block lg:flex'>
          <div class='hidden lg:block'>
            <el-date-picker
              v-model="date"
              type="daterange"
              :picker-options="pickerOptions"
              value-format="yyyy-MM-dd"
              :start-placeholder="$t('Lang.Start date')"
              :end-placeholder="$t('Lang.End date')"
              @change='changeDate'>
            </el-date-picker>
          </div>
          <div class='lg:hidden flex mb-2'>
            <el-date-picker
              size='mini'
              v-model="dateLeft"
              type="date"
              :picker-options="pickerOptions"
              :placeholder="$t('Lang.Start date')"
              @change='changePhoneMyDate'>
            </el-date-picker>
            <div class='w-8 flex items-center justify-center'>-</div>
            <el-date-picker
              size='mini'
              v-model="dateRight"
              type="date"
              :picker-options="pickerOptions"
              :placeholder="$t('Lang.End date')"
              @change='changePhoneMyDate'>
            </el-date-picker>
          </div>
        </div>
      </div>
      <div v-show="objs.length !== 0">
        <div class="hidden lg:block px-6">
          <table class="table-fixed w-full">
            <thead>
              <tr>
                <th class="w-1/12 py-4 font-medium text-6C757E">{{$t('Lang.date')}}</th>
                <th class="w-1/12 py-4 font-medium text-6C757E">{{$t('Lang.Network Storage Power')}}</th>
                <th class="w-1/12 py-4 font-medium text-6C757E">{{$t('Lang.Power growth rate')}}</th>
                <th class="w-1/12 py-4 font-medium text-6C757E">{{$t('Lang.Power Growth')}}</th>
                <th class="w-1/12 py-4 font-medium text-6C757E">{{$t('Lang.Abnormal computing power')}}/{{$t('Lang.Proportion')}}
                  <el-popover trigger="hover" :content="$t('Lang.Percentage of computing power in the whole network')">
                    <i class="el-icon-info cursor-pointer text-gray-500 text-base" slot="reference"></i>
                  </el-popover>
                </th>
                <th class="w-1/12 py-4 font-medium text-6C757E">{{$t('Lang.Production Efficiency')}}</th>
                <th class="w-1/12 py-4 font-medium text-6C757E">{{$t('Lang.Sector pledge')}}</th>
                <th class="w-1/12 py-4 font-medium text-6C757E">{{$t('Lang.32G production Gas')}}</th>
                <th class="w-1/12 py-4 font-medium text-6C757E">{{$t('Lang.64G production Gas')}}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in objs" class="border-b border-solid border-E8E7EB" :key="index + 'data_index'">
                <td class="w-1/12 py-3 text-center text-dark">{{item.date}}</td>
                <td class="w-1/12 py-3 text-center text-dark">{{item.raw_power | formatPower(2)[0]}}{{item.raw_power | formatPower(2)[1]}}</td>
                <td class="w-1/12 py-3 text-center text-dark">{{item.increase_power | formatPower(2)[0]}}{{item.increase_power | formatPower(2)[1]}}</td>
                <td class="w-1/12 py-3 text-center text-dark">{{item.increase_power_offset | formatPower(2)[0]}}{{item.increase_power_offset | formatPower(2)[1]}}</td>
                <td class="w-1/12 py-3 text-center text-dark">
                  {{item.increase_power_loss | formatPower(2)[0]}}{{item.increase_power_loss | formatPower(2)[1]}}
                 （{{ item.increase_power_loss | getPoint(item.raw_power)}}）
                </td>
                <td class="w-1/12 py-3 text-center text-dark">
                  <p v-if="item.rrm_avg_reward == 0">--</p>
                  <p v-else>{{item.rrm_avg_reward | formatTrueFil(true)}}/TiB</p>
                </td>
                <td class="w-1/12 py-3 text-center text-dark">
                  <p v-if="item.rrm_avg_pledge == 0">--</p>
                  <p v-else>{{item.rrm_avg_pledge | formatTrueFil(true)}}/TiB</p>
                </td>
                <td class="w-1/12 py-3 text-center text-dark">
                  <p v-if="item.rrm_create_gas_32 == 0">--</p>
                  <p v-else>{{item.rrm_create_gas_32 | formatTrueFil(true)}}/TiB</p>
                </td>
                <td class="w-1/12 py-3 text-center text-dark">
                  <p v-if="item.rrm_create_gas_64 == 0">--</p>
                  <p v-else>{{item.rrm_create_gas_64 | formatTrueFil(true)}}/TiB</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="lg:hidden block bg-white">
          <div v-for="(item, index) in objs" class="p-3 mb-3  rounded-md bg-white border border-solid border-E8E7EB" :key="index + 'data_index'">
            <div class="flex items-center justify-between pb-1">
              <span>{{$t('Lang.date')}}</span>
              <span>{{item.date}}</span>
            </div>
            <div class="flex items-center justify-between pb-1">
              <span>{{$t('Lang.Network Storage Power')}}</span>
              <span>{{item.raw_power | formatPower(2)[0]}}{{item.raw_power | formatPower(2)[1]}}</span>
            </div>
            <div class="flex items-center justify-between pb-1">
              <span>{{$t('Lang.Power growth rate')}}</span>
              <span>{{item.increase_power | formatPower(2)[0]}}{{item.increase_power | formatPower(2)[1]}}</span>
            </div>
            <div class="flex items-center justify-between pb-1">
              <span>{{$t('Lang.Power Growth')}}</span>
              <span>{{item.increase_power_offset | formatPower(2)[0]}}{{item.increase_power_offset | formatPower(2)[1]}}</span>
            </div>
            <div class="flex items-center justify-between pb-1">
              <span>{{$t('Lang.Abnormal computing power')}}/{{$t('Lang.Proportion')}}
                <el-popover trigger="hover" :content="$t('Lang.Percentage of computing power in the whole network')">
                  <i class="el-icon-info cursor-pointer text-gray-500 text-base" slot="reference"></i>
                </el-popover></span>
              <span>{{item.increase_power_loss | formatPower(2)[0]}}{{item.increase_power_loss | formatPower(2)[1]}}（{{ item.increase_power_loss | getPoint(item.raw_power)}}）</span>
            </div>
            <div class="flex items-center justify-between pb-1">
              <span>{{$t('Lang.Production Efficiency')}}</span>
              <span v-if="item.rrm_avg_reward == 0">--</span>
              <span v-else>{{item.rrm_avg_reward | formatTrueFil(true)}}/TiB</span>
            </div>
            <div class="flex items-center justify-between pb-1">
              <span>{{$t('Lang.Sector pledge')}}</span>
              <p v-if="item.rrm_avg_pledge == 0">--</p>
              <p v-else>{{item.rrm_avg_pledge | formatTrueFil(true)}}/TiB</p>
            </div>
            <div class="flex items-center justify-between pb-1">
              <span>{{$t('Lang.32G production Gas')}}</span>
              <p v-if="item.rrm_create_gas_32 == 0">--</p>
              <p v-else>{{item.rrm_create_gas_32 | formatTrueFil(true)}}/TiB</p>
            </div>
            <div class="flex items-center justify-between pb-1">
              <span>{{$t('Lang.64G production Gas')}}</span>
              <p v-if="item.rrm_create_gas_64 == 0">--</p>
              <p v-else>{{item.rrm_create_gas_64 | formatTrueFil(true)}}/TiB</p>
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
    <div class="py-3 lg:pt-6 lg:hidden block" v-show="objs.length !== 0">
      <Pagination :pageSize="page_size" :pageIndex="page_index" :totalCount="total_count" @indexChange="searchRecordHandler"></Pagination>
    </div>
  </div>
</template>
<script>
import utils from "@/static/utils.js";
import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  scrollToTop: true,
  name: "ChainGas",
  mixins: [],
  props: [],
  components: {},
  watch: {},
  asyncData({ app }) {
    let dates = utils.getDateMiusDays(new Date(), 30)
    let data = {
      page_size: 20,
      page_index: 1,
      total_count: 0,
    }
    return app.$axios.post('/api/explorer/get_overview_day_list', {
      page_size:data.page_size,
      page_index:data.page_index
    }).then(res=>{
      if (res.code != 0) return data
      data.objs = res.data.objects
      data.total_count = res.data.total_count
      return data
    })
  },
  data: function () {
    return {
      objs: [],
      lang: this.$store.state.locale,
      seach:'',
      page_size: 1,
      page_index: 1,
      total_count: 0,
      date:[],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
      dateLeft:null,
      dateRight:null,
      myDate: "",
      loading:true
    };
  },
  mounted: function() {
  },
  methods: {
    searchRecordHandler(pageIndex) {
      this.$axios.post('/api/explorer/get_overview_day_list', {
        page_index: pageIndex,
        page_size: this.page_size,
        start_date: this.date[0],
        end_date: this.date[1],
      })
      .then(res => {
        if (res.code != 0 || !res.data) return
        this.objs = res.data.objects
        this.total_count = res.data.total_count
        this.page_index = pageIndex
      })
    },
    handleCurrentChange(size){
      this.page_size = size
      this.searchRecordHandler(1)
    },
    changeDate(){
      let start_date = '',
          end_date = '';
      if(this.date == null){
        start_date = ''
        end_date = ''
      }else{
        start_date = this.date[0]
        end_date = this.date[1]
      }
      this.$axios.post('/api/explorer/get_overview_day_list', {
        start_date: start_date,
        end_date: end_date,
        page_size:this.page_size,
        page_index:1
      }).then(res=>{
        if (res.code != 0) return data
        this.objs = res.data.objects
        this.total_count = res.data.total_count
      })
    },
    changePhoneMyDate() {
      if (this.dateRight == null && this.dateLeft == null) {
        this.myDate = "";
        this.$axios
          .post("/api/explorer/get_overview_day_list", {
            miner_no: this.miner_no,
            page_size: this.page_size,
            page_index: 1,
            all:1
          })
          .then((res) => {
            if (res.code != 0) return;
            this.objs = res.data.objects;
            this.total_count = res.data.total_count;
            this.page_index = res.data.pageIndex;
          });
        return;
      }

      if (this.dateRight == null || this.dateLeft == null) {
        return;
      }
      if (this.dateLeft.getTime() > this.dateRight.getTime()) {
        if (this.lang == "zh") {
          this.$notification.error({
            title: "错误",
            message: "结束日期不能小于开始日期",
          });
        } else if (this.lang == "en") {
          this.$notification.error({
            title: "Error",
            message: "The end date cannot be less than the start date",
          });
        } else if (this.lang == "ja") {
          this.$notification.error({
            title: "エラー",
            message: "終了日を開始日より前にすることはできません",
          });
        } else {
          this.$notification.error({
            title: "오류",
            message: "종료일은 시작일보다 이전 일 수 없습니다",
          });
        }
        return;
      }
      this.myDate = [
        utils.formatDate(this.dateLeft, "y-m-d"),
        utils.formatDate(this.dateRight, "y-m-d"),
      ];
      this.$axios
        .post("/api/explorer/get_overview_day_list", {
          miner_no: this.miner_no,
          page_size: this.page_size,
          page_index: 1,
          start_date: utils.formatDate(this.dateLeft, "y-m-d"),
          end_date: utils.formatDate(this.dateRight, "y-m-d"),
          all:1
        })
        .then((res) => {
          if (res.code != 0) return;
          this.objs = res.data.objects;
          this.total_count = res.data.total_count;
          this.page_index = res.data.pageIndex;
        });
    },
  },
  computed: {
    ...mapGetters({
      myprice: 'getFilPrice',
      overviewStat: 'getOverviewStat',
    }),
    overview_stat(){
      let {
        power,
        increase_power,
        increase_power_offset,
        increase_power_loss,
        avg_reward,
        avg_pledge,
        create_gas_32,
        create_gas_64
      } = this.overviewStat

      let {
        price,
        price_change,
        high,
        low
      } = this.myprice

      let rrm_create_gas_32 = '',
        rrm_create_gas_64 =  '';

      if(this.objs.length == 0){
        rrm_create_gas_32 = 0
        rrm_create_gas_64 = 0
      }else{
        rrm_create_gas_32 = this.objs[0].rrm_create_gas_32;
        rrm_create_gas_64 = this.objs[0].rrm_create_gas_64;
      }

      if(this.overviewStat.power == null){
        this.loading = true
      }else{
        this.loading = false
      }

      return [
        {
          title: 'Lang.Effective computing power of the entire network',
          val: utils.formatPower(power, 4)[0],
          unit: utils.formatPower(power)[1]
        },
        {
          title: 'Lang.24h computing power growth rate',
          val: utils.formatPower(increase_power, 4)[0],
          unit: utils.formatPower(increase_power)[1]
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
          title: 'Lang.Production Efficiency',
          val: utils.formatTrueFil(avg_reward, false),
          unit: 'F/TiB'
        },
        {
          title: 'Lang.Sector pledge',
          val: utils.formatTrueFil(avg_pledge, false),
          unit: 'F/TiB'
        },
        {
          title: 'Lang.32GiB production gas(Real time)',
          val:  utils.formatTrueFil(create_gas_32),
          unit: 'F/TiB'
        },
        {
          title: 'Lang.64GiB production gas(Real time)',
          val:  utils.formatTrueFil(create_gas_64),
          unit: 'F/TiB'
        },
        {
          title: 'Lang.32GiB production gas(Yesterday)',
          val: utils.formatTrueFil(rrm_create_gas_32) || '--',
          unit: 'F/TiB'
        },
        {
          title: 'Lang.64GiB production gas(Yesterday)',
          val: utils.formatTrueFil(rrm_create_gas_64) || '--',
          unit: 'F/TiB'
        },
      ]
    }
  },
  filters:{
    getPoint(item,key){
      let num = parseFloat(item);
      let total = parseFloat(key);
      if (isNaN(num) || isNaN(total)) {
          return "-";
      }
      return total <= 0 ? "0%" : (Math.round(num / total * 10000) / 100.00).toFixed(2)+"%";
    },
  },
  beforeMount(){
  },



  beforeDestroy: function () {
  },
};
</script>
<style>
</style>