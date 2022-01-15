<template>
  <div>
    <p class='lg:block hidden text-2xl mb-4'>{{$t('Lang.Sign up')}}</p>
    <div class='bg-white '>
        <div class="">
          <ul class="">
            <li class="" v-for="item in childRouter" :key="item.path">
              <n-link :to="item.path"></n-link>
            </li>
          </ul>
        </div>
        <nuxt-child />
    </div>
  </div>
</template>
<script>


export default {
  name: "Account",

  mixins: [],

  props: [],

  components: {
  },

  watch: {
    $route(to) {
      this.seclectChildRouter(to.path);
    },
  },

  computed: {
  },

  asyncData({ app,redirect }) {
    let data = {
      isSignIn:false
    };

    return app.$axios.post("/api/explorer/get_user_info").then((res) => {
      if(res.code == 0){
        data.isSignIn = true
        return app.$axios.post("/api/explorer/get_lang")
      }
      return data
    }).then(res=>{
      if(data.isSignIn){
        redirect(`/${res.data}/`);
      }
      return data
    })
  },

  data: function () {
    return {
      childRouter: [
        {
          path: `/${this.$store.state.locale}/account`,
          title: "Lang.Sign up",
          active: false,
        },
        {
          path: `/${this.$store.state.locale}/account/register`,
          title: "Lang.Sign in",
          active: false,
        },
      ],
      lang: this.$store.state.locale,
    };
  },

  methods: {
    seclectChildRouter(path) {
      this.childRouter.map((item) => {
        item.active = path == `${item.path}`;
        return item;
      });
    },
    goIndex(){
      this.$router.push(`/${this.lang}/`)
    }
  },

  mounted: function () {
    this.seclectChildRouter(this.$route.path);
  },

  beforeDestroy: function () {},
};
</script>
<style>
</style>