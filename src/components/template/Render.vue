<template>
  <div>
    <Form
      id="render_body"
      class="render-body label-common-form"
      ref="formValidate"
      :model="formData"
      @submit.native.prevent
    >
      <renders
        v-for="(element, index) in templateForm"
        :key="index"
        :index="index"
        :ele="element.ele"
        :obj="element.obj || {}"
        :data="formData"
        @handleChangeVal="val => handleChangeVal(val, element)"
        @changeVisibility="changeVisibility"
        :value="formData[element.obj.name]"
        :sortableItem="templateForm"
      >
      </renders>
    </Form>
    <!--<div class="ivu-modal-footer">
            <Button @click="handleReset('formValidate')">取消</Button>
            <Button @click="handleSubmit('formValidate')">确定</Button>
        </div>-->
  </div>
</template>
<script>
// import ScrollBar from "perfect-scrollbar";
// import "perfect-scrollbar/css/perfect-scrollbar.css";
export default {
  data() {
    return {
      templateForm: [],
      formData: {}
    };
  },
  methods: {
    // 控件回填数据
    handleChangeVal(val, element) {
      this.$set(this.formData, element.obj.name, val);
      // this.formData[element.obj.name] = val;
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          window.localStorage.setItem(
            "templateForm",
            JSON.stringify(this.templateForm)
          );
          this.$Message.success("Success!");
          // this.$router.push('/preview');
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    // 更改当前渲染字段是否显示
    changeVisibility(index, visibility) {
      this.$set(this.templateForm[index].obj, "visibility", visibility);
    }
  },
  mounted() {
    /* eslint-disable */
    // new ScrollBar("#render_body");
  },
  created() {
    this.templateForm = JSON.parse(
      localStorage.getItem("templateForm") || "[]"
    );
    for (let i in this.templateForm) {
      this.$set(
        this.formData,
        this.templateForm[i].obj.name,
        this.templateForm[i].obj.value
      );
    }
  }
};
</script>
<style lang="less">
@import "~@/assets/css/configure.css";

.render-body {
  position: relative;
  max-height: 560px;
  padding: 20px;
  padding-right: 30px;
}
</style>
