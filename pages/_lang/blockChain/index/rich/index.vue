<template>
  <div>
    <div class='lg:flex block justify-between mb-4'>
      <p class='text-2xl lg:block hidden'>{{$t('Lang.Address list')}} <span class='text-base ml-4 text-6C757E'>{{$t('Lang.A total of')}} {{total_count}} {{$t('Lang.Addresses')}}</span></p>
      <div class='flex items-center justify-between'>
        <span class='block lg:hidden text-base text-6C757E mb-1 ml-1'>{{$t('Lang.A total of')}} {{total_count}} {{$t('Lang.Addresses')}}</span>
        <div>
          <el-select  v-model="type" size='mini' @clear='changeSelect' :placeholder="$t('Lang.Please Select')" @change='changeSelect' class='ml-4 w-60'>
            <el-option
              v-for="item in typeOptions"
              :key="item.value"
              :label="$t(item.label)"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
    </div>
    <div class='mb-3 rounded-md bg-white lg:px-6 px-0 pb-2 mb-4'>
      <div class="mb-3" v-show="objs.length !== 0">
        <div class="hidden lg:block"  v-loading="loading">
          <table class="table-fixed w-full">
            <thead>
              <tr class="">
                <th class="w-28 py-4 font-bold pr-2 text-6C757E">{{$t('Lang.Rank')}}</th>
                <th class="py-4 font-bold text-6C757E">{{$t('Lang.Provider')}}</th>
                <th class="py-4 font-bold text-6C757E" v-if="tagShowFlag">{{$t('Lang.Tag')}}</th>
                <th class="py-4 font-bold text-6C757E">{{$t('Lang.Balance')}}</th>
                <th class="py-4 font-bold text-6C757E">{{$t('Lang.Proportion of balance')}}</th>
                <th class="py-4 font-bold text-6C757E">{{$t('Lang.Type')}}</th>
                <th class="py-4 font-bold text-6C757E">{{$t('Lang.Creation time')}}</th>
                <th class="py-4 font-bold text-6C757E">{{$t('Lang.Latest transaction')}}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in objs" class="border-b border-solid border-E8E7EB" :key="index + '_index'">
                <td class="w-24 py-4 px-4 text-center truncate">
                  <template v-if="(index + 1 + (page_size * (page_index - 1))) < 4">
                      <img :src="imgs[index]" class="h-8 inline-block" alt="">
                  </template>
                  <template v-else>
                      <span>{{index + (page_size * (page_index - 1)) + 1}}</span>
                  </template>
                </td>
                <td class="py-3 text-center truncate text-main cursor-pointer hover:opacity-75">
                  <n-link v-if="item.wallet_type == 'fil/5/account' && item.id !=='f099' " :to="`/${lang}/chain/addr/${item.address}`">{{item.address}}</n-link>
                  <n-link v-else-if="item.wallet_type == 'fil/5/account' && item.id =='f099' " :to="`/${lang}/chain/addr/${item.id}`">{{item.id}}</n-link>
                  <n-link v-else :to="`/${lang}/chain/addr/${item.id}`">{{item.id}}</n-link>
                </td>
                <td class="py-3 text-center" v-if="tagShowFlag">
                  <div class="flex items-center justify-center truncate">
                    <template v-if="globalMinerTag[item.id]">
                      <span class="truncate">{{ globalMinerTag[item.id].en_tag }}</span>
                      <el-popover trigger="hover" :content="$t('Lang.The user has completed signature verification for the owner')">
                        <img v-show="globalMinerTag[item.id].signed" src="@/assets/imgs/isSigned.png"  alt="" class='ml-2'  style='width:12px; height:12px' slot="reference">
                      </el-popover>
                    </template>
                    <span v-else>-</span>
                  </div>
                </td>
                <td class="py-3 text-center truncate">{{item.value | formatEasyFil(true)}}</td>
                <td class="py-3 text-center truncate">{{item.value | percent}}</td>
                <td class="py-3 text-center truncate">{{myType(item.wallet_type)}}</td>
                <td class="py-3 text-center truncate pl-6">{{item.create_height_time}}</td>
                <td class="py-3 text-center truncate pl-6">{{item.update_height_time}}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="lg:hidden"  v-loading="loading">
          <div v-for="(item, index) in objs" class="p-3 mb-3 bg-white rounded-md border border-solid border-E8E7EB" :key="index + '_index'">
            <div class="flex items-center justify-between pb-1">
              <span class="flex-1">{{$t('Lang.Rank')}}</span>
              <template v-if="(index + 1 + (page_size * (page_index - 1))) < 4">
                  <img :src="imgs[index]" class="h-8 inline-block" alt="">
              </template>
              <template v-else>
                  <span>{{index + (page_size * (page_index - 1)) + 1}}</span>
              </template>
            </div>
            <div class="flex items-center justify-between pb-1">
              <span class="flex-1">{{$t('Lang.Provider')}}</span>
              <div class="w-1/2 text-right truncate text-main cursor-pointer hover:opacity-75">
                <n-link v-if="item.wallet_type == 'fil/5/account' && item.id !=='f099' " :to="`/${lang}/chain/addr/${item.address}`">{{item.address}}</n-link>
                <n-link v-else-if="item.wallet_type == 'fil/5/account' && item.id =='f099' " :to="`/${lang}/chain/addr/${item.id}`">{{item.id}}</n-link>
                <n-link v-else :to="`/${lang}/chain/addr/${item.id}`">{{item.id}}</n-link>
              </div>
            </div>
            <div class="flex items-center justify-between pb-1" v-if="tagShowFlag">
              <span class="flex-1">{{$t('Lang.Tag')}}</span>
              <div class="w-1/2 text-right truncate">
                <template v-if="globalMinerTag[item.id]">
                  <span class="truncate">{{ globalMinerTag[item.id].en_tag }}</span>
                  <el-popover trigger="hover" :content="$t('Lang.The user has completed signature verification for the owner')">
                    <img v-show="globalMinerTag[item.id].signed" src="@/assets/imgs/isSigned.png"  alt="" class='ml-2'  style='width:12px; height:12px' slot="reference">
                  </el-popover>
                </template>
                <span v-else>-</span>
              </div>
            </div>
            <div class="flex items-center justify-between pb-1">
              <span class="flex-1">{{$t('Lang.Balance')}}</span>
              <div class="w-1/2 text-right truncate">
                <span>{{item.value | formatEasyFil(true)}}</span>
              </div>
            </div>
            <div class="flex items-center justify-between pb-1">
              <span class="flex-1">{{$t('Lang.Proportion of balance')}}</span>
              <div class="w-1/2 text-right truncate">
                <span>{{item.value | percent}}</span>
              </div>
            </div>
            <div class="flex items-center justify-between pb-1">
              <span class="flex-1">{{$t('Lang.Type')}}</span>
              <div class="w-1/2 text-right truncate">
                <span>{{myType(item.wallet_type)}}</span>
              </div>
            </div>
            <div class="flex items-center justify-between pb-1">
              <span class="flex-1">{{$t('Lang.Creation time')}}</span>
              <div class="w-1/2 text-right truncate">
                <span>{{item.create_height_time}}</span>
              </div>
            </div>
            <div class="flex items-center justify-between pb-1">
              <span class="flex-1">{{$t('Lang.Latest transaction')}}</span>
              <div class="w-1/2 text-right truncate">
                <span>{{item.update_height_time}}</span>
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

  watch: {

  },

  computed: {
    ...mapGetters({
      globalMinerTag: 'getGlobalMinerTag',
      tagShowFlag: 'getTagShowFlag'
    }),
    myType(){
      return function(val){
        let str = ''
        if(this.lang == 'zh'){
          switch (val.split('/')[2]) {
            case 'storageminer':
              str = '存储供应商账户'
              break;
            case 'account':
              str = '普通账户'
              break;
            case 'multisig':
              str = '多签账户'
              break;
            default:
              str = val.split('/')[2]
            break;
          }
        }else if(this.lang == 'en'){
          switch (val.split('/')[2]) {
            case 'storageminer':
              str = 'Node account'
              break;
            case 'account':
              str = 'Ordinary account'
              break;
            case 'multisig':
              str = 'Multi-signature account'
              break;
            default:
              str = val.split('/')[2]
            break;
          }
        }else if(this.lang == 'ja'){
          switch (val.split('/')[2]) {
            case 'storageminer':
              str = 'ノードアカウント'
              break;
            case 'account':
              str = '一般アカウント'
              break;
            case 'multisig':
              str = 'マルチシグニチャアカウント'
              break;
            default:
              str = val.split('/')[2]
            break;
          }
        }else{
          switch (val.split('/')[2]) {
            case 'storageminer':
              str = '노드 계정'
              break;
            case 'account':
              str = '일반 계정'
              break;
            case 'multisig':
              str = '다중 서명 계정'
              break;
            default:
              str = val.split('/')[2]
            break;
          }
        }
        return str
      }
    }
  },

  asyncData({ app }) {
    let data = {
      page_index: 1,
      page_size: 20,
      total_count: 0,
      objs: []
    }
    return app.$axios.post('/api/explorer/get_wallets_list', {
        page_index: 1,
        page_size: 20,
      })
      .then(res => {
        if (res.code != 0) return data
        data.objs = res.data.objects
        data.total_count = res.data.total_count
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
      imgs: [
        require("@/assets/imgs/Rank1.png"),
        require("@/assets/imgs/Rank2.png"),
        require("@/assets/imgs/Rank3.png"),
      ],
      loading:false,
      type:'',
      typeOptions:[
        {value:'',label:'Lang.All'},
        {value:'storageminer',label:'Lang.Node account'},
        {value:'account',label:'Lang.Ordinary account'},
        {value:'multisig',label:'Lang.Multi-signature account'},
      ]
    }
  },

  methods: {
    searchRecordHandler: function(pageIndex) {
      this.loading = true
      this.page_index = pageIndex
      this.$axios.post('/api/explorer/get_wallets_list', {
          page_index: pageIndex,
          page_size: this.page_size,
          wallet_type: this.type
        })
        .then(res => {
          if (res.code != 0){
            this.loading = true
            this.objs = []
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
      this.searchRecordHandler(1)
    }
  },

  mounted: function() {

  },

  filters:{
    is_verified(i) {
      return i == 1 ? 'true' : 'false'
    },
    percent(item){
      let num =  utils.formatOriginFil(item) / 2000000000
      return num.toFixed(4) + '%'
    },
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