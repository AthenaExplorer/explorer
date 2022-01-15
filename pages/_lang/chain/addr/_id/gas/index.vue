<template>
  <div class='lg:relative  bg-white px-3 rounded-md pb-3'>
    <div class='lg:absolute lg:flex block items-center  mb-2'  style='right:0;top:-38px'>
      <div class='lg:ml-3 mr-6 text-75737F'>{{$t('Lang.A total of')}} {{total_count}} {{$t('Lang.messages')}}</div>
      <div class='hidden lg:flex'>
        <el-date-picker
            v-model="myDate"
            type="daterange"
            range-separator="-"
            :start-placeholder="$t('Lang.Start date')"
            :end-placeholder="$t('Lang.End date')"
            value-format="yyyy-MM-dd"
            :picker-options="pickerOptions"
            @change='changeMyDate'>
        </el-date-picker>
      </div>
      <div class='lg:hidden flex mt-2'>
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
    <div v-show="objs.length!==0">
      <div class="hidden lg:block">
        <table class="table-fixed w-full">
          <thead>
            <tr class="">
              <th class="w-1/12 py-4 font-medium text-6C757E">{{$t('Lang.Time')}}</th>
              <th class="w-1/12 py-4 font-medium text-6C757E">{{$t('Lang.Package volume')}}</th>
              <th class="w-1/12 py-4 font-medium text-6C757E">{{$t('Lang.Power Growth')}}</th>
              <th class="w-1/12 py-4 font-medium text-6C757E">{{$t('Lang.Production Gas Consumption')}}</th>
              <th class="w-1/12 py-4 font-medium text-6C757E">{{$t('Lang.Gas Used')}}</th>
              <th class="w-1/12 py-4 font-medium text-6C757E">{{$t('Lang.Maintenance Gas consumption')}}</th>
              <th class="w-1/12 py-4 font-medium text-6C757E">{{$t('Lang.Maintenance gas1')}}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in objs" class="border-b border-solid border-E8E7EB" :key="item.date">
              <td class="w-1/12 py-3 text-center">{{item.date}}</td>
              <td class="w-1/12 py-3 text-center">{{item.increase_power | formatPower(2)[0]}}{{item.increase_power | formatPower(2)[1]}}</td>
              <td class="w-1/12 py-3 text-center" :class="{'text-red-500' : item.increase_power_offset< 0}">{{item.increase_power_offset | formatPower(2)[0]}}{{item.increase_power_offset | formatPower(2)[1]}}</td>
              <td class="w-1/12 py-3 text-center">{{item.create_total_gas | formatEasyFil}}</td>
              <td class="w-1/12 py-3 text-center">{{item.create_gas | formatEasyFil}}/TiB</td>
              <td class="w-1/12 py-3 text-center">{{item.win_post_gas | formatEasyFil}}</td>
              <td class="w-1/12 py-3 text-center">{{item.win_gas | formatEasyFil}}/TiB</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="lg:hidden">
        <div v-for="(item, index) in objs" class="p-3 rounded-md border border-solid border-E8E7EB mb-3" :key="item.date + index">
          <div class="flex items-center justify-between">
            <span>{{$t('Lang.Time')}}</span>
            <span>{{item.date}}</span>
          </div>
          <div class="flex items-center justify-between">
            <span>{{$t('Lang.Package volume')}}</span>
            <span>{{item.increase_power | formatPower(2)[0]}}{{item.increase_power | formatPower(2)[1]}}</span>
          </div>
          <div class="flex items-center justify-between">
            <span>{{$t('Lang.Power Growth')}}</span>
            <span :class="{'text-red-500' : item.increase_power_offset < 0}">{{item.increase_power_offset | formatPower(2)[0]}}{{item.increase_power_offset | formatPower(2)[1]}}</span>
          </div>
          <div class="flex items-center justify-between">
            <span>{{$t('Lang.Gas Consume')}}</span>
            <span>{{item.total_gas | formatEasyFil}}</span>
          </div>
          <div class="flex items-center justify-between">
            <span>{{$t('Lang.Gas Used')}}</span>
            <span>{{item.create_gas | formatEasyFil}}/TiB</span>
          </div>
          <div class="flex items-center justify-between">
            <span>{{$t('Lang.Maintenance Gas consumption')}}</span>
            <span>{{item.win_post_gas | formatEasyFil}}</span>
          </div>
          <div class="flex items-center justify-between">
            <span>{{$t('Lang.Maintenance gas1')}}</span>
            <span>{{item.win_gas | formatEasyFil}}/TiB</span>
          </div>
        </div>
      </div>
      <div class="my-3 lg:my-6">
        <Pagination :pageSize="page_size" :pageIndex="page_index" :totalCount="total_count" @indexChange="searchRecordHandler" @sizeChange='handleCurrentChange' :currentPage='current_page' ></Pagination>
      </div>
    </div>
    <div v-show="objs.length == 0" class='flex items-center justify-center' style='height:40vh'>
      <div class='text-center'>
        <img src="@/assets/imgs/noMsg.png" alt="" style='width:150px'>
        <p style='color:#5F6578' class='mb-10'>{{$t('Lang.No data')}}</p>
      </div>
    </div>
  </div>
