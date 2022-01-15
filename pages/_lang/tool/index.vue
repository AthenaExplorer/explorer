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
        { path: `/tool/calculator/effective`, title: "Lang.FIL calculator", active: false },
        { path: `/tool/pro`, title: "Lang.Miner health report", active: false, pro:true },
        { path: `/tool/pro/nodeMonitoring`, title: "Lang.Miner monitoring", active: false ,pro:true},
        { path: `/tool/pro/nodeComparison`, title: "Lang.Miner comparison", active: false ,pro:true},
        { path: `/tool/walletFlow`, title: "Lang.Wallet Flow", active: false},
        { path: `/tool/commonlyUsed`, title: "Lang.Common tool", active: false },
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