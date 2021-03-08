<template>
 <div class="queryDiv">
      <img :src="getImgUrl('query')" alt="">
      <span>API文档在线查看</span>
    </div>   
</template>
<script>
import Tool from "@/utils/tool";
export default {
    mixins: [Tool],
}
</script>
