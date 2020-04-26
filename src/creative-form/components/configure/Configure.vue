<template>
  <div class="container">
    <div class="modal-tab-title">
      <h3>模版内容编辑区域</h3>
    </div>
    <main class="container-main">
      <div class="sortable-container">
        <Form :label-width="80" class="b-a">
          <!--          <draggable-->
          <!--            :clone="cloneData"-->
          <!--            :list="formList"-->
          <!--            ghost-class="ghost"-->
          <!--            :animation="0"-->
          <!--            :group="{ name: 'shared', pull: 'clone', revertClone: false }"-->
          <!--            :sort="false"-->
          <!--          >-->
          <!--            <transition-group-->
          <!--              class="form-list-group"-->
          <!--              type="transition"-->
          <!--              name="flip-list"-->
          <!--              tag="div"-->
          <!--            >-->
          <!--              <RenderToDraggable-->
          <!--                v-for="(element, index) in formList"-->
          <!--                :key="element.ele + index"-->
          <!--                :item="element"-->
          <!--              ></RenderToDraggable>-->
          <RenderToDraggable :list="formList"></RenderToDraggable>
          <!--            </transition-group>-->
          <!--          </draggable>-->
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
          <div class="form-title" v-if="!nameEditor.active">
            {{ nameEditor.msg }}
          </div>
          <div class="update-name" v-else>
            <Input v-model="nameEditor.msg" placeholder="请输入模版名称" />
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
import RenderToDraggable from "../renderer/pc-renderer/renderToDragable/RenderToDraggable";
// import ScrollBar from "perfect-scrollbar";
// import "perfect-scrollbar/css/perfect-scrollbar.css";

// const setFormToLocalStorage = (form = []) => {
//   localStorage.setItem("templateForm", JSON.stringify(form.filter(v => v)));
// };
export default {
  components: {
    RenderToDraggable,
    Edit,
    draggable,
    RenderToEditing
  },
  props: {
    form: Array
  },

  watch: {
    showEditingModal(val) {
      if (!val) {
        this.handleCancel();
      }
    }
  },
  computed: {
    // // 数据字典已选择项
    // dataDictSelected() {
    //   return this.sortable_item.map(v => {
    //     const obj = JSON.parse(v.obj.dict || "{}");
    //     return obj.id || -1;
    //   });
    // },
    // 对应控件的数据字典
    // dataDictList() {
    //   return this.dataDict.filter(v => {
    //     return v.type == this.editingModalData.type;
    //   });
    // }
    // // 被关联字段列表
    // relationList() {
    //   // 只有type内三项可作为被关联字段
    //   let type = ["select", "radio", "checkbox"];
    //   const arr = this.sortable_item.filter(k => {
    //     return type.indexOf(k.ele) >= 0 && !!k.obj.name;
    //   });
    //   return arr;
    // },
    // // 被关联字段数据
    // relationValue() {
    //   const name = this.editingModalData.relation_name;
    //   let items = [];
    //   if (!name) return items;
    //   for (let i in this.sortable_item) {
    //     if (this.sortable_item[i].obj.name == name) {
    //       items = this.sortable_item[i].obj.items;
    //     }
    //   }
    //   return items;
    // }
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
        msg: "测试"
      }
    };
  },
  methods: {
    // // 克隆表单提交事件
    // handleSubmit() {
    //   // if (this.form.name === "" || this.form.status === "") {
    //   //   this.$Notice.warning({
    //   //     title: "模版属性不全",
    //   //     desc: "请补充完整模版名称和状态才能完成编辑",
    //   //     duration: 2
    //   //   });
    //   // }else{
    //   setFormToLocalStorage(this.sortable_item);
    //   this.$emit("save");
    //   // }
    // },
    // // 预览表单
    // handlePreview() {
    //   setFormToLocalStorage(this.sortable_item);
    //   this.$emit("func", true);
    // },
    // // 清空克隆表单
    // handleReset() {
    //   this.sortable_item = [];
    // },

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
    // // modal点击确定执行事件
    // handleOk() {
    //   const index = this.editingModalData.listIndex;
    //   this.editingModalData.items = this.radioCheckboxList;
    //
    //   this.sortable_item[index].obj = Object.assign(
    //     {},
    //     this.sortable_item[index].obj,
    //     this.editingModalData
    //   );
    //   this.handleCancel();
    // },
    // // modal点击取消执行事件，清空当前modal内容
    // handleCancel() {
    //   this.showEditingModal = false;
    //   setTimeout(() => {
    //     this.editingModalData = {
    //       color: "",
    //       loading: false
    //     };
    //   }, 500);
    // },
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
    // // radioCheckbox
    // radioCheckboxAdd() {
    //   this.radioCheckboxList.push({
    //     label_value: parseInt(new Date().getTime() / 1000) + "",
    //     label_name: ""
    //   });
    // },
    // radioCheckboxRemove(item) {
    //   this.radioCheckboxList.$remove(item);
    // }
    initPropsIntoData() {
      if (this.form) {
        this.sortable_item = this.form;
      }
    }
  },
  mounted() {
    /* eslint-disable */
    // new ScrollBar("#sortable_form");
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

/*.ivu-form-item-required .ivu-form-item-label::before {*/
/*content: "";*/
/*}*/

.items.sortable-items-required .ivu-form-item-label::before {
  display: inline-block;
  margin-right: 4px;
  font-family: SimSun;
  font-size: 12px;
  line-height: 1;
  color: #ed3f14;
  content: "*";
}
</style>
