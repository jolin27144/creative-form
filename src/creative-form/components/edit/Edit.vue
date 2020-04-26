<template>
  <div class="configure-tool" id="configure_tool">
    <Form
      class="form_content"
      :label-width="130"
      :model="editingModalData"
      ref="editingModalData"
    >
      <FormItem
        label="标题："
        v-if="typeof editingModalData.label !== 'undefined'"
      >
        <i-input
          v-model="editingModalData.label"
          placeholder="请输入标题"
        ></i-input>
      </FormItem>
      <FormItem
        label="选项："
        v-if="
          editingModalData.type === 'radio' ||
            editingModalData.type === 'checkbox'
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
        label="提示语:"
        v-if="typeof editingModalData.placeholder !== 'undefined'"
      >
        <i-input
          v-model="editingModalData.placeholder"
          placeholder="请输入提示语"
        ></i-input>
      </FormItem>
      <FormItem
        label="必填："
        v-if="typeof editingModalData.require !== 'undefined'"
      >
        <Checkbox v-model="editingModalData.require">必填</Checkbox>
      </FormItem>
      <FormItem
        label="时间格式："
        v-if="typeof editingModalData.format !== 'undefined'"
      >
        <RadioGroup v-model="editingModalData.format">
          <Radio label="yyyy年MM月dd日"></Radio>
          <Radio label="yyyy-MM-dd HH:mm"></Radio>
        </RadioGroup>
      </FormItem>
    </Form>
    <div class="edit-footer">
      <Button
        type="primary"
        :loading="editingModalData.loading"
        @click="handleOk"
        >确定</Button
      >
      <Button @click="handleCancel">取消</Button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Edit",

  props: {
    show: Boolean,
    editingModalData: {
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
      this.radioCheckboxList = this.editingModalData.items.map(item => item);
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
      const index = this.editingModalData.listIndex;
      this.editingModalData.items = this.radioCheckboxList;
      this.sortable_item[index].obj = Object.assign(
        {},
        this.sortable_item[index].obj,
        this.editingModalData
      );
      this.handleCancel();
    }
  },

  created() {
    this.initRadioCheckboxList();
  }
};
</script>

<style scoped lang="less">
.edit {
  &-footer {
    display: flex;
    flex-direction: row-reverse;
    button {
      &:last-of-type {
        margin-right: 10px;
      }
    }
  }

  .ivu-input-wrapper {
    width: 85% !important;
    margin-right: 5%;
  }
}
</style>
