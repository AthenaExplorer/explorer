<template>
  <div class='mb-10'>
    <div class='flex items-center'>
      <p class='text-2xl my-3'>{{$t('Lang.Order details')}}</p>
      
    </div>
    <div class="mt-3 lg:border-0 border border-solid border-E8E7EB bg-white rounded-md">
      <div class="flex items-center h-16 lg:h-20 px-3 lg:px-6 border-b border-solid border-E8E7EB">
        <span class="lg:text-lg font-medium text-dark">{{$t('Lang.Deal Detail')}}</span>
      </div>
      <div class="py-3 px-3 lg:px-6 leading-8 border-b border-solid border-E8E7EB lg:block hidden text-lg pb-6">
        <div class="flex items-center justify-between lg:justify-start mb-4">
          <span class="inline-block w-48 ml-2 text-848599">{{$t('Lang.Deal ID')}}</span>
          <span class="text-dark">{{list.deal_id}}</span>
        </div>
        <div class="flex items-center justify-between lg:justify-start mb-4">
          <span class="inline-block w-48 ml-2 text-848599">{{$t('Lang.Creation time')}}</span>
          <span class="text-dark">{{list.height_time}}</span>
        </div>
        <div class="flex items-center justify-between lg:justify-start mb-4">
          <span class="inline-block w-48 ml-2 text-848599">{{$t('Lang.Block')}}</span>
          <n-link class="text-main lg:text-lg " :to="`/${lang}/chain/tipset/${list.height}`">{{list.height}}</n-link>

        </div>
        <div class="flex items-center justify-between lg:justify-start mb-4">
          <span class="inline-block w-48 ml-2 text-848599">{{$t('Lang.Message')}}</span>
          <n-link class="text-main lg:text-lg " :to="`/${lang}/chain/msg/${list.msg_id}-${list.height}`">{{list.msg_id}}</n-link>
        </div>
        
        <div class="flex items-center justify-between lg:justify-start mb-4">
          <span class="inline-block w-48 ml-2 text-848599">{{$t('Lang.Average storage height price')}}</span>
          <span class="text-dark">{{list.storage_price_per_epoch}} attoF</span>
        </div>
        <div class="flex items-center justify-between lg:justify-start mb-4">
          <span class="inline-block w-48 ml-2 text-848599">{{$t('Lang.Piece Cid')}}</span>
          <span class="text-dark">{{list.piece_cid}}</span>
        </div>
        <div class="flex items-center justify-between lg:justify-start">
          <span class="inline-block w-48 ml-2 text-848599">{{$t('Lang.Verification status')}}</span>
          <span class="text-dark">{{list.is_verified | is_verified}}</span>
        </div>
      </div>
      <div class="py-3 px-3 lg:px-6 leading-8 border-b border-solid border-E8E7EB lg:hidden block">
        <div class="flex items-center justify-between">
          <span>{{$t('Lang.Deal ID')}}</span>
          <span>{{list.deal_id}}</span>
        </div>
        <div class="flex items-center justify-between">
          <span>{{$t('Lang.Creation time')}}</span>
          <span>{{list.height_time}}</span>
        </div>
        <div class="flex items-center justify-between">
          <span>{{$t('Lang.Block')}}</span>
          <n-link class="text-main lg:text-lg " :to="`/${lang}/chain/tipset/${list.height}`">{{list.height}}</n-link>
        </div>
        <div class="flex items-center justify-between">
          <span>{{$t('Lang.Message')}}</span>
          <div class="w-1/2 text-right truncate">
            <n-link class="text-main lg:text-lg " :to="`/${lang}/chain/msg/${list.msg_id}`">{{list.msg_id}}</n-link>
          </div>
        </div>
        
        <div class="flex items-center justify-between">
          <span>{{$t('Lang.Average storage height price')}}</span>
          <span>{{list.storage_price_per_epoch}} attoF</span>
        </div>
        <div class="flex items-center justify-between">
          <span class="flex-1">{{$t('Lang.Piece Cid')}}</span>
          <div class="w-1/2 text-right truncate">
            <span>{{list.piece_cid}}</span>
          </div>
        </div>
        <div class="flex items-center justify-between">
          <span>{{$t('Lang.Verification status')}}</span>
          <span>{{list.is_verified | is_verified}}</span>
        </div>
      </div>
      <div class="flex items-center h-16 lg:h-20 px-3 lg:px-6">
        <span class="lg:text-lg font-medium text-dark">{{$t('Lang.Storage Detail')}}</span>
      </div>
      <div class='lg:flex items-center justify-between pt-3 pb-8 px-3 lg:px-6 text-center'>
        <div class='flex-1'>
          <p>{{$t('Lang.Client')}}</p>
          <img src="../../../../assets/imgs/customer.png" alt="" class='m-auto my-2' style='width:40px'>
          <div class="flex-1 flex items-center justify-center mb-2">
            <el-popover
              placement="bottom"
              trigger="hover"
               width="400"
              :content="list.client">
              <n-link class="text-main lg:text-lg  ml-1 lg:ml-3" slot="reference" :to="`/${lang}/chain/addr/${list.client}`">{{list.client | getSubStr}}</n-link>
            </el-popover>
          </div>
          <p>{{$t('Lang.Collateral')}}：{{list.client_collateral}} F</p>
        </div>
        <div class='lg:w-1/2 py-6 lg:my-0 my-6' style='background:rgba(51, 63, 198, 0.06)'>
          <div class='flex items-center justify-center'>
            <img src="../../../../assets/imgs/cloud.png" alt="" style='width:24px' class='mr-2'>
            <p>{{list.piece_size | piece_size}}</p>
          </div>
          <img src="../../../../assets/imgs/cloudbg.png" alt="" class='lg:block hidden m-auto my-2' style='width:40%'>
          <img src="../../../../assets/imgs/cloudbgsmall.png" alt="" class='lg:hidden block m-auto my-2 h-10'>
          <p class='mb-2' style='color:rgba(132, 133, 153, 1)'>{{list.start_epoch}} 至 {{list.end_epoch}}</p>
          <p>{{$t('Lang.Storage Fee')}}：N/A</p>
        </div>
        <div class='flex-1'>
          <p>{{$t('Lang.Provider')}}</p>
          <img src="../../../../assets/imgs/miner.png" alt="" class='m-auto my-2' style='width:40px'>
          <div class="flex-1 flex items-center justify-center mb-2">
            <n-link class="text-main lg:text-lg  ml-1 lg:ml-3" :to="`/${lang}/chain/addr/${list.provider}`">{{list.provider}}</n-link>
            <div v-if="tagShowFlag">
            <template v-if="globalMinerTag[list.provider]">
              <div class="border border-solid border-E8E7EB rounded ml-3 flex items-center">
                <span class="mx-3 text-75737F">{{globalMinerTag[list.provider].en_tag }}</span>
                <img v-show="globalMinerTag[list.provider].signed" src="@/assets/imgs/isSigned.png" alt="" class='mr-2' style='width:12px;height:14px'>
              </div>
            </template>
            </div>
          </div>
          <p>{{$t('Lang.Collateral')}}：{{list.provider_collateral | formatTrueFil}} F</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  asyncData({ app, params }) {
    let data = {
      deal_id: params.id,
      list: [],
      minerTag: {}
    }
    return app.$axios.post('/api/explorer/get_deal_info', {
        deal_id: params.id
      })
      .then(res => {
        if (res.code != 0) return data
        data.list = res.data

        return data
      })
  },

  computed: {
    ...mapGetters({
      globalMinerTag: 'getGlobalMinerTag',
      tagShowFlag: 'getTagShowFlag'
    })
  },

  data() {
    return {
      lang: this.$store.state.locale,
    }
  },
  filters: {
    is_verified(i) {
      return i == 1 ? 'true' : 'false'
    }
  },
  mounted() {

  },
  methods:{
    back(){
      window.history.back(-1)
    }
  }

}
</script>
<style lang="scss" scoped>
</style>