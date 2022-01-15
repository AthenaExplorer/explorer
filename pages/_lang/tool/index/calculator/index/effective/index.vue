<template>
  <div v-loading="loadingFlag" class="flex flex-col lg:px-12  pb-3 lg:pb-8 rounded-b-lg mb-3 lg:mt-6 mt-0">
    <div class="data-handler mt-3 block lg:flex items-center">
      <div class="w-full lg:w-108 lg:h-148  rounded-xl border-2 lg:border-4 rounded-xl border-main border-solid lg:flex">
        <div class="flex-1 mx-3  lg:mr-6">
          <div class="mt-5 mb-2 text-040A25 text-xl">{{$t('Lang.Excavation time')}}</div>
          <div class="lg:flex hidden items-center justify-between relative w-full disPc">
            <el-date-picker :disabled="true" v-model="form.date" type="date" placeholder="选择日期" class='w-full'></el-date-picker>
            <div class="flex items-center justify-center w-6 h-full absolute top-0 right-4">
              <img class="w-6" src="~/assets/imgs/calculator/date-icon.png" />
            </div>
          </div>
          <div class="flex lg:hidden items-center justify-between relative w-full disPhone">
            <el-date-picker :disabled="true" v-model="form.date" type="date" placeholder="选择日期" class='w-full'></el-date-picker>
            <div class="flex items-center justify-center w-6 h-full absolute top-0 right-4">
              <img class="w-6" src="~/assets/imgs/calculator/date-icon.png" />
            </div>
          </div>
          <div class="mt-5 mb-2 text-040A25">
            <span class="text-040A25 text-xl">{{$t('Lang.Full storage power')}}</span>
            <el-popover placement="top-start" trigger="hover" :content="$t('Lang.Packaged effective computing power')">
              <i class="el-icon-info text-gray-500" slot="reference"></i>
            </el-popover>
          </div>
          <div>
            <el-input v-model="form.power" :placeholder="$t('Lang.Full storage power')" @change='okFlag = false'>
              <span slot="suffix" class="text-xl font-semibold text-8F94A8">TiB</span>
            </el-input>
          </div>
          <div class="mt-5 mb-2">
            <span class="text-040A25 text-xl">{{$t('Lang.Input costs')}}</span>
            <el-popover placement="top-start" trigger="hover" :content="$t('Lang.The cost of obtaining full computing power')">
              <i class="el-icon-info text-gray-500" slot="reference"></i>
            </el-popover>
          </div>
          <div class="mb-5 lg:mb-33">
            <el-input v-model="form.cost" :placeholder="$t('Lang.Input costs')" @change='okFlag = false'>
              <span slot="suffix" class="text-xl font-semibold text-8F94A8">CNY</span>
            </el-input>
          </div>
          <el-button type="primary" style="height: 3.5rem;" @click="calculatorHandler">{{$t('Lang.Start calculating')}}</el-button>
          <div class="text-8F94A8 text-center text-E9AB1C leading-10">*{{$t('Lang.Intelligent analysis based on economic model')}}</div>
        </div>
        <div class="h-full w-8 hidden lg:flex items-center justify-center">
          <div class="w-5 h-136 bg-222B90 rounded-full py-2" style="padding-left: 0.625rem;">
            <div class="h-128 w-8 bg-F4F5FF flex items-center justify-start">
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
      <div class="w-full flex-1 h-128 hidden lg:flex" style='background:#F9F9FD'>
        <div class="py-5 pr-5 flex-1 flex flex-col pl-10 ">
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
              <div class="h-full flex flex-col justify-center flex-1  rounded-md relative" style='background:#FFE6C6' :class="{'ml-3' : index > 0}" v-for="(out, index) in bigOut" :key="index + 100">
                <div class="text-center text-E9AB1C">
                  <span class="text-5xl font-normal">{{ out.reward }}</span>
                  <span>{{ $t(out.desc) }}</span>
                </div>
                <div class="w-full flex items-center justify-center">
                  <div class="w-full text-lg flex items-end justify-center">
                    <span class="text-E9AB1C font-medium ">{{ out.day }}</span>
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
            <div class="flex-1 flex items-center" >
              <div class="h-full flex-1  flex flex-col p-3 rounded-md" style='background:#F9F9FD' :class="{'ml-3' : index > 0}" v-for="(cost, index) in bigCost" :key="index">
                <div class="text-main text-center">
                  <span class="text-2xl font-medium">{{ cost.value }}</span>
                  <span>{{ $t(cost.desc) }}</span>
                </div>
                <div class="text-dark">{{ $t(cost.title) }}
                  <template v-if="cost.tips">
                    <el-popover placement="top-start" trigger="hover" :content="$t(cost.tips)">
                      <i class="el-icon-info text-gray-500 ml-1" slot="reference"></i>
                    </el-popover>
                  </template>
                </div>
              </div>
            </div>
            <div class="mt-3 h-full flex-1 bg-white flex flex-col items-center justify-center p-3 rounded-md" style='background:#FFE6C6' v-for="(out, index) in bigOut" :key="index + 100">
              <div class="w-full text-E9AB1C">
                <span class="text-2xl font-medium">{{ out.reward }}</span>
                <span>{{ $t(out.desc) }}</span>
              </div>
              <div class="w-full flex items-center justify-between" >
                <div class="flex items-end">
                  <span class="text-E9AB1C font-medium">{{ out.day }}</span>
                  <span class="text-E9AB1C font-medium mr-2">{{$t('Lang.days')}}</span>
                  <span class="text-dark">{{ $t(out.key_str) }}</span>
                  <template v-if="out.tips">
                    <el-popover placement="top-start" trigger="hover" :content="$t(out.tips)">
                      <i class="el-icon-info text-gray-500 ml-1" slot="reference"></i>
                    </el-popover>
                  </template>
                </div>
                <template v-if="out.key == 'win_day' && out.index == 0">
                  <span class="text-8F94A8 opacity-80">*{{$t('Lang.Static calculation')}}</span>
                </template>
                <template v-if="out.key == 'win_day' && out.index == 1">
                  <span class="text-8F94A8 opacity-80">*{{$t('Lang.Intelligent calculation')}}</span>
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
      <div class="text-8F94A8">{{$t('Lang.Tips2')}}</div>
      <div class="text-8F94A8">{{$t('Lang.Tips3')}}</div>
      <div class="text-8F94A8 block xl:hidden">4.{{$t('Lang.Tips4')}}</div>
    </div>
    <el-dialog :title="$t('Lang.Share')" :visible.sync="dialogVisible" :width="dialogWidth" :before-close="handleClose">
      <div class='overflow-auto lg:h-192 h-108' v-loading="imgLoading">
        <img :src="imgUrl" style='width:380px' class='m-auto' alt="">
      </div>
      <div class='flex justify-end mr-6 mt-10 '>
        <div class='hidden lg:block '>
          <el-button @click="toImage" type="primary">{{$t('Lang.Download')}}</el-button>
        </div>
        <p class='text-xl lg:hidden block text-8F94A8 opacity-75'>*{{$t('Lang.Long press to save the picture')}}</p>
      </div>
    </el-dialog>
    <div id='effectiveShareBox' ref="effectiveShareBox" class='text-white'>
      <div class="effectiveShareTop ">
        <div class='mb-2 mx-4 mt-2 flex items-end justify-between'>
          <p class='text-xl pb-3 border-b-2  border-solid border-F4BF75'>{{$t('Lang.Calculator')}}</p>
        </div>
        <div class=' mx-4 mt-2'>
          <p class='text-base'>{{$t('Lang.Excavation time')}}：{{today}}</p>
          <p class='text-base'>{{$t('Lang.Full storage power')}}：{{form.power}} TiB</p>
          <p class='text-base'>{{$t('Lang.Input costs')}}：{{form.cost}} CNY</p>
        </div>
        <img class='lg:hidden block absolute' src="@/assets/imgs/effectiveShareTop.png" style='height:100px;width:300px;top:0;z-index:-1' alt="">
        <img class='lg:block hidden  absolute' src="@/assets/imgs/effectiveShareTop.png" style='height:130px;width:300px;top:0;z-index:-1' alt="">
      </div>
      <div style="" class="pt-14 lg:pt-18 pb-6 ">
        <div class="px-3 ">
          <div class="flex-1 items-center">
            <div class="h-full flex-1 bg-F3F4F9 flex flex-col rounded-md text-center pt-1 pb-4 mb-3" v-for="(cost, index) in bigCost" :key="index">
              <p class='text-base text-dark'>{{ $t(cost.title) }}</p>
              <div class="-mt-2 ">
                <span class="text-2xl font-medium text-main">{{ cost.value }}</span>
                <span class='text-main'>{{ $t(cost.desc) }}</span>
              </div>
            </div>
          </div>
          <div class="mt-3 h-full flex-1 bg-white flex flex-col items-center justify-center p-3 rounded-md border border-solid border-E6E6EA" v-for="(out, index) in bigOut" :key="index + 100">
            <div class="w-full flex items-center justify-between">
              <div class="flex items-end -mt-2">
                <span class="text-main font-medium">{{ out.day }}</span>
                <span class="text-main font-medium mr-2">{{$t('Lang.days')}}</span>
                <span class="text-dark">{{ $t(out.key_str) }}</span>
              </div>
              <template v-if="out.key == 'win_day' && out.index == 0">
                <span class="text-8F94A8 opacity-50 -mt-2">*{{$t('Lang.Static calculation')}}</span>
              </template>
              <template v-if="out.key == 'win_day' && out.index == 1">
                <span class="text-8F94A8 opacity-50 -mt-2">*{{$t('Lang.Intelligent calculation')}}</span>
              </template>
            </div>
            <div class="w-full text-E9AB1C pb-2">
              <span class="text-xl font-medium">{{ out.reward }}</span>
              <span>{{ $t(out.desc) }}</span>
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
  name: 'Effective',

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

  asyncData({ app }) {
    return Promise.all([
      app.$axios.post('/api/calculator/get_calculate_info')
    ]).then(res => {
      let config = res[0].data
      let { price } = config
      config.price = Number(price)

      return {
        config,
        form: {
          date: new Date(),
          power: '',
          cost: '',
          speed: 2,
          price,
        }
      }
    })
  },

  data: function() {
    return {
      dialogWidth: '',
      imgLoading: true,
      imgUrl: '',
      shareFlag: false,
      okFlag: false,
      dialogVisible: false,
      today: utils.formatDate(new Date, 'y-m-d'),
      isFinished: false,
      isError: false,
      bigCost: [],
      bigIn: [],
      bigOut: [],
      loading: null,
      lang: this.$store.state.locale,
      loadingFlag: false
    }
  },

  methods: {
    calculatorHandler: async function() {
      let increase_power_per_day = this.config.increase_power_per_day_str
      if (increase_power_per_day < 0) {
        increase_power_per_day = 0
      }
      if (!this.form.power) {
        if (this.lang == 'zh') {
          this.$notification.error({
            title: '错误',
            message: '请输入满存算力'
          })
        } else if (this.lang == 'en') {
          this.$notification.error({
            title: 'Error',
            message: 'Please enter full storage power'
          })
        } else if (this.lang == 'ja') {
          this.$notification.error({
            title: 'エラー',
            message: 'フルチャージ力を入力してください。'
          })
        } else {
          this.$notification.error({
            title: '오류',
            message: '전체 저장 용량을 입력하세요'
          })
        }
        return
      } else if (this.form.power == 0) {
        if (this.lang == 'zh') {
          this.$notification.error({
            title: '错误',
            message: '请输入大于0的满存算力'
          })
        } else if (this.lang == 'en') {
          this.$notification.error({
            title: 'Error',
            message: 'Please enter a full storage power greater than 0'
          })
        } else if (this.lang == 'ja') {
          this.$notification.error({
            title: 'エラー',
            message: '0より大きい満存計算力を入力してください。'
          })
        } else {
          this.$notification.error({
            title: '오류',
            message: '0보다 큰 전체 저장 용량을 입력하십시오'
          })
        }

        return
      } else if (!/^([1-9]\d*|0)(\.\d{1,})?$/g.test(this.form.power)) {
        if (this.lang == 'zh') {
          this.$notification.error({
            title: '错误',
            message: '满存算力只能是数字'
          })
        } else if (this.lang == 'en') {
          this.$notification.error({
            title: 'Error',
            message: 'Full storage power can only be numbers'
          })
        } else if (this.lang == 'ja') {
          this.$notification.error({
            title: 'エラー',
            message: '満額の計ストレージは数字だけです。'
          })
        } else {
          this.$notification.error({
            title: '오류',
            message: '전체 스토리지 전력은 숫자 일 수 있습니다 '
          })
        }
        return
      }
      if (!this.form.cost) {
        if (this.lang == 'zh') {
          this.$notification.error({
            title: '错误',
            message: '请输入投入成本'
          })
        } else if (this.lang == 'en') {
          this.$notification.error({
            title: 'Error',
            message: 'Please enter input cost'
          })
        } else if (this.lang == 'ja') {
          this.$notification.error({
            title: 'エラー',
            message: '投入コストを入力してください。'
          })
        } else {
          this.$notification.error({
            title: '오류',
            message: '입력 비용을 입력하십시오'
          })
        }
        return
      }
      let cost = utils.delCommify(this.form.cost);
      if (cost < 0) {
        if (this.lang == 'zh') {
          this.$notification.error({
            title: '错误',
            message: '请输入大于0的投入成本'
          })
        } else if (this.lang == 'en') {
          this.$notification.error({
            title: 'Error',
            message: 'Please enter an input cost greater than 0'
          })
        } else if (this.lang == 'ja') {
          this.$notification.error({
            title: 'エラー',
            message: '0より大きい投入コストを入力してください。'
          })
        } else {
          this.$notification.error({
            title: '오류',
            message: '0보다 큰 입력 비용을 입력하십시오'
          })
        }
        return
      } else if (!/^([1-9]\d*|0)(\.\d{1,})?$/.test(cost)) {
        if (this.lang == 'zh') {
          this.$notification.error({
            title: '错误',
            message: '投入成本只能是数字 '
          })
        } else if (this.lang == 'en') {
          this.$notification.error({
            title: 'Error',
            message: 'Input costs can only be numbers'
          })
        } else if (this.lang == 'ja') {
          this.$notification.error({
            title: 'エラー',
            message: '投入コストは数字だけです。'
          })
        } else {
          this.$notification.error({
            title: '오류',
            message: '입력 비용은 숫자 일 수 있습니다 '
          })
        }
        return
      }
      this.loadingFlag = true
      this.$axios.post('/api/calculator/get_calculate_sum_v2', {
          increase_power_per_day: increase_power_per_day,
          cost: this.form.cost,
          total_power: this.form.power,
          init_power: this.form.power
        })
        .then(res => {
          this.loadingFlag = false
          this.isFinished = true
          if (res.code != 0) {
            this.isError = true
            if (this.lang == 'zh') {
              this.$notification.error({
                title: '错误',
                message: '计算失败 '
              })
            } else if (this.lang == 'en') {
              this.$notification.error({
                title: 'Error',
                message: 'Calculation failed'
              })
            } else if (this.lang == 'ja') {
              this.$notification.error({
                title: 'エラー',
                message: '計算に失敗しました'
              })
            } else {
              this.$notification.error({
                title: '오류',
                message: '계산 실패'
              })
            }
            return
          }
          this.okFlag = true
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
            t['desc'] = 'Lang.FIL'
            out.push(t)
            switch (item.key) {
              case 'win_day':
                cost.push({ title: 'Lang.Estimation of balance days', value: `${win_day}`, desc: 'Lang.days', tips: 'Lang.The number of days that the input cost and the FIL output are balanced' })
                break;
              case '540':
                {
                  _in.push({ title: '维护Gas消耗', value: `${utils.formatterAmount(this.config.keep_cost_gas_per_t, 4)}`, desc: 'Lang.FILTiB', tips: '维护算力所消耗的Gas费（根据全网平均值计算得出）' })
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
    scareBtn() {
      this.imgLoading = true
      this.imgUrl = ''
      let that = this
      this.shareFlag = true
      setTimeout(() => {
        let myBox = this.$refs.effectiveShareBox;
        let htmlDom = document.getElementById('effectiveShareBox')
        html2canvas(myBox, {
          width: htmlDom.clientWidth,
          height: htmlDom.clientHeight,
          scrollY: 0,
          scrollX: 0,
          scale: window.devicePixelRatio * 4,
        }).then(function(canvas) {
          that.imgLoading = false
          let data = canvas.toDataURL("image/jpeg", 0.4);
          that.imgUrl = data
          that.toImage()
        });
        this.shareFlag = false
      }, 200)
    },
    toImage() {
      var image = new Image();
      image.setAttribute("crossOrigin", "anonymous");
      var _this = this;
      image.onload = function() {
        var canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;
        var context = canvas.getContext("2d");
        context.drawImage(image, 0, 0, image.width, image.height);
        var url = canvas.toDataURL("image/png"); 
        var a = document.createElement("a"); 
        var event = new MouseEvent("click");
        a.download = '满存算力产出'; 
        a.href = url; 
        a.dispatchEvent(event); 
        _this.dialogVisible = false
      };
      image.src = this.imgUrl;

    },
    getHeight() {
      if (document.body.clientWidth < 768) {
        this.dialogWidth = "90%";
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

.data-handler .el-input__suffix-inner {
  line-height: 3.5rem;
}
.data-handler .el-date-editor .el-input__suffix,
.data-handler .el-date-editor .el-input__prefix {
  display: none !important;
}

.disPc .el-input.is-disabled .el-input__inner{
  background: #F9F9FD;
  border: none;
}
.disPhone .el-input.is-disabled .el-input__inner{
  background: rgb(239, 239, 255);
  border: none;
  color: #000!important;
}


.data-handler .el-date-editor {
  width: 100% !important;
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

.circular {
  margin: 0 auto;
}

.collectionBox {
  cursor: pointer;

  &:hover {
    .collection-false {
      transform: scale(1.1);
    }
  }
}

.effectiveShareTop {
  // height: 130px;
  // background: url('../../../../../assets/imgs/effectiveShareTop.png') no-repeat;
  // background-size: 100.5% 101%;

  // background-size: 100% 100%;
}

.el-dialog__body {
  padding-top: 10px;
  padding-left: 10px;
  padding-right: 10px;
}

#effectiveShareBox {
  position: fixed;
  top: -99999px;
  // opacity: 0;
}
</style>