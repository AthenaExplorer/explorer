<template>
  <div class="mb-3">
    <div class='flex items-center'>
      <p class='text-2xl my-3'>{{$t('Lang.Height details')}}</p>
    </div>
    <div class="mt-3 lg:border-0 border border-solid border-E8E7EB bg-white rounded-md">
      <div class="flex items-center h-16 lg:h-20 px-3 lg:px-6 border-b border-solid border-E8E7EB">
        <span class="lg:text-lg font-medium text-dark">{{$t('Lang.Height')}}</span>
        <span class="mx-2">-</span>
        <span class="lg:text-lg font-medium text-dark">{{ height }}</span>
      </div>
      <div class="py-3 px-3 lg:px-6 leading-8">
        <div class="flex items-center justify-between lg:justify-start">
          <span class="inline-block w-28 ml-2 text-848599">{{$t('Lang.Number of votes won')}}</span>
          <span class="text-dark">{{blockDetail.total_win_count}}{{$t('Lang.Parts')}}</span>
        </div>
        <div class="flex items-center justify-between lg:justify-start">
          <span class="inline-block w-28 ml-2 text-848599">{{$t('Lang.Total reward')}}</span>
          <span class="text-dark">{{blockDetail.total_reward | formatTrueFil(true)}}</span>
        </div>
        <div class="flex items-center justify-between lg:justify-start">
          <span class="inline-block w-28 ml-2 text-848599">{{$t('Lang.Altitude time')}}</span>
          <span class="text-dark">{{blockDetail.height_time}}</span>
        </div>
        <div class="flex items-center justify-between lg:justify-start">
          <span class="inline-block w-28 ml-2 text-848599">{{$t('Lang.Number of messages')}}</span>
          <span class="text-dark">{{total_msg}}</span>
        </div>
      </div>
    </div>
    <div class="mt-3 lg:border-0 border border-solid border-E8E7EB bg-white rounded-md">
      <div class="flex items-center h-16 lg:h-20 px-3 lg:px-6 border-b border-solid border-E8E7EB">
        <span class="lg:text-lg font-medium text-dark">{{$t('Lang.Block list')}}</span>
      </div>
      <ul class="px-3 lg:mx-6">
        <li class="leading-8 py-3" :class="{'border-b border-solid border-E6E6EA' : index < blockDetail.blocks.length - 1 }" v-for="(item, index) in blockDetail.blocks" :key="item.block_hash">
          <div class="flex justify-between lg:justify-start">
            <div class="w-48 text-848599">{{$t('Lang.Block ID')}}</div>
            <div class="truncate lg:break-all">
              <n-link class="text-main truncate lg:break-all" :to="`/${lang}/chain/block/${item.block_hash}`">{{item.block_hash}}</n-link>
            </div>
          </div>
          <div class="flex justify-between lg:justify-start mt-1">
            <div class="w-48 text-848599">{{$t('Lang.Node')}}</div>
            <div class='flex'>
              <n-link class="text-main" :to="`/${lang}/chain/addr/${item.miner_id}`">{{item.miner_id}}</n-link>
              <div v-if="tagShowFlag">
                <div class="border border-solid border-E8E7EB rounded ml-3 flex items-center" v-if="globalMinerTag[item.miner_no]">
                  <span class="mx-3 text-75737F">{{globalMinerTag[item.miner_id].en_tag}}</span>
                  <img v-show="globalMinerTag[item.miner_id].signed"  src="../../../../assets/imgs/isSigned.png"  alt=""  class='mr-2'  style='width:12px;height:12px'>
                </div>
              </div>
            </div>
          </div>
          <div class="flex justify-between lg:justify-start mt-1">
            <div class="w-48 text-848599">{{$t('Lang.Reward')}}</div>
            <div class="text-dark ">{{(Number(item.block_reward) + Number(item.gas_reward))  | formatTrueFil(true)}}</div>
          </div>
          <div class="flex justify-between lg:justify-start mt-1">
            <div class="w-48 text-848599">{{$t('Lang.Number of messages')}}</div>
            <div class="text-dark">{{item.msg_count}}</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {

  scrollToTop: true,

  name: 'ChainTipsetDetail',

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

  asyncData({ app, params }) {
    let data = {
      height: params.id,
      total_msg: 0,
      blockDetail: {}
    }
    return app.$axios.post('/api/explorer/get_tipset_info', {
        height: params.id
      })
      .then(res => {
        if (res.code != 0) return data
        data.blockDetail = res.data
        let count = 0;
        data.blockDetail.blocks.map(item => {
          count += item.msg_count
        })
        data.total_msg = count
        return data
      })
  },

  data: function() {
    return {
      lang: this.$store.state.locale
    }
  },

  methods: {
    back(){
      window.history.back(-1)
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