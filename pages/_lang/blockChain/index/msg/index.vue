<template>
  <div>
    <div class='block lg:flex justify-between lg:mb-4 mb-2'>
      <p class='text-2xl lg:block hidden'>{{$t('Lang.Message list')}} <span class='text-base ml-4 text-6C757E'>{{$t('Lang.A total of')}} {{allNum}} {{$t('Lang.messages')}}</span></p>
      <div class='flex items-center justify-between'>
        <span class='block lg:hidden text-base text-6C757E mb-1 ml-1'>{{$t('Lang.A total of')}} {{allNum}} {{$t('Lang.messages')}}</span>
        <div class='lg:flex hidden'>
        <el-select clearable v-model="value" size='mini' @clear='changeSelect' :placeholder="$t('Lang.Please Select')" @change='searchChange' class='w-60'>
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>

        </div>

        <div class='lg:flex hidden'>
          <el-select clearable v-model="type" size='mini' @clear='changeSelect' :placeholder="$t('Lang.Please Select')" @change='searchChange' class='ml-4 w-60'>
            <el-option
              v-for="item in typeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
    </div>
    <div class='flex lg:hidden justify-start mb-2'>
      <el-select clearable v-model="value" size='mini' @clear='changeSelect' :placeholder="$t('Lang.Please Select')" @change='searchChange' class='w-60 mr-6'>
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      <el-select clearable v-model="type" size='mini' @clear='changeSelect' :placeholder="$t('Lang.Please Select')" @change='changeSelect' class='w-60'>
        <el-option
          v-for="item in typeOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div  class='mb-3 rounded-md bg-white lg:px-6 px-0 pb-2 mb-4'>
      <div v-show="objs.length !== 0">
        <div class=''>
          <div class="hidden lg:block" v-loading="loading">
            <table class="table-fixed w-full">
              <thead>
                <tr class="">
                  <th class="w-1/12 py-4 font-medium pl-6 text-6C757E">{{$t('Lang.Message ID')}}</th>
                  <th class="w-1/12 py-4 font-medium text-6C757E">{{$t('Lang.Height')}}</th>
                  <th class="w-1/12 py-4 font-medium text-6C757E">{{$t('Lang.Sender')}}</th>
                  <th class="w-1/12 py-4 font-medium text-6C757E">{{$t('Lang.Receiver')}}</th>
                  <th class="w-1/12 py-4 font-medium text-6C757E">{{$t('Lang.Types')}}</th>
                  <th class="w-1/12 py-4 font-medium text-6C757E">{{$t('Lang.Amount')}}</th>
                  <th class="w-1/12 py-4 font-medium text-6C757E">{{$t('Lang.time')}}</th>
                  <th class="w-1/12 py-4 font-medium text-6C757E">{{$t('Lang.status')}}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in objs" class="border-b border-solid border-E8E7EB" :key="index + '_index'">
                  <td class="w-1/12 py-3 text-center  pl-6">
                    <el-popover
                        placement="right"
                        trigger="hover"
                        :content="item.msg_cid">
                        <n-link :to="`/${lang}/chain/msg/${item.msg_cid}-${item.height}`" slot="reference" >{{item.msg_cid | getSubStr}}</n-link>
                      </el-popover>
                  </td>
                  <td class="w-1/12 py-3 text-center ">
                    <n-link :to="`/${lang}/chain/tipset/${item.height}`" class='text-main cursor-pointer hover:opacity-75'>{{item.height}}</n-link>
                  </td>
                  <td class="w-1/12 py-3 text-center ">
                    <el-popover
                      placement="right"
                      trigger="hover"
                      :content="item.msg_from">
                      <n-link :to="`/${lang}/chain/addr/${item.msg_from}`" slot="reference" >{{item.msg_from | getSubStr}}</n-link>
                    </el-popover>
                  </td>
                  <td class="w-1/12 py-3 text-center ">
                    <el-popover
                      placement="right"
                      trigger="hover"
                      :content="item.msg_to">
                      <n-link :to="`/${lang}/chain/addr/${item.msg_to}`" slot="reference">{{item.msg_to | getSubStr}}</n-link>
                    </el-popover>
                  </td>
                  <td class="w-1/12 py-3 text-center">{{item.msg_method_name}}</td>
                  <td class="w-1/12 py-3 text-center">{{item.msg_value | formatTrueFil(true)}}</td>
                  <td class="w-1/12 py-3 text-center">{{item.height_time}}</td>
                  <td class="w-1/12 py-3 text-center">{{item.msgrct_exit_code | messageListType}}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="lg:hidden" v-loading="loading">
            <div v-for="(item, index) in objs" class="p-3 mb-3 bg-white rounded-md border border-solid border-E8E7EB" :key="index + '_index'">
              <div class="flex items-center justify-between pb-1">
                <span class="flex-1">{{$t('Lang.Message ID')}}</span>
                <div class="w-1/2 text-right ">
                  <n-link :to="`/${lang}/chain/msg/${item.msg_cid}-${item.height}`">{{item.msg_cid | getSubStr}}</n-link>
                </div>
              </div>
              <div class="flex items-center justify-between pb-1">
                <span>{{$t('Lang.Height')}}</span>
                <n-link :to="`/${lang}/chain/tipset/${item.height}`" class='text-main cursor-pointer hover:opacity-75'>{{item.height}}</n-link>
              </div>
              <div class="flex items-center justify-between pb-1">
                <span>{{$t('Lang.Sender')}}</span>
                <div class="w-1/2 text-right ">
                  <n-link :to="`/${lang}/chain/addr/${item.msg_from}`">{{item.msg_from | getSubStr}}</n-link>
                </div>
              </div>
              <div class="flex items-center justify-between pb-1">
                <span>{{$t('Lang.Receiver')}}</span>
                <div class="w-2/3 text-right ">
                  <n-link :to="`/${lang}/chain/addr/${item.msg_to}`">{{item.msg_to | getSubStr}}</n-link>
                </div>
              </div>
              <div class="flex items-center justify-between pb-1">
                <span>{{$t('Lang.Types')}}</span>
                <span>{{item.msg_method_name}}</span>
              </div>
              <div class="flex items-center justify-between pb-1">
                <span>{{$t('Lang.Amount')}}</span>
                <span>{{item.msg_value | formatTrueFil(true)}}</span>
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
import { mapGetters } from 'vuex'
export default {

  name: 'ChainAddrMsg',

  mixins: [],

  props: [],

  components: {

  },

  watch: {

  },

  computed: {
    ...mapGetters({
      globalMinerTag: 'getGlobalMinerTag'
    })
  },

  asyncData({ app, params }) {
    let data = {
      page_index: 1,
      page_size: 20,
      total_page:'',
      total_count: 0,
      allNum:0,
      allList:[],
      totalCount: 0,
      options:[],
      loading:true,
    }
    return data
  },

  data: function() {
    return {
      objs: [{}],
      lang:this.$store.state.locale,
      value: '',
      options: [],
      loading:true,
      type:'',
      typeOptions:[
        {value:'0',label:'OK'},
        {value:'1',label:'SysErrSenderInvalid'},
        {value:'2',label:'SysErrSenderStateInvalid'},
        {value:'3',label:'SysErrInvalidMethod'},
        {value:'4',label:'SysErrReserved1'},
        {value:'5',label:'SysErrInvalidReceiver'},
        {value:'6',label:'SysErrInsufficientFunds'},
        {value:'7',label:'SysErrOutOfGas'},
        {value:'8',label:'SysErrForbidden'},
        {value:'9',label:'SysErrorlllegalActor'},
        {value:'10',label:'SysErrorlllegalArgument'},
        {value:'11',label:'SysErrReserved2'},
        {value:'12',label:'SysErrorReserved3'},
        {value:'13',label:'SysErrorReserved4'},
        {value:'14',label:'SysErrorReserved5'},
        {value:'15',label:'SysErrorReserved6'},
        {value:'16',label:'ErrIllegalArgument'},
        {value:'17',label:'ErrNotFound'},
        {value:'18',label:'ErrForbidden'},
        {value:'19',label:'ErrInsufficientFunds'},
        {value:'20',label:'ErrIllegalState'},
        {value:'21',label:'ErrSerialization'},
        {value:'32',label:'ErrTooManyProveCommits'},
      ],
      orderSeach:''
    }
  },
  beforeMount(){
    let allValue = '',
      allTpye = '';
    if(this.lang == 'ko'){
      allValue = '모든 종류'
      allTpye = '모든 상태'
    }else if(this.lang == 'en'){
      allValue = 'All types'
      allTpye = 'All States'
    }else if(this.lang == 'ja'){
      allValue = 'すべてのタイプ'
      allTpye = 'すべての状態'
    }else{
      allValue = '全部类型'
      allTpye = '全部状态'
    }
    this.options.unshift({value:'',label:allValue})
    this.typeOptions.unshift({value:'',label:allTpye})
  },

  mounted: function() {
    this.getMsgList()
    this.$axios.post('/api/explorer/get_message_method_list',{
      
    }).then(res=>{
      if (res.code != 0 || !res.data) return data
      for(let i = 0;i<res.data.length;i++){
        if(res.data[i] !== ''){
          this.options.push({value:res.data[i],label:res.data[i]})
        }
      }
    })
  },

  methods: {
    searchRecordHandler: function (pageIndex) {
      this.loading = true
      this.$axios
        .post("/api/explorer/get_message_list", {
          page_size: this.page_size,
          page_index: pageIndex,
          msg_method:this.value,
          msgrct_exit_code:this.type,
          miner_id:this.orderSeach
        })
        .then((res) => {
          if (res.code != 0) return;
          this.objs = res.data.objects;
          this.allNum = res.data.total_count
          this.total_count = res.data.total_count;
          this.page_index = pageIndex;
          this.loading = false
        });
    },
    handleCurrentChange(size){
      this.page_size = size
      this.searchRecordHandler(1)
    },
    changeSelect(){
      this.searchRecordHandler(1)
    },
    searchChange: function(e) {
      if (!e) return;
      let me = this;
      setTimeout(function() {
        me.changeSelect(e);
      }, 200);
    },
    getMsgList(){
      this.loading = true
      this.$axios.post('/api/explorer/get_message_list', {
        page_index: 1,
        page_size: 20,
      }).then(res => {
        if (res.code != 0 || !res.data) return data
        this.loading = false
        this.objs = res.data.objects
        this.total_page = res.data.total_page
        this.allNum = res.data.total_count
        this.total_count = res.data.total_count
      })
    }
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