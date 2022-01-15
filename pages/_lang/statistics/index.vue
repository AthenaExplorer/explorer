<template>
  <div>
    <div class='lg:hidden block'>
        <Childlink v-model="chainRouter" :routerTitle="routerTitle" />
    </div>
    <nuxt-child />
  </div>
</template>

<script>
import Childlink from "@/components/common/Childlink";

export default {
  data() {
    return {
      chainRouter: [
        { path: `/statistics/panoramicData`, title: "Lang.Statistical overview", active: false },
        { path: `/statistics/gas`, title: "Lang.GAS fee statistics", active: false },
        { path: `/statistics/powerTrend`, title: "Lang.Hash power trend", active: false },
        { path: `/statistics/outputEfficiency`, title: "Lang.Production Efficiency", active: false },
        { path: `/statistics/pledge`, title: "Lang.Sector pledge", active: false },
        { path: `/statistics/athena`, title: "Lang.Athena Pool", active: false },
      ],
      routerTitle: {
        title: "",
        img:'',
      },
      lang: this.$store.state.locale,
      interval:null
    }
  },
  methods:{
    goIndex(){
      this.$router.push(`/${this.lang}/`)
    },
    getOverviewStat: function() {
      this.$axios.post('/api/explorer/get_overview_stat', {}, { progress: false })
        .then(res => {
          if (res.code != 0) return
          this.$store.commit('setOverviewStat', res.data)
        })
    },
  },
  created(){
  },
  mounted(){
    this.getOverviewStat()
    this.interval = setInterval(() => {
      this.getOverviewStat()
    }, 30 * 1000)
  },
  components: {
    Childlink,
  },
  beforeDestroy: function() {
    clearInterval(this.interval)
    this.interval = null
  }
};
</script>

<style lang="scss" scoped>
</style>