<template>
  <div>
    <div class='lg:flex block justify-between mb-4'>
      <p class='text-2xl lg:block hidden'>{{$t('Lang.Order list')}} <span class='text-base ml-4 text-6C757E'>{{$t('Lang.A total of')}} {{total_count}} {{$t('Lang.Deals')}}</span></p>
      <div class='flex items-center justify-between'>
        <span class='block lg:hidden text-base text-6C757E mb-1 ml-1'>{{$t('Lang.A total of')}} {{total_count}} {{$t('Lang.Deals')}}</span>
        <div class='lg:w-96 w-50'>
          <el-input clearable v-model="orderSeach" size="mini" :trigger-on-focus="false" @clear='seachBtn' @change="searchChange" :placeholder="$t('Lang.Search Client/Provider/OrderID')">
            <el-button slot="append" size='mini' @click="seachBtn">
              GO
            </el-button>
          </el-input>
        </div>
        <div class='hidden lg:block ml-2'>
          <div>
            <download-excel
                class = "export-excel-wrapper"
                :data = "json_data"
                :fields = "json_fields"
                header="订单列表"
                name = "订单列表.xls">
                <el-button size="mini">{{$t('Lang.Export')}}</el-button>
            </download-excel>
          </div>
        </div>
      </div>
    </div>
    <div class='mb-3 rounded-md bg-white lg:px-6 px-0 pb-2 mb-4'>
      <div class="mb-3" v-show="objs.length !== 0" >
          <div class="hidden lg:block"  v-loading="loading">
            <table class="table-fixed w-full">
              <thead>
                <tr class="">
                  <th class="w-1/12 py-4 font-bold pr-2 text-6C757E">{{$t('Lang.Deal ID')}}</th>
                  <th class="w-1/12 py-4 font-bold text-6C757E">{{$t('Lang.Creation time')}}</th>
                  <th class="w-1/12 py-4 font-bold text-6C757E">{{$t('Lang.Provider')}}</th>
                  <th class="w-1/12 py-4 text-bold text-6C757E">{{$t('Lang.Client')}}</th>
                  <th class="w-1/12 py-4 font-bold text-6C757E" v-if="tagShowFlag">{{$t('Lang.Tag')}}</th>
                  <th class="w-1/12 py-4 font-bold text-6C757E">{{$t('Lang.Piece Size')}}</th>
                  <th class="w-1/12 py-4 font-bold text-6C757E">{{$t('Lang.Verification status')}}</th>
                  <th class="w-1/12 py-4 font-bold text-6C757E">{{$t('Lang.Storage Fee')}}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in objs" class="border-b border-solid border-E8E7EB" :key="index + '_index'">
                  <td class="w-1/12 py-3 text-center truncate">
                    <div class='flex  items-center justify-center'>
                      <n-link :to="`/${lang}/chain/order/${item.deal_id}`" class='mr-2 text-main cursor-pointer hover:opacity-75'>{{item.deal_id}}</n-link>
                      <el-popover trigger="hover" :content="$t('Lang.This deal is initiated by the official certified client the adjusted power is about ten times raw power')" v-if="item.is_verified==1">
                        <img src="@/assets/imgs/verificationStatus.png" slot="reference" alt="" class='cursor-pointer' style='width:14px;height:14px'>
                      </el-popover>
                      <div v-else style='width:14px'></div>
                    </div>
                  </td>
                  <td class="w-1/12 py-3 text-center truncate pl-6">{{item.height_time}}</td>
                  <td class="w-1/12 py-3 text-center truncate">
                    <n-link :to="`/${lang}/chain/addr/${item.provider}`">{{item.provider}}</n-link>
                  </td>
                  <td class="w-1/12 py-3 text-center truncate">
                    <el-popover
                      placement="right"
                      trigger="hover"
                      :content="item.client">
                      <p slot="reference">{{item.client | getSubStr}}</p>
                    </el-popover>
                  </td>
                  <td class="w-1/12 py-3 text-center" v-if="tagShowFlag">
                    <div class="flex items-center justify-center truncate">
                      <template v-if="globalMinerTag[item.provider]">
                        <span class="truncate">{{ globalMinerTag[item.provider].en_tag }}</span>
                        <el-popover trigger="hover" :content="$t('Lang.The user has completed signature verification for the owner')">
                          <img v-show="globalMinerTag[item.provider].signed" src="@/assets/imgs/isSigned.png"  alt="" class='ml-2'  style='width:12px; height:12px' slot="reference">
                        </el-popover>
                      </template>
                      <span v-else>-</span>
                    </div>
                  </td>
                  <td class="w-1/12 py-3 text-center truncate">{{item.piece_size | piece_size}}</td>
                  <td class="w-1/12 py-3 text-center truncate">{{item.is_verified | is_verified}}</td>
                  <td class="w-1/12 py-3 text-center truncate">N/A</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="lg:hidden bg-white"  v-loading="loading">
            <div v-for="(item, index) in objs" class="p-3 mb-3 bg-white rounded-md border border-solid border-E8E7EB" :key="index + '_index'">
              <div class="flex items-center justify-between pb-1">
                <span class="flex-1">{{$t('Lang.Deal ID')}}</span>
                <div class="w-1/2 text-right flex items-center justify-end truncate">
                  <n-link :to="`/${lang}/chain/order/${item.deal_id}`" class='text-main cursor-pointer hover:opacity-75'>{{item.deal_id}}</n-link>
                  <el-popover trigger="hover" :content="$t('Lang.This deal is initiated by the official certified client the adjusted power is about ten times raw power')" v-show="item.is_verified==1">
                    <img src="@/assets/imgs/verificationStatus.png" slot="reference" alt="" class='cursor-pointer ml-1' style='width:14px;height:14px'>
                  </el-popover>
                </div>
              </div>
              <div class="flex items-center justify-between pb-1">
                <span class="flex-1">{{$t('Lang.Creation time')}}</span>
                <div class="w-1/2 text-right truncate">
                  <span>{{item.height_time}}</span>
                </div>
              </div>
              <div class="flex items-center justify-between pb-1">
                <span class="flex-1">{{$t('Lang.Client')}}</span>
                <div class="w-1/2 text-right truncate">
                  <span>{{item.client}}</span>
                </div>
              </div>
              <div class="flex items-center justify-between pb-1">
                <span class="flex-1">{{$t('Lang.Provider')}}</span>
                <div class="w-1/2 text-right truncate">
                  <span>{{item.provider}}</span>
                </div>
              </div>
              <div class="flex items-center justify-between pb-1">
                <span class="flex-1">{{$t('Lang.Piece Size')}}</span>
                <div class="w-1/2 text-right truncate">
                  <span>{{item.piece_size | piece_size}}</span>
                </div>
              </div>
              <div class="flex items-center justify-between pb-1">
                <span class="flex-1">{{$t('Lang.Verification status')}}</span>
                <div class="w-1/2 text-right truncate">
                  <span>{{item.is_verified | is_verified}}</span>
                </div>
              </div>
              <div class="flex items-center justify-between pb-1">
                <span class="flex-1">{{$t('Lang.Storage Fee')}}</span>
                <div class="w-1/2 text-right truncate">
                  <span>N/A</span>
                </div>
              </div>
            </div>
          </div>
          <div class="my-3 lg:mt-6 hidden lg:block">
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
    <div class="my-3 lg:mt-6 lg:hidden" v-show="objs.length !== 0">
      <Pagination :pageSize="page_size" :pageIndex="page_index" :totalCount="total_count" @indexChange="searchRecordHandler"></Pagination>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import utils from '@/static/utils.js'


