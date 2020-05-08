<template>
  <div class="manage cf">
    <ul class="modal-tab">
      <li
        v-for="(item, index) in tabs.list"
        :class="[index === tabs.step ? 'on' : '']"
        :key="item.type + index"
        @click="handleSwitchTab(index)"
      >
        {{ item.name }}
      </li>
    </ul>
    <div class="btn-bar">
      <Button class="btn" @click="handlePreview">
        <Icon type="md-eye" />
        预览
      </Button>
      <Button type="primary" class="btn" @click="handleSave">
        <Icon type="md-checkmark" />
        完成
      </Button>
    </div>
    <div v-show="tabs.step === 0" class="modal-tab-step attribute">
      <div class="modal-tab-title">
        <h3>新增模版属性详情填写</h3>
      </div>
      <Form ref="form" :model="form" :rules="ruleValidate" :label-width="100">
        <FormItem label="模版名称" prop="name">
          <Input v-model="form.name" placeholder="请输入模版名称" />
        </FormItem>
        <FormItem label="模版描述" prop="notes">
          <Input
            v-model="form.notes"
            type="textarea"
            :autosize="{ minRows: 5, maxRows: 10 }"
            placeholder="描述"
          />
        </FormItem>
        <FormItem label="模版状态" prop="status">
          <RadioGroup v-model="form.status">
            <Radio label="启用">启用</Radio>
            <Radio label="停用">停用</Radio>
          </RadioGroup>
        </FormItem>
      </Form>
    </div>

    <Configure
      v-show="tabs.step === 1"
      class="modal-tab-step"
      :form="formForConfigure"
      :form-name="form.name"
      @change-name="handleChangeFormName"
    ></Configure>

    <div class="pop-modal" v-if="preview.flag">
      <div class="pop-content">
        <div class="pop-title">
          <span>{{ preview.title }}</span>
          <a class="ivu-modal-close" @click="handlePreviewClose">
            <i class="ivu-icon ivu-icon-ios-close"></i>
          </a>
        </div>
        <PreviewForm :template="outputData"></PreviewForm>
      </div>
    </div>
  </div>
</template>

<script>
// import ScrollBar from "perfect-scrollbar";
// import "perfect-scrollbar/css/perfect-scrollbar.css";
import Configure from "./configure/Configure";
import PreviewForm from "./CreativeFormPreviewer";
export default {
  name: "CreativeForm",
  components: {
    Configure,
    PreviewForm
  },
  props: {
    original: {
      type: Object,
      default: () => {
        return {
          id: "",
          // 模板名称
          name: "",
          // 模板状态
          status: false,
          // 描述
          description: "",
          // 表单数据
          form: []
        };
      }
    }
  },

  computed: {
    outputData() {
      return {
        ...this.form,
        form: this.formForConfigure
      };
    }
  },
  data() {
    return {
      // 新增
      tabs: {
        list: [
          { name: "模版属性", type: "attribute" },
          { name: "模版内容", type: "configure" }
        ],
        step: 0
      },
      // 新增属性
      form: {
        id: "",
        name: "",
        status: "",
        notes: ""
      },
      // 检验
      ruleValidate: {
        name: [
          {
            required: true,
            message: "模版名称不允许为空",
            trigger: "blur"
          }
        ],
        status: [{ required: true, message: "请选择状态", trigger: "change" }]
      },
      // 渲染表单
      formForConfigure: [],
      // 预览
      preview: {
        flag: false,
        title: "模版预览"
      }
    };
  },
  methods: {
    handleChangeFormName(str) {
      this.form.name = str;
    },
    handleSwitchTab(index) {
      this.tabs.step = index;
    },
    handlePreview() {
      this.preview.flag = true;
    },
    handlePreviewClose() {
      this.preview.flag = false;
    },
    handleReset() {},
    handleSave() {
      this.$emit("output", this.outputData);
    },
    // 组件内将Props Deep Clone 到Data
    initPropsIntoData() {
      this.form = Object.assign(
        {},
        {
          id: this.original.id,
          name: this.original.name,
          status: this.original.status,
          notes: this.original.notes
        }
      );
      this.formForConfigure = JSON.parse(JSON.stringify(this.original.form));
    }
  },

  created() {
    this.initPropsIntoData();
  }
};
</script>
<style lang="less">
@import "../assets/css/configure";
@import "../assets/css/theme.less";

.cf {
  .btn-bar {
    position: absolute;
    right: 16%;
    top: 90px;
    button {
      font-size: 16px;
      &:first-of-type {
        margin-right: 20px;
      }
    }
  }

  .modal-tab {
    &-title {
      margin-bottom: 20px;
      /*height: auto;*/
      &:after {
        .divider;
      }
      h3 {
        &:before {
          background-color: @primary-color;
        }
      }
    }

    li {
      &.on {
        &:before {
          background-color: @primary-color;
        }
      }
    }
  }

  .attribute {
    height: calc(100% - 40px);

    .ivu-form {
      padding: 0 140px;
    }
  }
  .ivu-form-item-label {
    /*text-align: left;*/
  }
  .ivu-input:hover,
  textarea.ivu-input:hover {
    border-color: #57a3f3 !important;
  }
  .ivu-btn-primary {
    background-color: #2d8cf0 !important;
    border-color: #2d8cf0 !important;
  }
  .ivu-radio-checked .ivu-radio-inner {
    border-color: #2d8cf0 !important;
  }
  .ivu-radio-inner::after {
    background-color: #2d8cf0 !important;
  }
  .ivu-checkbox-checked .ivu-checkbox-inner,
  .ivu-checkbox-indeterminate .ivu-checkbox-inner {
    background-color: @primary-color !important;
    border-color: @primary-color !important;
  }

  .ivu-modal-footer .ivu-btn {
    border-color: @primary-color!important;
  }

  a {
    color: #333;
  }
  a:active {
    color: #2b85e4;
  }
  a:hover {
    color: #57a3f3;
  }
}
</style>
