<template>
  <div class="pb-3">
    <p class='lg:block hidden text-2xl mb-4'>{{$t('Lang.Athena Pool')}}</p>
    <div class="rounded-md bg-white ">
      <div class="w-full flex flex-wrap lg:px-36 py-6">
        <div class="w-1/2 lg:w-1/3 flex items-center" v-for="(item, index) in overview" :key="item.title">
          <div class="lg:flex justify-between my-2 mybox mx-2 rounded-md w-full items-center h-42 lg:px-20 px-2">
            <img class="w-10 lg:w-12 my-4 lg:mx-0 mx-auto" :src="images[index]">
            <div>
              <div class='text-center lg:text-right'>
                <span class="text-center" v-if="item.val == '四大洲九大区域'">
                  <span class='text-2xl text-main'>4</span>
                  <span class=''>{{$t('Lang.Continent')}}</span>
                  <span class='text-2xl text-main'>9</span>
                  <span class=''>{{$t('Lang.Region')}}</span>
                </span>
                <span class="text-2xl text-center text-main" v-if="item.val !== '四大洲九大区域'">{{item.val}}</span>
                <span>{{item.unit}}</span>
              </div>
              <p class="text-848599 text-center ">{{$t(item.title)}}
                <el-popover v-if="item.popover" trigger="hover" :content="$t(item.popover)">
                  <i class="el-icon-info cursor-pointer text-gray-500 text-base" slot="reference"></i>
                </el-popover>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class='bg-white py-6 hidden lg:block'>
      <div class='lg:w-4/5  w-full m-auto relative map'>
        <img class='m-auto'  src="@/assets/imgs/map.png" alt="">
        <div v-for="i in point" :key="i.name" class='absolute mapbox' :style="{top:i.top+'%',left:i.left+'%'}">
          <div class="map mx-auto" :class="{'ml_30':lang =='en','ml_20': lang == 'zh'}">
            <div>
              <span>
                <label></label>
                <i class="flashPoint"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
   
  </div>
</template>
<script>
import utils from '@/static/utils.js'
import { mapGetters } from 'vuex'