export default {
  name: 'ChainOrder',

  mixins: [],

  props: [],

  components: {

  },

  filters: {
    is_verified(i) {
      return i == 1 ? 'true' : 'false'
    }
  },

  watch: {

  },

  computed: {
    ...mapGetters({
      globalMinerTag: 'getGlobalMinerTag',
      tagShowFlag: 'getTagShowFlag'

    })
  },

  asyncData({ app,params }) {
    let data = {
      page_index: 1,
      page_size: 20,
      total_count: 0,
      objs: [],
      orderSeach:params.id
    }
    return app.$axios.post('/api/explorer/get_deal_list', {
        page_index: 1,
        page_size: 20,
        key_words: data.orderSeach,
        is_verified:1
      })
      .then(res => {
        if (res.code != 0) return data
        data.objs = res.data.objects
        data.total_count = res.data.total_count
        data.orderSeach = params.id
        return data
      })
  },

  data: function() {
    return {
      page_index: 1,
      page_size: 20,
      total_count: 0,
      objs: [],
      lang: this.$store.state.locale,
      orderSeach: '',
      loading:false,
      json_fields: {
        订单ID:'deal_id',
        创建时间:'height_time',
        客户:'client',
        托管存储供应商:'provider',
        文件大小:'piece_size',
        托管费用:'cost',
      },
      json_data: [],
      json_meta: [
        [
          {
            " key ": " charset ",
            " value ": " utf- 8 "
          }
        ]
      ]
    }
  },

  methods: {
    searchRecordHandler: function(pageIndex) {
      this.loading = true
      this.page_index = pageIndex
      this.$axios.post('/api/explorer/get_deal_list', {
          page_index: pageIndex,
          page_size: this.page_size,
          key_words: utils.trim(this.orderSeach),
          is_verified:1
        })
        .then(res => {
          if (res.code != 0) return
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
    seachBtn() {
      this.loading = true
      this.$axios.post('/api/explorer/get_deal_list', {
        page_index: 1,
        page_size: this.page_size,
        key_words: utils.trim(this.orderSeach),
        is_verified:1
      }).then(res => {
        if (res.code != 0){
          this.loading = false
          this.objs = []
          return
        } 
        this.loading = false
        this.objs = res.data.objects
        this.total_count = res.data.total_count
        this.page_index = res.data.pageIndex
      })
      this.getexcel()
    },
    searchChange: function(e) {
      if (!e) return;
      let me = this;
      setTimeout(function() {
        me.seachBtn(e);
      }, 200);
    },
    getexcel(){
        this.$axios.post('/api/explorer/get_deal_list', {
          page_index: 1,
          page_size: 200,
          key_words: utils.trim(this.orderSeach),
          is_verified:1
        }).then(res=>{
          this.json_data = res.data.objects
          this.json_data.map(i=>{
              i.cost = 'N/A'
              i.piece_size = utils.piece_size(i.piece_size)
          })
        })
    }
  },

  mounted: function() {
    document.body.scrollTop = document.documentElement.scrollTop = 0
    this.getexcel()
  },

  beforeDestroy: function() {

  }
}
</script>
<style lang="scss">
.title-box .el-input-group__append .el-button {
  background: #333FC6;
  color: #fff;
}

.title-box .el-input-group__append,
.title-box .el-input-group__prepend {
  background: #333FC6;
  border: 1px solid #333FC6;

}
</style>