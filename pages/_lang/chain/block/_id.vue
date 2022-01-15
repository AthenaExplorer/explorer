<template>
  <div class="">
    <div class='flex items-center'>
      <p class='text-2xl my-3'>{{$t('Lang.Block details')}}</p>
    </div>
    <div class="mt-3 lg:border-0 border border-solid border-E8E7EB bg-white rounded-md">
      <div class="flex items-center h-16 lg:h-20 px-3 lg:px-6 border-b border-solid border-E8E7EB">
        <span class="lg:text-lg font-medium text-dark">{{$t('Lang.Block overview')}}</span>
      </div>
      <ul class="py-3 px-3 lg:px-6">
        <li class="flex items-center justify-between lg:justify-start leading-8" v-for="item in blockOverview" :key="item.title">
          <div class="w-48 text-848599 flex-shrink-0">{{$t(item.title)}}</div>
          <template v-if="item.list">
            <div class="flex flex-col truncate">
              <n-link class="truncate lg:break-all" v-for="(sub, index) in item.list" :key="'sub' + index" :to="`/${lang}/chain/block/${sub}`">{{sub}}</n-link>
            </div>
          </template>

          <template v-if="item.tag">
            <div class="lg:flex truncate items-center text-right">
              <n-link class="text-main truncate lg:break-all" :to="`${item.href}`">{{item.val}}</n-link>
              <div v-if="tagShowFlag">
                <div class="border border-solid border-E8E7EB rounded ml-3 flex items-center" v-if="globalMinerTag[item.val]">
                  <span class="mx-3 text-75737F">{{globalMinerTag[item.val].en_tag}}</span>
                  <img v-show="globalMinerTag[item.val].signed"  src="../../../../assets/imgs/isSigned.png"  alt=""  class='mr-2'  style='width:12px;height:12px'>
                </div>
              </div>

            </div>
          </template>

          <template v-else>
            <div v-if="item.href">
              <div>
                <n-link class="text-main truncate lg:break-all" :to="`${item.href}`">{{item.val}}</n-link>
              </div>
            </div>
            <div v-else class="text-dark truncate lg:break-all" :class="`/${item.href}`">{{item.val}}</div>
          </template>
        </li>
      </ul>
    </div>
    <div class="my-3 lg:border-0 border border-solid border-E8E7EB bg-white rounded-md">
      <div class="flex items-center justify-between border-b border-solid border-E8E7EB">
        <div class='flex items-center h-16 lg:h-20 px-3 lg:px-6 '>
          <span class="lg:text-lg font-medium text-dark">{{$t('Lang.Block news')}}</span>
        </div>
        <div class='lg:flex hidden px-2 pt-10 pb-4 items-center justify-between  h-10 '>
          <p class='mr-6 text-75737F'>{{$t('Lang.A total of')}}{{total_count}}{{$t('Lang.messages')}}</p>
          <div>
            <el-select  v-model="value" size='mini' :placeholder="$t('Lang.Please Select')" @clear='changeSelect' @change='changeSelect'>
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

      <div>
        <div class='flex lg:hidden px-2 lg:px-4 pt-8 pb-8  items-center justify-between  h-10 border-b border-solid border-E8E7EB'>
          <p class='lg:pl-2 text-75737F'>{{$t('Lang.A total of')}}{{total_count}}{{$t('Lang.messages')}}</p>
          <div>
            <el-select  v-model="value" size='mini' :placeholder="$t('Lang.Please Select')" @clear='changeSelect' @change='changeSelect'>
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>

        <div v-show="objs.length !== 0">
          <div class="hidden lg:block px-3" v-loading="loading">
            <table class="table-fixed w-full">
              <thead>
                <tr class="">
                  <th class="w-1/12 py-4 font-medium text-6C757E">{{$t('Lang.Message ID')}}</th>
                  <th class="w-1/12 py-4 font-medium text-6C757E">{{$t('Lang.time')}}</th>
                  <th class="w-1/12 py-4 font-medium text-6C757E">{{$t('Lang.Sender')}}</th>
                  <th class="w-1/12 py-4 font-medium text-6C757E">{{$t('Lang.Receiver')}}</th>
                  <th class="w-1/12 py-4 font-medium text-6C757E">{{$t('Lang.Types')}}</th>
                  <th class="w-1/12 py-4 font-medium text-6C757E">{{$t('Lang.Amount')}}</th>
                  <th class="w-1/12 py-4 font-medium text-6C757E">{{$t('Lang.Status')}}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in objs" class="border-b border-solid border-E8E7EB" :key="index + '_index'">
                  <td class="w-1/12 py-3 text-center truncate text-main cursor-pointer hover:opacity-75">
                    <el-popover
                      placement="right"
                      trigger="hover"
                      :content="item.msg_cid">
                      <n-link :to="`/${lang}/chain/msg/${item.msg_cid}-${item.height}`" slot="reference">{{item.msg_cid | getSubStr}}</n-link>
                    </el-popover>
                  </td>
                  <td class="w-1/12 py-3 text-center">{{item.height_time}}</td>
                  <td class="w-1/12 py-3 text-center truncate">
                    <el-popover
                      placement="right"
                      trigger="hover"
                      :content="item.msg_from">
                      <n-link :to="`/${lang}/chain/addr/${item.msg_from}`" slot="reference">{{item.msg_from | getSubStr}}</n-link>
                    </el-popover>
                  </td>
                  <td class="w-1/12 py-3 text-center truncate">
                    <el-popover
                      placement="right"
                      trigger="hover"
                      :content="item.msg_to">
                      <n-link :to="`/${lang}/chain/addr/${item.msg_to}`" slot="reference">{{item.msg_to | getSubStr}}</n-link>
                    </el-popover>
                  </td>
                  <td class="w-1/12 py-3 text-center">{{item.msg_method_name}}</td>
                  <td class="w-1/12 py-3 text-center">{{item.msg_value | formatTrueFil(true)}}</td>
                  <td class="w-1/12 py-3 text-center">{{item.msgrct_exit_code | messageListType}}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="lg:hidden" v-loading="loading">
            <div v-for="(item, index) in objs" class="p-3 border-b border-solid border-E8E7EB" :key="index + '_index'">
              <div class="flex items-center justify-between">
                <span class="flex-1">{{$t('Lang.Message ID')}}</span>
                <div class="w-1/2 text-right truncate text-main cursor-pointer hover:opacity-75">
                  <n-link :to="`/${lang}/chain/msg/${item.msg_cid}-${item.height}`">{{item.msg_cid | getSubStr}}</n-link>
                </div>
              </div>
              <div class="flex items-center justify-between">
                <span>{{$t('Lang.time')}}</span>
                <span>{{item.height_time}}</span>
              </div>
              <div class="flex items-center justify-between">
                <span>{{$t('Lang.Sender')}}</span>
                <div class="w-1/2 text-right truncate">
                  <n-link :to="`/${lang}/chain/addr/${item.msg_from}`">{{item.msg_from | getSubStr}}</n-link>
                </div>
              </div>
              <div class="flex items-center justify-between">
                <span>{{$t('Lang.Receiver')}}</span>
                <div class="w-1/2 text-right truncate">
                  <n-link :to="`/${lang}/chain/addr/${item.msg_to}`">{{item.msg_to | getSubStr}}</n-link>
                </div>
              </div>
              <div class="flex items-center justify-between">
                <span>{{$t('Lang.Types')}}</span>
                <span>{{item.msg_method_name}}</span>
              </div>
              <div class="flex items-center justify-between">
                <span>{{$t('Lang.Amount')}}</span>
                <span>{{item.msg_value | formatTrueFil(true)}}</span>
              </div>
              <div class="flex items-center justify-between">
                <span>{{$t('Lang.Status')}}</span>
                <span>{{item.msgrct_exit_code | messageListType}}</span>
              </div>
            </div>
          </div>
          <div class="my-3 lg:my-6 pb-3">
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
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import utils from '@/static/utils.js'

