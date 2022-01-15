<template>
  <div class="w-full">
    <div class="w-full lg:flex items-center justify-center custom-pagination hidden">
      <el-pagination background @current-change="currentChangeHandler"  @size-change="handleSizeChange" :page-sizes="[20, 50, 100]" border :current-page="pageIndex" :page-size="pageSize || 40" layout="sizes, prev, pager, next" :total="totalCount || 1">
      </el-pagination>
    </div>
    <div class="w-full flex items-center justify-center lg:hidden">
      <el-pagination background small @current-change="currentChangeHandler" :current-page="pageIndex" :page-size="pageSize || 40" layout="prev, pager, next" :total="totalCount || 1">
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Pagination',

  mixins: [],

  props: ['totalCount', 'pageSize', 'pageIndex'],

  components: {

  },

  watch: {

  },

  computed: {

  },

  data: function() {
    return {}
  },

  methods: {
    currentChangeHandler: function(pageIndex) {
      this.$emit('indexChange', pageIndex);
    },
    handleSizeChange(size) {
      this.$emit('sizeChange', size);
    },
  },

  mounted: function() {
  },

  beforeDestroy: function() {}
}
</script>
<style>
</style>