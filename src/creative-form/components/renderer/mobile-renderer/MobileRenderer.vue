<script>
import title from "../../../components/form/title/Title";
import hr from "../../../components/form/hr/Hr";
import p from "../../../components/form/p/P";
import input from "../../../components/form/input/Input";
import select from "../../../components/form/select/Select";
import radio from "../../../components/form/radio/Radio";
import checkbox from "../../../components/form/checkbox/CheckBox";
import datepicker from "../../../components/form/datepicker/DatePicker";
import cascader from "../../../components/form/cascader/Cascader";
import uploads from "../../../components/form/upload/upload";
import text from "../../../components/form/text/Text";
import signature from "../../../components/form/signature/Signature";

import {
  checkboxRules,
  dateRules,
  inputRules,
  radioRules,
  textAreaRules
} from "../../../config/validate";

const mapRulesForEl = {
  radio: radioRules,
  checkbox: checkboxRules,
  datepicker: dateRules,
  input: inputRules,
  textarea: textAreaRules
};
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
export default {
  name: "MobileRenderer",

  render(createElement) {
    const $this = this;

    // 获取当前控件Vnode 作为数组元素
    const arr =
      (form_item[this.ele.toLowerCase()] &&
        form_item[this.ele.toLowerCase()](this, createElement)) ||
      [];
    // 已被绑定name,且require为必填,视为校验字段
    const validate = !!this.obj.name && !!this.obj.require;
    // 非 Title Hr P 需要FormItem
    if (!["title", "hr", "p"].includes(this.ele.toLowerCase())) {
      // 关联的组件判断是否展示
      // if (
      //   this.obj.relation &&
      //   !displayControl(
      //     this,
      //     this.sortableItem,
      //     this.obj.relation_name,
      //     this.obj.relation_value
      //   )
      // ) {
      //   // 隐藏该控件并设置该控件标记为隐藏
      //   this.$emit("changeVisibility", this.index, false);
      //   return createElement("span");
      // }
      // 设置该控件标记为显示
      this.$emit("changeVisibility", this.index, true);
      return createElement(
        "FormItem",
        {
          class: {
            items: true,
            "sortable-items-required": validate
          },
          attrs: {
            id: this.obj.label + $this.index
          },
          props: {
            label: this.obj.index
              ? this.obj.index + "." + (this.obj.label || this.ele) + ""
              : (this.obj.label || this.ele) + "",
            // 指定验证name
            prop: this.obj.label || "temp",
            // 验证规则
            rules: {
              required: validate,
              ...mapRulesForEl[this.ele],
              // message: this.obj.ruleError || "该项为必填项",
              // trigger: trigger[this.obj.type],
              validator: (rule, value, callback) => {
                value = this.obj.value;
                debugger;
                // 没有配置按钮并且允许验证
                if (
                  !this.configIcon &&
                  validate &&
                  (Array.isArray(value) ? !value.length : !value)
                ) {
                  callback(new Error("该项为必填项"));
                } else {
                  callback();
                }
              }
            }
          },
          on: {
            handleConfEle(val) {
              $this.$emit("handleConfEle", val);
            },
            showEsign() {
              this.showEsign = true;
            }
          },
          style: {
            // 是否显示行内元素
            display: this.obj.inlineBlock ? "inline-block" : "block",
            // 行内元素width为50%
            width: this.obj.inlineBlock ? "50%" : "auto"
          }
        },
        arr
      );
    } else {
      return createElement("div");
    }
  },

  props: {
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
    }
  }
};
</script>

<style scoped></style>
