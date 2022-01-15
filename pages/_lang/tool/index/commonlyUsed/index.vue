<template>
   <div class="pb-3">
    <p class='hidden lg:block text-2xl mb-3'>{{$t('Lang.Common tool')}}</p>
    <div class="rounded-md bg-white">
      <div class="flex items-center justify-between h-16 lg:h-20 lg:px-6 lg:border-b border-solid border-E8E7EB">
        <div class="flex items-center">
          <span class=" font-bold">{{$t('Lang.Official link')}}</span>
        </div>
      </div>
      <div class='flex flex-wrap lg:py-6 py-0'>
        <div v-for="i in linkList" :key="i.name" class='lg:w-1/4 w-1/2 text-center my-4'>
            <div class='cursor-pointer py-4 inline-block lg:w-1/2 w-11/12 text-dark rounded-md hover:text-main' style='background:#F9F9FD' @click='otherUrl(i.path)' >{{$t(i.name)}}</div>
        </div>
      </div>
    </div>

    <div class="mt-3 rounded-md bg-white">
      <div class="flex items-center justify-between h-16 lg:h-20 lg:px-6 lg:border-b border-solid border-E8E7EB">
        <div class="flex items-center justify-between">
          <p class="font-bold">{{$t('Lang.Development tool')}}</p>
        </div>
      </div>
      <div class='flex flex-wrap lg:py-6 py-0'>
        <div v-for="i in devList" :key="i.name" class='lg:w-1/4 w-1/2 text-center my-4'>
            <div class='cursor-pointer px-3 py-4 inline-block lg:w-2/3 w-11/12 text-dark rounded-md hover:text-main' style='background:#F9F9FD' @click='otherUrl(i.path)'>{{$t(i.name)}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import echartsUtils from "@/static/echarts-utils.js";
import utils from "@/static/utils.js";

export default {

  data: function () {
    return {
        linkList:[
          {name:'Lang.Official website',path:'https://filecoin.io'},
          {name:'Lang.Github',path:'https://github.com/filecoin-project/'},
          {name:'Lang.slack channel',path:'https://app.slack.com/client/TEHTVS1L6/CEHTVSEG6/'},
          {name:'Lang.Official blog',path:'https://filecoin.io/zh-cn/blog/'},
          {name:'Lang.Official special tweet',path:'https://twitter.com/Filecoin'},
          {name:'Lang.Official Forums',path:'https://discuss.filecoin.io'},
          {name:'Lang.filecoin documentation',path:'https://docs.filecoin.io/'},
        ],
        devList:[
          {name:'Lang.go-filecoin testnet tutorial',path:'https://docs.filecoin.io/get-started/#filecoin-implementations'},
          {name:'Lang.Lotus testnet tutorial',path:'https://lotu.sh/'},
          {name:'Lang.Lotus performance testing tool',path:'https://docs.filecoin.io/mine/hardware-requirements/'},
          {name:'Lang.Grants information',path:'https://github.com/filecoin-project/devgrants#submit-a-proposal-for-open-grants'},
          {name:'Lang.Protocol Academy Tutorial',path:'https://proto.school/#/tutorials'},
          {name:'Lang.DApp tools',path:'https://blog.textile.io/'},
          {name:'Lang.Official test environment cluster (small scale)',path:'https://pcpartpicker.com/user/tperson/saved/H2BskL'},
          {name:'Lang.Official test environment cluster (large scale)',path:'https://filecoin.io/vintage/mining-hardware-config-testnet-v1.pdf'},
        ]
    };
  },

  methods: {
    otherUrl(item){
      window.open(item)
    }
  },

  mounted: function() {
    
  },

  beforeDestroy: function () {
  },
};
</script>
<style>
</style>