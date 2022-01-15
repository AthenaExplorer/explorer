<template>
  <div>
    <div class='block lg:flex justify-between mb-4'>
      <p class='text-2xl lg:block hidden'>{{$t('Lang.Message pool list')}}<span class='text-base ml-4 text-6C757E'>{{$t('Lang.A total of')}} {{allNum}} {{$t('Lang.messages')}}</span></p>
      <div CLASS='flex items-center justify-between'>
      <span class='block lg:hidden text-base text-6C757E mb-1 ml-1'>{{$t('Lang.A total of')}} {{allNum}} {{$t('Lang.messages')}}</span>
        <el-select clearable v-model="value" size='mini' @clear='changeSelect' :placeholder="$t('Lang.Please Select')" @change='changeSelect'>
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
    </div>
    <div  class='mb-3 rounded-md bg-white lg:px-6 px-0 pb-2 mb-4'>
      <div v-show="objs.length !== 0">
        <div class=''>
          <div class="hidden lg:block" v-loading="loading">
            <table class="table-fixed w-full">
              <thead>
                <tr class="">
                  <th class="w-1/12 py-4 font-medium text-6C757E">{{$t('Lang.ID')}}</th>
                  <th class="w-1/12 py-4 font-medium text-6C757E">{{$t('Lang.Creation time')}}</th>
                  <th class="w-1/12 py-4 font-medium text-6C757E">{{$t('Lang.Sender')}}</th>
                  <th class="w-1/12 py-4 font-medium text-6C757E">{{$t('Lang.Receiver')}}</th>
                  <th class="w-1/12 py-4 font-medium text-6C757E">{{$t('Lang.Types')}}</th>
                  <th class="w-1/12 py-4 font-medium text-6C757E">{{$t('Lang.Amount')}}</th>
                  <th class="w-1/12 py-4 font-medium text-6C757E">{{$t('Lang.Gas limit')}}</th>
                  <th class="w-1/12 py-4 font-medium text-6C757E">Consumption Premium</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in objs" class="border-b border-solid border-E8E7EB" :key="index + '_index'">
                  <td class="w-1/12 py-3 text-center text-main cursor-pointer hover:opacity-75">
                    <n-link :to="`/${lang}/chain/msgPool/${item.cid}`">{{item.cid | getSubStr}}</n-link>
                  </td>
                  <td class="w-1/12 py-3 text-center">{{item.height_time}}</td>
                  <td class="w-1/12 py-3 text-center">{{item.msg_from | getSubStr}}</td>
                  <td class="w-1/12 py-3 text-center">{{item.msg_to | getSubStr}}</td>
                  <td class="w-1/12 py-3 text-center">{{item.method_name}}</td>
                  <td class="w-1/12 py-3 text-center">{{item.value | formatEasyFil(true)}}</td>
                  <td class="w-1/12 py-3 text-center">{{item.gas_limit}}</td>
                  <td class="w-1/12 py-3 text-center">{{item.gas_premium | formatEasyFil()}}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="lg:hidden" v-loading="loading">
            <div v-for="(item, index) in objs" class="p-3 mb-3  rounded-md bg-white border border-solid border-E8E7EB" :key="index + '_index'">
              <div class="flex items-center justify-between pb-1">
                <span class="flex-1">{{$t('Lang.Message ID')}}</span>
                <div class="w-1/2 text-right text-main cursor-pointer hover:opacity-75">
                  <n-link :to="`/${lang}/chain/msgPool/${item.cid}`">{{item.cid | getSubStr}}</n-link>
                </div>
              </div>
              <div class="flex items-center justify-between pb-1">
                <span class="flex-1">{{$t('Lang.Creation time')}}</span>
                <div class="w-1/2 text-right ">
                  {{item.height_time}}
                </div>
              </div>
              <div class="flex items-center justify-between pb-1">
                <span class="flex-1">{{$t('Lang.Sender')}}</span>
                <div class="w-1/2 text-right ">
                  {{item.msg_from | getSubStr}}
                </div>
              </div>
              <div class="flex items-center justify-between pb-1">
                <span class="flex-1">{{$t('Lang.Receiver')}}</span>
                <div class="w-1/2 text-right ">
                  {{item.msg_to | getSubStr}}
                </div>
              </div>
              <div class="flex items-center justify-between pb-1">
                <span class="flex-1">{{$t('Lang.Types')}}</span>
                <div class="w-1/2 text-right ">
                  {{item.method_name}}
                </div>
              </div>
              <div class="flex items-center justify-between pb-1">
                <span class="flex-1">{{$t('Lang.Amount')}}</span>
                <div class="w-1/2 text-right ">
                  {{item.value | formatEasyFil(true)}}
                </div>
              </div>
              <div class="flex items-center justify-between pb-1">
                <span class="flex-1">{{$t('Lang.Gas limit')}}</span>
                <div class="w-1/2 text-right ">
                  {{item.gas_limit}}
                </div>
              </div>
              <div class="flex items-center justify-between pb-1">
                <span class="flex-1">Consumption Premium</span>
                <div class="w-1/2 text-right ">
                  {{item.gas_premium | formatEasyFil()}}
                </div>
              </div>
            </div>
          </div>
          <div class="my-3 lg:my-6">
            <Pagination :pageSize="page_size" :pageIndex="page_index" :totalCount="total_count" @indexChange="searchRecordHandler" @sizeChange='handleCurrentChange'></Pagination>
          </div>
        </div>
      </div>

      <div v-show="objs.length == 0" class='flex items-center justify-center' style='height:40vh'>
        <div class='text-center'>
          <img src="@/assets/imgs/noMsg.png" alt="" style='width:150px'>
          <p style='color:#5F6578' class='mb-10'>{{$t('Lang.No data')}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import utils from '@/static/utils.js'

export default {

  name: 'ChainAddrMsg',

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
      page_index: 1,
      page_size: 20,
      total_page:'',
      total_count: 0,
      allNum:0,
      objs: [],
      allList:[],
      totalCount: 0,
      options:[],
      loading:true,
    }
    return app.$axios.post('/api/explorer/get_mpool_list', {
        page_index: 1,
        page_size: 20,
        msg_method:'',
      })
      .then(res => {
        if (res.code != 0 || !res.data) return data
        data.loading = false
        data.objs = res.data.objects
        data.total_page = res.data.total_page
        data.allNum = res.data.total_count
        data.total_count = res.data.total_count
        for(let i = 0;i<res.data.method_name_list.length;i++){
          data.options.push({value:res.data.method_name_list[i],label:res.data.method_name_list[i]})
        }
        return data
      })
  },

  data: function() {
    return {
      objs: [],
      lang:this.$store.state.locale,
      options: [],
      value: '',
      loading:true,
    }
  },
  beforeMount(){
    let all = ''
    if(this.lang == 'ko'){
      all = '모두'
    }else if(this.lang == 'en'){
      all = 'All'
    }else if(this.lang == 'ja'){
      all = 'すべて'
    }else{
      all = '全部'
    }
    this.options.unshift({value:'',label:all})
  },

  mounted: function() {
  },

  methods: {
    searchRecordHandler: function (pageIndex) {
        this.loading = true
        this.$axios
          .post("/api/explorer/get_mpool_list", {
            page_size: this.page_size,
            page_index: pageIndex,
            msg_method:this.value,
          })
          .then((res) => {
            if (res.code != 0){
              this.loading = false
              this.objs = []
              return
            };
            this.loading = false
            this.objs = res.data.objects;
            this.allNum = res.data.total_count
            this.total_count = res.data.total_count;
            this.page_index = pageIndex;
          });
    },
    handleCurrentChange(size){
      this.page_size = size
      this.searchRecordHandler(1)
    },
    changeSelect(){
      this.searchRecordHandler(1)
    },
  },



  beforeDestroy: function() {

  }
}
</script>
<style>
.circular{
  margin: 0 auto;
}
.myul .checkbox-list{
  font-weight: bold;
  background: #f4f4f5;
}
.myul .active{
  color: #fff;
  background:#333fc6!important;
}
.golist:hover{
  color:#333fc6;
}
.el-select-dropdown__item.hover, .el-select-dropdown__item:hover{
  color:#333fc6;
}
</style>