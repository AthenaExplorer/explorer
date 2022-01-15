<template>
  <div class="__nuxt-error-page flex justify-center items-center">
    <div class="error">
      <svg xmlns="http://www.w3.org/2000/svg" width="90" height="90" fill="#DBE1EC" viewBox="0 0 48 48">
        <path d="M22 30h4v4h-4zm0-16h4v12h-4zm1.99-10C12.94 4 4 12.95 4 24s8.94 20 19.99 20S44 35.05 44 24 35.04 4 23.99 4zM24 40c-8.84 0-16-7.16-16-16S15.16 8 24 8s16 7.16 16 16-7.16 16-16 16z"></path>
      </svg>
      <div class="my-3">
      </div>
      <div class="mb-32 flex items-center">
        <span>{{$t('Lang.Error')}} !</span>
        <n-link :to="`/${lang}/`"><span class='text-main font-medium ml-4'>{{$t('Lang.Back to home')}}</span><i class="el-icon-arrow-right text-main"></i></n-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['error'],
  data() {
    return {
      lang:this.$store.state.locale
    }
  },
}
</script>
<style scoped>
.__nuxt-error-page {
  height: 60vh;
}

.__nuxt-error-page .error {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 450px;
  font-size: 12px;
  line-height: 20px;
}
</style>