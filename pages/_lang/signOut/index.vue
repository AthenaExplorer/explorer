<template>
  <div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Cookie from 'js-cookie'

export default {
  data() {
    return {
      lang: this.$store.state.locale,
    };
  },
  asyncData({ app }) {},
  beforeMount() {
    this.out();
    this.$router.push(`/${this.lang}/`);
  },
  mounted(){
    setTimeout(()=>{
      this.out();
    },100)
  },
  methods: {
    ...mapActions({
      changeIsSignIn: "changeIsSignIn",
      changeIsProActive: "changeIsProActive",
      changeProUserList:"changeProUserList",
      changeUserList: "changeUserList"
    }),
    out() {
      this.$axios.post("/api/explorer/clear_user_info").then((res) => {
        if (res.code !== 0) return;
        this.changeIsSignIn(false);
        this.changeIsProActive(false);
        this.changeProUserList(null)
        this.changeUserList(null)
        sessionStorage.clear();
        localStorage.removeItem('expire')
        Cookie.remove('token')
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>