<template>
  <div class="container">
    <div class="modal-tab-title">
      <h3>模版内容编辑区域</h3>
    </div>
    <main class="container-main">
      <div class="sortable-container">
        <ul class="sortable-container--tabs">
          <li @click="isOutline = false" :class="{ active: !isOutline }">
            题型选择
          </li>
          <li @click="isOutline = true" :class="{ active: isOutline }">大纲</li>
        </ul>
        <ul v-show="isOutline" class="sortable-container--outline">
          <li v-for="(item, index) in form" :key="item.obj.label + index">
            <a :href="`#${item.obj.label}`">
              {{ `${++index}.${item.obj.label}` }}
            </a>
          </li>
        </ul>
        <Form :label-width="80" v-show="!isOutline">
          <RenderToDraggable :list="formList"></RenderToDraggable>
        </Form>
      </div>
      <div class="sortable-item b-a">
        <Form
          ref="formValidate"
          id="sortable_form"
          class="sortable-form"
          :model="formData"
          @submit.native.prevent
        >
          <div
            class="form-title"
            v-if="!nameEditor.active"
            @click="nameEditor.active = true"
          >
            {{ nameEditor.msg || "请输入模板名称" }}
          </div>
          <div class="update-name" v-else>
            <Input
              :value="nameEditor.msg"
              @input="handleNameEditorInput"
              placeholder="请输入模版名称"
              class="update-name-input"
            />
            <Button @click="nameEditor.active = false">确定</Button>
          </div>
          <draggable
            class="draggable-div"
            :list="sortable_item"
            ghost-class="ghost"
            :animation="0"
            :group="{ put: ['shared'] }"
          >
            <transition-group
              class="form-list-group label-common-form"
              type="transition"
              name="flip-list"
              tag="div"
            >
              <RenderToEditing
                @handleRemoveEle="removeEle"
                @handleConfEle="confEle"
                @changeVisibility="changeVisibility"
                v-for="(element, index) in sortable_item"
                :key="element.ele + index"
                :index="index"
                :ele="element.ele"
                :obj="element.obj || {}"
                :data="formData"
                @handleChangeVal="val => handleChangeVal(val, element)"
                :sortableItem="sortable_item"
                :config-icon="true"
                @showEsign="showEsign = true"
                :esign-pictrue="esignPictrue"
              >
              </RenderToEditing>
            </transition-group>
          </draggable>
          <Edit
            v-if="showEditingModal"
            :show.sync="showEditingModal"
            :sortable_item="sortable_item"
            :editingModalData.sync="editingModalData"
          ></Edit>
        </Form>
      </div>
    </main>
  </div>
</template>
<script>
import draggable from "vuedraggable";
import formList from "../../config/FormList";
import RenderToEditing from "../renderer/pc-renderer/renderToEditing/RenderToEditing";
import Edit from "../edit/Edit";
import RenderToDraggable from "../renderer/pc-renderer/renderToDragable/RenderToDraggable.vue";
import ScrollBar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";