export default {

  scrollToTop: true,

  name: 'ChainBlockDetail',

  mixins: [],

  props: [],

  components: {

  },

  watch: {

  },

  computed: {
    ...mapGetters({
      globalMinerTag: 'getGlobalMinerTag',
      tagShowFlag: 'getTagShowFlag'
    }),
    blockOverview: function() {
      let {
        block_hash,
        height,
        miner_id,
        height_time,
        msg_count,
        reward_str,
        block_reward,
        gas_reward,
        win_count,
        parents = [],
        parent_weight,
        penalty,
      } = this.overview
      return [
        { title: 'Lang.Block ID', val: block_hash },
        { title: 'Lang.Height', val: height, href: `/${this.lang}/chain/tipset/${height}` },
        { title: 'Lang.Node', val: miner_id, href: `/${this.lang}/chain/addr/${miner_id}`, company: '',tag:this.tag },
        { title: 'Lang.time', val: height_time},
        { title: 'Lang.Message1', val: msg_count },
        { title: 'Lang.Real reward', val:  utils.formatNewEasyFil(Number(block_reward)+Number(gas_reward))[0]+utils.formatNewEasyFil(Number(block_reward)+Number(gas_reward))[1] },
        { title: 'Lang.Number of rewards', val: win_count },
        { title: 'Lang.Parent block', list: parents },
        { title: 'Lang.Parent block weight', val: utils.formatterAmount(parent_weight,0) },
        { title: 'Lang.Fine', val: `${ utils.formatNewEasyFil(Math.abs(penalty))[0] } ${ utils.formatNewEasyFil(Math.abs(penalty))[1] }`, class: 'text-red-500' },
      ]
    }
  },

  asyncData({ app, params }) {
    let data = {
      block_hash: params.id,
      overview: {},
      page_size: 20,
      page_index: 1,
      total_count: 0,
      objs: [{}],
      tag:{},
      options:[]
    }
    return app.$axios.post('/api/explorer/get_block_info', {
        block_hash: data.block_hash
      })
      .then(res => {
        if (res.code != 0) return data
        data.overview = res.data
        return data
      })
  },

  data: function() {
    return {
      block_hash: null,
      overview: {},
      page_size: 20,
      page_index: 1,
      total_count: 0,
      objs: [],
      lang:this.$store.state.locale,
      options: [],
      value: '',
      loading:false,
    }
  },

  methods: {
    searchRecordHandler: function(pageIndex) {
      this.loading = true
      this.$axios.post('/api/explorer/get_message_list', {
          block_hash: this.block_hash,
          page_index: pageIndex,
          page_size: this.page_size,
          msg_method:this.value
        })
        .then(res => {
          if (res.code != 0 || !res.data) {
            this.objs = []
            this.loading = false
            return
          }
          this.loading = false
          this.objs = res.data.objects
          this.total_count = res.data.total_count
          this.page_index = pageIndex
        })
    },
    handleCurrentChange(size){
      this.page_size = size
      this.searchRecordHandler(1)
    },
    changeSelect(){
      this.loading = true
      this.$axios.post('/api/explorer/get_message_list', {
          block_hash:this.block_hash,
          page_index: 1,
          page_size: this.page_size,
          msg_method:this.value
        })
        .then(res => {
          if (res.code != 0 || !res.data) {
            this.objs = []
            this.loading = false
            return
          }
          this.loading = false
          this.objs = res.data.objects
          this.total_count = res.data.total_count
          this.page_index = 1
        })
    },
    back(){
      window.history.back(-1)
    },
    getMsgList(){
      this.loading = true
      this.$axios.post('/api/explorer/get_message_list', {
        block_hash: this.block_hash,
        page_index: 1,
        page_size: 20
      }).then(res=>{
        if (!res || res.code != 0) return data
        this.loading = false
        this.objs = res.data.objects
        this.total_count = res.data.total_count
      })
    }
  },

  beforeMount(){
    let all = ''
    if(this.lang == 'zh'){
      all = '全部类型'
    }else if(this.lang == 'en'){
      all = 'All types'
    }else if(this.lang == 'ja'){
      all = 'すべてのタイプ'
    }else{
      all = '모든 종류'
    }
    this.options.unshift({value:'',label:all})
  },

  mounted: function() {
    this.getMsgList()
    this.$axios.post('/api/explorer/get_message_method_list',{
      block_hash:this.block_hash
    }).then(res=>{
      if (res.code != 0 || !res.data) return data
      for(let i = 0;i<res.data.length;i++){
        if(res.data[i] !== ''){
          this.options.push({value:res.data[i],label:res.data[i]})
        }
      }
    })
  },

  beforeDestroy: function() {

  }
}
</script>
<style>
</style>