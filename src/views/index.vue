<template>
  <div class="app-wrapper">
    <div class="project_overview_box">
      <Cu-Header-Index />
      <div class="project_overview_content_box">
        <div class="appMain">
          <AppMain></AppMain>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { AppMain } from "./components";
import CuHeaderIndex from "@/views/header";
import { getKey, removeKey } from "@/utils/auth";
// import config from "../../public/static/config.js";
export default {
  name: "Layout",
  components: {
    AppMain,
    CuHeaderIndex,
  },
  computed: {},
  created() {
    // this.checkUser();
  },
  methods: {
    checkUser: function () {
      let username = this.getUser();
      if (!username || username.length === 0) {
        this.login();
     
      }
    },

    getUser: function () {
      let username = getKey("cas_user");
      if (!username || username.length === 0) {
        username = "";
      }
      return username;
    },

    login: function () {
      window.location.replace(
        window.config.redirectUrl.login
      );
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/mixin.scss";
@import "~@/assets/variables.scss";
.project_overview_box {
  border-bottom: 1px solid #ddd; ////**#f6f5f5cf;
  background: #ffffff;
  box-shadow: inset 0 -1px 0 0 rgba(0, 0, 0, 0.2);
}
.appMain {
  position: absolute;
  top: 7vh;
  // left: 16vw;
  width: 100%;
  // width: calc(100% - 16vw);
  height: 100%;
  // background: rgba(197, 201, 212, 0.15);
  // background: #fff;
}
.openMain {
  left: 6vw;
  width: calc(100% - 6vw);
}
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}
</style>
<style>
::-webkit-scrollbar {
  width: 3px;
}
::-webkit-scrollbar-track {
  border-radius: 8px;
  width: 8px;
}
::-webkit-scrollbar-thumb {
  border-radius: 2px;
  background: #bbb;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
}
::-webkit-scrollbar-thumb:window-inactive {
  background: #eee;
}
</style>
