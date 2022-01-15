<template>
  <div v-loading="loadingFlag" class="flex flex-col lg:px-12 pb-3 lg:pb-8 rounded-b-lg mb-3 lg:mt-6 mt-0">
    <div class="data-handler mt-3 block lg:flex items-center">
      <div class="w-full lg:w-108 lg:h-148  rounded-xl border-2 lg:border-4 rounded-xl border-main border-solid lg:flex">
        <div class="flex-1 mx-3  lg:mr-6">
          <div class="mt-5 mb-2 text-040A25 text-xl">{{$t('Lang.Excavation time')}}</div>
          <div class="flex items-center justify-between relative w-full">
            <el-date-picker v-model="form.date" type="date" placeholder="选择日期"  @change='okFlag = false'>
            </el-date-picker>
            <div class="flex items-center justify-center w-6 h-full absolute top-0 right-4">
              <img class="w-6" src="~/assets/imgs/calculator/date-icon.png" />
            </div>
          </div>
          <div class="mt-5 mb-2 text-040A25">
            <span class="text-040A25 text-xl">{{$t('Lang.Packaging speed')}}</span>
            <el-popover placement="top-start" trigger="hover" :content="$t('Lang.Filecoin mining needs to encapsulate sectors to obtain effective computing power and sector encapsulation speed will directly affect output')">
              <i class="el-icon-info text-gray-500" slot="reference"></i>
            </el-popover>
          </div>
          <div>
            <el-input v-model="form.speed" :placeholder="$t('Lang.Packaging speed')"  @change='okFlag = false'>
              <span slot="suffix" class="text-xl font-semibold text-8F94A8">TiB/{{$t('Lang.days')}}</span>
            </el-input>
          </div>
          <div class="mt-5 mb-2 text-040A25">
            <span class="text-040A25 text-xl">{{$t('Lang.Storage capacity')}}</span>
            <el-popover placement="top-start" trigger="hover" :content="$t('Lang.The amount of storage space that can be used to package computing power')">
              <i class="el-icon-info text-gray-500" slot="reference"></i>
            </el-popover>
          </div>
          <div>
            <el-input v-model="form.power" :placeholder="$t('Lang.Storage capacity')"  @change='okFlag = false'>
              <span slot="suffix" class="text-xl font-semibold text-8F94A8">TiB</span>
            </el-input>
          </div>
          <div class="mt-5 mb-2">
            <span class="text-040A25 text-xl">{{$t('Lang.Input costs')}}</span>
            <el-popover placement="top-start" trigger="hover" :content="$t('Lang.The cost of hardware operation and maintenance of the mining machine')">
              <i class="el-icon-info text-gray-500" slot="reference"></i>
            </el-popover>
          </div>
          <div class="mb-5">
            <el-input v-model="form.cost" :placeholder="$t('Lang.Input costs')"  @change='okFlag = false'>
              <span slot="suffix" class="text-xl font-semibold text-8F94A8">CNY</span>
            </el-input>
          </div>
          <el-button type="primary" style="height: 3.5rem;" @click="calculatorHandler">{{$t('Lang.Start calculating')}}</el-button>
          <div class="text-8F94A8 text-center text-E9AB1C leading-10">*{{$t('Lang.Intelligent analysis based on economic model')}}</div>
        </div>
        <div class="h-full w-8 hidden lg:flex items-center justify-center">
          <div class="w-5 h-136 bg-222B90 rounded-full py-2" style="padding-left: 0.625rem;">
            <div class="h-128 w-10 bg-F4F5FF flex items-center justify-start">
              <div class="h-full w-px bg-222B90 line-shadow"></div>
            </div>
          </div>
        </div>
        <template v-if="calculatorType > 0">
          <div class="w-full h-8 px-1 flex lg:hidden items-center justify-center">
            <div class="w-full h-5 bg-222B90 rounded-full px-2" style="padding-top: 0.625rem;">
              <div class="w-full h-8 bg-F4F5FF">
                <div class="w-full h-px bg-222B90 line-shadow"></div>
              </div>
            </div>
          </div>
        </template>
      </div>
      <div class="w-full flex-1 h-128 hidden lg:flex"  style='background:#F9F9FD'>
        <div class="py-5 pr-5 flex-1 flex flex-col pl-10">
          <template v-if="calculatorType == 2">
            <div class="flex-1 flex items-center">
              <div class="h-full flex-1 flex flex-col items-center justify-center p-3 rounded-md" style='background:#EEEEF8' :class="{'ml-3' : index > 0}" v-for="(cost, index) in bigCost" :key="index">
                <div class="text-main">
                  <span class="text-5xl font-normal">{{ cost.value }}</span>
                  <span>{{ $t(cost.desc) }}</span>
                </div>
                <div class=" text-lg opacity-75">{{ $t(cost.title) }}
                  <template v-if="cost.tips">
                    <el-popover placement="top-start" trigger="hover" :content="$t(cost.tips)">
                      <i class="el-icon-info text-gray-500 ml-1" slot="reference"></i>
                    </el-popover>
                  </template>
                </div>
              </div>
            </div>
            <div class="mt-3 flex-1 flex items-center">
              <div class="h-full flex flex-col justify-center flex-1 bg-white rounded-md relative" style='background:#FFE6C6' :class="{'ml-3' : index > 0}" v-for="(out, index) in bigOut" :key="index + 100">
                <div class="text-center text-E9AB1C">
                  <span class="text-2xl font-medium">{{ out.reward }}</span>
                  <span>{{ out.desc }}</span>
                </div>
                <div class="w-full flex items-center justify-center">
                  <div class="w-full text-lg flex items-end justify-center">
                    <span class="text-E9AB1C font-medium">{{ out.day }}</span>
                    <span class="text-E9AB1C font-medium mr-1">{{$t('Lang.days')}}</span>
                    <span class="text-dark">{{ $t(out.key_str) }}</span>
                    <template v-if="out.tips">
                      <el-popover placement="top-start" trigger="hover" :content="$t(out.tips)">
                        <i class="el-icon-info text-gray-500 ml-1" slot="reference"></i>
                      </el-popover>
                    </template>
                  </div>
                </div>
                
                <template v-if="out.key == 'win_day' && out.index == 0">
                  <span class="top-1 right-2 absolute text-8F94A8 opacity-80 pr-2 pt-2">*{{$t('Lang.Static calculation')}}</span>
                </template>
                <template v-if="out.key == 'win_day' && out.index == 1">
                  <span class="top-1 right-2 absolute text-8F94A8 opacity-80 pr-2 pt-2">*{{$t('Lang.Intelligent calculation')}}</span>
                </template>
              </div>
            </div>
            <div class="mt-3 flex-1 flex items-center">
              <div class="h-full flex-1 bg-white flex flex-col items-center justify-center p-3 rounded-md" style='background:#FFE6C6' :class="{'ml-3' : index > 0}" v-for="(_in, index) in bigIn" :key="index + 1000">
                <div class="text-dark text-lg">{{ $t(_in.title) }}
                  <template v-if="_in.tips">
                    <el-popover placement="top-start" trigger="hover" :content="$t(_in.tips)">
                      <i class="el-icon-info text-gray-500 ml-1" slot="reference"></i>
                    </el-popover>
                  </template>
                </div>
                <template v-if="!_in.value_64">
                  <div class="text-E9AB1C pb-2">
                    <span class="text-2xl font-medium">{{ _in.value }}</span>
                    <span>{{ _in.desc }}</span>
                  </div>
                </template>
                <template v-else>
                  <div class="relative w-full text-center pb-2">
                    <div class="text-E9AB1C">
                      <span class="text-2xl font-medium">{{ _in.value }}</span>
                      <span>{{ _in.desc }}</span>
                      <span>(32G)</span>
                    </div>
                    <div class="text-E9AB1C absolute leading-4 w-full text-center top-10 left-0">
                      <span class="text-2xl font-medium">{{ _in.value_64 }}</span>
                      <span>{{ _in.desc }}</span>
                      <span>(64G)</span>
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </template>
          <template v-else-if="calculatorType == 0">
            <div class="w-full h-full flex flex-col items-center justify-center">
              <img class="h-32" src="~assets/imgs/calculator/icon-init.png">
              <span class="text-dark mt-4">{{$t('Lang.Enter the data and start calculating!')}}</span>
            </div>
          </template>
          <template v-else-if="calculatorType == 1">
            <div class="w-full h-full flex flex-col items-center justify-center">
              <img class="h-32" src="~assets/imgs/calculator/icon-init.png">
              <span class="text-dark mt-4">{{$t('Lang.the calculation is wrong')}}</span>
            </div>
          </template>
        </div>
      </div>
      <template v-if="calculatorType == 2">
        <div  class="border-6 border-transparent border-solid block lg:hidden">
          <div class="pb-3">
            <div class="flex-1 flex items-center">
              <div class="h-full flex-1 flex flex-col p-3 rounded-md" style='background:#F9F9FD'  :class="{'ml-3' : index > 0}" v-for="(cost, index) in bigCost" :key="index">
                <div class="text-main">
                  <span class="text-2xl font-medium">{{ cost.value }}</span>
                  <span>{{ $t(cost.desc) }}</span>
                </div>
                <div class="">{{ $t(cost.title) }}
                  <template v-if="cost.tips">
                    <el-popover placement="top-start" trigger="hover" :content="$t(cost.tips)">
                      <i class="el-icon-info text-gray-500 ml-1" slot="reference"></i>
                    </el-popover>
                  </template>
                </div>
                
              </div>
            </div>
            <div class="mt-3 h-full flex-1 bg-white flex flex-col items-center justify-center p-3 rounded-md" style='background:#FFE6C6'  v-for="(out, index) in bigOut" :key="index + 100">
              <div class="w-full text-E9AB1C">
                <span class="text-2xl font-medium">{{ out.reward }}</span>
                <span>{{ out.desc }}</span>
              </div>
              <div class="w-full flex items-center justify-between">
                <div class="flex items-end">
                  <span class="text-E9AB1C font-medium">{{ out.day }}</span>
                  <span class="text-E9AB1C font-medium">{{$t('Lang.days')}}</span>
                  <span class="text-dark">{{ $t(out.key_str) }}</span>
                  <template v-if="out.tips">
                    <el-popover placement="top-start" trigger="hover" :content="$t(out.tips)">
                      <i class="el-icon-info text-gray-500 ml-1" slot="reference"></i>
                    </el-popover>
                  </template>
                </div>
                <template v-if="out.key == 'win_day' && out.index == 0">
                  <span class="text-8F94A8 opacity-70">*{{$t('Lang.Static calculation')}}</span>
                </template>
                <template v-if="out.key == 'win_day' && out.index == 1">
                  <span class="text-8F94A8 opacity-70">*{{$t('Lang.Intelligent calculation')}}</span>
                </template>
              </div>
            </div>
            <div class="mt-3 h-full flex-1 bg-white flex flex-col p-3 rounded-md" style='background:#FFE6C6'  v-for="(item, index) in bigIn" :key="index + 1000">
              
              <template v-if="!item.value_64">
                <div class="text-E9AB1C">
                  <span class="text-2xl font-medium">{{ item.value }}</span>
                  <span>{{ item.desc }}</span>
                </div>
              </template>
              <template v-else>
                <div class="text-E9AB1C">
                  <span class="text-2xl font-medium">{{ item.value }}</span>
                  <span>{{ item.desc }}</span>
                  <span>(32G)</span>
                </div>
                <div class="text-E9AB1C leading-7">
                  <span class="text-2xl font-medium">{{ item.value_64 }}</span>
                  <span>{{ item.desc }}</span>
                  <span>(64G)</span>
                </div>
              </template>
              <div class="text-dark">{{ $t(item.title) }}
                <template v-if="item.tips">
                  <el-popover placement="top-start" trigger="hover" :content="$t(item.tips)">
                    <i class="el-icon-info text-gray-500 ml-1" slot="reference"></i>
                  </el-popover>
                </template>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
    <div class='flex lg:justify-end justify-center lg:-mt-6 mt-2' v-show="okFlag">
      <div class='collectionBox lg:flex hidden items-start mr-4' @click='scareBtn'>
        <img src="@/assets/imgs/share.png" alt="" class='mr-2 collection-false' style='height:14px'>
        <span>{{$t('Lang.Share')}}</span>
      </div>
    </div>
    <div class="text-base mt-3 lg:mt-8 leading-7">
      <div class="text-main">*{{$t('Lang.Tips')}}:</div>
      <div class="text-8F94A8">{{$t('Lang.Tips1')}}</div>
      <div class="text-8F94A8">{{$t('Lang.Tips5')}}</div>
      <div class="text-8F94A8">{{$t('Lang.Tips6')}}</div>
      <div class="text-8F94A8">{{$t('Lang.Tips7')}}</div>
      <div class="text-8F94A8 block xl:hidden">5.{{$t('Lang.Tips4')}}</div>
    </div>

    <el-dialog
      :title="$t('Lang.Share')"
      :visible.sync="dialogVisible"
      :width="dialogWidth"
      :before-close="handleClose">
      <div class='overflow-auto lg:h-192 h-108' v-loading="imgLoading">
        <img :src="imgUrl" style='width:380px' class='m-auto' alt="">
      </div>
      <div class='flex justify-end mr-6 mt-10'>
        <div class='hidden lg:block '>
          <el-button @click="toImage" type="primary">{{$t('Lang.Download')}}</el-button>
        </div>
        <p class='text-xl lg:hidden block text-8F94A8 opacity-75'>*{{$t('Lang.Long press to save the picture')}}</p>
      </div>
    </el-dialog>

    <div  id='machineShareBox' ref="machineShareBox" class='text-white' >
      <div class="effectiveShareTop ">
        <div class='mb-2 mx-4 mt-2 flex items-end justify-between'>
          <p class='text-xl pb-3 border-b-2  border-solid border-F4BF75'>{{$t('Lang.Calculator')}}</p>
        </div>
        <div class='mx-4 mt-2'>
          <p class='text-base'>{{$t('Lang.Excavation time')}}：{{time}}</p>
          <p class='text-base'>{{$t('Lang.Packaging speed')}}：{{form.speed}}  TiB/天</p>
          <p class='text-base'>{{$t('Lang.Storage capacity')}}：{{form.power}}  TiB</p>
          <p class='text-base'>{{$t('Lang.Input costs')}}：{{form.cost}}  CNY</p>
        </div>
        <img class='lg:hidden block absolute' src="@/assets/imgs/effectiveShareTop.png" style='height:110px;width:300px;top:0;z-index:-1' alt="">
        <img class='lg:block hidden  absolute' src="@/assets/imgs/effectiveShareTop.png" style='height:140px;width:300px;top:0;z-index:-1' alt="">
      </div>
      <div style="" class="pt-10 lg:pt-14 pb-4">
        <div style="" class="border-6 border-transparent border-solid">
          <div class=" px-3 pb-3">
            <div class="flex-1 text-center items-center">
              <div class="h-full flex-1 bg-F3F4F9 flex flex-col p-3 rounded-md pt-1 pb-4 mb-3" v-for="(cost, index) in bigCost" :key="index">
                <div class="text-dark">{{ $t(cost.title) }}
                </div>
                <div class="text-main">
                  <span class=" text-xl font-medium">{{ cost.value }}</span>
                  <span class=''>{{ $t(cost.desc) }}</span>
                </div>
              </div>
            </div>
            <div class="mt-3 h-full flex-1 bg-white flex flex-col items-center justify-center px-3 pb-4 rounded-md  border border-solid border-E6E6EA" v-for="(out, index) in bigOut" :key="index + 100">
              <div class="w-full flex items-center justify-between">
                <div class="flex items-end">
                  <span class="text-main font-medium">{{ out.day }}</span>
                  <span class="text-main font-medium">{{$t('Lang.days')}}</span>
                  <span class="text-dark">{{ $t(out.key_str) }}</span>
                </div>
                <template v-if="out.key == 'win_day' && out.index == 0">
                  <span class="text-8F94A8 opacity-50">*{{$t('Lang.Static calculation')}}</span>
                </template>
                <template v-if="out.key == 'win_day' && out.index == 1">
                  <span class="text-8F94A8 opacity-50">*{{$t('Lang.Intelligent calculation')}}</span>
                </template>
              </div>
              <div class="w-full text-E9AB1C">
                <span class="text-xl font-medium">{{ out.reward }}</span>
                <span>{{ out.desc }}</span>
              </div>
            </div>
            <div class="mt-3 h-full flex-1 bg-white flex flex-col px-3 pb-4 rounded-md border border-solid border-E6E6EA" v-for="(item, index) in bigIn" :key="index + 1000">
              <div class="text-dark">{{ $t(item.title) }}
              </div>
              <template v-if="!item.value_64">
                <div class="text-main">
                  <span class="text-xl font-medium">{{ item.value }}</span>
                  <span>{{ item.desc }}</span>
                </div>
              </template>
              <template v-else>
                <div class="text-main">
                  <span class="text-xl font-medium">{{ item.value }}</span>
                  <span>{{ item.desc }}</span>
                  <span>(32G)</span>
                </div>
                <div class="text-main leading-7">
                  <span class="text-xl font-medium">{{ item.value_64 }}</span>
                  <span>{{ item.desc }}</span>
                  <span>(64G)</span>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
      <div class='text-base bg-main px-4 pb-4 pt-2'>
        <p class='mt-2 text-base'>{{$t('Lang.More Filecoin data')}}</p>
        <p class='text-base'>{{$t('Lang.In the Athena browser')}}(atpool.com)</p>
        <div class='flex items-center justify-between'>
          <img class="h-5 lg:h-6 mt-8" v-show="lang == 'zh'"  src="~/assets/img/icon-logo.png" />
          <img class="h-5 lg:h-6 mt-8" v-show="lang !== 'zh'"  src="~/assets/img/icon-en-logo.png" />
          <div class='text-center'>
            <img class='h-16 mt-8' src="@/assets/imgs/WechatIMG10.png" alt="">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import utils from '@/static/utils.js'
