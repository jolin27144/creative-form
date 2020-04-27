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
      phone: true,

      // 模板数据
      data: {
        id: "709394",
        name: "测试标题",
        status: false,
        description: "",
        form: [
          {
            ele: "signature",
            obj: {
              type: "signature",
              config: true,
              label: "签名",
              img: "",
              showEsign: false,
              inlineBlock: false,
              require: true,
              value: "",
              items: [
                { label_value: true, label_name: "是" },
                { label_value: false, label_name: "否" }
              ],
              name: "签名0",
              ruleError: "请选择",
              relation: false,
              relation_name: "",
              relation_value: "",
              visibility: true,
              index: 1
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
              value: "1",
              items: [
                { label_value: "1", label_name: "是" },
                { label_value: "0", label_name: "否" }
              ],
              name: "单选1",
              ruleError: "请选择",
              relation: false,
              relation_name: "",
              relation_value: "",
              visibility: true,
              index: 2
            }
          },
          {
            ele: "checkbox",
            obj: {
              type: "checkbox",
              config: true,
              label: "多选",
              inlineBlock: false,
              require: true,
              value: ["2"],
              items: [
                { label_value: "1", label_name: "选项1" },
                { label_value: "2", label_name: "选项2" }
              ],
              name: "多选2",
              ruleError: "该选项不能为空",
              relation: false,
              relation_name: "",
              relation_value: "",
              visibility: true,
              index: 3
            }
          },
          {
            ele: "input",
            obj: {
              type: "input",
              config: true,
              label: "单行文本",
              placeholder: "",
              inlineBlock: false,
              require: true,
              maxLength: 400,
              items: [{ label_value: null, label_name: "" }],
              value: "dfasfasdfadsfasf",
              name: "单行文本3",
              ruleError: "该字段不能为空",
              relation: false,
              relation_name: "",
              relation_value: "",
              visibility: true,
              index: 4
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
              value: "asdfdsafasfsdafasdfsafdsfsfdasf",
              name: "多行文本4",
              ruleError: "该字段不能为空",
              relation: false,
              relation_name: "",
              relation_value: "",
              visibility: true,
              index: 5
            }
          },
          {
            ele: "datepicker",
            obj: {
              type: "datepicker",
              config: true,
              label: "时间控件",
              placeholder: "",
              inlineBlock: false,
              require: true,
              name: "时间控件5",
              value: "2020年04月14日",
              ruleError: "选项不能为空",
              relation: false,
              relation_name: "",
              relation_value: "",
              visibility: true,
              format: "yyyy年MM月dd日",
              index: 6
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
