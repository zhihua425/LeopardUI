<template>
  <div class="doc">
    <Title :data="titleArr"></Title>
    <el-row :gutter="12">
      <div class="green greyShadow padding21">
        <div class="dashBorder">
          <div v-if="transferType == 'normal'">
            <el-form
              status-icon
              ref="docForm"
              :model="docForm"
              :rules="docRules"
              label-width="10vw"
              autocomplete="on"
            >
              <el-form-item label="选择原文件：" ref="srcpath" prop="srcpath">
                <el-input
                :title="docForm.srcpath"
                  v-model="docForm.srcpath"
                  placeholder="输入地址(如:http://192.168.50.243:9000/bosc/cgroup-v2.txt)"
                  @change="writeDestpath"
                ></el-input>
              </el-form-item>
              <el-form-item
                label="转码后文件路径："
                ref="destpath"
                prop="destpath"
              >
                <el-input
                  v-model="docForm.destpath"
                  :title="docForm.destpath"
                  :disabled="true"
                  placeholder="请输入地址(S3://IP: port/xxxxx或域名端口)"
                ></el-input>
              </el-form-item>
              <el-form-item label="选择格式：" prop="format">
                <el-select v-model="docForm.format" placeholder="">
                  <el-option label="pdf" value="pdf"></el-option>
                 
                </el-select>
              </el-form-item>
             
            </el-form>
            <div class="btnDiv">
              <el-button plain @click="submitForm('docForm')" size="medium"
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
            <el-button plain size="medium" @click="endTransfer">终止转换</el-button>
          </div>
          <div v-else-if="transferType == 'lose'" class="trans">
            <div><img :src="getImgUrlSvg('lose')" alt=""></div>
            <p>转换失败</p>
            <el-button plain size="medium" @click="submitForm('docForm')">继续转换</el-button>
          </div>
          <div v-else-if="transferType == 'success'" class="trans">
            <div><img :src="getImgUrlSvg('success')" alt=""></div>
            <p>转换成功</p>
            <el-button plain size="medium" @click="submitForm('docForm')">继续转换</el-button>
          </div>
        </div>
      </div>
    </el-row>
    <illustrate></illustrate>
    <pannel :data="docData"></pannel>
   
  </div>
</template>
<script>
import { validURL, validHostPort } from "@/utils/validate";
import Tool from "@/utils/tool";
import { mapState, mapActions } from "vuex";
import Title from "@/views/components/title";
import illustrate from "@/views/components/illustrate";
import pannel from "@/views/components/pannel";
const validateUrlPath = (rule, value, callback) => {
  if (!validURL(value)) {
    callback(new Error("url格式错误"));
  } else {
    callback();
  }
};

export default {
  name: "doc",
  computed: {
    // ...mapState("doc", ["notes"]),
  },
  components: {
    Title,
    illustrate,
    pannel,
  },
  mixins: [Tool],
  data() {
    return {
      titleArr: ["文档", "文档转换格式"],
      transferType: "normal",
      percentage: 10,
      customColor: "#FFFFFF",
      docForm: {
        srcpath: "",
        destpath: "",
        format: "pdf",
      },
      docRules: {
        srcpath: [
          { required: true, message: "请输入源文件地址", trigger: "blur" },
          { min: 10, message: "长度不少于10个字符", trigger: "blur" },
          // { required: true, trigger: "blur", validator: validateUrlPath },
        ],
        // destpath: [
          // { required: true, message: "请输入源文件地址", trigger: "blur" },
          // { min: 10, message: "长度不少于10个字符", trigger: "blur" },
          // { required: true, trigger: "blur", validator: validateUrlPath },
        // ],
        format: [
          {
            format: "array",
            required: true,
            message: "请至少选择一种格式",
            trigger: "change",
          },
        ],
      },
      docData: [
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
    writeDestpath(){
      this.docForm.destpath = this.docForm.srcpath + '.' + this.docForm.format;
    },
    submitForm(formName) {
      if(this.transferType != 'normal'){
        this.transferType = 'normal'
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let paramS3 = {};
            //判断是否为S3地址
          if (true) {
            const srchost1 = this.docForm.srcpath;
            const desthost1 = this.docForm.destpath
            const srchost = validHostPort(this.docForm.srcpath);
            const desthost = validHostPort(this.docForm.destpath);
            paramS3 = {
              srchost: srchost,
              desthost: desthost,
              srcpath:srchost1.substr(srchost1.match(srchost).index + srchost.length +1).replace('/',':'),
              destpath:desthost1.substr(desthost1.match(desthost).index + desthost.length +1).replace('/',':'),
            };
          }
          this.transferType = "progress";
          this.$store
            .dispatch("doc/convert", { ...this.docForm, ...paramS3 })
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
          return false;
        }
      });
    },
    endTransfer(){
       this.transferType = 'normal'
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
$docGreen: #17c5ca;
.doc {
  margin: 2vh 1vw;

  .green {
    background: $docGreen;
    min-height: 20vh;
  }
}
</style>