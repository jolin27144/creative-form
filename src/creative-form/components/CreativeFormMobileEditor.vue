<template>
  <div class="cfme">
    <!--    <div class="cfme-title">{{ template.name }}</div>-->
    <!--    <div class="cfme-divider"></div>-->
    <Form class="cfme-form">
      <template v-for="(item, index) in template.form">
        <template
          v-if="
            item.obj.label === '整改结束时间' ||
              item.obj.label === '整改开始时间' ||
              item.obj.label === '需要整改镇街'
          "
        >
          <MobileRenderer
            v-if="isVisible"
            :key="item.ele + index"
            :ele="item.ele"
            :obj="item.obj"
          ></MobileRenderer>
        </template>
        <template v-else>
          <MobileRenderer
            :key="item.ele + index"
            :ele="item.ele"
            :obj="item.obj"
          ></MobileRenderer>
        </template>
      </template>
      <Button class="cfme-form-submit" type="primary" @click="handleSubmit"
        >确认提交
      </Button>
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
  computed: {
    isVisible() {
      return (
        this.template.form.find(item => {
          return item.default && item.obj.label === "是否需要镇街核实企业整改";
        }).obj.value !== "0"
      );
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

  .ivu-form-item-label {
    /*text-align: left;*/
  }

  .ivu-input:hover,
  textarea.ivu-input:hover {
    border-color: #57a3f3 !important;
  }

  .ivu-btn-primary {
    background-color: #2d8cf0 !important;
    border-color: #2d8cf0 !important;
  }

  .ivu-radio-checked .ivu-radio-inner {
    border-color: #2d8cf0 !important;
  }

  .ivu-radio-inner::after {
    background-color: #2d8cf0 !important;
  }

  .ivu-checkbox-checked .ivu-checkbox-inner,
  .ivu-checkbox-indeterminate .ivu-checkbox-inner {
    background-color: @primary-color !important;
    border-color: @primary-color !important;
  }

  .ivu-modal-footer .ivu-btn {
    border-color: @primary-color !important;
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
