<template>
  <div class="mb-16">
    <div class='lg:flex hidden'>
      <p class=' text-2xl mb-3'>{{$t('Lang.Node monitoring management')}}</p>
      <img v-if="lang == 'zh' " src="@/assets/imgs/personalMenuPro-zh.png" alt="" style='height:26px' class='ml-4 -mt-1'>
      <img v-if="lang == 'en' " src="@/assets/imgs/personalMenuPro-en.png" alt="" style='height:26px' class='ml-4 -mt-1'>
      <img v-if="lang == 'ko' " src="@/assets/imgs/personalMenuPro-ko.png" alt="" style='height:26px' class='ml-4 -mt-1'>
      <img v-if="lang == 'ja' " src="@/assets/imgs/personalMenuPro-ja.png" alt="" style='height:26px' class='ml-4 -mt-1'>
    </div>
    <div class="bg-white rounded-md">
      <div class='lg:mb-0 mb-2'>
          <div class="hidden lg:flex justify-start pt-5 border-b border-solid border-E6E6EA">
            <p class='block py-2 mx-3 text-lg rounded font-medium flex ' v-show="routerTitle.title"><img :src="routerTitle.img" alt="" class='w-4 h-5 mr-3'>{{routerTitle.title}}</p>
            <p v-for="item in chainRouter" :key="item.path">
              <n-link class="text-6C757E block  pt-3 pb-4 ml-10 mr-3 text-base   font-medium hover:text-main hover:border-main"
              :class="{'child-link-active': item.active,'border-b-2':item.active,'border-solid':item.active,'border-E6E6EA':item.active}" :to="`/${lang}${item.path}`">{{ $t(item.title) }}</n-link>
            </p>
          </div>
          <div class='lg:hidden block '>
            <div class="flex items-center">
              <div class='mybox1 flex mr-4 mt-2' id='parent'>
                <p v-for="(item,j) in chainRouter" :key="item.path" :id="'childred'+j" class='relative'>
                  <n-link class="text-6C757E block pt-1 pb-1 px-3 mb-2 mr-6 text-lg font-medium hover:text-main hover:border-main wsn border border-solid border-E6E6EA rounded-sm"
                    :class="{'mr-10':item.pro,'child-link-active': item.active,'border':item.active,'border-solid':item.active,'border-E6E6EA':item.active,'bg-F8F7FF':item.active}" :to="`/${lang}${item.path}`">{{ $t(item.title) }}</n-link>
                  <img  v-show="item.pro" src="@/assets/imgs/proTitle.png" alt="" class='w-8 h-4 ml-2 absolute' style='top:0;right:10px'>
                </p>
              </div>
            </div>
          </div>
        </div>
      <div class='mt-2 relative'>
        <div class='hidden lg:block'>
          <el-popover
            placement="bottom"
            trigger="hover"
            :content="$t('Lang.Click Modify reminder phone number')">
            <i class="  el-icon-setting absolute text-2xl text-main cursor-pointer" slot="reference" style='right:24px;top:-40px' @click="nodeFlag = true"></i>
          </el-popover>
        </div>
        <div class='lg:hidden block'>
          <el-popover
            placement="bottom"
            trigger="hover"
            :content="$t('Lang.Click Modify reminder phone number')">
            <i class="  el-icon-setting absolute text-3xl text-main cursor-pointer" slot="reference" style='right:10px;top:4px;z-index:99' @click="nodeFlag = true"></i>
          </el-popover>
        </div>
        <nuxt-child />
      </div>
      
      <el-dialog
        :title="$t('Lang.Node monitoring management')"
        :visible.sync="nodeFlag"
        :width="dialogWidthNode"
        :close-on-click-modal="false">
        
        <div class='flex items-start justify-between'>
          <ul class="flex justify-left   mb-6">
            <li
              class='flex items-center mr-4'
              v-for="(item, index) in phoneList"
              :key="item.value"
            >
              <p class="rounded-md flex justify-center items-center checkbox-list cursor-pointer py-1 px-2 lg:px-5 border border-solid border-E6E6EA" 
                @click="selectStatTimehandler(item,index)"
                :class="{first: index == 0,last: phoneList.length - 1 == index,active: item.value == acitvePhone}">{{ item.label }}</p>
              <el-popover trigger="hover" :content="$t('Lang.The number of FIL produced in the past 24 hours')">
                <div v-show="item.label !== defaultMobile">
                  <p class='mb-2' >
                    <i class='el-icon-info text-red-500'></i>
                    {{$t('Lang.OK to delete')}} {{ item.label }} {{$t('Lang.cell phone number')}}<br>
                    {{$t('Lang.All associated nodes are cleared together')}}
                  </p>
                  <el-button @click='delPhoneNum(item)' size='mini' type='danger'>{{$t('Lang.Delete')}}</el-button>
                </div>
                <div v-show="item.label == defaultMobile">
                  <p>{{$t('Lang.Login mobile number does not support deletion!')}}</p>
                </div>
                <i class="el-icon-delete ml-1 cursor-pointer"  slot="reference"></i>
              </el-popover>
            </li>
          </ul>


          <div v-show="phoneList.length !== 3" @click='addPhone' class='cursor-pointer text-center py-1 px-3 lg:px-5 text-lg border border-solid myRounded font-medium text-main border-main'>
            {{$t('Lang.Add phone number')}}
          </div>
        </div>


        <div v-show="!addFlag">
          <div v-show="get_warn_mobile[acitvePhoneIndex].miner_monitors.length !== 0">
            <div class='lg:block hidden'>
              <table class="table-fixed w-full border border-solid border-E8E7EB">
                <thead>
                <tr class="">
                  <th class="w-1/4 py-4 font-medium">{{$t('Lang.Type')}}</th>
                  <th class="w-1/4 py-4 font-medium">{{$t('Lang.Node/Address')}}</th>
                  <th class="w-1/4 py-4 font-medium">{{$t('Lang.Tag/Remarks')}}</th>
                  <th class="w-1/4 py-4 font-medium pr-2">{{$t('Lang.Early warning threshold')}}</th>
                </tr>
                </thead>
                <tbody>
                  <template v-for="item in get_warn_mobile" >
                    <tr v-for="j in item.miner_monitors" :key="j.miner_no+item.mobile+j.warn_method" class="border-b border-solid border-E8E7EB" v-show="item.id == acitvePhone">
                      <td class="w-1/12 px-2 text-center py-4" >
                        <p v-if="j.warn_method == 'create_gas'">{{$t('Lang.New computing cost monitoring')}}</p>
                        <p v-if="j.warn_method == 'avg_reward'">{{$t('Lang.Output efficiency monitoring')}}</p>
                        <p v-if="j.warn_method == 'fil_change'">{{$t('Lang.Fund flow monitoring')}}</p>
                        <p v-if="j.warn_method == 'fil_balance'">{{$t('Lang.Wallet balance monitoring')}}</p>
                        <p v-if="j.warn_method == 'sector_faulty'">{{$t('Lang.Sector error monitoring')}}</p>
                      </td>
                      <td class="w-1/12 px-2 text-center py-4" >
                        <p class='truncate'>{{j.miner_no}}</p>
                      </td> 
                      <td class="w-1/12 px-2 text-center py-4" >
                        <span v-if="j.remarks !== ''">{{j.remarks}}</span>
                        <span v-else>-</span>
                      </td>
                      <td class="w-1/12 px-2 text-center py-4" >
                        <p v-if="j.warn_method == 'create_gas'">{{$t('Lang.Above reference value')}} {{Number(j.value*100).toFixed(0)}}%</p>
                        <p v-if="j.warn_method == 'avg_reward'">{{$t('Lang.Below reference value')}} {{Number(j.value*100).toFixed(0)}}%</p>
                        <p v-if="j.warn_method == 'fil_change'">{{$t('Lang.More than the')}} {{Number(j.value).toFixed(0)}}F</p>
                        <p v-if="j.warn_method == 'fil_balance'">{{$t('Lang.Less than')}} {{Number(j.value).toFixed(0)}}F</p>
                        <p v-if="j.warn_method == 'sector_faulty'">--</p>
                      </td>
                    </tr>

                  </template>
                </tbody>
              </table>
            </div>
            <div class='lg:hidden block border border-solid border-E8E7EB'>
              <template v-for="item in get_warn_mobile" >
                <div v-for="(j,m) in item.miner_monitors" :key="j.miner_no+item.mobile+j.warn_method" v-show="item.id == acitvePhone" class=" p-3  border-solid border-E8E7EB" :class="{'border-t': m>0}">
                  <div class='flex items-center justify-between'>
                    <span class="flex-1">{{$t('Lang.Type')}}</span>
                    <div class="w-1/2 text-right truncate">
                      <p v-if="j.warn_method == 'create_gas'">{{$t('Lang.New computing cost monitoring')}}</p>
                      <p v-if="j.warn_method == 'avg_reward'">{{$t('Lang.Output efficiency monitoring')}}</p>
                      <p v-if="j.warn_method == 'fil_change'">{{$t('Lang.Fund flow monitoring')}}</p>
                      <p v-if="j.warn_method == 'fil_balance'">{{$t('Lang.Wallet balance monitoring')}}</p>
                      <p v-if="j.warn_method == 'sector_faulty'">{{$t('Lang.Sector error monitoring')}}</p>
                    </div>
                  </div>

                  <div class='flex items-center justify-between'>
                    <span class="flex-1">{{$t('Lang.Node/Address')}}</span>
                    <div class="w-1/2 text-right truncate">
                      <p class='truncate'>{{j.miner_no}}</p>
                    </div>
                  </div>

                  <div class='flex items-center justify-between'>
                    <span class="flex-1">{{$t('Lang.Tag/Remarks')}}</span>
                    <div class="w-1/2 text-right truncate">
                      <span v-if="j.remarks !== ''">{{j.remarks}}</span>
                        <span v-else>-</span>
                    </div>
                  </div>

                  <div class='flex items-center justify-between'>
                    <span class="flex-1">{{$t('Lang.Early warning threshold')}}</span>
                    <div class="w-1/2 text-right truncate">
                      <p v-if="j.warn_method == 'create_gas'">{{$t('Lang.Above reference value')}} {{Number(j.value*100).toFixed(0)}}%</p>
                      <p v-if="j.warn_method == 'avg_reward'">{{$t('Lang.Below reference value')}} {{Number(j.value*100).toFixed(0)}}%</p>
                      <p v-if="j.warn_method == 'fil_change'">{{$t('Lang.More than the')}} {{Number(j.value).toFixed(0)}}F</p>
                      <p v-if="j.warn_method == 'fil_balance'">{{$t('Lang.Less than')}} {{Number(j.value).toFixed(0)}}F</p>
                      <p v-if="j.warn_method == 'sector_faulty'">--</p>
                    </div>
                  </div>
                </div>
              </template>
            </div>

          </div>
          <div v-show="get_warn_mobile[acitvePhoneIndex].miner_monitors.length == 0" style='height:15vh;color:#aaa' class='flex items-center justify-center'>
            {{$t('Lang.There is no node monitoring for this mobile number')}}
          </div>
        </div>
        <div class='mt-6' v-if="acitveLable !== defaultMobile">
          <el-form label-position="top" label-width="80px" ref="nodeMsgPhone"  size="mini" :model="nodeMsgPhone" :rules="nodeMsgPhoneRules">
            <el-form-item :label="$t('Lang.New phone number')" prop="newPhone">
              <el-input @focus='inputFocus' clearable v-model="nodeMsgPhone.newPhone" class="login-el-input" :placeholder="$t('Lang.Please enter phone number')">
                <el-select v-model="area" slot="prepend" :placeholder="$t('Lang.Please Select')">
                  <el-option label="+86" value="1"></el-option>
                </el-select>
              </el-input>
            </el-form-item>

            <el-form-item :label="$t('Lang.Phone verification code')" prop="verification">
              <el-input @focus='inputFocus' clearable :placeholder="$t('Lang.Please enter verification code')"  v-model="nodeMsgPhone.verification" class="login-el-input personalCenter">
                <el-button slot="append" :disabled='verificationFlag' @click='getNodeVerification'>{{$t(verificationText)}}</el-button>
              </el-input>
            </el-form-item>
          </el-form>

        </div>
        <p class='h-6 text-base' style='top:-20px;left:0;color:rgba(230, 62, 62, 1)'>{{$t(nodeMsgPhoneError)}}</p>
        <div v-show="acitveLable !== defaultMobile">
          <p v-show="!addFlag" class='text-base' style='color:#aaa'>{{$t('Lang.After replacement, all monitored reminder phone numbers under the current phone number will become your newly entered phone number')}}</p>

        </div>

        <span slot="footer" class="dialog-footer">
          <el-button @click="nodeFlag = false">{{$t('Lang.Cancel')}}</el-button>
          <el-button class='h-full' type="primary" @click="nodeOk" v-show="!addFlag  && acitveLable !== defaultMobile">{{$t('Lang.Substitute')}}</el-button>
          <el-button class='h-full' type="primary" @click="addOk" v-show="addFlag">{{$t('Lang.Add')}}</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>

