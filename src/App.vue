<template>
  <div id="app">
    <CreativeForm
      v-show="!phone"
      :original="data"
      @output="handleOutput"
    ></CreativeForm>
    <CreativeFormMobileEditor
      v-show="phone"
      :template="data"
    ></CreativeFormMobileEditor>
  </div>
</template>

<style lang="less">
@import "~@/creative-form/assets/css/reset.css";
@import "~@/creative-form/assets/css/table.css";
@import "~@/creative-form/assets/css/modal.css";
@import "~@/creative-form/assets/css/span.css";
@import "~@/creative-form/assets/css/icon.css";
</style>
<script>
export default {
  data() {
    return {
      phone: false,

      // 模板数据
      data: {
        id: "709394",
        name: "测试标题",
        status: false,
        description: "这是描述描述",
        form: [
          {
            ele: "radio",
            default: true,
            obj: {
              type: "radio",
              config: false,
              label: "是否需要镇街核实企业整改",
              inlineBlock: false,
              require: true,
              value: "",
              items: [
                { label_value: "1", label_name: "是" },
                { label_value: "0", label_name: "否" }
              ],
              name: "是否需要镇街核实企业整改0",
              ruleError: "请选择",
              relation: false,
              relation_name: "",
              relation_value: "",
              visibility: true,
              index: 1,
              loading: false,
              listIndex: 1
            }
          },
          {
            ele: "datepicker",
            default: true,
            obj: {
              type: "datepicker",
              config: false,
              label: "整改开始时间",
              placeholder: "请选择整改开始时间",
              inlineBlock: false,
              require: true,
              name: "整改开始时间1",
              value: "",
              ruleError: "选项不能为空",
              relation: false,
              relation_name: "",
              relation_value: "",
              visibility: true,
              format: "yyyy年MM月dd日",
              index: 2,
              loading: false,
              listIndex: 2,
              items: [{ label_value: "1588844338.757", label_name: "" }]
            }
          },
          {
            ele: "datepicker",
            default: true,
            obj: {
              type: "datepicker",
              config: false,
              label: "整改结束时间",
              placeholder: "请选择整改结束时间",
              inlineBlock: false,
              require: true,
              name: "整改结束时间2",
              value: "",
              ruleError: "选项不能为空",
              relation: false,
              relation_name: "",
              relation_value: "",
              visibility: true,
              format: "yyyy年MM月dd日",
              index: 3,
              loading: false,
              listIndex: 3,
              items: [{ label_value: "1588844370.679", label_name: "" }]
            }
          }
        ]
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

<style>
#app {
  height: 100%;
}
</style>
