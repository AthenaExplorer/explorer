<template>
  <div class="lg:pt-3">
    <div class="hidden lg:flex items-center justify-between border-t border-r border-l border-solid border-E8E7EB">
      <div class="flex items-center h-16 lg:h-20 px-3 lg:px-6">
        <i class="inline-block bg-3A70FF w-1 h-4 lg:h-5 rounded mr-2"></i>
        <span class="lg:text-xl font-bold">{{$t('Lang.Details ranking')}}</span>
      </div>
    </div>
    <div class="pt-0 lg:flex justify-center items-start">
      <div class="border border-solid border-E8E7EB lg:w-1/4 hidden">
        <div class="flex justify-center py-3 mt-px">
          <el-switch v-model="rankType" active-color="#FFF2AF" inactive-color="#333FC6" active-text="算力小于 10 PiB" inactive-text="算力大于 10 PiB">
          </el-switch>
        </div>
        <div class="bg-DEE1FF flex justify-between items-center px-8 h-30">
          <img class="w-32" src="~/assets/img/icon-rank-title.png" alt="">
          <img src="~/assets/img/icon-rank-crown.png" class="w-48 self-end" style="margin-bottom: -3px;" alt="">
        </div>
        <table class="table-fixed w-full">
          <thead>
            <tr>
              <th class="w-1/4 py-4 font-medium">排名</th>
              <th class="w-1/3 py-4 font-medium">节点</th>
              <th class="w-1/3 py-4 font-medium">标签</th>
              <th class="w-1/3 py-4 font-medium">节点星级</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in minerRank.synthesize" class="border-t border-solid border-E8E7EB" :key="index + '_start_index'">
              <td class="w-1/4 py-2 text-center truncate">
                <template v-if="index < 3">
                  <img :src="imgs[index]" class="h-6 inline-block" alt="">
                </template>
                <template v-else>
                  {{index + 1}}
                </template>
              </td>
              <td class="w-1/3 py-3 text-center">
                <n-link :to="`/chain/addr/${item.miner_no}`">{{item.miner_no}}</n-link>
              </td>
              <td class="w-1/3 py-3 text-center">
                <div class="flex items-center justify-center truncate">
                  <template v-if="globalMinerTag[item.miner_no]">
                    <span class="truncate">{{ globalMinerTag[item.miner_no].en_tag }}</span>
                    <img v-show="globalMinerTag[item.miner_no].signed" src="@/assets/imgs/isSigned.png"  alt="" class='ml-2'  style='width:12px; height:12px'>
                  </template>
                  <span v-else>-</span>
                </div>
              </td>
              <td class="w-1/3 py-3 text-center">
                <div class="flex items-center justify-center">
                  <Star className="h-4" :score="Number.parseFloat(item.synthesize_i) | formatNumberFixed(1)" type="full"></Star>
                  <img class="w-2 mx-1" :src="all_net_exponent.synthesize_i < item.synthesize_i ? imgRise : imgLower" alt="">
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="flex-1 lg:flex flex-wrap">
        <div class="lg:w-1/3 mt-3 lg:mt-0" :class="{'lg:mb-3': i < 2, 'lg:pl-3' : i % 3 > 0 }" v-for="(item, i) in minerRankData" :key="item.title">
          <div class="flex items-center justify-center py-4 border-t border-l border-r border-solid border-E8E7EB">
            <span class="text-lg font-medium">{{ $t(item.title) }}</span>
          </div>
          <div class="border border-solid border-E8E7EB">
            <table class="table-fixed w-full">
              <thead>
                <tr>
                  <th class="w-1/4 py-4 font-medium">{{$t('Lang.Rank')}}</th>
                  <th class="w-1/3 py-4 font-medium" v-for="(head, h_i) in item.headerProp" :key="head.title + i + 'h'+ h_i">{{$t(head.title)}}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(c_item, j) in minerRank[item.prop]" class="border-t border-solid border-E8E7EB" :key="j + '_start_index'" v-if="j < 10">
                  <td class="w-1/4 py-3 text-center">
                    <template v-if="j < 3">
                      <img :src="imgs[j]" class="h-6 inline-block" alt="">
                    </template>
                    <template v-else>
                      <span>{{j + 1}}</span>
                    </template>
                  </td>
                  <td class="w-1/3 py-3 text-center truncate" v-for="(cont, c_i) in item.headerProp" :key="cont.title + i +'c' + c_i">
                    <template v-if="cont.href">
                      <router-link :to="`/${lang}/chain/addr/${c_item[cont.key]}`" class='text-main cursor-pointer hover:opacity-75'>{{c_item[cont.key]}}</router-link>
                    </template>
                    <template v-else-if="cont.format">
                      <template v-if="i == 5">
                        <span>{{ c_item[cont.key] | formatPower()[0] }} {{ c_item[cont.key] | formatPower()[1]}}</span>
                      </template>
                      <template v-else>
                        {{ c_item[cont.key] | transformMinerKey(cont.format, cont.append, cont.prop) }}
                      </template>
                    </template>
                    <template v-else-if="cont.tag">
                      <div class="flex items-center justify-center truncate">
                        <template v-if="globalMinerTag[c_item[cont.key]]">
                          <span class="truncate">{{ globalMinerTag[c_item[cont.key]].en_tag }}</span>
                          <img v-show="globalMinerTag[c_item[cont.key]].signed" src="@/assets/imgs/isSigned.png" alt="" class='ml-2'  style='width:12px; height:12px'>
                        </template>
                        <span v-else>-</span>
                      </div>
                    </template>
                    <template v-else>
                      {{c_item[cont.key] | formatOverview}}
                    </template>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Star from '@/components/common/Stars.vue'
