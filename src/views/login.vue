<template>
  <div class="login">
    <div class="head">
      <img :src="getImgUrl('logoB')" alt="" />
      <span>通行证</span>
    </div>
    <div class="login-container">
      <el-form
        ref="loginForm"
        status-icon
        :rules="loginRules"
        :model="loginForm"
        class="login-form"
        autocomplete="on"
        label-position="left"
      >
        <div class="title-container">
          <h3 class="title">
            <img :src="getImgUrl('logo')" style="height: 7.4vh" alt />
            <h4>简单又好用的线上格式转换工具</h4>
          </h3>
        </div>
        <div class="formWrap">
          <div class="wholeform">
            <h3>密码登陆</h3>
            <div class="divider"></div>
            <el-form-item label="" prop="username">
              <el-input
                ref="username"
                v-model="loginForm.username"
                placeholder="用户名"
                name="username"
                type="text"
                tabindex="1"
                autocomplete="on"
              />
            </el-form-item>
            <el-form-item prop="password" label="">
              <el-input
                :key="passwordType"
                ref="password"
                v-model="loginForm.password"
                placeholder="密码"
                name="password"
                :type="passwordType"
                tabindex="1"
                autocomplete="on"
                @keyup.native="checkCapslock"
                @blur="capsTooltip = false"
                @keyup.enter.native="handleLogin"
              />
              <span class="show-pwd" @click="showPwd">
                <!-- <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" /> -->
              </span>
            </el-form-item>

            <el-button
              :loading="loading"
              type="primary"
              class="loginBtn"
              @click.native.prevent="handleLogin"
              >登陆</el-button
            >
          </div>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
import { validUsername } from "@/utils/validate";
import Tool from "@/utils/tool.js";
const validateUsername = (rule, value, callback) => {
  if (!validUsername(value)) {
    callback(new Error("用户名错误"));
  } else {
    callback();
  }
};
const validatePassword = (rule, value, callback) => {
  if (value.length < 1) {
    callback(new Error("密码长度至少1位"));
  } else {
    callback();
  }
};
export default {
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
      },
      passwordType: "password",
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername },
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword },
        ],
      },
      autoLogin: true,
      loading: false,
    };
  },
  mixins: [Tool],
  mounted() {
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },
  methods: {
    checkCapslock(e) {
      const { key } = e;
      this.capsTooltip = key && key.length === 1 && key >= "A" && key <= "Z";
    },
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          // this.$store
          //   .dispatch("user/login", this.loginForm)
          //   .then(() => {
          this.$router.push({ path: this.redirect || "/home/overview" });
          //     this.loading = false;
          //   })
          //   .catch((e) => {
          //     this.$message.error(e);
          //     this.loading = false;
          //   });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
      // this.loading = false;
      // this.$router.push({ path: "/home" });
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== "redirect") {
          acc[cur] = query[cur];
        }
        return acc;
      }, {});
    },
  },
  watch: {
    $route: {
      handler: function (route) {
        const query = route.query;
        if (query) {
          this.redirect = query.redirect;
          this.otherQuery = this.getOtherQuery(query);
        }
      },
      immediate: true,
    },
  },
};
</script>
<style lang="scss">
@import "../assets/common.scss";
</style>
<style lang="scss">
$light_gray: #fff;
$cursor: #fff;
$blue: #4cc9f0;
$width: 75%;
@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 100%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 30px;
      height: 47px;
      color: #cccccc;
      font-size: 1.2rem;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px transparent inset !important;
      }
    }
  }

  .el-form-item {
    // border: 1px solid rgba(255, 255, 255, 0.1);
    // background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
    display: flex;
    align-items: center;
  }
  .el-form-item__content {
    display: flex;
    border: 1px solid #d2dbe5;
    box-shadow: 0 2px 4px 0 #eff2f7;
    border-radius: 8px;
    width: $width;
    margin-left: calc((100% - #{$width}) / 2);
    margin-top: 1vh;
  }

  .el-form-item__label {
    font-family: PingFangSC-Regular;
    font-size: 1.5rem;
    color: $blue;
    margin-left: 1vw;
    letter-spacing: 10px;
  }
  .el-form-item.is-required:not(.is-no-asterisk)
    .el-form-item__label-wrap
    > .el-form-item__label:before,
  .el-form-item.is-required:not(.is-no-asterisk) > .el-form-item__label:before {
    content: "";
  }
  .el-checkbox:last-of-type {
    float: right;
    margin-right: 3vw;
  }
  .el-checkbox__input.is-checked .el-checkbox__inner {
    color: $blue;
    background: $blue;
    border-color: $blue;
  }
  .el-checkbox__input.is-checked + .el-checkbox__label {
    color: #999;
  }
  .el-form-item--small .el-form-item__error {
    padding-top: 1vh;
  }
}
</style>

<style lang="scss" scoped>
$dark_gray: #889aa4;
$light_gray: #eee;
$white: #fff;
$blue: #4cc9f0;
$width: 75%;
.login {
  height: 100%;
  width: 100%;
  overflow: hidden;
  // opacity: 0.9;
  // background-image: url("../../assets/login.png"),
  // linear-gradient(
  //   180deg,
  //   rgba(27, 37, 123, 0.8) 1%,
  //   rgba(0, 24, 71, 0.3) 100%
  // );
  // background-repeat: no-repeat, no-repeat;
  // background-size: 100% 100%;
  background: $blue;
  .head {
    margin-top: 2vh;
    margin-left: 3vw;
    display: flex;
    span {
      display: inline-block;
      margin-left: 1.5vw;
      font-size: 1.7rem;
      color: rgba(0, 0, 0, 0.75);
      
    }
  }

  .login-container {
    min-height: calc(100% - 16vh);
    align-items: center;
    justify-content: center;
    text-align: justify;
    display: flex;

    .divider {
      width: $width;
      height: 1px;
      margin-left: calc((100% - #{$width}) / 2);
      background: #000;
      margin-bottom: 4vh;
      box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.2);
      opacity: 0.1;
    }
    .login-form {
      position: relative;
      width: 25%;
      max-width: 100%;
      margin: 0 auto;
      overflow: hidden;
      .formWrap {
        background: rgba(133, 189, 255, 0.2);
        border-radius: 8px;
        box-shadow:-2px 0 3px -1px rgba(0, 0, 0, 0.2),0 2px 3px -1px rgba(0, 0, 0, 0.2),2px 0 3px -1px rgba(0, 0, 0, 0.2);
        .wholeform {
          background: $white;
          border-radius: 8px;
          padding: 4% 5% 14% 5%;
          h3 {
            text-align: center;
            letter-spacing: 0.75px;
            font-size: 1.5rem;
            font-family: "PingFangSC-Regular;";
          }
          .loginBtn {
            width: $width;
            margin: 3vh 25% 0;
            height: 5vh;
            // background: $blue;
            color: $white;
            border-radius: 8px;
            font-family: PingFangSC-Medium;
            font-size: 1.5rem;
            color: #ffffff;
            letter-spacing: 5px;
            font-weight: bold;
            margin-left: calc((100% - #{$width}) / 2);
          }
        }
      }
    }

    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;

      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }

    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }

    .title-container {
      position: relative;

      .title {
        font-size: 26px;
        color: $light_gray;
        margin: 0px auto 8vh auto;
        text-align: center;
        font-weight: bold;
      }
    }

    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }

    .thirdparty-button {
      position: absolute;
      right: 0;
      bottom: 6px;
    }

    @media only screen and (max-width: 470px) {
      .thirdparty-button {
        display: none;
      }
    }
  }
}
</style>
