<template>
  <div id="app">
    <CreativeForm :original="data" @output="handleOutput"></CreativeForm>
  </div>
</template>

<style lang="less">
@import "~@/assets/css/reset.css";
@import "~@/assets/css/table.css";
@import "~@/assets/css/modal.css";
@import "~@/assets/css/span.css";
@import "~@/assets/css/icon.css";
</style>
<script>
import CreativeForm from "./views/CreativeForm";
export default {
  components: { CreativeForm },
  data() {
    return {
      // 模板数据
      data: {
        id: "",
        // 模板名称
        name: "",
        // 模板状态
        status: false,
        // 描述
        description: "",
        // 表单数据
        form: []
      }
    };
  },
  methods: {
    handleOutput(val) {
      console.log(val);
    }
  }
};
</script>
