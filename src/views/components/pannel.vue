<template>
  <div class="pannel">
    <el-row :gutter="24" class="flex">
      <el-col :span="8">
        <el-card>
          <h5 style="text-align: center">{{ data[0] }}</h5>
          <p style="text-indent: 2em">{{ data[1] }}</p>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <h5 style="text-align: center">{{ data[2] }}</h5>
          <p style="text-indent: 2em">{{ data[3] }}</p>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <h5 style="text-align: center">{{ data[4] }}</h5>
          <p style="text-indent: 2em">{{ data[5] }}</p>
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