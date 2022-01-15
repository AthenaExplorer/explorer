<template>
  <div>
    <div class='lg:-mt-14 lg:flex lg:justify-end mr-4 '>
      <div class='w-48'>
        <el-select v-model="value" placeholder="请选择" @change='changeValue'>
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="$t(item.label)"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
    </div>
    <div v-if="rawPowerList.length !== 0">
      <div class='lg:block hidden  px-3'>
        <table class="table-fixed w-full">
          <thead>
          <tr class="">
            <th class="w-1/12 py-4 font-medium">{{$t('Lang.Rank')}}</th>
            <th class="w-1/12 py-4 font-medium">{{$t('Lang.Node')}}</th>
            <th class="w-1/12 py-4 font-medium" v-if="tagShowFlag">{{$t('Lang.Tag')}}</th>
            <th class="w-1/12 py-4 font-medium">{{$t('Lang.QualityAdjPower')}}</th>
            <th class="w-1/12 py-4 font-medium">{{$t('Lang.Rewards in 24 hours')}}
              <el-popover trigger="hover" :content="$t('Lang.The number of FIL produced in the past 24 hours')">
                <i class="el-icon-info cursor-pointer text-gray-500 text-base" slot="reference"></i>
              </el-popover>
            </th>
            <th class="w-1/12 py-4 font-medium">{{$t('Lang.Production Efficiency in 24 hours')}}
              <el-popover trigger="hover" :content="$t('Lang.Latest 24h Mining Efficiency')">
                <i class="el-icon-info cursor-pointer text-gray-500 text-base" slot="reference"></i>
              </el-popover>
            </th>
            <th class="w-1/12 py-4 font-medium">{{$t('Lang.Power Growth in 24 hours')}}
              <el-popover trigger="hover" :content="$t('Lang.Increment of effective computing power in the past 24h')">
                <i class="el-icon-info cursor-pointer text-gray-500 text-base" slot="reference"></i>
              </el-popover>
            </th>
            <th class="w-1/12 py-4 font-medium">{{$t('Lang.Sector size')}}</th>
            <th class="w-1/12 py-4 font-medium mr-4">{{$t('Lang.Remarks')}}</th>
            <th class="w-1/12 py-4 font-medium mr-4">{{$t('Lang.Operating')}}</th>

          </tr>
          </thead>
          <tbody>
          <tr v-for="(item, index) in rawPowerList" class="border-b border-solid border-E8E7EB" :key="index + '_index'">
            <td class="w-1/12 py-3 text-center truncate  h-16">
              <template v-if="(index + 1 + (page_size * (page_index - 1))) < 4">
                <img :src="imgs[index]" class="h-6 inline-block" alt="">
              </template>
              <template v-else>
                <span>{{index + (page_size * (page_index - 1)) + 1}}</span>
              </template>
            </td>
            <td class="w-1/12 py-3 text-center">
              <n-link :to="`/${lang}/chain/addr/${item.miner_no}`" class='text-main cursor-pointer hover:opacity-75'>{{item.miner_no}}</n-link>
            </td>
            <td class="w-1/12 py-3 text-center" v-if="tagShowFlag">
              <div class="flex items-center justify-center truncate">
                <template v-if="globalMinerTag[item.miner_no]">
                  <span class="truncate">{{ globalMinerTag[item.miner_no].en_tag }}</span>
                  <el-popover trigger="hover" :content="$t('Lang.The user has completed signature verification for the owner')">
                    <img v-show="globalMinerTag[item.miner_no].signed" src="@/assets/imgs/isSigned.png"  alt="" class='ml-2 mr-2'  style='width:12px; height:12px' slot="reference">
                  </el-popover>
                </template>
                <span v-else>-</span>
              </div>
            </td>
            <td class="w-1/12 py-3 text-center">
              <span>{{item.power | formatPower()[0]}} {{item.power | formatPower()[1]}}/{{(item.power/globalOverview.power) | formatPercentage}}</span>
            </td>
            <td class="w-1/12 py-3 text-center">{{item.block_reward | formatTrueFil(true)}}</td>
            <td class="w-1/12 py-3 text-center">{{item.avg_reward | formatTrueFil(true)}}/TiB</td>
            <td class="w-1/12 py-3 text-center">
                <span :class="{'text-red-500' : item.increase_power_offset < 0}">{{item.increase_power_offset | formatPower()[0]}} {{item.increase_power_offset | formatPower()[1]}}</span>
            </td>
            <td class="w-1/12 py-3 text-center">
                <span>{{item.sector_size | formatPower()[0]}} {{item.sector_size | formatPower()[1]}}</span>
            </td>
            <td class="w-1/12 py-3 text-center truncate"  @click="changeRemarks(item)">
              <el-input size='mini' @change='ok(item)' @blur='item.flag = false' v-show="item.flag" v-model="remarks" clearable> </el-input>
              <el-popover v-show="!item.flag && item.remarks" trigger="hover" :content="item.remarks">
                <p class='cursor-pointer' slot="reference">{{item.remarks | getProSubStr}} <i class="el-icon-edit" style='color:#333fc6'></i></p>
              </el-popover>
              <p v-show="!item.flag && !item.remarks" class='cursor-pointer' slot="reference">{{item.remarks | getProSubStr}} <i class="el-icon-edit" style='color:#333fc6'></i></p>
              
            </td>
            <td class='mr-4 text-center'>
                <p class='text-main cursor-pointer opacity-75 hover:opacity-100' @click='del(item)'>{{$t('Lang.Delete')}}</p>
            </td>
          </tr>
          </tbody>
        </table>
          
      </div>
      <div class='lg:hidden block bg-white rounded-md mt-2 px-2'>
        <table class="table-fixed w-full">
        <thead>
        <tr class="">
          <th class="w-1/12 py-4 font-medium">{{$t('Lang.Rank')}}</th>
          <th class="w-2/12 py-4 font-medium">{{$t('Lang.Node')}}</th>
          <th class="w-2/12 py-4 font-medium" v-if="tagShowFlag">{{$t('Lang.Tag')}}</th>
          <th class="w-2/12 py-4 font-medium">{{$t('Lang.Effective computing power')}}</th>
          <th class="w-2/12 py-4 font-medium">{{$t('Lang.Sector size')}}</th>
          <th class="w-1/12 py-4 font-medium mr-4">{{$t('Lang.Operating')}}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, index) in rawPowerList" class="border-t border-solid border-E8E7EB" :key="index + '_index'">
          <td class="w-1/12 py-3 text-center truncate">
          <template v-if="(index + 1 + (page_size * (page_index - 1))) < 4">
            <img :src="imgs[index]" class="h-6 inline-block" alt="">
          </template>
          <template v-else>
            <span>{{index + (page_size * (page_index - 1)) + 1}}</span>
          </template>
          </td>
          <td class="w-2/12 py-3 text-center">
          <n-link :to="`/${lang}/chain/addr/${item.miner_no}`" class='text-main cursor-pointer hover:opacity-75'>{{item.miner_no}}</n-link>
          </td>
          <td class="w-2/12 py-3 text-center" v-if="tagShowFlag">
            <div class="flex items-center justify-center truncate">
              <template v-if="globalMinerTag[item.miner_no]">
              <span class="truncate">{{ globalMinerTag[item.miner_no].en_tag }}</span>
              <img v-show="globalMinerTag[item.miner_no].signed" src="@/assets/imgs/isSigned.png"  alt="" class='ml-2'  style='width:12px; height:12px'>
              </template>
              <span v-else>-</span>
            </div>
          </td>
          <td class="w-2/12 py-3 text-center">
            <span>{{item.raw_power | formatPower()[0]}} {{item.raw_power | formatPower()[1]}}</span>
          </td>
          <td class="w-2/12 py-3 text-center">
          <span>{{item.sector_size | formatPower()[0]}} {{item.sector_size | formatPower()[1]}}</span>
          </td>
          <td class='mr-4 text-center'>
            <p class='text-main cursor-pointer' @click='del(item)'>{{$t('Lang.Delete')}}</p>
          </td>
        </tr>
        </tbody>
      </table>
      </div>
      <div class="my-3 lg:my-6">
        <Pagination :pageSize="page_size" :pageIndex="page_index" :totalCount="total_count" @indexChange="searchRecordHandler" @sizeChange='handleCurrentChange'></Pagination>
      </div>
    </div>
    <div v-if="rawPowerList.length == 0" class='flex items-center justify-center' style='height:40vh'>
      <div class='text-center'>
        <img src="@/assets/imgs/noMsg.png" alt="" style='width:150px'>
        <p style='color:#5F6578' class='mb-10'>{{$t('Lang.No collection')}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      page_size: 20,
      page_index: 1,
      total_count: 0,
      objs: [],
      remarks:'',
      imgs: [
        require("@/assets/imgs/Rank1.png"),
        require("@/assets/imgs/Rank2.png"),
        require("@/assets/imgs/Rank3.png"),
      ],
      lang: this.$store.state.locale,
      options: [{
          value: '',
          label: 'Lang.All sectors'
        }, {
          value: '0',
          label: 'Lang.32G sector'
        }, {
          value: '1',
          label: 'Lang.64G sector'
        }],
      value: ''
    };
  },
  asyncData({ app }) {
    let data = {
      user_info: {},
      rawPowerList: {},
      page_size: 20,
      page_index: 1,
      total_count: 0,
    };
    return app.$axios
      .post("/api/explorer/get_collectible_miner_list", {
        filter_type: "raw_power",
        page_index: 1,
        page_size: 20,
      })
      .then((res) => {
        data.rawPowerList = res.data.objects;
        data.total_count = res.data.total_count;
        return data;
      });
  },
  computed: {
    ...mapGetters({
      globalMinerTag: "getGlobalMinerTag",
      globalOverview: "getGlobalOverview",
      tagShowFlag: 'getTagShowFlag'
    }),
  },
  mounted(){
    this.$axios.post('/api/explorer/get_user_info').then(res=>{
      this.user_info = res.data
    })
  },
  methods: {
    searchRecordHandler(pageIndex) {
      this.$axios.post("/api/explorer/get_collectible_miner_list", {
          sector_type:this.value,
          filter_type: "raw_power",
          page_index: pageIndex,
          page_size: this.page_size,
        })
        .then((res) => {
          if (res.code != 0) return;
          this.rawPowerList = res.data.objects;
          this.total_count = res.data.total_count;
          this.page_index = pageIndex;
        });
    },
    handleCurrentChange(size){
      this.page_size = size
      this.searchRecordHandler(1)
    },
    changeValue(){
      this.$axios.post("/api/explorer/get_collectible_miner_list", {
          sector_type:this.value,
          filter_type: "raw_power",
          page_index: 1,
          page_size: this.page_size,
        })
        .then((res) => {
          if (res.code != 0) return;
          this.rawPowerList = res.data.objects;
          this.total_count = res.data.total_count;
          this.page_index = 1;
        });
    },
    del(item){
      this.$axios.post('/api/explorer/del_collectible_miner',{
        user_id:this.user_info.user_info,
        miner_no:item.miner_no
      }).then(res=>{
        if(res.code != 0) return
        if((this.total_count-1)%20 == 0 && this.total_count!==21){
          this.searchRecordHandler(this.page_index-1)
        }else{
          this.searchRecordHandler(this.page_index)
        }
        if(this.lang == 'zh'){
          this.$notification.success({
            title: '成功',
            message: '删除成功'
          })
        }else if(this.lang == 'en'){
          this.$notification.success({
            title: 'Success',
            message: 'Successfully deleted'
          })
        }else if(this.lang == 'ja'){
          this.$notification.success({
            title: '成功',
            message: '削除に成功しました'
          })
        }else{
          this.$notification.success({
            title: '성공',
            message: '성공적으로 삭제'
          })
        }
      })
    },
    changeRemarks(item){
      this.rawPowerList.map(i=>{
        i.flag = false
      })
      item.flag = true
      this.remarks = item.remarks
    },
    ok(item){
      this.$axios.post('/api/explorer/update_collectible',{
        collectible_id:item.miner_no,
        type:'miner',
        remarks:this.remarks
      }).then(res=>{
        if(res.code !== 0){
          return
        }
        item.flag = false
        this.searchRecordHandler(this.pageIndex)
      })
    }
  },
};
</script>

<style lang="scss" scoped>
</style>