<template>
  <div class='bg-white'>
    <div class='mt-4 lg:mb-16 mb-10'>
        <div class='banner xl:block lg:hidden md:hidden sm:hidden hidden relative' style='height:300px'>
            <div class='introduce absolute' style='height:120px;width:450px;right:8%;bottom:30%'>
                <p  class='text-white text-3xl font-light'>{{$t('Lang.Node Data Professional')}}</p>
                <div class='flex items-end' style='color:rgba(255, 200, 66, 1)'>
                    <div>
                        <span class='text-3xl mr-1'>￥</span>
                        <span class='text-6xl font-thin line-through'  >1000</span>
                        <span class='text-4xl'>/{{$t('Lang.months')}}</span>
                    </div>
                    <div class='mb-5'>
                        <span class='ml-4 contactFree' @click='free'>{{$t('Lang.Free trial')}}</span>
                    </div>
                </div> 
                <p class='text-white opacity-75' >{{$t('Lang.The Pro version adds Node Health Report')}}</p>   
            </div>
        </div>

        <div class='banner xl:hidden lg:block md:hidden sm:hidden hidden relative' style='height:260px'>
            <div class='introduce absolute' style='height:120px;width:450px;right:4%;bottom:30%'>
                <p class='text-white text-3xl font-light'>{{$t('Lang.Node Data Professional')}}</p>
                <div class='flex items-end' style='color:rgba(255, 200, 66, 1)'>
                    <div>
                        <span class='text-3xl mr-1'>￥</span>
                        <span class='text-6xl font-thin line-through'  >1000</span>
                        <span class='text-4xl'>/{{$t('Lang.months')}}</span>
                    </div>
                    <div class='mb-5' >
                        <span class='ml-4 contactFree' @click='free'>{{$t('Lang.Free trial')}}</span>
                    </div>
                </div> 
                <p class='text-white opacity-75'>{{$t('Lang.The Pro version adds Node Health Report')}}</p>
