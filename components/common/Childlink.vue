<template>
  <div>
    <div class="hidden lg:flex justify-start pt-5 border-b border-solid border-E6E6EA">
      <p class='block py-2 mx-3 text-lg rounded font-medium flex mr-10' v-show="routerTitle.title"><img :src="routerTitle.img" alt="" class='w-4 h-5 mr-3'>{{$t(routerTitle.title)}}</p>
      <p v-for="item in value" :key="item.path">
         <n-link class="text-6C757E block  pt-3 pb-4 mr-10 stext-xs font-medium hover:text-main hover:border-main"
         :class="{'child-link-active': item.active,'border-b-2':item.active,'border-solid':item.active,'border-E6E6EA':item.active}" :to="`/${lang}${item.path}`">{{ $t(item.title) }}</n-link>
      </p>
    </div>
    <div class='lg:hidden mb-4'>
      <p class='block pt-2 mr-3 text-lg rounded flex mr-10 text-xl' v-show="routerTitle.title">{{$t(routerTitle.title)}}</p>
      <div class="flex items-center">
        <div class='mybox1 flex mr-4 mt-2' id='parent'>
          <p v-for="(item,j) in value" :key="item.path" :id="'childred'+j" class='relative'>
            <n-link class="text-6C757E block pt-1 pb-1 px-3 mb-2 mr-6 text-lg font-medium hover:text-main hover:border-main wsn border border-solid border-E6E6EA rounded-sm"
              :class="{'mr-10':item.pro,'child-link-active': item.active,'border':item.active,'border-solid':item.active,'border-E6E6EA':item.active,'bg-F8F7FF':item.active}" :to="`/${lang}${item.path}`">{{ $t(item.title) }}</n-link>
            <img  v-show="item.pro" src="@/assets/imgs/proTitle.png" alt="" class='w-8 h-4 ml-2 absolute' style='top:0;right:10px'>
          </p>
        </div>
      </div>
    </div>
    
  </div>
</template>
<script>
export default {
  name: 'Childlink',

  mixins: [],

  props: ['value','routerTitle'],

  model: {
    prop: 'value',
    event: 'change'
  },

  components: {

  },

  watch: {
    $route: {
      handler: function(to, oldVal){
        this.seclectChildRouter(to.path)
        let url = this.$route.fullPath.slice(3);
        setTimeout(()=>{
          if(url == '/tool/calculator/machine'){
            this.activeName = '/tool/calculator/effective' 
          }else if(url.indexOf('nodeMonitoring') !== -1){
            this.activeName = '/tool/pro/nodeMonitoring'
          }else if(url == '/personalMenu/myCollection/efficiency' || url == '/personalMenu/myCollection/growth'){
            this.activeName = '/personalMenu/myCollection'
          }else{
            this.activeName = url 
          }
        },100)
      },
      immediate:true,
      deep: true,
    }
  },

  computed: {

  },

  data: function() {
    return {
      lang:this.$store.state.locale,
      activeName:"测试",
      flag:false,
      showFlag:false
    }
  },

  methods: {
    seclectChildRouter(path) {
      this.value.map(item => {
        if(path == `/${this.lang}/personalMenu/myCollection/efficiency` || path == `/${this.lang}/personalMenu/myCollection/growth`){
          this.value[0].active = true
        }else{
          item.active = path == `/${this.lang}${item.path}`
        }
        return item
      })
    },
    handleClick(tab) {
      this.$router.push(`/${this.lang}${tab.name}`)
    },
  },

  mounted: function() {
    this.seclectChildRouter(this.$route.path)
    this.$nextTick(()=>{
      this.activeName = this.value[0].path
    })
    let num = 0
    for(let i = 0;i<this.value.length;i++){
      num+=document.getElementById(`childred${i}`).offsetWidth
    }
    if(num > document.getElementById('parent').offsetWidth){
      this.showFlag = true
    }

  },

  beforeDestroy: function() {

  }
}
</script>
<style>
.mybox{
  overflow: auto;
  width: 88% ;
}
.mybox1{
  overflow: auto;
  width: 100% ;
}
.wsn{
  white-space: nowrap;
}
</style>