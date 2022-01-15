<template>
  <div class="w-full lg:relative">
    <div class='flex justify-start mb-4 lg:absolute' style='right:0;top:-35px'>
      <ul class="flex justify-center checkbox-content">
        <li class="checkbox-list cursor-pointer py-1 px-3 lg:px-5 border border-solid border-E6E6EA" @click="selectStatTimehandler(item)" :class="{ 'first': index == 0, 'last':  timeList.length - 1 == index, 'active' : item.value == time }" v-for="(item, index) in timeList" :key="item.value">
          {{$t(item.key)}}
        </li>
      </ul>
      <div class='w-32 ml-4'>
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
    <div class="hidden lg:block" v-loading='loading'>
      <table class="table-fixed w-full">
        <thead>
          <tr class="">
            <th class="w-24 py-4 px-4 font-medium text-6C757E">{{$t('Lang.Rank')}}</th>
            <th class="py-4 font-medium text-6C757E">{{$t('Lang.Node')}}</th>
            <th class="py-4 font-medium text-6C757E" v-if="tagShowFlag">{{$t('Lang.Tag')}}</th>
            <th class="py-4 font-medium text-6C757E">{{$t('Lang.Effective computing power')}}</th>
            <th class="py-4 font-medium text-6C757E">{{$t('Lang.Production Efficiency')}}
              <el-popover trigger="hover" :content="$t('Lang.The average number of FIL produced per TiB effective computing power during the selected time')">
                <i class="el-icon-info cursor-pointer text-gray-500 text-base" slot="reference"></i>
              </el-popover>
            </th>
            <th class="py-4 font-medium text-6C757E">{{$t('Lang.Sector size')}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in objs" class="border-b border-solid border-E8E7EB" :key="index + '_index'">
            <td class="w-24 py-3 px-4 text-center truncate">
              <template v-if="(index + 1 + (page_size * (page_index - 1))) < 4">
                <img :src="imgs[index]" class="h-6 inline-block" alt="">
              </template>
              <template v-else>
                <span>{{index + (page_size * (page_index - 1)) + 1}}</span>
              </template>
            </td>
            <td class="py-3 text-center">
              <n-link :to="`/${lang}/chain/addr/${item.miner_no}`" class='text-main cursor-pointer hover:opacity-75'>{{item.miner_no}}</n-link>
            </td>
            <td class="py-3 text-center" v-if="tagShowFlag">
              <div class="flex items-center justify-center truncate">
                <template v-if="globalMinerTag[item.miner_no]">
                  <span class="truncate">{{ globalMinerTag[item.miner_no].en_tag }}</span>
                  <el-popover trigger="hover" :content="$t('Lang.The user has completed signature verification for the owner')">
                    <img v-show="globalMinerTag[item.miner_no].signed" src="@/assets/imgs/isSigned.png"  alt="" class='ml-2'  style='width:12px; height:14px' slot="reference">
                  </el-popover>
                </template>
                <span v-else>-</span>
              </div>
            </td>
            <td class="py-3 text-center">
              <span>{{item.power | formatPower()[0]}} {{item.power | formatPower()[1]}}</span>
            </td>
            <td class="py-3 text-center">
              <span>{{item.avg_reward | formatTrueFil(true)}}/TiB</span>
            </td>
            <td class="py-3 text-center">
              <span>{{item.sector_size | formatPower()[0]}} {{item.sector_size | formatPower()[1]}}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="lg:hidden block" v-loading='loading'>
      <div v-for="(item, index) in objs" class="p-3 mb-3  rounded-md bg-white border border-solid border-E8E7EB" :key="index + 'data_index'">
        <div class="flex items-center justify-between pb-1">
          <span>{{$t('Lang.Rank')}}</span>
          <div>
            <template v-if="(index + 1 + (page_size * (page_index - 1))) < 4">
                <img :src="imgs[index]" class="h-6 inline-block" alt="">
              </template>
              <template v-else>
                <span>{{index + (page_size * (page_index - 1)) + 1}}</span>
              </template>
          </div>
        </div>
        <div class="flex items-center justify-between pb-1">
          <span>{{$t('Lang.Node')}}</span>
          <div>
            <n-link :to="`/${lang}/chain/addr/${item.miner_no}`" class='text-main cursor-pointer hover:opacity-75'>{{item.miner_no}}</n-link>
          </div>
        </div>
        <div class="flex items-center justify-between pb-1" v-if="tagShowFlag">
          <span>{{$t('Lang.Tag')}}</span>
          <div class="flex items-center justify-center truncate">
            <template v-if="globalMinerTag[item.miner_no]">
              <span class="truncate">{{ globalMinerTag[item.miner_no].en_tag }}</span>
              <img v-show="globalMinerTag[item.miner_no].signed" src="@/assets/imgs/isSigned.png"  alt="" class='ml-2'  style='width:12px; height:14px'>
            </template>
            <span v-else>-</span>
          </div>
        </div>
        <div class="flex items-center justify-between pb-1">
          <span>{{$t('Lang.Effective computing power')}}</span>
          <div>
            <span>{{item.power | formatPower()[0]}} {{item.power | formatPower()[1]}}</span>
          </div>
        </div>
        <div class="flex items-center justify-between pb-1">
          <span>{{$t('Lang.Production Efficiency')}}
            <el-popover trigger="hover" :content="$t('Lang.The average number of FIL produced per TiB effective computing power during the selected time')">
                <i class="el-icon-info cursor-pointer text-gray-500 text-base" slot="reference"></i>
              </el-popover>
          </span>
          <div>
            <span>{{item.avg_reward | formatTrueFil(true)}}/TiB</span>
          </div>
        </div>
        <div class="flex items-center justify-between pb-1">
          <span>{{$t('Lang.Sector size')}}</span>
          <div>
            <span>{{item.sector_size | formatPower()[0]}} {{item.sector_size | formatPower()[1]}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="my-3 lg:mt-6">
      <Pagination :pageSize="page_size" :pageIndex="page_index" :totalCount="total_count" @indexChange="searchRecordHandler" @sizeChange='handleCurrentChange'></Pagination>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'RankEffic',

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
    })
  },

  asyncData({ app }) {
    let data = {
      page_size: 20,
      page_index: 1,
      total_count: 0,
      objs: []
    }
    return app.$axios.post('/api/explorer/get_miner_ranking_list', {
      page_index: 1,
      page_size: 20,
      stats_type:'24h',
      filter_type:'avg_reward'
    }).then(res => {
      if (res.code != 0) return data
      data.objs = res.data.objects
      data.total_count = res.data.total_count
      return data
    })
  },

  data: function() {
    return {
      time: '24h',
      timeList: [
        {
          value: '24h',
          key: 'Lang.24 hours'
        }, {
          value: '7d',
          key: 'Lang.7days'
        }, {
          value: '30d',
          key: 'Lang.30days'
        }, {
          value: '180d',
          key: 'Lang.180days'
        }
      ],
      value:'',
      options:[
        {value:'0',label:'32G'},
        {value:'1',label:'64G'},
      ],
      page_size: 20,
      page_index: 1,
      total_count: 0,
      objs: [],
      imgs: [
        require("@/assets/imgs/Rank1.png"),
        require("@/assets/imgs/Rank2.png"),
        require("@/assets/imgs/Rank3.png"),
      ],
      lang:this.$store.state.locale,
      loading:false
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
    searchRecordHandler(pageIndex) {
      this.loading = true
      this.$axios.post('/api/explorer/get_miner_ranking_list', {
          page_index: pageIndex,
          page_size: this.page_size,
          stats_type:this.time,
          filter_type:'avg_reward',
          sector_type:this.value
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
    selectStatTimehandler: function(item) {
      if (this.time == item.value) return
      this.time = item.value
      this.searchRecordHandler(1)
    },
    changeSelect(){
      this.searchRecordHandler(1)
    }
  },

  mounted: function() {

  },

  beforeDestroy: function() {

  }
}
</script>
<style>
</style>