export default {
  components: {
    RenderToDraggable,
    Edit,
    draggable,
    RenderToEditing
  },
  props: {
    form: Array,
    formName: String
  },

  watch: {
    showEditingModal(val) {
      if (!val) {
        this.handleCancel();
      }
    },

    formName(val) {
      this.nameEditor.msg = val;
    }
  },

  data() {
    return {
      // 可配置控件
      formList: formList,
      // 生成的控件
      sortable_item: [],
      // 编辑模态框
      showEditingModal: false,
      // 填入编辑模态框的数据
      editingModalData: {
        color: "",
        loading: false
      },
      // 引用 props passed form
      formData: {},
      // 编辑标题
      nameEditor: {
        active: false,
        msg: this.formName
      },
      showEsign: false,
      esignPictrue: "",
      isOutline: false
    };
  },
  methods: {
    handleEsignOk() {
      this.handleEsignCancel();
    },
    handleEsignCancel() {
      this.showEditingModal = false;
    },

    // 控件回填数据
    handleChangeVal(val, element) {
      this.$set(this.formData, element.obj.name, val);
    },
    // https://github.com/SortableJS/Vue.Draggable#clone
    // 克隆,深拷贝对象
    cloneData(original) {
      // 添加一个modal标题
      original.obj.modalTitle = original.obj.label || "";
      // 深拷贝对象，防止默认空对象被更改
      return JSON.parse(JSON.stringify(original));
    },
    // 显示modal,配置被克隆控件
    confEle(data) {
      this.showEditingModal = false;
      this.editingModalData = {
        // color: "",
        loading: false
      };
      const listTemp = Object.assign({}, this.sortable_item[data.index]);
      for (let i in listTemp.obj) {
        this.editingModalData[i] = listTemp.obj[i];
      }
      // 配置项中未找到color，删除editingModalData中自带color属性
      // if (!listTemp.obj["color"]) delete this.editingModalData.color;
      // 设置被配置控件的index，便于完成配置找到相应对象赋值
      this.editingModalData.listIndex = data.index;
      // Vue 不能检测到对象属性的添加或删除
      this.editingModalData = Object.assign({}, this.editingModalData);

      this.radioCheckboxList = this.editingModalData.items;

      this.showEditingModal = true;
      let target = document.getElementById(data.id);
      let top = target.offsetTop;
      let height = target.offsetHeight;
      this.$nextTick(() => {
        document.getElementById("configure_tool").style.top =
          top + height + "px";
      });
    },
    // 删除克隆控件
    removeEle(index) {
      let name = this.sortable_item[index].obj.name;
      this.sortable_item.splice(index, 1);
      if (!name) return;
      for (let i in this.sortable_item) {
        // 当relation为true并且关联字段被确认
        if (
          this.sortable_item[i].obj.relation &&
          this.sortable_item[i].obj.relation_name === name
        ) {
          this.$set(this.sortable_item[i].obj, "relation", false);
          this.$set(this.sortable_item[i].obj, "relation_name", "");
          this.$set(this.sortable_item[i].obj, "relation_value", "");
          break;
        }
      }
      this.showEditingModal = false;
    },
    // 更改当前渲染字段是否显示
    changeVisibility(index, visibility) {
      let v = this.sortable_item[index].obj;
      this.$set(this.sortable_item[index].obj, "index", index + 1);
      this.$set(this.sortable_item[index].obj, "name", v.label + index);
      this.$set(this.sortable_item[index].obj, "visibility", visibility);
    },
    handleNameEditorInput(val) {
      this.nameEditor.msg = val;
      this.$emit("change-name", val);
    },
    initPropsIntoData() {
      if (this.form) {
        this.sortable_item = this.form;
      }
      if (this.formName) {
        this.nameEditor.msg = this.formName;
      }
    }
  },
  mounted() {
    /* eslint-disable */
    new ScrollBar("#sortable_form");
  },
  created() {
    // this.sortable_item = JSON.parse(
    //   localStorage.getItem("templateForm") || "[]"
    // );
    this.initPropsIntoData();
  }
};
</script>
<style lang="less">
@import "../../assets/css/configure";
@import "../../assets/css/theme.less";

.container {
  height: calc(100% - 80px);

  &-main {
    .layout-main;
    overflow: hidden;
    height: calc(100% - 80px);

    .update-name {
      box-sizing: border-box;
      display: flex;
      align-items: center;
      height: 100px;
      background: #f5f5f5;
      padding: 20px;

      &-input {
        width: 85%;
        margin-right: 5%;
      }

      button {
        width: 10%;
      }
    }
  }
}

.inline {
  display: inline-block;
}

.m-l-lg {
  margin-left: 30px;
}

.wrapper {
  padding: 15px;
}

.inline-block {
  display: inline-block;
}

.padder-sm {
  padding-right: 10px;
  padding-left: 10px;
}

.b-a {
  border: 1px solid #e8eaec;
}

.ghost {
  background: #c8ebfb;
  opacity: 0.5;
}

/* 设置items下所有鼠标样式为 move */

.items {
  cursor: move;
}

/* 提交按钮下方无 margin-bottom */

.form_content .ivu-form-item:last-child {
  margin-bottom: 0;
}

/* 表单校验选项样式 */
.items.sortable-items-required .ivu-form-item-label::before {
  display: inline-block;
  margin-right: 4px;
  font-family: SimSun;
  font-size: 12px;
  line-height: 1;
  color: #ed3f14;
  content: "*";
}

.esign-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .esign-picture {
    width: 80%;
  }
}

.sortable-container {
  border: 1px solid #e8eaec;
  border-right: none !important;
  &--tabs {
    display: flex;
    margin: 10px 10px 0;
    padding: 10px;
    background: #f2f2f2;
    min-height: 40px;
    font-size: 16px;
    li {
      flex: 0 1 50%;
      text-align: center;
      line-height: 40px;
      cursor: pointer;
      transition: background-color 0.1s ease-in;
    }

    .active {
      background: #fff;
    }
  }
  &--outline {
    padding: 10px;
    height: calc(100% - 50px);
    overflow: auto;
    li {
      margin-bottom: 16px;
      font-size: 16px;
    }
  }
}
</style>
