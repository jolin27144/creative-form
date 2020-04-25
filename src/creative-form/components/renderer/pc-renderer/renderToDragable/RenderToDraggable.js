// const map = {
//   radio: "radio",
//   checkbox: "",
//   input: "",
//   textarea: "",
//   datepicker: "",
//   signature: ""
// };
export default {
  name: "RenderToDraggable",

  render(h) {
    return h("div", this.item.obj.type);
  },

  props: {
    item: {
      type: Object,
      default: () => {}
    }
  }
};
