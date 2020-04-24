<template>
  <div class="configure-tool" id="configure_tool">
    <Form
      class="form_content"
      :label-width="130"
      :model="modalFormData"
      ref="modalFormData"
    >
      <FormItem
        label="控件名称："
        v-if="typeof modalFormData.label !== 'undefined'"
      >
        <i-input
          v-model="modalFormData.label"
          placeholder="请输入控件名称"
        ></i-input>
      </FormItem>
      <FormItem
        label="选项："
        v-if="
          modalFormData.type === 'radio' || modalFormData.type === 'checkbox'
        "
      >
        <div v-for="item in radioCheckboxList" :key="item.label_value">
          <i-input v-model="item.label_name" placeholder=""></i-input>
          <i-button @click="radioCheckboxRemove(item.label_value)"
            >删除</i-button
          >
        </div>
        <i-button @click="radioCheckboxAdd()">添加</i-button>
      </FormItem>
      <FormItem
        label="placeholder："
        v-if="typeof modalFormData.placeholder !== 'undefined'"
      >
        <i-input
          v-model="modalFormData.placeholder"
          placeholder="请输入placeholder"
        ></i-input>
      </FormItem>
      <FormItem
        label="是否必填："
        v-if="typeof modalFormData.require !== 'undefined'"
      >
        <Checkbox v-model="modalFormData.require">必填</Checkbox>
      </FormItem>
      <FormItem
        label="时间格式："
        v-if="typeof modalFormData.format !== 'undefined'"
      >
        <RadioGroup v-model="modalFormData.format">
          <Radio label="yyyy年MM月dd日"></Radio>
          <Radio label="yyyy-MM-dd HH:mm"></Radio>
        </RadioGroup>
      </FormItem>
    </Form>
    <div slot="footer">
      <Button type="text" @click="handleCancel">取消</Button>
      <Button type="primary" :loading="modalFormData.loading" @click="handleOk"
        >确定</Button
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "Edit",

  props: {
    show: Boolean,
    modalFormData: {
      type: Object,
      default: () => {}
    },
    sortable_item: {
      type: Object,
      default: () => {}
    }
  },

  data() {
    return {
      // radio
      radioCheckboxList: [
        {
          label_value: (new Date().getTime() / 1000).toString(),
          label_name: ""
        }
      ]
    };
  },

  methods: {
    initRadioCheckboxList() {
      this.radioCheckboxList = this.modalFormData.items.map(item => item);
    },
    // 根据label_value判断要删除的项
    radioCheckboxRemove(label_value) {
      this.radioCheckboxList.forEach((item, index) => {
        item.label_value === label_value &&
          this.$delete(this.radioCheckboxList, index);
      });
    },
    // radioCheckbox
    radioCheckboxAdd() {
      this.radioCheckboxList.push({
        label_value: (new Date().getTime() / 1000).toString(),
        label_name: ""
      });
    },
    // modal点击取消执行事件，清空当前modal内容
    handleCancel() {
      this.$emit("update:show", false);
    },
    // modal点击确定执行事件
    handleOk() {
      const index = this.modalFormData.listIndex;
      this.modalFormData.items = this.radioCheckboxList;
      this.sortable_item[index].obj = Object.assign(
        {},
        this.sortable_item[index].obj,
        this.modalFormData
      );
      this.handleCancel();
    }
  },

  created() {
    this.initRadioCheckboxList();
  }
};
</script>

<style scoped></style>
