<script>
import draggable from "vuedraggable";
const getVnode = (createElement, list) => {
  let radioOrCheckboxVnode = [];
  let textOrInputVnode = [];
  let otherVnode = [];
  list.forEach(item => {
    if (item.ele === "radio" || item.ele === "checkbox") {
      radioOrCheckboxVnode.push(
        createElement("div", { class: "item" }, [
          createElement("Icon", {
            class: "item-icon",
            props: {
              type: item.ele === "radio" ? "md-radio-button-on" : "md-checkbox"
            }
          }),
          createElement("span", item.ele === "radio" ? "单选" : "多选")
        ])
      );
    } else if (item.ele === "text" || item.ele === "input") {
      textOrInputVnode.push(
        createElement("div", { class: "item" }, [
          createElement("i", {
            class: [item.ele === "text" ? "item-icon-text" : "item-icon-input"]
          }),
          createElement("span", item.ele === "input" ? "单行文本" : "多行文本")
        ])
      );
    } else {
      otherVnode.push(
        createElement("div", { class: "item" }, [
          createElement("Icon", {
            class: [
              item.ele === "datepicker"
                ? "item-icon-datepicker"
                : "item-icon-signature"
            ]
          }),
          createElement(
            "span",
            item.ele === "datepicker" ? "时间控件" : "电子签名"
          )
        ])
      );
    }
  });
  return [
    createElement("div", { class: "render-to-draggable-item" }, [
      createElement("p", { class: "item-title" }, "选择题"),
      createElement(
        "draggable",
        {
          props: {
            list: list.filter(
              item => item.ele === "radio" || item.ele === "checkbox"
            ),
            clone: original => {
              return JSON.parse(JSON.stringify(original));
            },
            options: {
              "ghost-class": "ghost",
              animation: "0",
              group: { name: "shared", pull: "clone", revertClone: false },
              sort: false
            }
          }
        },
        [...radioOrCheckboxVnode]
      )
    ]),

    createElement("div", { class: "render-to-draggable-item" }, [
      createElement("p", { class: "item-title" }, "填空题"),
      createElement(
        "draggable",
        {
          props: {
            list: list.filter(
              item => item.ele === "input" || item.ele === "text"
            ),
            clone: original => {
              return JSON.parse(JSON.stringify(original));
            },
            options: {
              "ghost-class": "ghost",
              animation: "0",
              group: { name: "shared", pull: "clone", revertClone: false },
              sort: false
            }
          }
        },
        [...textOrInputVnode]
      )
    ]),

    createElement("div", { class: "render-to-draggable-item" }, [
      createElement("p", { class: "item-title" }, "其他"),
      createElement(
        "draggable",
        {
          props: {
            list: list.filter(
              item => item.ele === "datepicker" || item.ele === "signature"
            ),
            clone: original => {
              return JSON.parse(JSON.stringify(original));
            },
            options: {
              "ghost-class": "ghost",
              animation: "0",
              group: { name: "shared", pull: "clone", revertClone: false },
              sort: false
            }
          }
        },
        [...otherVnode]
      )
    ])
  ];
};
export default {
  name: "RenderToDraggable",

  components: {
    draggable
  },

  render(h) {
    return h("div", { class: "render-to-draggable" }, getVnode(h, this.list));
  },

  props: {
    list: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style scoped lang="less">
@import "../../../../assets/css/theme.less";

.render-to-draggable {
  padding: 20px;
  &-item {
    overflow: hidden;
    .item-title {
      font-size: 18px;
      font-weight: 500;
    }
    .item {
      float: left;
      width: 50%;
      display: flex;
      align-items: center;
      padding: 10px 0 20px;
      cursor: pointer;
      i {
        margin-right: 10px;
      }
    }
    .ivu-icon {
      color: @primary-color;
      font-size: 16px;
    }
    .item-icon-text,
    .item-icon-input,
    .item-icon-datepicker,
    .item-icon-signature {
      display: inline-block;
      width: 16px;
      height: 16px;
    }
    .item-icon-text {
      background: url("../../../../assets/img/icon/render-to-draggable/text-draggable.png")
        center no-repeat;
    }
    .item-icon-input {
      background: url("../../../../assets/img/icon/render-to-draggable/input-draggable.png")
        center no-repeat;
    }
    .item-icon-datepicker {
      background: url("../../../../assets/img/icon/render-to-draggable/date-draggable.png")
        center no-repeat;
    }
    .item-icon-signature {
      background: url("../../../../assets/img/icon/render-to-draggable/singature-draggable.png")
        center no-repeat;
    }
  }
}
</style>
