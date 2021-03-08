<template>
  <div class="doc">
    <Title :data="titleArr"></Title>
    <el-row :gutter="12">
      <div class="green greyShadow padding21">
        <div class="dashBorder">
          <el-form ref="setForm" :model="setForm" label-width="10vw">
            <el-form-item  prop="ipPort"  label=" ip:port">
              <el-input v-model="setForm.ipPort" 
             placeholder="192.168.50.200:7480"></el-input>
            </el-form-item>
             <el-form-item prop="acceessKey"  label="acceess-key">
              <el-input v-model="setForm.acceessKey" placeholder="1f921791d114045ba2d1bb70f5b5546f"></el-input>
            </el-form-item>
             <el-form-item prop="secretKey"  label="secret-key">
              <el-input v-model="setForm.secretKey" placeholder="0c124b8ee8b781b1414decae57c4f9f2"></el-input>
            </el-form-item>
          </el-form>
          <div class="btnDiv">

          <el-button plain @click="resetForm('setForm')" size="medium">取消</el-button>
          <el-button plain  @click="submitForm('setForm')" size="medium">确定</el-button>
          </div>
        </div>
      </div>
    </el-row>
    <illustrate></illustrate>
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
export default {
  name: "setUp",
  computed: {
    ...mapState("setUp", ["setForm"]),
  },
  components: {
    Title,
    illustrate,
  },
  mixins: [Tool],
  data() {
    return {
      titleArr: ["存储设置", "修改您的存储方式"],
      form:{
        file:'',
        type:'.pdf',
      },
      dialogFormVisible: false,
      dialogForm: {
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
   submitForm(){

     this.$store.commit('setUp/setKey', this.setForm)
    this.$message.success('已添加到cookie');

   },
   resetForm(formName) {
    //  this[formName] = {};
 
   this.$nextTick(() => {
    this.$refs[formName].resetFields()
   });

        this.$refs[formName].resetFields();
      },
   showSuper() {
      this.dialogFormVisible = true;
    },
  },
};
</script>


<style lang="scss">
//@dialog
.el-dialog{
    width:30%;
}
.el-dialog__body{
    padding: 30px 5vw;
    .el-select{
      width:100%;
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