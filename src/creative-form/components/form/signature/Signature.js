export default (_self, h) => {
  return [
    h(
      "div",
      {
        class: "esign-wrapper"
      },
      [
        h("img", {
          class: "esign-picture",
          attrs: {
            src: _self.obj.img || ""
          }
        }),
        h(
          "Button",
          {
            on: {
              click() {
                _self.obj.showEsign = true;
              }
            }
          },
          "开始签名"
        ),
        h(
          "Modal",
          {
            class: "vue-esign-modal",
            props: {
              value: _self.obj.showEsign
            },
            on: {
              "on-cancel"() {
                _self.obj.showEsign = false;
              }
            }
          },
          [
            h("vue-esign", {
              ref: "vue-esign"
            }),
            h("div", [
              h(
                "Button",
                {
                  on: {
                    click() {
                      _self.$refs["vue-esign"].reset();
                    }
                  }
                },
                "清除"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "primary"
                  },
                  on: {
                    click() {
                      _self.$refs["vue-esign"]
                        .generate()
                        .then(res => {
                          _self.obj.img = res;
                          _self.obj.showEsign = false;
                        })
                        .catch(() => {
                          _self.obj.img = "";
                          _self.obj.showEsign = false;
                        });
                    }
                  }
                },
                "确定"
              )
            ])
          ]
        )
      ]
    )
  ];
};

export const signatureConf = {
  // 对应数据库内类型
  type: "signature",
  // 是否可配置
  config: true,
  // 控件左侧label内容
  label: "签名",
  // 签名控件
  img: "",
  // 显示签名控件
  showEsign: false,
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
