<template>
  <div>
    <div class='mt-4 lg:mb-3 mb-3'>
      <div class='xl:block lg:hidden md:hidden sm:hidden hidden'>
        <div class='banner  relative' style='height:300px'>
          <div class='introduce absolute text-white' style='height:170px;width:450px;left:8%;bottom:20%'>
            <div>
              <p class='text-4xl tracking-widest'>{{$t('Lang.Registration is courteous')}}</p>
            </div>
            <div class='my-4'>
              <p class='py-2 text-bg text-xl pl-4 tracking-widest' :class="{'w-1/2':lang == 'zh','w-full':lang !== 'zh'}" >{{$t('Lang.Invite friends to enjoy another gift')}}</p>
            </div>
            <div>
              <p class='tracking-wider opacity-75'>{{$t('Lang.From now to x month x day registered members can get the right to use the Pro version of the Athena browser worth 666 yuan for one month')}},{{$t('Lang.Invite friends to register to enjoy the right to use the Pro version for another month (superimposable)')}}</p>
            </div>
          <div class='mt-2' v-if="!loginFlag">
            <span class='contactFree' @click='immediately'>{{$t('Lang.Go immediately')}}</span>
          </div>
          </div>
        </div>
        <div class='h-32 w-full flex items-center justify-center text-white px-8' style='background:#182A77'>
          <div class='flex w-1/5 items-center justify-start'>
            <img src="@/assets/imgs/invitation-one.png" alt="" style='width:40px;height:40px'>
            <div class='flex items-center ml-4'>
              <div>
                <p class='text-xl mb-1'>{{$t('Lang.Send invitation to friends')}}</p>
                <p class='opacity-70' :class="{'h-10':lang!=='zh'}" >{{$t('Lang.Invite friends to register by sharing the link')}}</p>
              </div>
            </div>
          </div>
          <div>
            <img src="@/assets/imgs/invitation-right.png" alt="" class='mx-16' style='width:40px'>
          </div>
          <div class='flex w-1/5 items-center justify-start'>
            <img src="@/assets/imgs/invitation-two.png" alt="" style='width:40px;height:40px'>
            <div class='flex items-center ml-4'>
              <div>
                <p class='text-xl mb-1'>{{$t('Lang.Friends registration')}}</p>
                <p class='opacity-70' :class="{'h-10':lang!=='zh'}" >{{$t('Lang.Friends accept the invitation to complete the registration')}}</p>
              </div>
            </div>
          </div>
          <div>
            <img src="@/assets/imgs/invitation-right.png" alt="" class='mx-16' style='width:40px'>
          </div>
          <div class='flex w-1/5 items-center justify-start'>
            <img src="@/assets/imgs/invitation-three.png" alt="" style='width:40px;height:40px'>
            <div class='flex items-center ml-4'>
              <div>
                <p class='text-xl mb-1'>{{$t('Lang.Get corresponding rewards')}}</p>
                <p class='opacity-70' :class="{'h-10':lang!=='zh'}" >{{$t('Lang.Easily get corresponding gifts')}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class='xl:hidden lg:block md:hidden sm:hidden hidden'>
        <div class='banner relative' style='height:260px'>
          <div class='banner  relative' style='height:260px'>
            <div class='introduce absolute text-white' style='height:170px;width:450px;left:8%;bottom:15%'>
              <div>
                <p class='text-4xl tracking-widest'>{{$t('Lang.Registration is courteous')}}</p>
              </div>
              <div class='my-4'>
                <p class='py-2 text-bg text-xl pl-4 tracking-widest' :class="{'w-1/2':lang == 'zh','w-full':lang !== 'zh'}">{{$t('Lang.Invite friends to enjoy another gift')}}</p>
              </div>
              <div>
                <p class='tracking-wider opacity-75'>{{$t('Lang.From now to x month x day registered members can get the right to use the Pro version of the Athena browser worth 666 yuan for one month')}},{{$t('Lang.Invite friends to register to enjoy the right to use the Pro version for another month (superimposable)')}}</p>
              </div>
              <div class='mt-2' v-if="!loginFlag">
                <span class='contactFree' @click='immediately'>{{$t('Lang.Go immediately')}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class='h-32 w-full flex items-center justify-center text-white px-6' style='background:#182A77'>
          <div class='flex items-center'>
            <img src="@/assets/imgs/invitation-one.png" alt="" style='width:36px;height:36px'>
            <div class='flex items-center ml-4'>
              <div>
                <p class='text-lg opacity-75'>{{$t('Lang.Send invitation to friends')}}</p>
                <p class='opacity-75'>{{$t('Lang.Invite friends to register by sharing the link')}}</p>
              </div>
            </div>
          </div>
          <div>
            <img src="@/assets/imgs/invitation-right.png" alt="" :class="{'mx-20':lang == 'zh','mx-6':lang !== 'zh'}" style='width:30px'>
          </div>
          <div class='flex items-center'>
            <img src="@/assets/imgs/invitation-two.png" alt="" style='width:36px;height:36px'>
            <div class='flex items-center ml-4'>
              <div>
                <p class='text-lg opacity-75'>{{$t('Lang.Friends registration')}}</p>
                <p class='opacity-75'>{{$t('Lang.Friends accept the invitation to complete the registration')}}</p>
              </div>
            </div>
          </div>
          <div>
            <img src="@/assets/imgs/invitation-right.png" alt="" :class="{'mx-20':lang == 'zh','mx-6':lang !== 'zh'}" style='width:30px'>
          </div>
          <div class='flex items-center'>
            <img src="@/assets/imgs/invitation-three.png" alt="" style='width:36px;height:36px'>
            <div class='flex items-center ml-4'>
              <div>
                <p class='text-lg opacity-75'>{{$t('Lang.Get corresponding rewards')}}</p>
                <p class='opacity-75'>{{$t('Lang.Easily get corresponding gifts')}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class='xl:hidden lg:hidden md:block sm:hidden hidden'>
        <div class='banner relative' style='height:200px'>
          <div class='introduce absolute text-white' style='height:160px;width:400px;left:8%;' :class="{'bottom8':lang == 'zh','bottom17':lang !== 'zh'}">
            <div>
              <p class='text-4xl tracking-widest w-full'>{{$t('Lang.Registration is courteous')}}</p>
            </div>
            <div class='my-2'>
              <p class='py-2 text-bg text-xl pl-4 tracking-widest' :class="{'w-1/2':lang == 'zh','w-full':lang !== 'zh'}">{{$t('Lang.Invite friends to enjoy another gift')}}</p>
            </div>
            <div>
              <p class='tracking-wider opacity-75'>{{$t('Lang.From now to x month x day registered members can get the right to use the Pro version of the Athena browser worth 666 yuan for one month')}},{{$t('Lang.Invite friends to register to enjoy the right to use the Pro version for another month (superimposable)')}}</p>
            </div>
            <div class='mt-2' v-if="!loginFlag">
              <span class='contactFree' @click='immediately'>{{$t('Lang.Go immediately')}}</span>
            </div>
          </div>
        </div>
        <div class='w-full flex items-center justify-around text-white py-5 px-8' style='background:#182A77'>
          <div class='flex '>
            <div class='flex items-center'>
              <img src="@/assets/imgs/invitation-one.png" alt="" style='width:30px;height:30px'>
            </div>
            <div class='flex items-center ml-4'>
              <div>
                <p class='text-lg opacity-75'>{{$t('Lang.Send invitation to friends')}}</p>
              </div>
            </div>
          </div>
          <div>
            <img src="@/assets/imgs/invitation-right.png" alt="" class='mx-6' style='width:30px'>
          </div>
          <div class='flex '>
            <div class='flex items-center'>
              <img src="@/assets/imgs/invitation-two.png" alt="" style='width:30px;height:30px'>
            </div>
            <div class='flex items-center ml-4'>
              <div>
                <p class='text-lg opacity-75'>{{$t('Lang.Friends registration')}}</p>
              </div>
            </div>
          </div>
          <div>
            <img src="@/assets/imgs/invitation-right.png" alt="" class='mx-6' style='width:30px'>
          </div>
          <div class='flex '>
            <div class='flex items-center'>
              <img src="@/assets/imgs/invitation-three.png" alt="" style='width:30px;height:30px'>
            </div>
            <div class='flex items-center ml-4'>
              <div>
                <p class='text-lg opacity-75'>{{$t('Lang.Get corresponding rewards')}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class='xl:hidden lg:hidden md:hidden sm:block hidden'>
        <div class='relative banner' style='height:170px'>
          <div class='introduce absolute text-white' style='height:120px;width:370px;left:4%;bottom:22%'>
            <div>
              <p class='text-2xl tracking-widest'>{{$t('Lang.Registration is courteous')}}</p>
            </div>
            <div class='my-2'>
              <p class='py-1 text-bg text-xl pl-4 tracking-widest' :class="{'w-1/2':lang == 'zh','w-full':lang !== 'zh'}">{{$t('Lang.Invite friends to enjoy another gift')}}</p>
            </div>
            <div>
              <p class='tracking-wider opacity-75 leading-5'>{{$t('Lang.From now to x month x day registered members can get the right to use the Pro version of the Athena browser worth 666 yuan for one month')}},{{$t('Lang.Invite friends to register to enjoy the right to use the Pro version for another month (superimposable)')}}</p>
            </div>
            <div class='mt-2' v-if="!loginFlag">
              <span class='contactFree' @click='immediately'>{{$t('Lang.Go immediately')}}</span>
            </div>
          </div>
        </div>
        <div class='w-full flex items-center justify-around text-white py-5 px-6' style='background:#182A77'>
          <div class='flex ml-6'>
            <div class='flex items-center'>
              <img src="@/assets/imgs/invitation-one.png" alt="" style='width:30px;height:30px'>
            </div>
            <div class='flex items-center ml-4'>
              <div>
                <p class='text-lg opacity-75'>{{$t('Lang.Send invitation to friends')}}</p>
              </div>
            </div>
          </div>
          <div>
            <img src="@/assets/imgs/invitation-right.png" alt="" class='mx-4' style='width:24px'>
          </div>
          <div class='flex ml-6'>
            <div class='flex items-center'>
              <img src="@/assets/imgs/invitation-two.png" alt="" style='width:30px;height:30px'>
            </div>
            <div class='flex items-center ml-4'>
              <div>
                <p class='text-lg opacity-75'>{{$t('Lang.Friends registration')}}</p>
              </div>
            </div>
          </div>
          <div>
            <img src="@/assets/imgs/invitation-right.png" alt="" class='mx-4' style='width:24px'>
          </div>
          <div class='flex ml-6'>
            <div class='flex items-center'>
              <img src="@/assets/imgs/invitation-three.png" alt="" style='width:30px;height:30px'>
            </div>
            <div class='flex items-center ml-4'>
              <div>
                <p class='text-lg opacity-75'>{{$t('Lang.Get corresponding rewards')}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class='xl:hidden lg:hidden md:hidden sm:hidden block'>
        <div class='relative banner-phone flex items-center' :class="{'height200':lang == 'en','height170':lang == 'zh' ,'height210':lang == 'ja'|| lang == 'ko',}">
          <div class='introduce absolute text-white ml-4' style='width:60%;'>
            <div>
              <p class='text-xl tracking-widest'>{{$t('Lang.Registration is courteous')}}</p>
            </div>
            <div class='my-2'>
              <p class='py-1 text-bg w-full pl-4 tracking-widest leading-5 text-lg'>{{$t('Lang.Invite friends to enjoy another gift')}}</p>
            </div>
            <div>
              <p class='tracking-wider opacity-75 leading-5'>{{$t('Lang.From now to x month x day registered members can get the right to use the Pro version of the Athena browser worth 666 yuan for one month')}},{{$t('Lang.Invite friends to register to enjoy the right to use the Pro version for another month (superimposable)')}}</p>
            </div>
            <div class='mt-2' v-if="!loginFlag">
              <span class='contactFree' @click='immediately'>{{$t('Lang.Go immediately')}}</span>
            </div>
          </div> 
          <div class='absolute' style='width:150px;height:150px;right:1%'>
            <img src="@/assets/imgs/invitation-phone-bg.png" alt="" style='width:150px;height:150px;'>
          </div>
        </div>
        <div class='flex w-full  items-center justify-around text-white py-5 px-6 ' style='background:#182A77'>
          <div class='w-1/3'>
              <img src="@/assets/imgs/invitation-one.png" alt="" style='width:36px;height:36px' class='mx-auto'>
              <p class=' mt-2 opacity-75 text-center leading-4' :class="{'h-8':lang !== 'zh'}">{{$t('Lang.Send invitation to friends')}}</p>
          </div>
          <div>
            <img src="@/assets/imgs/invitation-right.png" alt="" class='mx-4' style='width:20px'>
          </div>
          <div class='w-1/3'>
              <img src="@/assets/imgs/invitation-two.png" alt="" style='width:36px;height:36px' class='mx-auto'>
              <p class=' mt-2 opacity-75 text-center leading-4' :class="{'h-8':lang !== 'zh'}">{{$t('Lang.Friends registration')}}</p>
          </div>
          <div>
            <img src="@/assets/imgs/invitation-right.png" alt="" class='mx-4' style='width:20px'>
          </div>
          <div class='w-1/3'>
              <img src="@/assets/imgs/invitation-three.png" alt="" style='width:36px;height:36px' class='mx-auto'>
              <p class=' mt-2 opacity-75 text-center leading-4' :class="{'h-8':lang !== 'zh'}">{{$t('Lang.Get corresponding rewards')}}</p>
          </div>
        </div>
      </div>

    </div>
    <div class="lg:flex hidden border border-solid border-E8E7EB mb-3 px-3 lg:px-6 py-6" v-if="loginFlag">
        <div class='w-9/12'>
            <p class="lg:text-xl font-bold mb-6">{{$t('Lang.My exclusive way of sharing')}}</p>
            <div class='flex justify-between'>
                <div class='w-2/3 '>
                    <p class='mb-2'>{{$t('Lang.Registration link')}}</p>
                    <div class='py-2 pl-4 pr-4 border border-solid border-E8E7EB flex justify-between items-center'>
                        <span class='mr-10 '>{{http | PhoneGetSubStr}}</span>
                        <div>
                          <el-button type="primary" plain size="mini" @click='copyBtn(http)'>{{$t('Lang.Copy')}}</el-button>
                          <el-button type="primary" plain size="mini" @click="posterBtn">{{$t('Lang.Poster invitation')}}</el-button>
                        </div>
                    </div>
                </div>
                <div class='mx-10 w-1/3'>
                    <p class='mb-2'>{{$t('Lang.Invitation code')}}</p>
                    <div class='py-2 pl-4 pr-4 border border-solid border-E8E7EB flex justify-between items-center'>
                        <span class='mr-10'>{{get_invite_info.invite_code}}</span>
                        <div>
                          <el-button type="primary" plain size="mini" @click='copyBtn(get_invite_info.invite_code)'>{{$t('Lang.Copy')}}</el-button>
                        </div>
                    </div>
                </div>

            </div>

        </div>
        <div class="bg-E8E7EB h-34 w-px" ></div>
        <div class='flex-1 flex text-center items-center justify-around mt-8'>
            <div>
                <p>{{$t('Lang.Total number of invites')}}</p>
                <p class='text-4xl text-FA9300'>{{get_invite_info.invite_count}}</p>
            </div>
            <div>
                <p>{{$t('Lang.Get the Pro version')}}</p>
                <p><span class='text-4xl text-FA9300'>{{get_invite_info.reward_count}}</span> {{$t('Lang.Months')}}</p>
            </div>
        </div>
    </div>
    <div class="block lg:hidden border border-solid border-E8E7EB mb-3" v-if="loginFlag">
        <div class="flex items-center h-16 lg:h-20 px-3 lg:px-6 border-b border-solid border-E8E7EB" style='background:#F1F2F7'>
            <span class="lg:text-xl font-bold">{{$t('Lang.My exclusive way of sharing')}}</span>
        </div>
        <div class='px-6 py-6 '>
            <div class='flex justify-between items-center mb-6'>
              <p>{{$t('Lang.Registration link')}} : {{http | getSubStr}}</p>
              <div class=''>
                  <el-button type="primary" plain size="mini" @click='copyBtn(http)'>{{$t('Lang.Copy')}}</el-button>
              </div>

            </div>
            <div class='flex justify-between items-center'>
                <p class='mb-2'>{{$t('Lang.Invitation code')}} : {{get_invite_info.invite_code}}</p>
                <div class=''>
                    <el-button type="primary" plain size="mini" @click='copyBtn(get_invite_info.invite_code)'>{{$t('Lang.Copy')}}</el-button>
                </div>
            </div>
        </div>
        <div class='flex-1 flex text-center items-center justify-around py-4 border-t border-solid border-E8E7EB'>
            <div class='w-1/2'>
                <p>{{$t('Lang.Total number of invites')}}</p>
                <p class='text-3xl text-FA9300'>{{get_invite_info.invite_count}}</p>
            </div>
            <div class='w-px h-16 bg-E8E7EB'></div>
            <div class='w-1/2'>
                <p>{{$t('Lang.Get the Pro version')}}</p>
                <p><span class='text-3xl text-FA9300'>{{get_invite_info.reward_count}}</span> {{$t('Lang.Months')}}</p>
            </div>
        </div>
    </div>

    <div class="border border-solid border-E8E7EB mb-3" v-if="loginFlag">
      <div class="flex items-center h-16 lg:h-20 px-3 lg:px-6 border-b border-solid border-E8E7EB" style='background:#F1F2F7'>
        <ul class="flex justify-center checkbox-content">
          <li class="checkbox-list cursor-pointer py-1 px-3 lg:px-5 border border-solid border-E6E6EA" 
            @click="invitationRecord(item.value)" 
            :class="{ 'first': index == 0, 'last':  invitationList.length - 1 == index, 'active' : item.value == invitationType }" 
            v-for="(item, index) in invitationList" :key="item.value+'gas'">
            {{$t(item.key)}}
          </li>
        </ul>
      </div>
      <div class='p-6'>
        <div v-show="invitationType == '邀请记录'">
          <div v-show="get_invite_record_list.objects.length !== 0">
            <table class="table-fixed w-full">
                <thead>
                  <tr class="border-b border-solid border-E8E7EB">
                    <th class="w-1/3 py-4 font-medium text-left pl-2">{{$t('Lang.Friend mobile phone number')}}</th>
                    <th class="w-1/3 py-4 font-medium">{{$t('Lang.Registration time')}}</th>
                    <th class="w-1/4 lg:w-1/3 py-4 font-medium text-right pr-4">{{$t('Lang.status')}}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in get_invite_record_list.objects" class="border-b border-solid border-E8E7EB" :key="index + '_index'">
                    <td class="w-1/3 py-3 text-left pl-2">{{item.mobile}}</td>
                    <td class="w-1/3 py-3 text-center">{{item.create_time.split(' ')[0]}}</td>
                    <td class="w-1/4 py-3 text-right pr-4">{{$t('Lang.Success')}}</td>
                  </tr>
                </tbody>
            </table>
            <div class="my-3 lg:my-6">
              <Pagination :pageSize="page_size" :pageIndex="page_index" :totalCount="total_count" @indexChange="searchRecordHandler"></Pagination>
            </div>
          </div>
          <div v-if="get_invite_record_list.objects.length == 0" class='flex items-center justify-center border border-solid border-E6E6EA' style='height:20vh'>
            <div class='text-center'>
              <img src="@/assets/imgs/noMsg.png" alt="" style='width:150px'>
              <p style='color:#5F6578'>{{$t('Lang.No record')}}</p>
            </div>
          </div>
        </div>
        <div v-show="invitationType == '奖励记录'">
          <div v-if="get_reward_record_list.objects.length !== 0">
            <table class="table-fixed w-full">
                <thead>
                  <tr class="border-b border-solid border-E8E7EB">
                    <th class="py-4 font-medium text-left pl-4">{{$t('Lang.time')}}</th>
                    <th class="py-4 font-medium">{{$t('Lang.Reward')}}</th>
                    <th class="py-4 font-medium text-right pr-4">{{$t('Lang.Quantity')}}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in get_reward_record_list.objects" class="border-b border-solid border-E8E7EB" :key="index + '_index'">
                    <td class="w-1/12 py-3 text-left pl-4">{{item.create_time.split(' ')[0]}}</td>
                    <td class="w-1/12 py-3 text-center">{{$t('Lang.Pro Professional edition')}}</td>
                    <td class="w-1/12 py-3 text-right pr-4">{{item.reward}} {{$t('Lang.Months')}}</td>
                  </tr>
                </tbody>
            </table>
            <div class="my-3 lg:my-6">
              <Pagination :pageSize="page_size" :pageIndex="page_index" :totalCount="total_count" @indexChange="searchRecordHandlerTwo"></Pagination>
            </div>
          </div>
          <div v-if="get_reward_record_list.objects.length == 0" class='flex items-center justify-center border border-solid border-E6E6EA' style='height:20vh'>
            <div class='text-center'>
              <img src="@/assets/imgs/noMsg.png" alt="" style='width:150px'>
              <p style='color:#5F6578'>{{$t('Lang.No record')}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <el-dialog
      :title="$t('Lang.Poster invitation')"
      :visible.sync="posterFlag"
      width="340px"
      :before-close="handleClose">
        <div class='-mt-8 relative -mb-4 pt-4' style='z-index:99'>
          <img src="@/assets/imgs/poster.png" style='width:320px;height:530px'>
          <div id="qrcodeTwo" ref="qrcodeTwo" class='absolute' style='top:438px;left:120px'></div>
          <div class='absolute' style='width:320px;height:530px;top:0;z-index:999'>

          </div>
        </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" class='w-full' @click="downLoad">{{$t('Lang.Download')}}</el-button>
      </span>
    </el-dialog>

    

    <canvas id="canvas" style="width:360px;height:640px;display:none;"></canvas>
    <img src="@/assets/imgs/poster.png" id="bg" style="display:none;style='width:320px;height:530px'">
    <div id="qrcode"  style="display:none;"></div>
  </div>
</template>

<script>
import utils from '@/static/utils.js'

  export default {
    asyncData({ app }) {
        let data = {
            user_info: {},
            loginFlag: false,
            get_invite_info:{},
            get_invite_record_list:{},
            get_reward_record_list:{},
            page_size: 20,
            page_index: 1,
            total_count: 0,
        };

        return app.$axios.post("/api/explorer/get_user_info").then((res) => {
            if (res.code == 0) {
                data.user_info = res.data;
                data.loginFlag = true
                return app.$axios.post("/api/explorer/get_invite_info")
            } else {
              data.loginFlag = false
              return data
            }
        }).then(res=>{
          if (!res || res.code != 0) return data
          data.get_invite_info = res.data
          return app.$axios.post("/api/explorer/get_invite_record_list",{
            page_size: 20,
            page_index: 1,
          })
        }).then(res=>{
          if (!res || res.code != 0) return data
          data.get_invite_record_list = res.data
          data.total_count = res.data.total_count
          data.page_index = res.data.page_index
          return app.$axios.post("/api/explorer/get_reward_record_list",{
            page_size: 20,
            page_index: 1,
          })
        }).then(res=>{
          if (!res || res.code != 0) return data
          data.get_reward_record_list = res.data
          return data
        })
    },
    data() {
        return {
          posterFlag:false,
          qrcodeObj: {},
          qrcodeObjTwo:{},
          lang: this.$store.state.locale,
          loginFlag:false,
          http:'',
          invitation:'asd',
          invitationType:'邀请记录',
          invitationList:[
            { value: '邀请记录', key: 'Lang.Invitation record' },
            { value: '奖励记录', key: 'Lang.Reward record' },
          ],
          page_size: 20,
          page_index: 1,
          total_count: 0,
        }
    },
    beforeMount(){
      this.http = `${window.location.origin}/${this.lang}/account/register?code=${this.get_invite_info.invite_code}` 
      if(this.$route.query.type){
        localStorage.setItem('type',this.$route.query.type)
      }
    },
    mounted(){
      this.qrcodeObj = new QRCode('qrcode', {
          text: this.http,    
          width: 80,
          height: 80,
          colorDark : '#fff',
          colorLight : '#000',
          correctLevel : QRCode.CorrectLevel.L
      });

      setTimeout(()=>{
        var bg = document.getElementById("bg");
        var code = document.getElementById("qrcode").getElementsByTagName('img')[0];

        var imgCode = '';
        var canvas = "";
        canvas = document.getElementById("canvas");
        canvas.width = 360;
        canvas.height = 640;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(bg, 0, 0, 360, 640);
        ctx.drawImage(code, 132, 514, 96, 98);
        var img = new Image();
        img.src = imgCode;
        img.οnlοad = function () {
            ctx.drawImage(img, 360, 640, 360, 640);
            downloadFile('aaa.png', canvas.toDataURL("image/png"));
          }
      },500)
    },
    methods:{
      invitationRecord(item){
        if (this.invitationType == item) return
        this.invitationType = item
        
        this.page_index = 1
        this.total_count = 0
        switch (item) {
          case '邀请记录':
            this.getInviteList()
            break;
          case '奖励记录':
            this.getRewardList()
            break;
        }
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
      downLoad(){
        var canvas = document.getElementById("canvas");
        canvas.toBlob(function(blob){
          utils.blobToFileDownload(blob,'邀请.png')
        },"image/png")
        this.$refs.qrcodeTwo.innerHTML = ''
        this.posterFlag = false
      },
      posterBtn(){
        this.posterFlag = !this.posterFlag
        setTimeout(()=>{
          this.qrcodeObjTwo = new QRCode('qrcodeTwo', {
            text: this.http,    
            width: 80,
            height: 80,
            colorDark : '#fff',
            colorLight : '#000',
            correctLevel : QRCode.CorrectLevel.M
          });
        },0)
      },
      handleClose(done) {
        this.$refs.qrcodeTwo.innerHTML = ''
        done();
      },
      searchRecordHandler(pageIndex) {
        this.$axios.post('/api/explorer/get_invite_record_list', {
            page_size: this.page_size,
            page_index: pageIndex,
          })
          .then(res => {
            if (res.code != 0) return
            this.get_invite_record_list = res.data
          })
      },
      getInviteList(){
        this.$axios.post("/api/explorer/get_invite_record_list",{
          page_size: 20,
          page_index: 1,
        }).then(res=>{
        if (!res || res.code != 0) return data
          this.get_invite_record_list = res.data
          this.total_count = res.data.total_count
          this.page_index = res.data.page_index
        })
      },
      searchRecordHandlerTwo(pageIndex) {
        this.$axios.post('/api/explorer/get_reward_record_list', {
            page_size: this.page_size,
            page_index: pageIndex,
          })
          .then(res => {
            if (res.code != 0) return
            this.get_reward_record_list = res.data
          })
      },
      getRewardList(){
        this.$axios.post("/api/explorer/get_reward_record_list",{
          page_size: 20,
          page_index: 1,
        }).then(res=>{
        if (!res || res.code != 0) return data
          this.get_reward_record_list = res.data
          this.total_count = res.data.total_count
          this.page_index = res.data.page_index
        })
      },
      immediately(){
        this.$router.push(`/${this.lang}/account/register`)
        if(!localStorage.getItem('type') || localStorage.getItem('type') == 0){
          localStorage.setItem('type',1)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
.banner{
  height: 300px;
  background:url('../../../assets/imgs/invitation-bg.png') no-repeat;
  background-size: 100% 100%;
  background-color:#09123B;
}
.banner-phone{
  height: 300px;
  background-size: 100% 100%;
  background-color:#09123B;
}
.contact{
  color: rgba(255, 200, 66, 1);
  border: 1px solid rgba(255, 200, 66, 1);
  padding: 2px 4px;
  border-radius: 4px;
  opacity: 0.75;
  &:hover{
    opacity: 1;
    cursor: pointer;
    .proImg{
      opacity: 1;

    }
  }
}
.phone-banner{
  background:url('../../../assets/imgs/invitation-bg.png') no-repeat;
  background-size: 100% 100%;
}
.littiephone-banner{
  background:url('../../../assets/imgs/invitation-bg.png') no-repeat;
  background-size: 100% 100%;
}
.proImg{
  position: absolute;
  opacity: 0;
  transition: all 0.2s linear; 
}
.bottom10{
  bottom: 10%;
}
.bottom25{
  bottom: 25%;
}
.top10{
  top: 10%;
}
.top18{
  top: 18%;
}
.text-bg{
  background: linear-gradient(90deg, #FFC842 0%, #FFC842 30%, rgba(255, 200, 66, 0) 100%);
  color: #09123B;
}
.poster{
  padding: 20px;
  width: 320px;
  border-radius:4px;
  background: #fff;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);   
}
.bottom0{
  bottom: 0%;
}
.bottom8{
  bottom: 8%;
}
.bottom12{
  bottom: 12%;
}
.bottom17{
  bottom: 17%;
}
.height200{
  height: 230px;
}
.height170{
  height: 170px;
}
.height210{
  height: 210px;
}
.contactFree{
    color:#000;
    border: 1px solid rgba(255, 200, 66, 1);
    background:  rgba(255, 200, 66, 1);
    padding: 2px 4px;
    border-radius: 4px;
    opacity: 0.75;
    &:hover{
        opacity: 1;
        cursor: pointer;
        .proImg{
            opacity: 1;

        }
    }
}
</style>