import utils from '@/static/utils.js'

export default {
  name: 'MinerStarRank',

  mixins: [],

  props: [],

  components: {
    Star
  },

  watch: {
    rankType(n, o) {
      this.getMinerRanking(n)
    }
  },

  computed: {
    ...mapGetters({
      globalMinerTag: 'getGlobalMinerTag'
    }),
    minerRankData: function() {
      return [{
          title: 'Lang.Yesterday effective computing power ranking',
          prop: 'total_power',
          headerProp: [
            { title: 'Lang.Node', key: 'miner_no', href: true },
            { title: 'Lang.Tag', key: 'miner_no', tag: true },
            { title: 'Lang.Effective computing power', key: 'total_power_v' }
          ]
        },
        {
          title: 'Lang.Yesterday output efficiency ranking',
          prop: 'avg_reward',
          headerProp: [
            { title: 'Lang.Node', key: 'miner_no', href: true },
            { title: 'Lang.Tag', key: 'miner_no', tag: true },
            { title: 'Lang.Production Efficiency', key: 'avg_reward_v', format: 'formatFil', append: ' F/TiB' }
          ]
        },
        {
          title: 'Lang.Yesterday computing power growth rate ranking',
          prop: 'day_inc_rate',
          headerProp: [
            { title: 'Lang.Node', key: 'miner_no', href: true },
            { title: 'Lang.Tag', key: 'miner_no', tag: true },
            { title: 'Lang.growth rate', key: 'day_inc_rate_v', format: 'formatPercentage' }
          ]
        },
        {
          title: 'Lang.7-day hashrate increment ranking',
          prop: 'power_increment_7day',
          headerProp: [
            { title: 'Lang.Node', key: 'miner_no', href: true },
            { title: 'Lang.Tag', key: 'miner_no', tag: true },
            { title: 'Lang.Power Growth', key: 'power_increment_7day_v', format: 'formatPower' }
          ]
        },
        {
          title: 'Lang.7th Hash Power Production Gas Ranking',
          prop: 'create_gas_week',
          headerProp: [
            { title: 'Lang.Node', key: 'miner_no', href: true },
            { title: 'Lang.Tag', key: 'miner_no', tag: true },
            { title: 'Lang.Production gas', key: 'create_gas_week_v', format: 'formatFil' }
          ]
        },
        {
          title: 'Lang.7-day computing power maintenance Gas ranking',
          prop: 'keep_gas_week',
          headerProp: [
            { title: 'Lang.Node', key: 'miner_no', href: true },
            { title: 'Lang.Tag', key: 'miner_no', tag: true },
            { title: 'Lang.Maintenance gas', key: 'keep_gas_week_v' }
          ]
        }
      ]
    }
  },

  asyncData({ app }) {
    let data = {
      minerRank: { synthesize: [] },
      all_net_exponent: {}
    }
    return app.$axios.post('/api/explorer/get_miner_ranking', {})
      .then(res => {
        if (res.code != 0) return data
        data.minerRank = res.data
        return app.$axios.post('/api/explorer/get_miner_index', {
          method: 'statistics'
        })
      })
      .then(res => {
        if (!res || res.code != 0) return data
        res.data.map(item => {
          if (item.miner_no == '基准值') {
            data.all_net_exponent = item
          }
        })
        return data
      })
  },

  data: function() {
    return {
      minerRank: { synthesize: [] },
      all_net_exponent: {},
      rankType: false,
      imgs: [
        require('~/assets/img/icon-num-1.png'),
        require('~/assets/img/icon-num-2.png'),
        require('~/assets/img/icon-num-3.png')
      ],
      imgRise: require('~/assets/img/icon-rise.png'),
      imgLower: require('~/assets/img/icon-lower.png'),
      lang: this.$store.state.locale
    }
  },

  methods: {
    getMinerRanking(type) {
      this.$axios.post('/api/explorer/get_miner_ranking', {
          miner_type: type ? 'small' : 'big'
        })
        .then(res => {
          if (res.code != 0) return
          this.minerRank = res.data
          return this.$axios.post('/api/explorer/get_miner_index', {
            method: 'statistics',
            miner_type: type ? 'small' : 'big'
          })
        })
        .then(res => {
          if (!res || res.code != 0) return
          res.data.map(item => {
            if (item.miner_no == '基准值') {
              this.all_net_exponent = item
            }
          })
        })
    }
  },
  filters: {
    transformMinerKey: function(content, key, append = '', prop = []) {
      return utils[key].apply(utils, [content, ...prop]) + append
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