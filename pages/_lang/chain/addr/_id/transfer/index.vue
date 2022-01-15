<template>
  <div class='lg:relative bg-white rounded-md pb-3'>
    <div class='lg:absolute mb-2' style='right:0;top:-38px'>
      <div class=' flex items-center justify-between'>
        <div class='lg:mr-6 text-75737F'>{{$t('Lang.A total of')}} {{total_count}} {{$t('Lang.messages')}}</div>
        <div class='flex items-center'>
          <div class='hidden lg:flex mr-4'>
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
          <div class='lg:hidden block'>
            <el-select clearable v-model="value" size='mini' placeholder="请选择" @change='changeSelectPhone'>
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class='hidden lg:block'>
            <el-select clearable v-model="value" size='mini' placeholder="请选择" @change='changeSelect'>
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
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
      <div class="hidden lg:block" v-loading='loading'>
        <table class="table-fixed w-full">
          <thead>
            <tr class="">
              <th class="w-1/12 py-4 font-medium text-6C757E">{{$t('Lang.Message ID')}}</th>
              <th class="w-1/12 py-4 font-medium text-6C757E">{{$t('Lang.Height')}}</th>
              <th class="w-1/12 py-4 font-medium text-6C757E">{{$t('Lang.Sender')}}</th>
              <th class="w-1/12 py-4 font-medium text-6C757E"></th>
              <th class="w-1/12 py-4 font-medium text-6C757E">{{$t('Lang.Receiver')}}</th>
              <th class="w-1/12 py-4 font-medium text-6C757E">{{$t('Lang.Types')}}</th>
              <th class="w-1/12 py-4 font-medium text-6C757E">{{$t('Lang.Amount')}}</th>
              <th class="w-1/12 py-4 font-medium text-6C757E">{{$t('Lang.time')}}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in objs" class="border-b border-solid border-E8E7EB" :key="index + '_index'">
              <td class="w-1/12 py-3 text-center">
                <el-popover
                  placement="right"
                  trigger="hover"
                  :content="item.msg_cid">
                  <n-link :to="`/${lang}/chain/msg/${item.msg_cid}-${item.height}`" slot="reference">{{item.msg_cid | getSubStr}}</n-link>
                </el-popover>
              </td>
              <td class="w-1/12 py-3 text-center">
                <n-link :to="`/${lang}/chain/tipset/${item.height}`" class='text-main cursor-pointer hover:opacity-75'>{{item.height}}</n-link>
              </td>
              <td class="w-2/12 py-3 text-center ">
                <div  class='flex items-center justify-center truncate'>
                  <div class=''>
                    <el-popover
                      placement="right"
                      trigger="hover"
                      :content="item.msg_from">
                      <n-link :to="`/${lang}/chain/addr/${item.msg_from}`" slot="reference">{{item.msg_from | getSubStr}}</n-link>
                    </el-popover>
                  </div>
                </div>
              </td>
              <td class="w-16 py-3 text-center truncate">
                <img class='m-auto' src="../../../../../../assets/imgs/to.png" alt="" style='width:13px'>
              </td>
              <td class="w-2/12 py-3 text-center truncate">
                <div class='flex items-center justify-center'>
                   <el-popover
                      placement="right"
                      trigger="hover"
                      :content="item.msg_to">
                      <n-link :to="`/${lang}/chain/addr/${item.msg_to}`" slot="reference">{{item.msg_to | getSubStr}}</n-link>
                    </el-popover>
                </div>
              </td>
              <td class="w-1/12 py-3 text-center">{{item.msg_method_name}}</td>
              <td class="w-1/12 py-3 text-center">{{item.msg_value | formatEasyFil(4)}}</td>
              <td class="w-1/12 py-3 text-center">{{item.height_time}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="lg:hidden" v-loading='loading'>
        <div v-for="(item, index) in objs" class="p-3 mb-3 bg-white rounded-md border border-solid border-E8E7EB" :key="index + '_index'">
          <div class="flex items-center justify-between pb-1">
            <span class="flex-1">{{$t('Lang.Message ID')}}</span>
            <div class="w-1/2 text-right truncate">
              <n-link :to="`/${lang}/chain/msg/${item.msg_cid}-${item.height}`">{{item.msg_cid | getSubStr}}</n-link>
            </div>
          </div>
          <div class="flex items-center justify-between pb-1">
            <span>{{$t('Lang.Height')}}</span>
            <n-link :to="`/${lang}/chain/tipset/${item.height}`" class='text-main cursor-pointer hover:opacity-75'>{{item.height}}</n-link>
          </div>
          <div class="flex items-center justify-between pb-1">
            <span>{{$t('Lang.Sender')}}</span>
            <div class="text-right truncate flex items-center justify-center">
              <n-link :to="`/${lang}/chain/addr/${item.msg_from}`">{{item.msg_from | getSubStr}}</n-link>
            </div>
          </div>
          <div class="flex items-center justify-between pb-1">
            <span>{{$t('Lang.Receiver')}}</span>
            <div class="text-right truncate flex items-center justify-center">
              <n-link :to="`/${lang}/chain/addr/${item.msg_to}`">{{item.msg_to | getSubStr}}</n-link>
            </div>
          </div>
          <div class="flex items-center justify-between pb-1">
            <span>{{$t('Lang.Types')}}</span>
            <span>{{item.msg_method_name}}</span>
          </div>
          <div class="flex items-center justify-between pb-1">
            <span>{{$t('Lang.Amount')}}</span>
            <span>{{item.msg_value | formatEasyFil(4)}}</span>
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
  name: 'ChainAddrTransfer',

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
      page_size: 20,
      page_index: 1,
      total_count: 0,
      miner_no: null,
      objs: [{}],
      lang:this.$store.state.locale,
      options: [
        {value:'Send',label:'Send'},
        {value:'WithdrawBalance',label:'WithdrawBalance'},
      ],
      value: '',
      dateLeft: null,
      dateRight: null,
      myDate: "",
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
      loading:false,
    }
  },
  beforeMount(){
    let all = ''
    if(this.lang == 'zh'){
      all = '全部'
    }else if(this.lang == 'en'){
      all = 'All'
    }else if(this.lang == 'ja'){
      all = 'すべて'
    }else{
      all = '모두'
    }
    this.options.unshift({value:'',label:all})
  },

  methods: {
    searchRecordHandler: function(pageIndex) {
      if (!this.myDate) {
        this.loading = true
        this.$axios .post("/api/explorer/get_transfer_list", {
          miner_id: this.miner_no,
          page_size: this.page_size,
          page_index: pageIndex,
          msg_method:this.value,
        }).then((res) => {
          if (res.code != 0) return;
          this.loading = false
          this.objs = res.data.objects;
          this.total_count = res.data.total_count;
          this.page_index = pageIndex;
        });
        return;
      }
      this.loading = true
      this.$axios .post("/api/explorer/get_transfer_list", {
        miner_id: this.miner_no,
        page_size: this.page_size,
        page_index: pageIndex,
        start_date: this.myDate[0],
        end_date: this.myDate[1],
        msg_method:this.value,
      })
      .then((res) => {
        if (res.code != 0) return;
        this.loading = false
        this.objs = res.data.objs;
        this.total_count = res.data.total_count;
        this.page_index = pageIndex;
        
      });
    },
    handleCurrentChange(size){
      this.page_size = size
      this.searchRecordHandler(1)
    },
    changeSelect(){
      this.changeMyDate()
    },
    changeSelectPhone(){
      this.changePhoneMyDate()
    },
    changeMyDate() {
      if (!this.myDate) {
        this.loading = true
        this.$axios
          .post("/api/explorer/get_transfer_list", {
            miner_id: this.miner_no,
            page_size: this.page_size,
            page_index: 1,
            msg_method:this.value,
          })
          .then((res) => {
            if (res.code != 0) return;
             this.loading = false
            this.objs = res.data.objects;
            this.total_count = res.data.total_count;
          });
        return;
      }
      [this.dateLeft, this.dateRight] = this.myDate;
      this.loading = true
      this.$axios
        .post("/api/explorer/get_transfer_list", {
          miner_id: this.miner_no,
          page_size: this.page_size,
          page_index: 1,
          start_date: this.myDate[0],
          end_date: this.myDate[1],
          msg_method:this.value,
        })
        .then((res) => {
          if (res.code != 0) return;
          this.loading = false
          this.objs = res.data.objects;
          this.total_count = res.data.total_count;
          this.page_index = res.data.pageIndex;
        });
    },
    changePhoneMyDate() {

      if (this.dateRight == null && this.dateLeft == null) {
        this.myDate = "";
        this.loading = true
        this.$axios
          .post("/api/explorer/get_transfer_list", {
            miner_id: this.miner_no,
            page_size: this.page_size,
            page_index: 1,
            msg_method:this.value,
          })
          .then((res) => {
            if (res.code != 0) return;
            this.loading = false
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
      this.loading = true
      this.$axios
        .post("/api/explorer/get_transfer_list", {
          miner_id: this.miner_no,
          page_size: this.page_size,
          page_index: 1,
          start_date: utils.formatDate(this.dateLeft, "y-m-d"),
          end_date: utils.formatDate(this.dateRight, "y-m-d"),
          msg_method:this.value,
        })
        .then((res) => {
          if (res.code != 0) return;
          this.loading = false
          this.objs = res.data.objects;
          this.total_count = res.data.total_count;
          this.page_index = res.data.pageIndex;
        });
    },
    getMsgList(){
      this.loading = true
      this.$axios.post('/api/explorer/get_transfer_list', {
        miner_id: this.miner_no,
        page_size: 20,
        page_index: 1,
      }).then(res => {
        if (res.code != 0) return data
        this.loading = false
        this.objs = res.data.objects
        this.total_count = res.data.total_count
      })
    }
  },

  mounted: function() {
    this.getMsgList()
  },

  beforeDestroy: function() {

  }
}
</script>
<style>
</style>