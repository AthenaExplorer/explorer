<template>
  <div class="flex flex-col items-center  border-solid border-E6E6EA py-10 lg:py-20 rounded-b-lg mb-6">
    <div class="px-5 w-full lg:w-148">
      <div class='flex items-top justify-between'>
        <div class="mb-4 text-gray-800 text-lg font-medium">
          {{$t('Lang.Phone Number')}}
        </div>
        <div v-show="false">
          <div v-show="loginType == 'pwd'" @click="changeLoginType('ver')" class=' text-right cursor-pointer opacity-75 hover:opacity-100' style='color:#333fc6'>{{$t('Lang.Verification code login')}} <i class="el-icon-arrow-right"></i> </div>
          <div v-show="loginType == 'ver'" @click="changeLoginType('pwd')" class='text-right cursor-pointer opacity-75 hover:opacity-100' style='color:#333fc6'>{{$t('Lang.Password login')}} <i class="el-icon-arrow-right"></i> </div>
        </div>

      </div>
      <el-input @focus='inputFocus' @input='changePhone' @keyup.enter.native="login" clearable class="login-el-input" v-model="mobile" :placeholder="$t('Lang.Please enter phone number')">
        <el-select v-model="area" slot="prepend" :placeholder="$t('Lang.Please Select')">
          <el-option label="+86" value="1"></el-option>
        </el-select>
      </el-input>
      <div v-show="loginType == 'pwd'">
        <div class="mt-5 mb-4 text-gray-800 text-lg font-medium">{{$t('Lang.Password_1')}}</div>
        <el-input  @focus='inputFocus' @keyup.enter.native="login" clearable class="mb-10 login-el-input" v-model="password" :placeholder="$t ('Lang.Password_2')" show-password type="password"></el-input>
      </div>
      <div v-show="loginType == 'ver'">
        <div class="mt-5 mb-4 text-gray-800 text-lg font-medium">{{$t('Lang.Graphic verification code')}}</div>
        <el-input clearable class="login-el-input" v-model="webVerification" :placeholder="$t('Lang.Please enter the graphic verification code')">
          <template slot="append">
            <button class="w-full h-full p-1" @click="refreshImgHandler">
              <img class="w-full h-full" :src="`/api/system/get_img_random_code?t=${random}`" alt="">
            </button>
          </template>
        </el-input>
        <div class="mt-5 mb-4 text-gray-800 text-lg font-medium">{{$t('Lang.Phone verification code')}}</div>
        <el-input  @focus='inputFocus' clearable v-model="verification_code" @keyup.enter.native="login" class="mb-10 login-el-input" :placeholder="$t('Lang.Please enter the phone verification code')">
          <template slot="append">
            <button class="w-full h-full" @click='getSmsLoginvercode' :disabled="verificationFlag" :class="{'cursor-not-allowed':verificationFlag}">
              <span class="text-main px-2">{{$t(verificationText)}}</span>
            </button>
          </template>
        </el-input>
      </div>
      <el-button :disabled="disabledFlag" class="h-16 w-full relative" type="primary" @click='login'>
        <span v-if="!disabledFlag" class="text-xl font-medium">{{$t('Lang.Sign up')}}</span>
        <span v-if="disabledFlag" class="text-xl font-medium"><i class="el-icon-loading"></i></span>
        <p class='absolute' style='top:-20px;left:0;color:rgba(230, 62, 62, 1)'>{{$t(errorMsg)}}</p>
      </el-button>
      <p class='mt-2 text-848599'>{{$t('Lang.A new account will be created automatically when you log in with an unregistered mobile phone')}}</p>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import Cookie from 'js-cookie'
import utils from "@/static/utils";

