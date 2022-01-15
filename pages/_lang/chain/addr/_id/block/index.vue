<template>
  <div class='lg:relative bg-white rounded-md pb-3'>
    <div class='lg:hidden block mb-2 text-75737F'>{{$t('Lang.A total of')}} {{total_count}} {{$t('Lang.Block')}}</div>
    <div class='lg:absolute mb-2'  style='right:0;top:-38px'>
      <div class='hidden lg:flex items-center'>
        <div class='mr-6 hidden lg:block text-75737F'>{{$t('Lang.A total of')}} {{total_count}} {{$t('Lang.Block')}}</div>
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
    <div v-show="objs.length !== 0">
      <div class="hidden lg:block" v-loading="loading">
        <table class="table-fixed w-full">
          <thead>
            <tr class="">
              <th class="w-1/12 py-4 font-medium text-6C757E">{{$t('Lang.Block ID')}}</th>
              <th class="w-1/12 py-4 font-medium text-6C757E">{{$t('Lang.Height')}}</th>
              <th class="w-1/12 py-4 font-medium text-6C757E">{{$t('Lang.Number of votes won')}}</th>
              <th class="w-1/12 py-4 font-medium text-6C757E">{{$t('Lang.Reward')}}</th>
              <th class="w-1/12 py-4 font-medium text-6C757E">{{$t('Lang.Number of messages')}}</th>
              <th class="w-1/12 py-4 font-medium text-6C757E">{{$t('Lang.time')}}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in objs" class="border-b border-solid border-E8E7EB" :key="index + '_index'">
              <td class="w-1/12 py-3 text-center">
                <el-popover
                  placement="right"
                  trigger="hover"
                  :content="item.block_hash">
                  <n-link :to="`/${lang}/chain/block/${item.block_hash}`" slot="reference">{{item.block_hash | getSubStr}}</n-link>
                </el-popover>
              </td>
              <td class="w-1/12 py-3 text-center">
                <n-link :to="`/${lang}/chain/tipset/${item.height}`" class='text-main cursor-pointer hover:opacity-75'>{{item.height}}</n-link>
              </td>
              <td class="w-1/12 py-3 text-center">{{item.win_count}}</td>
              <td class="w-1/12 py-3 text-center">{{Number(item.block_reward)+Number(item.gas_reward) | formatTrueFil(true)}}</td>
              <td class="w-1/12 py-3 text-center">{{item.msg_count}}</td>
              <td class="w-1/12 py-3 text-center">{{item.height_time}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="lg:hidden" v-loading="loading">
        <div v-for="(item, index) in objs" class="p-3 mb-3 bg-white rounded-md border border-solid border-E8E7EB" :key="item.block_hash + index">
          <div class="flex items-center justify-between pb-1">
            <span class="w-48">{{$t('Lang.Block ID')}}</span>
            <n-link class="truncate" :to="`/${lang}/chain/block/${item.block_hash}`">{{item.block_hash | getSubStr}}</n-link>
          </div>
          <div class="flex items-center justify-between pb-1">
            <span>{{$t('Lang.Height')}}</span>
            <n-link :to="`/${lang}/chain/tipset/${item.height}`" class='text-main cursor-pointer hover:opacity-75'>{{item.height}}</n-link>
          </div>
          <div class="flex items-center justify-between pb-1">
            <span>{{$t('Lang.Number of votes won')}}</span>
            <span>{{item.win_count}}</span>
          </div>
          <div class="flex items-center justify-between pb-1">
            <span>{{$t('Lang.Reward')}}</span>
            <span>{{Number(item.block_reward)+Number(item.gas_reward) | formatTrueFil(true)}}</span>
          </div>
          <div class="flex items-center justify-between pb-1">
            <span>{{$t('Lang.Number of messages')}}</span>
            <span>{{item.msg_count}}</span>
          </div>
          <div class="flex items-center justify-between pb-1">
            <span>{{$t('Lang.time')}}</span>
            <span>{{item.height_time}}</span>
          </div>
        </div>
      </div>
      <div class="my-3 lg:my-6">
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
</template>
<script>
import utils from "@/static/utils.js";

export default {
  name: 'ChainAddrBlock',

  mixins: [],

  props: [],

  components: {

  },

  watch: {

  },

  computed: {

  },

  asyncData({ app, params }) {
    let data = {
      page_size: 20,
      page_index: 1,
      total_count: 0,
      miner_no: params.id,
    }
    return data

  },

  data: function() {
    return {
      loading:false,
      lang:this.$store.state.locale,
      myDate: "",
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
      dateLeft: null,
      dateRight: null,
      page_size: 20,
      page_index: 1,
      total_count: 0,
      current_page: 1,
      miner_no: null,
      objs: [{}],
      lang: this.$store.state.locale,
      options: [],
      value: "",

    }
  },

  methods: {
    searchRecordHandler: function(pageIndex) {
      if (!this.myDate) {
        this.$axios .post("/api/explorer/get_miner_blocks", {
          miner_id: this.miner_no,
          page_size: this.page_size,
          page_index: pageIndex,
        }).then((res) => {
          if (res.code != 0) return;
          this.objs = res.data.objects;
          this.total_count = res.data.total_count;
          this.page_index = pageIndex;
        });
        return;
      }
      this.$axios .post("/api/explorer/get_miner_blocks", {
        miner_id: this.miner_no,
        page_size: this.page_size,
        page_index: pageIndex,
        start_date: this.myDate[0],
        end_date: this.myDate[1],
      })
      .then((res) => {
        if (res.code != 0) return;
        this.objs = res.data.objects;
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
          .post("/api/explorer/get_miner_blocks", {
            miner_id: this.miner_no,
            page_size: this.page_size,
            page_index: 1,
          })
          .then((res) => {
            if (res.code != 0) return;
            this.objs = res.data.objects;
            this.total_count = res.data.total_count;
          });
        return;
      }
      [this.dateLeft, this.dateRight] = this.myDate;
      this.$axios
        .post("/api/explorer/get_miner_blocks", {
          miner_id: this.miner_no,
          page_size: this.page_size,
          page_index: 1,
          start_date: this.myDate[0],
          end_date: this.myDate[1],
        })
        .then((res) => {
          if (res.code != 0) return;
          this.objs = res.data.objects;
          this.total_count = res.data.total_count;
          this.page_index = res.data.pageIndex;
        });
    },
    changePhoneMyDate() {

      if (this.dateRight == null && this.dateLeft == null) {
        this.myDate = "";
        this.$axios
          .post("/api/explorer/get_miner_blocks", {
            miner_id: this.miner_no,
            page_size: this.page_size,
            page_index: 1,
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
        .post("/api/explorer/get_miner_blocks", {
          miner_id: this.miner_no,
          page_size: this.page_size,
          page_index: 1,
          start_date: utils.formatDate(this.dateLeft, "y-m-d"),
          end_date: utils.formatDate(this.dateRight, "y-m-d"),
        })
        .then((res) => {
          if (res.code != 0) return;
          this.objs = res.data.objects;
          this.total_count = res.data.total_count;
          this.page_index = res.data.pageIndex;
        });
    },
    getList(){
      this.loading = true
      this.$axios.post('/api/explorer/get_miner_blocks', {
        miner_id: this.miner_no,
        page_size: 20,
        page_index: 1
      }).then(res=>{
        if (res.code != 0) return data
        this.loading = false
        this.objs = res.data.objects
        this.total_count = res.data.total_count
      })
    }
  },

  mounted: function() {
    this.getList()
  },

  beforeDestroy: function() {

  }
}
</script>
<style>
</style>