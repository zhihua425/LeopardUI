<template>
  <div class="title">
    <h1>{{ data[0] }}</h1>
    <h4>{{ data[1] }}</h4>
  </div>
</template>
<script>
export default {
  props: ["data"],
};
</script>
<style lang="scss">
.title {
  text-align: center;
  margin: 5vh auto;
  h1 {
    color: rgba(0, 0, 0, 0.85);
    letter-spacing: 2px;
    font-family: "PingFangSC-Medium";
    font-size: 2rem;
  }
  h4 {
    font-size: 1.3rem;
    color: rgba(0, 0, 0, 0.65);
    letter-spacing: 2px;
    font-family: "PingFangSC-Regular";
  }
}
</style>