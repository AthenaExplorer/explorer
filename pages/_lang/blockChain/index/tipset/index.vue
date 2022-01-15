<template>
  <div>
    <p class='lg:block hidden text-2xl mb-4'>{{$t('Lang.Block list')}}</p>
    <div class="mb-3 rounded-md bg-white lg:px-6 pb-2 mb-4">
      <div class="hidden lg:block" v-loading='loading'>
        <table class="table-fixed w-full">
          <thead>
            <tr class="">
              <th class="w-1/12 py-4 font-medium text-6C757E">{{$t('Lang.Height')}}</th>
              <th class="w-1/12 py-4 font-medium text-6C757E">{{$t('Lang.Block ID')}}</th>
              <th class="w-1/12 py-4 font-medium text-6C757E">{{$t('Lang.Node')}}</th>
              <th class="w-1/12 py-4 font-medium text-6C757E" v-if="tagShowFlag">{{$t('Lang.Tag')}}</th>
              <th class="w-1/12 py-4 font-medium text-6C757E">{{$t('Lang.Number of messages')}}</th>
              <th class="w-1/12 py-4 font-medium text-6C757E">{{$t('Lang.Reward')}}</th>
              <th class="w-1/12 py-4 font-medium text-6C757E">{{$t('Lang.time')}}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in objs" class="border-b border-solid border-E8E7EB" :key="item.height + '_index'">
              <td class="w-1/12 py-3 text-center">
                <n-link :to="`/${lang}/chain/tipset/${item.height}`" class='text-main cursor-pointer hover:opacity-75'>{{item.height}}</n-link>
              </td>
              <td class="w-1/12 py-3">
                <div class="flex flex-col justify-center text-center">
                  <el-popover
                    v-for="(sub, i) in item.blocks" :key="'sub' + index + i"
                    placement="right"
                    trigger="hover"
                    :content="sub.block_hash">
                    <n-link class="truncate" slot="reference"  :to="`/${lang}/chain/block/${sub.block_hash}`">{{sub.block_hash | getSubStr}}</n-link>
                  </el-popover>
                </div>
              </td>
              <td class="w-1/12 py-3">
                <div class="w-full flex flex-col justify-center text-center">
                  <n-link v-for="(sub, i) in item.blocks" :key="'sub_miner' + index + i" :to="`/${lang}/chain/addr/${sub.miner_id}`">{{sub.miner_id}}</n-link>
                </div>
              </td>
              <td class="w-1/12 py-3" v-if="tagShowFlag">
                <div class="w-full flex flex-col justify-center text-center">
                  <div class="flex items-center justify-center truncate" v-for="(sub, i) in item.blocks" :key="'sub_tag' + index + i">
                    <template v-if="globalMinerTag[sub.miner_id]">
                      <span class="truncate">{{ globalMinerTag[sub.miner_id].en_tag }}</span>
                      <el-popover trigger="hover" :content="$t('Lang.The user has completed signature verification for the owner')">
                        <img v-show="globalMinerTag[sub.miner_id].signed" src="@/assets/imgs/isSigned.png"  alt="" class='ml-2'  style='width:12px; height:14px' slot="reference">
                      </el-popover>
                    </template>
                    <span v-else>-</span>
                  </div>
                </div>
              </td>
              <td class="w-1/12 py-3 text-center">
                <div class="w-full flex flex-col justify-center text-center">
                  <span v-for="(sub, i) in item.blocks" :key="'sub_msg' + index + i">{{sub.msg_count}}</span>
                </div>
              </td>
              <td class="w-1/12 py-3 text-center">
                <div class="w-full flex flex-col justify-center text-center">
                  <span v-for="(sub, i) in item.blocks" :key="'sub_reward' + index + i">{{sub.block_reward | formatEasyFil}}</span>
                </div>
              </td>
              <td class="w-1/12 py-3 text-center">{{item.height_time}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="lg:hidden bg-white" v-loading='loading'>
        <div v-for="(item, index) in objs" class="p-3 mb-3 bg-white rounded-md border border-solid border-E8E7EB" :key="item.height + '_index'">
          <div class="flex items-center justify-between pb-1">
            <div class="flex items-center">
              <span class="mr-2">{{$t('Lang.Height')}}</span>
              <n-link :to="`/${lang}/chain/tipset/${item.height}`" class='text-main cursor-pointer hover:opacity-75'>{{item.height}}</n-link>
            </div>
            <span>{{item.record_time}}</span>
          </div>
          <div class="flex items-center justify-between">
            <div class="flex flex-col">
              <n-link v-for="(sub, i) in item.blocks" :key="'sub_miner' + index + i" :to="`/${lang}/chain/addr/${sub.miner_id}`">{{sub.miner_id}}</n-link>
            </div>
            <div class="flex flex-col ml-6 truncate" v-if="tagShowFlag">
              <div class="flex items-center truncate" v-for="(sub, i) in item.blocks" :key="'sub_tag' + index + i">
                <template v-if="globalMinerTag[sub.miner_id]">
                  <span class="truncate">{{ globalMinerTag[sub.miner_id].en_tag }}</span>
                  <img v-show="globalMinerTag[sub.miner_id].signed" src="@/assets/imgs/isSigned.png"  alt="" class='ml-2'  style='width:11px; height:13px'>
                </template>
                <span v-else>-</span>
              </div>
            </div>
            <div class="flex flex-col ml-auto">
              <span v-for="(sub, i) in item.blocks" :key="'sub_reward' + index + i">{{sub.block_reward | formatEasyFil}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="my-3 lg:mt-6 hidden lg:block">
        <Pagination :pageSize="page_size" :pageIndex="page_index" :totalCount="total_count" @indexChange="searchRecordHandler" @sizeChange='handleCurrentChange'></Pagination>
      </div>
    </div>
     <div class="my-3 lg:mt-6 lg:hidden">
        <Pagination :pageSize="page_size" :pageIndex="page_index" :totalCount="total_count" @indexChange="searchRecordHandler"></Pagination>
      </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import utils from '@/static/utils.js'

export default {
  name: 'ChainTipset',

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
      page_index: 1,
      page_size: 20,
      total_count: 0,
      objs: []
    }
    return app.$axios.post('/api/explorer/get_tipsets', {
        page_index: 1,
        page_size: 20
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
      loading:false
    }
  },

  methods: {
    searchRecordHandler(pageIndex) {
      this.loading = true
      this.$axios.post('/api/explorer/get_tipsets', {
          page_index: pageIndex,
          page_size: this.page_size
        })
        .then(res => {
          if (res.code != 0) {
            this.loading = false
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
  },

  mounted: function() {

  },

  beforeDestroy: function() {

  }
}
</script>
<style>
</style>