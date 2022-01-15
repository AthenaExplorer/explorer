<template>
  <div class='activePro mb-3'>
    <div class='lg:flex hidden text-2xl mb-3 items-center '>
      <p>{{$t('Lang.Miner health report')}}</p>
      <img v-if="lang == 'zh' " src="@/assets/imgs/personalMenuPro-zh.png" alt="" style='height:26px' class='ml-4 -mt-2'>
      <img v-if="lang == 'en' " src="@/assets/imgs/personalMenuPro-en.png" alt="" style='height:26px' class='ml-4 -mt-2'>
      <img v-if="lang == 'ko' " src="@/assets/imgs/personalMenuPro-ko.png" alt="" style='height:26px' class='ml-4 -mt-2'>
      <img v-if="lang == 'ja' " src="@/assets/imgs/personalMenuPro-ja.png" alt="" style='height:26px' class='ml-4 -mt-2'>
    </div>
    <div>
      <div class='mb-3 rounded-md bg-white '>
        <div class='px-4 py-0 lg:py-4 block lg:flex items-center justify-between border-b-0 lg:border-b border-solid border-E8E7EB'>
          <div class='lg:flex block mb-2 lg:mb-0'>
            <div class="flex items-center">
              <p class="lg:text-lg font-medium text-dark" >{{$t('Lang.Miner')}}</p>
              <div class='lg:hidden block'>
                <img v-if="lang == 'zh' " src="@/assets/imgs/personalMenuPro-zh.png" alt="" style='height:26px' class='ml-4 -mt-2'>
                <img v-if="lang == 'en' " src="@/assets/imgs/personalMenuPro-en.png" alt="" style='height:26px' class='ml-4 -mt-2'>
                <img v-if="lang == 'ko' " src="@/assets/imgs/personalMenuPro-ko.png" alt="" style='height:26px' class='ml-4 -mt-2'>
                <img v-if="lang == 'ja' " src="@/assets/imgs/personalMenuPro-ja.png" alt="" style='height:26px' class='ml-4 -mt-2'>
              </div>
            </div>

            <template v-if="collectionNodeList && collectionNodeList.length !== 0">
              <div class='mt-1' v-show="!lookOtherFlag">
                <div class='lg:mx-6 mx-0 lg:my-0 my-3 flex items-center w-48'>
                  <el-select v-model="collectionNode" placeholder="请选择" @change='changeNode'>
                    <el-option
                      v-for="item in collectionNodeList"
                      :key="item"
                      :label="item"
                      :value="item">
                    </el-option>
                  </el-select>
                </div>
              </div>
            </template>

            <template v-if="collectionNodeList && collectionNodeList.length == 0">
              <div class='mt-1' v-show="!lookOtherFlag">
                <div class='lg:mx-6 mx-0 lg:my-0 my-3 flex items-center '>
                  <p class='mr-2'>{{$t('Lang.Current node')}} : <span class='mx-2' style='color:#6F4715'>{{collectionNode}}</span></p>
                  
                </div>
              </div>
            </template>
            
            <div class='mt-1' v-show="lookOtherFlag">
              <div class='lg:mx-6 mx-0 lg:my-0 my-3  flex items-center '>
                <p class='mr-2'>{{$t('Lang.Current node')}}: <span class='mx-2'  style='color:#6F4715'>{{otherNode}}</span></p>
                <span @click='backCollection' class='text-main cursor-pointer hover:opacity-75'><i class="el-icon-close"></i></span>
              </div>
            </div>
          </div>
          <div class='title-box block lg:flex items-center lg:pt-2 pt-0'>
            <div class='lg:mr-4 -mr-2'>
              <el-input clearable v-model="nodeSeach" size="mini" :trigger-on-focus="false" @keyup.enter.native="nodeBtn" :placeholder="$t('Lang.View other miner')">
                <el-button slot="append" size='mini' @click="nodeBtn">
                  GO
                </el-button>
              </el-input>
            </div>
            <div class='flex justify-start lg:mt-0 mt-2 '>
              <div class='hidden lg:block'>
                <el-button @click='scareBtn' :disabled='shareFlag'>{{$t('Lang.Export')}}</el-button>
              </div>
            </div>
          </div>
        </div>
        <div class='py-16 px-10 hidden lg:flex' v-loading='Number(totalScore) == 0'>
          <div class='w-1/4 flex items-center justify-center'>
            <div class='text-center'>
              <countTo 
                class='text-6xl '
                :class="{'text-03A89F':Number(totalScore)>=90,'text-FA9300':Number(totalScore)>=60 && Number(totalScore)<90,'text-FF545C':Number(totalScore)<60}"
                :start-val="0" 
                :end-val="totalScore" 
                :duration="2000" />
              <p>
                {{$t('Lang.Overall score​')}}
                <el-popover trigger="hover" v-show="Number(totalScore)!==100" width="500">
                  <div class='text-left'>
                    <p v-show="totalScore_term.status_dict.score !== 20">{{$t("Lang.The operating status has not reached normal")}} <span class='text-FF545C'>-{{20-Number(totalScore_term.status_dict.score)}}</span> {{$t('Lang.Points')}}</p>
                    <p v-show="totalScore_term.avg_reward_dict.score !== 22">{{$t("Lang.Output efficiency has not reached very efficient")}} <span class='text-FF545C'>-{{22-Number(totalScore_term.avg_reward_dict.score)}}</span>{{$t('Lang.Points')}}</p>
                    <p v-show="totalScore_term.cost_dict.score !== 22">{{$t('Lang.Cost waste has not reached very low')}}<span class='text-FF545C'>-{{22-Number(totalScore_term.cost_dict.score)}}</span>{{$t('Lang.Points')}}</p>
                    <p v-show="totalScore_term.lucky_score !== 10" >{{$t('Lang.Explosion block analysis result: abnormal state')}}<span class='text-FF545C'>-10</span>{{$t('Lang.Points')}}</p>
                    <p v-show="totalScore_term.gas_score !== 10">{{$t('Lang.Cost analysis result: abnormal status')}}<span class='text-FF545C'>-10</span>{{$t('Lang.Points')}} </p>
                    <p v-show="totalScore_term.wallet_score !== 16 && totalScore_term.worker_estimated_day<=3 && totalScore_term.worker_estimated_day !==-1">{{$t("Lang.Workers wallet balance is insufficient")}}<span class='text-FF545C'>-8</span>{{$t('Lang.Points')}}</p>
                    <p v-show="totalScore_term.wallet_score !== 16 && totalScore_term.poster_estimated_day<=3 && totalScore_term.poster_estimated_day !==-1" >{{$t("Lang.Posts wallet balance is insufficient")}}<span class='text-FF545C'>-8</span>{{$t('Lang.Points')}}</p>
                    <p class='mt-2'>*{{$t('Lang.According to the selected time')}}</p>
                  </div>
                  <i class="el-icon-info cursor-pointer text-gray-500 text-base" slot="reference"></i>
                </el-popover>
              </p>
            </div>
          </div>
          <div class='h-48 w-px border-r border-solid border-E8E7EB'></div>
          <div class='w-1/4 flex items-center justify-center'>
            <div class='text-center'>
              <img src="../../assets/imgs/status_dict.png" v-if="scoreList.status_dict.status == 1" alt="" class='m-auto mb-2' style='width:56px'>
              <img src="../../assets/imgs/status_dict_yellow.png" v-else-if="scoreList.status_dict.status == 2" alt="" class='m-auto mb-2' style='width:56px'>
              <img src="../../assets/imgs/status_dict_red.png" v-else-if="scoreList.status_dict.status == 3" alt="" class='m-auto mb-2' style='width:56px'>
              <img src="../../assets/imgs/status_dict_ccc.png" v-else alt="" class='m-auto mb-2' style='width:56px'>
              <p>{{$t("Lang.Operating status")}}</p>
              <p class='mt-3 text-2xl text-03A89F' v-if="scoreList.status_dict.status == 1">{{$t("Lang.Normal")}}</p>
              <p class='mt-3 text-2xl text-FA9300' v-else-if="scoreList.status_dict.status == 2">{{$t("Lang.Well")}}</p>
              <p class='mt-3 text-2xl text-FF545C' v-else-if="scoreList.status_dict.status == 3">{{$t("Lang.Abnormal")}}</p>
              <p class='mt-3 text-2xl text-03A89F' v-else>--</p>
              <p class=' my-1'>{{$t("Lang.Sector error")}}：{{scoreList.status_dict.faulty_sector}} </p>
              <p class='text-848599 text-base' v-if="scoreList.status_dict.increase_power_offset_24.indexOf('-') !== -1">{{$t('Lang.Power Growth')}} {{scoreList.status_dict.increase_power_offset_24}}</p>
              <p class='text-848599 text-base' v-else>{{$t('Lang.No loss of computing power')}}</p>
            </div>
          </div>
          <div class='w-1/4 flex items-center justify-center'>
            <div class='text-center'>
              <img src="../../assets/imgs/avg_reward_dict.png" v-if='scoreList.avg_reward_dict.status == 1' alt="" class='m-auto mb-2' style='width:56px'>
              <img src="../../assets/imgs/avg_reward_dict.png" v-else-if='scoreList.avg_reward_dict.status == 2' alt="" class='m-auto mb-2' style='width:56px'>
              <img src="../../assets/imgs/avg_reward_dict_yellow.png" v-else-if='scoreList.avg_reward_dict.status == 3' alt="" class='m-auto mb-2' style='width:56px'>
              <img src="../../assets/imgs/avg_reward_dict_red.png" v-else-if='scoreList.avg_reward_dict.status == 4' alt="" class='m-auto mb-2' style='width:56px'>
              <img src="../../assets/imgs/avg_reward_dict_ccc.png" v-else alt="" class='m-auto mb-2' style='width:56px'>
              <p>{{$t("Lang.Production Efficiency")}}</p>
              <p class='mt-3 text-2xl text-03A89F' v-if='scoreList.avg_reward_dict.status == 1'>{{$t("Lang.Very efficient")}}</p>
              <p class='mt-3 text-2xl text-03A89F' v-else-if='scoreList.avg_reward_dict.status == 2'>{{$t("Lang.Excellent")}}</p>
              <p class='mt-3 text-2xl text-FA9300' v-else-if='scoreList.avg_reward_dict.status == 3'>{{$t("Lang.Medium")}}</p>
              <p class='mt-3 text-2xl text-FF545C' v-else-if='scoreList.avg_reward_dict.status == 4'>{{$t("Lang.Inefficient")}}</p>
              <p class='mt-3 text-2xl text-03A89F' v-else>--</p>
              <p class=' my-1'>{{$t("Lang.Efficiency")}}：{{scoreList.avg_reward_dict.avg_reward | formatTrueFil}} F/TiB</p>
              <p class='text-848599 text-base' v-if='scoreList.avg_reward_dict.status == 1'>{{$t("Lang.Higher than the network average")}}{{scoreList.avg_reward_dict.mark | GetPercentEasy}}</p>
              <p class='text-848599 text-base' v-else-if='scoreList.avg_reward_dict.status == 2'>{{$t("Lang.Higher than the network average")}}{{scoreList.avg_reward_dict.mark | GetPercentEasy}}</p>
              <p class='text-848599 text-base' v-else-if='scoreList.avg_reward_dict.status == 3'>{{$t("Lang.Lower than the network average")}}{{scoreList.avg_reward_dict.mark | GetPercentEasy}}</p>
              <p class='text-848599 text-base' v-else-if='scoreList.avg_reward_dict.status == 4'>{{$t("Lang.Lower than the network average")}}{{scoreList.avg_reward_dict.mark | GetPercentEasy}}</p>
              <p class='text-848599 text-base' v-else>--</p>
            </div>
          </div>
          <div class='w-1/4 flex items-center justify-center'>
            <div class='text-center'>
              <img src="../../assets/imgs/cost_dict.png" v-if="scoreList.cost_dict.status == 1" alt="" class='m-auto mb-2' style='width:56px'>
              <img src="../../assets/imgs/cost_dict.png" v-else-if="scoreList.cost_dict.status == 2" alt="" class='m-auto mb-2' style='width:56px'>
              <img src="../../assets/imgs/cost_dict_yellow.png" v-else-if="scoreList.cost_dict.status == 3" alt="" class='m-auto mb-2' style='width:56px'>
              <img src="../../assets/imgs/cost_dict_red.png" v-else-if="scoreList.cost_dict.status == 4" alt="" class='m-auto mb-2' style='width:56px'>
              <img src="../../assets/imgs/cost_dict_ccc.png" v-else alt="" class='m-auto mb-2' style='width:56px'>
              <p>{{$t("Lang.New computing power cost")}}</p>
              <p class='mt-3 text-2xl text-03A89F' v-if='scoreList.cost_dict.status == 1'>{{$t("Lang.Very low")}}</p>
              <p class='mt-3 text-2xl text-03A89F' v-else-if='scoreList.cost_dict.status == 2'>{{$t("Lang.Low")}}</p>
              <p class='mt-3 text-2xl text-FA9300' v-else-if='scoreList.cost_dict.status == 3'>{{$t("Lang.Medium")}}</p>
              <p class='mt-3 text-2xl text-FF545C' v-else-if='scoreList.cost_dict.status == 4'>{{$t("Lang.High")}}</p>
              <p class='mt-3 text-2xl text-03A89F' v-else>--</p>
              <p class='my-1'>{{$t("Lang.Cost")}}：{{  scoreList.cost_dict.cost | formatTrueFil}} F/TiB</p>
              <p class='text-848599 text-base' v-if='scoreList.cost_dict.status == 1'>{{$t("Lang.Lower than the network average")}}{{scoreList.cost_dict.mark | GetPercentEasy}}</p>
              <p class='text-848599 text-base' v-else-if='scoreList.cost_dict.status == 2'>{{$t("Lang.Lower than the network average")}}{{scoreList.cost_dict.mark | GetPercentEasy}}</p>
              <p class='text-848599 text-base' v-else-if='scoreList.cost_dict.status == 3'>{{$t("Lang.Higher than the network average")}}{{scoreList.cost_dict.mark | GetPercentEasy}}</p>
              <p class='text-848599 text-base' v-else-if='scoreList.cost_dict.status == 4'>{{$t("Lang.Higher than the network average")}}{{scoreList.cost_dict.mark | GetPercentEasy}}</p>
              <p class='text-848599 text-base' v-else>--</p>
            </div>
          </div>
        </div>
        <div class='py-8 px-2 lg:hidden flex lg:border-0 border border-solid border-E8E7EB' v-loading='Number(totalScore) == 0'>
          <div class='w-1/4 flex items-center justify-center'>
            <div class='text-center'>
              <countTo 
                class='text-6xl '
                :class="{'text-03A89F':Number(totalScore)>=90,'text-FA9300':Number(totalScore)>=60 && Number(totalScore)<90,'text-FF545C':Number(totalScore)<60}"
                :start-val="0" 
                :end-val="totalScore" 
                :duration="2000" />
              <p>{{$t('Lang.Overall score​')}}
                <el-popover trigger="hover" v-show="Number(totalScore)!==100" width="300">
                  <div class='text-left'>
                    <p v-show="totalScore_term.status_dict.score !== 20">{{$t("Lang.The operating status has not reached normal")}} <span class='text-FF545C'>-{{20-Number(totalScore_term.status_dict.score)}}</span> {{$t('Lang.Points')}}</p>
                    <p v-show="totalScore_term.avg_reward_dict.score !== 22">{{$t("Lang.Output efficiency has not reached very efficient")}} <span class='text-FF545C'>-{{22-Number(totalScore_term.avg_reward_dict.score)}}</span>{{$t('Lang.Points')}}</p>
                    <p v-show="totalScore_term.cost_dict.score !== 22">{{$t('Lang.Cost waste has not reached very low')}}<span class='text-FF545C'>-{{22-Number(totalScore_term.cost_dict.score)}}</span>{{$t('Lang.Points')}}</p>
                    <p v-show="totalScore_term.lucky_score !== 10" >{{$t('Lang.Explosion block analysis result: abnormal state')}}<span class='text-FF545C'>-10</span>{{$t('Lang.Points')}}</p>
                    <p v-show="totalScore_term.gas_score !== 10">{{$t('Lang.Cost analysis result: abnormal status')}}<span class='text-FF545C'>-10</span>{{$t('Lang.Points')}} </p>
                    <p v-show="totalScore_term.wallet_score !== 16 && totalScore_term.worker_estimated_day<=3 && totalScore_term.worker_estimated_day !==-1">{{$t("Lang.Workers wallet balance is insufficient")}}<span class='text-FF545C'>-8</span>{{$t('Lang.Points')}}</p>
                    <p v-show="totalScore_term.wallet_score !== 16 && totalScore_term.poster_estimated_day<=3 && totalScore_term.poster_estimated_day !==-1" >{{$t("Lang.Posts wallet balance is insufficient")}}<span class='text-FF545C'>-8</span>{{$t('Lang.Points')}}</p>
                    <p class='mt-2'>*{{$t('Lang.According to the selected time')}}</p>
                  </div>
                  <i class="el-icon-info cursor-pointer text-gray-500 text-base" slot="reference"></i>
                </el-popover>
              </p>
            </div>
          </div>
          <div class='w-3/4'>
            <div class='w-full flex ml-4'>
              <div>
                <img src="../../assets/imgs/status_dict.png" v-if="scoreList.status_dict.status == 1" alt="" class='my-3 ml-4' style='width:50px'>
                <img src="../../assets/imgs/status_dict_yellow.png" v-else-if="scoreList.status_dict.status == 2" alt="" class='my-3 ml-4' style='width:50px'>
                <img src="../../assets/imgs/status_dict_red.png" v-else-if="scoreList.status_dict.status == 3" alt="" class='my-3 ml-4' style='width:50px'>
                <img src="../../assets/imgs/status_dict_ccc.png" v-else alt="" class='my-3 ml-4' style='width:50px'>
              </div>
              <div class='ml-2 mt-2'>
                <p>{{$t("Lang.Operating status")}}
                  <span class='text-03A89F text-lg' v-if="scoreList.status_dict.status == 1">{{$t("Lang.Normal")}}</span>
                  <span class='text-FA9300 text-lg' v-else-if="scoreList.status_dict.status == 2">{{$t("Lang.Well")}}</span>
                  <span class='text-FF545C text-lg' v-else-if="scoreList.status_dict.status == 3">{{$t("Lang.Abnormal")}}</span>
                  <span class='text-03A89F text-lg' v-else>--</span>
                </p>
                <p class='text-lg my-1'>{{$t("Lang.Sector error")}}：{{scoreList.status_dict.faulty_sector}}</p>
                <p class='text-848599 text-base' v-if="scoreList.status_dict.increase_power_offset_24.indexOf('-') !== -1">{{$t('Lang.Power Growth')}} {{scoreList.status_dict.increase_power_offset_24}}</p>
                <p class='text-848599 text-base' v-else>{{$t('Lang.No loss of computing power')}}</p>
              </div>
            </div>
            <div class='w-full flex ml-4'>
              <div>
                <img src="../../assets/imgs/avg_reward_dict.png" v-if='scoreList.avg_reward_dict.status == 1' alt="" class='my-3 ml-4' style='width:50px'>
                <img src="../../assets/imgs/avg_reward_dict.png" v-else-if='scoreList.avg_reward_dict.status == 2' alt="" class='my-3 ml-4' style='width:50px'>
                <img src="../../assets/imgs/avg_reward_dict_yellow.png" v-else-if='scoreList.avg_reward_dict.status == 3' alt="" class='my-3 ml-4' style='width:50px'>
                <img src="../../assets/imgs/avg_reward_dict_red.png" v-else-if='scoreList.avg_reward_dict.status == 4' alt="" class='my-3 ml-4' style='width:50px'>
                <img src="../../assets/imgs/avg_reward_dict_ccc.png" v-else alt="" class='my-3 ml-4' style='width:50px'>
              </div>
              <div class='ml-2 mt-2'>
                <p>{{$t("Lang.Production Efficiency")}} 
                  <span class='text-03A89F text-lg' v-if='scoreList.avg_reward_dict.status == 1'>{{$t("Lang.Very efficient")}}</span>
                  <span class='text-03A89F text-lg' v-else-if='scoreList.avg_reward_dict.status == 2'>{{$t("Lang.Excellent")}}</span>
                  <span class='text-FA9300 text-lg' v-else-if='scoreList.avg_reward_dict.status == 3'>{{$t("Lang.Medium")}}</span>
                  <span class='text-FF545C text-lg' v-else-if='scoreList.avg_reward_dict.status == 4'>{{$t("Lang.Inefficient")}}</span>
                  <span class='text-03A89F text-lg' v-else>--</span>
                </p>
                <p class='text-lg my-1'>{{$t("Lang.Efficiency")}}：{{scoreList.avg_reward_dict.avg_reward | formatTrueFil}}F/TiB</p>
                <p class='text-848599 text-base' v-if='scoreList.avg_reward_dict.status == 1'>{{$t("Lang.Higher than the network average")}}{{scoreList.avg_reward_dict.mark | GetPercentEasy}}</p>
                <p class='text-848599 text-base' v-else-if='scoreList.avg_reward_dict.status == 2'>{{$t("Lang.Higher than the network average")}}{{scoreList.avg_reward_dict.mark | GetPercentEasy}}</p>
                <p class='text-848599 text-base' v-else-if='scoreList.avg_reward_dict.status == 3'>{{$t("Lang.Lower than the network average")}}{{scoreList.avg_reward_dict.mark | GetPercentEasy}}</p>
                <p class='text-848599 text-base' v-else-if='scoreList.avg_reward_dict.status == 4'>{{$t("Lang.Lower than the network average")}}{{scoreList.avg_reward_dict.mark | GetPercentEasy}}</p>
                <p class='text-848599 text-base' v-else>--</p>
              </div>
            </div>
            <div class='w-full flex ml-4'>
              <div>
                <img src="../../assets/imgs/cost_dict.png" v-if="scoreList.cost_dict.status == 1" alt="" class='my-3 ml-4' style='width:50px'>
                <img src="../../assets/imgs/cost_dict.png" v-else-if="scoreList.cost_dict.status == 2" alt="" class='my-3 ml-4' style='width:50px'>
                <img src="../../assets/imgs/cost_dict_yellow.png" v-else-if="scoreList.cost_dict.status == 3" alt="" class='my-3 ml-4' style='width:50px'>
                <img src="../../assets/imgs/cost_dict_red.png" v-else-if="scoreList.cost_dict.status == 4" alt="" class='my-3 ml-4' style='width:50px'>
                <img src="../../assets/imgs/cost_dict_ccc.png" v-else alt="" class='my-3 ml-4' style='width:50px'>
              </div>
              <div class='ml-2 mt-2'>
                <p>{{$t("Lang.New computing power cost")}}
                  <span class='text-03A89F text-lg' v-if='scoreList.cost_dict.status == 1'>{{$t("Lang.Very low")}}</span>
                  <span class='text-03A89F text-lg' v-else-if='scoreList.cost_dict.status == 2'>{{$t("Lang.Low")}}</span>
                  <span class='text-FA9300 text-lg' v-else-if='scoreList.cost_dict.status == 3'>{{$t("Lang.Medium")}}</span>
                  <span class='text-FF545C text-lg' v-else-if='scoreList.cost_dict.status == 4'>{{$t("Lang.High")}}</span>
                </p>
                <p class='text-lg my-1'>{{$t('Lang.Cost')}}：{{ scoreList.cost_dict.cost | formatTrueFil}} F/TiB</p>
                <p class='text-848599 text-base' v-if='scoreList.cost_dict.status == 1'>{{$t("Lang.Lower than the network average")}}{{scoreList.cost_dict.mark | GetPercentEasy}}</p>
                <p class='text-848599 text-base' v-else-if='scoreList.cost_dict.status == 2'>{{$t("Lang.Lower than the network average")}}{{scoreList.cost_dict.mark | GetPercentEasy}}</p>
                <p class='text-848599 text-base' v-else-if='scoreList.cost_dict.status == 3'>{{$t("Lang.Higher than the network average")}}{{scoreList.cost_dict.mark | GetPercentEasy}}</p>
                <p class='text-848599 text-base' v-else-if='scoreList.cost_dict.status == 4'>{{$t("Lang.Higher than the network average")}}{{scoreList.cost_dict.mark | GetPercentEasy}}</p>
                <p class='text-848599 text-base' v-else>--</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div >
        <div class="lg:flex">
          <div class="flex-1 rounded-md bg-white lg:border-0 border border-solid border-E8E7EB">
            <div class="flex items-center h-16 lg:h-20 px-3 lg:px-6 border-b border-solid border-E8E7EB">
              <span class="lg:text-xl font-bold">{{$t('Lang.Profit analysis')}}</span>
            </div>
            <div class="flex  items-center justify-between lg:h-28 h-24">
              <template v-for="(item, i) in profitList">
                <div v-if="i > 0" class="bg-E8E7EB h-12 w-px" :key="item.title + 'profitList'"></div>
                <div class="flex flex-1 justify-center items-center" :key="item.title + ''">
                  <div class="flex-1 flex items-center justify-center">
                    <div>
                      <template>
                        <div class='text-center'>
                          <span class="text-2xl">{{ item.val }}</span>
                          <span class="text-base">{{ item.unit }}</span>
                        </div>
                        <p class="text-848599 text-center h-8">{{ $t(item.title) }}</p>
                      </template>
                    </div>
                  </div>
                </div>
              </template>
            </div>
            <div id="revenueAnalysis" class="h-64 lg:h-96 px-4" v-loading='true'></div>
            <div class='px-6 my-4'>
              <div class='' style='background:#F9F9FD'>
                <p class='pl-10 py-4' >
                  <span v-show="objsOne.avg_reward_warn" style='color:#FA9300'>{{$t("Lang.The output efficiency of the node for the next 7 days is lower than 80% of the average of the entire network")}}</span>
                  <span v-show="!objsOne.avg_reward_warn">{{$t("Lang.Current output efficiency is normal")}}</span>
                  <el-popover trigger="hover" >
                    <p>{{$t("Lang.Evaluate with the average of the entire network for 7 consecutive days")}}</p>
                    <i class="el-icon-info cursor-pointer text-gray-500 text-base " slot="reference"></i>
                  </el-popover>
                </p>
              </div>
            </div>
          </div>
          <div class="w-3 h-full hidden lg:block"></div>
          <div class="mt-3 lg:mt-0 flex-1 rounded-md bg-white lg:border-0 border border-solid border-E8E7EB">
            <div class="flex items-center justify-between h-16 lg:h-20 px-3 lg:px-6 border-b border-solid border-E8E7EB">
              <div class="flex items-center">
                <span class="lg:text-xl font-bold">{{$t("Lang.Cost analysis")}}</span>
              </div>
            </div>
            <div class="lg:flex hidden  items-center justify-between h-28">
              <template v-for="(item, i) in costList">
                <div v-if="i > 0" class="bg-E8E7EB h-12 w-px" :key="item.title + 'line'"></div>
                <div class="flex flex-1 justify-center items-center" :key="item.title + 'costList'">
                  <div class="flex-1 flex items-center justify-center">
                    <div>
                      <template>
                        <div class='text-center'>
                          <span class="text-2xl">{{ item.val }}</span>
                          <span class="text-base">{{ item.unit }}</span>
                        </div>
                        <p class="text-848599 text-center h-8">{{ $t(item.title) }}</p>
                      </template>
                    </div>
                  </div>
                </div>
              </template>
            </div>
            <div class="flex lg:hidden  items-center justify-between flex-wrap my-2">
              <template v-for="(item, i) in costList">
                <div v-if="i%2  !== 0" class="bg-E8E7EB h-12 " style='width:0.25%' :key="item.title + 'line'"></div>
                <div style='width:49.75%' class=" flex  justify-center items-center" :key="item.title + 'costList'">
                  <div class="flex-1 flex items-center justify-center">
                    <div>
                      <template>
                        <div class='text-center'>
                          <span class="text-2xl">{{ item.val }}</span>
                          <span class="text-base">{{ item.unit }}</span>
                        </div>
                        <p class="text-848599 text-center h-8">{{ $t(item.title) }}</p>
                      </template>
                    </div>
                  </div>
                </div>
              </template>
            </div>
            <div class="flex lg:items-start items-center justify-end h-16 lg:h-16 px-3 lg:px-6">
              <ul class="flex justify-center checkbox-content">
                <li class="checkbox-list cursor-pointer py-1 px-3 lg:px-5 border border-solid border-E6E6EA" 
                  @click="changeCostType(item.value)" 
                  :class="{ 'first': index == 0, 'last':  costTypeList.length - 1 == index, 'activeProTable' : item.value == costType }" 
                  v-for="(item, index) in costTypeList" :key="item.value+'gas'">
                  {{$t(item.key)}}
                </li>
              </ul>
            </div>
            <div id="costAnalysis" class="h-64 lg:h-80 px-4" v-loading='true'></div>
            <div class='px-6 my-4'>
              <div class='' style='background:#F9F9FD'>
                <p class='pl-10 py-4'>
                  <span v-show="objsOne.gas_warn" style='color:#FA9300'>
                    <span>{{$t('Lang.7-day node')}}</span>
                    <span v-show="!objsOne.create_gas_warn">{{$t('Lang.Production gas')}}</span>
                    <span v-show="!objsOne.create_gas_warn && !objsOne.avg_reward_warn">、</span>
                    <span v-show="!objsOne.avg_reward_warn">{{$t('Lang.Maintenance gas')}}</span>
                    <span>{{$t('Lang.30% higher than the average of the whole Internet')}}</span>
                  </span>
                  <span v-show="!objsOne.gas_warn">{{$t("Lang.The current gas cost is normal")}}</span>
                  <el-popover trigger="hover">
                    <p>{{$t("Lang.Evaluate with the average of the entire network for 7 consecutive days")}}</p>
                    <i class="el-icon-info cursor-pointer text-gray-500 text-base" slot="reference"></i>
                  </el-popover>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-3 lg:flex">
          <div class="flex-1 rounded-md bg-white lg:border-0 border border-solid border-E8E7EB">
            <div class="flex items-center h-16 lg:h-20 px-3 lg:px-6 border-b border-solid border-E8E7EB">
              <span class="lg:text-xl font-bold">{{$t("Lang.Burst analysis")}}</span>
            </div>
            <div class="flex   items-center justify-between h-28">
              <template v-for="(item, i) in explosiveBlockList">
                <div v-if="i > 0" class="bg-E8E7EB h-12 w-px" :key="item.title + 'line'"></div>
                <div class="flex flex-1 justify-center items-center" :key="item.title + 'headerKey'">
                  <div class="flex-1 flex items-center justify-center">
                    <div>
                      <template>
                        <div class='text-center'>
                          <span class="text-2xl" v-if="item.val == 'NaN'">--</span>
                          <span class="text-2xl" v-else>{{ item.val }}</span>
                          <span class="text-base">{{ item.unit }}</span>
                        </div>
                        <p class="text-848599 text-center h-8">{{ $t(item.title) }}</p>
                      </template>
                    </div>
                  </div>
                </div>
              </template>
            </div>
            <div id="explosiveBlock" class="h-64 lg:h-96 px-4" v-loading='true'></div>
            <div class='px-6 my-4'>
              <div class='' style='background:#F9F9FD'>
                <p class='pl-10 py-4'>
                  <span v-show="objsOne.lucky_warn" style='color:#FA9300'>{{$t("Lang.The lucky value of the node for 7 consecutive days is lower than 50% of the official benchmark value")}}</span>
                  <span v-show="!objsOne.lucky_warn">{{$t("Lang.The current lucky value is normal")}}</span>
                  <el-popover trigger="hover">
                    <p>{{$t('Lang.Evaluate against the benchmark value for 7 consecutive days')}}</p>
                    <p>{{$t('Lang.Benchmark lucky value9970%')}}</p>
                    <p>{{$t('Lang.If the effective computing power is lower than 1PiB the value has a large randomness which is for reference only')}}</p>
                    <i class="el-icon-info cursor-pointer text-gray-500 text-base" slot="reference"></i>
                  </el-popover>
                </p>
              </div>
            </div>
          </div>
          <div class="w-3 h-full hidden lg:block"></div>
          <div class="mt-3 lg:mt-0 flex-1 rounded-md bg-white lg:border-0 border border-solid border-E8E7EB">
            <div class="flex items-center h-16 lg:h-20 px-3 lg:px-6 border-b border-solid border-E8E7EB">
              <span class="lg:text-xl font-bold">{{$t("Lang.Wallet")}}</span>
            </div>
            <div class="flex  items-center justify-between h-28">
              <template v-for="(item, i) in walletList">
                <div v-if="i > 0" class="bg-E8E7EB h-12 w-px" :key="item.title + 'line'"></div>
                <div class="flex flex-1 justify-center items-center" :key="item.title + 'walletList'">
                  <div class="flex-1 flex items-center justify-center">
                    <div>
                      <template>
                        <div class='text-center'>
                          <span class="text-2xl">{{ item.val }}</span>
                          <span class="text-base">{{ item.unit }}</span>
                        </div>
                        <p class="text-848599 text-center h-8">{{ $t(item.title) }}</p>
                      </template>
                    </div>
                    <div class='ml-4'>
                      <div class='text-center'>
                        <span class="text-2xl">{{ item.day }}{{$t("Lang.days")}}</span>
                      </div>
                      <p class="text-848599 text-center h-8">
                        {{$t("Lang.Expected to use")}}
                        <el-popover trigger="hover" v-show="item.day == '∞'">
                          <p>{{$t("Lang.It is not stored in the near future and the usage days cannot be predicted")}}</p>
                          <i class="el-icon-info cursor-pointer text-gray-500 text-base" slot="reference"></i>
                        </el-popover>
                      </p>
                    </div>
                  </div>
                </div>
              </template>
            </div>
            <div id="wallet" class="h-64 lg:h-96 px-4" v-loading='true'></div>
            <div class='px-6 my-4'>
              <div class='' style='background:#F9F9FD'>
                <div class='pl-10 py-4 flex' >
                  <p class='mr-2' v-show="!useTime.wallet_warn" style='color:#FA9300'>
                    <span v-show="useTime.worker_estimated_day<=3">worker</span>
                    <span v-show="useTime.worker_estimated_day<=3 && useTime.poster_estimated_day<=3">、</span>
                    <span v-show="useTime.poster_estimated_day<=3">post</span>
                    {{$t('Lang.Wallet is expected to be used for less than 3 days')}}
                  </p>
                  <p class='mr-2' v-show="useTime.wallet_warn">{{$t('Lang.The wallet is in normal condition and the balance is sufficient')}}</p>
                  <el-popover trigger="hover">
                    <p>{{$t("Lang.The estimated number of days of use may deviate from the actual, which is related to the actual packaging volume, gas fee and other factors")}}</p>
                    <i class="el-icon-info cursor-pointer text-gray-500 text-base" slot="reference"></i>
                  </el-popover>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="flex-1 rounded-md bg-white my-3 lg:border-0 border border-solid border-E8E7EB">
        <div class='flex items-center justify-between border-b border-solid border-E8E7EB'>
          <div class="flex items-center h-16 lg:h-20 px-3 lg:px-6 ">
            <span class="lg:text-xl font-bold">{{$t('Lang.Gas analysis')}}</span>
          </div>
          <div class="flex items-center justify-end h-16 lg:h-16 px-3 lg:px-6">
            <ul class="flex justify-center checkbox-content">
              <li class="checkbox-list cursor-pointer py-1 px-3 lg:px-5 border border-solid border-E6E6EA" 
              @click="changeGasTime(item.value)" 
              :class="{ 'first': index == 0, 'last':  gasList.length - 1 == index, 'activeProTable' : item.value == gasTime }" 
              v-for="(item, index) in gasList" :key="item.value+'gas'">
                {{$t(item.key)}}
              </li>
            </ul>
          </div>
        </div>
        <div class="lg:flex hidden items-center justify-between h-48">
          <div class='w-80 flex justify-center items-center'>
            <div class="flex-1 flex items-center justify-center">
              <div>
                  <div class='text-center'>
                    <span class="text-2xl" v-if=" miner_health_report_gas_stat_list.total_gas == '0.0000' ">0</span>
                    <span class="text-2xl" v-else>{{ miner_health_report_gas_stat_list.total_gas | formatEasyFil }}</span>
                  </div>
                  <p class="text-848599 text-center h-8">{{ $t('Lang.Gas total cost') }}</p>
              </div>
            </div>
          </div>
          <div class='flex flex-1 items-center justify-between flex-wrap'>
            <template v-for="(item, i) in gasHealthList">
              <div v-if="i%3 !== 0" class="bg-E8E7EB h-12 w-px" :key="item.title + 'line'"></div>
              <div class="flex justify-center items-center w-96" :key="item.title + 'headerKey'">
                <div class=" my-2 flex-1 flex items-center justify-center">
                  <div>
                    <template>
                      <div class='text-center'>
                        <span class="text-2xl" v-if=" item.val == '0.0000' ">0</span>
                        <span class="text-2xl" v-else>{{ item.val }}</span>
                        <span class="text-base">{{ item.unit }}</span>
                      </div>
                      <p class="text-848599 text-center h-8">{{ item.title }}</p>
                    </template>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>

        <div class="lg:hidden h-46  my-2">
          <div class=' flex justify-center items-center'>
            <div class="flex-1 flex items-center justify-center">
              <div>
                  <div class='text-center'>
                    <span class="text-2xl" v-if=" miner_health_report_gas_stat_list.total_gas == '0.0000' ">0</span>
                    <span class="text-2xl" v-else>{{ miner_health_report_gas_stat_list.total_gas  | formatEasyFil }}</span>
                  </div>
                  <p class="text-848599 text-center h-8">{{ $t('Lang.Gas total cost') }}</p>
              </div>
            </div>
          </div>
          <div class='flex flex-1 items-center justify-between flex-wrap'>
            <template v-for="(item, i) in gasHealthList">
              <div v-if="i%2 !== 0"  class="bg-E8E7EB h-12 w-px" :key="item.title + 'line'"></div>
              <div style='width:49.75%' class="flex justify-center items-center" :key="item.title + 'headerKey'">
                <div class="flex-1 flex items-center justify-center">
                  <div>
                    <template>
                      <div class='text-center'>
                        <span class="text-2xl" v-if=" item.val == '0.0000' ">0</span>
                        <span class="text-2xl" v-else>{{ item.val }}</span>
                        <span class="text-base">{{ item.unit }}</span>
                      </div>
                      <p class="text-848599 text-center h-8">{{ item.title }}</p>
                    </template>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>
        
      </div>
      <div class="flex-1 rounded-md bg-white my-3 hidden lg:block">
        <div class='flex items-center justify-between border-b border-solid border-E8E7EB'>
          <div class="flex items-center h-16 lg:h-20 px-3 lg:px-6 ">
            <span class="lg:text-xl font-bold">{{$t('Lang.Message quality analysis')}}</span>
          </div>
          <div class="flex items-center justify-end h-16 lg:h-16 px-3 lg:px-6">
            <ul class="flex justify-center checkbox-content">
              <li class="checkbox-list cursor-pointer py-1 px-3 lg:px-5 border border-solid border-E6E6EA" 
              @click="changeMsgTime(item.value)" 
              :class="{ 'first': index == 0, 'last':  msgList.length - 1 == index, 'activeProTable' : item.value == msgTime }" 
              v-for="(item, index) in msgList" :key="item.value+'gas'">
                {{$t(item.key)}}
              </li>
            </ul>
          </div>
        </div>
        <div class="lg:flex hidden items-center justify-between h-72 flex-wrap">
          <template v-for="(item, i) in costHealthList">
            <div v-if="i%3 !== 0" class="bg-E8E7EB h-16 w-px" :key="item.title + 'line'"></div>
            <div class="flex justify-center items-center w-128" :key="i + 'headerKey'">
              <div class="flex-1 flex items-center justify-center">
                <div class='w-full text-center px-6'>
                  <p class='mb-4'>{{item.title}}</p>
                  <div class='flex items-center justify-around'>
                    <div v-for="(k,m) in item.sublist" :key="m+'msg'" class='w-1/4'>
                      <p class='mb-1'>{{$t(k.title)}}</p>
                      <p>{{k.val}}</p>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </template>
        </div>

        <div class="block lg:hidden items-center justify-between my-4">
          <template v-for="(item, i) in costHealthList">
            <div class="flex flex-1 justify-center items-center" :key="i + 'headerKey'">
              <div class="flex-1 flex items-center justify-center">
                <div class='w-full text-center px-6'>
                  <p class='mt-4 mb-2'>{{item.title}}</p>
                  <div class='flex items-center justify-around'>
                    <div v-for="(k,m) in item.sublist" :key="m+'msg'" style='width:23%'>
                      <div class='border-solid border-E8E7EB' :class="{'border-l':m>0}">
                        <p class='mb-1'>{{$t(k.title)}}</p>
                        <p>{{k.val}}</p>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
      
      <div class="flex-1 rounded-md bg-white my-3 lg:border-0 border border-solid border-E8E7EB">
        <div class='flex items-center justify-between border-b border-solid border-E8E7EB'>
          <div class="flex items-center h-16 lg:h-20 px-3 lg:px-6 ">
            <span class="lg:text-xl font-bold">{{$t('Lang.Wallet flow')}}</span>
          </div>
          <div class='lg:flex hidden px-2 lg:px-4 pt-8 pb-8  items-center justify-between  h-10 '>
            <div class='text-75737F'>{{$t('Lang.A total of')}} {{total_count}} {{$t('Lang.messages')}}</div>
            <div class="flex items-center justify-end h-16 lg:h-16 px-3 lg:px-6">
              <ul class="flex justify-center checkbox-content">
                  <li class="checkbox-list cursor-pointer py-1 px-3 lg:px-5 border border-solid border-E6E6EA" @click="selectGashandler(item)" :class="{ 'first': index == 0, 'last':  fineList.length - 1 == index, 'activeProTable' : item.value == fine }" v-for="(item, index) in fineList" :key="item.value+'gas'">
                  {{item.value}}
                  </li>
              </ul>
            </div>
          </div>
        </div>
        <div class=''>
          <div class='block lg:hidden  px-2 lg:px-4 pt-8 pb-8 flex items-center justify-between  h-10 border-b border-solid border-E8E7EB'>
            <div class='text-75737F'>{{$t('Lang.A total of')}} {{total_count}} {{$t('Lang.messages')}}</div>
            <div class="flex items-center justify-end h-16 lg:h-16 px-3 lg:px-6">
              <ul class="flex justify-center checkbox-content">
                  <li class="checkbox-list cursor-pointer py-1 px-3 lg:px-5 border border-solid border-E6E6EA" @click="selectGashandler(item)" :class="{ 'first': index == 0, 'last':  fineList.length - 1 == index, 'activeProTable' : item.value == fine }" v-for="(item, index) in fineList" :key="item.value+'gas'">
                  {{item.value}}
                  </li>
              </ul>
            </div>
          </div>
          <div v-show="objs.length !== 0">
            <div class="hidden lg:block px-4" v-loading='loadingFlag'>
              <table class="table-fixed w-full">
                <thead>
                  <tr class="">
                    <th class="w-1/12 py-4 font-medium pl-5">{{$t('Lang.Message ID')}}</th>
                    <th class="w-1/12 py-4 font-medium">{{$t('Lang.Height')}}</th>
                    <th class="w-1/12 py-4 font-medium">{{$t('Lang.Sender')}}</th>
                    <th class="w-1/12 py-4 font-medium"></th>
                    <th class="w-1/12 py-4 font-medium">{{$t('Lang.Receiver')}}</th>
                    <th class="w-1/12 py-4 font-medium">{{$t('Lang.Types')}}</th>
                    <th class="w-1/12 py-4 font-medium">{{$t('Lang.Amount')}}</th>
                    <th class="w-1/12 py-4 font-medium">{{$t('Lang.time')}}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in objs" class="border-b border-solid border-E8E7EB" :key="index + '_index'">
                    <td class="w-1/12 py-3 text-center pl-5">
                      <el-popover
                        placement="right"
                        trigger="hover"
                        :content="item.msg_cid">
                        <n-link slot="reference" :to="`/${lang}/chain/msg/${item.msg_cid}-${item.height}`">{{item.msg_cid | getProSubStr}}</n-link>
                      </el-popover>
                    </td>
                    <td class="w-1/12 py-3 text-center">
                      <n-link :to="`/${lang}/chain/tipset/${item.height}`" class='text-main cursor-pointer hover:opacity-75'>{{item.height}}</n-link>
                    </td>
                    <td class="w-2/12 py-3 text-center ">
                      <div  class='flex items-center justify-center truncate'>
                        <div class=''>
                          <el-popover
                            placement="right"
                            trigger="hover"
                            :content="item.msg_from">
                            <n-link slot="reference" :to="`/${lang}/chain/addr/${item.msg_from}`">{{item.msg_from | getSubStr}}</n-link>
                          </el-popover>
                        </div>
                        <div class="border border-solid border-E8E7EB rounded ml-3 flex items-center" v-if="item.msg_from_tag[0]">
                            <span class="mx-3 text-75737F" style='white-space: nowrap'>{{item.msg_from_tag[0]}}</span>
                            <img v-show="item.msg_from_tag[1]" src="@/assets/imgs/isSigned.png" alt="" class='mr-2' style='width:12px;height:14px'>
                        </div>
                      </div>
                    </td>
                    <td class="w-16 py-3 text-center truncate">
                      <img class='m-auto' src="@/assets/imgs/to.png" alt="" style='width:13px'>
                    </td>
                    <td class="w-2/12 py-3 text-center truncate">
                      <div class='flex items-center justify-center'>
                        <el-popover
                            placement="right"
                            trigger="hover"
                            :content="item.msg_to">
                            <n-link slot="reference" :to="`/${lang}/chain/addr/${item.msg_to}`">{{item.msg_to | getSubStr}}</n-link>
                          </el-popover>
                      </div>
                    </td>
                    <td class="w-1/12 py-3 text-center">{{item.msg_method_name}}</td>
                    <td class="w-1/12 py-3 text-center">{{item.msg_value | formatTrueFil(true)}}</td>
                    <td class="w-1/12 py-3 text-center">{{item.height_time}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="lg:hidden" v-loading='loadingFlag'>
              <div v-for="(item, index) in objs" class="p-3 border-b border-solid border-E8E7EB" :key="index + '_index'">
                <div class="flex items-center justify-between">
                  <span class="flex-1">{{$t('Lang.Message ID')}}</span>
                  <div class="w-1/2 text-right truncate">
                    <n-link :to="`/${lang}/chain/msg/${item.msg_cid}-${item.height}`">{{item.msg_cid | getSubStr}}</n-link>
                  </div>
                </div>
                <div class="flex items-center justify-between">
                  <span>{{$t('Lang.Height')}}</span>
                  <n-link :to="`/${lang}/chain/tipset/${item.height}`" class='text-main cursor-pointer hover:opacity-75'>{{item.height}}</n-link>
                </div>
                <div class="flex items-center justify-between">
                  <span>{{$t('Lang.Sender')}}</span>
                  <div class="text-right truncate flex items-center justify-center">
                    <n-link :to="`/${lang}/chain/addr/${item.msg_from}`">{{item.msg_from | getSubStr}}</n-link>
                    <div class="border border-solid border-E8E7EB rounded ml-3 flex items-center" v-if="item.msg_from_tag[0]">
                      <span class="mx-3 text-75737F" style='white-space: nowrap'>{{item.msg_from_tag[0]}}</span>
                      <img v-show="item.msg_from_tag[1]" src="@/assets/imgs/isSigned.png" alt="" class='mr-2' style='width:12px;height:14px'>
                    </div>
                  </div>
                </div>
                <div class="flex items-center justify-between">
                  <span>{{$t('Lang.Receiver')}}</span>
                  <div class="text-right truncate flex items-center justify-center">
                    <n-link :to="`/${lang}/chain/addr/${item.msg_to}`">{{item.msg_to | getSubStr}}</n-link>
                  </div>
                </div>
                <div class="flex items-center justify-between">
                  <span>{{$t('Lang.Types')}}</span>
                  <span>{{item.msg_method_name}}</span>
                </div>
                <div class="flex items-center justify-between">
                  <span>{{$t('Lang.Amount')}}</span>
                  <span>{{item.msg_value | formatTrueFil(true)}}</span>
                </div>
                <div class="flex items-center justify-between">
                  <span>{{$t('Lang.time')}}</span>
                  <span>{{item.height_time}}</span>
                </div>
              </div>
            </div>
            <div class="my-3 lg:my-6 pb-4">
              <Pagination :pageSize="page_size" :pageIndex="page_index" :totalCount="total_count" @indexChange="searchRecordHandler" @sizeChange='handleCurrentChange'></Pagination>
            </div>
          </div>
          <div v-show="objs.length == 0" class='flex items-center justify-center' style='height:40vh'>
            <div class='text-center'>
              <img src="@/assets/imgs/noMsg.png" alt="" style='width:150px'>
              <p style='color:#5F6578' class='mb-10'>{{$t('Lang.No data')}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>


    <div id="shareBoxs" ref="imageWrappers">
      <div class='shareTop h-64 pt-10' style='background:#182A77'>
        <div style='width:1260px;margin-left:110px' class='flex justify-between'>
          <div class='text-white'>
            <img class="h-10" src="~/assets/img/icon-en-logo.png" />
            <p class='text-xl mt-6 pb-1 pb-2 border-b-2  border-solid border-F4BF75' >{{$t('Lang.Miner health report')}}：{{collectionNode}}</p>
          </div>
          <div class='mt-4'>
            <p class='text-white' >{{nowtime}}</p>
          </div>
        </div>
        <img src="@/assets/imgs/bg-shape.png" alt="" class='relative ' style='width:500px;z-index:2;left:800px;top:-120px'>
      </div>
      <div style='width:1260px;margin-left:110px;z-index:5' class='-mt-20 bg-white relative'>
        <div class='py-16 px-10 hidden lg:flex border border-solid border-E8E7EB my-3'>
          <div class='w-1/4 flex items-center justify-center'>
            <div class='text-center'>
              <countTo 
                class='text-6xl '
                :class="{'text-03A89F':Number(totalScore)>=90,'text-FA9300':Number(totalScore)>=60 && Number(totalScore)<90,'text-FF545C':Number(totalScore)<60}"
                :start-val="0" 
                :end-val="totalScore" 
                :duration="2000" />
              <p>
                {{$t('Lang.Overall score​')}}
                <el-popover trigger="hover" v-show="Number(totalScore)!==100">
                  <div class='text-left'>
                    <p v-show="totalScore_term.status_dict.score !== 20">{{$t("Lang.The operating status has not reached normal")}} <span class='text-FF545C'>-{{20-Number(totalScore_term.status_dict.score)}}</span> {{$t('Lang.Points')}}</p>
                    <p v-show="totalScore_term.avg_reward_dict.score !== 22">{{$t("Lang.Output efficiency has not reached very efficient")}} <span class='text-FF545C'>-{{22-Number(totalScore_term.avg_reward_dict.score)}}</span>{{$t('Lang.Points')}}</p>
                    <p v-show="totalScore_term.cost_dict.score !== 22">{{$t('Lang.Cost waste has not reached very low')}}<span class='text-FF545C'>-{{22-Number(totalScore_term.cost_dict.score)}}</span>{{$t('Lang.Points')}}</p>
                    <p v-show="totalScore_term.lucky_score !== 10" >{{$t('Lang.Explosion block analysis result: abnormal state')}}<span class='text-FF545C'>-10</span>{{$t('Lang.Points')}}</p>
                    <p v-show="totalScore_term.gas_score !== 10">{{$t('Lang.Cost analysis result: abnormal status')}}<span class='text-FF545C'>-10</span>{{$t('Lang.Points')}} </p>
                    <p v-show="totalScore_term.wallet_score !== 16 && totalScore_term.worker_estimated_day<=3 && totalScore_term.worker_estimated_day !==-1">{{$t("Lang.Workers wallet balance is insufficient")}}<span class='text-FF545C'>-8</span>{{$t('Lang.Points')}}</p>
                    <p v-show="totalScore_term.wallet_score !== 16 && totalScore_term.poster_estimated_day<=3 && totalScore_term.poster_estimated_day !==-1" >{{$t("Lang.Posts wallet balance is insufficient")}}<span class='text-FF545C'>-8</span>{{$t('Lang.Points')}}</p>
                  </div>
                  <i class="el-icon-info cursor-pointer text-gray-500 text-base" slot="reference"></i>
                </el-popover>
              </p>
            </div>
          </div>
          <div class='h-48 w-px border-r border-solid border-E8E7EB'></div>
          <div class='w-1/4 flex items-center justify-center'>
            <div class='text-center'>
              <img src="../../assets/imgs/status_dict.png" v-if="scoreList.status_dict.status == 1" alt="" class='m-auto mb-2' style='width:56px'>
              <img src="../../assets/imgs/status_dict_yellow.png" v-else-if="scoreList.status_dict.status == 2" alt="" class='m-auto mb-2' style='width:56px'>
              <img src="../../assets/imgs/status_dict_red.png" v-else-if="scoreList.status_dict.status == 3" alt="" class='m-auto mb-2' style='width:56px'>
              <img src="../../assets/imgs/status_dict_ccc.png" v-else alt="" class='m-auto mb-2' style='width:56px'>
              <p>{{$t("Lang.Operating status")}}</p>
              <p class='mt-3 text-2xl text-03A89F' v-if="scoreList.status_dict.status == 1">{{$t("Lang.Normal")}}</p>
              <p class='mt-3 text-2xl text-FA9300' v-else-if="scoreList.status_dict.status == 2">{{$t("Lang.Well")}}</p>
              <p class='mt-3 text-2xl text-FF545C' v-else-if="scoreList.status_dict.status == 3">{{$t("Lang.Abnormal")}}</p>
              <p class='mt-3 text-2xl text-03A89F' v-else>--</p>
              <p class=' my-1'>{{$t("Lang.Sector error")}}：{{scoreList.status_dict.faulty_sector}} </p>
              <p class='text-848599 text-base' v-if="scoreList.status_dict.increase_power_offset_24.indexOf('-') !== -1">{{$t('Lang.Power Growth')}} {{scoreList.status_dict.increase_power_offset_24}}</p>
              <p class='text-848599 text-base' v-else>{{$t('Lang.No loss of computing power')}}</p>
            </div>
          </div>
          <div class='w-1/4 flex items-center justify-center'>
            <div class='text-center'>
              <img src="../../assets/imgs/avg_reward_dict.png" v-if='scoreList.avg_reward_dict.status == 1' alt="" class='m-auto mb-2' style='width:56px'>
              <img src="../../assets/imgs/avg_reward_dict.png" v-else-if='scoreList.avg_reward_dict.status == 2' alt="" class='m-auto mb-2' style='width:56px'>
              <img src="../../assets/imgs/avg_reward_dict_yellow.png" v-else-if='scoreList.avg_reward_dict.status == 3' alt="" class='m-auto mb-2' style='width:56px'>
              <img src="../../assets/imgs/avg_reward_dict_red.png" v-else-if='scoreList.avg_reward_dict.status == 4' alt="" class='m-auto mb-2' style='width:56px'>
              <img src="../../assets/imgs/avg_reward_dict_ccc.png" v-else alt="" class='m-auto mb-2' style='width:56px'>
              <p>{{$t("Lang.Production Efficiency")}}</p>
              <p class='mt-3 text-2xl text-03A89F' v-if='scoreList.avg_reward_dict.status == 1'>{{$t("Lang.Very efficient")}}</p>
              <p class='mt-3 text-2xl text-03A89F' v-else-if='scoreList.avg_reward_dict.status == 2'>{{$t("Lang.Excellent")}}</p>
              <p class='mt-3 text-2xl text-FA9300' v-else-if='scoreList.avg_reward_dict.status == 3'>{{$t("Lang.Medium")}}</p>
              <p class='mt-3 text-2xl text-FF545C' v-else-if='scoreList.avg_reward_dict.status == 4'>{{$t("Lang.Inefficient")}}</p>
              <p class='mt-3 text-2xl text-03A89F' v-else>--</p>
              <p class=' my-1'>{{$t("Lang.Efficiency")}}：{{scoreList.avg_reward_dict.avg_reward | formatTrueFil}}F/TiB</p>
              <p class='text-848599 text-base' v-if='scoreList.avg_reward_dict.status == 1'>{{$t("Lang.Higher than the network average")}}{{scoreList.avg_reward_dict.mark | GetPercentEasy}}</p>
              <p class='text-848599 text-base' v-else-if='scoreList.avg_reward_dict.status == 2'>{{$t("Lang.Higher than the network average")}}{{scoreList.avg_reward_dict.mark | GetPercentEasy}}</p>
              <p class='text-848599 text-base' v-else-if='scoreList.avg_reward_dict.status == 3'>{{$t("Lang.Lower than the network average")}}{{scoreList.avg_reward_dict.mark | GetPercentEasy}}</p>
              <p class='text-848599 text-base' v-else-if='scoreList.avg_reward_dict.status == 4'>{{$t("Lang.Lower than the network average")}}{{scoreList.avg_reward_dict.mark | GetPercentEasy}}</p>
              <p class='text-848599 text-base' v-else>--</p>
            </div>
          </div>
          <div class='w-1/4 flex items-center justify-center'>
            <div class='text-center'>
              <img src="../../assets/imgs/cost_dict.png" v-if="scoreList.cost_dict.status == 1" alt="" class='m-auto mb-2' style='width:56px'>
              <img src="../../assets/imgs/cost_dict.png" v-else-if="scoreList.cost_dict.status == 2" alt="" class='m-auto mb-2' style='width:56px'>
              <img src="../../assets/imgs/cost_dict_yellow.png" v-else-if="scoreList.cost_dict.status == 3" alt="" class='m-auto mb-2' style='width:56px'>
              <img src="../../assets/imgs/cost_dict_red.png" v-else-if="scoreList.cost_dict.status == 4" alt="" class='m-auto mb-2' style='width:56px'>
              <img src="../../assets/imgs/cost_dict_ccc.png" v-else alt="" class='m-auto mb-2' style='width:56px'>
              <p>{{$t("Lang.New computing power cost")}}</p>
              <p class='mt-3 text-2xl text-03A89F' v-if='scoreList.cost_dict.status == 1'>{{$t("Lang.Very low")}}</p>
              <p class='mt-3 text-2xl text-03A89F' v-else-if='scoreList.cost_dict.status == 2'>{{$t("Lang.Low")}}</p>
              <p class='mt-3 text-2xl text-FA9300' v-else-if='scoreList.cost_dict.status == 3'>{{$t("Lang.Medium")}}</p>
              <p class='mt-3 text-2xl text-FF545C' v-else-if='scoreList.cost_dict.status == 4'>{{$t("Lang.High")}}</p>
              <p class='mt-3 text-2xl text-03A89F' v-else>--</p>
              <p class='my-1'>{{$t("Lang.Cost")}}：{{  scoreList.cost_dict.cost | formatTrueFil}} F/TiB</p>
              <p class='text-848599 text-base' v-if='scoreList.cost_dict.status == 1'>{{$t("Lang.Lower than the network average")}}{{scoreList.cost_dict.mark | GetPercentEasy}}</p>
              <p class='text-848599 text-base' v-else-if='scoreList.cost_dict.status == 2'>{{$t("Lang.Lower than the network average")}}{{scoreList.cost_dict.mark | GetPercentEasy}}</p>
              <p class='text-848599 text-base' v-else-if='scoreList.cost_dict.status == 3'>{{$t("Lang.Higher than the network average")}}{{scoreList.cost_dict.mark | GetPercentEasy}}</p>
              <p class='text-848599 text-base' v-else-if='scoreList.cost_dict.status == 4'>{{$t("Lang.Higher than the network average")}}{{scoreList.cost_dict.mark | GetPercentEasy}}</p>
              <p class='text-848599 text-base' v-else>--</p>
            </div>
          </div>
        </div>
        <div>
          <div class="lg:flex">
            <div class="flex-1 border border-solid border-E8E7EB">
              <div class="flex items-center h-16 px-3 lg:px-6 border-b border-solid border-E8E7EB">
                <span class="lg:text-xl font-bold -mt-4">{{$t('Lang.Profit analysis')}}</span>
              </div>
              <div class="flex  items-center justify-between lg:h-28 h-24">
                <template v-for="(item, i) in profitList">
                  <div v-if="i > 0" class="bg-E8E7EB h-12 w-px" :key="item.title + 'profitList'"></div>
                  <div class="flex flex-1 justify-center items-center" :key="item.title + ''">
                    <div class="flex-1 flex items-center justify-center">
                      <div>
                        <template>
                          <div class='text-center'>
                            <span class="text-2xl">{{ item.val }}</span>
                            <span class="text-base">{{ item.unit }}</span>
                          </div>
                          <p class="text-848599 text-center h-8">{{ $t(item.title) }}</p>
                        </template>
                      </div>
                    </div>
                  </div>
                </template>
              </div>
              <div id="revenueAnalysisShare" class="h-64 lg:h-96" v-loading='true'></div>
              <div class='px-6 my-4'>
                <div class='' style='background:#F9F9FD'>
                  <p class='pl-10 pt-2 pb-6' >
                    <span v-show="objsOne.avg_reward_warn" style='color:#FA9300'>{{$t("Lang.The output efficiency of the node for the next 7 days is lower than 80% of the average of the entire network")}}</span>
                    <span v-show="!objsOne.avg_reward_warn">{{$t("Lang.Current output efficiency is normal")}}</span>
                  </p>
                </div>
              </div>
            </div>
            <div class="w-3 h-full hidden lg:block"></div>
            <div class="mt-3 lg:mt-0 flex-1 border border-solid border-E8E7EB">
              <div class="flex items-center h-16 px-3 lg:px-6 border-b border-solid border-E8E7EB">
                <span class="lg:text-xl font-bold -mt-4">{{$t("Lang.Cost analysis")}}</span>
              </div>
              <div class="flex items-center justify-between h-28">
                <template v-for="(item, i) in costList">
                  <div v-if="i > 0" class="bg-E8E7EB h-12 w-px" :key="item.title + 'line'"></div>
                  <div class="flex flex-1 justify-center items-center" :key="item.title + 'costList'">
                    <div class="flex-1 flex items-center justify-center">
                      <div>
                        <template>
                          <div class='text-center'>
                            <span class="text-2xl">{{ item.val }}</span>
                            <span class="text-base">{{ item.unit }}</span>
                          </div>
                          <p class="text-848599 text-center h-8">{{ $t(item.title) }}</p>
                        </template>
                      </div>
                    </div>
                  </div>
                </template>
              </div>
              <div class="flex items-start justify-end h-16 px-6">
                <ul class="flex justify-center checkbox-content">
                  <li class="checkbox-list cursor-pointer py-3 px-5 border border-solid border-E6E6EA " 
                    :class="{ 'first': index == 0, 'last':  costTypeList.length - 1 == index, 'activeProTable' : item.value == 'total_pledge' }" 
                    v-for="(item, index) in costTypeList" :key="item.value+'gas'">
                    <p class='-mt-4'>{{$t(item.key)}}</p>
                  </li>
                </ul>
              </div>
              <div id="costAnalysisShare" class="h-64 lg:h-80" v-loading='true'></div>
              <div class='px-6 my-4'>
                <div class='' style='background:#F9F9FD'>
                  <p class='pl-10 pt-2 pb-6'>
                    <span v-show="objsOne.gas_warn" style='color:#FA9300'>
                      <span>{{$t('Lang.7-day node')}}</span>
                      <span v-show="!objsOne.create_gas_warn">{{$t('Lang.Production gas')}}</span>
                      <span v-show="!objsOne.create_gas_warn && !objsOne.avg_reward_warn">、</span>
                      <span v-show="!objsOne.avg_reward_warn">{{$t('Lang.Maintenance gas')}}</span>
                      <span>{{$t('Lang.30% higher than the average of the whole Internet')}}</span>
                    </span>
                    <span v-show="!objsOne.gas_warn">{{$t("Lang.The current gas cost is normal")}}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="mt-3 lg:flex">
            <div class="flex-1 border border-solid border-E8E7EB">
              <div class="flex items-center h-16 px-3 lg:px-6 border-b border-solid border-E8E7EB">
                <span class="lg:text-xl font-bold -mt-4">{{$t("Lang.Burst analysis")}}</span>
              </div>
              <div class="flex   items-center justify-between h-28">
                <template v-for="(item, i) in explosiveBlockList">
                  <div v-if="i > 0" class="bg-E8E7EB h-12 w-px" :key="item.title + 'line'"></div>
                  <div class="flex flex-1 justify-center items-center" :key="item.title + 'headerKey'">
                    <div class="flex-1 flex items-center justify-center">
                      <div>
                        <template>
                          <div class='text-center'>
                            <span class="text-2xl" v-if="item.val == 'NaN'">--</span>
                            <span class="text-2xl" v-else>{{ item.val }}</span>
                            <span class="text-base">{{ item.unit }}</span>
                          </div>
                          <p class="text-848599 text-center h-8">{{ $t(item.title) }}</p>
                        </template>
                      </div>
                    </div>
                  </div>
                </template>
              </div>
              <div id="explosiveBlockShare" class="h-64 lg:h-96" v-loading='true'></div>
              <div class='px-6 my-4'>
                <div class='' style='background:#F9F9FD'>
                  <p class='pl-10 pt-2 pb-6'>
                    <span v-show="objsOne.lucky_warn" style='color:#FA9300'>{{$t("Lang.The lucky value of the node for 7 consecutive days is lower than 50% of the official benchmark value")}}</span>
                    <span v-show="!objsOne.lucky_warn">{{$t("Lang.The current lucky value is normal")}}</span>
                  </p>
                </div>
              </div>
            </div>
            <div class="w-3 h-full hidden lg:block"></div>
            <div class="mt-3 lg:mt-0 flex-1 border border-solid border-E8E7EB">
              <div class="flex items-center h-16 px-3 lg:px-6 border-b border-solid border-E8E7EB">
                <span class="lg:text-xl font-bold -mt-4">{{$t("Lang.Wallet")}}</span>
              </div>
              <div class="flex  items-center justify-between h-28">
                <template v-for="(item, i) in walletList">
                  <div v-if="i > 0" class="bg-E8E7EB h-12 w-px" :key="item.title + 'line'"></div>
                  <div class="flex flex-1 justify-center items-center" :key="item.title + 'walletList'">
                    <div class="flex-1 flex items-center justify-center">
                      <div>
                        <template>
                          <div class='text-center'>
                            <span class="text-2xl">{{ item.val }}</span>
                            <span class="text-base">{{ item.unit }}</span>
                          </div>
                          <p class="text-848599 text-center h-8">{{ $t(item.title) }}</p>
                        </template>
                      </div>
                      <div class='ml-4'>
                        <div class='text-center'>
                          <span class="text-2xl">{{ item.day }}{{$t("Lang.days")}}</span>
                        </div>
                        <p class="text-848599 text-center h-8">{{$t("Lang.Expected to use")}}</p>
                      </div>
                    </div>
                  </div>
                </template>
              </div>
              <div id="walletShare" class="h-64 lg:h-96" v-loading='true'></div>
              <div class='px-6 my-4'>
                <div class='' style='background:#F9F9FD'>
                  <div class='pl-10 pt-2 pb-6 flex' >
                    <p class='mr-2' v-show="!useTime.wallet_warn" style='color:#FA9300'>
                      <span v-show="useTime.worker_estimated_day<=3">worker</span>
                      <span v-show="useTime.worker_estimated_day<=3 && useTime.poster_estimated_day<=3">、</span>
                      <span v-show="useTime.poster_estimated_day<=3">post</span>
                      {{$t('Lang.Wallet is expected to be used for less than 3 days')}}
                    </p>
                    <p class='mr-2' v-show="useTime.wallet_warn">{{$t('Lang.The wallet is in normal condition and the balance is sufficient')}}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex-1 border border-solid border-E8E7EB my-3">
          <div class='flex items-center justify-between border-b border-solid border-E8E7EB'>
            <div class="flex items-center h-16 px-3 lg:px-6 border-b border-solid border-E8E7EB">
              <span class="lg:text-xl font-bold -mt-4">{{$t('Lang.Gas analysis')}}</span>
            </div>
            <div class="flex items-center justify-end h-16 lg:h-16 px-3 lg:px-6">
              <ul class="flex justify-center checkbox-content">
                <li class="checkbox-list cursor-pointer py-3 px-5 border border-solid border-E6E6EA" 
                @click="changeGasTime(item.value)" 
                :class="{ 'first': index == 0, 'last':  gasList.length - 1 == index, 'activeProTable' : item.value == gasTime }" 
                v-for="(item, index) in gasList" :key="item.value+'gas'">
                  <p class='-mt-4'>{{$t(item.key)}}</p>
                </li>
              </ul>
            </div>
          </div>
          <div class="lg:flex hidden items-center justify-between h-48">
            <div class='w-80 flex justify-center items-center'>
              <div class="flex-1 flex items-center justify-center">
                <div>
                    <div class='text-center'>
                      <span class="text-2xl" v-if=" miner_health_report_gas_stat_list.total_gas == '0.0000' ">0</span>
                      <span class="text-2xl" v-else>{{ miner_health_report_gas_stat_list.total_gas  | formatEasyFil  }}</span>
                    </div>
                    <p class="text-848599 text-center h-8">{{ $t('Lang.Gas total cost') }}</p>
                </div>
              </div>
            </div>
            <div class='flex flex-1 items-center justify-between flex-wrap'>
              <template v-for="(item, i) in gasHealthList">
                <div v-if="i%3 !== 0" class="bg-E8E7EB h-12 w-px" :key="item.title + 'line'"></div>
                <div class="flex justify-center items-center w-96" :key="item.title + 'headerKey'">
                  <div class=" my-2 flex-1 flex items-center justify-center">
                    <div>
                      <template>
                        <div class='text-center'>
                          <span class="text-2xl" v-if=" item.val == '0.0000' ">0</span>
                          <span class="text-2xl" v-else>{{ item.val }}</span>
                          <span class="text-base">{{ item.unit }}</span>
                        </div>
                        <p class="text-848599 text-center h-8">{{ item.title }}</p>
                      </template>
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </div>

          <div class="lg:hidden h-46  my-2">
            <div class=' flex justify-center items-center'>
              <div class="flex-1 flex items-center justify-center">
                <div>
                    <div class='text-center'>
                      <span class="text-2xl" v-if=" miner_health_report_gas_stat_list.total_gas == '0.0000' ">0</span>
                      <span class="text-2xl" v-else>{{ miner_health_report_gas_stat_list.total_gas | formatEasyFil  }}</span>
                    </div>
                    <p class="text-848599 text-center h-8">{{ $t('Lang.Gas total cost') }}</p>
                </div>
              </div>
            </div>
            <div class='flex flex-1 items-center justify-between flex-wrap'>
              <template v-for="(item, i) in gasHealthList">
                <div v-if="i%2 !== 0"  class="bg-E8E7EB h-12 w-px" :key="item.title + 'line'"></div>
                <div style='width:49.75%' class="flex justify-center items-center" :key="item.title + 'headerKey'">
                  <div class="flex-1 flex items-center justify-center">
                    <div>
                      <template>
                        <div class='text-center'>
                          <span class="text-2xl" v-if=" item.val == '0.0000' ">0</span>
                          <span class="text-2xl" v-else>{{ item.val }}</span>
                          <span class="text-base">{{ item.unit }}</span>
                        </div>
                        <p class="text-848599 text-center h-8">{{ item.title }}</p>
                      </template>
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </div>
          
        </div>
        <div class="flex-1 border border-solid border-E8E7EB my-3">
          <div class='flex items-center justify-between border-b border-solid border-E8E7EB'>
            <div class="flex items-center h-16 px-3 lg:px-6 border-b border-solid border-E8E7EB">
              <span class="lg:text-xl font-bold -mt-4">{{$t('Lang.Message quality analysis')}}</span>
            </div>
            <div class="flex items-center justify-end h-16 lg:h-16 px-3 lg:px-6">
              <ul class="flex justify-center checkbox-content">
                <li class="checkbox-list cursor-pointer py-3 px-5 border border-solid border-E6E6EA" 
                @click="changeMsgTime(item.value)" 
                :class="{ 'first': index == 0, 'last':  msgList.length - 1 == index, 'activeProTable' : item.value == msgTime }" 
                v-for="(item, index) in msgList" :key="item.value+'gas'">
                  <p class='-mt-4'>{{$t(item.key)}}</p>
                </li>
              </ul>
            </div>
          </div>
          <div class="lg:flex hidden items-center justify-between h-60 flex-wrap">
            <template v-for="(item, i) in costHealthList">
              <div v-if="i%3 !== 0" class="bg-E8E7EB h-16 w-px" :key="item.title + 'line'"></div>
              <div class="flex justify-center items-center w-128" :key="i + 'headerKey'">
                <div class="flex-1 flex items-center justify-center">
                  <div class='w-full text-center px-6'>
                    <p class='mb-4'>{{item.title}}</p>
                    <div class='flex items-center justify-around'>
                      <div v-for="(k,m) in item.sublist" :key="m+'msg'" class='w-1/4'>
                        <p class='mb-1'>{{$t(k.title)}}</p>
                        <p>{{k.val}}</p>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </template>
          </div>

          <div class="block lg:hidden items-center justify-between my-4">
            <template v-for="(item, i) in costHealthList">
              <div class="flex flex-1 justify-center items-center" :key="i + 'headerKey'">
                <div class="flex-1 flex items-center justify-center">
                  <div class='w-full text-center px-6'>
                    <p class='mt-4 mb-2'>{{item.title}}</p>
                    <div class='flex items-center justify-around'>
                      <div v-for="(k,m) in item.sublist" :key="m+'msg'" style='width:23%'>
                        <div class='border-solid border-E8E7EB' :class="{'border-l':m>0}">
                          <p class='mb-1'>{{$t(k.title)}}</p>
                          <p>{{k.val}}</p>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>
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
import { mapGetters } from "vuex";
import utils from '@/static/utils.js'
import echartsUtils from '@/static/echarts-utils.js'
import countTo from 'vue-count-to'
import html2canvas from "html2canvas"

export default {
  name: "AcitvePro",
  asyncData() {
  },
  data() {
    return {
      loadingFlag:false,
      shareFlag:true,
      nowtime:'',
      imgUrl:'',
      lookOtherFlag:false,
      lang: this.$store.state.locale,
      useTime:{},
      otherNode:'',
      user_info:{},
      nodeSeach:'',
      objsThree:[],
      objsOne:[],
      options:[],
      collectionNode: '',
      collectionNodeList:[],
      gasTime: '24h',
      gasList: [
        { value: '24h', key: 'Lang.24 hours' },
        { value: '7d', key: 'Lang.Latest seven days' },
        { value: '30d', key: 'Lang.Latest one month' },
      ],
      msgTime: '24h',
      msgList: [
        { value: '24h', key: 'Lang.24 hours' },
        { value: '7d', key: 'Lang.Latest seven days' },
        { value: '30d', key: 'Lang.Latest one month' },
      ],

      costType:'total_pledge',
      costTypeList:[
        { value: 'total_pledge', key: 'Lang.Total cost' },
        { value: 'keep_gas', key: 'Lang.Maintenance Gas' },
        { value: 'create_gas', key: 'Lang.Gas used' },
        { value: 'pledge', key: 'Lang.Pledge cost' },
      ],

      miner_health_report_24h_list:{},
      miner_health_report_gas_stat_list:{},
      miner_health_report_messages_stat_ist:{
        PreCommitSector:{
          count:'-',
          ok_count:'-',
          error_count:'-',
        },
        ProveCommitSector:{
          count:'-',
          ok_count:'-',
          error_count:'-',
        },
        SubmitWindowedPoSt:{
          count:'-',
          ok_count:'-',
          error_count:'-',
        },
        PreCommitSectorBatch:{
          count:'-',
          ok_count:'-',
          error_count:'-',
        },
        ProveCommitAggregate:{
          count:'-',
          ok_count:'-',
          error_count:'-',
        },
        others:{
          count:'-',
          ok_count:'-',
          error_count:'-',
        }
      },
      scoreList:{
        status_dict:{
          mark:'--',
          status:'--',
          faulty_sector:'--',
          increase_power_offset_24:'--',
          score:'0'
        },
         avg_reward_dict: {
          avg_reward: "--",
          mark: "--",
          status: "--",
          score: '0'
        },
        cost_dict: {
          cost: "--",
          mark: "--",
          status: "--",
          score: "0"
        }
      },
      fine: 'Owner',
      fine_key:'',
      fineList: [
        { value: 'Owner', key: '' },
        { value: 'Worker', key: '' },
        { value: 'Post', key: '' },
      ],
      page_size: 20,
      page_index: 1,
      total_count: 0,
      objs: [],
    }
  },
  computed: {
    ...mapGetters({
      IsSignIn: "getIsSignIn",
      globalOverview: 'getGlobalOverview',
    }),
    totalScore(){
      let {
        wallet_score
      } = this.useTime || {}

      let {
        gas_score,
        lucky_score
      } = this.objsOne || {}

      let {
        status_dict,
        avg_reward_dict,
        cost_dict
      } = this.scoreList || {}

      if(typeof(this.scoreList.status_dict.score) !== 'number'){
        return 0
      }

      let num = Number(wallet_score) + Number(gas_score) + Number(lucky_score) + Number(status_dict.score) + Number(avg_reward_dict.score) + Number(cost_dict.score)

      return num || 0

    },
    totalScore_term(){
      let {
        wallet_score,
        worker_estimated_day,
        poster_estimated_day
      } = this.useTime || {}

      let {
        gas_score,
        lucky_score
      } = this.objsOne || {}

      let {
        status_dict,
        avg_reward_dict,
        cost_dict
      } = this.scoreList || {}

      return {
        worker_estimated_day,
        poster_estimated_day,
        wallet_score,
        gas_score,
        lucky_score,
        status_dict,
        avg_reward_dict,
        cost_dict 
      }
    },
    profitList(){
      let {
        avg_reward,
        block_reward
      } = this.miner_health_report_24h_list || {}
      return [{
        title: 'Lang.Production Efficiency in 24 hours',
        val:  utils.formatTrueFil(avg_reward),
        unit: 'F/TiB'
      },{
        title: 'Lang.Rewards in 24 hours',
        val: utils.formatTrueFil(block_reward),
        unit: 'F'
      }]
    },
    costList(){
      let {
        total_gas,
        create_gas,
        keep_gas,
        pledge_gas
      } = this.miner_health_report_24h_list || {}

      
      return [{
        title: 'Lang.24h total cost',
        val:  utils.formatEasyFil(total_gas).split(' ')[0] || '--',
        unit: utils.formatEasyFil(total_gas).split(' ')[1] || '--',
      },
      {
        title: 'Lang.24h Gas used',
        val:  utils.formatEasyFil(create_gas).split(' ')[0] || '--',
        unit: utils.formatEasyFil(create_gas).split(' ')[1] || '--'
      },{
        title: 'Lang.24h maintenance Gas',
        val: utils.formatEasyFil(keep_gas).split(' ')[0] || '--',
        unit: utils.formatEasyFil(keep_gas).split(' ')[1] || '--'
      },{
        title: 'Lang.24h pledge cost',
        val: pledge_gas ? utils.formatEasyFil(pledge_gas).split(' ')[0] : '--',
        unit: utils.formatEasyFil(pledge_gas).split(' ')[1] || '--'
      }]
    },
    explosiveBlockList(){
      let {
        lucky,
        block_rate,
        block_count
      } = this.miner_health_report_24h_list || {}

      lucky = Number(lucky*100).toFixed(2)
      block_rate = Number(block_rate*100).toFixed(2)

      return [{
        title: 'Lang.24h Lucky value',
        val: lucky,
        unit: '%'
      },
      {
        title: 'Lang.24h burst rate',
        val: block_rate,
        unit: '%'
      },{
        title: 'Lang.24h bursts',
        val: block_count,
        unit: ''
      }]
    },
    walletList(){
      let {
        worker_balance,
        poster_balance
      } = this.miner_health_report_24h_list || {}

      let {
        worker_estimated_day,
        poster_estimated_day
      } = this.useTime

      if(worker_estimated_day == -1){
        worker_estimated_day = '∞'
      }
      if(poster_estimated_day == -1){
        poster_estimated_day = '∞'
      }


      return [{
        title: "Lang.workers wallet balance",
        val:  utils.formatTrueFil(worker_balance),
        unit: 'F',
        day:worker_estimated_day
      },
      {
        title: "Lang.posts wallet balance",
        val: utils.formatTrueFil(poster_balance),
        unit: 'F',
        day:poster_estimated_day
      }]
    },
    gasHealthList(){
      let {
        PreCommitSectorBatch,
        ProveCommitAggregate,
        PreCommitSector,
        ProveCommitSector,
        SubmitWindowedPoSt,
        other_gas,
        total_gas
      } = this.miner_health_report_gas_stat_list

      return [
      {
        title: 'PreCommitSector',
        val:  utils.formatNewEasyFil(PreCommitSector)[0],
        unit: utils.formatNewEasyFil(PreCommitSector)[1]+'('+this.GetPercent(PreCommitSector,total_gas)+')'
      },{
        title: 'ProveCommitSector',
        val:  utils.formatNewEasyFil(ProveCommitSector)[0],
        unit: utils.formatNewEasyFil(ProveCommitSector)[1]+'('+this.GetPercent(ProveCommitSector,total_gas)+')'
      },{
        title: 'SubmitWindowedPoSt',
        val:  utils.formatNewEasyFil(SubmitWindowedPoSt)[0],
        unit: utils.formatNewEasyFil(SubmitWindowedPoSt)[1]+'('+this.GetPercent(SubmitWindowedPoSt,total_gas)+')'
      },{
        title: 'PreCommitSectorBatch',
        val:  utils.formatNewEasyFil(PreCommitSectorBatch)[0],
        unit: utils.formatNewEasyFil(PreCommitSectorBatch)[1]+'('+this.GetPercent(PreCommitSectorBatch,total_gas)+')'
      },{
        title: 'ProveCommitAggregate',
        val:  utils.formatNewEasyFil(ProveCommitAggregate)[0],
        unit: utils.formatNewEasyFil(ProveCommitAggregate)[1]+'('+this.GetPercent(ProveCommitAggregate,total_gas)+')'
      },{
        title: 'Other',
        val:  utils.formatNewEasyFil(other_gas)[0],
        unit: utils.formatNewEasyFil(other_gas)[1]+'('+this.GetPercent(other_gas,total_gas)+')'
      }]
    },
    costHealthList(){
      let {
        PreCommitSector,
        ProveCommitSector,
        SubmitWindowedPoSt,
        PreCommitSectorBatch,
        ProveCommitAggregate,
        others
      } = this.miner_health_report_messages_stat_ist

      return [
        {
        title:'PreCommitSector',
        sublist:[{
            title:'Lang.Total',
            val:PreCommitSector.count
          },{
            title:'Lang.Effective',
            val:PreCommitSector.ok_count
          },{
            title:'Lang.Fail',
            val:PreCommitSector.error_count
          },{
            title:'Lang.Success rate',
            val:this.GetPercent(PreCommitSector.ok_count,PreCommitSector.count)
          }]
        },{
        title:'ProveCommitSector',
        sublist:[{
            title:'Lang.Total',
            val:ProveCommitSector.count
          },{
            title:'Lang.Effective',
            val:ProveCommitSector.ok_count
          },{
            title:'Lang.Fail',
            val:ProveCommitSector.error_count
          },{
            title:'Lang.Success rate',
            val:this.GetPercent(ProveCommitSector.ok_count,ProveCommitSector.count)
          }]
        },{
        title:'SubmitWindowedPoSt',
        sublist:[{
            title:'Lang.Total',
            val:SubmitWindowedPoSt.count
          },{
            title:'Lang.Effective',
            val:SubmitWindowedPoSt.ok_count
          },{
            title:'Lang.Fail',
            val:SubmitWindowedPoSt.error_count
          },{
            title:'Lang.Success rate',
            val:this.GetPercent(SubmitWindowedPoSt.ok_count,SubmitWindowedPoSt.count)
          }]
        },{
        title:'PreCommitSectorBatch',
        sublist:[{
            title:'Lang.Total',
            val:PreCommitSectorBatch.count
          },{
            title:'Lang.Effective',
            val:PreCommitSectorBatch.ok_count
          },{
            title:'Lang.Fail',
            val:PreCommitSectorBatch.error_count
          },{
            title:'Lang.Success rate',
            val:this.GetPercent(PreCommitSectorBatch.ok_count,PreCommitSectorBatch.count)
          }]
        },{
        title:'ProveCommitAggregate',
        sublist:[{
            title:'Lang.Total',
            val:ProveCommitAggregate.count
          },{
            title:'Lang.Effective',
            val:ProveCommitAggregate.ok_count
          },{
            title:'Lang.Fail',
            val:ProveCommitAggregate.error_count
          },{
            title:'Lang.Success rate',
            val:this.GetPercent(ProveCommitAggregate.ok_count,ProveCommitAggregate.count)
          }]
        },{
        title:'others',
        sublist:[{
            title:'Lang.Total',
            val:others.count
          },{
            title:'Lang.Effective',
            val:others.ok_count
          },{
            title:'Lang.Fail',
            val:others.error_count
          },{
            title:'Lang.Success rate',
            val:this.GetPercent(others.ok_count,others.count)
          }]
        }
      ]
    }
  },
  components: {
    countTo
  },
  filters:{
    status_dict_status(val){
      let obj = {
        "1": "正常",
        "2": "良好",
        "3": "异常",
      }
      return obj[val] || '--'
    }
  },
  beforeMount(){
    this.nowtime = utils.getTime()

    this.$axios.post("/api/explorer/get_user_info").then(res=>{
      this.user_info = res.data
      return this.$axios.post("/api/explorer/get_collectible_miner",{
        user_id:this.user_info.user_id
      })
    }).then(res=>{
      if(res.data.length !== 0){
        this.collectionNode = res.data[0].miner_no
        res.data.map(i=>{
          this.collectionNodeList.push(i.miner_no)
        })
        this.initialization(this.collectionNode)
      }else{
        return this.$axios.post('/api/explorer/get_miner_index', {
          method: 'miner'
        })
      }
    }).then(res=>{
      if (!res || res.code != 0) return
      this.collectionNode = res.data[0].miner_no
      this.initialization(this.collectionNode)
    })
  },
  mounted(){
  },
  methods: {
    initialization(node){
      this.shareFlag = true
      this.scoreList = {
        status_dict:{
          mark:'--',
          status:'--',
          faulty_sector:'--',
          increase_power_offset_24:'--',
          score:'0'
        },
         avg_reward_dict: {
          avg_reward: "--",
          mark: "--",
          status: "--",
          score: '0'
        },
        cost_dict: {
          cost: "--",
          mark: "--",
          status: "--",
          score: "0"
        }
      },
      this.$axios.post("/api/explorer/miner_health_report_24h",{
        miner_no:node
      }).then(res=>{
        this.miner_health_report_24h_list = res.data
        this.fineList = [
          { value: 'Owner', key: res.data.owner_address },
          { value: 'Worker', key: res.data.worker_address },
          { value: 'Post', key: res.data.poster_address },
        ]
        this.fine_key = res.data.owner_address
        return this.$axios.post('/api/explorer/get_transfer_list_by_no', {
          miner_no: res.data.owner_address,
          page_size: 20,
          page_index: 1,
          all:1
        })
      }).then(res => {
        if (res.code != 0) return 
        this.objs = res.data.objects || []
        this.total_count = res.data.total_count || 0
        this.shareFlag = false
        
      })

      this.$axios.post("/api/explorer/get_miner_health_report_stats",{
        miner_no:node
      }).then(res=>{
        if(res.code !== 0) return
        this.scoreList = res.data
      })

      this.$axios.post("/api/explorer/miner_health_report_wallet_estimated_day",{
        miner_no:node
      }).then(res=>{
        this.useTime = res.data
      })

      this.$axios.post("/api/explorer/miner_health_report_days",{
        miner_no:node
      }).then(res=>{
        this.objsOne = res.data
        this.objsThree = res.data.objs

        this.revenueAnalysisEchart()
        this.explosiveBlockEchart()
        this.walletEcharts()
        this.costechart()

        this.revenueAnalysisEchartShare()
        this.costechartShare()
        this.explosiveBlockEchartShare()
        this.walletEchartsShare()



        switch (this.costType) {
          case 'total_pledge':
            this.costechart()
            break;
          case 'keep_gas':
            this.costechart_keep_gas()
            break;
          case 'create_gas':
            this.costechart_create_gas()
            break;
          case 'pledge':
            this.costechart_pledge()
            break;
          default:
            break;
        }

      })
      this.gasTable('24h',node)
      this.msgTable('24h',node)
      this.gasTime = '24h';
      this.msgTime = '24h';
      this.fine = 'Owner';
    },
    GetPercent(num, total) {
      if(num == 0 && total == 0){
        return 0 +'%'
      }
      num = Number(num);
      total = Number(total);
      let _num = num / total * 100
      _num = _num.toString()
      let index = _num.indexOf('.')
      if (index !== -1) {
          _num = _num.substring(0, 2 + index + 1)
      } else {
        _num = _num.substring(0)
      }

      return _num + '%'
    },
    revenueAnalysisEchart(){
      let y1 = [],
          y2 = [],
        date = [],
        echartTitle = [];

      if (this.lang == 'zh') {
        echartTitle = ['产出效率','全网均值']
      } else if (this.lang == 'en') {
        echartTitle = ['Output efficiency','Network average']
      } else if (this.lang == 'ja') {
        echartTitle = ['生産効率','全ネットワーク平均値']
      } else {
        echartTitle = ['생산 효율','네트워크 평균']
      }

      this.objsThree.map(item => {
        y1.unshift( utils.formatTrueFil(item.avg_reward))
        y2.unshift( utils.formatTrueFil(item.avg_reward_overview))
        date.unshift(item.date)
      })
      let echarts = this.$echarts.init(document.getElementById('revenueAnalysis'))
      echarts.setOption(echartsUtils.revenueAnalysisEchart({
        y1,
        y2,
        date,
        echartTitle
      }))
      window.addEventListener("resize", () => {
        echarts.resize();
      });
    },
    revenueAnalysisEchartShare(){
      let y1 = [],
          y2 = [],
        date = [],
        echartTitle = [];

      if (this.lang == 'zh') {
        echartTitle = ['产出效率','全网均值']
      } else if (this.lang == 'en') {
        echartTitle = ['Output efficiency','Network average']
      } else if (this.lang == 'ja') {
        echartTitle = ['生産効率','全ネットワーク平均値']
      } else {
        echartTitle = ['생산 효율','네트워크 평균']
      }

      this.objsThree.map(item => {
        y1.unshift( utils.formatTrueFil(item.avg_reward))
        y2.unshift( utils.formatTrueFil(item.avg_reward_overview))
        date.unshift(item.date)
      })
      let echarts = this.$echarts.init(document.getElementById('revenueAnalysisShare'))

      echarts.setOption(echartsUtils.revenueAnalysisEchart({
        y1,
        y2,
        date,
        echartTitle
      }))
      window.addEventListener("resize", () => {
        echarts.resize();
      });
    },
    changeCostType(item){
      if (this.costType == item) return
      this.costType = item
      this.$echarts.init(document.getElementById('costAnalysis')).dispose();
      this.$echarts.init(document.getElementById('costAnalysisShare')).dispose();
      this.costechartShare()
      switch (item) {
        case 'total_pledge':
          this.costechart()
          break;
        case 'keep_gas':
          this.costechart_keep_gas()
          break;
        case 'create_gas':
          this.costechart_create_gas()
          break;
        case 'pledge':
          this.costechart_pledge()
          break;
        default:
          break;
      }
    },
    costechart(){
      let y1 = [],
        date = [],
        echartTitle = [],
        type = 'bar',
        val = 'F';

      if (this.lang == 'zh') {
        echartTitle = ['总成本']
      } else if (this.lang == 'en') {
        echartTitle = ['Total cost']
      } else if (this.lang == 'ja') {
        echartTitle = ['総費用']
      } else {
        echartTitle = ['총 비용']
      }

      this.objsThree.map(item => {
        y1.unshift( utils.formatTrueFil(item.total_pledge) )
        date.unshift(item.date)
      })
      let echarts = this.$echarts.init(document.getElementById('costAnalysis'))
      echarts.setOption(echartsUtils.costechart({
        y1,
        date,
        echartTitle,
        type,
        val
      }))
      window.addEventListener("resize", () => {
        echarts.resize();
      });
    },
    costechart_pledge(){
      let y1 = [],
        date = [],
        echartTitle = [],
        type = 'line',
        val = 'F/TiB';

      if (this.lang == 'zh') {
        echartTitle = ['Pledge成本']
      } else if (this.lang == 'en') {
        echartTitle = ['Pledge cost']
      } else if (this.lang == 'ja') {
        echartTitle = ['Pledge費用']
      } else {
        echartTitle = ['서약 비용']
      }

      this.objsThree.map(item => {
        y1.unshift( utils.formatTrueFil(item.pledge) )
        date.unshift(item.date)
      })
      let echarts = this.$echarts.init(document.getElementById('costAnalysis'))


      echarts.setOption(echartsUtils.costechart({
        y1,
        date,
        echartTitle,
        type,
        val
      }))
      window.addEventListener("resize", () => {
        echarts.resize();
      });
    },
    costechart_keep_gas(){
      let y1 = [],
        y2 = [],
        date = [],
        echartTitle = [],
        type = 'line',
        val = 'F/TiB';

      if (this.lang == 'zh') {
        echartTitle = ['维护Gas','全网均值']
      } else if (this.lang == 'en') {
        echartTitle = ['Maintenance Consumption','Network average']
      } else if (this.lang == 'ja') {
        echartTitle = ['維持Gas','全ネットワーク平均値']
      } else {
        echartTitle = ['유지하다 Gas','네트워크 평균']
      }

      this.objsThree.map(item => {
        y1.unshift(item.keep_gas)
        y2.unshift(item.keep_gas_overview)
        date.unshift(item.date)
      })

      let echarts = this.$echarts.init(document.getElementById('costAnalysis'))

      echarts.setOption(echartsUtils.costechart_gas({
        y1,
        y2,
        date,
        echartTitle,
        type,
        val
      }))
      window.addEventListener("resize", () => {
        echarts.resize();
      });
    },
    costechart_create_gas(){
      let y1 = [],
        y2 = [],
        date = [],
        echartTitle = [],
        type = 'line',
        val = 'F/TiB';

      if (this.lang == 'zh') {
        echartTitle = ['生产gas','全网均值']
      } else if (this.lang == 'en') {
        echartTitle = ['Gas used','Network average']
      } else if (this.lang == 'ja') {
        echartTitle = ['Gas生産','全ネットワーク平均値']
      } else {
        echartTitle = ['생산Gas','네트워크 평균']
      }

      this.objsThree.map(item => {
        y1.unshift(item.create_gas)
        y2.unshift(item.create_gas_overview)
        date.unshift(item.date)
      })

      let echarts = this.$echarts.init(document.getElementById('costAnalysis'))


      echarts.setOption(echartsUtils.costechart_gas({
        y1,
        y2,
        date,
        echartTitle,
        type,
        val
      }))
      window.addEventListener("resize", () => {
        echarts.resize();
      });
    },
    costechartShare(){
      let y1 = [],
        date = [],
        echartTitle = [],
        type = 'bar',
        val = 'F';

      if (this.lang == 'zh') {
        echartTitle = ['总成本']
      } else if (this.lang == 'en') {
        echartTitle = ['Total cost']
      } else if (this.lang == 'ja') {
        echartTitle = ['総費用']
      } else {
        echartTitle = ['총 비용']
      }

      this.objsThree.map(item => {
        y1.unshift( utils.formatTrueFil(item.total_pledge) )
        date.unshift(item.date)
      })
      let echarts = this.$echarts.init(document.getElementById('costAnalysisShare'))
      echarts.setOption(echartsUtils.costechart({
        y1,
        date,
        echartTitle,
        type,
        val
      }))
      window.addEventListener("resize", () => {
        echarts.resize();
      });
    },
    explosiveBlockEchart(){
      let y1 = [],
          y2 = [],
        date = [],
        echartTitle = [];

      if (this.lang == 'zh') {
        echartTitle = ['幸运值','基准幸运值']
      } else if (this.lang == 'en') {
        echartTitle = ['Lucky value','Benchmark Lucky Value']
      } else if (this.lang == 'ja') {
        echartTitle = ['幸運の値','基準幸運の値']
      } else {
        echartTitle = ['행운의 가치','행운의 가치 벤치 마크']
      }

      this.objsThree.map(item => {
        y1.unshift(Number(item.lucky*100).toFixed(2))
        y2.unshift('99.70')
        date.unshift(item.date)
      })
      let echarts = this.$echarts.init(document.getElementById('explosiveBlock'))

      echarts.setOption(echartsUtils.explosiveBlockEchart({
        y1,
        y2,
        date,
        echartTitle
      }))
      window.addEventListener("resize", () => {
        echarts.resize();
      });
    },
    explosiveBlockEchartShare(){
      let y1 = [],
          y2 = [],
        date = [],
        echartTitle = [];

      if (this.lang == 'zh') {
        echartTitle = ['幸运值','基准幸运值']
      } else if (this.lang == 'en') {
        echartTitle = ['Lucky value','Benchmark Lucky Value']
      } else if (this.lang == 'ja') {
        echartTitle = ['幸運の値','基準幸運の値']
      } else {
        echartTitle = ['행운의 가치','행운의 가치 벤치 마크']
      }

      this.objsThree.map(item => {
        y1.unshift(Number(item.lucky*100).toFixed(2))
        y2.unshift('99.70')
        date.unshift(item.date)
      })
      let echarts = this.$echarts.init(document.getElementById('explosiveBlockShare'))

      echarts.setOption(echartsUtils.explosiveBlockEchart({
        y1,
        y2,
        date,
        echartTitle
      }))
      window.addEventListener("resize", () => {
        echarts.resize();
      });
    },
    walletEcharts(){
      let y1 = [],
          y2 = [],
        date = [],
        echartTitle = [];

      if (this.lang == 'zh') {
        echartTitle = ['post钱包余额','worker钱包余额']
      } else if (this.lang == 'en') {
        echartTitle = ['posts wallet balance','workers wallet balance']
      } else if (this.lang == 'ja') {
        echartTitle = ['postウォレットの残高','workerウォレットの残高']
      } else {
        echartTitle = ['post지갑 잔액','worker지갑 잔액']
      }

      this.objsThree.map(item => {
        
        y1.unshift(Number(utils.formatTrueFil(item.poster_balance)))
        y2.unshift(Number(utils.formatTrueFil(item.worker_balance)))
        date.unshift(item.date)
      })
      let echarts = this.$echarts.init(document.getElementById('wallet'))

      echarts.setOption(echartsUtils.walletEcharts({
        y1,
        y2,
        date,
        echartTitle
      }))
      window.addEventListener("resize", () => {
        echarts.resize();
      });
    },
    walletEchartsShare(){
      let y1 = [],
          y2 = [],
        date = [],
        echartTitle = [];

      if (this.lang == 'zh') {
        echartTitle = ['post钱包余额','worker钱包余额']
      } else if (this.lang == 'en') {
        echartTitle = ['posts wallet balance','workers wallet balance']
      } else if (this.lang == 'ja') {
        echartTitle = ['postウォレットの残高','workerウォレットの残高']
      } else {
        echartTitle = ['post지갑 잔액','worker지갑 잔액']
      }

      this.objsThree.map(item => {
        
        y1.unshift(Number(utils.formatOriginFil(item.poster_balance)))
        y2.unshift(Number(utils.formatOriginFil(item.worker_balance)))
        date.unshift(item.date)
      })
      let echarts = this.$echarts.init(document.getElementById('walletShare'))

      echarts.setOption(echartsUtils.walletEcharts({
        y1,
        y2,
        date,
        echartTitle
      }))
      window.addEventListener("resize", () => {
        echarts.resize();
      });
    },
    nodeBtn(){
      let lang_errTitle = '',
          lang_errMsg_nonExistent = '';

      switch (this.lang) {
        case 'zh':
          lang_errTitle = '错误'
          lang_errMsg_nonExistent = '存储供应商不存在';
          break;
        case 'en':
          lang_errTitle = 'Error'
          lang_errMsg_nonExistent = 'Storage Provider does not exist';
          break;
        case 'ko':
          lang_errTitle = '오류'
          lang_errMsg_nonExistent = '저장 공급자가 없습니다';
          break;
        case 'ja':
          lang_errTitle = 'エラー'
          lang_errMsg_nonExistent = 'ストレージベンダーが存在しません';
          break;
      }
      if(this.nodeSeach == '' || utils.trim(this.nodeSeach) == '') return
      this.$axios.post("/api/explorer/get_miner_index",{
        miner_no : utils.trim(this.nodeSeach)
      }).then(res=>{
        if(res.code !== 0){
          this.$notification.error({
            title: lang_errTitle,
            message: lang_errMsg_nonExistent
          });
        }else{
          this.lookOtherFlag = true;
          this.otherNode = this.nodeSeach
          this.initialization(utils.trim(this.nodeSeach))
        }
      })
    },
    otherSeach(){
      this.$axios.post("/api/explorer/new_search",{
        value:utils.trim(this.nodeSeach)
      }).then(res=>{
        console.log(res);
      })
    },
    changeNode(command){
      this.collectionNode = command
      this.miner_health_report_24h_list = {}
      this.initialization(command)
    },
    changeMsgTime(item){
      if (this.msgTime == item) return
      this.msgTime = item
      if(this.otherNode == ''){
        this.msgTable(item,this.collectionNode)
      }else{
        this.msgTable(item,this.otherNode)
      }
    },
    changeGasTime(item){
      if (this.gasTime == item) return
      this.gasTime = item
      if(this.otherNode == ''){
        this.gasTable(item,this.collectionNode)
      }else{
        this.gasTable(item,this.otherNode)
      }
    },
    gasTable(time,node){
      this.$axios.post("/api/explorer/miner_health_report_gas_stat",{
        miner_no:node,
        stat_type:time
      }).then(res=>{
        this.miner_health_report_gas_stat_list = res.data
      })
    },
    msgTable(time,node){
      this.$axios.post("/api/explorer/miner_health_report_messages_stat",{
        miner_no:node,
        stat_type:time
      }).then(res=>{
        this.miner_health_report_messages_stat_ist = res.data
      })
    },
    selectGashandler(item){
      if (this.fine == item.value) return
      this.fine = item.value
      this.fine_key = item.key
      this.loadingFlag = true
      this.$axios.post('/api/explorer/get_transfer_list_by_no', {
        miner_no: item.key,
        page_size: this.page_size,
        page_index: 1,
        all:1
      })
      .then(res => {
        if (res.code != 0) return data
        this.loadingFlag = false
        this.objs = res.data.objects || []
        this.page_index = 1
        this.total_count = res.data.total_count || 0
      })
    },
    searchRecordHandler: function(pageIndex) {
      this.loadingFlag = true
      this.$axios.post('/api/explorer/get_transfer_list_by_no', {
          miner_no: this.fine_key,
          page_size: this.page_size,
          page_index: pageIndex,
          all:1

        })
        .then(res => {
          if (res.code != 0) return
          this.objs = res.data.objects
          this.loadingFlag = false
          this.total_count = res.data.total_count
          this.page_index = pageIndex
        })
    },
    handleCurrentChange(size){
      this.page_size = size
      this.searchRecordHandler(1)
    },
    backCollection(){
      this.lookOtherFlag = false
      this.otherNode = ''
      this.nodeSeach = ''
      this.initialization(this.collectionNode)
    },
    scareBtn(){
      this.imgUrl = ''
      this.shareFlag = true
      let that = this
      setTimeout(()=>{
        let myBox = this.$refs.imageWrappers;
        let htmlDom = document.getElementById('shareBoxs')
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
        a.download = that.collectionNode+'存储供应商健康报告'; 
        a.href = url; 
        a.dispatchEvent(event); 
      };
      image.src = this.imgUrl;
    },
  },
};
</script>

<style lang="scss" scoped>
#shareBoxs{
  width: 1480px;
  position:fixed;
  left: 0;
  top: -99999px;
}
</style>