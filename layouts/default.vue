<template>
  <div class="flex flex-col min-h-screen lg:bg-F2F6FC bg-white">
    <HeaderFrame v-model="tabs"></HeaderFrame>
    <div class="flex-grow px-3 pt-4 editionCenter relative overflow-hidden">
      <nuxt />
    </div>
    <FooterFrame></FooterFrame>
    <div class="remind">
      <el-dialog
        :visible.sync="expireFlag"
        :width="dialogWidth"
        :before-close="handleCloseExpire"
      >
        <div class="flex items-center">
          <img
            src="../assets/imgs/Pro.png"
            alt=""
            style="height: 30px"
            class="lg:mr-6 lg:ml-4 mr-4 ml-1"
          />
          <div class="">
            <p v-show="iDays > 1" style="color: #935e0f">
              {{ $t("Lang.Your pro members also have") }}{{ iDays
              }}{{ $t("Lang.Days due") }}
            </p>
            <p v-show="iDays <= 1" style="color: #935e0f">
              {{ $t("Lang.Your Pro membership is about to expire") }}
            </p>
            <p class="text-848599 leading-5 mt-2">
              {{
                $t(
                  "Lang.If he bought it now, he would reduce 1000 and give it to the owner for half a year"
                )
              }}
            </p>
          </div>
        </div>
        <div class="flex justify-end pr-6 mt-4">
          <span class="ml-4 contacts"
            >{{ $t("Lang.Customer Service") }}
            <img
              class="proImg z-40"
              src="@/assets/imgs/contact.png"
              alt=""
              style="width: 120px; height: 120px; right: 4.5%; bottom: -70%"
            />
          </span>
        </div>
      </el-dialog>
    </div>

   
  </div>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import HeaderFrame from "@/components/HeaderFrame";
