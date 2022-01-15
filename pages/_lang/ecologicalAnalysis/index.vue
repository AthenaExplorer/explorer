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
        { path: `/ecologicalAnalysis/filindex`, title: "Lang.FIL index", active: false },
        { path: `/ecologicalAnalysis/prediction`, title: "Lang.Forecast and analysis", active: false },
        { path: `/ecologicalAnalysis/ecologicalStatistics`, title: "Lang.Ecological Statistics", active: false },
      ],
      routerTitle: {
        title: "",
        img:'',
      },
      lang: this.$store.state.locale
    }
  },
  methods:{
    goIndex(){
      this.$router.push(`/${this.lang}/`)
    }
  },
  components: {
    Childlink,
  },
};
</script>

<style lang="scss" scoped>
</style>