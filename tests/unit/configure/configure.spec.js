import { shallowMount } from "@vue/test-utils";
import CreativeForm from "@/creative-form/components/CreativeForm";

describe("props form into configure", () => {
  it("renders form when passed", () => {
    const wrapper = shallowMount(CreativeForm, {
      propsData: {
        // 模板数据
        original: {
          id: "",
          // 模板名称
          name: "",
          // 模板状态
          status: false,
          // 描述
          description: "",
          // 表单数据
          form: []
        }
      }
    });
    expect(wrapper.text()).toMatch("2213123");
  });
});
