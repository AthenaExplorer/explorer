<template>
  <div class="flex flex-col items-center border-t border-solid border-E6E6EA py-10 lg:py-20 rounded-b-lg mb-6">
    <div class="px-5 w-full lg:w-148">
      <div class="mb-4 text-gray-800 text-lg font-medium">{{$t('Lang.Phone Number')}}</div>
      <el-input @focus='inputFocus' clearable v-model='registerForm.mobile' class="login-el-input" :placeholder="$t('Lang.Please enter phone number')">
        <el-select v-model="mobile_prefix" slot="prepend" placeholder="请选择">
          <el-option label="+86" value="86"></el-option>
        </el-select>
      </el-input>
      <el-input style='position:fixed;bottom:-9999px'></el-input>
      <el-input style='position:fixed;bottom:-9999px' type="password"></el-input>
      <div class="mt-5 mb-4 text-gray-800 text-lg font-medium">{{$t('Lang.Graphic verification code')}}</div>
      <el-input clearable class="login-el-input" v-model="webVerification" :placeholder="$t('Lang.Please enter the graphic verification code')">
        <template slot="append">
          <button class="w-full h-full p-1" @click="refreshImgHandler">
            <img class="w-full h-full" :src="url" alt="">
          </button>
        </template>
      </el-input>
      <div class="mt-5 mb-4 text-gray-800 text-lg font-medium">{{$t('Lang.Phone verification code')}}</div>

      <el-input @focus='inputFocus' clearable v-model="registerForm.verification_code" class="login-el-input" :placeholder="$t('Lang.Please enter the phone verification code')">
        <template slot="append">
          <button class="w-full h-full" @click='getSmsLoginvercode' :disabled="verificationFlag" :class="{'cursor-not-allowed':verificationFlag}">
            <span class="text-main px-2">{{$t(verificationText)}}</span>
          </button>
        </template>
      </el-input>
      <div class="mt-5 mb-4 text-gray-800 text-lg font-medium">{{$t('Lang.Please enter the password')}}</div>
      <el-input @focus='inputFocus' clearable v-model="registerForm.password" class="login-el-input" :placeholder="$t('Lang.Please enter the password')" show-password type="password"></el-input>
      
      <div class="mt-5 mb-4 text-gray-800 text-lg font-medium">{{$t('Lang.Confirm password')}}</div>
      <el-input @focus='inputFocus' clearable v-model="againPassword" class="mb-10 login-el-input" :placeholder="$t('Lang.Confirm password')" show-password type="password"></el-input>
      
      <el-button :disabled="disabledFlag" class="h-16 w-full relative" type="primary" @click='ok'>
        <span v-if="!disabledFlag" class="text-xl font-medium">{{$t('Lang.Sign in')}}</span>
        <span v-if="disabledFlag" class="text-xl font-medium"><i class="el-icon-loading"></i></span>
        <p class='absolute' style='top:-20px;left:0;color:rgba(230, 62, 62, 1)'>{{$t(errorMsg)}}</p>
      </el-button>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import utils from "@/static/utils";

