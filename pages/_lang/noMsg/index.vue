<template>
    <div class='flex items-center justify-center' style='height:60vh'>
        <div class='text-center '>
            <img src="../../../assets/imgs/noMsg.png" alt="" style='width:150px'>
            <p style='color:#5F6578' class='mb-10'>{{$t('Lang.No data')}}</p>
            <el-button size='mini'><n-link :to="`/${lang}/`"><span class='text-main font-medium'>{{$t('Lang.Back to home')}}</span></n-link></el-button>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                lang:this.$store.state.locale,
            }
        },
        methods: {
        },
    }
</script>

<style lang="sass" scoped>

</style>