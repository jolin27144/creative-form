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
        id: "709394",
        // 模板名称
        name: "",
        // 模板状态
        status: false,
        // 描述
        description: "",
        // 表单数据
        form: [
          {
            ele: "checkbox",
            obj: {
              type: "checkbox",
              config: true,
              label: "多选",
              inlineBlock: false,
              require: true,
              value: [],
              items: [
                { label_value: "1", label_name: "选项1asdfa" },
                { label_value: "2", label_name: "选项2asdfasdf" }
              ],
              name: "多选0",
              ruleError: "该选项不能为空",
              relation: false,
              relation_name: "",
              relation_value: "",
              visibility: true,
              modalTitle: "多选",
              index: 1,
              loading: false,
              listIndex: 0
            }
          },
          {
            ele: "text",
            obj: {
              type: "textarea",
              config: true,
              label: "多行文本",
              placeholder: "",
              inlineBlock: false,
              maxLength: 200,
              require: true,
              maxRows: 5,
              value: "",
              name: "多行文本1",
              ruleError: "该字段不能为空",
              relation: false,
              relation_name: "",
              relation_value: "",
              visibility: true,
              modalTitle: "多行文本",
              index: 2
            }
          },
          {
            ele: "radio",
            obj: {
              type: "radio",
              config: true,
              label: "单选",
              inlineBlock: false,
              require: true,
              value: "",
              items: [
                { label_value: true, label_name: "是" },
                { label_value: false, label_name: "否" }
              ],
              name: "单选2",
              ruleError: "请选择",
              relation: false,
              relation_name: "",
              relation_value: "",
              visibility: true,
              modalTitle: "单选",
              index: 3
            }
          }
        ],
        // 签名图片
        signImage: ""
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