export default {
  name: 'Login',

  mixins: [],

  props: [],

  components: {

  },

  watch: {

  },

  computed: {
  },

  asyncData({ app }) {
    let data = {
      mobile_prefix: "86",
      random: Date.now(),
      area:'1'
    };
      return data;
  },

  data: function() {
    return {
      mobile:'',
      password:'',
      errorMsg:'',
      disabledFlag:false,
      lang:this.$store.state.locale,
      loginType:'ver',
      verificationFlag: false,
      verificationText: "Lang.Get verification code",
      verification_code:'',
      verification:'',
      webVerification:'',
      user_info:''
    }
  },

  methods: {
    ...mapActions({
      changeIsSignIn:'changeIsSignIn',
      changeIsProActive:'changeIsProActive'
    }),
    login(){
      if (this.mobile == "") {
        this.errorMsg = "Lang.Please enter phone number";
        return;
      }
      
      if(!/^([1-9]\d*|0)(\.\d{1,})?$/.test(this.mobile)){
        this.errorMsg = 'Lang.The phone number can only be a number'
        return
      }

      if(this.loginType == 'ver'){
        if (this.webVerification == "") {
          this.errorMsg = "Lang.Please enter the graphic verification code";
          this.refreshImgHandler()
          return;
        }
  
        if( this.webVerification !== utils.getDAes(this.verification)){
          this.errorMsg = 'Lang.Graphic verification code error'
          this.refreshImgHandler()
          return
        }

        if (this.verification_code == "") {
          this.errorMsg = "Lang.Please enter the phone verification code";
          this.refreshImgHandler()
          return;
        }
      }

      if(this.loginType == 'pwd'){
        if (this.password == "") {
          this.errorMsg = "Lang.Please enter the password"; 
          this.refreshImgHandler()
          return;
        }
      }

      this.disabledFlag = true
      if(this.loginType == 'pwd'){
        this.$axios.post('/api/explorer/login',{
          mobile:utils.getAES(this.mobile) ,
          password:utils.getAES(this.password),
        }).then(res=>{
          this.loginAfter(res)
        })
      }else{
        this.$axios.post('/api/explorer/sms_login_explorer',{
          mobile:this.mobile,
          mobile_prefix:'86',
          verification_code:this.verification_code
        }).then(res=>{
          this.loginAfter(res)
        })
      }
    },
    refreshImgHandler() {
      this.random = Date.now();
      setTimeout(()=>{
        this.getWebVerification()
      },1000)
    },
    getWebVerification(){
      this.$axios.post("/api/system/get_str").then(res=>{
        this.verification = res.data
      })
    },
    getSmsLoginvercode() {
      if (this.mobile == "") {
        this.errorMsg = "Lang.Please enter phone number";
        return;
      }
      if(!/^([1-9]\d*|0)(\.\d{1,})?$/.test(this.mobile)){
        this.errorMsg = 'Lang.The phone number can only be a number'
        return
      }

      if (this.webVerification == "") {
        this.errorMsg = "Lang.Please enter the graphic verification code";
        this.refreshImgHandler()
        return;
      }

      if( this.webVerification !== utils.getDAes(this.verification)){
        this.errorMsg = 'Lang.Graphic verification code error'
        this.refreshImgHandler()
        return
      }
      this.$axios
        .post("/api/explorer/get_sms_login_explorer_vercode", {
          mobile: this.mobile,
          mobile_prefix: '86',
          pro: "explorer",
        })
        .then((res) => {
          if(res.code == 15000){
            this.refreshImgHandler()
            this.errorMsg = 'Lang.Frequent verification codes, please try again later' 
            return
          }
          if(res.code == 11004){
            this.refreshImgHandler()
            this.errorMsg = 'Lang.User does not exist' 
            return
          }
          if(res.code == 0){
            this.errorMsg = ''
            this.verificationFlag = true;
            let time = 30;
            let timer = setInterval(() => {
              time -= 1;
              this.verificationText = "Lang." + time + "s";
              if (time == 0) {
                this.verificationFlag = false;
                this.verificationText = "Lang.Get verification code";
                clearInterval(timer);
              }
            }, 1000);
          }
        });
    },
    changeLoginType(val){
      this.errorMsg = ''
      this.loginType = val
      this.refreshImgHandler()
    },
    loginAfter(res){
      this.disabledFlag = false
      if(res.code !== 0){
        this.refreshImgHandler()
        if(res.code == 11001){
          this.errorMsg =  'Lang.Phone number format is incorrect'
        }
        if(res.code == 11002){
          this.errorMsg =  'Lang.Incorrect password format'
        }
        if(res.code == 11003){
          this.errorMsg =  'Lang.Incorrect username or password'
        }
        if(res.code == 11004){
          this.errorMsg =  'Lang.User does not exist'
        }
        if(res.code == 80009){
          this.errorMsg =  'Lang.Access is too frequent, please try again later'
        }
        if(res.code == 15000){
          this.errorMsg = 'Lang.Verification code error'
        }
        
        return
      }else{
        Cookie.set('token', res.data.token)
        localStorage.setItem('user',JSON.stringify(res.data))
        switch (this.lang) {
          case 'zh':
            this.$notification.success({
              title: '登录成功',
            })
            break;
          case 'en':
            this.$notification.success({
              title: 'login successful',
            })
            break;
          case 'ja':
            this.$notification.success({
              title: 'ログイン成功',
            })
            break;
          case 'ko':
            this.$notification.success({
              title: '성공적 로그인',
            })
            break;
          default:
            break;
        }
        if(sessionStorage.getItem('path')){
          let myRouter = sessionStorage.getItem('path').slice(3)
          if(myRouter == '/registerActivity'){
            this.$router.push(`/${this.lang}/tool/pro`)
          }else{
            this.$router.push(`/${this.lang}${myRouter}`)
          }
        }else{
          this.$router.push(`/${this.lang}/tool/pro`)
        }
        this.$bus.$emit('expire-event')
        this.getUser()
      }
    },
    getUser(){
      this.$axios.post('/api/explorer/get_user_info').then(res=>{
        this.changeIsSignIn(res.code == 0 ? true:false)
        if(res.code == 0){
          this.user_info = res.data
          this.getProActive()
        }
      })
    },
    getProActive(){
      this.$axios.post('/api/explorer/get_pro_user_info',{
        token:this.user_info.token
      }).then(res=>{
        this.changeIsProActive(res.code == 0 ? true:false)
        if(res.code !== 0) return
        if(res.data.pro_tips_flag){
          let text = ''
          switch (this.lang) {
            case 'zh':
              text = '恭喜你获得了Pro专业版1个月的试用权，赶快去试试吧~'
              break;
            case 'en':
              text = 'Congratulations on your 1-month trial of Pro Professional Edition. Go and have a try~'
              break;
            case 'ko':
              text = 'Pro 전문 판 1 개 월 의 시용 권 을 획득 한 것 을 축하 하 며, 빨리 가서 시험 해 보 세 요 ~'
              break;
            case 'ja':
              text = 'プロ版の1ヶ月間の試用権を獲得したことをおめでとうございます。早く行ってみてください。'
              break;
          }
          this.$message({
            showClose: true,
            message: text,
            type: 'success',
            duration:10000
          });
          return this.$axios.post('/api/explorer/update_pro_tips_flag')
        }

      })
    },
    inputFocus(){
      this.errorMsg = ''
    },
    changePhone(){
      this.password = ''
    }
  },

  mounted: function() {
    this.refreshImgHandler()
  },

  beforeDestroy: function() {

  }
}
</script>
<style lang="scss">
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
</style>