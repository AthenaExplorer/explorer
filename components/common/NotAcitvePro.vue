<template>
  <div class='bg-white'>
    <div class='mt-4 lg:mb-16 mb-10'>
        <div class='banner xl:block lg:hidden md:hidden sm:hidden hidden relative' style='height:300px'>
            <div class='introduce absolute' style='height:120px;width:450px;right:8%;bottom:30%'>
                <div v-show="!flag">
                    <img v-if="lang == 'zh' " src="@/assets/imgs/gift.png" alt="" style='width:200px'>
                    <img v-if="lang == 'en' " src="@/assets/imgs/gift-en.png" alt="" style='width:360px'>
                    <img v-if="lang == 'ko' " src="@/assets/imgs/gift-ko.png" alt="" style='width:220px'>
                    <img v-if="lang == 'ja' " src="@/assets/imgs/gift-ja.png" alt="" style='width:220px'>
                </div>
                <p v-show="flag" class='text-white text-3xl font-light'>{{$t('Lang.Node Data Professional')}}</p>
                <div class='flex items-end' style='color:rgba(255, 200, 66, 1)'>
                    <div>
                        <span class='text-3xl mr-1'>￥</span>
                        <span class='text-6xl font-thin '  v-show="!flag">5888</span>
                        <span class='ml-2 text-2xl line-through font-thin'  v-show="!flag">6888/年</span>
                        <span class='text-6xl font-thin '  v-show="flag">6888</span>
                    </div>
                    <div class='mb-5'>
                        <span class='ml-4 contact'>{{$t('Lang.Customer Service')}}
                            <img  class='proImg z-40' v-show="!flag" src="@/assets/imgs/contact.png" alt="" style='width:120px;height:120px;right:22%;bottom:-80%'>
                            <img  class='proImg z-40' v-show="flag" src="@/assets/imgs/contact.png" alt="" style='width:120px;height:120px;right:40%;bottom:-80%'>
                        </span>
                    </div>
                    <div class='mb-5' v-show="!flag">
                        <span class='ml-4 contactFree' @click='free'>{{$t('Lang.Free trial')}}</span>
                    </div>
                </div> 
                <p class='text-white opacity-75' v-show="!flag">{{$t('Lang.From now on to June 27 the purchase of pro professional version will be reduced by 1000 and free of charge half a year of use right will be given')}}</p>
                <p class='text-white opacity-75' v-show="!flag">{{$t('Lang.For more information, please contact customer service')}}</p>
                <p class='text-white opacity-75' v-show="flag">{{$t('Lang.The Pro version adds Node Health Report')}}</p>   
            </div>
        </div>

        <div class='banner xl:hidden lg:block md:hidden sm:hidden hidden relative' style='height:260px'>
            <div class='introduce absolute' style='height:120px;width:450px;right:4%;bottom:30%'>
                <div v-show="!flag">
                    <img v-if="lang == 'zh' " src="@/assets/imgs/gift.png" alt="" style='width:200px'>
                    <img v-if="lang == 'en' " src="@/assets/imgs/gift-en.png" alt="" style='width:300px'>
                    <img v-if="lang == 'ko' " src="@/assets/imgs/gift-ko.png" alt="" style='width:200px'>
                    <img v-if="lang == 'ja' " src="@/assets/imgs/gift-ja.png" alt="" style='width:200px'>
                </div>
                <p v-show="flag" class='text-white text-3xl font-light'>{{$t('Lang.Node Data Professional')}}</p>
                <div class='flex items-end' style='color:rgba(255, 200, 66, 1)'>
                    <div>
                        <span class='text-3xl mr-1'>￥</span>
                        <span class='text-6xl font-thin '  v-show="!flag">5888</span>
                        <span class='ml-2 text-2xl line-through font-thin'  v-show="!flag">6888/年</span>
                        <span class='text-6xl font-thin '  v-show="flag">6888</span>
                    </div>
                    <div class='mb-5'>
                        <span class='ml-4 contact'>{{$t('Lang.Customer Service')}}
                            <img  class='proImg z-40' v-show="!flag"  src="@/assets/imgs/contact.png" alt="" style='width:120px;height:120px;right:23%;bottom:-82%'>
                            <img  class='proImg z-40' v-show="flag"  src="@/assets/imgs/contact.png" alt="" style='width:120px;height:120px;right:39%;bottom:-82%'>
                        </span>
                    </div>
                    <div class='mb-5' v-show="!flag">
                        <span class='ml-4 contactFree' @click='free'>{{$t('Lang.Free trial')}}</span>
                    </div>
                </div> 
                <p class='text-white opacity-75' v-show="!flag">{{$t('Lang.From now on to June 27 the purchase of pro professional version will be reduced by 1000 and free of charge half a year of use right will be given')}}</p>
                <p class='text-white opacity-75' v-show="flag">{{$t('Lang.The Pro version adds Node Health Report')}}</p>
            </div>
        </div>

        <div class='banner xl:hidden lg:hidden md:block sm:hidden hidden relative' style='height:200px'>
            <div class='introduce absolute' style='height:120px;width:350px;right:2%;bottom:32%'>
                <p v-show="flag" class='text-white text-3xl font-light -mb-3'>{{$t('Lang.Node Data Professional')}}</p>
                <div class='flex items-end' style='color:rgba(255, 200, 66, 1)'>
                    <div>
                        <span class='text-3xl mr-1'>￥</span>
                        <span class='text-6xl font-thin '  v-show="!flag">5888</span>
                        <span class='ml-2 text-2xl line-through font-thin'  v-show="!flag">6888/年</span>
                        <span class='text-6xl font-thin '  v-show="flag">6888</span>
                        <span class='contact ml-4' v-show="flag">{{$t('Lang.Customer Service')}}
                            <img  class='proImg z-40' src="@/assets/imgs/contact.png" alt="" style='width:120px;height:120px;right:21%;bottom:-80%'>
                        </span>
                    </div>
                </div> 
                <div class='flex' v-show="!flag">
                    <div class='mb-5'>
                        <span class='contact'>{{$t('Lang.Customer Service')}}
                            <img  class='proImg z-40' src="@/assets/imgs/contact.png" alt="" style='width:120px;height:120px;right:65%;bottom:-82%'>
                        </span>
                    </div>
                    <div class='mb-5'>
                        <span class='ml-4 contactFree' @click='free'>{{$t('Lang.Free trial')}}</span>
                    </div>
                </div>
                <p class='text-white opacity-75' v-show="!flag">{{$t('Lang.From now on to June 27 the purchase of pro professional version will be reduced by 1000 and free of charge half a year of use right will be given')}}</p>
                <p class='text-white opacity-75' v-show="flag">{{$t('Lang.The Pro version adds Node Health Report')}}</p>
            </div>
        </div>

        <div class='xl:hidden lg:hidden md:hidden sm:block hidden relative phone-banner' style='height:120px'>
            <div class='introduce absolute' style='height:80px;width:336px;right:5%' :class="{'bottom10':lang == 'zh','bottom25':lang !== 'zh'}">
                <div class='tetx-center font-thin flex items-end' style='color:rgba(255, 200, 66, 1)'>
                    <div>
                        <span class='text-xl -mr-1'>￥</span>
                        <span class='text-3xl mr-2' v-show="!flag">5888</span>
                        <span class='mr-1 text-xl line-through font-thin' v-show="!flag">6888/年</span>
                        <span class='text-3xl mr-2' v-show="flag">6888</span>
                    </div>
                    <div class='mb-2'>
                        <span class='contact text-base'>{{$t('Lang.Customer Service')}}
                            <img  class='proImg z-40' v-show="!flag" src="@/assets/imgs/contact.png" alt="" style='width:100px;height:100px;right:31%;bottom:-80%'>
                            <img  class='proImg z-40' v-show="flag" src="@/assets/imgs/contact.png" alt="" style='width:100px;height:100px;right:50%;bottom:-80%'>
                        </span>
                    </div>
                    <div class='mb-2' v-show="!flag">
                        <span class='ml-4 contactFree' @click='free'>{{$t('Lang.Free trial')}}</span>
                    </div>
                </div> 
                <p class='text-white opacity-75' v-show="!flag">{{$t('Lang.From now on to June 27 the purchase of pro professional version will be reduced by 1000 and free of charge half a year of use right will be given')}}</p>
                <p class='text-white opacity-75' v-show="flag">{{$t('Lang.The Pro version adds Node Health Report')}}</p>
            </div>
        </div>

        <div class='xl:hidden lg:hidden md:hidden sm:hidden block relative littiephone-banner' style='height:120px'>
            <div class='introduce absolute' style='height:80px;width:220px;right:2%' :class="{'top18':lang !== 'en','top10':lang 
            == 'en'}">
                <div class='tetx-center font-thin flex items-end' style='color:rgba(255, 200, 66, 1)'>
                    <div>
                        <span class='text-xl -mr-1'>￥</span>
                        <span class='text-3xl mr-2' v-show="!flag">5888</span> 
                        <span class='mr-1 text-xl line-through font-thin' v-show="!flag">6888/年</span>
                        <span class='text-3xl mr-2' v-show="flag">6888</span> 
                        <span class='contact text-base' v-show="flag">{{$t('Lang.Customer Service')}}
                            <img  class='proImg z-40' src="@/assets/imgs/contact.png" alt="" style='width:100px;height:100px;right:20%;bottom:-69%'>
                        </span>
                    </div>
                </div> 
                <div class='mb-2' v-show="!flag">
                    <span class='contact text-base'>{{$t('Lang.Customer Service')}}
                        <img  class='proImg z-40' src="@/assets/imgs/contact.png" alt="" style='width:100px;height:100px;right:56%;bottom:-99%'>
                    </span>
                    <span class='ml-4 contactFree' @click='free' >{{$t('Lang.Free trial')}}</span>
                </div>
                <p class='text-white opacity-75 leading-5'  v-show="!flag">{{$t('Lang.From now on to June 27 the purchase of pro professional version will be reduced by 1000 and free of charge half a year of use right will be given')}}</p>
                <p class='text-white opacity-75 leading-5' v-show="flag">{{$t('Lang.The Pro version adds Node Health Report phone')}}</p>
            </div>
        </div>
    </div>
    

    <div class='flex items-center justify-center lg:mb-14 mb-4'>
        <div><img src="@/assets/imgs/wecan-right.png" alt="" style='height:14px'></div>
        <div class='px-6 lg:text-3xl text-xl font-medium'>{{$t('Lang.What we offer')}}</div>
        <div><img src="@/assets/imgs/wecan-left.png" alt="" style='height:14px'></div>
    </div>

    <div class='hidden sm:block px-0 mb-10 bg-white pb-6'>
        <img v-if="lang == 'zh' " src="@/assets/imgs/advantage-zh.png" alt="" style='width:1000px' class='m-auto'>
        <img v-if="lang == 'en' " src="@/assets/imgs/advantage-en.png" alt="" style='width:1000px' class='m-auto'>
        <img v-if="lang == 'ko' " src="@/assets/imgs/advantage-ko.png" alt="" style='width:1000px' class='m-auto'>
        <img v-if="lang == 'ja' " src="@/assets/imgs/advantage-ja.png" alt="" style='width:1000px' class='m-auto'>
    </div>

    <div class='sm:hidden block px-0 mb-10'>
        <img v-if="lang == 'zh' " src="@/assets/imgs/littleAdvantage-zh.png" alt="" style='width:1000px' class='m-auto'>
        <img v-if="lang == 'en' " src="@/assets/imgs/littleAdvantage-en.png" alt="" style='width:1000px' class='m-auto'>
        <img v-if="lang == 'ko' " src="@/assets/imgs/littleAdvantage-ko.png" alt="" style='width:1000px' class='m-auto'>
        <img v-if="lang == 'ja' " src="@/assets/imgs/littleAdvantage-ja.png" alt="" style='width:1000px' class='m-auto'>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'notAcitvePro',
    data() {
        return {
            lang: this.$store.state.locale,
            flag:false
        }
    },
    methods:{
        free(){
            this.$router.push(`/${this.lang}/invitation`)
        }
    },
    mounted(){
        if(new Date().getTime()>new Date('2021-09-01 00:00:00').getTime()){
          this.flag = true
        }
    }
  }
