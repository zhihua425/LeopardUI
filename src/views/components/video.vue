<template>
  <div class="videos">
    <Title :data="titleArr"></Title>
    <el-row :gutter="12">
      <div class="green greyShadow padding21">
        <div class="dashBorder">
          <div v-if="transferType == 'normal'">
            <el-form ref="form" :model="form" label-width="10vw">
              <el-form-item label="选择文件：">
                <el-input
                  v-model="form.file"
                  placeholder="请输入地址"
                ></el-input>
              </el-form-item>
              <el-form-item label="选择格式：">
                <el-select v-model="form.type" placeholder="">
                  <el-option label=".mp4" value="mp4"></el-option>
                  <el-option label=".mp3" value="mp3"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="">
                <i class="el-icon-edit-outline superIcon"></i>
                <span class="super" @click="showSuper">高级选项</span>
              </el-form-item>
            </el-form>
            <div class="btnDiv">
              <el-button plain @click="go" size="medium">开始转换</el-button>
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
            <el-button plain size="medium">终止转换</el-button>
          </div>
          <div v-else-if="transferType == 'lose'" class="trans">
            <div><img :src="getImgUrlSvg('lose')" alt=""></div>
            <p>转换失败</p>
            <el-button plain size="medium">继续转换</el-button>
          </div>
          <div v-else-if="transferType == 'success'" class="trans">
            <div><img :src="getImgUrlSvg('success')" alt=""></div>
            <p>转换成功</p>
            <el-button plain size="medium">继续转换</el-button>
          </div>
        </div>
      </div>
    </el-row>
    <illustrate></illustrate>
    <pannel :data="videoData"></pannel>
    <el-dialog title="高级选项" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="视频解析度：" :label-width="formLabelWidth">
          <el-input
            v-model="form.name"
            placeholder="请输入"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="视频码率：" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="已选择内容">
            <el-option label="码率一" value="shanghai"></el-option>
            <el-option label="码率二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="音频采样率：" :label-width="formLabelWidth">
          <el-input
            v-model="form.name"
            placeholder="请输入"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="音频码率：" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="已选择内容">
            <el-option label="码率一" value="shanghai"></el-option>
            <el-option label="码率二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="视频编码器：" :label-width="formLabelWidth">
          <el-input
            v-model="form.name"
            placeholder="请输入"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="音频编码器：" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="已选择内容">
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
import Tool from "@/utils/tool";
import { mapState, mapActions } from "vuex";
import Title from "@/views/components/title";
import illustrate from "@/views/components/illustrate";
import pannel from "@/views/components/pannel";
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
      percentage: "10",
      customColor: "#FFFFFF",
      form: {
        file: "",
        type: ".mp4",
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
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      formLabelWidth: "120px",
    };
  },
 
  methods: {
    go() {},
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
$videos: #c52322;
.videos {
  margin: 2vh 1vw;

  .green {
    background: $videos;
    min-height: 20vh;
  }
}
</style>