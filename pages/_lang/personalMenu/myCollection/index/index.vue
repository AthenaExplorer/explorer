<template>
  <div class='bg-white'>
    <div class="lg:flex lg:mb-6 mb-2 mt-4">
      <ul class="flex justify-left checkbox-content mr-6 lg:mt-0 -mt-2 lg:ml-10">
        <li
          class="flex justify-center items-center checkbox-list cursor-pointer py-1 px-3 lg:px-5 "
          @click="selectStatTimehandler(item)"
          :class="{first: index == 0,last: outStatList.length - 1 == index,active: item.value == outStatTime}"
          v-for="(item, index) in outStatList"
          :key="item.value">
          {{ $t(item.key) }}
        </li>
      </ul>
    </div>
    <nuxt-child />
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      lang: this.$store.state.locale,
      user_info: {},
      outStatTime: "raw_power",
      outStatList: [
        { value: "raw_power", key: "Lang.Effective computing power" },
        { value: "efficiency", key: "Lang.Power growth rate" },
        { value: "growth", key: "Lang.Production Efficiency" },
      ],
    };
  },
  asyncData({ app }) {},
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
    selectStatTimehandler: function (item) {
      if (this.outStatTime == item.value) return;
      this.outStatTime = item.value;
      switch (item.value) {
        case "raw_power":
          this.$router.push(`/${this.lang}/personalMenu/myCollection`);
          break;
        case "efficiency":
          this.$router.push(
            `/${this.lang}/personalMenu/myCollection/efficiency`
          );
          break;
        case "growth":
          this.$router.push(`/${this.lang}/personalMenu/myCollection/growth`);
          break;
        default:
          break;
      }
    },
    changeOutStatTime(){
      switch (this.outStatTime) {
        case "raw_power":
          this.$router.push(`/${this.lang}/personalMenu/myCollection`);
          break;
        case "efficiency":
          this.$router.push(
            `/${this.lang}/personalMenu/myCollection/efficiency`
          );
          break;
        case "growth":
          this.$router.push(`/${this.lang}/personalMenu/myCollection/growth`);
          break;
        default:
          break;
      }
    },
    changeValue() {
    },
  },
  beforeMount() {
    if (this.$route.path.indexOf("efficiency") != -1) {
      this.outStatTime = "efficiency";
    } else if (this.$route.path.indexOf("growth") != -1) {
      this.outStatTime = "growth";
    } else {
      this.outStatTime = "raw_power";
    }
  },
  watch: {
    $route: {
      handler: function (to, from) {
        if (to.path.indexOf("efficiency") != -1) {
          this.outStatTime = "efficiency";
        } else if (to.path.indexOf("growth") != -1) {
          this.outStatTime = "growth";
        } else {
          this.outStatTime = "raw_power";
        }
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss" scoped>
</style>