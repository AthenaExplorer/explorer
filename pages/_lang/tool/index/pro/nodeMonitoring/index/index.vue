<template>
  <div class='relative'>
    <div class='lg:block hidden absolute lg:pr-6' style='right:40px;top:-46px'>
      <el-button class='h-10' size="mini" type="primary"  plain @click='addNode'>{{$t('Lang.Add miner')}}</el-button>
    </div>
    <div class='lg:hidden block   lg:pr-6' style=''>
      <el-button class='h-10' size="mini" type="primary"  plain @click='addNode'>{{$t('Lang.Add miner')}}</el-button>
    </div>
    <div v-show='rawPowerList.length !== 0'>
      <div class='lg:block hidden'>
        <table class="table-fixed w-full">
          <thead>
          <tr class="">
            <th class="w-12 py-4 font-medium ">{{$t('Lang.Serial number')}}</th>
            <th class="w-1/12 py-4 font-medium">{{$t('Lang.Node')}}</th>
            <th class="w-1/12 py-4 font-medium" v-if="tagShowFlag">{{$t('Lang.Tag')}}</th>
            <th class="w-1/12 py-4 font-medium mr-4">{{$t('Lang.Remarks')}}</th>
            <th class="w-16 py-4 font-medium mr-4">{{$t('Lang.Reference')}}</th>
            <th class="w-16 py-4 font-medium mr-4">{{$t('Lang.Actual cost')}}</th>
            <th class="w-16 py-4 font-medium mr-4">
              {{$t('Lang.Early warning threshold')}}
              <el-popover trigger="hover" :content="$t('Lang.That is the monitoring target value can be set by the user independently When the actual operating value exceeds this value you will get a reminder')">
                <i class="el-icon-info cursor-pointer text-gray-500 text-base" slot="reference"></i>
              </el-popover>
            </th>
            <th class="w-16 py-4 font-medium mr-4">{{$t('Lang.Remind phone number')}}</th>
            <th class="w-16 py-4 font-medium mr-4">{{$t('Lang.Operating')}}</th>

          </tr>
          </thead>
          <tbody>
          <tr v-for="(item, index) in rawPowerList" class="border-t border-solid border-E8E7EB" :key="index + '_index'">
            <td class="w-1/12 py-3 text-center truncate  h-16">
                <span>{{index+1}}</span>
            </td>
            <td class="w-1/12 py-3 text-center">
              <n-link :to="`/${lang}/chain/addr/${item.miner_no}`" class='text-main cursor-pointer hover:opacity-75'>{{item.miner_no}}</n-link>
            </td>
            <td class="w-1/12 py-3 text-center" v-if="tagShowFlag">
                <div class="flex items-center justify-center truncate">
                <template v-if="globalMinerTag[item.miner_no]">
                    <span class="truncate">{{ globalMinerTag[item.miner_no].en_tag }}</span>
                    <img v-show="globalMinerTag[item.miner_no].signed" src="@/assets/imgs/isSigned.png"  alt="" class='ml-2'  style='width:12px; height:12px'>
                </template>
                <span v-else>-</span>
                </div>
            </td>
            
            <td class="w-1/12 py-3 px-2 text-center truncate" >
              <el-popover
                placement="bottom"
                trigger="hover"
                :content="item.remarks">
                <span slot="reference" v-if="item.remarks !== ''">{{item.remarks}}</span>
              </el-popover>
              <span v-if="item.remarks == ''">-</span>
            </td>

             <td class="w-1/12 py-3 text-center truncate" >
              <p>{{(Number(item.miner_value_overview) + Number(item.overview_pledge)).toFixed(4)}} F/TiB
                <el-popover trigger="hover">
                  <p>{{$t('Lang.Single T pledge reference value')}}：{{item.overview_pledge}} F/TiB</p>
                  <p>{{item.sector_size}} {{$t('Lang.64Gib Production Gas Reference')}}：{{item.miner_value_overview}} F/TiB</p>
                  <i class="el-icon-info cursor-pointer text-gray-500 text-base" slot="reference"></i>
                </el-popover>
              </p>
            </td>

            <td class="w-1/12 py-3 text-center truncate" >
              <p>{{(Number(item.miner_value) + Number(item.overview_pledge)).toFixed(4)}} F/TiB
                <el-popover trigger="hover">
                  <p>{{$t('Lang.Actual single T pledge')}}：{{item.overview_pledge}} F/TiB</p>
                  <p> {{$t('Lang.Actual')}} {{item.sector_size}} {{$t('Lang.Gas used')}} ：{{item.miner_value}} F/TiB</p>
                  <i class="el-icon-info cursor-pointer text-gray-500 text-base" slot="reference"></i>
                </el-popover>
              </p>
            </td>

            <td class="w-1/12 py-3 text-center truncate" >
              {{$t('Lang.Above reference value')}} {{Number(item.value*100).toFixed(0)}}%
            </td>

            <td class="w-1/12 py-3 text-center truncate" >
              <p v-for="p in item.warn_mobiles" :key="p.mobile+index">{{p.mobile}}</p>
            </td>

            <td class='mr-4 text-center'>
                <span class='text-main cursor-pointer opacity-75 hover:opacity-100' @click='edit(item)'>{{$t('Lang.Edit')}}</span>
                <span class='text-main cursor-pointer opacity-75 hover:opacity-100 mr-2' @click='del(item)'>{{$t('Lang.Delete')}}</span>
            </td>
          </tr>
          </tbody>
        </table>
          
      </div>
      <div class='lg:hidden block mt-3'>
        <div v-for="(item, index) in rawPowerList" class="p-3 border border-solid border-E8E7EB rounded-md mb-3" :key="index + '_index'">
          <div class="flex items-center justify-between">
            <span class="flex-1">{{$t('Lang.Serial number')}}</span>
            <div class="w-1/2 text-right truncate">
              <span>{{index+1}}</span>
            </div>
          </div>
          <div class="flex items-center justify-between">
            <span class="flex-1">{{$t('Lang.Miner')}}</span>
            <div class="w-1/2 text-right truncate">
              <n-link :to="`/${lang}/chain/addr/${item.miner_no}`" class='text-main cursor-pointer hover:opacity-75'>{{item.miner_no}}</n-link>
            </div>
          </div>
          <div class="flex items-center justify-between" v-if="tagShowFlag">
            <span class="flex-1">{{$t('Lang.Tag')}}</span>
            <div class="w-1/2 text-right truncate">
              <div class="flex items-center justify-end truncate">
                <template v-if="globalMinerTag[item.miner_no]">
                    <span class="truncate">{{ globalMinerTag[item.miner_no].en_tag }}</span>
                    <img v-show="globalMinerTag[item.miner_no].signed" src="@/assets/imgs/isSigned.png"  alt="" class='ml-2'  style='width:12px; height:12px'>
                </template>
                <span v-else>-</span>
                </div>
            </div>
          </div>
          <div class="flex items-center justify-between">
            <span class="flex-1">{{$t('Lang.Remarks')}}</span>
            <div class="w-1/2 text-right truncate">
              <span v-if="item.remarks !== ''">{{item.remarks}}</span>
              <span v-else>-</span>
            </div>
          </div>
          <div class="flex items-center justify-between">
            <span class="flex-1">{{$t('Lang.Reference')}}</span>
            <div class="w-1/2 text-right truncate">
              <span>{{(Number(item.miner_value_overview) + Number(item.overview_pledge)).toFixed(4)}} F/TiB</span>
            </div>
          </div>
          <div class="flex items-center justify-between">
            <span class="flex-1">{{$t('Lang.Actual cost')}}</span>
            <div class="w-1/2 text-right truncate">
              <span>{{(Number(item.miner_value) + Number(item.overview_pledge)).toFixed(4)}} F/TiB</span>
            </div>
          </div>
          <div class="flex items-center justify-between">
            <span class="flex-1">{{$t('Lang.Early warning threshold')}}
              <el-popover trigger="hover" :content="$t('Lang.That is the monitoring target value can be set by the user independently When the actual operating value exceeds this value you will get a reminder')">
                <i class="el-icon-info cursor-pointer text-gray-500 text-base" slot="reference"></i>
              </el-popover>
            </span>
            <div class="w-1/2 text-right truncate">
              {{$t('Lang.Above reference value')}} {{Number(item.value*100).toFixed(0)}}%
            </div>
          </div>
          <div class="flex items-center justify-between">
            <span class="flex-1">{{$t('Lang.Remind phone number')}}</span>
            <div class="w-1/2 text-right truncate">
              <p v-for="p in item.warn_mobiles" :key="p.mobile+index">{{p.mobile}}</p>
            </div>
          </div>
          <div class="flex items-center justify-between">
            <span class="flex-1">{{$t('Lang.Operating')}}</span>
            <div class="w-1/2 text-right truncate">
              <span class='text-main cursor-pointer opacity-75 hover:opacity-100' @click='edit(item)'>{{$t('Lang.Edit')}}</span>
              <span class='text-main cursor-pointer opacity-75 hover:opacity-100 mr-2' @click='del(item)'>{{$t('Lang.Delete')}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <el-dialog
      :title="$t(title)"
      :visible.sync="dialogVisible"
      :width='dialogWidth'
      :close-on-click-modal="false">

      <el-form label-position="top" label-width="80px" ref="editForm"  size="mini" :model="editForm" :rules="editRules">
        <el-form-item :label="$t('Lang.Miner')" prop="miner_no">
          <el-input v-model="editForm.miner_no" @focus='clearErr' clearable :disabled='disabledFlag' :placeholder="$t('Lang.Please enter')"></el-input>
        </el-form-item>

        <el-form-item :label="$t('Lang.Remarks')">
          <el-input v-model="editForm.remarks"  clearable :placeholder="$t('Lang.Please enter')"></el-input>
        </el-form-item>

        <el-form-item :label="$t('Lang.Early warning threshold')" prop="value">
          <span>{{$t('Lang.Higher than')}}</span>
          <el-input-number v-model="editForm.value"  :min="0" :max="100" :step="1" class='mx-2'></el-input-number>
          <span>%</span>
        </el-form-item>

        <el-form-item :label="$t('Lang.Remind phone number')" prop="value">
          <el-select v-model="editForm.warn_mobile_ids" @focus='clearErr' multiple :placeholder="$t('Lang.Please Select')" class='w-full'>
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

      </el-form>
      <p class='h-6 text-base' style='top:-20px;left:0;color:rgba(230, 62, 62, 1)'>{{$t(formError)}}</p>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">{{$t('Lang.Cancel')}}</el-button>
        <el-button type="primary" @click="editOK" :disabled='Loding'>
          <p v-show="!Loding">{{$t('Lang.Submit')}}</p>
          <p v-show="Loding"><i class="el-icon-loading"></i></p>
        </el-button>
      </span>
    </el-dialog>

    <div v-show='rawPowerList.length == 0'  class='flex items-center justify-center' style='height:50vh'>
      <div class='text-center'>
        <img src="@/assets/imgs/noMsg.png" alt="" style='width:150px'>
        <p style='color:#5F6578' class='mb-10'>{{$t('Lang.No monitoring')}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import utils from "@/static/utils";

export default {
  data() {
    return {
      disabledFlag:false,
      objs: [],
      remarks:'',
      lang: this.$store.state.locale,
      title:'',
      rawPowerList:[],
      dialogWidth:'500px',
      dialogVisible:false,
      editForm:{
        miner_no:'',
        warn_method:'create_gas',
        remarks:'',
        value:20,
        warn_mobile_ids:[]
      },
      editRules:{
        miner_no: [{ required: true, message: " ", trigger: "blur" }],
        value: [{ required: true, message: " ", trigger: "blur" }],
      },
      options: [],
      Loding:false,
      formError:''
    };
  },
  asyncData({ app }) {
    let data = {
      user_info: {},
      rawPowerList: {},
      options:[]
    };
    return app.$axios
      .post("/api/explorer/get_miner_monitor", {
        warn_method: "create_gas",
      })
      .then((res) => {
        data.rawPowerList = res.data.objects;
        return app.$axios.post("/api/explorer/get_warn_mobile")
      }).then(res=>{
        if(!res || res.code != 0) return
        res.data.map(i=>{
          data.options.push({value:i.id,label:i.mobile})
        })
        return data
      })
  },
  computed: {
    ...mapGetters({
      globalMinerTag: "getGlobalMinerTag",
      globalOverview: "getGlobalOverview",
      tagShowFlag: 'getTagShowFlag'
    }),
  },
  beforeMount(){
    window.addEventListener("resize", this.getHeight);
    this.getHeight()

    this.$bus.$on('nodeMonitoring_addPhoneOk', ()=>{
      this.getPhoneList()
      this.getList()
    })
  },
  mounted(){
    this.$axios.post('/api/explorer/get_user_info').then(res=>{
      this.user_info = res.data
    })
  },
  methods: {
    clearErr(){
      this.formError = ''
    },
    getList(){
      this.$axios.post("/api/explorer/get_miner_monitor", {
        warn_method: "create_gas",
      }).then((res) => {
        this.rawPowerList = res.data.objects;
      })
    },
    del(item){
      this.$axios.post('/api/explorer/del_miner_monitor',{
        id:item.id,
      }).then(res=>{
        if(res.code != 0) return

        this.getList()
        this.$bus.$emit('nodeMonitoring_addNode')
        if(this.lang == 'zh'){
          this.$notification.success({
            title: '成功',
            message: '删除成功'
          })
        }else if(this.lang == 'en'){
          this.$notification.success({
            title: 'Success',
            message: 'Successfully deleted'
          })
        }else if(this.lang == 'ja'){
          this.$notification.success({
            title: '成功',
            message: '削除に成功しました'
          })
        }else{
          this.$notification.success({
            title: '성공',
            message: '성공적으로 삭제'
          })
        }
      })
    },
    edit(item){
      this.disabledFlag = true

      this.formError = ''
      this.title = 'Lang.Modify computing power cost monitoring'
      this.dialogVisible = true
      this.editForm.warn_mobile_ids = []

      this.editForm.miner_no = item.miner_no
      this.editForm.remarks = item.remarks
      this.editForm.value = Number(item.value*100).toFixed(0)
      item.warn_mobiles.map(i=>{
        this.editForm.warn_mobile_ids.push(i.id)
      })
    },
    editOK(){
      if(this.editForm.miner_no == '' || utils.trim(this.editForm.miner_no) == ''){
        this.formError = 'Lang.Node cannot be empty'
        return
      }

      if(this.editForm.warn_mobile_ids.length == 0){
        this.formError = 'Lang.Phone number cannot be empty'
        return
      }
      this.editForm.miner_no =  utils.trim(this.editForm.miner_no) 
      
      let lang_repeat = '',
        lang_errTitle = '';
      
      switch (this.lang) {
        case 'zh':
          lang_errTitle = '错误'
          lang_repeat = '已存在，请勿重复添加';
          break;
        case 'en':
          lang_errTitle = 'Error'
          lang_repeat = 'It already exists. Please do not add it repeatedly';
          break;
        case 'ko':
          lang_errTitle = '오류'
          lang_repeat = '이미 존재 하 므 로 중복 추가 하지 마 십시오';
          break;
        case 'ja':
          lang_errTitle = 'エラー'
          lang_repeat = '既に存在します。重複して追加しないでください。';
          break;
      }

      if(this.title == 'Lang.Add computing power cost monitoring node'){
        if(this.rawPowerList.length>0){
          for(let i = 0;i<this.rawPowerList.length;i++){
            if( utils.trim(this.rawPowerList[i].miner_no)  == this.editForm.miner_no){
              this.$notification.error({
                title: lang_errTitle,
                message: lang_repeat,
              });
              return
            }
          }
        }

      }
      this.$axios.post("/api/explorer/get_miner_index",{
        miner_no : this.editForm.miner_no
      }).then(res=>{
        if(res.code !== 0){
          this.formError='Lang.Node does not exist'
        }else{
          this.create_update_miner_monitor()
        }
      })
    },
    create_update_miner_monitor(){
      this.Loding = true

      this.$axios.post("/api/explorer/create_update_miner_monitor", 
        {
          miner_no:this.editForm.miner_no,
          remarks:this.editForm.remarks,
          warn_method:'create_gas',
          value	:this.editForm.value/100,
          warn_mobile_ids:JSON.stringify(this.editForm.warn_mobile_ids)
        }
      ).then(res=>{
        
        this.formError = ''
        this.Loding = false
        this.dialogVisible = false
        this.getList()
        this.$bus.$emit('nodeMonitoring_addNode')

        let lang_Text = '',
        lang_Title = '';

        if(this.title == 'Lang.Add computing power cost monitoring node'){
          switch (this.lang) {
            case 'zh':
              lang_Title = '成功'
              lang_Text = '添加成功';
              break;
            case 'en':
              lang_Title = 'Success'
              lang_Text = 'Added successfully';
              break;
            case 'ko':
              lang_Title = '성공'
              lang_Text = '추가 성공';
              break;
            case 'ja':
              lang_Title = '成功'
              lang_Text = '追加成功';
              break;
          }
        }else{
          switch (this.lang) {
            case 'zh':
              lang_Title = '成功'
              lang_Text = '修改成功';
              break;
            case 'en':
              lang_Title = 'Success'
              lang_Text = 'Modified successfully';
              break;
            case 'ko':
              lang_Title = '성공'
              lang_Text = '수정 성공';
              break;
            case 'ja':
              lang_Title = '成功'
              lang_Text = '修正成功';
              break;
          }
        }

        this.$notification.success({
          title: lang_Title,
          message: lang_Text,
        });
      })
    },
    addNode(){
      let lang_errTitle = '',
          lang_errMsg_Ten = '';

      switch (this.lang) {
        case 'zh':
          lang_errTitle = '错误'
          lang_errMsg_Ten = '最多监控10个存储供应商';
          break;
        case 'en':
          lang_errTitle = 'Error'
          lang_errMsg_Ten = 'Monitor up to 10 Storage Provider';
          break;
        case 'ko':
          lang_errTitle = '오류'
          lang_errMsg_Ten = '최대 10 개의 저장 공급자 모니터링';
          break;
        case 'ja':
          lang_errTitle = 'エラー'
          lang_errMsg_Ten = '最大10ストレージベンダーを監視';
          break;
      }
      if(this.rawPowerList.length>=10){
        this.$notification.error({
          title: lang_errTitle,
          message: lang_errMsg_Ten,
        });
        return
      }
      this.disabledFlag = false
      this.title = 'Lang.Add computing power cost monitoring node'
      this.editForm.miner_no = ''
      this.editForm.remarks = ''
      this.editForm.value = 20
      this.editForm.warn_mobile_ids = []
      this.formError = ''
      

      this.dialogVisible = true
    },
    getHeight() {
      if (document.body.clientWidth < 768) {
        this.dialogWidth = "90%";
      } else {
        this.dialogWidth = "500px";
      }
    },
    getPhoneList(){
      this.$axios.post("/api/explorer/get_warn_mobile")
      .then(res=>{
        if(!res || res.code != 0) return
        this.options = []
        res.data.map(i=>{
          this.options.push({value:i.id,label:i.mobile})
        })
      })
    }
  },
  destroyed() {
    window.removeEventListener("resize", this.getHeight);
  },
};
</script>

<style lang="scss" scoped>
</style>