<template>
  <div>
    <div v-if="objects.length !== 0" class=''>
      <div class='lg:block hidden px-3'>
        <table class="table-fixed w-full">
          <thead>
            <tr class="border-b border-solid border-E8E7EB" style="" >
              <th class="w-1/12 py-2 font-medium"></th>
              <th class="w-4/12 py-4 font-medium text-left pl-6">{{$t('Lang.Account address')}}</th>
              <th class="w-1/12 py-4 font-medium">{{$t('Lang.Account Balance')}}</th>
              <th class="w-2/12 py-4 font-medium">{{$t('Lang.Remarks')}}</th>
              <th class="w-1/12 py-4 font-medium">{{$t('Lang.Operating')}}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in objects" class="border-b border-solid border-E8E7EB" :key="index + '_index'">
              <td class="w-4 py-3 text-center truncate  h-16">
                <span>{{index + (page_size * (page_index - 1)) + 1}}</span>
              </td>
              <td class="w-6 py-3 text-left truncate pl-6 h-16">
                <n-link :to="`/${lang}/chain/addr/${item.address}`" class='text-main cursor-pointer hover:opacity-75'>{{item.address}}</n-link>
              </td>
              <td class="w-1/12 py-3 text-center truncate">{{item.value | formatEasyFil}}</td>
              <td class="w-1/12 py-3 text-center truncate"  @click="changeRemarks(item)">
                <el-input size='mini' @change='ok(item)' @blur='item.flag = false' v-show="item.flag" v-model="remarks" clearable> </el-input>
                <el-popover v-show="!item.flag && item.remarks" trigger="hover" :content="item.remarks">
                  <p class='cursor-pointer' slot="reference">{{item.remarks | getProSubStr}} <i class="el-icon-edit" style='color:#333fc6'></i></p>
                </el-popover>
                <p v-show="!item.flag && !item.remarks" class='cursor-pointer' slot="reference">{{item.remarks | getProSubStr}} <i class="el-icon-edit" style='color:#333fc6'></i></p>
              </td>
              <td class='mr-4 text-center'>
                <p class='text-main cursor-pointer opacity-75 hover:opacity-100' @click='del(item)'>{{$t('Lang.Delete')}}</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class='lg:hidden block bg-white rounded-md mt-2 px-2'>
        <table class="table-fixed w-full">
          <thead>
            <tr class="" style="" >
              <th class="w-2/12 py-4 font-medium text-left pl-6">{{$t('Lang.Account address')}}</th>
              <th class="w-2/12 py-4 font-medium">{{$t('Lang.Account Balance')}}</th>
              <th class="w-1/12 py-4 font-medium">{{$t('Lang.Operating')}}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in objects" class="border-t border-solid border-E8E7EB" :key="index + '_index'">
              <td class="w-2/12 py-3 text-left  pl-6">
                <n-link :to="`/${lang}/chain/addr/${item.address}`" class='text-main cursor-pointer hover:opacity-75'>{{item.address | getSubStr}}</n-link>
              </td>
              <td class="w-1/12 py-3 text-center truncate">{{item.value | formatEasyFil}}</td>
              <td class='mr-4 text-center'>
                <p class='text-main cursor-pointer' @click='del(item)'>{{$t('Lang.Delete')}}</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="my-3 lg:my-6">
        <Pagination
          :pageSize="page_size"
          :pageIndex="page_index"
          :totalCount="total_count"
          @indexChange="searchRecordHandler"
          @sizeChange='handleCurrentChange'
        ></Pagination>
      </div>
    </div>

    <div v-if="objects.length == 0" class='flex items-center justify-center ' style='height:40vh'>
      <div class='text-center'>
        <img src="@/assets/imgs/noMsg.png" alt="" style='width:150px'>
        <p style='color:#5F6578' class='mb-10'>{{$t('Lang.No collection')}}</p>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      page_index: 1,
      page_size: 20,
      total_count: 0,
      objects: {},
      lang: this.$store.state.locale,
      remarks: "",
      remarksFlag: false,
    };
  },
  asyncData({ app }) {
    let data = {
      user_info: {},
      objects: {},
      page_size: 20,
      page_index: 1,
      total_count: 0,
    };
    return app.$axios
      .post("/api/explorer/get_collectible_address_list", {
        page_index: 1,
        page_size: 20,
      })
      .then((res) => {
        data.objects = res.data.objects;
        data.total_count = res.data.total_count;
        return data;
      });
  },
  mounted() {
    this.$axios.post("/api/explorer/get_user_info").then((res) => {
      if (res.code !== 0) {
        this.$router.push("/");
        return;
      }
      this.user_info = res.data;
    });
  },
  methods: {
    searchRecordHandler(pageIndex) {
      this.$axios
        .post("/api/explorer/get_collectible_address_list", {
          page_index: pageIndex,
          page_size: this.page_size,
        })
        .then((res) => {
          if (res.code != 0) return;
          this.objects = res.data.objects;
          this.total_count = res.data.total_count;
          this.page_index = pageIndex;
        });
    },
    handleCurrentChange(size){
      this.page_size = size
      this.searchRecordHandler(1)
    },
    del(item) {
      this.$axios
        .post("/api/explorer/del_collectible_wallet_address", {
          user_id: this.user_info.user_id,
          wallet_address: item.address,
          wallet_id:item.id
        })
        .then((res) => {
          if (res.code != 0) return;
          
          if(this.total_count == 1){
            this.searchRecordHandler(1);
          }else{
            if ((this.total_count - 1) % 20 == 0 && this.total_count!==21) {
              this.searchRecordHandler(this.page_index - 1);
            } else {
              this.searchRecordHandler(this.page_index);
            }
          }
          if (this.lang == "zh") {
            this.$notification.success({
              title: "成功",
              message: "删除成功",
            });
          } else if (this.lang == "en") {
            this.$notification.success({
              title: "Success",
              message: "Successfully deleted",
            });
          } else if (this.lang == "ja") {
            this.$notification.success({
              title: "成功",
              message: "削除に成功しました",
            });
          } else {
            this.$notification.success({
              title: "성공",
              message: "성공적으로 삭제",
            });
          }
        });
    },
    changeRemarks(item) {
      this.objects.map((i) => {
        i.flag = false;
      });
      item.flag = true;
      this.remarks = item.remarks;
    },
    ok(item) {
      this.$axios
        .post("/api/explorer/update_collectible", {
          collectible_id: item.address,
          type: "wallet",
          remarks: this.remarks,
        })
        .then((res) => {
          if (res.code !== 0) {
            return;
          }
          item.flag = false;
          this.searchRecordHandler(this.pageIndex);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>