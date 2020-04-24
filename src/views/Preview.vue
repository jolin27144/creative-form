<template>
  <div>
    <preview
      v-for="(item, index) in templateForm"
      :key="index"
      :ele="item.ele"
      :obj="item.obj"
    ></preview>
  </div>
</template>
<script>
export default {
  data() {
    return {
      templateForm: []
    };
  },
  created() {
    this.templateForm = JSON.parse(
      localStorage.getItem("templateForm") || "[]"
    );
  }
};
</script>
