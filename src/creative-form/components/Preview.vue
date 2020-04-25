<template>
  <div>
    <Preview
      v-for="(item, index) in form"
      :key="item.ele + index"
      :ele="item.ele"
      :obj="item.obj"
    ></Preview>
  </div>
</template>
<script>
import Preview from "./preview/Preview";
export default {
  name: "CreativeFormPreviewer",
  components: { Preview },
  props: {
    form: {
      type: Array,
      default: () => {
        return [];
      }
    }
  }
};
</script>
