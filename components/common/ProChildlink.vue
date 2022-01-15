<template>
  <div>
    <ul class="hidden lg:flex justify-center py-5">
      <li v-for="item in value" :key="item.path">
        <n-link class="block px-6 py-2 mx-3 text-lg border border-solid border-E6E6EA rounded font-medium hover:text-6F4715 hover:border-6F4715"
         :class="{'proChild-link-active': item.active}" :to="`${item.path}`">{{ $t(item.title) }}</n-link>
      </li>
    </ul>
    <ul class="flex py-3 lg:hidden">
      <li class="flex-1 border border-solid border-E6E6EA rounded font-medium hover:text-6F4715 hover:border-6F4715" 
      :class="{'proChild-link-active': item.active, 'ml-3': index > 0}" v-for="(item, index) in value" :key="item.path">
        <p class="block py-2 flex items-center justify-center text-center " @click='go(item.path)' >{{$t(item.title) }}</p>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'Childlink',

  mixins: [],

  props: ['value'],

  model: {
    prop: 'value',
    event: 'change'
  },

  components: {

  },

  watch: {
    $route(to) {
      this.seclectChildRouter(to.path)
    }
  },

  computed: {

  },

  data: function() {
    return {
      lang:this.$store.state.locale
    }
  },

  methods: {
    seclectChildRouter(path) {
      this.value.map(item => {
        item.active = path == `${item.path}`
        return item
      })
    },
    go(path){
      this.$router.push(path)
    }
  },

  mounted: function() {
    this.seclectChildRouter(this.$route.path)
  },

  beforeDestroy: function() {

  }
}
</script>
<style>
</style>