<template>
  <div class="mb-16">
    <div class='lg:flex block justify-between mb-2'>
      
      <div class='lg:flex hidden'>
        <span class="flex text-2xl items-center">{{$t('Lang.Miner comparison')}}</span>
        <img v-if="lang == 'zh' " src="@/assets/imgs/personalMenuPro-zh.png" alt="" style='height:26px' class='ml-4'>
        <img v-if="lang == 'en' " src="@/assets/imgs/personalMenuPro-en.png" alt="" style='height:26px' class='ml-4'>
        <img v-if="lang == 'ko' " src="@/assets/imgs/personalMenuPro-ko.png" alt="" style='height:26px' class='ml-4'>
        <img v-if="lang == 'ja' " src="@/assets/imgs/personalMenuPro-ja.png" alt="" style='height:26px' class='ml-4'>
      </div>
      <div class='hidden lg:inline-block ml-3 '>
        <el-button @click='scareBtn' :disabled='shareFlag'>{{$t('Lang.Export')}}</el-button>
      </div>
    </div>
    <div class="border-l border-t border-solid border-E8E7EB bg-white rounded-md">
      <table class="table-fixed w-full">
        <thead>
          <tr class="">
            <th class="lg:w-64 w-32 lg:py-4 py-2 font-medium tableBorder"></th>
            <th class="w-1/3 lg:py-4 py-2 font-medium tableBorder">{{miner_no}}</th>
            <th class="w-1/3  font-medium tableBorder " >
              <p v-show="!nodeTwoText" class='lg:py-4 py-2 text-main cursor-pointer opacity-75 hover:opacity-100' @click='addNodeTwo'> <i class="el-icon-plus"></i> {{$t('Lang.Add miner')}}</p>
              <p v-show="nodeTwoText" class='lg:py-4 py-2 text-main cursor-pointer opacity-75 hover:opacity-100' @click='clearTableList(1)'>{{nodeTwoText}} <i class="el-icon-close"></i></p>
            </th>
            <th class="w-1/3 lg:py-4 py-2 font-medium tableBorder">
              <p v-show="!nodeThreeText" class='lg:py-4 py-2 text-main cursor-pointer opacity-75 hover:opacity-100' @click='addNodeThree'> <i class="el-icon-plus"></i> {{$t('Lang.Add miner')}}</p>
              <p v-show="nodeThreeText" class='lg:py-4 py-2 text-main cursor-pointer opacity-75 hover:opacity-100' @click='clearTableList(2)'>{{nodeThreeText}} <i class="el-icon-close"></i></p>
            </th>
          </tr>
        </thead>
        
        <tbody>
          <tr v-for="(i,j) in tableBox" :key="j">
            <template v-if="i.subTitle">
              <td class="py-3 px-2 text-center tableBorder">
                <p style='word-break:break-all'>{{$t(i.subTitle)}}</p>
              </td>
              <td class="w-1/3 py-3 px-2 text-center tableBorder" v-for="(k,h) in i.dataList" :key="h">

                <p v-if="i.lang" calss=''>{{$t(k)}}</p>
                <p v-else>{{k}}</p>
              </td>
            </template>

            <template v-if="i.title">
                <td colspan="4" class="px-8 py-4 text-lg text-left font-bold tableBorder" style='background:#F1F2F7'>
                  <p>{{$t(i.title)}}</p>
                </td>
            </template>

            <template v-if="i.echarts">
                <td class="h-96 py-3 px-2 text-center tableBorder">
                  <p style='word-break:break-all'>{{$t(i.echartsTitle)}}</p>
                </td>

                <td colspan="3" class=" text-center truncate tableBorder ">
                  <div :id='i.id' class="py-3 h-96">
                  </div>
                </td>
            </template>

          </tr>
        </tbody>
        
      </table>
    </div>

    <el-dialog
        :title="$t('Lang.Add miner')"
        :visible.sync="addNodeFlagTwo"
        width="400px"
        >
        <el-form label-position="top" label-width="80px"  size="mini">
          <el-form-item :label="$t('Lang.Miner')" >
          </el-form-item>
        </el-form>
        <div class='-mt-6'>
          <el-input  v-model="nodeTwo" :placeholder="$t('Lang.Please enter')" clearable @keyup.enter.native="okTwo"></el-input>
        </div>

        <span slot="footer" class="dialog-footer">
            <el-button @click="addNodeFlagTwo = false">{{$t('Lang.Cancel')}}</el-button>
            <el-button type="primary" @click="okTwo"  :disabled='Loding'>
              <p v-show="!Loding">{{$t('Lang.Submit')}}</p>
              <p v-show="Loding"><i class="el-icon-loading"></i></p>
            </el-button>
        </span>
    </el-dialog>

    <el-dialog
      :title="$t('Lang.Add miner')"
      :visible.sync="addNodeFlagThree"
      width="400px"
      >
      <el-form label-position="top" label-width="80px"  size="mini">
        <el-form-item :label="$t('Lang.Miner')" >
        </el-form-item>
      </el-form>
      <div class='-mt-6'>
        <el-input  v-model="nodeThree" :placeholder="$t('Lang.Please enter')" clearable  @keyup.enter.native="okThree"></el-input>
      </div>

      <span slot="footer" class="dialog-footer">
          <el-button @click="addNodeFlagThree = false">{{$t('Lang.Cancel')}}</el-button>
          <el-button type="primary" @click="okThree" :disabled='Loding'>
              <p v-show="!Loding">{{$t('Lang.Submit')}}</p>
              <p v-show="Loding"><i class="el-icon-loading"></i></p>
            </el-button>
      </span>
    </el-dialog>

    <div id="shareNodeComparison" ref="shareNodeComparison">
      <div class='shareTop h-64 pt-10' style='background:#182A77'>
        <div style='width:1260px;margin-left:110px' class='flex justify-between'>
          <div class='text-white'>
            <img class="h-10" v-show="lang == 'zh'" src="~/assets/img/icon-logo.png" />
            <img class="h-10" v-show="lang !== 'zh'" src="~/assets/img/icon-en-logo.png" />
            <span class='inline-block text-xl mt-6 pb-1 pb-2 border-b-2  border-solid border-F4BF75' >{{$t('Lang.Miner comparison')}}</span>
          </div>
          <div class='mt-4'>
            <p class='text-white' >{{nowtime}}</p>
          </div>
        </div>
        <img src="@/assets/imgs/bg-shape.png" alt="" class='relative ' style='width:500px;z-index:2;left:800px;top:-120px'>
      </div>
      <div style='width:1260px;margin-left:110px;z-index:5' class='-mt-20 bg-white relative mb-4 border-l border-solid border-E8E7EB'>
        <table class="table-fixed w-full">
        <thead>
          <tr class="">
            <th class="lg:w-64 w-32 lg:py-4 py-2 font-medium tableBorder"></th>
            <th class="w-1/3 lg:py-4 py-2 font-medium tableBorder">{{miner_no}}</th>
            <th class="w-1/3  font-medium tableBorder " >
              <p v-show="!nodeTwoText" class='lg:py-4 py-2 text-main cursor-pointer opacity-75 hover:opacity-100' @click='addNodeTwo'> <i class="el-icon-plus"></i> {{$t('Lang.Add miner')}}</p>
              <p v-show="nodeTwoText" class='lg:py-4 py-2 text-main cursor-pointer opacity-75 hover:opacity-100' @click='clearTableList(1)'>{{nodeTwoText}} <i class="el-icon-close"></i></p>
            </th>
            <th class="w-1/3 lg:py-4 py-2 font-medium tableBorder">
              <p v-show="!nodeThreeText" class='lg:py-4 py-2 text-main cursor-pointer opacity-75 hover:opacity-100' @click='addNodeThree'> <i class="el-icon-plus"></i> {{$t('Lang.Add miner')}}</p>
              <p v-show="nodeThreeText" class='lg:py-4 py-2 text-main cursor-pointer opacity-75 hover:opacity-100' @click='clearTableList(2)'>{{nodeThreeText}} <i class="el-icon-close"></i></p>
            </th>
          </tr>
        </thead>
        
        <tbody>
          <tr v-for="(i,j) in tableBox" :key="j">
            <template v-if="i.subTitle">
              <td class="py-3 px-2 text-center tableBorder">
                <p style='word-break:break-all'>{{$t(i.subTitle)}}</p>
              </td>
              <td class="w-1/3 py-3 px-2 text-center tableBorder" v-for="(k,h) in i.dataList" :key="h">

                <p v-if="i.lang" calss=''>{{$t(k)}}</p>
                <p v-else>{{k}}</p>
              </td>
            </template>

            <template v-if="i.title">
                <td colspan="4" class="px-8 py-4 text-lg text-left font-bold tableBorder" style='background:#F1F2F7'>
                  <p>{{$t(i.title)}}</p>
                </td>
            </template>

            <template v-if="i.echarts">
                <td class="h-96 py-3 px-2 text-center tableBorder">
                  <p style='word-break:break-all'>{{$t(i.echartsTitle)}}</p>
                </td>

                <td colspan="3" class=" text-center truncate tableBorder ">
                  <div :id="i.id+'Share'" class="py-3 h-96">
                  </div>
                </td>
            </template>

          </tr>
        </tbody>
        
      </table>
      </div>
      <div class="" style='background:#182A77'>
        <div class="container text-white mx-auto flex flex-col justify-center h-full text-opacity-75 lg:px-10 px-3">
          <div class='flex lg:py-10 pt-4 pb-3 justify-between items-center'>
            <div class="lg:w-1/2">
              <div class="flex">
                <n-link to="">
                  <img class="h-8 lg:h-10" v-show="lang == 'zh'" src="~/assets/img/icon-logo.png" />
                  <img class="h-8 lg:h-10" v-show="lang !== 'zh'" src="~/assets/img/icon-en-logo.png" />
                </n-link>
                <div class="flex-1"></div>
              </div>
              <div class="lg:mt-6 mt-3 flex flex-col ">
                <span class="leading-7">{{$t('Lang.footer')}}</span>
              </div>
            </div>
            <div class='lg:block hidden text-center'>
              <img src="@/assets/imgs/contact.png" class='m-auto' alt="" style='width:90px;height:90px;'>
              <p class='mt-2'>{{$t('Lang.Contact Customer Service')}}</p>
              <p>{{$t('Lang.Get professional data guidance')}}</p>
            </div>
          </div>
          <div class='flex lg:hidden text-left mt-2 mb-4 items-center'>
            <div class='mr-4'>
              <img src="@/assets/imgs/contact.png" alt="" style='width:90px;height:90px;'>
            </div>
            <div >
              <p class='mt-2'>{{$t('Lang.Contact Customer Service')}}</p>
              <p>{{$t('Lang.Get professional data guidance')}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import utils from "@/static/utils";
import { mapGetters } from "vuex";
import echartsUtils from '@/static/echarts-utils.js'
import html2canvas from "html2canvas"


export default {
    data() {
        return {
          nowtime:'',
          Loding:false,
          lang: this.$store.state.locale,
          addNodeFlagTwo:false,
          addNodeFlagThree:false,
          objs:[],
          objsTwoNode:[],
          objsThreeNode:[],
          nodeTwo:'',
          nodeTwoText:'',
          nodeThree:'',
          nodeThreeText:'',
          tableBox:[],
          shareFlag:true,
          miner_no:'',
        }
    },
    asyncData({params,app,redirect}) {
      let data = {
        shareFlag:true,
        nowtime:'',
        totalScore:0,
        miner_no:'',
        tableBox:[
          {subTitle:'Lang.Overall score​',dataList:['','','']},
          {subTitle:'Lang.Operating status',dataList:['','',''],lang:true},
          {subTitle:'Lang.Production Efficiency',dataList:['','',''],lang:true},
          {subTitle:'Lang.New computing power cost',dataList:['','',''],lang:true},
          {subTitle:'Lang.Effective computing power',dataList:['','','']},
          {subTitle:'Lang.Proportion of effective computing power',dataList:['','','']},
          {subTitle:'Lang.Sector size',dataList:['','','']},
          {title:'Lang.Profit analysis'},
          {subTitle:'Lang.Production Efficiency in 24 hours',dataList:['','','']},
          {subTitle:'Lang.24h bursts',dataList:['','','']},
          {subTitle:'Lang.Rewards in 24 hours',dataList:['','','']},
          {echartsTitle:'Lang.Output efficiency trend',echarts:true,id:'outputEfficiency'},
          {title:'Lang.Cost analysis'},
          {subTitle:'Lang.24h Gas used',dataList:['','','']},
          {subTitle:'Lang.24h maintenance Gas',dataList:['','','']},
          {subTitle:'Lang.24h sector pledge',dataList:['','','']},
          {echartsTitle:'Lang.Production Gas Trend',echarts:true,id:'productionGasTrend'},
          {title:'Lang.Burst analysis'},
          {subTitle:'Lang.24h Lucky value',dataList:['','','']},
          {subTitle:'Lang.24h burst rate',dataList:['','','']},
          {echartsTitle:'Lang.Lucky value trend',echarts:true,id:'luckyTrend'},
          {title:'Lang.Wallet'},
          {subTitle:'Lang.workers wallet balance',dataList:['','','']},
          {subTitle:'Lang.Expected to use',dataList:['','','']},
          {subTitle:'Lang.posts wallet balance',dataList:['','','']},
          {subTitle:'Lang.Expected to use',dataList:['','','']},
          {title:'Lang.Gas analysis'},
          {subTitle:'Lang.Gas total cost',dataList:['','','']},
          {subTitle:'Lang.PreCommitSector',dataList:['','','']},
          {subTitle:'Lang.ProveCommitSector',dataList:['','','']},
          {subTitle:'Lang.SubmitWindowedPoSt',dataList:['','','']},
          {subTitle:'Lang.Other',dataList:['','','']},
          {title:'Lang.Message quality analysis'},
          {subTitle:'Lang.PreCommitSector',dataList:['--','','']},
          {subTitle:'Lang.ProveCommitSector',dataList:['--','','']},
          {subTitle:'Lang.SubmitWindowedPoSt',dataList:['--','','']},
        ],
        objs:[],
        user_info:{},
        get_overview:{},
        miner_health_report_24h:{},
        lang:''
      }

      return app.$axios.post("/api/explorer/get_user_info").then(res=>{
        if(res.code == 0){
          data.nowtime = utils.getTime()
          data.user_info = res.data
          data.lang = res.data.lang
          return app.$axios.post("/api/explorer/get_pro_user_info",{
            token: res.data.token
          })
        }
        else{
          redirect(`/${res.data}/account`)
        }
      }).then(res=>{
        if(!res) return
        if(res.code == 0){
          return app.$axios.post("/api/explorer/get_collectible_miner",{
            user_id:data.user_info.user_id
          })
        }
        else{
          redirect(`/${data.lang}/tool/pro`)
        }
      }).then(res=>{
        if(!res || res.code != 0) return
        if(res.data.length !== 0){
          data.miner_no = res.data[0].miner_no
          return app.$axios.post("/api/explorer/miner_health_report_24h",{
            miner_no:data.miner_no
          })
        }else{
          return app.$axios.post('/api/explorer/get_miner_index', {
            method: 'miner'
          })
        }
      }).then(res=>{
        if (!res || res.code != 0) return
        if(!data.miner_no){
          data.miner_no = res.data[0].miner_no
        }
        return app.$axios.post("/api/explorer/miner_health_report_24h",{
          miner_no:data.miner_no
        })
      }).then(res=>{
        if(!res || res.code != 0) return
        data.miner_health_report_24h = res.data

        data.tableBox[4].dataList[0] = utils.formatPower(res.data.power)[0]+' '+utils.formatPower(res.data.power)[1]
        data.tableBox[6].dataList[0] = res.data.sector_size
        data.tableBox[8].dataList[0] = utils.formatTrueFil(res.data.avg_reward)+' F/TiB'
        data.tableBox[9].dataList[0] = res.data.block_count
        data.tableBox[10].dataList[0] = utils.formatEasyFil(res.data.block_reward) 
        data.tableBox[13].dataList[0] = `${utils.formatNewEasyFil(res.data.create_gas)[0]} ${utils.formatNewEasyFil(res.data.create_gas)[1]}/TiB`
        data.tableBox[14].dataList[0] = `${utils.formatNewEasyFil(res.data.keep_gas)[0]} ${utils.formatNewEasyFil(res.data.keep_gas)[1]}/TiB`
        data.tableBox[15].dataList[0] =  utils.formatEasyFil(res.data.pledge_gas)

        data.tableBox[18].dataList[0] = Number(res.data.lucky*100).toFixed(2)+' %'
        data.tableBox[19].dataList[0] = Number(res.data.block_rate*100).toFixed(2)+' %'
        data.tableBox[22].dataList[0] = `${utils.formatEasyFil(res.data.worker_balance)}`
        data.tableBox[24].dataList[0] = `${utils.formatEasyFil(res.data.poster_balance)}`

        return app.$axios.post("/api/explorer/miner_health_report_gas_stat",{
          miner_no:data.miner_no,
          stat_type:'24h'
        })
      }).then(res=>{
        if(!res || res.code != 0) return
        data.tableBox[27].dataList[0] = utils.formatEasyFil(res.data.total_gas)
        data.tableBox[28].dataList[0] = utils.formatEasyFil(res.data.PreCommitSector)
        data.tableBox[29].dataList[0] = utils.formatEasyFil(res.data.ProveCommitSector)
        data.tableBox[30].dataList[0] = utils.formatEasyFil(res.data.SubmitWindowedPoSt)
        data.tableBox[31].dataList[0] = utils.formatEasyFil(res.data.other_gas)

        return app.$axios.post("/api/explorer/miner_health_report_wallet_estimated_day",{
          miner_no:data.miner_no,
        })
      }).then(res=>{
        if(!res || res.code != 0) return
        if(res.data.worker_estimated_day == '-1'){
          switch (data.lang) {
            case 'zh':
              data.tableBox[23].dataList[0] = `∞ 天`
              break;
            case 'en':
              data.tableBox[23].dataList[0] = `∞ days`
              break;
            case 'ko':
              data.tableBox[23].dataList[0] = `∞ 일`
              break;
            case 'ja':
              data.tableBox[23].dataList[0] = `∞ 日間`
              break;
          }
          
        }else{
          switch (data.lang) {
            case 'zh':
              data.tableBox[23].dataList[0] = `${res.data.worker_estimated_day} 天`
              break;
            case 'en':
              data.tableBox[23].dataList[0] = `${res.data.worker_estimated_day} days`
              break;
            case 'ko':
              data.tableBox[23].dataList[0] = `${res.data.worker_estimated_day} 일`
              break;
            case 'ja':
              data.tableBox[23].dataList[0] = `${res.data.worker_estimated_day} 日間`
              break;
          }
        }

        if(res.data.poster_estimated_day == '-1'){
          switch (data.lang) {
            case 'zh':
              data.tableBox[25].dataList[0] = `∞ 天`
              break;
            case 'en':
              data.tableBox[25].dataList[0] = `∞ days`
              break;
            case 'ko':
              data.tableBox[25].dataList[0] = `∞ 일`
              break;
            case 'ja':
              data.tableBox[25].dataList[0] = `∞ 日間`
              break;
          }
        }else{
          switch (data.lang) {
            case 'zh':
              data.tableBox[25].dataList[0] = `${res.data.poster_estimated_day} 天`
              break;
            case 'en':
              data.tableBox[25].dataList[0] = `${res.data.poster_estimated_day} days`
              break;
            case 'ko':
              data.tableBox[25].dataList[0] = `${res.data.poster_estimated_day} 일`
              break;
            case 'ja':
              data.tableBox[25].dataList[0] = `${res.data.poster_estimated_day} 日間`
              break;
          }
        }

        data.totalScore = data.totalScore + Number(res.data.wallet_score)
        

        return app.$axios.post("/api/explorer/get_miner_health_report_stats",{
          miner_no:data.miner_no,
        })
      }).then(res=>{
         if(!res || res.code != 0) return
        switch (res.data.status_dict.status) {
          case '1':
            data.tableBox[1].dataList[0] = `Lang.Normal`
            break;
          case '2':
            data.tableBox[1].dataList[0] = `Lang.Well`
            break;
          case '3':
            data.tableBox[1].dataList[0] = `Lang.Abnormal`
            break;
        }
        switch (res.data.avg_reward_dict.status) {
          case '1':
            data.tableBox[2].dataList[0] = `Lang.Very efficient`
            break;
          case '2':
            data.tableBox[2].dataList[0] = `Lang.Excellent`
            break;
          case '3':
            data.tableBox[2].dataList[0] = `Lang.Medium`
            break;
          case '3':
            data.tableBox[2].dataList[0] = `Lang.Inefficient`
            break;
        }
        switch (res.data.cost_dict.status) {
          case '1':
            data.tableBox[3].dataList[0] = `Lang.Very low`
            break;
          case '2':
            data.tableBox[3].dataList[0] = `Lang.Low`
            break;
          case '3':
            data.tableBox[3].dataList[0] = `Lang.Medium`
            break;
          case '4':
            data.tableBox[3].dataList[0] = `Lang.High`
            break;
        }

        data.totalScore = data.totalScore + Number(res.data.avg_reward_dict.score) + Number(res.data.cost_dict.score) + Number(res.data.status_dict.score)

        return app.$axios.post("/api/explorer/miner_health_report_days",{
          miner_no:data.miner_no,
        })
      }).then(res=>{
        if(!res || res.code != 0) return
        data.objs = res.data.objs
        
        let point = ''
        switch (data.lang) {
          case 'zh':
            point = '分'
            break;
          case 'en':
            point = 'Points'
            break;
          case 'ko':
            point = '점'
            break;
          case 'ja':
            point = 'ポイント'
            break;
        }
        data.totalScore = data.totalScore + Number(res.data.gas_score) + Number(res.data.lucky_score) +' '+ point

        data.tableBox[0].dataList[0] = data.totalScore
        return app.$axios.post('/api/explorer/get_overview', {}, { progress: false })
      }).then(res=>{
         if(!res || res.code != 0) return
        data.get_overview = res.data

        data.tableBox[5].dataList[0] = ((data.miner_health_report_24h.power / res.data.power)*100).toFixed(2)+' %'

        data.shareFlag = false

        return data
      })
    },
    beforeMount(){
      this.$axios.post("/api/explorer/miner_health_report_messages_stat",{
        miner_no:this.miner_no,
        stat_type:'24h'
      }).then(res=>{

        if(!res || res.code != 0) return
        let langText = {
          count:'',
          error_countok_count:'',
          error_count:'',
          Success:'',
        }

        switch (this.lang) {
          case 'zh':
            langText = {
              count:'消息总数',
              ok_count:'有效数',
              error_count:'无效数',
              Success:'成功率',
            }
            break;
          case 'en':
            langText = {
              count:'Total',
              ok_count:'Active',
              error_count:'Fail',
              Success:'Success rate',
            }
            break;
          case 'ko':
            langText = {
              count:'합계',
              ok_count:'유효한',
              error_count:'실패',
              Success:'성공률',
            }
            break;
          case 'ja':
            langText = {
              count:'総数',
              ok_count:'効果の',
              error_count:'失敗',
              Success:'成功率',
            }
            break;
        }
        this.tableBox[33].dataList.splice(0,1,`${langText.count}${res.data.PreCommitSector.count}  ${langText.ok_count}${res.data.PreCommitSector.ok_count} ${langText.error_count}${res.data.PreCommitSector.error_count} ${langText.Success} ${utils.GetPercent(res.data.PreCommitSector.ok_count,res.data.PreCommitSector.count)}` )
        this.tableBox[34].dataList.splice(0,1,`${langText.count}${res.data.ProveCommitSector.count}  ${langText.ok_count}${res.data.ProveCommitSector.ok_count} ${langText.error_count}${res.data.ProveCommitSector.error_count} ${langText.Success} ${utils.GetPercent(res.data.ProveCommitSector.ok_count,res.data.ProveCommitSector.count)}` )
        this.tableBox[35].dataList.splice(0,1,`${langText.count}${res.data.SubmitWindowedPoSt.count}  ${langText.ok_count}${res.data.SubmitWindowedPoSt.ok_count} ${langText.error_count}${res.data.SubmitWindowedPoSt.error_count} ${langText.Success} ${utils.GetPercent(res.data.SubmitWindowedPoSt.ok_count,res.data.SubmitWindowedPoSt.count)}`)  
      })

    },
    mounted(){
      
      this.outputEfficiencyEchart()
      this.luckyTrendEchart()
      this.productionGasTrendEchart()

      this.outputEfficiencyEchartShare()
      this.luckyTrendEchartShare()
      this.productionGasTrendEchartShare()

    },
    computed: {
      ...mapGetters({
        globalOverview: 'getGlobalOverview',
      }),
    },
    methods: {
      enterKey(){
        return false
      },
      back(){
        this.$router.push(`/${this.lang}/`)
      },
      addNodeTwo(){
        this.addNodeFlagTwo = true
      },
      okTwo(){
        let lang_errTitle = '',
            lang_errMsg_empyt = '',
            lang_errMsg_repeat = '',
            lang_errMsg_nonExistent = '';

        switch (this.lang) {
          case 'zh':
            lang_errTitle = '错误'
            lang_errMsg_empyt = '存储供应商不能为空'
            lang_errMsg_repeat = '请勿添加重复存储供应商'
            lang_errMsg_nonExistent = '存储供应商不存在';
            break;
          case 'en':
            lang_errTitle = 'Error'
            lang_errMsg_empyt = 'Storage Provider cannot be empty'
            lang_errMsg_repeat = 'Do not add duplicate Storage Provider'
            lang_errMsg_nonExistent = 'Storage Provider does not exist';
            break;
          case 'ko':
            lang_errTitle = '오류'
            lang_errMsg_empyt = '저장 공급자는 비워 둘 수 없습니다'
            lang_errMsg_repeat = '중복 저장 공급자를 추가하지 마십시오'
            lang_errMsg_nonExistent = '저장 공급자가 없습니다';
            break;
          case 'ja':
            lang_errTitle = 'エラー'
            lang_errMsg_empyt = 'ストレージベンダーを空にすることはできません'
            lang_errMsg_repeat = '重複するストレージベンダーを追加しないでください'
            lang_errMsg_nonExistent = 'ストレージベンダーが存在しません';
            break;
        }
        if(this.nodeTwo == '' || utils.trim(this.nodeTwo) == ''){
          this.$notification.error({
            title: lang_errTitle,
            message: lang_errMsg_empyt
          });
          return
        }
        if(this.nodeTwo == this.miner_no || this.nodeTwo == this.nodeThreeText){
          this.$notification.error({
            title: lang_errTitle,
            message: lang_errMsg_repeat
          });
          return
        }
        this.Loding = true
        this.$axios.post("/api/explorer/get_miner_index",{
          miner_no : utils.trim(this.nodeTwo) 
        }).then(res=>{

          if(res.code !== 0){
            this.$notification.error({
              title: lang_errTitle,
              message: lang_errMsg_nonExistent,
            });
            this.Loding = false
          }else{
            this.addNodeOk(utils.trim(this.nodeTwo),1)
          }
        })
      },
      addNodeThree(){
        this.addNodeFlagThree = true
      },
      okThree(){
        let lang_errTitle = '',
            lang_errMsg_empyt = '',
            lang_errMsg_repeat = '',
            lang_errMsg_nonExistent = '';

        switch (this.lang) {
          case 'zh':
            lang_errTitle = '错误'
            lang_errMsg_empyt = '存储供应商不能为空'
            lang_errMsg_repeat = '请勿添加重复存储供应商'
            lang_errMsg_nonExistent = '存储供应商不存在';
            break;
          case 'en':
            lang_errTitle = 'Error'
            lang_errMsg_empyt = 'Storage Provider cannot be empty'
            lang_errMsg_repeat = 'Do not add duplicate Storage Provider'
            lang_errMsg_nonExistent = 'Storage Provider does not exist';
            break;
          case 'ko':
            lang_errTitle = '오류'
            lang_errMsg_empyt = '저장 공급자는 비워 둘 수 없습니다'
            lang_errMsg_repeat = '중복 저장 공급자를 추가하지 마십시오'
            lang_errMsg_nonExistent = '저장 공급자가 없습니다';
            break;
          case 'ja':
            lang_errTitle = 'エラー'
            lang_errMsg_empyt = 'ストレージベンダーを空にすることはできません'
            lang_errMsg_repeat = '重複するストレージベンダーを追加しないでください'
            lang_errMsg_nonExistent = 'ストレージベンダーが存在しません';
            break;
        }
        if(this.nodeThree == '' || utils.trim(this.nodeThree) == ''){
          this.$notification.error({
            title:lang_errTitle,
            message:lang_errMsg_empyt
          });
          return
        }
        if(this.nodeThree == this.miner_no || this.nodeThree == this.nodeTwoText){
          this.$notification.error({
            title: lang_errTitle,
            message: lang_errMsg_repeat
          });
          return
        }
        this.Loding = true
        this.$axios.post("/api/explorer/get_miner_index",{
          miner_no : utils.trim(this.nodeThree) 
        }).then(res=>{
          if(res.code !== 0){
            this.$notification.error({
              title: lang_errTitle,
              message: lang_errMsg_nonExistent,
            });
            this.Loding = false
          }else{
            this.addNodeOk(utils.trim(this.nodeThree),2)
          }
        })
        
      },
      addNodeOk(miner_no,index){
        if(index == 1){
            this.nodeTwoText = miner_no
        }
        if(index == 2){
          this.nodeThreeText = miner_no
        }
        Promise.all([
          this.$axios.post("/api/explorer/miner_health_report_24h",{
            miner_no : miner_no
          }),
          this.$axios.post("/api/explorer/miner_health_report_gas_stat",{
            miner_no : miner_no,
            stat_type : '24h'
          }),
          this.$axios.post("/api/explorer/miner_health_report_wallet_estimated_day",{
            miner_no : miner_no,
          }),
          this.$axios.post("/api/explorer/get_miner_health_report_stats",{
            miner_no:miner_no,
          }),
          this.$axios.post("/api/explorer/miner_health_report_days",{
            miner_no:miner_no,
          })
        ]).then(res=>{
          if (this.lang == "zh") {
            this.$notification.success({
              title: "成功",
              message: "添加成功",
            });
          } else if (this.lang == "en") {
            this.$notification.success({
              title: "Success",
              message: "Added successfully",
            });
          } else if (this.lang == "ja") {
            this.$notification.success({
              title: "成功",
              message: "追加成功",
            });
          } else {
            this.$notification.success({
              title: "성공",
              message: "추가 성공",
            });
          }
          this.tableBox[4].dataList.splice(index,1,utils.formatPower(res[0].data.power)[0]+' '+utils.formatPower(res[0].data.power)[1]) 
          this.tableBox[5].dataList.splice(index,1,((res[0].data.power  / this.get_overview.power)*100).toFixed(2)+' %')
          this.tableBox[6].dataList.splice(index,1,res[0].data.sector_size) 
          this.tableBox[8].dataList.splice(index,1,utils.formatTrueFil(res[0].data.avg_reward)+' F/TiB') 
          this.tableBox[9].dataList.splice(index,1,res[0].data.block_count) 
          this.tableBox[10].dataList.splice(index,1, utils.formatEasyFil(res[0].data.block_reward) ) 
          this.tableBox[13].dataList.splice(index,1,`${utils.formatNewEasyFil(res[0].data.create_gas)[0]} ${utils.formatNewEasyFil(res[0].data.create_gas)[1]}/TiB`) 
          this.tableBox[14].dataList.splice(index,1,`${utils.formatNewEasyFil(res[0].data.keep_gas)[0]} ${utils.formatNewEasyFil(res[0].data.keep_gas)[1]}/TiB`) 

          this.tableBox[15].dataList.splice(index,1,utils.formatEasyFil(res[0].data.pledge_gas))

          this.tableBox[18].dataList.splice(index,1, Number(res[0].data.lucky*100).toFixed(2)+' %') 
          this.tableBox[19].dataList.splice(index,1, Number(res[0].data.block_rate).toFixed(2)+' %') 
          this.tableBox[22].dataList.splice(index,1,`${utils.formatEasyFil(res[0].data.worker_balance)}`) 
          this.tableBox[24].dataList.splice(index,1,`${utils.formatEasyFil(res[0].data.poster_balance)}`) 

          this.tableBox[27].dataList.splice(index,1,utils.formatEasyFil(res[1].data.total_gas)) 
          this.tableBox[28].dataList.splice(index,1,utils.formatEasyFil(res[1].data.PreCommitSector)) 
          this.tableBox[29].dataList.splice(index,1,utils.formatEasyFil(res[1].data.ProveCommitSector)) 
          this.tableBox[30].dataList.splice(index,1,utils.formatEasyFil(res[1].data.SubmitWindowedPoSt)) 
          this.tableBox[31].dataList.splice(index,1,utils.formatEasyFil(res[1].data.other_gas)) 

          let lang_days = ''
          switch (this.lang) {
            case 'zh':
              lang_days = '天'
              break;
            case 'en':
              lang_days = 'days'
              break;
            case 'ko':
              lang_days = '일'
              break;
            case 'ja':
              lang_days = '日間'
              break;
          }

          if(res[2].data.worker_estimated_day == '-1'){
            this.tableBox[23].dataList.splice(index,1,`∞ ${lang_days}`) 
          }else{
            this.tableBox[23].dataList.splice(index,1,`${res[2].data.worker_estimated_day} ${lang_days}`) 
          }

          if(res[2].data.poster_estimated_day == '-1'){
            this.tableBox[25].dataList.splice(index,1,`∞ ${lang_days}`) 
          }else{
            this.tableBox[25].dataList.splice(index,1,`${res[2].data.poster_estimated_day} ${lang_days}`) 
          }

          switch (res[3].data.status_dict.status) {
            case '1':
              this.tableBox[1].dataList.splice(index,1,`Lang.Normal`)
              break;
            case '2':
              this.tableBox[1].dataList.splice(index,1,`Lang.Well`)
              break;
            case '3':
              this.tableBox[1].dataList.splice(index,1,`Lang.Abnormal`)
              break;
          }
          switch (res[3].data.avg_reward_dict.status) {
            case '1':
              this.tableBox[2].dataList.splice(index,1,`Lang.Very efficient`)
              break;
            case '2':
              this.tableBox[2].dataList.splice(index,1,`Lang.Excellent`)
              break;
            case '3':
              this.tableBox[2].dataList.splice(index,1,`Lang.Medium`)
              break;
            case '4':
              this.tableBox[2].dataList.splice(index,1,`Lang.Inefficient`)
              break;
          }
          switch (res[3].data.cost_dict.status) {
            case '1':
              this.tableBox[3].dataList.splice(index,1,`Lang.Very low`)
              break;
            case '2':
              this.tableBox[3].dataList.splice(index,1,`Lang.Low`)
              break;
            case '3':
              this.tableBox[3].dataList.splice(index,1,`Lang.Medium`)
              break;
            case '4':
              this.tableBox[3].dataList.splice(index,1,`Lang.High`)
              break;
          }

          this.Loding = false
          this.addNodeFlagTwo = false
          this.addNodeFlagThree = false

          this.nodeTwo = ''
          this.nodeThree = ''

          if(index == 1){
            this.objsTwoNode = res[4].data.objs
          }
          if(index == 2){
            this.objsThreeNode = res[4].data.objs
          }
          this.outputEfficiencyEchart()
          this.luckyTrendEchart()
          this.productionGasTrendEchart()

          this.outputEfficiencyEchartShare()
          this.luckyTrendEchartShare()
          this.productionGasTrendEchartShare()


          let point = ''
          switch (this.lang) {
            case 'zh':
              point = '分'
              break;
            case 'en':
              point = 'Points'
              break;
            case 'ko':
              point = '점'
              break;
            case 'ja':
              point = 'ポイント'
              break;
          }

          this.tableBox[0].dataList.splice(index,1,Number(res[3].data.avg_reward_dict.score)+ Number(res[3].data.cost_dict.score)+ Number(res[3].data.status_dict.score)+ Number(res[2].data.wallet_score) +  Number(res[4].data.gas_score) + Number(res[4].data.lucky_score) + ' ' + point ) 
          
        })

        this.tableBox[33].dataList.splice(index,1,'--')
        this.tableBox[34].dataList.splice(index,1,'--')
        this.tableBox[35].dataList.splice(index,1,'--')

        this.$axios.post("/api/explorer/miner_health_report_messages_stat",{
          miner_no:miner_no,
          stat_type:'24h'
        }).then(res=>{
          let langText = {
            count:'',
            error_countok_count:'',
            error_count:'',
            Success:'',
          }

          switch (this.lang) {
            case 'zh':
              langText = {
                count:'消息总数',
                ok_count:'有效数',
                error_count:'无效数',
                Success:'成功率',
              }
              break;
            case 'en':
              langText = {
                count:'Total',
                ok_count:'Active',
                error_count:'Fail',
                Success:'Success rate',
              }
              break;
            case 'ko':
              langText = {
                count:'합계',
                ok_count:'유효한',
                error_count:'실패',
                Success:'성공률',
              }
              break;
            case 'ja':
              langText = {
                count:'総数',
                ok_count:'効果の',
                error_count:'失敗',
                Success:'成功率',
              }
              break;
          }
          this.tableBox[33].dataList.splice(index,1,`${langText.count}${res.data.PreCommitSector.count}  ${langText.ok_count}${res.data.PreCommitSector.ok_count} ${langText.error_count}${res.data.PreCommitSector.error_count} ${langText.Success} ${utils.GetPercent(res.data.PreCommitSector.ok_count,res.data.PreCommitSector.count)}` ) 
          this.tableBox[34].dataList.splice(index,1,`${langText.count}${res.data.ProveCommitSector.count}  ${langText.ok_count}${res.data.ProveCommitSector.ok_count} ${langText.error_count}${res.data.ProveCommitSector.error_count} ${langText.Success} ${utils.GetPercent(res.data.ProveCommitSector.ok_count,res.data.ProveCommitSector.count)}` )   
          this.tableBox[35].dataList.splice(index,1,`${langText.count}${res.data.SubmitWindowedPoSt.count}  ${langText.ok_count}${res.data.SubmitWindowedPoSt.ok_count} ${langText.error_count}${res.data.SubmitWindowedPoSt.error_count} ${langText.Success} ${utils.GetPercent(res.data.SubmitWindowedPoSt.ok_count,res.data.SubmitWindowedPoSt.count)}`)  
        })

      },
      clearTableList(index){
        if(index == 1){
          this.nodeTwoText = ''
          this.objsTwoNode = []
        }
        if(index == 2){
          this.nodeThreeText = ''
          this.objsThreeNode = []
        }
        this.outputEfficiencyEchart()
        this.luckyTrendEchart()
        this.productionGasTrendEchart()

        this.luckyTrendEchart()
        this.productionGasTrendEchart()


        for(let i=0;i<this.tableBox.length;i++){
          if(this.tableBox[i].subTitle){
            this.tableBox[i].dataList.splice(index,1,'')
          }
        }
      },
      outputEfficiencyEchart(){
        this.$echarts.init(document.getElementById('outputEfficiency')).dispose();

        let y1 = [],
          y2 = [],
          y3 = [],
          date = [],
          echartTitle = [];

        echartTitle = [`${this.miner_no}`,`${this.nodeTwoText}`,`${this.nodeThreeText}`]

        this.objs.map(item => {
          y1.unshift( utils.formatTrueFil(item.avg_reward) )
          date.unshift(item.date)
        })

        if(this.objsTwoNode.length !== 0){
          this.objsTwoNode.map(i=>{
            y2.unshift( utils.formatTrueFil(i.avg_reward) )
          })
        }
        if(this.objsThreeNode.length !== 0){
          this.objsThreeNode.map(i=>{
            y3.unshift( utils.formatTrueFil(i.avg_reward) )
          })
        }


        let echarts = this.$echarts.init(document.getElementById('outputEfficiency'))
        echarts.setOption(echartsUtils.outputEfficiencyEchart({
          y1,
          y2,
          y3,
          date,
          echartTitle
        }))
        window.addEventListener("resize", () => {
          echarts.resize();
        });
      },
      outputEfficiencyEchartShare(){
        this.$echarts.init(document.getElementById('outputEfficiencyShare')).dispose();

        let y1 = [],
          y2 = [],
          y3 = [],
          date = [],
          echartTitle = [];

        echartTitle = [`${this.miner_no}`,`${this.nodeTwoText}`,`${this.nodeThreeText}`]

        this.objs.map(item => {
          y1.unshift( utils.formatTrueFil(item.avg_reward) )
          date.unshift(item.date)
        })

        if(this.objsTwoNode.length !== 0){
          this.objsTwoNode.map(i=>{
            y2.unshift( utils.formatTrueFil(i.avg_reward) )
          })
        }
        if(this.objsThreeNode.length !== 0){
          this.objsThreeNode.map(i=>{
            y3.unshift( utils.formatTrueFil(i.avg_reward) )
          })
        }


        let echarts = this.$echarts.init(document.getElementById('outputEfficiencyShare'))
        echarts.setOption(echartsUtils.outputEfficiencyEchart({
          y1,
          y2,
          y3,
          date,
          echartTitle
        }))
        window.addEventListener("resize", () => {
          echarts.resize();
        });
      },
      productionGasTrendEchart(){
        this.$echarts.init(document.getElementById('productionGasTrend')).dispose();
        let y1 = [],
          y2 = [],
          y3 = [],
          date = [],
          echartTitle = [];

          echartTitle = [`${this.miner_no}`,`${this.nodeTwoText}`,`${this.nodeThreeText}`]

          this.objs.map(item => {
            y1.unshift(utils.formatTrueFil(item.create_gas))
            date.unshift(item.date)

          })

          if(this.objsTwoNode.length !== 0){
            this.objsTwoNode.map(i=>{
              y2.unshift(utils.formatTrueFil(i.create_gas))
            })
          }
          if(this.objsThreeNode.length !== 0){
            this.objsThreeNode.map(i=>{
              y3.unshift(utils.formatTrueFil(i.create_gas))
            })
          }
          let echarts = this.$echarts.init(document.getElementById('productionGasTrend'))

          echarts.setOption(echartsUtils.outputEfficiencyEchart({
            y1,
            y2,
            y3,
            date,
            echartTitle
          }))
          window.addEventListener("resize", () => {
            echarts.resize();
          });
      },
      productionGasTrendEchartShare(){
        this.$echarts.init(document.getElementById('productionGasTrendShare')).dispose();

        let y1 = [],
          y2 = [],
          y3 = [],
          date = [],
          echartTitle = [];

          echartTitle = [`${this.miner_no}`,`${this.nodeTwoText}`,`${this.nodeThreeText}`]


          this.objs.map(item => {
            y1.unshift(utils.formatTrueFil(item.create_gas))
            date.unshift(item.date)
          })

          if(this.objsTwoNode.length !== 0){
            this.objsTwoNode.map(i=>{
              y2.unshift(utils.formatTrueFil(i.create_gas))
            })
          }
          if(this.objsThreeNode.length !== 0){
            this.objsThreeNode.map(i=>{
              y3.unshift(utils.formatTrueFil(i.create_gas))
            })
          }
          let echarts = this.$echarts.init(document.getElementById('productionGasTrendShare'))

          echarts.setOption(echartsUtils.outputEfficiencyEchart({
            y1,
            y2,
            y3,
            date,
            echartTitle
          }))
          window.addEventListener("resize", () => {
            echarts.resize();
          });
      },
      luckyTrendEchart(){
        this.$echarts.init(document.getElementById('luckyTrend')).dispose();

        let y1 = [],
          y2 = [],
          y3 = [],
          date = [],
          echartTitle = [];

          echartTitle = [`${this.miner_no}`,`${this.nodeTwoText}`,`${this.nodeThreeText}`]


          this.objs.map(item => {
            y1.unshift((item.lucky*100).toFixed(2))
            date.unshift(item.date)
          })

          if(this.objsTwoNode.length !== 0){
            this.objsTwoNode.map(i=>{
              y2.unshift((i.lucky*100).toFixed(2))
            })
          }
          if(this.objsThreeNode.length !== 0){
            this.objsThreeNode.map(i=>{
              y3.unshift((i.lucky*100).toFixed(2))
            })
          }
          let echarts = this.$echarts.init(document.getElementById('luckyTrend'))

          echarts.setOption(echartsUtils.luckyTrendEchart({
            y1,
            y2,
            y3,
            date,
            echartTitle
          }))
          window.addEventListener("resize", () => {
            echarts.resize();
          });
      },
      luckyTrendEchartShare(){
        this.$echarts.init(document.getElementById('luckyTrendShare')).dispose();

        let y1 = [],
          y2 = [],
          y3 = [],
          date = [],
          echartTitle = [];

          echartTitle = [`${this.miner_no}`,`${this.nodeTwoText}`,`${this.nodeThreeText}`]

          this.objs.map(item => {
            y1.unshift((item.lucky*100).toFixed(2))
            date.unshift(item.date)
          })

          if(this.objsTwoNode.length !== 0){
            this.objsTwoNode.map(i=>{
              y2.unshift((i.lucky*100).toFixed(2))
            })
          }
          if(this.objsThreeNode.length !== 0){
            this.objsThreeNode.map(i=>{
              y3.unshift((i.lucky*100).toFixed(2))
            })
          }
          let echarts = this.$echarts.init(document.getElementById('luckyTrendShare'))

          echarts.setOption(echartsUtils.luckyTrendEchart({
            y1,
            y2,
            y3,
            date,
            echartTitle
          }))
          window.addEventListener("resize", () => {
            echarts.resize();
          });
      },
          scareBtn(){
      this.imgUrl = ''
      this.shareFlag = true
      let that = this
      setTimeout(()=>{
        let myBox = this.$refs.shareNodeComparison;
        let htmlDom = document.getElementById('shareNodeComparison')
        html2canvas(myBox, {
          width: htmlDom.clientWidth,
          height: htmlDom.clientHeight,
          scrollY: 0, 
          scrollX: 0,
          scale:window.devicePixelRatio*4,
        }).then(function(canvas) {
          that.imgLoading = false
          let data = canvas.toDataURL("image/jpeg", 0.4);
            that.imgUrl = data
            that.toImage()
        });
      },1000)

      
    },
    toImage() {
      this.shareFlag = false
      let that = this
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
        a.download = '存储供应商对比';
        a.href = url; 
        a.dispatchEvent(event); 
      };
      image.src = this.imgUrl;
    },
    },
};
</script>

<style lang="scss" >
.tableBorder{
    border-right: 1px solid #E8E7EB;
    border-bottom: 1px solid #E8E7EB;
}
.login-el-input {
  font-size: 12px;

  .el-input__inner {
    height: 4rem;
    background-color: transparent;
  }

  .el-select .el-input {
    width: 90px;
  
  }
}
.el-dialog__footer {
  .el-button {
    height: 2.5rem;
    width: 24%;
  }
}

#shareNodeComparison{
  width: 1480px;
  position:fixed;
  left: 0;
  top: -99999px;
}
</style>