å
            </div>
        </div>

        <div class='banner xl:hidden lg:hidden md:block sm:hidden hidden relative' style='height:200px'>
            <div class='introduce absolute' style='height:120px;width:350px;right:2%;bottom:32%'>
                <p v-show="flag" class='text-white text-3xl font-light -mb-3'>{{$t('Lang.Node Data Professional')}}</p>
                <div class='flex items-end' style='color:rgba(255, 200, 66, 1)'>
                    <div>
                        <span class='text-3xl'>￥</span>
                        <span class='ml-1 text-4xl line-through font-thin'  >1000/{{$t('Lang.months')}}</span>
                        <span class='contact ml-4' v-show="flag">{{$t('Lang.Customer Service')}}
                            <img  class='proImg z-40' src="@/assets/imgs/contact.png" alt="" style='width:120px;height:120px;right:21%;bottom:-80%'>
                        </span>
                    </div>
                </div> 
                <div class='flex' v-show="!flag">
                    <div class='mb-5 mt-3'>
                        <span class=' contactFree' @click='free'>{{$t('Lang.Free trial')}}</span>
                    </div>
                </div>
                <p class='text-white opacity-75' >{{$t('Lang.The Pro version adds Node Health Report')}}</p>

            </div>
        </div>

        <div class='xl:hidden lg:hidden md:hidden sm:block hidden relative phone-banner' style='height:120px'>
            <div class='introduce absolute' style='height:80px;width:336px;right:5%' :class="{'bottom10':lang == 'zh','bottom25':lang !== 'zh'}">
                <div class='tetx-center font-thin flex items-end' style='color:rgba(255, 200, 66, 1)'>
                    <div>
                        <span class='text-2xl -mr-1'>￥</span>
                        <span class='mr-1 text-3xl line-through font-thin' >1000/{{$t('Lang.months')}}</span>
                    </div>
                    
                    <div class='mb-2'>
                        <span class='ml-4 contactFree' @click='free'>{{$t('Lang.Free trial')}}</span>
                    </div>
                </div> 
                <p class='text-white opacity-75'>{{$t('Lang.The Pro version adds Node Health Report')}}</p>

            </div>
        </div>

        <div class='xl:hidden lg:hidden md:hidden sm:hidden block relative littiephone-banner' style='height:120px'>
            <div class='introduce absolute' style='height:80px;width:220px;right:2%' :class="{'top18':lang !== 'en','top10':lang 
            == 'en'}">
                <div class='tetx-center font-thin flex items-end' style='color:rgba(255, 200, 66, 1)'>
                    <div>
                        <span class='text-xl -mr-1'>￥</span>
                        <span class='mr-1 text-xl line-through font-thin' v-show="!flag">1000/{{$t('Lang.months')}}</span>
                        
                    </div>
                    <span class='contactFree ml-4 mt-2' @click='free' >{{$t('Lang.Free trial')}}</span>
                </div> 
                <p class='text-white opacity-75 leading-5'>{{$t('Lang.The Pro version adds Node Health Report phone')}}</p>

            </div>
        </div>
    </div>
    
    <div class='flex items-center justify-center lg:mb-14 mb-4'>
        <div><img src="@/assets/imgs/wecan-right.png" alt="" style='height:14px'></div>
        <div class='px-6 lg:text-3xl text-xl font-medium'>{{$t('Lang.What we offer')}}</div>
        <div><img src="@/assets/imgs/wecan-left.png" alt="" style='height:14px'></div>
    </div>

    <div class='w-11/12 lg:w-8/12 m-auto mb-3'>
        <div class='hidden sm:block px-0  bg-white pb-6'>
            <img v-if="lang == 'zh' " src="@/assets/imgs/advantage-zh.png" alt=""  class='m-auto w-full'>
            <img v-if="lang == 'en' " src="@/assets/imgs/advantage-en.png" alt="" style='width:1000px' class='m-auto'>
            <img v-if="lang == 'ko' " src="@/assets/imgs/advantage-ko.png" alt="" style='width:1000px' class='m-auto'>
            <img v-if="lang == 'ja' " src="@/assets/imgs/advantage-ja.png" alt="" style='width:1000px' class='m-auto'>
        </div>

        <div class='sm:hidden block px-0 '>
            <img v-if="lang == 'zh' " src="@/assets/imgs/littleAdvantage-zh.png" alt="" style='width:1000px' class='m-auto'>
            <img v-if="lang == 'en' " src="@/assets/imgs/littleAdvantage-en.png" alt="" style='width:1000px' class='m-auto'>
            <img v-if="lang == 'ko' " src="@/assets/imgs/littleAdvantage-ko.png" alt="" style='width:1000px' class='m-auto'>
            <img v-if="lang == 'ja' " src="@/assets/imgs/littleAdvantage-ja.png" alt="" style='width:1000px' class='m-auto'>
        </div>

        <div class='border border-solid border-E8E7EB px-4 py-6'>
            <p class='text-xl mb-4'>{{$t('Lang.Activity Rules')}}</p>
            <p class='text-6C757E'>1、{{$t('Lang.Register as a new user and try it for free')}}</p>
            <p class='text-6C757E'>2、{{$t('Lang.The probation period is 30 days and the registration will take effect immediately')}}</p>
        </div>
    </div>

    <div class='flex justify-center py-8 mb-3'>
        <el-button size="medium" type="primary" @click='free'>{{$t('Lang.Go to register for trial')}}</el-button>
    </div>

    
  </div>
</template>

<script>

  export default {
    name: 'notAcitvePro',
    asyncData({ app,redirect }) {
        let data = {
            isSignIn:false
        };
        return app.$axios.post("/api/explorer/get_user_info").then((res) => {
            if(res.code == 0){
                data.isSignIn = true
                return app.$axios.post("/api/explorer/get_lang")
            }
            return data
        }).then(res=>{
            if(data.isSignIn){
                redirect(`/${res.data}/`);
            }
            return data
        })
    },
    data() {
        return {
            lang: this.$store.state.locale,
            flag:false
        }
    },
    computed:{
    },
    methods:{
        free(){
            this.$router.push(`/${this.lang}/account`)
        }
    },
  }
</script>

<style lang="scss" scoped>
.banner{
  height: 300px;
  background:url('../../../assets/imgs/proBanner.png') no-repeat;
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
    background:url('../../../assets/imgs/phone-banner.png') no-repeat;
    background-size: 100% 100%;
}
.littiephone-banner{
    background:url('../../../assets/imgs/phone-littilebanner.png') no-repeat;
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