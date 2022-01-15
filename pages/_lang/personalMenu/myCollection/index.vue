<template>
  <div>
    <p class='hidden lg:block text-2xl mb-3'>{{$t('Lang.My Collection')}}</p>
    <div class="pb-3 bg-white rounded-md">
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
import Childlink from "@/components/common/Childlink";

export default {
  name: "Account",

  mixins: [],

  props: [],

  components: {
    Childlink,
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

  computed: {},

  asyncData({ app, redirect }) {
    return app.$axios.post("/api/explorer/get_user_info").then((res) => {
      if (res.code == 99905) {
        redirect(`/${res.data}/account`);
      }
    });
  },

  data: function () {
    return {
      chainRouter: [
        {
          path: `/personalMenu/myCollection`,
          title: "Lang.Miner collection",
          active: false,
        },
        {
          path: `/personalMenu/myCollection/accountCollection`,
          title: "Lang.Account collection",
          active: false,
        },
      ],
      lang: this.$store.state.locale,
      routerTitle: {
        title: "",
        img:'',
      },
      activeName:''
    };
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
    goIndex(){
      this.$router.push(`/${this.lang}/`)
    }
  },

  mounted: function () {
  },

  beforeDestroy: function () {},
};
</script>
<style>
</style>