import FooterFrame from "@/components/FooterFrame";
import Cookie from "js-cookie";
import utils from "@/static/utils.js";
export default {
  name: "Default",

  components: {
    HeaderFrame,
    FooterFrame,
  },

  computed: {
    ...mapGetters({
      menu: "getMenu",
      globalOverview: "getGlobalOverview",
      IsSignIn: "getIsSignIn",
    }),
    overview: function () {
      let {
        power,
        power_inc_24_hour,
        avg_pledge,
        avg_reward,
        price,
        fil_index_objs,
        create_gas_32,
        create_gas_64,

        history_time_gas,

        rr_fil_overview,
      } = this.globalOverview;
      return [
        {
          title: "Lang.FIL index",
          value: utils.formatterAmount(fil_index_objs, 2),
        },
        {
          title: "Lang.Network Storage Power",
          value: utils.formatPower(power, 4)[0],
          unit: utils.formatPower(power)[1],
        },
        {
          title: "Lang.Power Growth in 24 hours",
          value: utils.formatPower(power_inc_24_hour, 4)[0],
          unit: utils.formatPower(power_inc_24_hour)[1],
        },
        {
          title: "Lang.Sector pledge",
          value: avg_pledge ? utils.formatterAmount(avg_pledge * 32) : "--",
          unit: "F/TiB",
        },
        {
          title: "Lang.Real-time 32GiB Production Gas_1",
          value: utils.formatFil(create_gas_32, false),
          unit: "F/TiB",
        },
        {
          title: "Lang.Real-time 64GiB Production Gas_1",
          value: utils.formatFil(create_gas_64, false),
          unit: "F/TiB",
        },
        {
          title: "Lang.32G production Gas in latest 24 hours",
          value: rr_fil_overview ? rr_fil_overview.create_cost_gas_per_t : "--",
          unit: "F/TiB",
        },
        {
          title: "Lang.64G production Gas in latest 24 hours",
          value: rr_fil_overview
            ? rr_fil_overview.create_cost_gas_per_t_64
            : "--",
          unit: "F/TiB",
        },
      ];
    },
    tabs() {
      return [
        {
          to: `/${this.$store.state.locale}/`,
          title: "Lang.Home",
          icon: "",
          active: false,
        },
        {
          to: `/${this.$store.state.locale}/star`,
          title: "Lang.Node starme",
          icon: "",
          active: false,
        },
        {
          to: `/${this.$store.state.locale}/athena`,
          title: "Lang.Athena Pool",
          icon: "",
          active: false,
        },
        {
          to: `/${this.$store.state.locale}/calculator/effective`,
          title: "Lang.Calculator",
          icon: require("~/assets/img/icon-cal.png"),
          active: false,
        },
        {
          to: `/${this.$store.state.locale}/pro`,
          title: "Lang.Pro",
          has: require("~/assets/img/icon-pro.png"),
          active: false,
        },
      ];
    },
  },

  data: function () {
    return {
      expireFlag: false,
      interval: null,
      intervalTag: null,
      intervalPrice: null,
      user_info: {},
      dialogWidth: "",
      lang: this.$store.state.locale,
      iDays: "",
    };
  },

  head() {
    if (this.$store.state.locale == "en") {
      return {
        title: `Athena-Filecoin Professional Node Data Service`,
        meta: [
          {
            hid: "description",
            name: "description",
            content:
              "Athena Explorer is a Filcoin blcokchain browser which provides dynamic and interactive blockchain data, including  mining rankings, blockchain data queries. With the unique Calculator, Athena helps esitimate the mining FIL output.",
          },
          {
            hid: "keywords",
            name: "keywords",
            content:
              "FIL,Gas,IPFS,filecoin,atpool,Athena Explorer,Athena Filecoin Explorer,Sector Pledge",
          },
        ],
      };
    } else if (this.$store.state.locale == "ko") {
      return {
        title: `Athena-Filecoin 전문 노드 데이터 서비스`,
        meta: [
          {
            hid: "description",
            name: "description",
            content:
              "Athena Browser는 Filecoin 노드를위한 전문 데이터 서비스 도구로, 사용자에게 채굴 자 정보, FIL 지수, 최신 높이, 가스 역학 등 Filcoin 관련 데이터 및 채굴 자 순위를 제공합니다.",
          },
          {
            hid: "keywords",
            name: "keywords",
            content:
              "FIL,아테나 브라우저,Gas,IPFS,filecoin,아테나 윈츠,atpool,아테나 블록 체인 브라우저,섹터 서약",
          },
        ],
      };
    } else if (this.$store.state.locale == "ja") {
      return {
        title: `アテナ-Filecoin専門ノードデータサービス`,
        meta: [
          {
            hid: "description",
            name: "description",
            content:
              "Athena Browser는 Filecoin 노드를위한 전문 데이터 서비스 도구로, 사용자에게 채굴 자 정보, FIL 지수, 최신 높이, 가스 역학 등 Filcoin 관련 데이터 및 채굴 자 순위를 제공합니다.",
          },
          {
            hid: "keywords",
            name: "keywords",
            content:
              "FIL,아테나 브라우저,Gas,IPFS,filecoin,아테나 윈츠,atpool,아테나 블록 체인 브라우저,섹터 서약",
          },
        ],
      };
    }
  },

  methods: {
    ...mapActions({
      changeMenuHandler: "changeMenu",
      changeIsSignIn: "changeIsSignIn",
      changeIsProActive: "changeIsProActive",
      changeProUserList: "changeProUserList",
      changeUserList: "changeUserList",
    }),
    ...mapMutations(["SET_LANG"]),
    changeLang(command) {
      Cookie.set("lang", command);
      this.SET_LANG(command);
      this.lang = command;
      let url = this.$route.fullPath.slice(3);
      this.$router.push(`/${command}${url}`);
    },
    getMinerTag: function () {
      let list = [];
      this.$axios
        .post(
          "/api/explorer/get_pool_miner_list",
          { is_pool: 1, page_size: 150 },
          { progress: false }
        )
        .then((res) => {
          if (res.code != 0) return;
          res.data.objs.map((per) => {
            if (per.power < Math.pow(1024, 5) * 10) {
              list.push(per.miner_no);
            }
          });
          return this.$axios.post(
            "/api/explorer/get_miner_apply_tag",
            {},
            { progress: false }
          );
        })
        .then((res) => {
          if (!res || res.code != 0) return;
          let _tags = {};
          res.data.map((per) => {
            if (list.indexOf(per.miner_no) == -1) {
              _tags[per.miner_no] = per;
            }
          });
          _tags["f090"] = {
            cn_tag: "官方",
            en_tag: "官方",
          };
          _tags["f0121"] = {
            cn_tag: "Filecoin基金会",
            en_tag: "Filecoin基金会",
          };
          _tags["f0118"] = {
            cn_tag: "官方",
            en_tag: "官方",
          };
          _tags["f0119"] = {
            cn_tag: "官方",
            en_tag: "官方",
          };
          _tags["f0117"] = {
            cn_tag: "官方",
            en_tag: "官方",
          };
          _tags["f0120"] = {
            cn_tag: "官方",
            en_tag: "官方",
          };
          _tags["f099"] = {
            cn_tag: "销毁账户",
            en_tag: "销毁账户",
          };
          this.$store.commit("setGlobalMinerTag", _tags);
        });
    },
    getNetDataHandler: function () {
      this.$axios
        .post("/api/explorer/get_overview", {}, { progress: false })
        .then((res) => {
          if (res.code != 0) return;
          this.$store.commit("setGlobalOverview", res.data);
        });
    },
    getOverviewStat: function () {
      this.$axios
        .post("/api/explorer/get_overview_stat", {}, { progress: false })
        .then((res) => {
          if (res.code != 0) return;
          this.$store.commit("setOverviewStat", res.data);
        });
    },
    getFilPrice: function () {
      this.$axios
        .post("/api/explorer/get_price", {}, { progress: false })
        .then((res) => {
          if (res.code != 0) return;
          this.$store.commit("setFilPrice", res.data);
        });
    },
    closeHandler() {
      this.changeMenuHandler(false);
    },
    SignIn() {
      this.$axios.post("/api/explorer/get_user_info").then((res) => {
        this.changeIsSignIn(res.code == 0 ? true : false);
        if (res.code == 0) {
          this.changeUserList(res.data);
          this.user_info = res.data;
          this.getProActive();
        }
      });
    },
    getProActive() {
      this.$axios
        .post("/api/explorer/get_pro_user_info", {
          token: this.user_info.token,
        })
        .then((res) => {
          this.changeIsProActive(res.code == 0 ? true : false);
          this.changeProUserList(res.data);

          var dateSpan, sDate1, sDate2, iDays;

          sDate1 = Date.parse(new Date());
          sDate2 = Date.parse(res.data.expire_time);
          dateSpan = sDate2 - sDate1;
          dateSpan = Math.abs(dateSpan);
          iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
          if (iDays <= 7 && !localStorage.getItem("expire")) {
            this.iDays = iDays;
            this.expireFlag = true;
          }
        });
    },
    handleClose(done) {
      localStorage.setItem("Popup", true);
      done();
    },
    handleCloseExpire(done) {
      localStorage.setItem("expire", true);
      done();
    },
    getHeight() {
      if (document.body.clientWidth < 768) {
        this.dialogWidth = "93%";
      } else {
        this.dialogWidth = "476px";
      }
    },
    getTagStatue() {
      this.$axios
        .post("/api/explorer/get_tag_status", {}, { progress: false })
        .then((res) => {
          if (res.code != 0) return;
          this.$store.commit("SET_TagShowFlag", res.data);
        });
    },
  },

  created() {
    this.getMinerTag();
    this.SignIn();

    this.getNetDataHandler();
    this.getOverviewStat()
    this.getFilPrice();
    this.getTagStatue();
  },

  beforeMount() {
    window.addEventListener("resize", this.getHeight);
    this.getHeight();
    if (this.$route.query.type) {
      localStorage.setItem("type", this.$route.query.type);
    }
    this.$bus.$on("expire-event", (data) => {
      this.getProActive();
    });

    if (this.$route.fullPath.indexOf("CN") !== -1) {
      this.$router.push(this.$route.fullPath.replace("zh-CN", "zh"));
    } else if (this.$route.fullPath.indexOf("US") !== -1) {
      this.$router.push(this.$route.fullPath.replace("en-US", "en"));
    } else if (this.$route.fullPath.indexOf("KR") !== -1) {
      this.$router.push(this.$route.fullPath.replace("ko-KR", "ko"));
    } else if (this.$route.fullPath.indexOf("JP") !== -1) {
      this.$router.push(this.$route.fullPath.replace("ja-JP", "ja"));
    }
  },

  mounted: function () {
    this.intervalTag = setInterval(() => {
      this.getMinerTag();
    }, 10 * 60 * 1000);
    this.interval = setInterval(() => {
      this.getNetDataHandler();
      this.getOverviewStat()
    }, 15 * 1000);
    this.getTagStatue();
  },

  beforeDestroy: function () {
    clearInterval(this.intervalTag);
    this.intervalTag = null;
    window.removeEventListener("resize", this.getHeight);
    clearInterval(this.interval);
    this.interval = null;
    clearInterval(this.intervalPrice);
    this.intervalPrice = null;
  },


};
</script>
<style lang="scss">
.popUpWindow {
  background: url("../assets/imgs/invitation-alert-bg.png") no-repeat;
  background-size: 100% 100%;
  width: 490px;
  height: 440px;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.popUpWindow-title {
  background: url("../assets/imgs/invitation-alert-titlebg.png") no-repeat
    center;
  background-size: 80% 70%;
}

.popUpWindowPc {
  background: url("../assets/imgs/invitation-alert-bg.png") no-repeat;
  background-size: 100% 100%;
  width: 350px;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}



.myIndex .el-dialog {
  background: url("../assets/imgs/invitation-alert-pcbg.png") no-repeat !important;
  background-size: 100% 100% !important;
  box-shadow: none !important;
  border: none !important;
  padding-bottom: 0px;
}

.dialogPC {
  background: url("../assets/imgs/invitation-alert-pcbg.png") no-repeat !important;
  background-size: 100% 100% !important;
  box-shadow: none !important;
  border: none !important;
  padding-bottom: 0px;
}

.dialogPhone {
  background: url("../assets/imgs/invitation-alert-bg.png") no-repeat !important;
  background-size: 100% 100% !important;
  box-shadow: none !important;
  border: none !important;
  padding-bottom: 0px;
}

.myIndex .el-dialog__close {
  color: #fff !important;
}

.myIndex .el-button {
  border: none !important;
}

.myIndex .el-dialog__body {
  padding-bottom: 20px;
}

.myIndex .el-dialog__headerbtn {
  margin-right: 10px;
  margin-top: -10px;
}
.el-submenu__title {
  padding: 0 0 0 8px !important;
  opacity: 0.75;
}
.el-menu {
  border: 0 !important;
}
.remind .el-dialog__body {
  padding: 10px 10px 20px 10px !important;
}

.proImg {
  position: absolute;
  opacity: 0;
  transition: all 0.2s linear;
}
.contacts {
  color: #935e0f;
  border: 1px solid rgba(255, 200, 66, 1);
  background: linear-gradient(218deg, #ffd293 0%, #e0ab5c 100%, #e0ab5c 100%);
  padding: 2px 8px;
  border-radius: 4px;
  opacity: 0.8;
  &:hover {
    opacity: 1;
    cursor: pointer;
    .proImg {
      opacity: 1;
    }
  }
}



.shadow {
  box-shadow: 0px 4px 11px 2px rgba(134, 138, 145, 0.31);
}

// ::-webkit-scrollbar-thumb{
// background-color:#DCE1E8;
// height:50px;
// outline-offset:-2px;
// outline:2px solid #fff;
// -webkit-border-radius:4px;
// border: 2px solid #fff;
// }
// ::-webkit-scrollbar-thumb:hover{
// background-color:#848599;
// height:50px;
// -webkit-border-radius:4px;
// }
// ::-webkit-scrollbar{
// width:8px;
// height:8px;
// }
// ::-webkit-scrollbar-track-piece{
// background-color:#fff;
// -webkit-border-radius:0;
// }

</style>