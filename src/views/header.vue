<template>
  <div class="i_header">
    <div class="i_header_left">
      <img :src="getImgUrl('logoB')" alt="" @click="goHome()" />
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item index="overview">总览</el-menu-item>
        <el-menu-item index="setUp">设置</el-menu-item>
        <el-menu-item index="videos">音视频</el-menu-item>
        <el-menu-item index="doc">文档</el-menu-item>
        <el-menu-item index="pictures">图片</el-menu-item>
      </el-menu>
    </div>
    <div class="i_header_right">
      <div v-if="!userCookie">
        <el-button type="primary" @click="login">登录</el-button>
      </div>
      <div v-else>
        <el-dropdown @command="handleCommand">
          <el-avatar> {{ userCookie }} </el-avatar>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import Tool from "@/utils/tool.js";
// import config from "../../public/static/config.js";
import { getKey, removeKey } from "@/utils/auth";
import { mapState, mapMutations } from "vuex";
export default {
  name: "headerindex",
  computed: {
    ...mapState("user", ["activeIndex"]),
    userCookie() {
      let username = getKey("cas_user");
      return username;
    },
  },
  data() {
    return {
      // activeIndex: "overview",
    };
  },
  watch: {
    $route: {
      handler: function (val, oldVal) {
        if (val.name !== oldVal.name) {
          this.$store.commit("user/changeActive", val.name);
        }
      },
      // 深度观察监听
      deep: true,
    },
  },
  mixins: [Tool],
  methods: {
    //menu选择
    handleSelect(key, keyPath) {
      this.$store.commit("user/changeActive", key);
      const current = this.$route.path.split("/");
      if (current[2] !== key) {
        this.$router.push("/home/" + key);
      }
    },
    login() {
      window.location.replace(window.config.redirectUrl.login);
    },
    //退出登陆
    handleCommand(command) {
      if (command == "logout") {
        removeKey("cas_user");
        window.location.href = window.config.redirectUrl.logout;
      }
    },

    goHome() {
      this.$router.push("/");
    },
  },
  mounted() {},
};
</script>
<style lang="scss">
$headHeight: 7vh;
.i_header_left .el-menu.el-menu--horizontal {
  border-bottom: solid 0px #e6e6e6;
  margin-left: 3vw;
}
.i_header_left .el-menu--horizontal > .el-menu-item {
  height: calc(#{$headHeight} - 2px);
  line-height: calc(#{$headHeight} - 2px);
}
.i_header_left .el-menu--horizontal > .el-menu-item.is-active {
  border-bottom: 0px solid transparent;
  color: #303133;
  font-weight: bold;
}
</style>
<style scoped lang="scss">
$headHeight: 7vh;

div {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.i_header {
  width: 100%;
  height: $headHeight;
  background: #fff;
  padding: 0vh 3vw;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.i_header_left {
  width: 60%;
  height: $headHeight;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
}

.i_header_right {
  width: 30%;
  height: $headHeight;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
}
</style>
