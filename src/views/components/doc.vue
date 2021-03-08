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
              <el-form-item label="选择文件：" ref="srcpath" prop="srcpath">
                <el-input
                  v-model="docForm.srcpath"
                  placeholder="请输入地址(S3://IP: port/xxxxx或域名端口)"
                ></el-input>
              </el-form-item>
              <el-form-item
                label="转码后文件路径："
                ref="destpath"
                prop="destpath"
              >
                <el-input
                  v-model="docForm.destpath"
                  placeholder="请输入地址(S3://IP: port/xxxxx或域名端口)"
                ></el-input>
              </el-form-item>
              <el-form-item label="选择格式：" prop="format">
                <el-select v-model="docForm.format" placeholder="">
                  <el-option label="pdf" value="pdf"></el-option>
                  <el-option label="txt" value="txt"></el-option>
                  <el-option label="doc" value="doc"></el-option>
                  <el-option label="docx" value="docx"></el-option>
                  <el-option label="ppt" value="ppt"></el-option>
                  <el-option label="pptx" value="pptx"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="">
                <i class="el-icon-edit-outline superIcon"></i>
                <span class="super" @click="showSuper">高级选项</span>
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
    <el-dialog title="高级选项" :visible.sync="dialogFormVisible">
      <el-form :model="formDia">
        <el-form-item label="视频解析度：" :label-width="formLabelWidth">
          <el-input
            v-model="formDia.name"
            placeholder="请输入"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="视频码率：" :label-width="formLabelWidth">
          <el-select v-model="formDia.region" placeholder="已选择内容">
            <el-option label="码率一" value="shanghai"></el-option>
            <el-option label="码率二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="音频采样率：" :label-width="formLabelWidth">
          <el-input
            v-model="formDia.name"
            placeholder="请输入"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="音频码率：" :label-width="formLabelWidth">
          <el-select v-model="formDia.region" placeholder="已选择内容">
            <el-option label="码率一" value="shanghai"></el-option>
            <el-option label="码率二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="视频编码器：" :label-width="formLabelWidth">
          <el-input
            v-model="formDia.name"
            placeholder="请输入"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="音频编码器：" :label-width="formLabelWidth">
          <el-select v-model="formDia.region" placeholder="已选择内容">
            <el-option label="码率一" value="shanghai"></el-option>
            <el-option label="码率二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>
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
          { required: true, trigger: "blur", validator: validateUrlPath },
        ],
        destpath: [
          { required: true, message: "请输入源文件地址", trigger: "blur" },
          { min: 10, message: "长度不少于10个字符", trigger: "blur" },
          { required: true, trigger: "blur", validator: validateUrlPath },
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
      docData: [
        "如何转换音视频格式",
        "选择需要转换的文件地址，选择要转换的格式，转换完成后将存入计算机原来的位置，过程就是如此简单快捷。",
        "如何转换音视频格式",
        "选择需要转换的文件地址，选择要转换的格式，转换完成后将存入计算机原来的位置，过程就是如此简单快捷。",
        "如何转换音视频格式",
        "选择需要转换的文件地址，选择要转换的格式，转换完成后将存入计算机原来的位置，过程就是如此简单快捷。",
      ],
      dialogFormVisible: false,
      formDia: {
        file: false,
        type: [],
        name: "",
        region: "",
      },
      formLabelWidth: "120px",
    };
  },
  methods: {
    submitForm(formName) {
      if(this.transferType != 'normal'){
        this.transferType = 'normal'
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let paramS3 = {};
            //判断是否为S3地址
          if (true) {
            const srchost = validHostPort(this.docForm.srcpath);
            const desthost = validHostPort(this.docForm.destpath);
            paramS3 = {
              srchost: srchost,
              desthost: desthost,
            };
          }
          this.transferType = "progress";
          // setTimeout(() => {
          //   this.transferType = "success";
          // }, 1000);
          // setTimeout(() => {
          //   this.transferType = "lose";
          // }, 2000);
          this.$store
            .dispatch("doc/convert", { ...this.docForm, ...paramS3 })
            .then(() => {
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
    showSuper() {
      this.dialogFormVisible = true;
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