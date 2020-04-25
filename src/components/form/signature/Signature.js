export default (_self, h) => {
  return [
    h(
      "vue-esign",
      {
        ref: "vue-esign"
        // props: {
        //   value: _self.obj.value || "-1"
        // },
        // on: {
        //   "on-change"(value) {
        //     if (!_self.obj.name) {
        //       return false;
        //     }
        //     _self.obj = Object.assign(_self.obj, {
        //       value
        //     });
        //     _self.$emit("handleChangeVal", value);
        //   }
        // }
      }
      // _self.obj.items.map(v => {
      //   return h(
      //     "Radio",
      //     {
      //       props: {
      //         label: v.label_value
      //       }
      //     },
      //     v.label_name
      //   );
      // })
    )
  ];
};

export const signatureConf = {
  // 对应数据库内类型
  type: "signature",
  // 是否可配置
  config: true,
  // 控件左侧label内容
  label: "单选",
  // 是否显示行内元素
  inlineBlock: false,
  // 是否必填
  require: true,
  // 绑定的值
  value: "",
  // 选项内数据
  items: [
    {
      label_value: true,
      label_name: "是"
    },
    {
      label_value: false,
      label_name: "否"
    }
  ],
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
  visibility: true
};