</template>
<script>
import utils from "@/static/utils.js";

export default {
  name: "ChainAddrTransfer",

  mixins: [],

  props: [],

  components: {},

  watch: {},

  computed: {},

  asyncData({ app, params }) {
    let data = {
      page_size: 20,
      page_index: 1,
      total_count: 0,
      miner_no: params.id,
      objs: [],
      options: [],
      current_page: 1,
    };
    return app.$axios
      .post("/api/explorer/get_miner_day_gas_list_by_no", {
        miner_no: data.miner_no,
        page_size: 20,
        page_index: 1,
      })
      .then((res) => {
        if (res.code != 0) return data;
        data.objs = res.data.objects || [];
        data.total_count = res.data.total_count;
        return data;
      });
  },

  data: function () {
    return {
      phoneMyDate: "",
      myDate: "",
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
      page_size: 20,
      page_index: 1,
      total_count: 0,
      current_page: 1,
      miner_no: null,
      objs: [],
      lang: this.$store.state.locale,
      options: [],
      value: "",
      dateLeft: null,
      dateRight: null,
    };
  },
  beforeMount() {
  },

  methods: {
    searchRecordHandler: function (pageIndex) {
      if (!this.myDate) {
        this.$axios
          .post("/api/explorer/get_miner_day_gas_list_by_no", {
            miner_no: this.miner_no,
            page_size: this.page_size,
            page_index: pageIndex,
          })
          .then((res) => {
            if (res.code != 0) return;
            this.objs = res.data.objects || [];
            this.total_count = res.data.total_count;
            this.page_index = pageIndex;
          });
        return;
      }
      this.$axios
        .post("/api/explorer/get_miner_day_gas_list_by_no", {
          miner_no: this.miner_no,
          page_size: this.page_size,
          page_index: pageIndex,
          start_date: this.myDate[0],
          end_date: this.myDate[1],
        })
        .then((res) => {
          if (res.code != 0) return;
          this.objs = res.data.objects || [];
          this.total_count = res.data.total_count;
          this.page_index = pageIndex;
        });
    },

    handleCurrentChange(size){
      this.page_size = size
      this.searchRecordHandler(1)
    },

    changeMyDate() {
      if (!this.myDate) {
        this.$axios
          .post("/api/explorer/get_miner_day_gas_list_by_no", {
            miner_no: this.miner_no,
            page_size: this.page_size,
            page_index: 1,
          })
          .then((res) => {
            if (res.code != 0) return;
            this.objs = res.data.objects || [];
            this.total_count = res.data.total_count;
          });
        return;
      }
      [this.dateLeft, this.dateRight] = this.myDate;
      this.$axios
        .post("/api/explorer/get_miner_day_gas_list_by_no", {
          miner_no: this.miner_no,
          page_size: this.page_size,
          page_index: 1,
          start_date: this.myDate[0],
          end_date: this.myDate[1],
        })
        .then((res) => {
          if (res.code != 0) return;
          this.objs = res.data.objects || [];
          this.total_count = res.data.total_count;
          this.page_index = res.data.pageIndex;
        });
    },
    changePhoneMyDate() {
      if (this.dateRight == null && this.dateLeft == null) {
        this.myDate = "";
        this.$axios
          .post("/api/explorer/get_miner_day_gas_list_by_no", {
            miner_no: this.miner_no,
            page_size: this.page_size,
            page_index: 1,
          })
          .then((res) => {
            if (res.code != 0) return;
            this.objs = res.data.objects || [];
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
        .post("/api/explorer/get_miner_day_gas_list_by_no", {
          miner_no: this.miner_no,
          page_size: this.page_size,
          page_index: 1,
          start_date: utils.formatDate(this.dateLeft, "y-m-d"),
          end_date: utils.formatDate(this.dateRight, "y-m-d"),
        })
        .then((res) => {
          if (res.code != 0) return;
          this.objs = res.data.objects || [];
          this.total_count = res.data.total_count;
          this.page_index = res.data.pageIndex;
        });
    },
    mima() {
      let a = utils.getAES("12az");
      let b = utils.getDAes("TLRGG/Auh/FAlgXiLYG7Ug==");
    },
  },

  mounted: function () {},

  beforeDestroy: function () {},
};
</script>
<style>
.el-date-editor--daterange.el-input,
.el-date-editor--daterange.el-input__inner,
.el-date-editor--timerange.el-input,
.el-date-editor--timerange.el-input__inner {
  width: 265px;
}
</style>