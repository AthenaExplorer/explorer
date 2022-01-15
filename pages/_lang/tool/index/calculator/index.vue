<template>
<div>
  <p class='lg:block hidden text-2xl mb-3'>{{$t('Lang.FIL calculator')}}</p>
  <div class="bg-white rounded-md">
    <div class="hidden lg:flex justify-start pt-5 border-b border-solid border-E6E6EA">
      <p class='block py-2 mx-3 text-lg rounded font-medium flex ' v-show="routerTitle.name"><img :src="routerTitle.img" alt="" class='w-4 h-5 mr-3'>{{routerTitle.title}}</p>
      <p v-for="item in chainRouter" :key="item.path">
         <n-link class="text-6C757E block  pt-3 pb-4 ml-10 mr-3 text-base   font-medium hover:text-main hover:border-main"
         :class="{'child-link-active': item.active,'border-b-2':item.active,'border-solid':item.active,'border-E6E6EA':item.active}" :to="`/${lang}${item.path}`">{{ $t(item.title) }}</n-link>
      </p>
    </div>
    <div class='lg:hidden block '>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane v-for="i in chainRouter" :key="i.title" :label="$t(i.title)" :name="i.path" class='pl-5'></el-tab-pane>
      </el-tabs>
    </div>
    <nuxt-child />
  </div>

</div>
</template>
<script>

export default {
  name: 'Calculator',

  mixins: [],

  props: [],

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

  computed: {
  },

  asyncData({ app }) {
    return {

    }
  },

  data: function() {
    return {
      lang:this.$store.state.locale,
      chainRouter: [
        { path: `/tool/calculator/effective`, title: "Lang.Full storage computing power output", active: false },
        { path: `/tool/calculator/machine`, title: "Lang.Mining machine packaging output", active: false },
      ],
      routerTitle: {
        title: "",
        img:'',
      },
      activeName:''
    }
  },

  methods: {
    seclectChildRouter(path) {
      this.chainRouter.map(item => {
        item.active = path == `/${this.lang}${item.path}`
        return item
      })
    },
    handleClick(tab) {
      this.$router.push(`/${this.lang}${tab.name}`)
    },
  },

  mounted: function() {
  },

  beforeDestroy: function() {

  }
}
</script>
<style>
</style>