<template>
  <div class="videos">
    <Title :data="titleArr"></Title>
    <el-row :gutter="12">
      <div class="green greyShadow padding21">
        <div class="dashBorder">
          <div v-if="transferType == 'normal'">
            <el-form ref="form" :model="form" :rules="rules" label-width="10vw">
              <el-form-item label="选择文件：" prop="srcpath">
                <el-input
                  v-model="form.srcpath"
                  :title="form.srcpath"
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
                  v-model="form.destpath"
                  :title="form.destpath"
                  :disabled="true"
                  placeholder="请输入地址(S3://IP: port/xxxxx或域名端口)"
                ></el-input>
              </el-form-item>
              <el-form-item label="选择格式：" prop="format" >
                <el-select v-model="form.format" placeholder="MP4" @change="writeDestpath($event)">
                  <el-option label="MP4" value="MP4"></el-option>
                  <el-option label="MP3" value="MP3"></el-option>
                  <el-option label="WMV" value="WMV"></el-option>
                  <el-option label="FLV" value="FLV"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="">
                <i class="el-icon-edit-outline superIcon"></i>
                <span class="super" @click="showSuper">高级选项</span>
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
            <el-button plain size="medium" @click="endTransfer">终止转换</el-button>
          </div>
          <div v-else-if="transferType == 'lose'" class="trans">
            <div><img :src="getImgUrlSvg('lose')" alt="" /></div>
            <p>转换失败</p>
            <el-button plain size="medium" @click="submitForm('form')"
              >继续转换</el-button
            >
          </div>
          <div v-else-if="transferType == 'success'" class="trans">
            <div><img :src="getImgUrlSvg('success')" alt="" /></div>
            <p>转换成功</p>
            <el-button plain size="medium" @click="submitForm('form')"
              >继续转换</el-button
            >
          </div>
        </div>
      </div>
    </el-row>
    <illustrate></illustrate>
    <pannel :data="videoData"></pannel>
    <el-dialog title="高级选项" :visible.sync="dialogFormVisible" width="45%">
      <el-form :model="DiaForm">
        <el-form-item
          label="视频编码格式:"
          prop="videocodec"
          :label-width="formLabelWidth"
        >
          <el-select
            v-model="DiaForm.videocodec"
            placeholder="请选择视频编码格式"
          >
            <el-option label="H264" value="H264"></el-option>
            <el-option label="MPEG4" value="MPEG4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="视频码率(bps):"
          prop="videobit"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="DiaForm.videobit"
            placeholder="默认为源视频码率"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="分辨率(宽px):"
          prop="width"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="DiaForm.width"
            placeholder="默认为源视频宽"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="分辨率(高px):"
          prop="height"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="DiaForm.height"
            placeholder="默认为源视频高, 设置宽而不设置高时保持源视频宽高比"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="音频编码格式:"
          prop="audiocodec"
          :label-width="formLabelWidth"
        >
          <el-select
            v-model="DiaForm.audiocodec"
            placeholder="请选择音频编码格式"
          >
            <el-option label="AAC" value="AAC"></el-option>
            <el-option label="MP3" value="MP3"></el-option>
            <el-option label="VORBIS" value="VORBIS"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="音频码率(bps):"
          prop="audiobit"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="DiaForm.audiobit"
            placeholder="默认为源视频码率"
            autocomplete="off"
          ></el-input>
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
  name: "videos",
  computed: {
    // ...mapState("video", ["no33ee4ew8tes"]),
  },
  components: {
    Title,
    illustrate,
    pannel,
  },
  mixins: [Tool],
  data() {
    return {
      titleArr: ["音视频转码", "音频视频转换格式"],
      transferType: "normal",
      percentage: 10,
      customColor: "#FFFFFF",
      form: {
        srcpath: "",
        destpath: "",
        format: "MP4",
      },
      rules: {
        srcpath: [
          { required: true, message: "请输入源文件地址", trigger: "blur" },
          { min: 10, message: "长度不少于10个字符", trigger: "blur" },
          // { required: true, trigger: "blur", validator: validateUrlPath },
        ],
        format: [
          {
            required: true,
            message: "请至少选择一种格式",
            trigger: "change",
          },
        ],
      },
      videoData: [
        "如何转换音视频格式",
        "选择需要转换的文件地址，选择要转换的格式，转换完成后将存入计算机原来的位置，过程就是如此简单快捷。",
        "如何转换音视频格式",
        "选择需要转换的文件地址，选择要转换的格式，转换完成后将存入计算机原来的位置，过程就是如此简单快捷。",
        "如何转换音视频格式",
        "选择需要转换的文件地址，选择要转换的格式，转换完成后将存入计算机原来的位置，过程就是如此简单快捷。",
      ],
      dialogFormVisible: false,
      DiaForm: {
        videocodec: "H264",
        videobit: "",
        audiocodec: "AAC",
        audiobit: "",
        width: "",
        height: "",
      },
      formLabelWidth: "120px",
    };
  },

  methods: {
    writeDestpath(){
      this.form.destpath = this.form.srcpath + '.' + this.form.format;
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
            const desthost1 = this.form.destpath
            const srchost = validHostPort(this.form.srcpath);
            const desthost = validHostPort(this.form.destpath);
            paramS3 = {
              srchost: srchost,
              desthost: desthost,
              srcpath:srchost1.substr(srchost1.match(srchost).index + srchost.length +1).replace('/',':'),
              destpath:desthost1.substr(desthost1.match(desthost).index + desthost.length +1).replace('/',':'),
            };
          }
          this.transferType = "progress";
          this.$store
            .dispatch("video/convert", { ...this.form,...this.DiaForm, ...paramS3 })
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
    showSuper() {
      this.dialogFormVisible = true;
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
$videos: #c52322;
.videos {
  margin: 2vh 1vw;

  .green {
    background: $videos;
    min-height: 20vh;
  }
}
</style>