export default {
  name: 'Athena',

  mixins: [],

  props: [],

  components: {

  },

  watch: {

  },

  computed: {
    ...mapGetters({
      globalMinerTag: 'getGlobalMinerTag',
      globalOverview: 'getGlobalOverview'
    }),
    overview() {
      let {
        location,
        active_miners_count,
        total_power_v,
        increase_power_v,
        increase_power_offset_v,
        block_count
      } = this.pool_overview
      return [{
        title: 'Lang.Location_1',
        val: location
      }, {
        title: 'Lang.Number of  Mining Pool Nodes',
        val: active_miners_count
      }, {
        title: 'Lang.Mining pool total computing power',
        val: utils.formatPower(total_power_v)[0],
        unit: utils.formatPower(total_power_v)[1]
      }, {
        title: 'Lang.24h computing power growth rate',
        val: utils.formatPower(increase_power_v)[0],
        popover: 'Lang.The cloud pool has completed the total effective computing power of the packaged sector in the past 24 hours',
        unit: utils.formatPower(increase_power_v)[1]
      }, {
        title: 'Lang.Power Growth in 24 hours',
        val: utils.formatPower(increase_power_offset_v)[0],
        popover: 'Lang.Increment of effective computing power of mining pool in the past 24h',
        unit: utils.formatPower(increase_power_offset_v)[1]
      }, {
        title: 'Lang.Number of blocks produced in 24h',
        popover: 'Lang.Number of blocks produced in the mining pool in the past 24h',
        val: utils.formatterAmount(block_count, 0)
      }]
    },
    objs: function() {
      if (this.sector == '64GiB') return this.miners_64
      return this.miners_32
    }
  },

  asyncData({ app }) {
    let data = {
      pool_overview: {},
      page_size: 10,
      miners_32: [],
      page_index_32: 1,
      total_count_32: 0,
      miners_64: [],
      page_index_64: 1,
      total_count_64: 0
    }
    return app.$axios.post('/api/activity/get_pool_overview', {})
      .then(res => {
        if (res.code != 0) return data
        data.pool_overview = res.data
        return data
        
      })
      
  },

  data: function() {
    return {
      pool_overview: {},
      page_size: 10,
      miners_32: [],
      page_index_32: 1,
      total_count_32: 0,
      miners_64: [],
      page_index_64: 1,
      total_count_64: 0,
      imgs: [
        require('@/assets/img/icon-num-1.png'),
        require('@/assets/img/icon-num-2.png'),
        require('@/assets/img/icon-num-3.png')
      ],
      sector: '64GiB',
      checkboxList: ['64GiB', '32GiB'],
      lang: this.$store.state.locale,
      images: [
        require('@/assets/img/icon-athena-local.png'),
        require('@/assets/img/icon-athena-nodes.png'),
        require('@/assets/img/icon-athena-power.png'),
        require('@/assets/img/icon-athena-power-speed.png'),
        require('@/assets/img/icon-athena-power-add.png'),
        require('@/assets/img/icon-athena-block.png')
      ],
      point:[
        {name:'Lang.North America',top:'28',left:'20'},
        {name:'Lang.Europe',top:'18',left:'50'},
        {name:'Lang.Qinghai',top:'37',left:'66'},
        {name:'Lang.Sichuan',top:'37',left:'76'},
        {name:'Lang.Gansu',top:'28',left:'75'},
        {name:'Lang.Inner Mongolia',top:'20',left:'62'},
        {name:'Lang.Ningxia',top:'25',left:'70'},
        {name:'Lang.Australia',top:'72',left:'85'},
        {name:'Lang.Taiwan',top:'38',left:'82'},
      ],
    }
  },

  methods: {
    searchSmallRecordHandler(pageIndex) {
      this.$axios.post('/api/activity/get_pool_miners', {
          sector_type: 0,
          page_index: pageIndex,
          page_size: this.page_size
        })
        .then(res => {
          if (res.code != 0) return
          this.miners_32 = res.data.objs
          this.total_count_32 = res.data.total_count
          this.page_index_32 = pageIndex
        })
    },
    searchBigRecordHandler(pageIndex) {
      this.$axios.post('/api/activity/get_pool_miners', {
          sector_type: 1,
          page_index: pageIndex,
          page_size: this.page_size
        })
        .then(res => {
          if (res.code != 0) return
          this.miners_64 = res.data.objs
          this.total_count_64 = res.data.total_count
          this.page_index_64 = pageIndex
        })
    },
    selectSectorhandler(item) {
      if (this.sector == item) return
      switch (item) {
        case '64GiB':
          this.searchSmallRecordHandler(1)
          break;
        case '32GiB':
          this.searchBigRecordHandler(1)
          break;
      }
      this.sector = item
    }
  },

  mounted: function() {

  },

  beforeDestroy: function() {

  }
}
</script>
<style>
.mybox{
    box-shadow: 0px 4px 14px 0px rgba(54, 51, 198, 0.06);
}
.flashPoint{
  display: inline-block;
  width: 16px;
  height: 16px;
  background: red;
  border-radius: 50%;
  margin: 0 auto ;
  animation: run 2.5s ease-in-out infinite;
}
@keyframes run{
    0% {
        transform: scale(1);
    }
    100%{
        opacity: 0;
        transform:scale(1.5)

    }
}
.map div{
  position: absolute;
  height: 17px;
  font-size: 14px;
  color: #FFFFFF;
  line-height: 17px;
  display: flex;
  align-items: center;
}
.map div span{
  display: inline-block;
  width: 16px;
  height: 16px;
  background: #3633c642;
  border-radius: 100%;
  -webkit-border-radius: 100%;
  -moz-border-radius: 100%;
  position: relative;
  margin-right: 2px;
}
.map div span label{
  display: inline-block;
  width: 6px;
  height: 6px;
  background: #3633c6d0;
  border-radius: 100%;
  -webkit-border-radius: 100%;
  -moz-border-radius: 100%;
  position: absolute;
  left: 5px;
  top: 5px;
}
.map div span i{
  display: inline-block;
  width: 20px;
  height: 20px;
  background: #3633c667;
  border-radius: 100%;
  -webkit-border-radius: 100%;
  -moz-border-radius: 100%;
  position: absolute;
  left: -2px;
  top: -2px;
  opacity: 0.5;
}
</style>