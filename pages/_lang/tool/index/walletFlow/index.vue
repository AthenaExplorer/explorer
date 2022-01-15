<template>
   <div class="pb-3 relative">
     <div class='absolute lg:flex hidden items-center text-main px-6 py-4 rounded-r-full cursor-pointer hover:opacity-75' 
       style='top:70px;background:#ECF2FF'
       @click='seachWalletFlag = true'>
      {{$t('Lang.No address? Click query')}}
      <img src="../../../../../assets/imgs/seachWallet.png" alt="" class='w-6 ml-4'>
     </div>
     <div class='absolute flex lg:hidden items-center text-main px-6 py-2 rounded-r-full cursor-pointer hover:opacity-75' 
       style='top:10px;background:#ECF2FF'
       @click='seachWalletFlag = true'>
      {{$t('Lang.No address? Click query')}}
      <img src="../../../../../assets/imgs/seachWallet.png" alt="" class='w-5 ml-4'>
     </div>
     <div class='lg:block hidden'>
      <div class='flex items-center justify-between'>
        <p class='hidden lg:block text-2xl mb-3'>{{$t('Lang.Wallet Flow')}}</p>
        <div class='w-100 -mt-2' v-show="!walletFlag">
          <el-input clearable size='mini' :placeholder="$t('Lang.Please enter wallet address')"  v-model="inputWallet" class="input-with-select"  @keyup.enter.native='seach'>
            <el-button slot="append" icon="el-icon-search" @click='seach'></el-button>
          </el-input>
        </div>
      </div>
      <div class="rounded-md bg-white flowBox pt-20">
        <div class='search_pc mx-auto pt-96 pb-148' v-show="walletFlag">
        <el-input :placeholder="$t('Lang.Please enter wallet address')" v-model="inputWallet" class="input-with-select" clearable @keyup.enter.native='seach' >
          <el-button slot="append"  @click='seach'>{{$t('Lang.Search')}}</el-button>
        </el-input>
        <p class='mt-4' style='color:#495666'>*{{$t('Lang.Enter the correct wallet address')}}</p>
        </div>

        <div class='px-16 pt-6 mx-4 mt-6' v-show="backSeachList.length>1">
          <el-button v-show="!walletFlag" @click='backSeach'>{{$t('Lang.Return to last search')}}</el-button>
        </div>
        <div v-show="!walletFlag" class='px-16 pt-10 flex justify-between text-xl mx-4'>
          <p>{{$t("Lang.To change into")}}</p>
          <p>{{$t('Lang.Transfer out')}}</p>
        </div>
        <div v-show="!walletFlag" class='flex w-full py-10 px-16 justify-center items-center' > 
          <div class='flex' v-loading = fristShow>
            <div class="left flex items-center" v-loading='enterListLoading'>
              <div v-show="enterList.length !== 0">
                <div class='flex h-20' v-for="(i,j) in enterList" :key="i.msg_address+j+'enter'">
                  <div class='flex justify-center items-center my-2 w-80 boxShadow' style='background:#F3F4FC'>
                    <el-popover
                      placement="left"
                      trigger="hover">
                      <div v-for="(k,m) in i.msg_list" :key="'zzz'+k.height+j+m" class='flex my-2 px-2'>
                          <n-link :to="`/${lang}/chain/msg/${k.msg_cid}-${k.height}`" class='cursor-pointer w-44 text-left'>{{k.msg_cid | getSubStr}}</n-link>
                          <p class='px-4 w-60'>{{k.height_time}}</p>
                          <p>{{k.msg_value | formatEasyFil}}</p>
                      </div>
                      <div class='' v-show="i.count>5">
                          <el-button size='mini' type='primary' plain @click='showMore(i,true)'>{{$t('Lang.More')}}</el-button>
                      </div>
                      <div class='flex' slot="reference">
                        <n-link :to="`/${lang}/chain/addr/${i.msg_address}`" class='cursor-pointer'>{{i.msg_address | getSubStr}}</n-link>
                        <div class="flex items-center justify-center truncate" v-if="tagShowFlag">
                          <template v-if="globalMinerTag[i.msg_address]">
                          <span class="border border-solid border-teal-500 text-teal-500 rounded px-1 lg:mx-3 mx-2 lg:my-0 my-2 flex items-center">{{ globalMinerTag[i.msg_address].en_tag }}</span>
                          <el-popover trigger="hover" :content="$t('Lang.The user has completed signature verification for the owner')">
                            <img v-show="globalMinerTag[i.msg_address].signed" src="@/assets/imgs/isSigned.png"  alt="" class='ml-2'  style='width:12px; height:14px' slot="reference">
                          </el-popover>
                          </template>
                          <span v-else></span>
                        </div>
                      </div>
                    </el-popover>
                    <img src="@/assets/imgs/wallet_right_enter.png" alt="" class='w-5 ml-4 cursor-pointer myImgEnter' @click="changeWallet(i.msg_address)">
                  </div>
                  <div class='flex items-center'>
                    <div class='w-16 bg-E8E7EB' style='height:2px'></div>
                  </div>
                  <div class='flex items-center text-01B464 pl-4 w-40'>
                    {{i.value | formatEasyFil}}
                  </div>
                  <div  v-show="enterList.length>1">
                    <img v-show="j==0" src="@/assets/imgs/walletFlow_top_left.png" alt="" class='h-20'>
                    <img v-show="j>0&&j<enterList.length-1" src="@/assets/imgs/walletFlow_middle_left.png" alt="" class='h-20'>
                    <img v-show="j==enterList.length-1" src="@/assets/imgs/walletFlow_bottom_left.png" alt="" class='h-20'>
                  </div>
                  <div v-show="enterList.length == 1">
                  </div>
                </div>
              </div>
              <div v-show="enterList.length == 0" class='flex items-center justify-center'>
                <div class='text-center px-32'>
                  <img src="@/assets/imgs/noMsg.png" alt="" style='width:150px'>
                  <p style='color:#5F6578' >{{$t('Lang.No record')}}</p>
                </div>
              </div>
            </div>
            <div class=" flex justify-center items-center w-128">
                <div class='middle_pc py-10 px-10  text-main w-full flex justify-center'>
                  <n-link :to="`/${lang}/chain/addr/${address}`" class='cursor-pointer w-40 text-center'>{{address | getSubStr}}</n-link>
                </div>
            </div>
            <div class="right flex items-center" v-loading='outListLoading'>
              <div  v-show="outList.length !== 0">
                <div class='flex h-20' v-for="(i,j) in outList" :key="i.msg_address+j+'out'">
                  <div v-show="outList.length>1">
                    <img v-show="j == 0" src="@/assets/imgs/walletFlow_top_right.png" alt="" class='h-20'>
                    <img v-show="j > 0 && j < outList.length-1" src="@/assets/imgs/walletFlow_middle_right.png" alt="" class='h-20'>
                    <img v-show="j == outList.length-1" src="@/assets/imgs/walletFlow_bottom_right.png" alt="" class='h-20'>
                  </div>
                  <div v-show="outList.length == 1">
                  </div>
                  <div class='flex items-center text-FB4D56 px-4 w-40'>
                    {{i.value | formatEasyFil}}
                  </div>
                  <div class='flex items-center w-16'>
                    <img src="@/assets/imgs/wallet_arrow_small.png" alt="">
                  </div>
                  <div  class='flex justify-center items-center my-2 w-80 boxShadow' style='background:#F3F4FC'>
                    <el-popover
                      placement="left"
                      trigger="hover">
                      <div v-for="(k,m) in i.msg_list" :key="k.height+m+'list'" class='flex my-2 px-2'>
                          <n-link :to="`/${lang}/chain/msg/${k.msg_cid}-${k.height}`" class='cursor-pointer w-44 text-left'>{{k.msg_cid | getSubStr}}</n-link>
                          <p class='px-4 w-60'>{{k.height_time}}</p>
                          <p>{{k.msg_value | formatEasyFil}}</p>
                      </div>
                      <div class=''  v-show="i.count>5">
                          <el-button size='mini' type='primary' plain @click='showMore(i,false)'>{{$t('Lang.More')}}</el-button>
                      </div>
                      <div class='flex' slot="reference">
                        <n-link :to="`/${lang}/chain/addr/${i.msg_address}`" class='cursor-pointer'>{{i.msg_address | getSubStr}}</n-link>
                        <div class="flex items-center justify-center truncate" v-if="tagShowFlag">
                          <template v-if="globalMinerTag[i.msg_address]">
                          <span class="border border-solid border-teal-500 text-teal-500 rounded px-1 lg:mx-3 mx-2 lg:my-0 my-2 flex items-center">{{ globalMinerTag[i.msg_address].en_tag }}</span>
                          <el-popover trigger="hover" :content="$t('Lang.The user has completed signature verification for the owner')">
                            <img v-show="globalMinerTag[i.msg_address].signed" src="@/assets/imgs/isSigned.png"  alt="" class='ml-2'  style='width:12px; height:14px' slot="reference">
                          </el-popover>
                          </template>
                          <span v-else></span>
                        </div>
                      </div>
                    </el-popover>
                    <img src="@/assets/imgs/wallet_left_enter.png" alt="" class='w-5 ml-4 cursor-pointer myImgEnter' @click="changeWallet(i.msg_address)">
                  </div>
                </div>
              </div>
              <div v-show="outList.length == 0" class='flex items-center justify-center'>
                <div class='text-center px-32'>
                  <img src="@/assets/imgs/noMsg.png" alt="" style='width:150px'>
                  <p style='color:#5F6578' >{{$t('Lang.No record')}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-show="!walletFlag && paginationgFlag" class='px-16 pb-6 flex justify-between text-xl mx-4'>
          <div class='flex items-center' v-show="!fristShow">
            <img v-show="enterList.length !== 0" src="@/assets/imgs/walletFlow_add.png" alt="" class='w-10 mr-6 cursor-pointer' :class="{'cursor-not-allowed': page_index_enter == 1}" @click='enterChange(-1)'>
            <img v-show="enterList.length !== 0" src="@/assets/imgs/walletFlow_cut.png" alt="" class='w-10 cursor-pointer' :class="{'cursor-not-allowed': page_index_enter == enterTotalPage}" @click='enterChange(1)'>
            <p v-show="enterList.length !== 0" class='ml-6 text-lg text-6C757E'>{{$t('Lang.A total of')}} {{enterTotalCount}} {{$t('Lang.Strip')}}</p>
          </div>
          <div class='flex items-center' v-show="!fristShow">
            <p v-show="outList.length !== 0" class='mr-6 text-lg text-6C757E'>{{$t('Lang.A total of')}} {{outTotalCount}} {{$t('Lang.Strip')}}</p>
            <img v-show="outList.length !== 0" src="@/assets/imgs/walletFlow_add.png" alt="" class='w-10 mr-6 cursor-pointer' :class="{'cursor-not-allowed': page_index_out == 1}" @click='outChange(-1)'>
            <img v-show="outList.length !== 0" src="@/assets/imgs/walletFlow_cut.png" alt="" class='w-10 cursor-pointer' :class="{'cursor-not-allowed': page_index_out == outTotalPage}" @click='outChange(1)'>
          </div>
        </div>
      </div>
     </div>
     <div  class='block lg:hidden'>
       <div class='w-54 pt-30' v-show="walletFlag">
        <el-input :placeholder="$t('Lang.Please enter wallet address')" v-model="inputWallet" class="input-with-select" clearable @keyup.enter.native='seach' >
          <el-button slot="append"  @click='seach'>{{$t('Lang.Search')}}</el-button>
        </el-input>
        <p class='mt-4 pl-2' style='color:#495666'>*{{$t('Lang.Enter the correct wallet address to easily understand the wallet flow direction')}}</p>
        <p></p>
      </div>
      <div v-show="!walletFlag" class='pt-24'>
        <div class='w-54 -mt-2' v-show="!walletFlag">
          <el-input clearable size='mini' :placeholder="$t('Lang.Please enter wallet address')"  v-model="inputWallet" class="input-with-select"  @keyup.enter.native='seach'>
            <el-button slot="append" icon="el-icon-search" @click='seach'></el-button>
          </el-input>
        </div>
        <div class='mt-6'>
          <div>
            <p class='text-center'>{{$t("Lang.To change into")}}</p>
            <div class='flex py-4 justify-center items-center' v-show="enterList.length !== 0">
              <img  src="@/assets/imgs/walletFlow_add.png" alt="" class='w-10 cursor-pointer' :class="{'cursor-not-allowed': page_index_enter == 1}" @click='enterChange(-1)'>
               <p v-show="enterList.length !== 0" class='mx-6 text-lg text-6C757E text-center'>{{$t('Lang.A total of')}} {{enterTotalCount}} {{$t('Lang.Strip')}}</p>
              <img  src="@/assets/imgs/walletFlow_cut.png" alt="" class='w-10 cursor-pointer' :class="{'cursor-not-allowed': page_index_enter == enterTotalPage}" @click='enterChange(1)'>

            </div>
            <div class='flex justify-center' v-loading='enterListLoading'>
              <div class='w-24' v-for="(i,j) in enterList" :key="j+'enter'" v-show="enterList.length !== 0">
                <div class='breakAll px-4 h-'>
                  <div style='background:#F3F4FC' class='px-2 py-6 h-56'>
                    <div class='h-28'>
                      <n-link slot="reference" :to="`/${lang}/chain/addr/${i.msg_address}`" class='cursor-pointer w-40 '>{{i.msg_address | getSubStr}}</n-link>
                    </div>
                    <img src="@/assets/imgs/wallet_left_enter.png" alt="" class='w-5 ml-4 cursor-pointer myImgEnter mt-2' @click="changeWallet(i.msg_address)">
                    <p class='text-center mt-2' @click='showMore(i,true)'>{{$t('Lang.Detailed')}}</p>
                  </div>
                </div>
                <div class='flex items-center justify-center'>
                  <div class='h-8 bg-E8E7EB' style='width:2px'></div>
                </div>
                <div>
                  <p class='text-01B464 breakAll text-center mx-2 h-14'>{{i.value | formatEasyFil}}</p>
                </div>
                <div v-show="enterList.length>1">
                  <img v-show="j==0" src="@/assets/imgs/phone_walletEnter_left.png" alt="" class='w-full'>
                  <img v-show="j>0&&j<enterList.length-1" src="@/assets/imgs/phone_walletEnter_middle.png" alt="" class='w-full'>
                  <img v-show="j==enterList.length-1" src="@/assets/imgs/phone_walletEnter_right.png" alt="" class='w-full'>
                </div>
              </div>
              <div v-show="enterList.length == 0" class='flex items-center justify-center py-10'>
                <div class='text-center px-32'>
                  <img src="@/assets/imgs/noMsg.png" alt="" style='width:150px'>
                  <p style='color:#5F6578' >{{$t('Lang.No record')}}</p>
                </div>
              </div>
            </div>
            <div class="flex justify-center">
                <div class='middle_phone py-16 px-10 w-64  text-main flex '>
                  <n-link :to="`/${lang}/chain/addr/${address}`" class='cursor-pointer w-40 text-center'>{{address | getSubStr}}</n-link>
                </div>
            </div>
            <div class='flex justify-center' v-loading='outListLoading'>
              <div class='w-24' v-for="(i,j) in outList" :key="j+'enter'" v-show="outList.length !== 0">
                <div  v-show="outList.length>1">
                  <img v-show="j==0" src="@/assets/imgs/phone_walletOut_left.png" alt="" class='w-full'>
                  <img v-show="j>0&&j<outList.length-1" src="@/assets/imgs/phone_walletOut_middle.png" alt="" class='w-full'>
                  <img v-show="j==outList.length-1" src="@/assets/imgs/phone_walletOut_right.png" alt="" class='w-full'>
                </div>
                <div>
                  <p class='text-FB4D56 breakAll text-center mx-2 h-14'>{{i.value | formatEasyFil}}</p>
                </div>
                <div class='flex items-center justify-center'>
                  <img src="@/assets/imgs/wallet_phone_arrow.png" alt="" class='h-10'>

                </div>
                <div class='breakAll px-2'  >
                  <div style='background:#F3F4FC' class='px-4 py-6 h-56'>
                    <div class='h-28'>
                      <n-link slot="reference" :to="`/${lang}/chain/addr/${i.msg_address}`" class='cursor-pointer w-40'>{{i.msg_address | getSubStr}}</n-link>
                    </div>
                    <img src="@/assets/imgs/wallet_left_enter.png" alt="" class='w-5 ml-4 cursor-pointer myImgEnter mt-2' @click="changeWallet(i.msg_address)">
                    <p class='text-center mt-2' @click='showMore(i,false)'>{{$t('Lang.Detailed')}}</p>

                  </div>
                </div>
              </div>
              <div v-show="outList.length == 0" class='flex items-center justify-center py-10'>
                <div class='text-center px-32'>
                  <img src="@/assets/imgs/noMsg.png" alt="" style='width:150px'>
                  <p style='color:#5F6578' >{{$t('Lang.No record')}}</p>
                </div>
              </div>
            </div>
            <p class='pt-4 text-center'>{{$t('Lang.Transfer out')}}</p>
            <div class='flex py-4 justify-center items-center' v-show="outList.length !== 0">
              <img src="@/assets/imgs/walletFlow_add.png" alt="" class='w-10 cursor-pointer' :class="{'cursor-not-allowed': page_index_out == 1}" @click='outChange(-1)'>
              <p v-show="outList.length !== 0" class='mx-6 text-lg text-6C757E'>{{$t('Lang.A total of')}} {{outTotalCount}} {{$t('Lang.Strip')}}</p>
              <img src="@/assets/imgs/walletFlow_cut.png" alt="" class='w-10 cursor-pointer' :class="{'cursor-not-allowed': page_index_out == outTotalPage}" @click='outChange(1)'>
            </div>
            
          </div>
        </div>
      </div>
     </div>
    <el-dialog
        :title="$t('Lang.Detailed')"
        :visible.sync="showMoreFlag"
        :width='dialogWidth'>
        <div v-loading='moreLoading'>
          <table class="table-fixed w-full">
              <thead>
              <tr class="">
                  <th class="w-24 py-4 px-4 font-medium text-6C757E">{{$t('Lang.Height')}}</th>
                  <th class="py-4 font-medium text-6C757E">{{$t('Lang.Message ID')}}</th>
                  <th class="py-4 font-medium text-6C757E">{{$t('Lang.Time')}}</th>
                  <th class="py-4 font-medium text-6C757E">{{$t('Lang.Amount')}}</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(item, index) in objects" class="border-b border-solid border-E8E7EB" :key="index + '_index'">
                  <td class="py-3 text-center">
                      <n-link :to="`/${lang}/chain/tipset/${item.height}`" class='text-main cursor-pointer hover:opacity-75'>{{item.height}}</n-link>
                  </td>
                  <td class="py-3 text-center">
                      <el-popover
                        placement="right"
                        trigger="hover"
                        :content="item.msg_cid">
                          <n-link :to="`/${lang}/chain/msg/${item.msg_cid}-${item.height}`" slot="reference">{{item.msg_cid | getSubStr}}</n-link>
                      </el-popover>
                  </td>
                  <td class="py-3 text-center">
                      {{item.height_time}}
                  </td>
                  <td class="py-3 text-center">
                      {{item.msg_value | formatEasyFil}}
                  </td>
              </tr>
              </tbody>
          </table>
          <div class="my-3 lg:mt-6">
              <Pagination :pageSize="page_size" :pageIndex="page_index" :totalCount="total_count" @indexChange="searchRecordHandler" @sizeChange='handleCurrentChange'></Pagination>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="showMoreFlag = false">{{$t('Lang.Close')}}</el-button>
        </span>
    </el-dialog>

    <el-dialog
        :title="$t('Lang.Query supplier account address')"
        :visible.sync="seachWalletFlag"
        :width='dialogWidth'>
        <div class='seachBox mb-8'>
          <el-input :placeholder="$t('Lang.Please enter storage vendor')" v-model="node" class="input-with-select" clearable @clear='minerData = {}' @keyup.enter.native='seachNode' >
            <el-button slot="append"  @click='seachNode'>{{$t('Lang.Search')}}</el-button>
          </el-input>
        </div>
        <div class="flex items-center py-3 " v-for="item in minerOverview" :key="item.title"  v-show="item.val !== '--'">
          <div class="w-28 lg:w-40 text-848599 ">{{$t(item.title)}}:</div>
            <n-link class="hidden lg:block text-main w-80"  :to="item.href">{{item.val | getAllSubStr(30,12)}}</n-link>
            <n-link class="lg:hidden block  text-main w-28"  :to="item.href">{{item.val | getAllSubStr(30,4)}}</n-link>
            <i class='el-icon-document-copy cursor-pointer opacity-75 hover:opacity-100 ml-4 mt-1' @click='copyBtn(item.val)'></i>
            <p @click='toWalletFlow(item.val)' class='cursor-pointer opacity-75 hover:opacity-100 ml-2 lg:ml-6'>{{$t('Lang.View flow direction')}}</p>

        </div>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="seachWalletFlag = false">{{$t('Lang.Close')}}</el-button>
        </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import utils from "@/static/utils.js";

export default {

  data: function () {
    return {
      dialogWidth:'',
      lang: this.$store.state.locale,
      inputWallet:'',
      walletFlag:true,
      fristShow:true,
      enterList:[],
      outList:[],
      address:'',
      page_index_enter:1,
      page_index_out:1,

      enterTotalPage:0,
      enterTotalCount:0,
      enterListLoading:false,

      outTotalPage:0,
      outTotalCount:0,
      outListLoading:false,
      pageNum:0,
      showMoreFlag:false,


      enter_msg_address:'',
      out_msg_address:'',

      page_size: 20,
      page_index: 1,
      total_count: 0,
      objects:[],

      paginationgFlag:true,
      moreLoading:true,
      enterOrOutShowMoreFlag:false,

      backSeachList:[],
      delBack:'',

      node:'',
      seachWalletFlag:false,
      minerData:{}
    };
  },

  computed: {
    ...mapGetters({
      globalMinerTag: 'getGlobalMinerTag',
      tagShowFlag: 'getTagShowFlag'
    }),
    minerOverview: function() {
      let {
        owner_address,
        worker_address,
        post_address,
      } = this.minerData || {}

      return [
        { title: 'Lang.Owner', val: utils.formatOverview(owner_address), href: `/${this.lang}/chain/addr/${owner_address}` },
        { title: 'Lang.Worker', val: utils.formatOverview(worker_address), href: `/${this.lang}/chain/addr/${worker_address}` },
        { title: 'Lang.Post', val: utils.formatOverview(post_address), href: `/${this.lang}/chain/addr/${post_address}` },
      ]
    },
  },

  methods: {
    seach(){
        this.$axios.post('/api/explorer/get_is_wallet', {
        address: utils.trim(this.inputWallet) 
        }).then(res=>{
        if(res.data){
            localStorage.setItem('walletFlow',utils.trim(this.inputWallet ))
            this.walletMessageListOut(1)
            this.walletMessageListEnter(1)
            this.walletFlag = false
            this.address = utils.trim(this.inputWallet )
            if(this.delBack !== this.inputWallet){
              this.backSeachList.push(utils.trim(this.inputWallet ))
            }
        }else{
            let lang_errTitle = '',
            lang_errMsg_nonExistent = '';
            switch (this.lang) {
            case 'zh':
            lang_errTitle = '错误'
            lang_errMsg_nonExistent = '请输入正确地址';
            break;
            case 'en':
            lang_errTitle = 'Error'
            lang_errMsg_nonExistent = 'Please enter the correct wallet address';
            break;
            case 'ko':
            lang_errTitle = '오류'
            lang_errMsg_nonExistent = '정확 한 지갑 주 소 를 입력 하 세 요';
            break;
            case 'ja':
            lang_errTitle = 'エラー'
            lang_errMsg_nonExistent = '正しいウォレットアドレスを入力してください。';
            break;
            }
            this.$notification.error({
            title: lang_errTitle,
            message: lang_errMsg_nonExistent
            });
        }
        })
    },
    enterChange(num){
        this.page_index_enter+=num
        if(this.page_index_enter < 1){
        this.page_index_enter = 1
        return
        }
        if(this.page_index_enter > this.enterTotalPage){
        this.page_index_enter = this.enterTotalPage
        return
        }
        this.walletMessageListEnter(this.page_index_enter)
    },
    walletMessageListEnter(num){
        this.enterListLoading = true
        this.$axios.post('/api/explorer/get_wallet_flow_list', {
        address: utils.trim(this.inputWallet),
        direction:'inflow',
        page_size:this.pageNum,
        page_index:num
        }).then(res=>{
        this.enterListLoading = false
        this.enterList = res.data.objects
        this.enterTotalCount = res.data.total_count
        this.enterTotalPage = res.data.total_page

        })
    },
    walletMessageListOut(num){
        if(this.outList.length !== 0){
            this.outListLoading = true
        }
        this.$axios.post('/api/explorer/get_wallet_flow_list', {
            address: utils.trim(this.inputWallet),
            direction:'outflow',
            page_size:this.pageNum,
            page_index:num
        }).then(res=>{
            this.fristShow = false
            this.paginationgFlag = true
            this.outListLoading = false
            this.outTotalPage = res.data.total_page
            this.outList = res.data.objects
            this.outTotalCount = res.data.total_count
        })
    },
    outChange(num){
        this.page_index_out+=num
        if(this.page_index_out < 1){
        this.page_index_out = 1
        return
        }
        if(this.page_index_out > this.outTotalPage){
        this.page_index_out = this.outTotalPage
        return
        }
        this.walletMessageListOut(this.page_index_out)
    },
    changeWallet(item){
        this.paginationgFlag = false
        this.inputWallet = item
        this.seach()
    },
    getPageNum() {
        if (document.body.clientWidth >= 850) {
        this.pageNum = 12;
        } else if(document.body.clientWidth >= 768) {
        this.pageNum = 10;
        }else{
        this.pageNum = 5;
        }
    },
    getHeight() {
      if (document.body.clientWidth < 768) {
        this.dialogWidth = "93%";
      } else {
        this.dialogWidth = "640px";
      }
    },
    showMore(i,flag){
        if(flag){
          this.enter_msg_address = i.msg_address
        }else{
          this.out_msg_address = i.msg_address
        }
        this.enterOrOutShowMoreFlag = flag
        this.objects = []
        this.searchRecordHandler(1)
    },
    searchRecordHandler(pageIndex) {
        let list = {}
        if(this.enterOrOutShowMoreFlag){
            list = {
                from_address: utils.trim(this.enter_msg_address),
                to_address: utils.trim(this.inputWallet),
                page_index: pageIndex,
                page_size: this.page_size
            }
        }else{
            list = {
                from_address: utils.trim(this.inputWallet),
                to_address: utils.trim(this.out_msg_address),
                page_index: pageIndex,
                page_size: this.page_size
            }
        }
        this.moreLoading = true
        this.showMoreFlag = true

        this.$axios.post('/api/explorer/get_wallet_message_list', list).then(res=>{
          console.log(res);
          this.moreLoading = false
          this.objects = res.data.objects
          this.total_count = res.data.total_count
          this.page_index = pageIndex
        })
    },
    handleCurrentChange(size){
      this.page_size = size
      this.searchRecordHandler(1)
    },
    backSeach(){
      this.backSeachList.pop() 

      console.log(this.delBack);
      this.inputWallet = this.delBack = this.backSeachList[this.backSeachList.length-1]
      this.seach()
    },
    seachNode(){
      this.$axios.post("/api/explorer/get_miner_index",{
        miner_no :  utils.trim(this.node) 
      }).then(res=>{
        if(res.code !== 0){
          let lang_repeat = '',
          lang_errTitle = '';
        
        switch (this.lang) {
          case 'zh':
            lang_errTitle = '错误'
            lang_repeat = '请输入正确存储供应商';
            break;
          case 'en':
            lang_errTitle = 'Error'
            lang_repeat = 'Storage Provider cannot be empty';
            break;
          case 'ko':
            lang_errTitle = '오류'
            lang_repeat = '저장 공급자는 비워 둘 수 없습니다';
            break;
          case 'ja':
            lang_errTitle = 'エラー'
            lang_repeat = 'ストレージベンダーを空にすることはできません';
            break;
          }
          this.$notification.error({
            title: lang_errTitle,
            message: lang_repeat,
          });
          
        }else{
          this.get_miner_by_no()
        }
      })

    },
    get_miner_by_no(){
      this.$axios.post('/api/explorer/get_miner_by_no', {
        miner_no: utils.trim(this.node) 
      }).then(res=>{
        console.log(res);
        this.minerData = res.data
      })
      
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
    toWalletFlow(val){
      this.seachWalletFlag = false
      this.walletFlag = false
      this.inputWallet = val
      this.seach()
    }
  },

  beforeMount(){
    this.getPageNum();
    this.getHeight();

  },

  mounted: function() {
    if(localStorage.getItem('walletFlow')){
      this.walletFlag = false
      this.inputWallet = localStorage.getItem('walletFlow')
      this.seach()
    }
  },

  beforeDestroy: function () {
  },
};
</script>
<style lang="scss">
.flowBox{
}
.flowBox .search_pc{
  width: 820px;
}
.flowBox .el-input-group{
  height: 50px;
}
.flowBox .el-input__inner{
  height: 50px!important;
  background: #F3F4FC;
}
.flowBox .el-input-group__append{
  width: 110px;
  text-align: center;
}
.flowBox .el-input-group__append{
  background: #3633c6;
  border: 1px solid #3633c6;
  color: #fff;
}

.seachBox .el-input-group{
  height: 35px;
}
.seachBox .el-input__inner{
  height: 35px!important;
  background: #F3F4FC;
}
.seachBox .el-input-group__append{
  width: 120px;
  text-align: center;
}
.seachBox .el-input-group__append{
  background: #3633c6;
  border: 1px solid #3633c6;
  color: #fff;
}

.walletBg{
  background: url('../../../../../assets/imgs/walletBg.png') no-repeat;
  background-size: 100% 100%;
  width: 300px;
  height: 100px;
}
.__rail-is-vertical{
  height: 70%;
  margin-top: 22%;
  margin-right: 10px;
}
.enterBox:hover{
  cursor: pointer;
  box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.1);
}

.myImgEnter{
  transition: all 0.2s linear;
  &:hover{
  transform:scale(1.2);
  }
}

.boxShadow:hover{
  transition: all 0.2s linear;
  cursor: pointer;
  box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.1);
}

.breakAll{
  word-break:break-all;
}
.middle_pc{
  background: url('../../../../../assets/imgs/wallet_middle_flow.gif') no-repeat;
  background-size: 100% 100%;
}

.middle_phone{
  background: url('../../../../../assets/imgs/wallet_middle_flow_phone.gif') no-repeat;
  background-size: 100% 100%;
}
</style>