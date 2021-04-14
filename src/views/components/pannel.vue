<template>
  <div class="pannel">
    <el-row :gutter="24" class="flex">
      <el-col :span="8">
        <el-card>
          <h5 style="text-align: center">Step 1</h5>
          <p>
            输入S3 存储中文件的地址
            <br />例如:<br />http://192.168.1.10:9000/mybucket/sample.wmv
          </p>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <h5 style="text-align: center">Step 2</h5>
          <p>
            选择需要转换的文件格式 <br />
            音视频转码还额外支持更复杂的高级选项 <br />通过 API
            调用可以支持更多更丰富的功能，请参考API文档
          </p>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <h5 style="text-align: center">Step 3</h5>
          <p>点击转换按钮 <br />转换成功后的文件会自动存储在原S3相同目录下</p>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  props: ["data"],
};
</script>
<style lang="scss" scoped>
.pannel {
  .el-card {
    .el-card__body {
      p {
        height: 9vh;
        margin-left: 2rem;
        line-height: 2.5vh;
        margin-right: 2rem;
        word-wrap: break-word;
      }
    }
  }
}
</style>