export default {
  name: "Register",

  mixins: [],

  props: [],

  components: {},

  watch: {},

  computed: {},

  asyncData({ app }) {
    let data = {
      mobile_prefix: "86",
      random: Date.now()
    };
    return app.$axios.post("/api/explorer/get_mobile_prefix").then((res) => {
      return data;
    });
  },

  data: function() {
    return {
      url:'',
      disabledFlag: false,
      verificationFlag: false,
      verificationText: "Lang.Get verification code",
      registerForm: {
        mobile: "",
        password: "",
        mobile_prefix: "86",
        verification_code: "",
        invitation:'',
      },
      webVerification: '',
      verification: '',
      againPassword: "",
      errorMsg: "",
      lang: this.$store.state.locale,
      type:''
    };
  },

  methods: {
    ...mapActions({
      changeIsSignIn: 'changeIsSignIn'
    }),
    refreshImgHandler() {
      this.random = Date.now();
      this.url =  `/api/system/get_img_random_code?t=${this.random}`
      setTimeout(() => {
        this.getWebVerification()
      }, 200)
    },
    getWebVerification() {
      this.$axios.post("/api/system/get_str").then(res => {
        this.verification = res.data
      })
    },
    getSmsLoginvercode() {
      if (this.registerForm.mobile == "") {
        this.errorMsg = "Lang.Please enter phone number";
        return;
      }

      if (!/^([1-9]\d*|0)(\.\d{1,})?$/.test(this.registerForm.mobile)) {
        this.errorMsg = "Lang.The phone number can only be a number";
        return;
      }

      if (this.webVerification == "") {
        this.errorMsg = "Lang.Please enter the graphic verification code";
        this.refreshImgHandler()
        return;
      }

      if (this.webVerification !== utils.getDAes(this.verification)) {
        this.errorMsg = 'Lang.Graphic verification code error'
        this.refreshImgHandler()
        return
      }



      this.$axios
        .post("/api/explorer/get_register_vercode", {
          mobile: this.registerForm.mobile,
          mobile_prefix: this.registerForm.mobile_prefix,
          pro: "explorer",
        })
        .then((res) => {
          if (res.code == 11009) {
            this.errorMsg =
              "Lang.Frequent verification codes, please try again later";
            this.refreshImgHandler()
          }
          if (res.code == 11006) {
            this.errorMsg =
              "Lang.User registered";
            this.refreshImgHandler()
          }
          if (res.code == 15000) {
            this.errorMsg = 'Lang.Frequent verification codes, please try again later'
            this.refreshImgHandler()
          }
          if (res.code == 0) {
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
    ok() {
      if (this.registerForm.mobile == "") {
        this.errorMsg = "Lang.Please enter phone number";
        this.refreshImgHandler()
        return;
      }

      if (this.webVerification == "") {
        this.errorMsg = "Lang.Please enter the graphic verification code";
        this.refreshImgHandler()
        return;
      }

      if (this.webVerification !== utils.getDAes(this.verification)) {
        this.errorMsg = 'Lang.Graphic verification code error'
        this.refreshImgHandler()
        return
      }


      if (!/^([1-9]\d*|0)(\.\d{1,})?$/.test(this.registerForm.mobile)) {
        this.errorMsg = "Lang.The phone number can only be a number";
        this.refreshImgHandler()
        return;
      }

      if (this.registerForm.verification_code == "") {
        this.errorMsg = "Lang.Please enter the phone verification code";
        this.refreshImgHandler()
        return;
      }

      if (
        this.registerForm.password.length < 8 ||
        this.registerForm.password.length > 16
      ) {
        this.errorMsg = "Lang.Please enter 8-16 digits password";
        this.refreshImgHandler()
        return;
      }

      if (this.registerForm.password == "") {
        this.errorMsg = "Lang.Please enter the password";
        this.refreshImgHandler()
        return;
      }

      if (this.againPassword == "") {
        this.errorMsg = "Lang.Please enter the password again";
        this.refreshImgHandler()
        return;
      }

      if (this.registerForm.password !== this.againPassword) {
        this.errorMsg = "Lang.The password was entered incorrectly twice";
        this.refreshImgHandler()
        return;
      }

      this.disabledFlag = true;

      this.$axios
        .post("/api/explorer/register_explorer", {
          mobile: this.registerForm.mobile,
          password: this.registerForm.password,
          verification_code: this.registerForm.verification_code,
          invite_code:this.registerForm.invitation,
          mobile_prefix: "86",
          source:this.type
        })
        .then((res) => {
          this.disabledFlag = false;
          if (res.code !== 0) {
            this.refreshImgHandler()
            if (res.code == 15000) {
              this.errorMsg = "Lang.Verification code error";
            }
            if (res.code == 11009) {
              this.errorMsg =
                "Lang.Frequent verification codes, please try again later";
            }
            if (res.code == 99907) {
              this.errorMsg =
                "Lang.Graphic verification code error";
            }

            return;
          } else {
            if (this.lang == "zh") {
              this.$notification.success({
                title: "注册成功",
              });
            } else if (this.lang == "en") {
              this.$notification.success({
                title: "Registration success",
              });
            } else if (this.lang == "ja") {
              this.$notification.success({
                title: "登録完了",
              });
            } else {
              this.$notification.success({
                title: "등록 성공",
              });
            }
            return this.$axios.post('/api/explorer/login', {
              mobile: utils.getAES(this.registerForm.mobile),
              password: utils.getAES(this.registerForm.password)
            })
          }
        }).then(res => {
          if (res && res.code == 0) {
            if (sessionStorage.getItem('path')) {
              let myRouter = sessionStorage.getItem('path').slice(3)
              this.$router.push(`/${this.lang}${myRouter}`)
            } else {
              this.$router.push(`/${this.lang}/`)
            }
            this.getUser()
          }
        })
    },
    getUser() {
      this.$axios.post('/api/explorer/get_user_info').then(res => {
        this.changeIsSignIn(res.code == 0 ? true : false)
        return this.$axios.post('/api/explorer/get_pro_user_info',{
          token:res.data.token
        })
      }).then(res=>{
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
    inputFocus() {
      this.errorMsg = "";
    },
    getHeight() {
      if (document.body.clientWidth < 1024) {
        this.type = this.type + '_phone'
      } else {
        this.type = this.type + '_pc'
      }
    },
  },

  mounted: function() {
    setTimeout(()=>{
      this.refreshImgHandler()
    },1000)
    if(this.$route.query.code){
      this.registerForm.invitation = this.$route.query.code
    }
    this.getWebVerification()
  },
  beforeMount(){
    if(!localStorage.getItem('type')){
      localStorage.setItem('type',0)
    }
    this.type = localStorage.getItem('type')
    this.getHeight();

  },

  beforeDestroy: function() {
  },
};
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

  .el-input-group__append {
    padding: 0;
    width: 90px;
    height: 4rem;
  }
}
</style>