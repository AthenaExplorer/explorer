<template>
  <div class=''>
    <template v-if="type == 'shot'">
      <div class='flex items-center justify-between lg:mb-0 mb-2' >
        <div class="flex items-center lg:h-16  ">
          <span class="lg:text-lg font-medium text-dark">{{$t('Lang.Account')}}</span>
          <span class="lg:text-lg font-medium text-dark ml-1 mr-3">{{ miner_no }}</span>
          <div v-if="tagShowFlag">
            <template v-if="globalMinerTag[miner_no]">
              <div class="border border-solid border-E8E7EB rounded lg:mx-3 mx-0 lg:my-0 my-2 flex items-center">
                <span class="mx-3 text-75737F">{{globalMinerTag[miner_no].en_tag}}</span>
                <img v-show="globalMinerTag[miner_no].signed"  src="@/assets/imgs/isSigned.png"  alt=""  class='mr-2'  style='width:12px;height:12px'>
              </div>
            </template>
          </div>
          <div class='cursor-pointer lg:block hidden ml-3' @click="changeTag" style='color:rgba(51, 63, 198, 1)'>{{$t(dialogTitle)}}<i class="el-icon-arrow-right"></i></div>
        </div>

        <div class='flex'>
          <div class='collectionBox items-start mr-4 lg:flex hidden' @click='scareBtn'>
            <img src="../../../../assets/imgs/share.png" alt="" class='mr-2 collection-false' style='height:14px'>
            <span>{{$t('Lang.Share')}}</span>
          </div>

          <div class='collectionBox flex items-start' @click='goSignIn' v-show="!isSignIn">
            <img src="../../../../assets/imgs/collection-false.png" alt="" class='mr-2 collection-false' style='height:14px'>
            <span>{{$t('Lang.Collect')}}</span>
          </div>

          <div class='collectionBox flex items-start' @click='changeCollection' v-show="isSignIn">
            <img v-show="!collectionFlag" src="../../../../assets/imgs/collection-false.png" alt="" class='mr-2 collection-false' style='height:14px'>
            <img v-show="collectionFlag" src="../../../../assets/imgs/collection-true.png" alt="" class='mr-2 collection-false' style='height:14px'>
            <span v-show="!collectionFlag">{{$t('Lang.Collect')}}</span>
            <span v-show="collectionFlag">{{$t('Lang.Collected')}}</span>
          </div>
        </div>

      </div>
      <div class="lg:flex">
        <div class="flex-1 lg:border-0 border border-solid border-E8E7EB bg-white rounded-md">
          <div class="flex items-center h-16 lg:h-20 px-3 lg:px-6 border-b border-solid border-E8E7EB">
            <span class="lg:text-lg font-medium text-dark">{{$t('Lang.Wallet overview')}}</span>
          </div>
          <div class="flex justify-center items-center">
            <div class="pb-3 lg:pb-0 w-3/5">
              <ul class="px-3 lg:px-6">
                <li class=" lg:mt-0 mt-6 mb-6">
                  <p><span class="mr-3">{{$t('Lang.Account Balance')}}</span></p>
                  <p class='text-2xl'>
                    <span class="ml-auto">{{minerData.total_balance | formatTrueFil(false)}}</span>
                    <span class="ml-2">F</span>
                  </p>
                </li>
                <li class="my-3 flex ">
                  <div class='flex items-center' :class="{'w-30':lang == 'zh'}">
                    <div class='inline-block w-3 h-3 rouned-lg mr-2 ' style='background:#0EEACE'></div>
                    <span class="mr-3">{{$t('Lang.Available Balance')}}：</span>
                  </div>
                  <div>
                    <span class="ml-auto">{{minerData.available_balance | formatTrueFil(false)}}</span>
                    <span class="ml-2">F</span>
                  </div>
                </li>
                <li class="my-3 flex">
                  <div class='flex items-center' :class="{'w-30':lang == 'zh'}">
                    <div class='inline-block w-3 h-3 bg-red-500 rouned-lg mr-2' style='background:#B19DE6'></div>
                    <span class="mr-3">{{$t('Lang.Sector pledge')}}：</span>
                  </div>
                  <div>
                    <span class="ml-auto">{{minerData.initial_pledge_balance | formatTrueFil(false)}}</span>
                    <span class="ml-2">F</span>
                  </div>
                </li>
                <li class="my-3 flex">
                  <div class='flex items-center' :class="{'w-30':lang == 'zh'}">
                    <div class='inline-block w-3 h-3 bg-red-500 rouned-lg mr-2' style='background:#F5D298'></div>
                    <span class="mr-3">{{$t('Lang.Reward lock-up')}}：</span>
                  </div>
                  <div>
                    <span class="ml-auto">{{minerData.locked_balance | formatTrueFil(false)}}</span>
                    <span class="ml-2">F</span>
                  </div>
                </li>
                <li class="flex">
                  <div class='flex items-center' :class="{'w-30':lang == 'zh'}">
                    <div class='inline-block w-3 h-3 bg-red-500 rouned-lg mr-2' style='background:#9CCFFF'></div>
                    <span class="mr-3">{{$t('Lang.Advance deposit')}}：</span>
                  </div>
                  <div>
                    <span class="ml-auto">{{minerData.precommit_deposits_balance | formatTrueFil(false)}}</span>
                    <span class="ml-2">F</span>
                  </div>
                </li>
              </ul>
            </div> 
            <div id="echartsMinerBalance" class="w-2/5 h-48 lg:h-64 pt-3"></div>
          </div>
        </div>
        <div class="w-3 h-full hidden lg:block"></div>
        <div class="mt-3 lg:mt-0 flex-1 lg:border-0 border border-solid border-E8E7EB bg-white rounded-md">
          <div class="flex items-center h-16 lg:h-20 px-3 lg:px-6 border-b border-solid border-E8E7EB">
            <span class="lg:text-lg font-medium text-dark">{{$t('Lang.Hash power overview')}}</span>
          </div>
          <ul class="w-full lg:h-64 px-3 lg:px-6 py-0 lg:py-3">
            <li class="lg:mt-6 mt-6 mb-6">
              <p>
                <span class="mr-3">{{$t('Lang.Effective computing power')}}</span>
                <el-popover placement="right" trigger="hover">
                  <p>{{$t('Lang.Effective computing power')}} {{minerData.actual_power | formatPower(2)[0]}} {{minerData.actual_power | formatPower(2)[1]}}</p>
                  <p>{{$t('Lang.Original computing power')}} {{minerData.raw_power | formatPower(2)[0]}} {{minerData.raw_power | formatPower(2)[1]}}</p>
                  <i class="el-icon-info cursor-pointer text-gray-500 text-base" slot="reference"></i>
                </el-popover>
              </p>
              <div class='text-2xl flex justify-between'>
                <div>
                  <span class="ml-auto">{{minerData.actual_power | formatPower(2)[0]}}</span>
                  <span class="ml-2">{{minerData.actual_power | formatPower(2)[1]}}</span>
                </div>
                <div class='flex items-end text-lg'>
                  <p class='mr-6'>{{$t('Lang.Proportion')}}:{{(minerData.actual_power/globalOverview.power) | formatPercentage}} </p>
                  <p>{{$t('Lang.Rank')}}:{{minerData.ranking}}</p>
                </div>
              </div>
            </li>
            <li class="my-3 flex justify-between items-center">
              <div class="flex justify-center items-center">
                <div class="text-848599 mr-6">
                  <span>{{$t('Lang.Original computing power')}}:</span>
                  <el-popover placement="right" trigger="hover">
                    <p>{{$t('Lang.Effective computing power')}} {{minerData.actual_power | formatPower(2)[0]}} {{minerData.actual_power | formatPower(2)[1]}}</p>
                    <p>{{$t('Lang.Original computing power')}} {{minerData.raw_power | formatPower(2)[0]}} {{minerData.raw_power | formatPower(2)[1]}}</p>
                    <i class="el-icon-info cursor-pointer text-gray-500 text-base" slot="reference"></i>
                  </el-popover>
                </div>
                <div>
                  <span class="lg:text-lg">{{minerData.raw_power | formatPower(2)[0]}}</span>
                  <span>{{minerData.raw_power | formatPower(2)[1]}}</span>
                </div>
              </div>
              <div class="flex justify-center items-end">
                <div class="text-848599 text-right mr-6">{{$t('Lang.Sector size')}}:</div>
                <div>
                  <span class="lg:text-lg">{{minerData.sector_size | formatPower(0)[0]}}</span>
                  <span>{{minerData.sector_size | formatPower(0)[1]}}</span>
                </div>
              </div>
            </li>
            <li class="my-3 flex justify-between items-center">
              <div class="flex itemg-center justify-center">
                <span class="text-848599 mr-6">{{$t('Lang.Cumulative number of blocks')}}:</span>
                <span class="lg:text-lg">{{minerData.total_block_count}} {{$t('Lang.Individual')}}</span>
              </div>
              <div class="flex justify-center items-end">
                <span class="text-848599 text-right mr-6">{{$t('Lang.Cumulative block reward')}}:</span>
                <div>
                  <span class="lg:text-lg">{{minerData.total_reward | formatTrueFil(false)}}</span>
                  <span>F</span>
                </div>
              </div>
            </li>
            <li class="my-3 flex justify-between">
              <div class="flex  justify-center">
                <span class="text-848599">{{$t('Lang.Sector status')}}</span>
              </div>
              <div class="flex items-center justify-between lg:justify-start">
                <span class="mr-2 lg:mr-6">{{$t('Lang.All')}} {{Number(minerData.sector_effect)+ Number(minerData.sector_faults)}}</span>
                <span class="mr-2 lg:mr-6 text-54B786">{{$t('Lang.Effective')}} {{minerData.sector_effect}}</span>
                <span class="mr-2 lg:mr-6 text-AB6D55">{{$t('Lang.Recovering')}} {{minerData.sector_recovering}}</span>
                <span class="text-F26B6B">{{$t('Lang.Error')}} {{minerData.sector_faults}}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div class="mt-3 flex-1 lg:border-0 border border-solid border-E8E7EB overflow-hidden bg-white rounded-md">
        <div class="flex items-center h-16 lg:h-20 px-3 lg:px-6 border-b border-solid border-E8E7EB">
          <span class="lg:text-lg font-medium text-dark">{{$t('Lang.Account overview')}}</span>
        </div>
        <p class='pt-6 px-3 lg:px-6'><span class='inline-block lg:w-40 w-12 text-848599'>ID</span> {{minerData.miner}}</p>
        <div class="flex flex-wrap py-3 px-3 lg:px-6">
          <div class="w-1/2 lg:flex items-center py-4 " v-for="item in minerOverview" :key="item.title+item.val"  v-show="item.val !== '--'">
            <div class="w-40 text-848599 ">{{$t(item.title)}}:</div>
            <template v-if="item.href">
                <n-link class="text-main hidden lg:block w-80"  :to="item.href">{{item.val | getAllSubStr(30,12)}}</n-link>
                <div class='flex'>
                  <div class=' mr-6'>
                    <n-link class="text-main lg:hidden block"  :to="item.href">{{item.val | getAllSubStr(30,6)}}</n-link>
                    <p @click='toWalletFlow(item.val)' class='cursor-pointer opacity-75 hover:opacity-100'>{{$t('Lang.View flow direction')}}</p>
                  </div>
                  <i class='el-icon-document-copy cursor-pointer opacity-75 hover:opacity-100 lg:ml-4 mt-1' @click='copyBtn(item.val)'></i>
                </div>
            </template>
            <span v-else>{{item.val}}</span>
          </div>
        </div>
      </div>
      <div class='lg:flex'>
        <div class="mt-3 lg:border-0 border border-solid border-E8E7EB bg-white rounded-md lg:w-1/2">
          <div class="flex items-center justify-between h-16 lg:h-20 px-3 lg:px-6 border-b border-solid border-E8E7EB">
            <div class="flex items-center">
              <span class="lg:text-lg font-medium text-dark">{{$t('Lang.Output statistics')}}</span>
            </div>
            <div class='flex items-center'>
              <div class='hidden lg:flex mr-4 w-84'>
                <el-date-picker
                  v-model="myDate"
                  type="daterange"
                  range-separator="-"
                  :start-placeholder="$t('Lang.Start date')"
                  :end-placeholder="$t('Lang.End date')"
                  value-format="yyyy-MM-dd"
                  :picker-options="pickerOptions"
                  @change='changeMyDate'>
                </el-date-picker>
              </div>
              <div>
                <ul class="hidden lg:flex justify-center checkbox-content">
                <li class="checkbox-list cursor-pointer py-1 px-3 lg:px-5 border border-solid border-E6E6EA" @click="selectCostStatistics(item)" :class="{ 'first': index == 0, 'last':  outStatList.length - 1 == index, 'active' : item.value == outStatTime }" v-for="(item, index) in outStatList" :key="item.value">
                  {{$t(item.key)}}
                </li>
              </ul>
              </div>
            </div>
            <div class='w-40 lg:hidden block '>
              <el-select v-model="outStatTime" placeholder="请选择" @change='changeOutStatTime'>
                <el-option
                  v-for="item in outStatList"
                  :key="item.value+'_'"
                  :label="$t(item.key)"
                  :value="item.value"
                  >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="flex flex-wrap py-3 px-3 lg:px-6">
            <div class="w-1/2 lg:flex items-center py-4 " v-for="(item, index) in minerStatistics" :key="item.title">
              <div class="flex" >
                <span class="text-848599 lg:w-32 mr-4" v-if="index == 6">{{$t(item.title)}}:</span>
                <span class="text-848599 lg:w-32 mr-4" v-if="index < 6">{{$t(item.title)}}:
                  <el-popover v-if="item.popover" trigger="hover" :content="$t(item.popover)">
                    <i class="el-icon-info cursor-pointer text-gray-500 text-base" slot="reference"></i>
                  </el-popover>
                </span>
                <div :class="{'text-red-500' : item.danger}">
                  <span class="lg:text-lg">{{item.val}}</span>
                  <span>{{item.unit}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="w-3 h-full hidden lg:block"></div>
        <div class="mt-3 lg:border-0 border border-solid border-E8E7EB bg-white rounded-md lg:w-1/2">
          <div class="flex items-center justify-between h-16 lg:h-20 px-3 lg:px-6 border-b border-solid border-E8E7EB">
            <div class="flex items-center">
              <span class="lg:text-lg font-medium text-dark">{{$t('Lang.Cost statistics')}}</span>
            </div>
            <div class='flex items-center'>
              <div class='hidden lg:flex mr-4 w-84'>
                <el-date-picker
                  v-model="myDateCost"
                  type="daterange"
                  range-separator="-"
                  :start-placeholder="$t('Lang.Start date')"
                  :end-placeholder="$t('Lang.End date')"
                  value-format="yyyy-MM-dd"
                  :picker-options="pickerOptions"
                  @change='changeMyDateCost'>
                </el-date-picker>
              </div>
              <div>
                <ul class="hidden lg:flex justify-center checkbox-content">
                  <li class="checkbox-list cursor-pointer py-1 px-3 lg:px-5 border border-solid border-E6E6EA" @click="selectStatTimehandler(item)" :class="{ 'first': index == 0, 'last':  costStatisticsList.length - 1 == index, 'active' : item.value == costStatistics }" v-for="(item, index) in costStatisticsList" :key="item.value">
                    {{$t(item.key)}}
                  </li>
                </ul>
              </div>
            </div>
           
            <div class='w-40 lg:hidden block '>
              <el-select v-model="costStatistics" :placeholder="$t('Lang.Please Select')" @change='changeCostStatistics'>
                <el-option
                  v-for="item in costStatisticsList"
                  :key="item.value+'_'"
                  :label="$t(item.key)"
                  :value="item.value"
                  >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="flex flex-wrap py-3 px-3 lg:px-6">
            <div class="w-1/2 lg:flex items-center py-4 " v-for="(item, index) in minerCost" :key="item.title">
              <div class="lg:flex" >
                <span class="text-848599 lg:w-40 mr-4" v-if="index == 6">{{$t(item.title)}}:</span>
                <span class="text-848599 lg:w-40 mr-4" v-if="index < 6">{{$t(item.title)}}:
                  <el-popover v-if="item.popover" trigger="hover" :content="$t(item.popover)">
                    <i class="el-icon-info cursor-pointer text-gray-500 text-base" slot="reference"></i>
                  </el-popover>
                </span>
                <div v-if="item.color" :class="{'text-green-500' : item.danger,'text-red-500' : !item.danger}">
                  <span class="lg:text-lg">{{item.val}}</span>
                  <span>{{item.unit}}</span>
                </div>
                <div v-else >
                  <span class="lg:text-lg">{{item.val}}</span>
                  <span>{{item.unit}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
       
      <div class="lg:flex mt-3">
        <div class="flex-1 lg:border-0 border border-solid border-E8E7EB bg-white rounded-md">
          <div class="flex items-center justify-between h-16 lg:h-20 px-3 lg:px-6 border-b border-solid border-E8E7EB">
            <div class="flex items-center">
              <span class="lg:text-lg font-medium text-dark">{{$t('Lang.Change in computing power')}}</span>
            </div>
            <ul class="hidden  lg:flex justify-center checkbox-content">
              <li class="checkbox-list cursor-pointer py-1 px-3 lg:px-5 border border-solid border-E6E6EA" @click="selectPowerhandler(item.value)" :class="{ 'first': index == 0, 'last':  powerList.length - 1 == index, 'active' : item.value == powerTime }" v-for="(item, index) in powerList" :key="item.value">
                {{$t(item.key)}}
              </li>
            </ul>
            <div class='w-40 lg:hidden block '>
              <el-select v-model="powerTime" placeholder="请选择" @change='changePowerTime'>
                <el-option
                  v-for="item in powerList"
                  :key="item.value+'__'"
                  :label="$t(item.key)"
                  :value="item.value"
                  >
                </el-option>
              </el-select>
            </div>
          </div>
          <div id="echartsMinerPower" class="h-64 lg:h-96 px-3"></div>
        </div>
        <div class="w-3 h-full hidden lg:block"></div>
        <div class="mt-3 lg:mt-0 flex-1 lg:border-0 border border-solid border-E8E7EB bg-white rounded-md">
          <div class="flex items-center justify-between h-16 lg:h-20 px-3 lg:px-6 border-b border-solid border-E8E7EB">
            <div class="flex items-center justify-between">
              <span class="lg:text-lg font-medium text-dark">{{$t('Lang.Reward')}}</span>
              <span class='ml-6 text-main cursor-pointer hover:opacity-75' @click='goPrediction'>{{$t('Lang.Reward forecast')}}</span>
            </div>
            <div>
              <ul class="hidden lg:flex justify-center checkbox-content">
                <li class="checkbox-list cursor-pointer py-1 px-3 lg:px-5 border border-solid border-E6E6EA" @click="selectBlockhandler(item.value)" :class="{ 'first': index == 0, 'last':  blockList.length - 1 == index, 'active' : item.value == blockTime }" v-for="(item, index) in blockList" :key="item.value">
                  {{$t(item.key)}}
                </li>
              </ul>
              <div class='w-40 lg:hidden block '>
                <el-select v-model="blockTime" placeholder="请选择" @change='changeBlockTime'>
                  <el-option
                    v-for="item in blockList"
                    :key="item.value+'___'"
                    :label="$t(item.key)"
                    :value="item.value"
                    >
                  </el-option>
                </el-select>
              </div>

            </div>
            
          </div>
              
            <div id="echartsMinerOutputReward" class="h-64 lg:h-96 px-3"></div>
         
        </div>
      </div>

      
      
      <div class="mb-3 bg-white mt-3 rounded-md lg:px-6">
        <Childlink v-model="childRouter" :routerTitle='routerTitle'/>
        <nuxt-child />
      </div>
      <el-dialog :title="$t(dialogTitle)" :visible.sync="tagFlag" width="648px" :before-close="handleClose">
        <p class='mb-4'>{{$t('Lang.Only open claim for accounts with storage power 32 GiB')}}</p>
        <p>{{$t('Lang.Owner address')}}:</p>
        <p class='text-sm mb-6'>{{langOwmerAddress}}</p>
        <el-form label-position="top" label-width="140px" ref="tagForm" size="mini" :model="tagForm" :rules="rules">
          <el-form-item :label="$t('Lang.Account name(En)')" prop="enUser">
            <el-input v-model="tagForm.enUser" :placeholder="$t('Lang.Cannot over 16 characters')"></el-input>
          </el-form-item>
          <el-form-item :label="$t('Lang.Account name(Zh)')">
            <el-input v-model="tagForm.chUser" :placeholder="$t('Lang.Cannot over 16 characters')"></el-input>
          </el-form-item>
          <el-form-item :label="$t('Lang.Contact')" prop="enUser">
            <el-input v-model="tagForm.phone" :placeholder="$t('Lang.Phone/Email')"></el-input>
          </el-form-item>
          <el-form-item :label="$t('Lang.Message')">
            <div class='px-6 py-2 text-xs' style='background:rgba(247, 248, 252, 1);color:rgba(119, 140, 162, 1)'>
              <p class='truncate'>Signature for atpool {{miner_no}} {{nowTime}}</p>
            </div>
          </el-form-item>
          <el-form-item :label="$t('Lang.Sign code')">
            <div class='flex px-6 py-2 text-xs justify-between items-center' style='background:rgba(247, 248, 252, 1);color:rgba(119, 140, 162, 1)'>
              <p class='w-11/12  overflow-x-auto h-10 lg:block hidden '>lotus wallet sign {{langOwmerAddress}} {{singedMsg}}</p>
              <p class='w-10/12  truncate lg:hidden block'>lotus wallet sign {{langOwmerAddress}} {{singedMsg}}</p>
              <div class=''>
                <el-tooltip class="item" effect="dark" :content="$t('Lang.Copy')" placement="top">
                  <el-button @click="copyBtn(copyText)"><i class="el-icon-document-copy"></i></el-button>
                </el-tooltip>
              </div>
            </div>
          </el-form-item>
          <el-form-item :label="$t('Lang.Signature')" prop="enUser">
            <el-input v-model="tagForm.autograph" :placeholder="$t('Lang.Please copy the above sign code, sign it with Filecoin wallet, and enter the signature')"></el-input>
          </el-form-item>
        </el-form>
        <p class='text-xs' style='color:rgba(230, 62, 62, 1)'>{{$t('Lang.Special text')}}</p>
        <span slot="footer" class="dialog-footer">
          <el-button @click="tagFlag = false">{{$t('Lang.Cancel')}}</el-button>
          <el-button type="primary" @click="tagOk" :loading="OkLoading">{{$t('Lang.Submit')}}</el-button>
        </span>
      </el-dialog>

      <el-dialog
        :title="$t('Lang.Share')"
        :visible.sync="dialogVisible"
        :width="dialogWidth"
        :before-close="handleClose">
        <div class='showImgs lg:h-192 h-108' v-loading="imgLoading">
          <img :src="imgUrl" style='width:380px' class='m-auto' alt="">
        </div>

        <div class='flex justify-end mr-6 mt-10'>
          <div class='hidden lg:block '>
            <el-button @click="toImage" type="primary" :disabled='imgLoading'>{{$t('Lang.Download')}}</el-button>
          </div>
          <p class='text-xl lg:hidden block text-8F94A8 opacity-75'>*{{$t('Lang.Long press to save the picture')}}</p>
        </div>

      </el-dialog>
    </template>
    <template v-if="type == 'wallet'">
      <div class='flex items-center'>
        <p class='text-2xl my-3'>{{$t('Lang.Wallet details')}}</p>
        
      </div>
      <div class="mt-3 lg:border-0 border border-solid border-E8E7EB bg-white rounded-md">
        <div class='flex items-center justify-between border-b border-solid border-E8E7EB'>
          <div class="flex items-center h-16 lg:h-20 px-3 lg:px-6 ">
            <span class="lg:text-lg font-medium text-dark">{{$t('Lang.Account overview')}}</span>
          </div>

          <el-popover v-show="!isSignIn" trigger="hover" content="该功能为登录后功能，需要登录才能使用，点击登录">
              <div class='collectionBox flex items-start px-3' @click='goSignIn' v-show="!isSignIn" slot="reference">
                <img src="../../../../assets/imgs/collection-false.png" alt="" class='mr-2 collection-false' style='height:14px'>
                <span>{{$t('Lang.Collect')}}</span>
            </div>
          </el-popover>

          <div class='collectionBox flex items-start px-3' @click='changeCollectionWallet' v-show="isSignIn">
            <img v-show="!collectionFlag" src="../../../../assets/imgs/collection-false.png" alt="" class='mr-2 collection-false' style='height:14px'>
            <img v-show="collectionFlag" src="../../../../assets/imgs/collection-true.png" alt="" class='mr-2 collection-false' style='height:14px'>
            <span v-show="!collectionFlag">{{$t('Lang.Collect')}}</span>
          <span v-show="collectionFlag">{{$t('Lang.Collected')}}</span>
          </div>
          
        </div>
        <ul class="py-3 px-3 lg:px-6">
          <li class="flex items-center justify-between lg:justify-start leading-8" v-for="(item, index) in walletOverview" :key="index + '_index'">
              <template v-if="!item.node && item.val!=='--'">
                <div class="w-48 text-848599 flex-shrink-0">{{$t(item.title)}}</div>
                <div class="truncate lg:break-all" >{{item.val}}</div>
                <i v-show="item.title == 'Lang.Address'" class='el-icon-document-copy cursor-pointer opacity-75 hover:opacity-100 lg:ml-4 mt-1' @click='copyBtn(item.val)'></i>
              </template>

              <template v-if="item.node && item.val.length!==0">
                <div class="w-48 text-848599 flex-shrink-0">{{$t(item.title)}}</div>
                <div v-if='item.val.length!==0' class="flex items-end flex-wrap truncate">
                  <n-link v-for="(i,j) in item.val" :key="j+'node__'" class="text-main break-all ml-6 lg:ml-0 lg:mr-6 mr-0 truncate " :class="{'w-full':item.wrap}" :to="`/${lang}/chain/addr/${i}`">{{i}}</n-link>
                </div>
              </template>
          </li>
        </ul>
      </div>
      <div class="mt-3 mb-3 lg:border-0 border border-solid border-E8E7EB bg-white rounded-md">
        <div class="flex items-center h-16 lg:h-20 px-3 lg:px-6 border-b border-solid border-E8E7EB">
          <span class="lg:text-lg font-medium text-dark">{{$t('Lang.Account changes')}}</span>
        </div>
        <div id="echartsWalletAccountChange" class="h-64 lg:h-96"></div>
      </div>
      <div class="mb-3 bg-white lg:px-6">
        <Childlink v-model="childRouter" :routerTitle='routerTitle'/>
        <nuxt-child />
      </div>
    </template>
    <div id='shareBox' ref="imageWrapper" class='bg-main px-4 py-6 text-white' >
      <img class='absolute' style='right:0;top:70px;height:50px' src="~/assets/imgs/sharebg.png" alt="">
      <div class='flex justify-between'>
        <img class="h-8" src="~/assets/img/icon-en-logo.png" />
        <p class='text-xs mt-1' >{{nowtime}}</p>
      </div>
      <p class='text-2xl mt-2 pb-1' >{{$t('Lang.Node Details')}}</p>
      <span class='pb-3 border-b-2  border-solid border-F4BF75'>{{$t('Lang.Account')}}：{{miner_no}}</span>
      <div class='mt-8 rounded-md bg-white overflow-hidden'>
        <p class='text-main h-14 flex items-center pl-4 font-bold bg-EFF4FE -mt-3 pb-1'> <i class="inline-block bg-main w-1 h-4  mr-2 mt-4"></i>{{$t('Lang.Wallet overview')}}</p>
        <div class="text-main">
          <div id="echartsMinerBalance_share" class="w-full h-48 pt-3"></div>
          <div class="pb-6 w-full ">
            <ul class="px-3">
              <li class="flex justify-between">
                <span class="mr-3 text-848599">{{$t('Lang.Account Balance')}}</span>
                <span class="text-main ml-auto">{{minerData.total_balance | formatTrueFil(false)}}</span>
                <span class="ml-2 text-848599">F</span>
              </li>
              <li class="my-3 flex justify-between">
                <div class='flex items-center'>
                  <div class='mt-5 inline-block w-2 h-2 rouned-lg mr-2 ' style='background:#0EEACE'></div>
                  <p class="mr-3 text-848599">{{$t('Lang.Available Balance')}}</p>
                </div>
                <span class="text-main ml-auto">{{minerData.available_balance | formatTrueFil(false)}}</span>
                <span class="ml-2 text-848599">F</span>
              </li>
              <li class="my-3 flex justify-between">
                <div class='flex items-center'>
                  <div class='mt-5 inline-block w-2 h-2 rouned-lg mr-2 ' style='background:#B19DE6'></div>
                  <p class="mr-3 text-848599">{{$t('Lang.Sector pledge')}}</p>
                </div>
                <span class="text-main ml-auto">{{minerData.initial_pledge_balance | formatTrueFil(false)}}</span>
                <span class="ml-2 text-848599">F</span>
              </li>
              <li class="my-3 flex justify-between">
                <div class='flex items-center'>
                  <div class='mt-5 inline-block w-2 h-2 rouned-lg mr-2 ' style='background:#F5D298'></div>
                  <p class="mr-3 text-848599">{{$t('Lang.Reward lock-up')}}</p>
                </div>
                <span class="text-main ml-auto">{{minerData.locked_balance | formatTrueFil(false)}}</span>
                <span class="ml-2 text-848599">F</span>
              </li>
              <li class="flex justify-between">
                <div class='flex items-center'>
                  <div class='mt-5 inline-block w-2 h-2 rouned-lg mr-2 ' style='background:#9CCFFF'></div>
                  <p class="mr-3 text-848599">{{$t('Lang.Advance deposit')}}</p>
                </div>
                <span class="text-main ml-auto">{{minerData.precommit_deposits_balance | formatTrueFil(false)}}</span>
                <span class="ml-2 text-848599">F</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class='mt-6 rounded-md bg-white overflow-hidden'>
        <p class='text-main h-14 flex items-center pl-4 font-bold bg-EFF4FE -mt-3 pb-1'><i class="inline-block bg-main w-1 h-4  mr-2 mt-4"></i>{{$t('Lang.Hash power overview')}}</p>
        <div class="text-main">
          <ul class="flex flex-col justify-between w-full  px-3  py-3">
            <li class="flex-grow flex justify-between mb-2">
              <div class="flex flex-col justify-center">
                <div>
                  <span class="">{{minerData.actual_power | formatPower(2)[0]}}</span>
                  <span>{{minerData.actual_power | formatPower(2)[1]}}</span>
                </div>
                <div class="text-848599">
                  <span>{{$t('Lang.Effective computing power')}}</span>
                  <el-popover placement="right" trigger="hover">
                    <p>{{$t('Lang.Effective computing power')}} {{minerData.power}} bytes</p>
                    <p>{{$t('Lang.Original computing power')}} {{minerData.raw_power}} bytes</p>
                  </el-popover>
                </div>
              </div>
              <div class="flex flex-col justify-center items-end">
                <span class="">{{minerData.ranking}}</span>
                <span class="text-right text-848599">{{$t('Lang.Rank')}}</span>
              </div>
            </li>
            <li class="flex-grow flex justify-between mb-2">
              <div class="flex flex-col justify-center">
                <div>
                  <span class="">{{minerData.raw_power | formatPower(2)[0]}}</span>
                  <span>{{minerData.raw_power | formatPower(2)[1]}}</span>
                </div>
                <div class="text-848599">
                  <span>{{$t('Lang.Original computing power')}}</span>
                  <el-popover placement="right" trigger="hover">
                    <p>{{$t('Lang.Effective computing power')}} {{minerData.power}} bytes</p>
                    <p>{{$t('Lang.Original computing power')}} {{minerData.raw_power}} bytes</p>
                  </el-popover>
                </div>
              </div>
              <div class="flex flex-col justify-center items-end">
                <div>
                  <span class="">{{minerData.sector_size | formatPower(0)[0]}}</span>
                  <span>{{minerData.sector_size | formatPower(0)[1]}}</span>
                </div>
                <span class="text-848599 text-right">{{$t('Lang.Sector size')}}</span>
              </div>
            </li>
            <li class="flex-grow flex justify-between mb-2">
              <div class="flex flex-col justify-center">
                <span class="lg:text-lg">{{minerData.total_block_count}}</span>
                <span class="text-848599">{{$t('Lang.Cumulative number of blocks')}}</span>
              </div>
              <div class="flex flex-col justify-center items-end">
                <div>
                  <span class="">{{minerData.total_reward | formatTrueFil(false)}}</span>
                  <span>F</span>
                </div>
                <span class="text-848599 text-right">{{$t('Lang.Cumulative block reward')}}</span>
              </div>
            </li>
            <li class="flex-grow flex justify-between mb-2">
              <div class="flex flex-col justify-center">
                <span class="text-848599">{{$t('Lang.Sector status')}}</span>
              </div>
              <div class="">
                <p class="mr-2">{{$t('Lang.All')}} {{Number(minerData.sector_effect)+ Number(minerData.sector_faults)}}</p>
                <p class="mr-2 text-54B786">{{$t('Lang.Effective')}} {{minerData.sector_effect}}</p>
                <p class="mr-2 text-AB6D55">{{$t('Lang.Recovering')}} {{minerData.sector_recovering}}</p>
                <p class="text-F26B6B">{{$t('Lang.Error')}} {{minerData.sector_faults}}</p>
              </div>
              
            </li>
          </ul>
        </div>
      </div>
      <div class='mt-6 rounded-md bg-white overflow-hidden'>
        <div class='text-main h-14 flex items-center pl-4 font-bold bg-EFF4FE -mt-3 pb-1 justify-between' >
          <p class='text-main h-14 flex items-center  font-bold bg-EFF4FE pb-1'><i class="inline-block bg-main w-1 h-4 mr-2 mt-4"></i>{{$t('Lang.Output statistics')}}</p>
          <div>
            <span class='mr-4 text-848599 font-normal' v-show="outStatTime == ''">{{$t('Lang.24 hours')}}</span>
            <span class='mr-4 text-848599 font-normal' v-show="outStatTime == '7d'">{{$t('Lang.Latest seven days')}}</span>
            <span class='mr-4 text-848599 font-normal' v-show="outStatTime == '30d'">{{$t('Lang.Latest one month')}}</span>
          </div>
        </div>
        <div class="text-main pb-3">
          <ul class="flex flex-wrap w-full px-3 py-3">
            <li class="flex items-center flex-grow" v-for="(item, index) in minerStatistics" :key="item.title+'share3'" :class="{'w-1/2' : index < 6, 'w-full' : index == 6}">
              <div class="flex-1 flex" :class="{'items-end' : index % 2 == 1, 'flex-col' : index < 6, 'justify-between items-center' : index == 6}">
                <span class="text-848599" v-if="index == 6">{{$t(item.title)}}</span>
                <div :class="{'text-red-500' : item.danger}">
                  <span class="lg:text-lg">{{item.val}}</span>
                  <span>{{item.unit}}</span>
                </div>
                <span class="text-848599" v-if="index < 6">{{$t(item.title)}}
                  <el-popover v-if="item.popover" trigger="hover" :content="$t(item.popover)">
                  </el-popover>
                </span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class='mt-6 rounded-md bg-white overflow-hidden'>
        <p class='text-main h-14 flex items-center pl-4 font-bold bg-EFF4FE -mt-3 pb-1'>
          <i class="inline-block bg-main w-1 h-4  mr-2 mt-4"></i><span>{{$t('Lang.Account overview')}}</span>
        </p>
        <div class="text-main pb-3">
          <ul class="flex flex-col  py-3 px-3">
            <li class="flex-grow flex items-center mb-2" v-for="item in minerOverview" :key="item.title+'share4'">
              <div class="w-32 text-848599 flex-shrink-0">{{$t(item.title)}}</div>
              <template v-if="item.href">
                <div class="break-all ">
                  <n-link class="text-main" :to="item.href">{{item.val}}</n-link>
                </div>
              </template>
              <span v-else>{{item.val}}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class='mt-6 rounded-md bg-white overflow-hidden hidden lg:block'>
        <div class='text-main h-14 flex items-center pl-4 font-bold bg-EFF4FE -mt-3 pb-1 justify-between' >
          <p class='text-main h-14 flex items-center  font-bold bg-EFF4FE pb-1'><i class="inline-block bg-main w-1 h-4  mr-2 mt-4"></i>{{$t('Lang.Change in computing power')}}</p>
          <div>
            <span class='mr-4 text-848599 font-normal' v-show="powerTime == '30d'">{{$t('Lang.30days')}}</span>
            <span class='mr-4 text-848599 font-normal' v-show="powerTime == '180d'">{{$t('Lang.180days')}}</span>
          </div>
        </div>
        <div class="text-main pb-3">
          <div id="echartsMinerPower_share" class="h-64"></div>
        </div>
      </div>
      <div class='mt-6 rounded-md bg-white overflow-hidden hidden lg:block'>
        <div class='text-main h-14 flex items-center pl-4 font-bold bg-EFF4FE -mt-3 pb-1 justify-between' >
          <p class='text-main h-14 flex items-center  font-bold bg-EFF4FE pb-1'><i class="inline-block bg-main w-1 h-4  mr-2 mt-4"></i>{{$t('Lang.Block reward')}}</p>
          <div>
            <span class='mr-4 text-848599 font-normal' v-show="blockTime == '24h'">{{$t('Lang.24 hours')}}</span>
            <span class='mr-4 text-848599 font-normal' v-show="blockTime == '30d'">{{$t('Lang.30days')}}</span>
            <span class='mr-4 text-848599 font-normal' v-show="blockTime == '180d'">{{$t('Lang.180days')}}</span>
          </div>
        </div>
        <div class="text-main pb-3">
          <div id="echartsMinerOutputReward_share" class="h-64"></div>
        </div>
      </div>

      <div class='flex items-start justify-between mt-8'>
        <div>
          <p class=' text-xs'>{{$t('Lang.More Filecoin data')}}</p>
          <p calss='text-xs'>{{$t('Lang.In the Athena browser')}}(atpool.com)</p>
        </div>
        <div class='text-center'>
          <img  class='h-24' src="@/assets/imgs/WechatIMG10.png" alt="">
          <p calss='text-xs'>{{$t('Lang.Scan code to view')}}</p>
        </div>
      </div>
      <img class="h-8 -mt-6" src="~/assets/img/icon-en-logo.png" />
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Childlink from '@/components/common/Childlink'
import echartsUtils from '@/static/echarts-utils.js'
import utils from '@/static/utils.js'
import html2canvas from "html2canvas"


export default {

  name: 'ChainMiner',

  mixins: [],

  props: [],

  components: {
    Childlink
  },

  computed: {
    ...mapGetters({
      globalMinerTag: 'getGlobalMinerTag',
      globalOverview: 'getGlobalOverview',
      tagShowFlag: 'getTagShowFlag'
    }),
    minerStatistics: function() {
      let {
        increase_power,
        increase_power_offset,
        block_reward,
        block_count,
        win_count,
        avg_reward,
        lucky,
      } = this.miner_stats_by_no || {}
      return [{
        title: 'Lang.Power growth rate',
        val: `${utils.formatPower(increase_power)[0]}`,
        popover: 'Lang.The total effective computing power of the packaged sector completed within the selected time',
        unit: `${utils.formatPower(increase_power)[1]}`
      }, {
        title: 'Lang.Power Growth',
        val: `${utils.formatPower(increase_power_offset)[0]}`,
        unit: `${utils.formatPower(increase_power_offset)[1]}`,
        popover: 'Lang.Increment of effective computing power within the selected time',
        danger: increase_power_offset < 0
      }, {
        title: 'Lang.Block reward',
        val: utils.formatTrueFil(block_reward, false),
        popover: 'Lang.The sum of block rewards within the selected time',
        unit: 'F'
      }, {
        title: 'Lang.Number of blocks produced',
        popover: 'Lang.The total number of rewards within the selected time',
        val: utils.formatterAmount(win_count,0)
      }, {
        title: 'Lang.Number of blocks',
        popover: 'Lang.The total number of blocks produced in the selected time',
        val: utils.formatterAmount(block_count,0)
      }, {
        title: 'Lang.Production Efficiency',
        popover: 'Lang.The average number of FIL produced per TiB effective computing power during the selected time',
        val: `${utils.formatTrueFil(avg_reward, false)}`,
        unit: 'F/TiB'
      }, {
        title: 'Lang.Lucky value',
        val: utils.formatterAmount(lucky * 100, 2),
        unit: '%',
        danger: lucky * 100 < 99.7
      }]
    },
    minerCost : function() {
      let {
        total_pledge,
        create_gas,
        create_gas_overview,
        total_gas,

      } = this.miner_gas_stats_by_no || {}
      
      return [{
        title: 'Lang.Total cost',
        val:  (Number(utils.myFormatTrueFil(total_gas || 0,false,4))+Number(utils.myFormatTrueFil(total_pledge || 0,false,4))).toFixed(4) ,
        unit: 'F',
      },{
        title: 'Lang.Sector pledge',
        val: utils.formatTrueFil(total_pledge, true),
      },{
        title: 'Lang.Single T production gas',
        val: utils.formatNewEasyFil(create_gas)[0],
        unit: utils.formatNewEasyFil(create_gas)[1]+'/TiB'
      },{
        title: 'Lang.Gas Used Reference',
        popover: 'Lang.Average Gas Production in the Whole Network',
        val: utils.formatTrueFil(create_gas_overview, false),
        unit: 'F/TiB'
      },{
        title: 'Lang.Gas Consume',
        val: utils.formatTrueFil(total_gas, true),
      },{
        title: 'Lang.Gas Difference',
        popover: 'Lang.Production Gas minus production Gas reference value',
        val: utils.formatTrueFil(Number(create_gas)-Number(create_gas_overview), false).split(' ')[0],
        unit: 'F/TiB',
        danger: utils.formatTrueFil(Number(create_gas)-Number(create_gas_overview), false).split(' ')[0] < 0,
        color:true,
      }]
    },
    minerOverview: function() {
      let {
        owner_address,
        worker_address,
        create_time,
        post_address,
        ip,
      } = this.minerData || {}

      return [
        { title: 'Lang.Owner', val: utils.formatOverview(owner_address), href: `/${this.lang}/chain/addr/${owner_address}` },
        { title: 'Lang.Types', val: 'Storage Miner' },
        { title: 'Lang.Worker', val: utils.formatOverview(worker_address), href: `/${this.lang}/chain/addr/${worker_address}` },
        { title: 'Lang.Creation time', val: utils.formatOverview(create_time) },
        { title: 'Lang.Post', val: utils.formatOverview(post_address), href: `/${this.lang}/chain/addr/${post_address}` },

      ]
    },
    walletOverview: function() {
      let {
        address,
        id,
        wallet_type,
        value,
        create_height_time,
        update_height_time,
        initial_balance,
        start_epoch,
        unlock_duration,
        locking_balance,
        approval_threshold,
        available_balance,
        start_epoch_time,
        unlock_duration_time,
        signers
      } = this.walletData || {}

       let str = ''
        if(this.lang == 'zh'){
          switch (wallet_type.split('/')[2]) {
            case 'storageminer':
              str = '存储供应商账户'
              break;
            case 'account':
              str = '普通账户'
              break;
            case 'multisig':
              str = '多签账户'
              break;
            default:
              str = wallet_type.split('/')[2]
            break;
          }
        }else if(this.lang == 'en'){
          switch (wallet_type.split('/')[2]) {
            case 'storageminer':
              str = 'Node account'
              break;
            case 'account':
              str = 'Ordinary account'
              break;
            case 'multisig':
              str = 'Multi-signature account'
              break;
            default:
              str = wallet_type.split('/')[2]
            break;
          }
        }else if(this.lang == 'ja'){
          switch (wallet_type.split('/')[2]) {
            case 'storageminer':
              str = 'ノードアカウント'
              break;
            case 'account':
              str = '一般アカウント'
              break;
            case 'multisig':
              str = 'マルチシグニチャアカウント'
              break;
            default:
              str = wallet_type.split('/')[2]
            break;
          }
        }else{
          switch (wallet_type.split('/')[2]) {
            case 'storageminer':
              str = '노드 계정'
              break;
            case 'account':
              str = '일반 계정'
              break;
            case 'multisig':
              str = '다중 서명 계정'
              break;
            default:
              str = wallet_type.split('/')[2]
            break;
          }
        }

      let {
        subordinate,
        worker
      } = this.miners_by_address

      let arr = [
        { title: 'Lang.Address', val: address || '--'},
        { title: 'Lang.ID', val: id},
        { title: 'Lang.Types', val: str},
        { title: 'Lang.Balance', val: utils.formatEasyFil(value)},
        { title: 'Lang.Creation time', val: create_height_time},
        { title: 'Lang.Latest trading time', val: update_height_time},
        { title: 'Lang.Node under name', val: subordinate,node:true},
        { title: 'Lang.Actual work node', val: worker,node:true},
      ]

      let unlock_duration_str = ''
      if(unlock_duration == 0){
        unlock_duration_str = '--'
      }else{
        unlock_duration_str = start_epoch_time+' to '+unlock_duration_time
      }

      if(wallet_type == 'fil/5/multisig'){
        arr.push({title:'Lang.initial_balance',val: utils.formatEasyFil(initial_balance)})
        arr.push({title:'Lang.available_balance',val: utils.formatEasyFil(available_balance)})
        arr.push({title:'Lang.start_epoch',val:start_epoch})
        arr.push({title:'Lang.unlock_duration',val:  unlock_duration_str})
        arr.push({title:'Lang.locking_balance',val: utils.formatEasyFil(locking_balance)})
        arr.push({title:'Lang.approval_threshold',val:approval_threshold})
        arr.push({title:'Lang.signers',val:signers,node:true,wrap:true})
      }


      return arr

    },
    dialogTitle: function() {
      if (this.globalMinerTag[this.miner_no]) {
        return 'Lang.Edit Signature'
      }
      return 'Lang.Claim account'
    },
    gasListFiveTable:function(){
      let {
        day_pledge_gas,
        day_increase_power,
        day_increase_power_offset,
        day_total_gas,
        day_create_gas,
        day_overview_create_gas,
        day_gas_offset
      } = this.minerDataGas || {}

      return [
        { 
          title: 'Lang.Package volume', 
          val: day_increase_power.split(' ')[0],
          unit: day_increase_power.split(' ')[1]
        },
        { title: 'Lang.Power Growth',
          val: day_increase_power_offset.split(' ')[0],
          unit: day_increase_power_offset.split(' ')[1]
        },
        { title: 'Lang.Sector pledge',
          val: utils.formatEasyFil(day_pledge_gas).split(' ')[0],
          unit: utils.formatEasyFil(day_pledge_gas).split(' ')[1],
        },
        { title: 'Lang.Gas Consume',
          val: day_total_gas,
          unit:'F',
        },
        { title: 'Lang.Gas Used',
          val: day_create_gas,
          unit:'F/TiB',
        },
        { 
          title: 'Lang.Gas Used Reference',
          val:  day_overview_create_gas,
          unit:'F/TiB',
          popover:'Lang.Average Gas Production in the Whole Network'
        },
        { 
          title: 'Lang.Gas Difference',
          val: day_gas_offset,
          unit:'F/TiB',
          popover:'Lang.Production Gas minus production Gas reference value'
        },

      ]
      
    }
  },

  asyncData({ app, params }) {
    let data = {
      miner_no: params.id,
      type: null,
      minerData: {},
      minerDataGas: {},
      minerLineDataLeft: [],
      minerLineDataRight: [],
      childRouter: [],
      walletData: {},
      walletLineData: [],
      address_type: '',
      errFlag: false,
      errMsg: '',
      miners_by_address:{}
    }
    return app.$axios.post('/api/explorer/search_miner_or_wallet', {
        value: data.miner_no
      })
      .then(res => {
        if (res.code != 0) {
          data.errFlag = true
          data.errMsg = res.msg
          return data
        }
        data.type = res.data.type
        if (res.data.type == 'shot') {
          data.childRouter = [
            { path: `/chain/addr/${data.miner_no}`, title: 'Lang.Message list', active: false },
            { path: `/chain/addr/${data.miner_no}/block`, title: 'Lang.Block list', active: false },
            { path: `/chain/addr/${data.miner_no}/transfer`, title: 'Lang.Transfer list', active: false },
            { path: `/chain/addr/${data.miner_no}/gas`, title: 'Lang.GAS', active: false }
          ]
          return app.$axios.post('/api/explorer/get_miner_by_no', {
            miner_no: data.miner_no
          })
        }
        else if (res.data.type == 'wallet') {
          data.childRouter = [
            { path: `/chain/addr/${data.miner_no}`, title: 'Lang.Message list', active: false },
            { path: `/chain/addr/${data.miner_no}/transfer`, title: 'Lang.Transfer list', active: false }
          ]
          return app.$axios.post('/api/explorer/get_wallet_info', {
            id_or_address: data.miner_no,
          })
        }
      })
      .then(res => {
        if (!res || res.code != 0) return data
        if (data.type == 'shot') {
          data.minerData = res.data 
          data.minerDataGas = res.data
          let dates = utils.getDateMiusDays(new Date(), 30)
          return app.$axios.post('/api/explorer/get_miner_line_chart_by_no', {
            miner_no: data.miner_no,
            stats_type: '30d'
          })
        }
        else if (data.type == 'wallet') {
          data.walletData = res.data
          let dates = utils.getDateMiusDays(new Date(), 180)
          return app.$axios.post('/api/explorer/get_wallet_record', {
            id_or_address: data.miner_no,
          })
        }
      })
      .then(res => {
        if (!res || res.code != 0) return data
        if (data.type == 'shot') {
          data.minerLineDataLeft = res.data
          data.minerLineDataRight = res.data
          return data
        }
        if (data.type == 'wallet') {
          data.walletLineData = res.data
          return app.$axios.post("/api/explorer/get_miners_by_address",{
            address: data.miner_no,
          });
        }
      })
      .then(res=>{
        if(res.code !== 0 ) return data;
        if (data.type == 'shot') {
          return data
        }else{
          data.miners_by_address = res.data
          return data
        }
      })
  },

  data: function() {
    return {
      myDate: "",
      dateLeft: null,
      dateRight: null,
      myDateCost: "",
      dateLeftCost: null,
      dateRightCost: null,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 86400000;
        },
      },
      copyText:'',
      dialogWidth:'',
      imgLoading:true,
      imgUrl:'',
      shareFlag:false,
      nowtime:'',
      dialogVisible:false,
      user_info:{},
      isSignIn:false,
      collectionFlag:false,
      collection:false,
      miner_no: null,
      type: null,
      minerData: {},
      childRouter: [],
      routerTitle:{
        title:'',
        img:require('~/assets/imgs/row.png')
      },
      walletData: {},
      walletLineData: [],
      address_type: '',
      outStatTime: '24h',
      outStatList: [
        { value: '24h', key: 'Lang.24 hours' },
        { value: '7d', key: 'Lang.Latest seven days' },
        { value: '30d', key: 'Lang.Latest one month' },
      ],
      costStatistics:'1d',
      costStatisticsList: [
        { value: '1d', key: 'Lang.Yesterday' },
        { value: '7d', key: 'Lang.Latest seven days' },
        { value: '30d', key: 'Lang.Latest one month' },
      ],
      powerTime: '30d',
      powerList: [
        { value: '30d', key: 'Lang.30days' },
        { value: '180d', key: 'Lang.180days' },
      ],
      blockTime: '30d',
      blockList: [
        { value: '24h', key: 'Lang.24 hours' },
        { value: '30d', key: 'Lang.30days' },
        { value: '180d', key: 'Lang.180days' },
      ],
      blockTitle:'奖励',
      blockTitleList: [
        { value: '奖励', key: 'Lang.Block reward' },
        { value: '出块预测', key: 'Lang.Block prediction' },
      ],
      blockPrediction:'30',
      blockPredictionList: [
        { value: '30', key: 'Lang.Next 30 days' },
      ],
      predictionList:[],
      gasTime:'24h',
      gasList: [
        { value:'24h', key: 'Lang.Yesterday' },
        { value:'7d' , key: 'Lang.Latest seven days' },
        { value:'30d' , key: 'Lang.30days' },
        { value:'90d' , key: 'Lang.90days' },
      ],
      lang: this.$store.state.locale,
      tagFlag: false,
      tagForm: {
        enUser: '',
        chUser: '',
        phone: '',
        autograph: ''
      },
      rules: {
        enUser: [
          { required: true, message: ' ', trigger: 'blur' },
        ],
        phone: [
          { required: true, message: ' ', trigger: 'blur' },
        ],
        autograph: [
          { required: true, message: ' ', trigger: 'blur' },
        ],
      },
      langOwmerAddress: '',
      OkLoading: false,
      nowTime: '',
      singedMsg: '5369676e617475726520666f722066696c666f780a66303132373539350a323032312d30352d31345431313a30373a33312e3833355a',
      miner_stats_by_no:[],
      miner_gas_stats_by_no:[]
    }
  },

  methods: {
    handleClose(done) {
      done();
    },
    changeTag() {
      this.nowTime = utils.formatDate(new Date())
      this.langOwmerAddress = this.minerData.owner_address
      this.tagFlag = true

      this.copyText = `lotus wallet sign ${this.langOwmerAddress} ${this.singedMsg}`

    },
    copyBtn(val) {
      const input = document.createElement('input');
      document.body.appendChild(input);
      input.setAttribute('value', val);
      input.select();

      if (document.execCommand('copy')) {
        document.execCommand('copy');
        if (this.lang == 'zh') {
          this.$message({
            message: '复制成功',
            type: 'success'
          })
        } else if (this.lang == 'en') {
          this.$message({
            message: 'Copy successfully',
            type: 'success'
          })
        } else if (this.lang == 'ja') {
          this.$message({
            message: 'コピー成功',
            type: 'success'
          })
        } else {
          this.$message({
            message: '성공적으로 복사',
            type: 'success'
          })
        }
      }
      document.body.removeChild(input);
    },
    tagOk(formName) {
      if (this.lang == 'zh') {
        if (!this.tagForm.enUser) {
          this.$notification.error({
            title: '错误',
            message: '请输入账户英文全称'
          })
          return
        }

        if (this.tagForm.enUser.length > 64) {
          this.$notification.error({
            title: '错误',
            message: '英文全称不超过16字符'
          })
          return
        }

        if (this.tagForm.chUser.length > 64) {
          this.$notification.error({
            title: '错误',
            message: '中文全称不超过16字符'
          })
          return
        }

        if (!this.tagForm.phone) {
          this.$notification.error({
            title: '错误',
            message: '请输入联系方式'
          })
          return
        }

        if (!this.tagForm.autograph) {
          this.$notification.error({
            title: '错误',
            message: '请输入签名'
          })
          return
        }
      } else if (this.lang == 'en') {
        if (!this.tagForm.enUser) {
          this.$notification.error({
            title: 'Error',
            message: 'Please inputAccount abbreviation(En) '
          })
          return
        }

        if (this.tagForm.enUser.length > 64) {
          this.$notification.error({
            title: 'Error',
            message: 'Account name(En) cannot over 16 characters'
          })
          return
        }

        if (this.tagForm.chUser.length > 64) {
          this.$notification.error({
            title: 'Error',
            message: 'Account name(Zh) cannot over 16 characters'
          })
          return
        }

        if (!this.tagForm.phone) {
          this.$notification.error({
            title: 'Error',
            message: 'Please inputContact'
          })
          return
        }

        if (!this.tagForm.autograph) {
          this.$notification.error({
            title: 'Error',
            message: 'Please inputSignature'
          })
          return
        }
      } else if (this.lang == 'ja') {
        if (!this.tagForm.enUser) {
          this.$notification.error({
            title: 'エラー',
            message: '英語のフルネームを入力してください'
          })
          return
        }

        if (this.tagForm.enUser.length > 64) {
          this.$notification.error({
            title: 'エラー',
            message: 'アカウント英語フルネーム 16文字以内です'
          })
          return
        }

        if (this.tagForm.chUser.length > 64) {
          this.$notification.error({
            title: 'エラー',
            message: 'アカウント中国語フルネーム 16文字以内です'
          })
          return
        }

        if (!this.tagForm.phone) {
          this.$notification.error({
            title: 'エラー',
            message: '連絡先を入力してください'
          })
          return
        }

        if (!this.tagForm.autograph) {
          this.$notification.error({
            title: 'エラー',
            message: '署名を入力してください '
          })
          return
        }
      } else {
        if (!this.tagForm.enUser) {
          this.$notification.error({
            title: '오류',
            message: '입력하세요계정 닉네임 (영어)'
          })
          return
        }

        if (this.tagForm.enUser.length > 64) {
          this.$notification.error({
            title: '오류',
            message: '계정 풀네임 (영어) 16 자 이하'
          })
          return
        }

        if (this.tagForm.chUser.length > 64) {
          this.$notification.error({
            title: '오류',
            message: '계정 풀네임 (중국어) 16 자 이하'
          })
          return
        }

        if (!this.tagForm.phone) {
          this.$notification.error({
            title: '오류',
            message: '입력하세요연락처'
          })
          return
        }

        if (!this.tagForm.autograph) {
          this.$notification.error({
            title: '오류',
            message: '입력하세요서명'
          })
          return
        }
      }

      this.OkLoading = true

      this.$axios.post('/api/explorer/set_miner_apply_tag', {
          address: this.langOwmerAddress,
          cn_tag: this.tagForm.chUser,
          en_tag: this.tagForm.enUser,
          contact: this.tagForm.phone,
          sign_bytes: this.tagForm.autograph,
          miner_no: this.miner_no
        })
        .then(res => {
          this.OkLoading = false
          if (res.code != 0) {
            if (this.lang == 'zh') {
              this.$notification.error({
                title: '错误',
                message: '签名错误'
              })
            } else if (this.lang == 'en') {
              this.$notification.error({
                title: 'Error',
                message: 'Signature error'
              })
            } else if (this.lang == 'ja') {
              this.$notification.error({
                title: 'エラー',
                message: '署名エラー'
              })
            } else {
              this.$notification.error({
                title: '오류',
                message: '서명 오류'
              })
            }
            return
          }
          this.updateGlobalMinerTagHandler()
          this.tagFlag = false
        })
    },
    updateGlobalMinerTagHandler() {
      let list = []
      this.$axios.post('/api/explorer/get_pool_miner_list', { is_pool: 1, page_size: 150 }, { progress: false })
        .then(res => {
          if (res.code != 0) return
          res.data.objs.map(per => {
            if (per.power < Math.pow(1024, 5) * 10) {
              list.push(per.miner_no)
            }
          })
          return this.$axios.post('/api/explorer/get_miner_apply_tag', {}, { progress: false })
        })
        .then(res => {
          if (!res || res.code != 0) return
          let _tags = {}
          res.data.map(per => {
            if (list.indexOf(per.miner_no) == -1) {
              _tags[per.miner_no] = per
            }
          })
          this.$store.commit('setGlobalMinerTag', _tags)
        })
    },
    initEchartsMinerPowerHandler: function() {
      let y1 = [], 
        y2 = [], 
        date = [],
        echartTitle = []

      if (this.lang == 'zh') {
        echartTitle = ['算力增量', '有效算力']
      } else if (this.lang == 'en') {
        echartTitle = ['Power Growth', 'Effective computing power']
      } else if (this.lang == 'ja') {
        echartTitle = ['計算力の増加', '有効計算力']
      } else {
        echartTitle = ['채굴파워 증가량', '유효 채굴파워']
      }

      this.minerLineDataLeft.map(item => {
        y1.unshift(item.increase_power_offset)
        y2.unshift(item.power)
        date.unshift(item.date)
      })
      let echarts = this.$echarts.init(document.getElementById('echartsMinerPower'))
      echarts.setOption(echartsUtils.optionsForMinerPower({
        y1,
        y2,
        date,
        echartTitle
      }))
    },
    initEchartsMinerPowerHandler_share: function() {
      let y1 = [], 
        y2 = [],
        date = [],
        echartTitle = []

      if (this.lang == 'zh') {
        echartTitle = ['算力增量', '有效算力']
      } else if (this.lang == 'en') {
        echartTitle = ['Power Growth', 'Effective computing power']
      } else if (this.lang == 'ja') {
        echartTitle = ['計算力の増加', '有効計算力']
      } else {
        echartTitle = ['채굴파워 증가량', '유효 채굴파워']
      }

      this.minerLineDataLeft.map(item => {
        y1.unshift(item.increase_power_offset)
        y2.unshift(item.power)
        date.unshift(item.date)
      })
      let echarts = this.$echarts.init(document.getElementById('echartsMinerPower_share'))
      echarts.setOption(echartsUtils.optionsForMinerPower({
        y1,
        y2,
        date,
        echartTitle
      }))
    },
    initEchartsMinerBalance: function() {
      let echarts = this.$echarts.init(document.getElementById('echartsMinerBalance'))
      let echartTitle = []
      if (this.lang == 'zh') {
        echartTitle = ['可用余额', 'Pledge', '奖励锁定', '预存款']
      } else if (this.lang == 'en') {
        echartTitle = ['Available \n Balance', 'Sector \n pledge', 'Reward\nlock-up', 'Advance deposit']
      } else if (this.lang == 'ja') {
        echartTitle = ['可用の余额', 'セクタ\n 抵当', 'ロックを \n 奨励する', '預金を預かる']
      } else {
        echartTitle = ['사용 가능한 \n 잔액', '섹터 \n 서약', '보상 \n 락업', '예금']
      }
      echarts.setOption(echartsUtils.optionsForMinerBalance({
        balance: this.minerData.available_balance, 
        init_pledge: this.minerData.initial_pledge_balance, 
        locked_pledge_balance: this.minerData.locked_balance,
        precommit_deposits_balance:this.minerData.precommit_deposits_balance,
        echartTitle
      }))
    },
    initEchartsMinerBalance_share: function() {
      let echarts = this.$echarts.init(document.getElementById('echartsMinerBalance_share'))
      let echartTitle = []
      if (this.lang == 'zh') {
        echartTitle = ['可用余额', 'Pledge', '奖励锁定', '预存款']
      } else if (this.lang == 'en') {
        echartTitle = ['Available \n Balance', 'Sector \n pledge', 'Reward\nlock-up', 'Advance deposit']
      } else if (this.lang == 'ja') {
        echartTitle = ['可用の余额', 'セクタ\n 抵当', 'ロックを \n 奨励する', '預金を預かる']
      } else {
        echartTitle = ['사용 가능한 \n 잔액', '섹터 \n 서약', '보상 \n 락업', '예금']
      }
      echarts.setOption(echartsUtils.optionsForMinerBalance({
        balance: this.minerData.available_balance, 
        init_pledge: this.minerData.initial_pledge_balance, 
        locked_pledge_balance: this.minerData.locked_balance,
        precommit_deposits_balance:this.minerData.precommit_deposits_balance,
        echartTitle
      }))
    },
    initEchartsMinerOutputReward: function() {
      let y1 = [], 
        y2 = [],
        date = [],
        echartTitle = []

      if (this.lang == 'zh') {
        echartTitle = ['验证成功数量', '奖励']
      } else if (this.lang == 'en') {
        echartTitle = ['Number of blocks', 'Reward']
      } else if (this.lang == 'ja') {
        echartTitle = ['ブロック数', '報酬をブロックする']
      } else {
        echartTitle = ['생성 된 블록 수', '블록 보상']
      }

      this.minerLineDataRight.map(item => {
        y1.unshift(item.block_count)
        y2.unshift(item.block_reward)
        date.unshift(item.date)
      })
      let echarts = this.$echarts.init(document.getElementById('echartsMinerOutputReward'))
      echarts.setOption(echartsUtils.optionsForMinerOutputReward({
        y1,
        y2,
        date,
        echartTitle
      }))
    },
    initEchartsMinerOutputReward_share: function() {
      let y1 = [], 
        y2 = [], 
        date = [],
        echartTitle = []

      if (this.lang == 'zh') {
        echartTitle = ['出块数量', '奖励']
      } else if (this.lang == 'en') {
        echartTitle = ['Number of blocks', 'Reward']
      } else if (this.lang == 'ja') {
        echartTitle = ['ブロック数', '報酬をブロックする']
      } else {
        echartTitle = ['생성 된 블록 수', '블록 보상']
      }

      this.minerLineDataRight.map(item => {
        y1.unshift(item.block_count)
        y2.unshift(item.block_reward)
        date.unshift(item.date)
      })
      let echarts = this.$echarts.init(document.getElementById('echartsMinerOutputReward_share'))
      echarts.setOption(echartsUtils.optionsForMinerOutputReward({
        y1,
        y2,
        date,
        echartTitle
      }))
    },
    initEchartsBlockPrediction: function() {
      let y1 = [], 
        y2 = [], 
        date = [],
        echartTitle = []

      if (this.lang == 'zh') {
        echartTitle = ['出块数量', '奖励']
      } else if (this.lang == 'en') {
        echartTitle = ['Number of blocks', 'Reward']
      } else if (this.lang == 'ja') {
        echartTitle = ['ブロック数', '報酬をブロックする']
      } else {
        echartTitle = ['생성 된 블록 수', '블록 보상']
      }

      this.predictionList.map(item => {
        y1.push(item.block_count)
        y2.push(item.block_reward)
        date.push(item.date)
      })
      let echarts = this.$echarts.init(document.getElementById('echartsBlockPrediction'))
      echarts.setOption(echartsUtils.optionsForMinerOutputReward({
        y1,
        y2,
        date,
        echartTitle
      }))
    },
    initEchartsWalletAccountChange: function() {
      let keys = [
        { val: 'owner_balance_value', key: 'owner' },
        { val: 'post_balance_value', key: 'post' },
        { val: 'worker_balance_value', key: 'worker' }
      ]
      let key = keys.filter(item => {
        return this.address_type.indexOf(item.key) > -1
      })
      let y1 = [],
        date = [],
        echartTitle = []

      if (this.lang == 'zh') {
        echartTitle = ['账户余额']
      } else if (this.lang == 'en') {
        echartTitle = ['Account Balance']
      } else if (this.lang == 'ja') {
        echartTitle = ['アカウント余额']
      } else {
        echartTitle = ['계정 잔액']
      }
      this.walletLineData.map(item => {
        y1.push(item.value)
        date.push(item.height_time)
      })
      let echarts = this.$echarts.init(document.getElementById('echartsWalletAccountChange'))
      echarts.setOption(echartsUtils.optionsForWalletAccountChange({
        title: '账户变化',
        date,
        value: [
          { title: echartTitle[0], value: y1 }
        ]
      }))
    },
    initEchartsGasConsumption(){
      let y1 = [],
          y2 = [],
        date = [],
        echartTitle = [];
      if (this.lang == 'zh') {
        echartTitle = ['当前存储供应商','全网均值']
      } else if (this.lang == 'en') {
        echartTitle = ['Current Storage Provider','Network average']
      } else if (this.lang == 'ja') {
        echartTitle = ['現在のストレージベンダー','全ネットワーク平均値']
      } else {
        echartTitle = ['현재 저장 공급자','네트워크 평균']
      }

      this.gasConsumptionList.map(item => {
        y1.unshift(item.day_create_gas)
        y2.unshift(item.overview_day_create_gas)
        date.unshift(item.date)
      })
      let echarts = this.$echarts.init(document.getElementById('echartsGasConsumption'))
      echarts.setOption(echartsUtils.revenueAnalysisEchart({
        y1,
        y2,
        date,
        echartTitle
      }))

    },
    selectGashandler(item){
      if (this.gasTime == item) return
      this.gasTime = item

      if(this.gasTime !== '24h'){
        this.$axios.post("/api/explorer/get_miner_gas_by_no",{
          miner_no:this.miner_no,
          stats_type:item
        }).then(res=>{
          this.gasConsumptionList = res.data.objs
          this.minerDataGas = res.data
          this.initEchartsGasConsumption()
        })
      }else{
        this.$axios.post("/api/explorer/get_miner_gas_by_no",{
          miner_no:this.miner_no,
          stats_type:'7d'
        }).then(res=>{
          this.gasConsumptionList = res.data.objs
          this.initEchartsGasConsumption()
        })
        this.$axios.post('/api/explorer/get_miner_overview_by_no', {
          miner_no: this.miner_no
        }).then(res=>{
          this.minerDataGas = res.data
        })

      }
      
    },
    changeGasTime(){
      if(this.gasTime !== '24h'){
        this.$axios.post("/api/explorer/get_miner_gas_by_no",{
          miner_no:this.miner_no,
          stats_type:this.gasTime
        }).then(res=>{
          this.gasConsumptionList = res.data.objs
          this.minerDataGas = res.data
          this.initEchartsGasConsumption()
        })
      }else{

        this.$axios.post("/api/explorer/get_miner_gas_by_no",{
          miner_no:this.miner_no,
          stats_type:'7d'
        }).then(res=>{
          this.gasConsumptionList = res.data.objs
          this.initEchartsGasConsumption()
        })

        this.$axios.post('/api/explorer/get_miner_overview_by_no', {
          miner_no: this.miner_no
        }).then(res=>{
          this.minerDataGas = res.data
        })
      }
    },
    selectCostStatistics: function(item) {
      if (this.outStatTime == item.value) return
      this.outStatTime = item.value
      this.get_miner_stats_by_no(this.outStatTime)
    },
    changeOutStatTime(){
      this.get_miner_stats_by_no(this.outStatTime)
    },

    selectStatTimehandler: function(item) {
      if (this.costStatistics == item.value) return
      this.costStatistics = item.value
      this.get_miner_gas_stats_by_no(this.costStatistics)
    },
    changeCostStatistics(){
      this.get_miner_gas_stats_by_no(this.costStatistics)
    },

    selectPowerhandler: function(item) {
      if (this.powerTime == item) return
      this.powerTime = item

      this.$axios.post('/api/explorer/get_miner_line_chart_by_no', {
        miner_no: this.miner_no,
        stats_type: item
      }).then(res => {
        this.minerLineDataLeft = res.data
        this.initEchartsMinerPowerHandler()
        this.initEchartsMinerPowerHandler_share()
      })
    },
    changePowerTime(){
      this.$axios.post('/api/explorer/get_miner_line_chart_by_no', {
        miner_no: this.miner_no,
        stats_type: this.powerTime
      }).then(res => {
        this.minerLineDataLeft = res.data
        this.initEchartsMinerPowerHandler()
      })
    },
    selectBlockhandler: function(item) {
      if (this.blockTime == item) return
      this.blockTime = item

      this.$axios.post('/api/explorer/get_miner_line_chart_by_no', {
        miner_no: this.miner_no,
        stats_type: item
      }).then(res => {
        this.minerLineDataRight = res.data
        this.initEchartsMinerOutputReward()
        this.initEchartsMinerOutputReward_share()
      })
    },
    changeBlockTime(){
      this.$axios.post('/api/explorer/get_miner_line_chart_by_no', {
        miner_no: this.miner_no,
        stats_type: this.blockTime
      }).then(res => {
        this.minerLineDataRight = res.data
        this.initEchartsMinerOutputReward()
      })
    },
    goSignIn(){
      sessionStorage.setItem('path',this.$route.path)
      this.$router.push(`/${this.lang}/account`)
    },
    changeCollection(){
      if(!this.collectionFlag){
        this.$axios.post('/api/explorer/add_collectible_miner',{
          user_id:this.user_info.user_id,
          miner_no:this.miner_no
        }).then(res=>{
          if(res.code !=0 ) return
          this.collectionFlag = true
        })
      }else if(this.collectionFlag){
        this.$axios.post('/api/explorer/del_collectible_miner',{
          user_id:this.user_info.user_id,
          miner_no:this.miner_no
        }).then(res=>{
          if(res.code !=0 ) return
          this.collectionFlag = false
        })
      }
    },
    changeCollectionWallet(){
      if(!this.collectionFlag){
        this.$axios.post('/api/explorer/add_collectible_wallet_address',{
          user_id:this.user_info.user_id,
          wallet_address:this.miner_no
        }).then(res=>{
          if(res.code !=0 ) return
          this.collectionFlag = true
        })
      }else if(this.collectionFlag){
        this.$axios.post('/api/explorer/del_collectible_wallet_address',{
          user_id:this.user_info.user_id,
          wallet_address:this.miner_no
        }).then(res=>{
          if(res.code !=0 ) return
          this.collectionFlag = false
        })
      }
    },
    blockTitlehandler(item){
      if (this.blockTitle == item) return
      this.blockTitle = item

      if(this.blockTitle == '出块预测'){
        this.$axios.post('/api/explorer/get_calculate_block_and_reward', {
          miner_no: this.miner_no
        }).then(res => {
          this.predictionList = res.data.slice(0,this.blockPrediction)
          this.initEchartsBlockPrediction()
        })
      }
    },
    blockPredictionhandler(item){
      if (this.blockPrediction == item) return
      this.blockPrediction = item
      this.predictionList = []
      this.$axios.post('/api/explorer/get_calculate_block_and_reward', {
        miner_no: this.miner_no
      }).then(res => {
        this.predictionList = res.data.slice(0,item)
        this.initEchartsBlockPrediction()
      })

      
    },
    scareBtn(){
      this.imgLoading = true
      this.imgUrl = ''
      this.nowtime = utils.getTime()

      let that = this
      setTimeout(()=>{
        let myBox = this.$refs.imageWrapper;
        let htmlDom = document.getElementById('shareBox')
        this.shareFlag = true
        html2canvas(myBox, {
          width: htmlDom.clientWidth,
          height: htmlDom.clientHeight,
          scrollY: 0, 
          scrollX: 0,
          scale:window.devicePixelRatio*2,
        }).then(function(canvas) {
          that.imgLoading = false
          let data = canvas.toDataURL("image/jpeg", 1);
          if(data.length < 10){
            that.dialogVisible = false
            return
          }else{
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
              a.download = that.miner_no+'存储供应商详情';
              a.href = url; 
              a.dispatchEvent(event); 
              that.dialogVisible = false
            };
            image.src = data

          }
        });
        this.shareFlag = false
        
      },1000)

      
    },
    toImage() {
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
        a.download = that.miner_no+'存储供应商详情'; 
        a.href = url; 
        a.dispatchEvent(event);
        that.dialogVisible = false
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
    back(){
      window.history.back(-1)
    },
    get_miner_stats_by_no(item='24h'){
      let list = {
        miner_no:this.miner_no,
        stats_type:item
      }
      this.$axios.post('/api/explorer/get_miner_stats_by_no',list).then(res=>{
        if(res.code !== 0) return 
        this.myDate = null
        this.miner_stats_by_no = res.data
      })
    },
    changeMyDate() {
      if (!this.myDate) {
        this.outStatTime = '24h'
        let list = {
          miner_no:this.miner_no,
          stats_type:this.outStatTime
        }
        this.$axios.post('/api/explorer/get_miner_stats_by_no',list).then(res=>{
          if(res.code !== 0) return 
          this.miner_stats_by_no = res.data
        })
          return;
      }
      [this.dateLeft, this.dateRight] = this.myDate;
      this.$axios
        .post("/api/explorer/get_miner_stats_by_no", {
          miner_no:this.miner_no,
          start_date: this.myDate[0],
          end_date: this.myDate[1],
        })
        .then((res) => {
          if (res.code != 0) return;
          this.outStatTime = ''
          this.miner_stats_by_no = res.data
        });
    },
    get_miner_gas_stats_by_no(item){
      let list = {
        miner_no:this.miner_no,
        stats_type:item
      }
      this.$axios.post('/api/explorer/get_miner_gas_stats_by_no',list).then(res=>{
        if(res.code !== 0) return 
        this.myDateCost = null
        this.miner_gas_stats_by_no = res.data
      })
    },
    changeMyDateCost() {
      if (!this.myDateCost) {
        this.costStatistics = '1d'
        let list = {
          miner_no:this.miner_no,
          stats_type:this.costStatistics
        }
        this.$axios.post('/api/explorer/get_miner_gas_stats_by_no',list).then(res=>{
          if(res.code !== 0) return 
          this.miner_gas_stats_by_no = res.data
        })
        return;
      }
      [this.dateLeftCost, this.dateRightCost] = this.myDateCost;
      this.$axios
        .post("/api/explorer/get_miner_gas_stats_by_no", {
          miner_no:this.miner_no,
          start_date: this.myDateCost[0],
          end_date: this.myDateCost[1],
        })
        .then((res) => {
          if (res.code != 0) return;
          this.costStatistics = ''
          this.miner_gas_stats_by_no = res.data
        });
    },
    toWalletFlow(item){
      localStorage.setItem('walletFlow',utils.trim(item))
      this.$router.push(`/${this.lang}/tool/walletFlow`)
    },
    goPrediction(){
      this.$router.push({
        path:`/${this.lang}/ecologicalAnalysis/prediction`,
        query:{ val : this.miner_no }
      })
    }
  },

  filters:{
  },
  beforeMount(){
    this.getHeight();
    this.$axios.post('/api/explorer/get_user_info').then(res=>{
      if(res.code !== 0){
        this.user_info = {}
        this.isSignIn = false
      }else{
        this.user_info = res.data
        this.isSignIn = true
      }
    })
    
    let type = this.type == 'shot' ? 'miner' : 'wallet'
    this.$axios.post('/api/explorer/get_collectible_status',{
      collectible_id : this.miner_no,
      type
    }).then(res=>{
      if(res.code !== 0) return
      this.collectionFlag = res.data
    })
  },

  mounted: function() {
    document.body.scrollTop = document.documentElement.scrollTop = 0
    

    if (this.type == 'shot') {
      this.initEchartsMinerBalance()
      this.initEchartsMinerPowerHandler()
      this.initEchartsMinerOutputReward()

      this.get_miner_stats_by_no()
      this.get_miner_gas_stats_by_no(this.costStatistics)

      this.initEchartsMinerBalance_share()
      this.initEchartsMinerPowerHandler_share()
      this.initEchartsMinerOutputReward_share()
    }
    else if (this.type == 'wallet') {
      this.initEchartsWalletAccountChange()
    }
  },

  beforeDestroy() {
  }
}
</script>
<style lang="scss">
.el-message-box {
  width: 60vw;
}
.activeTiele{
  font-weight: bold;
  color: #000;
}
.el-dialog__body {
  padding-top: 10px;
  padding-left: 10px;
  padding-right: 10px;
}

.el-dialog {
  margin-top: 10vh !important;
}

@media (min-width: 768px) {
  .el-dialog__body {
    padding-top: 10px;
    padding-left: 20px;
    padding-right: 20px;
  }

  .el-message-box {
    width: 40vw;
  }
}

@media (min-width: 1024px) {
  .el-dialog__body {
    padding-top: 10px;
  }

  .el-message-box {
    width: 20vw;
  }
}

.el-dialog__title {
  font-weight: bold;
}

.el-dialog__footer {
  .el-button {
    height: 2.5rem;
    width: 20%;
  }
}



.el-form--label-top .el-form-item__label {
  padding-bottom: 5px;
}

.collection-false{
  transition: all 0.2s linear;
}
.collectionBox{
  cursor: pointer;
  &:hover{
    .collection-false{
      transform:scale(1.1);
    }
  }
}
#shareBox{
  width: 340px;
  position:fixed;
  top: -99999px;
}
.showImgs{
  overflow: auto;
}
</style>