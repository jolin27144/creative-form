<template>
  <div class="cfme">
    <div class="cfme-title">{{ template.name }}</div>
    <div class="cfme-divider"></div>
    <Form class="cfme-form">
      <MobileRenderer
        v-for="(item, index) in template.form"
        :key="item.ele + index"
        :ele="item.ele"
        :obj="item.obj"
      ></MobileRenderer>
      <Button class="cfme-form-submit" type="primary" @click="handleSubmit"
        >确认提交</Button
      >
    </Form>
  </div>
</template>

<script>
import MobileRenderer from "./renderer/mobile-renderer/MobileRenderer";
export default {
  name: "CreativeFormMobileEditor",
  components: { MobileRenderer },
  props: {
    template: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    handleSubmit() {
      this.$emit("editedTemplate", this.template);
    }
  }
};
</script>

<style lang="less">
@import "../assets/css/theme.less";
.cfme {
  height: 100%;
  &-title,
  &-form {
    padding: 10px;
  }
  &-title {
    position: relative;
    left: 20px;
    width: calc(100% - 20px);
    &:before {
      content: "";
      display: inline-block;
      position: absolute;
      left: 0;
      top: 15%;
      height: 70%;
      width: 4px;
      background: @primary-color;
    }
  }
  &-divider {
    display: block;
    height: 10px;
    background: #eee;
  }
  &-form {
    height: calc(100% - 51px);
    overflow: auto;

    &-submit {
      width: 100%;
    }
    .ivu-form-item {
      padding-bottom: 24px;
      border-bottom: 1px solid #eee;
    }
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
    .items {
      cursor: unset;
    }
    .ivu-checkbox-checked .ivu-checkbox-inner {
      border-color: #2d8cf0 !important;
      background-color: #2d8cf0 !important;
    }
  }
}
.vue-esign-modal {
  .ivu-modal-body {
    button {
      &:first-of-type {
        margin-right: 5%;
      }
      width: 45%;
    }
  }
  .ivu-modal-footer {
    height: 0;
    visibility: hidden;
  }
}
</style>
