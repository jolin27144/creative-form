import ItemIcon from "../../../../config/ItemIcon";
import input from "../../../form/input/Input";
import checkbox from "../../../form/checkbox/CheckBox";
import radio from "../../../form/radio/Radio";
import select from "../../../form/select/Select";
import text from "../../../form/text/Text";
import cascader from "../../../form/cascader/Cascader";
import title from "../../../form/title/Title";
import hr from "../../../form/hr/Hr";
import p from "../../../form/p/P";
import uploads from "../../../form/upload/upload";
import datepicker from "../../../form/datepicker/DatePicker";
import signature from "../../../form/signature/Signature";
// import address from './control/Address';

// import trigger from "../../../../config/trigger";

const form_item = {
  title,
  hr,
  p,
  input,
  select,
  radio,
  checkbox,
  datepicker,
  cascader,
  // address,
  uploads,
  text,
  signature
};

const displayControl = (_self, sortableItem, name, value) => {
  // 默认不显示
  let display = false;
  for (let i in sortableItem) {
    // 循环出sortableItem内被关联字段并且其状态为显示并且其值与用户预设被关联字段值匹配
    // 不匹配,进行下一次判断
    if (sortableItem[i].obj.name != name || !sortableItem[i].obj.visibility) {
      continue;
    }
    // checkbox的value为数组, 判断是否存在  非数组直接比对字符串
    if (
      (Array.isArray(sortableItem[i].obj.value) &&
        sortableItem[i].obj.value.indexOf(value) >= 0) ||
      sortableItem[i].obj.value == value
    ) {
      display = true;
      // name唯一,已匹配则不必循环之后数据
      break;
    }
  }
  return display;
};

export default {
  name: "RenderToEditing",

  inheritAttrs: false,

  render(h) {
    var $this = this;
    // 获取当前控件渲染
    const arr =
      (form_item[this.ele.toLowerCase()] &&
        form_item[this.ele.toLowerCase()](this, h)) ||
      [];

    // 拥有绑定的值，需回填到控件
    this.$set(
      this.obj,
      "value",
      // typeof this.value !== "undefined" ? this.value : this.obj.value
      typeof this.value !== "undefined" ? this.value : this.obj.value
    );

    // 显示配置按钮并且控件允许被配置
    const item_icon =
      this.configIcon && this.obj.config ? ItemIcon(this, h) : [];

    // 已被绑定name,且require为必填,视为校验字段
    const validate = !!this.obj.name && !!this.obj.require;

    // 非 Title Hr P 需要FormItem
    if (!["title", "hr", "p"].includes(this.ele.toLowerCase())) {
      // 关联的组件判断是否展示
      if (
        this.obj.relation &&
        !displayControl(
          this,
          this.sortableItem,
          this.obj.relation_name,
          this.obj.relation_value
        )
      ) {
        // 隐藏该控件并设置该控件标记为隐藏
        this.$emit("changeVisibility", this.index, false);
        return h("span");
      }
      // 设置该控件标记为显示
      this.$emit("changeVisibility", this.index, true);
      return h(
        "FormItem",
        {
          class: {
            items: true,
            "sortable-items-required": validate
          },
          attrs: {
            // id: this.obj.label + $this.index
            id: this.obj.label
          },
          props: {
            label: this.obj.index
              ? this.obj.index + "." + (this.obj.label || this.ele) + ""
              : (this.obj.label || this.ele) + "",
            // 指定验证name
            prop: this.obj.name || "temp"
            // 验证规则
            // rules: {
            //   required: validate,
            //   message: this.obj.ruleError || "该项为必填项",
            //   trigger: trigger[this.obj.type],
            //   validator: (rule, value, callback) => {
            //     // 没有配置按钮并且允许验证
            //     if (
            //       !this.configIcon &&
            //       validate &&
            //       (Array.isArray(value) ? !value.length : !value)
            //     ) {
            //       callback(new Error("该项为必填项"));
            //     } else {
            //       callback();
            //     }
            //   }
            // }
          },
          on: {
            handleConfEle(val) {
              $this.$emit("handleConfEle", val);
            }
          },
          style: {
            // 是否显示行内元素
            display: this.obj.inlineBlock ? "inline-block" : "block",
            // 行内元素width为50%
            width: this.obj.inlineBlock ? "50%" : "auto"
          }
        },
        arr.concat(item_icon)
      );
    } else {
      this.$emit("changeVisibility", $this.index, true);
      return h(
        "div",
        {
          style: {
            position: "relative"
          },
          class: {
            items: true
          },
          attrs: {
            id: this.obj.label + $this.index
          },
          on: {
            click() {
              let data = {
                index: $this.index,
                id: $this.obj.label + $this.index
              };
              $this.$emit("handleConfEle", data);
            }
          }
        },
        arr.concat(item_icon)
      );
    }
  },

  props: {
    // 当前控件的类型
    ele: {
      type: String,
      default: "input"
    },
    // 当前控件的配置
    obj: {
      type: Object,
      default() {
        return {};
      }
    },
    // 当前控件的index,config 和 delete 会用到
    index: {
      type: Number,
      default: 0
    },
    // 整个表单的数据
    data: {
      type: Object,
      default() {
        return {};
      }
    },
    // 是否显示配置按钮
    configIcon: {
      type: Boolean,
      default: false
    },
    // 当前控件绑定的值 方便数据回填
    value: [String, Number, Array],
    // 当前被clone控件列表
    sortableItem: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