export default {
  name: 'nodeMonitoring',

  data() {
    return {
      lang: this.$store.state.locale,
      chainRouter:[
        { path: '/tool/pro/nodeMonitoring', title: 'Lang.Added computing cost monitoring', active: false },
        { path: '/tool/pro/nodeMonitoring/efficiencyMonitoring', title: 'Lang.Output efficiency monitoring', active: false },
        { path: '/tool/pro/nodeMonitoring/flowMonitoring', title: 'Lang.Fund flow monitoring', active: false },
        { path: '/tool/pro/nodeMonitoring/balanceMonitoring', title: 'Lang.Wallet balance monitoring', active: false },
        { path: '/tool/pro/nodeMonitoring/sectorErrorMonitoring', title: 'Lang.Sector error monitoring', active: false },
      ],
      routerTitle:{
        title:'',
        img:require('~/assets/imgs/row.png')
      },
      activeName:'',
      nodeFlag:false,
      dialogWidthNode:'',
      acitvePhone: "",
      addFlag:false,
      acitvePhoneIndex: 0,
      nodeMsgPhoneError:'',
      nodeMsgPhone:{
        newPhone:'',
        verification:''
      },
      nodeMsgPhoneRules: {
        newPhone: [{ required: true, message: " ", trigger: "blur" }],
        verification: [{ required: true, message: " ", trigger: "blur" }],
      },
      area: "1",
      verificationFlag: false,
      verificationText: "Lang.Get verification code",
      defaultID:'',
      defaultMobile:'',
      acitveLable:''
    };
  },
  asyncData({app,redirect}) {
    let data ={
      lang:'',
      phoneList:[],
      get_warn_mobile:[],
      isLogin:true
    }
    return app.$axios.post("/api/explorer/get_user_info").then(res=>{
      if(res.code == 0){
        data.lang = res.data.lang
        data.isLogin = true

        return app.$axios.post("/api/explorer/get_pro_user_info",{
          token: res.data.token
        })
      }
      else{
        data.isLogin = false
        redirect(`/${res.data}/account`)
        return
      }
    }).then(res=>{
      if(!res) return
      if(res.code !== 0){
        data.isLogin = false

        redirect(`/${data.user_info}/tool/pro`)
        return
      }
        data.isLogin = true

      return app.$axios.post("/api/explorer/get_warn_mobile")
    }).then(res=>{
      
      if(data.isLogin){
        data.acitvePhone = res.data[0].id
        data.get_warn_mobile = res.data
        res.data.map(i=>{
          data.phoneList.push({value:i.id,label:i.mobile})
        })

      }
        return data
    })
  },
  watch: {
    $route: {
      handler: function(to, oldVal){
        this.seclectChildRouter(to.path)
        let url = this.$route.fullPath.slice(3);
        setTimeout(()=>{
            this.activeName = url 
        },100)
      },
      immediate:true,
      deep: true,
    }
  },
  beforeMount(){
  },
  mounted(){
    this.getHeight()
    if(localStorage.getItem('user')){
      this.defaultMobile = this.acitveLable =  JSON.parse(localStorage.getItem('user')).mobile
      this.phoneList.map(i=>{
        if(i.label == this.defaultMobile){
          this.defaultID = i.value
        }
      })
    }

    this.$bus.$on('nodeMonitoring_addNode', ()=>{
      this.getPhoneList()
    })
  },
  methods: {
    back() {
      this.$router.push(`/${this.lang}/`);
    },
    seclectChildRouter(path) {
      this.chainRouter.map(item => {
        item.active = path == `/${this.lang}${item.path}`
        return item
      })
    },
    delPhoneNum(item){
      console.log(item);
      this.$axios.post("/api/explorer/del_warn_mobile",{
        id:item.value
      }).then(res=>{
        console.log(res);
        if(res.code == 0){
          this.acitvePhoneIndex = 0
          this.acitvePhone = this.defaultID
          this.acitveLable = this.defaultMobile
          this.getPhoneList()
          this.$bus.$emit('nodeMonitoring_addPhoneOk')
        }
      })
    },
    getPhoneList(){
      this.$axios.post("/api/explorer/get_warn_mobile").then(res=>{
        if(res.code !== 0){
          this.get_warn_mobile = [
            {id:'',miner_monitors:[],mobile:''}
          ]
          return
        } 
        this.phoneList = []
        this.get_warn_mobile = []
        this.acitvePhone = res.data[0].id
        this.get_warn_mobile = res.data
        res.data.map(i=>{
          this.phoneList.push({value:i.id,label:i.mobile})
        })
      })
    },
    selectStatTimehandler: function (item,index) {
      console.log(item);
      console.log(this.phoneList);
      if (this.acitvePhone == item.value) return;
      this.acitvePhone = item.value;
      this.acitveLable = item.label
      this.addFlag = false
      this.acitvePhoneIndex = index
    },
    nodeOk() {
      if(this.nodeMsgPhone.newPhone == ''){
        this.nodeMsgPhoneError = 'Lang.Please enter new phone number'
        return
      }
      if (!/^([1-9]\d*|0)(\.\d{1,})?$/.test(this.nodeMsgPhone.newPhone)) {
        this.nodeMsgPhoneError = 'Lang.The phone number can only be a number'
        return;
      }
      if(this.nodeMsgPhone.verification == ''){
        this.nodeMsgPhoneError = 'Lang.Please enter the phone verification code'
        return;
      }
      this.$axios.post("/api/explorer/set_warn_mobile",{
        id:this.acitvePhone,
        mobile:this.nodeMsgPhone.newPhone,
        verification_code:this.nodeMsgPhone.verification,
        prefix:'86'
      }).then(res=>{
        if(res.code !== 0){
          if(res.code == 15000){
            this.nodeMsgPhoneError = 'Lang.Verification code error'
          }
          if(res.code == 16006){
            this.nodeMsgPhoneError = 'Lang.Mobile number already exists'
          }
          return
        }
        if (this.lang == "zh") {
          this.$notification.success({
            title: "成功",
            message: "修改成功",
          });
        } else if (this.lang == "en") {
          this.$notification.success({
            title: "Success",
            message: "Modified successfully",
          });
        } else if (this.lang == "ja") {
          this.$notification.success({
            title: "成功",
            message: "修正成功",
          });
        } else {
          this.$notification.success({
            title: "성공",
            message: "수정 성공",
          });
        }
        this.getNodePhone()
        this.nodeMsgPhone.newPhone = ''
        this.nodeMsgPhone.verification = ''
        this.acitveLable = this.defaultMobile
        this.acitvePhoneIndex = 0
        this.acitvePhone = this.defaultID
        this.$bus.$emit('nodeMonitoring_addPhoneOk')


      })
    },
    addOk(){
      if(this.nodeMsgPhone.newPhone == ''){
        this.nodeMsgPhoneError = 'Lang.Please enter new phone number'
        return
      }
      if (!/^([1-9]\d*|0)(\.\d{1,})?$/.test(this.nodeMsgPhone.newPhone)) {
        this.nodeMsgPhoneError = 'Lang.The phone number can only be a number'
        return;
      }
      if(this.nodeMsgPhone.verification == ''){
        this.nodeMsgPhoneError = 'Lang.Please enter the phone verification code'
        return;
      }
      this.$axios.post("/api/explorer/add_warn_mobile",{
        mobile:this.nodeMsgPhone.newPhone,
        verification_code:this.nodeMsgPhone.verification,
        prefix:'86'
      }).then(res=>{
        if(res.code !== 0){
          if(res.code == 15000){
            this.nodeMsgPhoneError = 'Lang.Verification code error'
          }
          if(res.code == 16006){
            this.nodeMsgPhoneError = 'Lang.Mobile number already exists'
          }
          return
        }
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
        this.addFlag = false
        this.getNodePhone()
        this.nodeMsgPhone.newPhone = ''
        this.nodeMsgPhone.verification = ''

        this.acitveLable = this.defaultMobile

        this.acitvePhoneIndex = 0
        this.acitvePhone = this.defaultID

        this.$bus.$emit('nodeMonitoring_addPhoneOk')
      })
    },
    getNodePhone(){
      this.phoneList = []
      this.$axios.post("/api/explorer/get_warn_mobile").then(res=>{
        this.acitvePhone = res.data[0].id
        this.get_warn_mobile = res.data
        res.data.map(i=>{
          this.phoneList.push({value:i.id,label:i.mobile})
        })
      })
    },
    inputFocus() {
      this.nodeMsgPhoneError = ''
    },
    addPhone(){
      this.acitvePhone = ''
      this.addFlag = true
      this.acitveLable = ''
    },
    getNodeVerification(){
      if (this.nodeMsgPhone.newPhone == "") {
        this.nodeMsgPhoneError = "Lang.Phone number cannot be empty";
        return;
      }
      if (!/^([1-9]\d*|0)(\.\d{1,})?$/.test(this.nodeMsgPhone.newPhone)) {
        this.nodeMsgPhoneError = "Lang.The phone number can only be a number";
        return;
      }

      this.$axios
        .post("/api/explorer/get_change_mobile_vercode", {
          mobile: this.nodeMsgPhone.newPhone,
          mobile_prefix: "86",
          pro: "explorer",
        })
        .then((res) => {
          if (res.code !== 0) {
            if(res.code == 15000){
              this.refreshImgHandler()
              this.errorMsg = 'Lang.Frequent verification codes, please try again later'
            }
            return;
          }
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
        });
    },
    getHeight() {
      if (document.body.clientWidth < 768) {
        this.dialogWidthNode = '90%'
      } else {
        this.dialogWidthNode = '700px'
      }
    },
  },
};
</script>

<style lang="scss" >
.el-message-box {
  width: 60vw;
}
.el-dialog__body {
  padding-top: 10px;
}
@media (min-width: 768px) {
  .el-dialog__body {
    padding-top: 10px;
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
.el-input-group__append,
.el-input-group__prepend {
  color: #5c65d1;
}

.is-disabled {
  color: #ccc !important;
}
.personalCenter {
  .el-input-group__append {
    padding-left: 12px !important;
    padding-right: 12px !important;
    width: 20%!important;
    text-align: center;
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
// .personalCenter .el-input-group__append {
//   padding: 8px;
//   // width: 90px;
//   // height: 4rem;
// }
.myRounded {
  border-radius: 4px;
}

.active {
  color: #fff;
  background-color: #333fc6ee;
}
</style>