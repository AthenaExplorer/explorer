
<template>
  <div class="flex justify-center items-center border border-solid border-E6E6EA" style="height: 40vh" v-loading="true"
  ></div>
</template>

<script>
export default {
  data() {
    return {
      lang: this.$store.state.locale,
    };
  },
  beforeMount() {
    this.$router.push(
      `/${this.lang}/account/register?code=${this.$route.query.code}`
    );
  },
};
</script>

<style lang="scss" scoped>
</style>