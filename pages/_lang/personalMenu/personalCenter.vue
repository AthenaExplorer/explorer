<template>
 <div class='personalCenter mb-3'>
    <p class='hidden lg:block text-2xl mb-3'>{{$t('Lang.Personal Center')}}</p>
    <div class='bg-white w-full lg:mb-10 mb-0 px-3 rounded-md'>
      <div class='flex border-b border-solid border-E8E7EB py-4 lg:py-10'>
        <div class='flex-1 flex item-center'>
          <img src="../../../assets/imgs/personalMenuMine.png" alt="" style='width:40px;height:40px' class='m-auto'>
        </div>
        <div class='lg:w-3/4 w-1/2'>
          <div class='lg:hidden block flex mb-2 text-lg'>
            <div>
              {{user_info.username | getSubStr}} 
            </div>
            <div v-show="IsProActive">
              <img v-if="lang == 'zh' " src="@/assets/imgs/personalMenuPro-zh.png" alt="" style='height:22px' class='ml-4 -mt-2'>
              <img v-if="lang == 'en' " src="@/assets/imgs/personalMenuPro-en.png" alt="" style='height:22px' class='ml-4 -mt-2'>
              <img v-if="lang == 'ko' " src="@/assets/imgs/personalMenuPro-ko.png" alt="" style='height:22px' class='ml-4 -mt-2'>
              <img v-if="lang == 'ja' " src="@/assets/imgs/personalMenuPro-ja.png" alt="" style='height:22px' class='ml-4 -mt-2'>
            </div>
          </div>
          <div class='lg:flex hidden   mb-2 text-lg'>
            <div>
              {{user_info.username}} 
            </div>
            <div v-show="IsProActive">
              <img v-if="lang == 'zh' " src="@/assets/imgs/personalMenuPro-zh.png" alt="" style='height:26px' class='ml-4 -mt-2'>
              <img v-if="lang == 'en' " src="@/assets/imgs/personalMenuPro-en.png" alt="" style='height:26px' class='ml-4 -mt-2'>
              <img v-if="lang == 'ko' " src="@/assets/imgs/personalMenuPro-ko.png" alt="" style='height:26px' class='ml-4 -mt-2'>
              <img v-if="lang == 'ja' " src="@/assets/imgs/personalMenuPro-ja.png" alt="" style='height:26px' class='ml-4 -mt-2'>
            </div>
        </div>
          <p style='color:rgba(132, 133, 153, 1)'>UID:{{user_info.user_id}}</p>
            
          <p style='color:rgba(132, 133, 153, 1)' v-show="IsProActive">
            {{$t('Lang.Validity of Pro')}} : 
            <span v-if="user_pro_info.expire_time">{{user_pro_info.expire_time | getTime}}</span>
            <span v-else>{{$t('Lang.Permanent member')}}</span>
            
          </p>
        </div>
        <div class='flex-1 lg:mr-10 mr-4 flex items-center'>
          <div></div>
        </div>
      </div>
      <div class='flex border-b border-solid border-E8E7EB py-10'>
        <div class='flex-1'>
          <img src="../../../assets/imgs/personalMenuPhone.png" alt="" style='width:40px;height:40px' class='m-auto'>
        </div>
        <div class='lg:w-3/4 w-1/2'>
          <p class='mb-2 text-lg'>{{$t('Lang.Phone')}}</p>
          <p style='color:rgba(132, 133, 153, 1)'>{{$t('Lang.Used to log in, forget the password, modify the password')}}</p>
        </div>
        <div class='flex-1 flex items-center justify-end lg:mr-10 mr-4'>
          <div @click='phoneFlag = true'
            class='cursor-pointer text-center py-1 px-4 text-lg border border-solid myRounded font-medium text-main border-main'>
            {{$t('Lang.Change phone')}}
          </div>
        </div>
      </div>
      <div class='flex border-b border-solid border-E8E7EB py-10'>
        <div class='flex-1'>
          <img src="../../../assets/imgs/personalMenuPas.png" alt="" style='width:40px;height:40px' class='m-auto'>
        </div>
        <div class='lg:w-3/4 w-1/2'>
          <p class='mb-2'>{{$t('Lang.Password_1')}}</p>
          <p style='color:rgba(132, 133, 153, 1)'>{{$t('Lang.Used to protect account security')}}</p>
        </div>
        <div class='flex-1 flex items-center justify-end lg:mr-10 mr-4'>
          <div @click='passwordFlag = true'
            class='cursor-pointer text-center py-1 px-4 text-lg border border-solid myRounded font-medium text-main border-main'>
            {{$t('Lang.Change Password')}}
          </div>
        </div>
      </div>
      <div class='flex py-10'>
        <div class='flex-1 flex item-center'>
          <img src="../../../assets/imgs/administration.png" alt="" style='width:40px;height:40px' class='m-auto'>
        </div>
        <div class='lg:w-3/4 w-1/2'>
          <p class='mb-2 text-lg'>{{$t('Lang.Node monitoring management')}}</p>
          <p style='color:rgba(132, 133, 153, 1)' class='pr-6'>{{$t('Lang.Used to quickly change the node monitoring mobile phone number')}}</p>
        </div>
        <div v-show="!IsProActive" class='flex-1 flex items-center justify-end lg:mr-10 mr-4'>
            <el-popover trigger="hover" :content="$t('Lang.This feature is a professional version feature, you need to upgrade to the professional version before you can use it')">
                <div @click='nodeManagement'
                slot="reference"
                    style='color:#ccc;border-color:#ccc'
                    class='text-lg cursor-pointer text-center py-1 px-4 text-lg border border-solid myRounded font-medium text-main border-main'>
                    {{$t('Lang.Management node')}}
                </div>
            </el-popover>
        </div>
        <div v-show="IsProActive" class='flex-1 flex items-center justify-end lg:mr-10 mr-4'>
          <div @click='nodeManagement'
            class='cursor-pointer text-center py-1 px-4 text-lg border border-solid myRounded font-medium text-main border-main'>
            {{$t('Lang.Management node')}}
          </div>
        </div>
      </div>
    </div>

    <el-dialog
      :title="$t('Lang.Change phone')"
      :visible.sync="phoneFlag"
      :width="dialogWidth"
      :before-close="handleClose"
      :close-on-click-modal="false">

      <el-form label-position="top" label-width="80px" ref="phoneForm"  size="mini" :model="phoneForm" :rules="phoneRules">
        <el-form-item :label="$t('Lang.New phone number')" prop="newPhone">
          <el-input @focus='inputFocus' clearable v-model="phoneForm.newPhone" class="login-el-input" :placeholder="$t('Lang.Please enter phone number')">
            <el-select v-model="area" slot="prepend" :placeholder="$t('Lang.Please Select')">
              <el-option label="+86" value="1"></el-option>
            </el-select>
          </el-input>
        </el-form-item>

        <el-form-item :label="$t('Lang.Phone verification code')" prop="verification">
          <el-input @focus='inputFocus' clearable :placeholder="$t('Lang.Please enter verification code')"  v-model="phoneForm.verification" class="login-el-input">
            <el-button slot="append" :disabled='verificationFlag' @click='getVerification'>{{$t(verificationText)}}</el-button>
          </el-input>
        </el-form-item>
      </el-form>
      <p class='h-6 text-base' style='top:-20px;left:0;color:rgba(230, 62, 62, 1)'>{{$t(phoneFormError)}}</p>


      <span slot="footer" class="dialog-footer">
        <el-button @click="phoneFlag = false">{{$t('Lang.Cancel')}}</el-button>
        <el-button type="primary" @click="phoneOk('phoneForm')" :disabled='phoneLoding'>
          <p v-show="!phoneLoding">{{$t('Lang.Submit')}}</p>
          <p v-show="phoneLoding"><i class="el-icon-loading"></i></p>
        </el-button>
      </span>
    </el-dialog>

    <el-dialog
      :title="$t('Lang.Change Password')"
      :visible.sync="passwordFlag"
      :width="dialogWidth"
      :before-close="handleClose"
      :close-on-click-modal="false">

      <el-form label-position="top" label-width="80px" ref="passwordForm"  size="mini" :model="passwordForm" :rules="passwordRules">
        <el-form-item :label="$t('Lang.Phone verification code')" prop="verification_code">
          <el-input style='position:fixed;top:-9999px'></el-input>
          <el-input style='position:fixed;top:-9999px' type="password"></el-input>
          <el-input :placeholder="$t('Lang.Please enter the phone verification code')"  v-model="passwordForm.verification_code" class="login-el-input" clearable>
            <el-button slot="append" :disabled='passwordVerificationFlag' @click='passwordGetVerification'>{{$t(passwordverificationText)}}</el-button>
          </el-input>
        </el-form-item>

        <el-form-item :label="$t('Lang.New Password')" prop="new_password_1">
          <el-input @focus='inputFocus' clearable v-model="passwordForm.new_password_1" class="login-el-input" :placeholder="$t('Lang.Please enter a new password')" type="password" show-password clearable></el-input>
        </el-form-item>

        <el-form-item :label="$t('Lang.Confirm password')" prop="new_password_2">
          <el-input @focus='inputFocus' clearable v-model="passwordForm.new_password_2" class="login-el-input" :placeholder="$t('Lang.Please confirm the password')" type="password" show-password clearable></el-input>
        </el-form-item>
      </el-form>
      <p class='h-6 text-base' style='top:-20px;left:0;color:rgba(230, 62, 62, 1)'>{{$t(errorMsg)}}</p>

      <span slot="footer" class="dialog-footer">
        <el-button @click="passwordFlag = false">{{$t('Lang.Cancel')}}</el-button>
        <el-button type="primary" @click="passwordOk" :disabled='passwordLoding'>
          <p v-show="!passwordLoding">{{$t('Lang.Submit')}}</p>
          <p v-show="passwordLoding"><i class="el-icon-loading"></i></p>
        </el-button>
      </span>
    </el-dialog>

    <el-dialog
      :title="$t('Lang.Node monitoring management')"
      :visible.sync="nodeFlag"
      :width="dialogWidthNode"
      :before-close="handleClose"
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

      <div class='mt-6'  v-show="acitveLable !== defaultMobile">
        <el-form label-position="top" label-width="80px" ref="nodeMsgPhone"  size="mini" :model="nodeMsgPhone" :rules="nodeMsgPhoneRules">
          <el-form-item :label="$t('Lang.New phone number')" prop="newPhone">
            <el-input @focus='inputFocus' clearable v-model="nodeMsgPhone.newPhone" class="login-el-input" :placeholder="$t('Lang.Please enter phone number')">
              <el-select v-model="area" slot="prepend" :placeholder="$t('Lang.Please Select')">
                <el-option label="+86" value="1"></el-option>
              </el-select>
            </el-input>
          </el-form-item>

          <el-form-item :label="$t('Lang.Phone verification code')" prop="verification">
            <el-input @focus='inputFocus' clearable :placeholder="$t('Lang.Please enter verification code')"  v-model="nodeMsgPhone.verification" class="login-el-input">
              <el-button slot="append" :disabled='verificationFlag' @click='getNodeVerification'>{{$t(verificationText)}}</el-button>
            </el-input>
          </el-form-item>
        </el-form>

      </div>
      <p class='h-6 text-base' style='top:-20px;left:0;color:rgba(230, 62, 62, 1)'>{{$t(nodeMsgPhoneError)}}</p>
      <div  v-show="acitveLable !== defaultMobile">
        <p v-show="!addFlag" class='text-base' style='color:#aaa'>{{$t('Lang.After replacement, all monitored reminder phone numbers under the current phone number will become your newly entered phone number')}}</p>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="nodeFlag = false">{{$t('Lang.Cancel')}}</el-button>
        <el-button class='h-full' type="primary" @click="nodeOk" v-show="!addFlag && acitveLable !== defaultMobile" >{{$t('Lang.Substitute')}}</el-button>
        <el-button class='h-full' type="primary" @click="addOk" v-show="addFlag">{{$t('Lang.Add')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  asyncData({ app, redirect }) {
    let data = {
      user_info:{},
      acitvePhone:'',
      acitvePhoneIndex:0,
      phoneList:[],
      get_warn_mobile:[]
    }
    return app.$axios.post("/api/explorer/get_user_info").then((res) => {
      if (res.code == 99905) {
        redirect(`/${res.data}/account`);
      }else{
        data.user_info = res.data
        return app.$axios.post("/api/explorer/get_warn_mobile")
      }
    }).then(res=>{
        if(res.code !== 0){
          data.get_warn_mobile = [
            {id:'',miner_monitors:[],mobile:''}
          ]
          return data
        } 
        data.acitvePhone = res.data[0].id
        data.get_warn_mobile = res.data
        res.data.map(i=>{
          data.phoneList.push({value:i.id,label:i.mobile})
        })

        return data
      })
  },
  data() {
    return {
      addFlag:false,
      lang: this.$store.state.locale,
      area: "1",
      user_info: {},
      user_pro_info:{},
      phoneFlag: false,
      phoneForm: {
        newPhone: "",
        verification: "",
      },
      phoneLoding: false,
      phoneRules: {
        newPhone: [{ required: true, message: " ", trigger: "blur" }],
        verification: [{ required: true, message: " ", trigger: "blur" }],
      },
      phoneFormError: "",
      dialogWidth: "30%",
      dialogWidthNode:'',
      verificationFlag: false,
      verificationText: "Lang.Get verification code",
      passwordFlag: false,
      passwordLoding: false,
      passwordForm: {
        new_password_1: "",
        new_password_2: "",
        verification_code: "",
      },
      passwordVerificationFlag: false,
      passwordverificationText: "Lang.Get verification code",
      passwordRules: {
        old_password: [{ required: true, message: " ", trigger: "blur" }],
        new_password_1: [{ required: true, message: " ", trigger: "blur" }],
        new_password_2: [{ required: true, message: " ", trigger: "blur" }],
        verification_code: [{ required: true, message: " ", trigger: "blur" }],
      },
      nodeFlag: false,
      acitvePhone: "",
      acitvePhoneIndex: 0,
      phoneList: [],
      newPhone: "",
      errorMsg: "",
      nodeMsgPhone:{
        newPhone:'',
        verification:''
      },
      nodeMsgPhoneRules: {
        newPhone: [{ required: true, message: " ", trigger: "blur" }],
        verification: [{ required: true, message: " ", trigger: "blur" }],
      },
      get_warn_mobile:[],
      nodeMsgPhoneError:'',
      IsProActive:false,
      defaultMobile:'',
      acitveLable:'',
      defaultID:''
    };
  },
  filters:{
    getTime(item){
      return item.split(' ')[0]
    }
  },
  beforeMount() {
    window.addEventListener("resize", this.getHeight);
    this.getHeight();

  },
  mounted() {
    this.$axios
      .post("/api/explorer/get_pro_user_info",{
        token: this.user_info.token
      })
      .then((res) => {
        if (res.code !== 0) {
        this.IsProActive = false
          return;
        }
        this.IsProActive = true
        this.user_pro_info = res.data
      })
      if(localStorage.getItem('user')){
        this.defaultMobile = this.acitveLable =  JSON.parse(localStorage.getItem('user')).mobile
        this.phoneList.map(i=>{
          if(i.label == this.defaultMobile){
            this.defaultID = i.value
          }
        })
      }
      


  },
  computed:{
    ...mapGetters({
      ProUserList: "getProUserList"
    }),
  },
  methods: {
    handleClose(done) {
      done();
    },
    getVerification() {
      if (this.phoneForm.newPhone == "") {
        this.phoneFormError = "Lang.Phone number cannot be empty";
        return;
      }
      if (!/^([1-9]\d*|0)(\.\d{1,})?$/.test(this.phoneForm.newPhone)) {
        this.phoneFormError = "Lang.The phone number can only be a number";
        return;
      }

      this.$axios
        .post("/api/explorer/get_set_mobile_vercode", {
          mobile: this.phoneForm.newPhone,
          mobile_prefix: "86",
          pro: "explorer",
        })
        .then((res) => {
          if (res.code !== 0) {
            this.phoneFormError = res.msg;
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
    phoneOk() {
      if (this.phoneForm.newPhone == "") {
        this.phoneFormError = "Lang.Please enter new phone number";
        return;
      }
      if (!/^([1-9]\d*|0)(\.\d{1,})?$/.test(this.phoneForm.newPhone)) {
        this.phoneFormError = "Lang.The phone number can only be a number";
        return;
      }
      if (this.phoneForm.verification == "") {
        this.phoneFormError = "Lang.Please enter verification code";
        return;
      }
      if (!/^([1-9]\d*|0)(\.\d{1,})?$/.test(this.phoneForm.verification)) {
        this.phoneFormError = "Lang.The verification code can only be a number";
        return;
      }
      this.phoneLoding = true;
      this.$axios
        .post("/api/explorer/set_mobile", {
          mobile: this.phoneForm.newPhone,
          verification_code: this.phoneForm.verification,
          mobile_prefix: "86",
        })
        .then((res) => {
          this.phoneLoding = false;
          if (res.code !== 0) {
            if (res.code == 15000) {
              this.phoneFormError = "Lang.Verification code error";
            }
            return;
          }
          if (this.lang == "zh") {
            this.$notification.success({
              title: "成功",
              message: "修改成功，请重新登录 ",
            });
          } else if (this.lang == "en") {
            this.$notification.success({
              title: "Success",
              message: "Success, Please log in again",
            });
          } else if (this.lang == "ja") {
            this.$notification.success({
              title: "成功",
              message: "成功しました。もう一度ログインしてください",
            });
          } else {
            this.$notification.success({
              title: "성공",
              message: "성공, 다시 로그인하십시오",
            });
          }
          this.$router.push(`/${this.lang}/signOut`);
        });
    },
    passwordGetVerification() {
      this.$axios
        .post("/api/explorer/get_change_password_vercode", {
          pro: "explorer",
        })
        .then((res) => {
          if (res.code !== 0) {
            if (res.code == 11009) {
              this.errorMsg =
                "Lang.Frequent verification codes, please try again later";
            }
          }
          this.passwordVerificationFlag = true;
          let time = 30;
          let timer = setInterval(() => {
            time -= 1;
            this.passwordverificationText = "Lang." + time + "s";
            if (time == 0) {
              this.passwordVerificationFlag = false;
              this.passwordverificationText = "Lang.Get verification code";
              clearInterval(timer);
            }
          }, 1000);
        });
    },
    passwordOk() {
      if (this.passwordForm.verification_code == "") {
        this.errorMsg = "Lang.Please enter the phone verification code";
        return;
      }
      if (this.passwordForm.new_password_1 == "") {
        this.errorMsg = "Lang.Please enter a new password";
        return;
      }
      if (
        this.passwordForm.new_password_1.length < 8 ||
        this.passwordForm.new_password_1.length > 16
      ) {
        this.errorMsg = "Lang.Please enter 8-16 digits password";
        return;
      }
      if (this.passwordForm.new_password_2 == "") {
        this.errorMsg = "Lang.Please enter the password again";
        return;
      }
      if (
        this.passwordForm.new_password_1 !== this.passwordForm.new_password_2
      ) {
        this.errorMsg = "Lang.The password was entered incorrectly twice";
        return;
      }
      if (this.passwordForm.new_password_1 == this.passwordForm.old_password) {
        this.errorMsg =
          "Lang.The new password is the same as the original password";
        return;
      }

      this.passwordLoding = true;

      this.$axios
        .post("/api/explorer/change_password", this.passwordForm)
        .then((res) => {
          this.passwordLoding = false;
          if (res.code !== 0) {
            if (res.code == 11008) {
              this.errorMsg = "Lang.The original password is wrong";
            }
            return;
          }
          if (this.lang == "zh") {
            this.$notification.success({
              title: "成功",
              message: "修改成功，请重新登录 ",
            });
          } else if (this.lang == "en") {
            this.$notification.success({
              title: "Success",
              message: "Success, Please log in again",
            });
          } else if (this.lang == "ja") {
            this.$notification.success({
              title: "成功",
              message: "成功しました。もう一度ログインしてください",
            });
          } else {
            this.$notification.success({
              title: "성공",
              message: "성공, 다시 로그인하십시오",
            });
          }
          this.$router.push(`/${this.lang}/signOut`);
        });
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
    nodeManagement() {
      if (!this.IsProActive) {
        return;
      }
      this.addFlag = false
      this.acitvePhone = this.phoneList[0].value
      this.nodeFlag = true;
      this.nodeMsgPhoneError = ''
      this.nodeMsgPhone.newPhone = ''
      this.nodeMsgPhone.verification = ''
      this.acitvePhoneIndex = 0
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
        this.nodeFlag = false;

      })
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
        this.nodeMsgPhone.newPhone = ''
        this.nodeMsgPhone.verification = ''

        this.acitveLable = this.defaultMobile

        this.acitvePhoneIndex = 0
        this.acitvePhone = this.defaultID
        this.getPhoneList()
      })
    },
    selectStatTimehandler: function (item,index) {
      if (this.acitvePhone == item.value) return;
      this.acitvePhone = item.value;
      this.newPhone = item.value;
      this.addFlag = false
      this.acitvePhoneIndex = index
      this.acitveLable = item.label

      
    },
    getHeight() {
      if (document.body.clientWidth < 768) {
        this.dialogWidth = "90%";
        this.dialogWidthNode = '90%'
      } else {
        this.dialogWidth = "550px";
        this.dialogWidthNode = '700px'
      }
    },
    inputFocus() {
      this.errorMsg = "";
      this.phoneFormError = "";
      this.nodeMsgPhoneError = ''
    },
    addPhone(){
      this.acitvePhone = ''
      this.addFlag = true
      this.acitveLable = ''

    },
    goIndex(){
      this.$router.push(`/${this.lang}/`)
    },
    delPhoneNum(item){
      this.$axios.post("/api/explorer/del_warn_mobile",{
        id:item.value
      }).then(res=>{
        console.log(res);
        this.acitvePhoneIndex = 0
        this.acitvePhone = this.defaultID
        this.acitveLable = this.defaultMobile
        this.getPhoneList()
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
  },
  destroyed() {
    window.removeEventListener("resize", this.getHeight);
  },
};
</script>

<style lang="scss">
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
    width: 20%;
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