<template>
  <!--    <Preview-->
  <!--      v-for="(item, index) in form"-->
  <!--      :key="item.ele + index"-->
  <!--      :ele="item.ele"-->
  <!--      :obj="item.obj"-->
  <!--    ></Preview>-->
  <div class="cf-previewer">
    <div class="pop-content">
      <div class="pop-title">
        <span>{{ template.name }}</span>
        <a class="ivu-modal-close" @click="close">
          <i class="ivu-icon ivu-icon-ios-close"></i>
        </a>
      </div>
      <Form class="cf-previewer-form" id="cf-previewer-form">
        <PreviewRenderer
          v-for="(element, index) in template.form"
          :key="element.ele + index"
          :index="index"
          :ele="element.ele"
          :obj="element.obj || {}"
        >
        </PreviewRenderer>
      </Form>
    </div>
  </div>
</template>
<script>
// import Preview from "./preview/Preview";
import ScrollBar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import PreviewRenderer from "./preview/PreviewRenderer";
export default {
  name: "CreativeFormPreviewer",
  components: { PreviewRenderer },
  // components: { Preview },
  props: {
    template: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    close() {
      this.$emit("close");
    }
  },
  mounted() {
    /* eslint-disable */
    new ScrollBar("#cf-previewer-form");
  }
};
</script>

<style scoped lang="less">
.cf-previewer {
  &-form {
    position: relative;
    padding: 20px;
    max-height: 700px;
    &:before {
      content: "";
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      display: block;
      background: transparent;
      z-index: 1;
    }
  }
}
</style>

<style lang="less">
@import "../assets/css/theme.less";
.cf-previewer {
  .pop-title {
    background: @primary-color;
    span {
      font-size: 18px;
    }
  }
  &-form {
    .ivu-form-item-label {
      font-size: 16px !important;
      font-weight: 500;
      color: #333;
      text-align: left;
      margin: 0 0 10px;
      box-sizing: border-box;
      display: block;
      float: none;
    }
    .ivu-form-item {
      position: relative;
      &:before {
        content: "";
        display: block;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 2;
      }
    }
    .items {
      cursor: unset;
    }
  }
}
</style>
