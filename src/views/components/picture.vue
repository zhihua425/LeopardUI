<template>
  <div class="pictures">
    <Title :data="titleArr"></Title>
    <el-row :gutter="12">
      <div class="green greyShadow padding21">
        <div class="dashBorder">
          <div v-if="transferType == 'normal'">
            <el-form ref="form" :model="form" :rules="rules" label-width="10vw">
              <el-form-item label="选择原文件："  prop="srcpath">
                <el-input
                  v-model="form.srcpath"
                  :title="form.srcpath"
                  placeholder="输入地址(如:http://192.168.50.243:9000/bosc/boy.jpeg)"
                  @change="writeDestpath"
                ></el-input>
              </el-form-item>
              <el-form-item
                label="转码后文件路径："
                ref="destpath"
                prop="destpath"
              >
                <el-input
                  v-model="form.destpath"
                  :title="form.destpath"
                  :disabled="true"
                  placeholder="http://192.168.50.243:9000/bosc/boy.jpeg.png"
                ></el-input>
              </el-form-item>
              <el-form-item label="选择格式：" prop="format">
                <el-select v-model="form.format" placeholder="" @change="writeDestpath($event)">
                  <el-option label="png" value="png"></el-option>
                  <el-option label="jpeg" value="jpeg"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <div class="btnDiv">
              <el-button plain @click="submitForm('form')" size="medium"
                >开始转换</el-button
              >
            </div>
          </div>
          <div v-else-if="transferType == 'progress'" class="trans">
            <div class="pro">
              <span>文件名</span>
              <el-progress
                :percentage="percentage"
                :color="customColor"
                :stroke-width="13"
                class="progressWrap"
              ></el-progress>
            </div>
            <p>转换进程</p>
            <el-button plain size="medium"  @click="endTransfer">终止转换</el-button>
          </div>
          <div v-else-if="transferType == 'lose'" class="trans">
            <div><img :src="getImgUrlSvg('lose')" alt="" /></div>
            <p>转换失败</p>
            <el-button plain size="medium" @click="endTransfer">继续转换</el-button>
          </div>
          <div v-else-if="transferType == 'success'" class="trans">
            <div><img :src="getImgUrlSvg('success')" alt="" /></div>
            <p>转换成功</p>
            <el-button plain size="medium" @click="endTransfer">继续转换</el-button>
          </div>
        </div>
      </div>
    </el-row>
    <illustrate></illustrate>
    <pannel :data="picData"></pannel>
  </div>
</template>
<script>
import { validURL, validHostPort } from "@/utils/validate";
import Tool from "@/utils/tool";
import { mapState, mapActions } from "vuex";
import Title from "@/views/components/title";
import illustrate from "@/views/components/illustrate";
import pannel from "@/views/components/pannel";
import qs from 'qs';
const validateUrlPath = (rule, value, callback) => {
  if (!validURL(value)) {
    callback(new Error("url格式错误"));
  } else {
    callback();
  }
};

export default {
  name: "pictures",
  computed: {},
  components: {
    Title,
    illustrate,
    pannel,
  },
  mixins: [Tool],
  data() {
    return {
      titleArr: ["图片", "图片转换格式"],
      transferType: "normal",
      percentage: 10,
      customColor: "#FFFFFF",
      form: {
        srcpath: "",
        destpath: "",
        format: "png",
      },
      rules: {
        srcpath: [
          { required: true, message: "请输入源文件地址", trigger: "blur" },
          { min: 10, message: "长度不少于10个字符", trigger: "blur" },
          // { required: true, trigger: "blur", validator: validateUrlPath },
        ],
        format: [
          {
            format: "array",
            required: true,
            message: "请至少选择一种格式",
            trigger: "change",
          },
        ],
      },
      picData: [
        "如何转换音视频格式",
        "选择需要转换的文件地址，选择要转换的格式，转换完成后将存入计算机原来的位置，过程就是如此简单快捷。",
        "如何转换音视频格式",
        "选择需要转换的文件地址，选择要转换的格式，转换完成后将存入计算机原来的位置，过程就是如此简单快捷。",
        "如何转换音视频格式",
        "选择需要转换的文件地址，选择要转换的格式，转换完成后将存入计算机原来的位置，过程就是如此简单快捷。",
      ],
    };
  },
  methods: {
    writeDestpath() {
      this.form.destpath = this.form.srcpath + "." + this.form.format;
    },
    submitForm(formName) {
      if (this.transferType != "normal") {
        this.transferType = "normal";
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let paramS3 = {};
          //判断是否为S3地址
          if (true) {
            const srchost1 = this.form.srcpath;
            const desthost1 = this.form.destpath;
            const srchost = validHostPort(this.form.srcpath);
            const desthost = validHostPort(this.form.destpath);
            paramS3 = {
              srchost: srchost,
              desthost: desthost,
              srcpath: srchost1.substr(
                srchost1.match(srchost).index + srchost.length + 1
              ).replace('/',':'),
              destpath: desthost1.substr(
                desthost1.match(desthost).index + desthost.length + 1
              ).replace('/',':'),
            };
          }
          this.transferType = "progress";
          this.$store
            .dispatch("picture/convert", qs.stringify({ ...this.form, ...paramS3 }))
            .then(() => {
              this.percentage = 100;
              this.$message.success("转换成功！");
              this.transferType = "success";
            })
            .catch((e) => {
              this.$message.error(e);
              this.transferType = "lose";
            });
        } else {
          console.log("error submit!!");
          this.$message.error('格式错误');
          return false;
        }
      });
    },
    endTransfer() {
      this.transferType = "normal";
    },
  },
};
</script>

<style lang="scss">
//@dialog
.el-dialog {
  width: 30%;
}
.el-dialog__body {
  padding: 30px 5vw;
  .el-select {
    width: 100%;
  }
}
</style>
<style lang="scss" scoped>
@import "../../assets/common.scss";
$white: #fff;
$pictures: #7961f2;
.pictures {
  margin: 2vh 1vw;

  .green {
    background: $pictures;
    min-height: 20vh;
  }
}
</style>