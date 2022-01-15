<template>
  <div class="w-full bg-main text-white">
    <div class="hidden editionCenter px-3 lg:block  pt-6 pb-3">
      <div class='flex justify-between '>
        <n-link class="mr-10" :to="`/${langimg}/`">
          <img class="h-8 lg:h-12 -mt-2" src="~/assets/img/icon-en-logo.png" />
        </n-link>
        <div class='flex items-center'>
          <div class='' v-show="!IsSignIn">
            <img @click="registerActivity" class='mb-1 w-10 cursor-pointer' src="@/assets/imgs/registerActivity.png" alt="">
          </div>
          <div class="h-10 ml-6 flex items-center opacity-75 hover:opacity-100" v-show="IsSignIn">
            <el-dropdown @command="personalMenu">
              <span class="el-dropdown-link text-white">
                <img src="../assets/imgs/icon-personalCenter.png" alt="" style='width:18px' >
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="personalCenter">{{$t('Lang.Personal Center')}}</el-dropdown-item>
                <el-dropdown-item command="myCollection">{{$t('Lang.My Collection')}}</el-dropdown-item>
                <el-dropdown-item command="out">{{$t('Lang.Exit')}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div class="h-10 ml-6 flex items-center cursor-pointer " v-show="!IsSignIn">
            <div class='flex '>
              <p class='opacity-75 hover:opacity-100' @click="goLogin('account')">{{$t('Lang.Sign up')}}</p>
            </div>
          </div>
          <div class="ml-6 h-10 flex items-center">
            <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link text-white opacity-75 hover:opacity-100">
                {{ lang }}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="zh">中文</el-dropdown-item>
                <el-dropdown-item command="en">English</el-dropdown-item>
                <el-dropdown-item command="ko">한국어</el-dropdown-item>
                <el-dropdown-item command="ja">日本語</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </div>

      <div class='flex'>
        <div class="h-10  flex items-end mt-2">
          <span class='mr-10 cursor-pointer' @click='goIndex'>{{$t('Lang.Home')}}</span>
          <el-dropdown v-for="i in menuList" :key="i.router" trigger="click" @command="handleRouter" class='mr-10'>
            <span class="el-dropdown-link text-white">
              {{routerTitle(i.title)}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item  v-for="k in i.subList" :key="k.router" :command="k.router">
                <div class='flex'>
                  <p>{{$t(k.name)}}</p>
                  <img  v-show="k.pro" src="@/assets/imgs/proTitle.png" alt="" class='w-8 h-4 ml-2'>
                </div>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span class='mr-10 cursor-pointer relative' @click='goDateCap'>
            {{$t('Lang.Datacap statistics')}}
            <img src="../assets/imgs/new.png" alt="" class='w-12 absolute' style='top:-14px;right:-38px'>
          </span>
        </div>
        <div class='flex-1' >
          <div class='w-40'>
            <n-link :to="`/${langimg}/invitation`" class="h-10 mr-6 flex items-end" v-show="!flag">
              <img  v-show="langimg == 'zh'" src="@/assets/imgs/icon-invitation.png" alt="" class="h-6">
              <img  v-show="langimg == 'ko'" src="@/assets/imgs/icon-invitation-ko.png" alt="" class="h-6">
              <img  v-show="langimg == 'ja'" src="@/assets/imgs/icon-invitation-ja.png" alt="" class="h-6">
              <img  v-show="langimg == 'en'" src="@/assets/imgs/icon-invitation-en.png" alt="" class="h-6">
            </n-link>
          </div>
        </div>
        <div class="h-10 mt-2 w-136 flex" >
          <el-autocomplete
            size='mini'
            clearable
            class="inline-input w-full"
            v-model="search"
            :fetch-suggestions="querySearch"
            placeholder="请输入内容"
            @change="searchChange"
            @select="searchHandler"
          >
            <el-button @click="searchHandler" slot="append" size='mini'>
              <i class="el-icon-search"></i>
            </el-button>
          </el-autocomplete>
        </div>
      </div>


    </div>
    <div class="block lg:hidden px-3 pt-4">
      <div class="flex items-center justify-between py-3">
        <n-link :to="`/${langimg}/`">
          <img class="h-10" src="~/assets/img/icon-en-logo.png" />
        </n-link>
        <div class="flex items-center justify-center">
          <div class='flex-1 -mt-1'>
            <n-link :to="`/${langimg}/invitation`" class="h-10  flex items-center mr-6" v-show="!flag"><img src="@/assets/imgs/icon-invitation-phone.png" alt="" class="h-6"></n-link>
          </div>
          <div class='mr-4' v-show="!IsSignIn">
            <img @click="registerActivity" class='mb-1 w-8' src="@/assets/imgs/registerActivity.png" alt="">
          </div>
          <div class="h-10 mr-6 flex items-center "  v-show="IsSignIn">
            <el-dropdown @command="personalMenu">
              <span class="el-dropdown-link text-white">
                <img src="../assets/imgs/icon-personalCenter.png" alt="" style='width:20px'>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="personalCenter">{{$t('Lang.Personal Center')}}</el-dropdown-item>
                <el-dropdown-item command="myCollection">{{$t('Lang.My Collection')}}</el-dropdown-item>
                <el-dropdown-item command="out">{{$t('Lang.Exit')}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div class="h-10 mr-6 flex items-center cursor-pointer "  v-show="!IsSignIn">
            <div class='flex '>
              <p class='opacity-75 hover:opacity-100' @click="goLogin('account')">{{$t('Lang.Sign up')}}</p>
            </div>
          </div>
          <div class=" h-10 flex items-center">
            <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link text-white opacity-75 hover:opacity-100">
                {{ lang }}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="zh">中文</el-dropdown-item>
                <el-dropdown-item command="en">English</el-dropdown-item>
                <el-dropdown-item command="ko">한국어</el-dropdown-item>
                <el-dropdown-item command="ja">日本語</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </div>
      <div class="pt-2 pb-4">
        <el-input
          clearable
          v-model="search"
          size="mini"
          :trigger-on-focus="false"
          @focus="searchFocus"
          @blur="searchBlur"
          @change="searchChange"
          :placeholder="
            $t('Lang.Search for block / account / addresse / message')
          "
        >
          <el-button slot="append" @click="searchHandler">
            <i class="el-icon-search"></i>
          </el-button>
        </el-input>
      </div>
      <el-dialog
        :title="$t('Lang.Long press to save the picture')"
        :visible.sync="dialogVisible"
        width="85%"
        >
        <img src="@/assets/imgs/oneYear.png" alt="">
      </el-dialog>
    </div>

    <div class="box fixed" style='right:1vw;top:35vh;z-index:999'>
      <ul>
        <li class="consultation hover:text-white text-main bg-white hover:bg-main rounded-full">
          <div class=' flex items-center justify-center px-1  py-1 rounded-full cursor-pointer shadow'>
            <div class=''>
              <img src="../assets/imgs/consultation.png" alt="" class='lg:w-12 w-14'>
              <p  class='hidden lg:block w-4  text-center mx-auto' :class="{'py-3':langimg !== 'en'}">{{$t('Lang.Consult customer service')}}</p>
            </div>
          </div>
          <div class="consultation-logo flex">
            <div class=' z-40 flex items-center consultationBg py-6 pl-6 pr-10' style='left:-204px;top:-10px'>
              <img  src="@/assets/imgs/contact.png" alt="" style='width:80px;height:80px'>
              <div class='text-6C757E ml-4'>
                <p class='text-black'>{{$t('Lang.Common problem')}}:</p>
                <p>1、{{$t('Lang.Buy Pro')}}</p>
                <p>2、{{$t('Lang.API interface')}}</p>
                <p>3、{{$t('Lang.Data query')}}</p>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import utils from "@/static/utils";
import { mapGetters, mapActions, mapMutations } from "vuex";
import Cookie from 'js-cookie'

export default {
  name: "HeaderFrame",

  mixins: [],

  props: ["value"],

  model: {
    prop: "value",
    event: "change",
  },


  components: {},

  watch: {
    $route: {
      handler: function (to, from) {
        this.changeMenuHandler(false);
        this.activeRouterHandler(to.path);
        if (to.params.lang == "zh") {
          this.lang = "中文";
        } else if (to.params.lang == "en") {
          this.lang = "English";
        } else if (to.params.lang == "ko") {
          this.lang = "한국어";
        } else if (to.params.lang == "ja") {
          this.lang = "日本語";
        }
        this.langimg = to.params.lang


        this.flag = true

      },
      deep: true,
    },
  },

  computed: {
    ...mapGetters({
      menu: "getMenu",
      IsSignIn:'getIsSignIn'
    }),
    currentLang: function () {
      let t = "";
      this.langs.map((per) => {
        if (per.command == this.lang) {
          t = per;
        }
      });
      return t;
    },
    routerTitle(){
      return function(val){
        let str = ''
        if(this.langimg == 'ko'){
          
          switch (val) {
            case '区块链':
              str = '블록체인'
              break;
            case '统计':
              str = '통계'
              break;
            case '工具':
              str = '도구'
              break;
            case '生态分析':
              str = '생태학적 분석'
              break;
          }
        }else if(this.langimg == 'en'){
          switch (val) {
            case '区块链':
              str = 'Blockchain'
              break;
            case '统计':
              str = 'Stats'
              break;
            case '工具':
              str = 'Tool'
              break;
            case '生态分析':
              str = 'Ecological analysis'
              break;
          }
        }else if(this.langimg == 'ja'){
          switch (val) {
            case '区块链':
              str = 'ブロックチェーン'
              break;
            case '统计':
              str = '統計'
              break;
            case '工具':
              str = '道具'
              break;
            case '生态分析':
              str = '生態学的分析'
              break;
          }
        }else{
          switch (val) {
            case '区块链':
              str = '区块链'
              break;
            case '统计':
              str = '统计'
              break;
            case '工具':
              str = '工具'
              break;
            case '生态分析':
              str = '生态分析'
              break;
          }
        }
        return str
      }
    }
  },
  filters:{

  },

  data: function () {
    return {
      flag:true,
      search: "",
      canSearch: true,
      lang: "中文",
      langimg: this.$store.state.locale,
      tabs: [],
      timer:null,
      isLogin:true,
      menuList:[
        {
          title:'区块链',
          subList:[
            {name:'Lang.BLOCK',router:'/blockChain/tipset',pro:false},
            {name:'Lang.MESSAGE',router:'/blockChain/msg',pro:false},
            {name:'Lang.Address',router:'/blockChain/rich',pro:false},
            {name:'Lang.Order',router:'/blockChain/order',pro:false},
            {name:'Lang.Message pool',router:'/blockChain/messagePool',pro:false},
          ]
        },
        {
          title:'统计',
          subList:[
            {name:'Lang.Statistical overview',router:'/statistics/panoramicData',pro:false},
            {name:'Lang.GAS fee statistics',router:'/statistics/gas',pro:false},
            {name:'Lang.Hash power trend',router:'/statistics/powerTrend',pro:false},
            {name:'Lang.Production Efficiency',router:'/statistics/outputEfficiency',pro:false},
            {name:'Lang.Sector pledge',router:'/statistics/pledge',pro:false},
            {name:'Lang.Athena Pool',router:'/statistics/athena',pro:false},
          ]
        },
        {
          title:'工具',
          subList:[
            {name:'Lang.FIL calculator',router:'/tool/calculator/effective',pro:false},
            {name:'Lang.Node health',router:'/tool/pro',pro:true},
            {name:'Lang.Node monitoring',router:'/tool/pro/nodeMonitoring',pro:true},
            {name:'Lang.Node comparison',router:'/tool/pro/nodeComparison',pro:true},
            {name:'Lang.Wallet Flow',router:'/tool/walletFlow'},
            {name:'Lang.Common tool',router:'/tool/commonlyUsed',pro:false},
          ]
        },
        {
          title:'生态分析',
          subList:[
            {name:'Lang.FIL index',router:'/ecologicalAnalysis/filindex',pro:false},
            {name:'Lang.Forecast and analysis',router:'/ecologicalAnalysis/prediction',pro:false},
            {name:'Lang.Ecological Statistics',router:'/ecologicalAnalysis/ecologicalStatistics',pro:false},
          ]
        }
      ],
      img:require('~/assets/imgs/oneYear.png'),
      dialogVisible:false,
      restaurants: [
      ],
    };
  },

  methods: {
    ...mapActions({
      changeMenuHandler: "changeMenu",
    }),
    ...mapMutations(["SET_LANG"]),
    activeRouterHandler: function (path) {
      this.tabs = this.value.map((per) => {
        per.active = path == per.to;
        return per;
      });
      if (this.$route.path.indexOf("pro") != -1) {
        this.tabs[4].active = true;
      }

    },
    langHandler: function (c) {
      this.lang = c;
    },
    searchFocus: function (e) {
      this.canSearch = false;
    },
    searchBlur: function (e) {
      this.canSearch = false;
    },
    searchChange: function (e) {
      clearTimeout(this.timer)
      this.canSearch = true;
      if (!e) return;
      let me = this;
      this.timer = setTimeout(function () {
        me.searchNetwork(e);
      }, 200);
    },
    searchHandler() {
      this.searchChange(this.search);
    },
    searchNetwork: function (e) {
      if (utils.isBlank(e)) {
        this.search = "";
        return;
      }
      e = e.replace(/ /g, "");
      if (!this.canSearch) return;
      this.$axios.post("/api/explorer/search", { value: e }).then((res) => {
        if (res.code != 0 || !res.data.type) {
            if(this.langimg == 'zh'){
              this.$notification.error({
                title: '错误',
                message: '无法搜寻到此内容'
              })
            }else if(this.langimg == 'en'){
              this.$notification.error({
                title: 'Error',
                message: 'Unable to search for this content'
              })
            }else if(this.langimg == 'ja'){
              this.$notification.error({
                title: 'エラー',
                message: 'この内容を検索できませんでした'
              })
            }else{
              this.$notification.error({
                title: '오류',
                message: '이 내용 을 찾 을 수 없습니다'
              })
            }
          
          return
        };
        this.restaurants.push({value:this.search})
        this.unique()
        this.search = "";
        switch (res.data.type) {
          case "address":
            {
              this.$axios.post('/api/explorer/search_miner_or_wallet', {
                value: res.data.address
              }).then(d=>{
                $nuxt.$router.push({
                  path: `/${this.langimg}/chain/addr/${d.data.address}`,
                });
              })
            }
            break;
          case "message":
            {
              $nuxt.$router.push({
                path: `/${this.langimg}/chain/msg/${res.data.address}-${res.data.height}`,
              });
            }
            break;
          case "tipset":
            {
              $nuxt.$router.push({
                path: `/${this.langimg}/chain/tipset/${res.data.address}`,
              });
            }
            break;
          case "block":
            {
              $nuxt.$router.push({
                path: `/${this.langimg}/chain/block/${res.data.address}`,
              });
            }
            break;
          case "peer":
            {
              $nuxt.$router.push({
                path: `/${this.langimg}/chain/peer/${res.data.address}`,
              });
            }
            break;
          default:
            break;
        }
      });
    },
    unique(){
      for(var i=0; i<this.restaurants.length; i++){
          for(var j=i+1; j<this.restaurants.length; j++){
              if(this.restaurants[i].value==this.restaurants[j].value){
                  this.restaurants.splice(j,1);
                  j--;
              }
          }
      }
    },
    menuHandler() {
      this.changeMenuHandler(true);
    },
    handleCommand(command) {
      if (command == "zh") {
        this.lang = "中文";
      } else if (command == "en") {
        this.lang = "English";
      } else if (command == "ko") {
        this.lang = "한국어";
      } else if (command == "ja") {
        this.lang = "日本語";
      }
      Cookie.set('lang', command)
      this.SET_LANG(command);
      let url = this.$route.fullPath.slice(3);
      this.$router.push(`/${command}${url}`);
      this.langimg = command;
    },
    personalMenu(command){
      if (command == "personalCenter") {
        this.$router.push(`/${this.langimg}/personalMenu/personalCenter`)
      } else if (command == "myCollection") {
        this.$router.push(`/${this.langimg}/personalMenu/myCollection`)
      } else if (command == "out") {
        this.$axios.post("/api/explorer/clear_user_info").then((res) => {
          sessionStorage.clear()
        });
        this.$router.push(`/${this.langimg}/signOut`)
      }
    },
    goLogin(router){
      this.$router.push(`/${this.langimg}/${router}`)
      if(this.$route.path.indexOf('account') == -1){
        sessionStorage.setItem('path',this.$route.path)
      }
    },
    handleRouter(command){
      switch (this.langimg) {
        case 'zh':
          this.langimg = 'zh'
          break;
        case 'en':
          this.langimg = 'en'
          break;
        case 'ja':
          this.langimg = 'ja'
          break;
        case 'ko':
          this.langimg = 'ko'
          break;
        default:
          this.langimg = 'zh'
          break;
      }
      sessionStorage.setItem('path',`/${this.langimg}${command}`)
      localStorage.removeItem('walletFlow')
      this.$router.push(`/${this.langimg}${command}`)
    },
    goIndex(){
      this.$router.push(`/${this.langimg}/`)
    },
    goDateCap(){
      this.$router.push(`/${this.langimg}/dataCap`)
    },
    downs() {
      this.$axios.post('/api/explorer/get_user_info').then(res=>{
        if(res.code !== 0){
          this.$router.push(`/${this.langimg}/account`)
        }else{
          this.downloadIamge(this.img, "Filecoin主网上线一周年数据简报");
        }
      })
    },
    downloadIamge(imgsrc, name) {
      var image = new Image();
      image.setAttribute("crossOrigin", "anonymous");
      image.onload = function () {
        var canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;
        var context = canvas.getContext("2d");
        context.drawImage(image, 0, 0, image.width, image.height);
        var url = canvas.toDataURL("image/png"); 

        var a = document.createElement("a"); 
        var event = new MouseEvent("click");
        a.download = name || "photo"; 
        a.href = url;
        a.dispatchEvent(event);
      };
      image.src = imgsrc;
    },
    phoneDowm(){
      this.$axios.post('/api/explorer/get_user_info').then(res=>{
        if(res.code !== 0){
          this.$router.push(`/${this.langimg}/account`)
        }else{
          this.dialogVisible = true
        }
      })
    },
    registerActivity(){
      this.$router.push(`/${this.langimg}/registerActivity`)
    },
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
      cb(results);
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
  },

  beforeMount: function () {
    this.tabs = this.value;
    this.activeRouterHandler(this.$route.path);
    if (this.$store.state.locale == "zh") {
      this.lang = "中文";
    } else if (this.$store.state.locale == "en") {
      this.lang = "English";
    } else if (this.$store.state.locale == "ko") {
      this.lang = "한국어";
    } else if (this.$store.state.locale == "ja") {
      this.lang = "日本語";
    } 
  },

  mounted: function () {
    Cookie.set('lang', this.$store.state.locale)
    if(new Date().getTime()>new Date('2021-08-01 00:00:00').getTime()){
      this.flag = true
    }
  },

  beforeDestroy: function () {},
};
</script>
<style>

.el-dropdown-menu__item{
  padding-top: 5px!important;
  padding-bottom: 5px!important;
}

.consultationBg{
  background: url('../assets/imgs/consultation_bg.png') no-repeat;
  background-size: 100% 100%;
}

.consultation:hover .consultation-logo {
	width: 320px;
	height: 120px;
}
.consultation-logo {
	width: 320px;
	height: 0px;
	overflow: hidden;
	position: absolute;
	top: -10px;
	left: -230px;
	-webkit-transition: all .3s;
	-moz-transition: all .3s;
	-ms-transition: all .3s;
	-o-transition: all .3s;
}
</style>