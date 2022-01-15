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
        { path: `/dataCap/myIndex/notaryPublic`, title: "Lang.Notary public", active: false },
        { path: `/dataCap/myIndex/customer`, title: "Lang.Datacap customers", active: false },
        { path: `/dataCap/myIndex/storageProvider`, title: "Lang.Datacap storage provider", active: false },
        { path: `/dataCap/myIndex/order`, title: "Lang.Datacap order", active: false },
        { path: `/dataCap/myIndex/data`, title: "Lang.Uplink DataCap data", active: false },
      ],
      routerTitle: {
        title: "",
        img:'',
      },
      lang: this.$store.state.locale
    }
  },
  mounted(){
    
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