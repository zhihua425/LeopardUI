<template>
  <div class="overview">
    <Title :data="titleArr"></Title>
    <el-row :gutter="12">
      <el-col :span="8">
        <div @click="turnTo('videos')">
        <el-card shadow="hover" class="red card greyShadow">
          <img :src="getImgUrl('video')" alt="" />
          <h3>音视频</h3>
          <p>音频视频转换格式</p>
        </el-card>
        </div>
      </el-col>
      <el-col :span="8">
        <div @click="turnTo('doc')">
        <el-card shadow="hover" class="coralGreen card greyShadow" >
          <img :src="getImgUrl('doc')" alt="" />
          <h3>文档</h3>
          <p>文档转换格式</p>
        </el-card>
        </div>
      </el-col>
      <el-col :span="8" >
        <div @click="turnTo('pictures')">
        <el-card shadow="hover" class="purple card greyShadow" >
          <img :src="getImgUrl('pic')" alt="" />
          <h3>图片</h3>
          <p>图片转换格式</p>
        </el-card>
        </div>
      </el-col>
    </el-row>
    <illustrate></illustrate>
  </div>
</template>
<script>
import Tool from "@/utils/tool";
import { mapState, mapActions } from "vuex";
import Title from "@/views/components/title";
import illustrate from '@/views/components/illustrate';
export default {
  name: "overview",
  computed: {
    ...mapState("overview", ["notes"]),
  },
  components: {
    Title,
    illustrate
  },
  mixins: [Tool],
  data() {
    return {
      titleArr: ["轻松转换文件格式", "简单好用的线上格式转换工具"],
    };
  },
  methods: {
    turnTo(key){
      this.$router.push("/home/" + key);
    }
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/common.scss";
@import "../../assets/variables.scss";
$white: #fff;
.overview {
  margin: 2vh 1vw;
  .card{
    color:$subMenuActiveText;
    padding-left:1vw;
    cursor: pointer;
  }
  .red{
    background:$red;
  }
  .coralGreen{
    background:$green;
  }
  .purple{
    background:$purple;
  }
  
}
</style>