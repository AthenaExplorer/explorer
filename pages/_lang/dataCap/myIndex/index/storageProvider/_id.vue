<template>
  <div>
    <div class='lg:flex block justify-between mb-4'>
      <p class='text-2xl lg:block hidden'>{{$t('Lang.Datacap storage provider list')}} <span class='text-base ml-4 text-6C757E'>{{$t('Lang.A total of')}} {{total_count}} {{$t('Lang.Individual')}}</span></p>
      <div class='flex items-center justify-between'>
        <span class='block lg:hidden text-base text-6C757E mb-1 ml-1'>{{$t('Lang.A total of')}} {{total_count}} {{$t('Lang.Individual')}}</span>
        <div class='lg:w-96 w-64'>
          <el-input clearable v-model="orderSeach" size="mini" :trigger-on-focus="false" @clear='seachBtn' @change="searchChange" :placeholder="$t('Lang.Storage provider ID')">
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
                header="公证人列表"
                name = "公证人列表.xls">
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
                  <th class="w-1/12 py-4 font-bold pr-2 text-6C757E">{{$t('Lang.Storage provider ID')}}</th>
                  <th class="w-1/12 py-4 font-bold text-6C757E">{{$t('Lang.Datacap order')}}</th>
                  <th class="w-1/12 py-4 text-bold text-6C757E">{{$t('Lang.Datacap data')}}</th>
                  <th class="w-1/12 py-4 font-bold text-6C757E">{{$t('Lang.Datacap customers')}}</th>
                  <th class="w-1/12 py-4 font-bold text-6C757E">{{$t('Lang.Average transaction value')}}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in objs" class="border-b border-solid border-E8E7EB" :key="index + '_index'">
                  <td class="w-1/12 py-3 text-center truncate">
                    <n-link :to="`/${lang}/chain/addr/${item.miner_no}`" class='text-main cursor-pointer hover:opacity-75'>{{item.miner_no}}</n-link>
                  </td>
                  <td class="w-1/12 py-3 text-center truncate">
                    <n-link :to="`/${lang}/dataCap/myIndex/order/${item.miner_no}`" class='text-main cursor-pointer hover:opacity-75'>{{item.deal_count}}</n-link>
                  </td>
                  <td class="w-1/12 py-3 text-center truncate">{{item.use_allowance | formatPower(2)[0]}} {{item.use_allowance | formatPower(2)[1]}}</td>
                  <td class="w-1/12 py-3 text-center truncate">
                    <n-link :to="`/${lang}/dataCap/myIndex/customer/${item.miner_no}`" class='text-main cursor-pointer hover:opacity-75'>{{item.client_count}}</n-link>
                  </td>
                  <td class="w-1/12 py-3 text-center truncate">{{item.avg_price | formatEasyFil}}</td>

                </tr>
              </tbody>
            </table>
          </div>
          <div class="lg:hidden bg-white"  v-loading="loading">
            <div v-for="(item, index) in objs" class="p-3 mb-3 bg-white rounded-md border border-solid border-E8E7EB" :key="index + '_index'">
              <div class="flex items-center justify-between pb-1">
                <span class="flex-1">{{$t('Lang.Storage provider ID')}}</span>
                <div class="w-1/2 text-right flex items-center justify-end truncate">
                  <n-link :to="`/${lang}/chain/addr/${item.miner_no}`" class='text-main cursor-pointer hover:opacity-75'>{{item.miner_no}}</n-link>
                </div>
              </div>
              <div class="flex items-center justify-between pb-1">
                <span class="flex-1">{{$t('Lang.Datacap order')}}</span>
                <div class="w-1/2 text-right flex items-center justify-end truncate">
                  <n-link :to="`/${lang}/dataCap/myIndex/order/${item.miner_no}`" class='text-main cursor-pointer hover:opacity-75'>{{item.deal_count}}</n-link>
                </div>
              </div>
              <div class="flex items-center justify-between pb-1">
                <span class="flex-1">{{$t('Lang.Datacap data')}}</span>
                <div class="w-1/2 text-right flex items-center justify-end truncate">
                  {{item.use_allowance | formatPower(2)[0]}} {{item.use_allowance | formatPower(2)[1]}}
                </div>
              </div>
              <div class="flex items-center justify-between pb-1">
                <span class="flex-1">{{$t('Lang.Datacap customers')}}</span>
                <div class="w-1/2 text-right flex items-center justify-end truncate">
                  <n-link :to="`/${lang}/chain/addr/${item.client_count}`" class='text-main cursor-pointer hover:opacity-75'>{{item.client_count}}</n-link>
                </div>
              </div>
              <div class="flex items-center justify-between pb-1">
                <span class="flex-1">{{$t('Lang.Average transaction value')}}</span>
                <div class="w-1/2 text-right flex items-center justify-end truncate">
                  {{item.avg_price | formatEasyFil}}
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
    })
  },

  asyncData({ app,params }) {
    let data = {
      page_index: 1,
      page_size: 20,
      total_count: 0,
      objs: [],
      orderSeach:''
    }
    return app.$axios.post('/api/explorer/get_provider_list', {
        page_index: 1,
        page_size: 20,
        key_words: params.id
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
        存储供应商ID:'miner_no',
        DataCap订单:'deal_count',
        DataCap数据:'use_allowance',
        DataCap客户:'client_count',
        平均成交数值:'avg_price',
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
      this.$axios.post('/api/explorer/get_provider_list', {
          page_index: pageIndex,
          page_size: this.page_size,
          key_words: utils.trim(this.orderSeach)
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
      this.$axios.post('/api/explorer/get_provider_list', {
          page_index: 1,
          page_size: this.page_size,
          key_words: utils.trim(this.orderSeach)
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
    },
    searchChange: function(e) {
      if (!e) return;
      let me = this;
      setTimeout(function() {
        me.seachBtn(e);
      }, 200);
    },
    getexcel(){
      this.$axios.post('/api/explorer/get_provider_list', {
        page_index: 1,
        page_size: 200,
        key_words: utils.trim(this.orderSeach),
      }).then(res=>{
        this.json_data = res.data.objects
        this.json_data.map(i=>{
            i.use_allowance = utils.formatPower(i.use_allowance)[0] + utils.formatPower(i.use_allowance)[1]
            i.avg_price = utils.formatEasyFil(i.avg_price)
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