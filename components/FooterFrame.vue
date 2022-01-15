<template>
  <div class="bg-main">
    <div class="editionCenter text-white mx-auto flex flex-col justify-center h-full text-opacity-75  px-3">
      <div class='flex lg:py-10 pt-4 pb-3 justify-between items-center'>
        <div class="lg:w-1/2">
          <div class="flex">
            <n-link to="">
              <img class="h-8 lg:h-12" src="~/assets/img/icon-en-logo.png" />
            </n-link>
            <div class="flex-1"></div>
          </div>
          <div class="lg:mt-6 mt-3 flex flex-col ">
            <span class="leading-7">{{$t('Lang.footer')}}</span>
          </div>
        </div>
        <div class='lg:block hidden text-center'>
           <img src="@/assets/imgs/contact.png" class='m-auto' alt="" style='width:90px;height:90px;'>
           <p class='mt-2'>{{$t('Lang.Contact Customer Service')}}</p>
           <p>{{$t('Lang.Get professional data guidance')}}</p>
        </div>
      </div>

      <div class='flex lg:hidden text-left mt-2 mb-4 items-center'>
        <div class='mr-4'>
          <img src="@/assets/imgs/contact.png" alt="" style='width:90px;height:90px;'>
        </div>
        <div >
          <p class='mt-2'>{{$t('Lang.Contact Customer Service')}}</p>
          <p>{{$t('Lang.Get professional data guidance')}}</p>
        </div>
      </div>
      <div class="flex items-center justify-between border-t border-white border-solid border-opacity-25 h-16">
        <span class="flex-1 hidden lg:block"></span>
        <span class="flex-1 lg:text-center">© {{ year }} Atpool.com All Rights Reserved.</span>
        <span class="flex-1 text-right hidden lg:block"></span>
        <span class="text-right lg:hidden"></span>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: 'FooterFrame',

  mixins: [],

  props: [],

  components: {

  },

  watch: {

  },

  computed: {
    ...mapGetters({
      getIsProActive: "getIsProActive",
    }),
    lang(){
      return this.$store.state.locale
    }
  },

  data: function() {
    return {
      year: new Date().getFullYear() == '2020' ? '2020' : '2020-' + new Date().getFullYear(),
      version: '2.1.7'
    }
  },

  methods: {

  },

  mounted: function() {

  },

  beforeDestroy: function() {}
}
</script>
<style>
.footer{
}
</style>