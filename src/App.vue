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
  name: "App",
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
            ele: "select",
            default: true,
            obj: {
              // 对应数据库内类型
              type: "select",
              // 是否可配置
              config: true,
              // 控件左侧label内容
              label: "需要整改镇街",
              placeholder: "选择需要整改镇街",
              // 是否显示行内元素
              inlineBlock: false,
              // 是否必填
              require: true,
              // 选项内数据
              items: [
                {
                  label_value: "大良",
                  label_name: "大良"
                }
              ],
              // 绑定的值
              value: "",
              // 表单name
              name: "",
              // 验证错误提示信息
              ruleError: "请选择",
              // 是否关联字段
              relation: false,
              // 关联字段name
              relation_name: "",
              // 关联字段value
              relation_value: "",
              // 是否被渲染
              visibility: true,
              //
              disable: true
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