import html2canvas from "html2canvas"

export default {
  name: 'Machine',

  mixins: [],

  props: ['foobar'],

  components: {

  },

  watch: {

  },

  computed: {
    configs: function() {
      return [{
        title: '计算日期',
        value: this.today
      }, {
        title: '全网算力',
        value: `${ this.config.total_power_str }`
      }, {
        title: '算力增速',
        value: `${ this.config.increase_power_per_day_str } PiB/天`
      }, {
        title: 'Pledge',
        value: `${ this.config.avg_pledge } F/TiB`
      }, {
        title: '平均产出',
        value: `${ this.config.avg_reward } F/TiB`
      }, {
        title: '当前价值',
        value: `${ this.config.price } USDT`
      }, {
        muti: true,
        title: '生产Gas消耗',
        value_32: `${ utils.formatterAmount(this.config.create_cost_gas_per_t, 4)} F/TiB (32G)`,
        value_64: `${ utils.formatterAmount(this.config.create_cost_gas_per_t_64, 4)} F/TiB (64G)`,
      }, {
        muti: true,
        title: '维护Gas消耗',
        value_32: `${ utils.formatterAmount(this.config.keep_cost_gas_per_t, 4) } F/TiB (32G)`,
        value_64: `${ utils.formatterAmount(this.config.keep_cost_gas_per_t_64, 4) } F/TiB (64G)`
      }]
    },
    calculatorType: function() {
      if (!this.isFinished) return 0
      if (this.isFinished && this.isError) return 1
      if (this.isFinished && !this.isError) return 2
    }
  },

  asyncData: function({ app }) {
    return Promise.all([
      app.$axios.post('/api/calculator/get_calculate_info')
    ]).then(res => {
      let config = res[0].data
      let { price, rate, increase_power_per_day_str } = config
      config.price = price = Number(price)
      config.rate = rate = Number(rate)

      return {
        config,
        form: {
          date: new Date(),
          power: '',
          cost: '',
          speed: 2,
          price,
          growth: increase_power_per_day_str, 
        }
      }
    })
  },

  data: function() {
    return {
      dialogWidth:'',
      time:'',
      imgLoading:true,
      imgUrl:'',
      okFlag:false,
      dialogVisible:false,
      today: utils.formatDate(new Date, 'y-m-d'),
      isFinished: false,
      isError: false,
      bigCost: [],
      bigIn: [],
      bigOut: [],
      loading: null,
      lang:this.$store.state.locale,
      loadingFlag:false
    }
  },

  methods: {
    calculatorHandler: async function() {
      let increase_power_per_day = this.config.increase_power_per_day_str
      if (increase_power_per_day < 0) {
        increase_power_per_day = 0
      }
      if (new Date(utils.formatDate(this.form.date, 'y/m/d')).getTime() < new Date(utils.formatDate(new Date(), 'y/m/d')).getTime()) {
        if(this.lang == 'zh'){
          this.$notification.error({
            title: '错误',
            message: '开始时间，不能小于今日'
          })
        }else if(this.lang == 'en'){
          this.$notification.error({
            title: 'Error',
            message: 'Excavation time, not less than today'
          })
        }else if(this.lang == 'ja'){
          this.$notification.error({
            title: 'エラー',
            message: '掘削時間は今日より小さくしてはいけません。'
          })
        }else{
          this.$notification.error({
            title: '오류',
            message: '굴착 시간 은 오늘 보다 작 을 수 없다 '
          })
        }
        return
      }
      if (!this.form.speed) {
        if(this.lang == 'zh'){
          this.$notification.error({
            title: '错误',
            message: '请输入存储速度'
          })
        }else if(this.lang == 'en'){
          this.$notification.error({
            title: 'Error',
            message: 'Please enter the package speed '
          })
        }else if(this.lang == 'ja'){
          this.$notification.error({
            title: 'エラー',
            message: 'パッケージの速度を入力してください。'
          })
        }else{
          this.$notification.error({
            title: '오류',
            message: '포장 속도를 입력하세요'
          })
        }
        return
      } else if (this.form.speed == 0) {
        if(this.lang == 'zh'){
          this.$notification.error({
            title: '错误',
            message: '请输入大于0的存储速度'
          })
        }else if(this.lang == 'en'){
          this.$notification.error({
            title: 'Error',
            message: 'Please enter a package speed greater than 0 '
          })
        }else if(this.lang == 'ja'){
          this.$notification.error({
            title: 'エラー',
            message: '0より大きいパッケージ速度を入力してください。'
          })
        }else{
          this.$notification.error({
            title: '오류',
            message: '0보다 큰 패키지 속도를 입력하십시오'
          })
        }
        return
      } else if (!/^([1-9]\d*|0)(\.\d{1,})?$/g.test(this.form.speed)) {
        if(this.lang == 'zh'){
          this.$notification.error({
            title: '错误',
            message: '存储速度只能是数字'
          })
        }else if(this.lang == 'en'){
          this.$notification.error({
            title: 'Error',
            message: 'Packaging speed can only be a number'
          })
        }else if(this.lang == 'ja'){
          this.$notification.error({
            title: 'エラー',
            message: '実装速度は数字のみとなります。'
          })
        }else{
          this.$notification.error({
            title: '오류',
            message: '포장 속도는 숫자 일 수 있습니다'
          })
        }
        return
      }
      if (!this.form.power) {
        if(this.lang == 'zh'){
          this.$notification.error({
            title: '错误',
            message: '请输入存储空间'
          })
        }else if(this.lang == 'en'){
          this.$notification.error({
            title: 'Error',
            message: 'Please enter storage space'
          })
        }else if(this.lang == 'ja'){
          this.$notification.error({
            title: 'エラー',
            message: '記憶空間を入力してください。'
          })
        }else{
          this.$notification.error({
            title: '오류',
            message: '저장 공간을 입력하십시오'
          })
        }
        return
      } else if (this.form.power == 0) {
        if(this.lang == 'zh'){
          this.$notification.error({
            title: '错误',
            message: '请输入大于0的存储空间'
          })
        }else if(this.lang == 'en'){
          this.$notification.error({
            title: 'Error',
            message: 'Please enter a storage space greater than 0'
          })
        }else if(this.lang == 'ja'){
          this.$notification.error({
            title: 'エラー',
            message: '0より大きい記憶スペースを入力してください。'
          })
        }else{
          this.$notification.error({
            title: '오류',
            message: '0보다 큰 저장 공간을 입력하십시오'
          })
        }
        return
      } else if (!/^([1-9]\d*|0)(\.\d{1,})?$/g.test(this.form.power)) {
        if(this.lang == 'zh'){
          this.$notification.error({
            title: '错误',
            message: '存储空间只能是数字'
          })
        }else if(this.lang == 'en'){
          this.$notification.error({
            title: 'Error',
            message: 'Storage space can only be numbers'
          })
        }else if(this.lang == 'ja'){
          this.$notification.error({
            title: 'エラー',
            message: '格納スペースは数字だけです。'
          })
        }else{
          this.$notification.error({
            title: '오류',
            message: '저장 공간은 숫자 만 가능합니다'
          })
        }
        return
      } else if (Number(this.form.power) / Number(this.form.speed) > 540) {
        let maxStore = 540 * this.form.speed
        if(this.lang == 'zh'){
          this.$notification.error({
            title: '错误',
            message: `以当前存储速度最多可存储完成${maxStore}TiB的存储空间，请重新输入存储空间，输入值不可大于${maxStore}`
          })
        }else if(this.lang == 'en'){
          this.$notification.error({
            title: 'Error',
            message: `Can be packaged at most at the current packaging speed${maxStore}TiB storage space, please re-enter the storage space, the input value cannot be greater than${maxStore}`
          })
        }else if(this.lang == 'ja'){
          this.$notification.error({
            title: 'エラー',
            message: `現在のストレージ速度で最大${maxStore}TiBの格納空間をストレージできます。記憶空間を再入力してください。入力値は${maxStore}より大きくしてはいけません。`
          })
        }else{
          this.$notification.error({
            title: '오류',
            message: `현재 포장 속도로 최대 포장 가능${maxStore}TiB 저장 공간, 저장 공간을 다시 입력하십시오. 입력 값은 다음보다 클 수 없습니다${maxStore}`
          })
        }
        return
      }
      if (!this.form.cost) {
        if(this.lang == 'zh'){
          this.$notification.error({
            title: '错误',
            message: '请输入投入成本'
          })
        }else if(this.lang == 'en'){
          this.$notification.error({
            title: 'Error',
            message: 'Please enter input cost'
          })
        }else if(this.lang == 'ja'){
          this.$notification.error({
            title: 'エラー',
            message: '投入コストを入力してください。'
          })
        }else{
          this.$notification.error({
            title: '오류',
            message: '입력 비용을 입력하십시오 '
          })
        }
        return
      }
      let cost = utils.delCommify(this.form.cost);
      if (cost < 0) {
        if(this.lang == 'zh'){
          this.$notification.error({
            title: '错误',
            message: '请输入大于0的投入成本'
          })
        }else if(this.lang == 'en'){
          this.$notification.error({
            title: 'Error',
            message: 'Please enter an input cost greater than 0'
          })
        }else if(this.lang == 'ja'){
          this.$notification.error({
            title: 'エラー',
            message: '0より大きい投入コストを入力してください。'
          })
        }else{
          this.$notification.error({
            title: '오류',
            message: '0보다 큰 입력 비용을 입력하십시오'
          })
        }
        return
      } else if (!/^([1-9]\d*|0)(\.\d{1,})?$/.test(cost)) {
        if(this.lang == 'zh'){
          this.$notification.error({
            title: '错误',
            message: '投入成本只能是数字'
          })
        }else if(this.lang == 'en'){
          this.$notification.error({
            title: 'Error',
            message: 'Input costs can only be numbers '
          })
        }else if(this.lang == 'ja'){
          this.$notification.error({
            title: 'エラー',
            message: '投入コストは数字だけです。'
          })
        }else{
          this.$notification.error({
            title: '오류',
            message: '입력 비용은 숫자 일 수 있습니다'
          })
        }
        return
      }
      this.loadingFlag = true
      this.time = utils.formatDate(new Date(this.form.date), 'y-m-d')
      this.$axios.post('/api/calculator/get_calculate_sum_v2', {
          increase_power_per_day: increase_power_per_day,
          cost: this.form.cost,
          total_power: this.form.power,
          init_power: 0,
          current_date: utils.formatDate(new Date(this.form.date), 'y-m-d'),
          power_per_day: this.form.speed
        })
        .then(res => {
          this.okFlag = true
          this.loadingFlag = false
          this.isFinished = true
          if (res.code != 0) {
            this.isError = true
            if(this.lang == 'zh'){
              this.$notification.error({
                title: '错误',
                message: '计算失败'
              })
            }else if(this.lang == 'en'){
              this.$notification.error({
                title: 'Error',
                message: 'Calculation failed'
              })
            }else if(this.lang == 'ja'){
              this.$notification.error({
                title: 'エラー',
                message: '計算に失敗しました'
              })
            }else{
              this.$notification.error({
                title: '오류',
                message: '계산 실패'
              })
            }
            return
          }
          this.isError = false
          let records = res.data.records
          delete records['180']
          delete records['360']
          let keys = []
          Object.keys(records).map(key => {
            records[key].days.map((day, index) => {
              keys.push({ day, key, index })
            })
          })
          keys.sort(function compare(x, y) {
            return parseInt(x.day) > parseInt(y.day) ? 1 : -1
          })
          let key_str = {
            'full_day': 'Lang.package completion',
            'win_day': 'Lang.balance output',
            '540': 'Lang.output'
          }
          let tips_str = {
            'full_day': 'Lang.According to the set mining machine packaging speed the number of days required to package the full storage capacity and the corresponding total FIL output',
            'win_day': 'Lang.The total FIL output on the day of mining until the output balance',
            '540': 'Lang.Total FIL output of 540 days of mining'
          }
          let out = []
          let _in = []
          let cost = []
          let win_day = res.data.win_day
          let _keys = []
          keys.map(item => {
            if (item.key == 'win_day') {
              if (item.day == win_day) _keys.push(item)
            } else {
              _keys.push(item)
            }
          })
          _keys.map(item => {
            let value = res.data.records[item.key]
            let t = {}
            t['key'] = item.key
            t['key_str'] = key_str[item.key]
            t['tips'] = tips_str[item.key]
            t['day'] = item.day
            t['index'] = item.index
            if (typeof(value.reward[0]) == 'object') {
              t['reward'] = `${value.reward[0][0]}`
            } else {
              t['reward'] = `${value.reward[0]}`
            }
            t['desc'] = 'F'
            out.push(t)
            switch (item.key) {
              case 'full_day':
                {
                  _in.push({ title: 'Lang.Encapsulation pledge', value: `${value.pledge}`, desc: ' F', tips: 'Lang.Encapsulate the pledged FIL required for storage and the pledge will be automatically returned after the end of the sector life cycle 540 days' })
                  _in.push({ title: 'Lang.Production Gas Consumption', value: `${value.create_gas}`, value_64: `${value.create_gas_64}`, desc: ' F', tips: 'Lang.Gas fee consumed by encapsulating full computing power calculated based on the average value of the entire network' })
                  _in.push({ title: 'Lang.Maintenance Gas consumption', value: `${utils.formatterAmount(this.config.keep_cost_gas_per_t, 4)}`, value_64: `${utils.formatterAmount(this.config.keep_cost_gas_per_t_64, 4)}`, desc: ' F/TiB/Day', tips: 'Lang.Gas fee for maintaining computing power calculated based on the average value of the entire network' })
                }
                break;
              case 'win_day':
                cost.push({ title: 'Lang.Estimation of balance days', value: `${win_day}`, desc: 'Lang.days', tips: 'Lang.The number of days that the input cost and the FIL output are balanced' })
                break;
              case '540':
                {
                  let _cost = []
                  value.reward.map(a => {
                    _cost.push(utils.formatterAmount(this.form.cost / a, 0))
                  })
                  cost.push({ title: 'Lang.Single FIL cost estimation', value: `${_cost[0]}`, desc: 'Lang.CNY', tips: 'Lang.Input cost Total output of FIL for 540 days of mining excluding gas related costs' })
                }
                break;
            }
          })
          this.bigCost = cost
          this.bigIn = _in
          this.bigOut = out
        })
    },
    handleClose(done) {
      done();
    },
    scareBtn(){
      this.imgUrl = ''
      this.imgLoading = true
      let that = this
      this.shareFlag = true
      setTimeout(()=>{
        let myBox = this.$refs.machineShareBox;
        let htmlDom = document.getElementById('machineShareBox')
        html2canvas(myBox, {
          width: htmlDom.clientWidth,
          height: htmlDom.clientHeight,
          scrollY: 0, 
          scrollX: 0,
          scale:window.devicePixelRatio*2,
        }).then(function(canvas) {
          that.imgLoading = false
          let data = canvas.toDataURL("image/jpeg", 1);
          that.imgUrl = data
          that.toImage()
        });
      },200)
    },
    toImage(){
      var image = new Image();
      image.setAttribute("crossOrigin", "anonymous");
      var _this = this;
      image.onload = function () {
        var canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;
        var context = canvas.getContext("2d");
        context.drawImage(image, 0, 0, image.width, image.height);
        var url = canvas.toDataURL("image/png"); 
        var a = document.createElement("a"); 
        var event = new MouseEvent("click"); 
        a.download = '算力存储产出'; 
        a.href = url; 
        a.dispatchEvent(event);
         _this.dialogVisible = false
      };
      image.src = this.imgUrl;
    },
    getHeight() {
      if (document.body.clientWidth < 768) {
        this.dialogWidth = "93%";
      } else {
        this.dialogWidth = "420px";
      }
    },
  },

  mounted: function() {
    this.getHeight()
  },

  beforeDestroy: function() {

  }
}
</script>
<style lang="scss">
.data-handler {}

.data-handler .el-date-editor {
  width: 100% !important;
}

.data-handler .el-date-editor .el-input__suffix,
.data-handler .el-date-editor .el-input__prefix {
  display: none !important;
}

.data-handler .el-input__suffix-inner {
  line-height: 3.5rem;
}

.data-handler .el-input__inner {
  color: #040A25;
  font-size: 1.5rem;
  border-radius: 0 !important;
  height: 3.5rem;
  width: 100% !important;
  padding: 0 3rem 0 1rem !important;
  font-weight: 600;
  background-color: transparent;
}

.data-handler .el-input__inner:focus {
  border-color: #040A25 !important;
  outline: 0;
}

.data-handler .el-button {
  color: #FFF;
  background-color: #333FC6;
  border-color: #333FC6;
  width: 100%;
  border-radius: 0 !important;
}

.data-handler .line-shadow {
  box-shadow: 0 0 1rem .25rem rgba(34, 43, 144, 0.95);
}

.cal-loading-text-class {
  i {
    color: #fff;
    font-size: 20px;
  }

  .el-loading-text {
    color: #fff;
  }
}
.circular{
  margin: 0 auto;
}

#machineShareBox{
  position:fixed;
  top: -99999px;
  // opacity: 0;
}
</style>