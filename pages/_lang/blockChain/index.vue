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
        { path: `/blockChain/tipset`, title: "Lang.BLOCK", active: false },
        { path: `/blockChain/msg`, title: "Lang.MESSAGE", active: false },
        { path: `/blockChain/rich`, title: "Lang.Address", active: false },
        { path: `/blockChain/order`, title: "Lang.order", active: false },
        { path: `/blockChain/messagePool`, title: "Lang.Message pool", active: false },
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