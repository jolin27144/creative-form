import CreativeForm from "./components/CreativeForm";
import CreativeFormPreviewer from "./components/Preview";

const componentsToExport = [CreativeForm, CreativeFormPreviewer];

const install = function(Vue) {
  componentsToExport.forEach(component => {
    Vue.component(component.name, component);
  });
};

/* 支持使用标签的方式引入 */
if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export default {
  install
};

export { default as CreativeForm } from "./components/CreativeForm";
export { default as CreativeFormPreviewer } from "./components/Preview";