</script>

<style lang="scss" scoped>
.banner{
  height: 300px;
  background:url('../../assets/imgs/proBanner.png') no-repeat;
  background-size: 100% 100%;
}
.contact{
    color: rgba(255, 200, 66, 1);
    border: 1px solid rgba(255, 200, 66, 1);
    padding: 2px 4px;
    border-radius: 4px;
    opacity: 0.75;
    &:hover{
        opacity: 1;
        cursor: pointer;
        .proImg{
            opacity: 1;

        }
    }
}
.contactFree{
    color:#000;
    border: 1px solid rgba(255, 200, 66, 1);
    background:  rgba(255, 200, 66, 1);
    padding: 2px 4px;
    border-radius: 4px;
    opacity: 0.75;
    &:hover{
        opacity: 1;
        cursor: pointer;
        .proImg{
            opacity: 1;

        }
    }
}
.phone-banner{
    background:url('../../assets/imgs/phone-banner.png') no-repeat;
    background-size: 100% 100%;
}
.littiephone-banner{
    background:url('../../assets/imgs/phone-littilebanner.png') no-repeat;
    background-size: 100% 100%;
}
.proImg{
    position: absolute;
    opacity: 0;
    transition: all 0.2s linear; 
}
.bottom10{
    bottom: 10%;
}
.bottom25{
    bottom: 25%;
}
.top10{
    top: -2%;
}
.top18{
    top: 2%;
}
</style>