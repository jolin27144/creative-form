<template>
  <div class="container">
    <div class="modal-tab-title">
      <h3>模版内容编辑区域</h3>
      <div class="btn-bar">
        <span class="btn" @click="handleReset()">取消编辑</span>
        <span class="btn" @click="handlePreview()">预览内容</span>
        <span class="btn" @click="handleSubmit()">完成编辑</span>
      </div>
    </div>

    <div class="sortable-container">
      <Form :label-width="80" class="b-a">
        <draggable :clone="cloneData" :list="formList" :options="dragOptions1">
          <transition-group
            class="form-list-group"
            type="transition"
            name="flip-list"
            tag="div"
          >
            <renders
              v-for="(element, index) in formList"
              :key="index"
              :ele="element.ele"
              :obj="element.obj || {}"
            >
            </renders>
          </transition-group>
        </draggable>
      </Form>
    </div>

    <div class="sortable-item">
      <Form
        ref="formValidate"
        id="sortable_form"
        class="sortable-form b-a"
        :model="formData"
        @submit.native.prevent
      >
        <div class="form-title">点击编辑模版名称</div>
        <draggable
          class="draggable-div"
          :list="sortable_item"
          :options="dragOptions2"
        >
          <transition-group
            class="form-list-group label-common-form"
            type="transition"
            name="flip-list"
            tag="div"
          >
            <renders
              @handleRemoveEle="removeEle"
              @handleConfEle="confEle"
              @changeVisibility="changeVisibility"
              v-for="(element, index) in sortable_item"
              :key="index"
              :index="index"
              :ele="element.ele"
              :obj="element.obj || {}"
              :data="formData"
              @handleChangeVal="val => handleChangeVal(val, element)"
              :sortableItem="sortable_item"
              :config-icon="true"
            >
            </renders>
          </transition-group>
        </draggable>
        <div v-show="showModal" class="configure-tool" id="configure_tool">
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
            <!--<FormItem label="数据字典：" v-if="showModal">
                            <Select v-model="modalFormData.dict" filterable @on-change="handleDataDictChange">
                                <Option
                                    :disabled="dataDictSelected.indexOf(item.id) >= 0"
                                    v-for="item in dataDictList"
                                    :value="JSON.stringify({id: item.id, parent_name: item.parent_name})"
                                    :key="item.id">{{ item.label }}
                                </Option>
                            </Select>
                        </FormItem>-->
            <!--<FormItem label="name属性：" v-if="typeof modalFormData.name != 'undefined'">
                            <i-input v-model="modalFormData.name" placeholder=""></i-input>
                        </FormItem>-->
            <FormItem
              label="选项："
              v-if="
                modalFormData.type === 'radio' ||
                  modalFormData.type === 'checkbox'
              "
            >
              <div v-for="item in radioCheckboxList" :key="item.label_value">
                <i-input v-model="item.label_name" placeholder=""></i-input>
                <i-button @click="radioCheckboxRemove(item)">删除</i-button>
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
              label="最大长度："
              v-if="typeof modalFormData.maxLength !== 'undefined'"
            >
              <InputNumber
                v-model="modalFormData.maxLength"
                placeholder="请输入文本限制最大长度"
              >
              </InputNumber>
            </FormItem>
            <FormItem
              label="最大限制："
              v-if="typeof modalFormData.maxSize !== 'undefined'"
            >
              <InputNumber
                :formatter="value => `${value}kb`"
                :parser="value => value.replace('kb', '')"
                v-model="modalFormData.maxSize"
                placeholder="请输入上传文件最大限制"
              >
              </InputNumber>
            </FormItem>
            <FormItem
              label="上边距："
              v-if="typeof modalFormData.marginTop !== 'undefined'"
            >
              <InputNumber
                :formatter="value => `${value}px`"
                :parser="value => value.replace('px', '')"
                v-model="modalFormData.marginTop"
                placeholder="请输入标签上边距"
              >
              </InputNumber>
            </FormItem>
            <FormItem
              label="下边距："
              v-if="typeof modalFormData.marginBottom !== 'undefined'"
            >
              <InputNumber
                :formatter="value => `${value}px`"
                :parser="value => value.replace('px', '')"
                v-model="modalFormData.marginBottom"
                placeholder="请输入标签下边距"
              >
              </InputNumber>
            </FormItem>
            <FormItem
              label="详细地址："
              v-if="typeof modalFormData.details_address !== 'undefined'"
            >
              <Checkbox v-model="modalFormData.details_address"
                >是否需要详细地址</Checkbox
              >
            </FormItem>
            <FormItem
              label="是否必填："
              v-if="typeof modalFormData.require !== 'undefined'"
            >
              <Checkbox v-model="modalFormData.require">必填</Checkbox>
            </FormItem>
            <FormItem
              label="校验错误："
              v-if="typeof modalFormData.ruleError !== 'undefined'"
            >
              <i-input
                v-model="modalFormData.ruleError"
                placeholder="请输入校验错误提示"
              ></i-input>
            </FormItem>
            <FormItem
              label="是否多选："
              v-if="
                typeof modalFormData.multiple !== 'undefined' &&
                  modalFormData.type !== 'address'
              "
            >
              <Checkbox v-model="modalFormData.multiple">多选</Checkbox>
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
            <FormItem
              label="行内元素："
              v-if="typeof modalFormData.inlineBlock !== 'undefined'"
            >
              <Checkbox v-model="modalFormData.inlineBlock">是</Checkbox>
            </FormItem>
            <FormItem
              label="显示行数："
              v-if="typeof modalFormData.maxRows !== 'undefined'"
            >
              <Slider
                v-model="modalFormData.maxRows"
                :min="2"
                :max="10"
              ></Slider>
            </FormItem>
            <FormItem
              label="标题大小："
              v-if="typeof modalFormData.level !== 'undefined'"
            >
              <InputNumber
                :max="64"
                :min="1"
                v-model="modalFormData.level"
              ></InputNumber>
            </FormItem>
            <FormItem
              label="字体颜色："
              v-if="typeof modalFormData.color != 'undefined'"
            >
              <ColorPicker v-model="modalFormData.color" />
            </FormItem>
          </Form>
          <div slot="footer">
            <Button type="text" @click="handleCancel">取消</Button>
            <Button
              type="primary"
              :loading="modalFormData.loading"
              @click="handleOk"
              >确定</Button
            >
          </div>
        </div>
      </Form>
    </div>
  </div>
</template>
<script>
import draggable from "vuedraggable";
import formList from "./custom-form/FormList";
// import ScrollBar from "perfect-scrollbar";
// import "perfect-scrollbar/css/perfect-scrollbar.css";
export default {
  components: {
    draggable
  },
  props: ["form"],
  data() {
    return {
      formList: formList,
      sortable_item: [],
      showModal: false,
      // 深拷贝对象，防止默认空对象被更改
      // 颜色选择器bug，对象下color不更新
      modalFormData: {
        color: "",
        loading: false
      },
      formData: {},
      dataDict: [],
      // radio
      radioCheckboxList: [
        {
          label_value: parseInt(new Date().getTime() / 1000) + "",
          label_name: ""
        }
      ]
    };
  },
  methods: {
    // 克隆表单提交事件
    handleSubmit() {
      console.info(this.form);
      if (this.form.name === "" || this.form.status === "") {
        this.$Notice.warning({
          title: "模版属性不全",
          desc: "请补充完整模版名称和状态才能完成编辑",
          duration: 2
        });
        return;
      }
      console.info(this.sortable_item);
    },
    // 预览表单
    handlePreview() {
      localStorage.setItem(
        "templateForm",
        JSON.stringify(
          this.sortable_item.filter(v => {
            return v;
            // return !!v.obj.name
          })
        )
      );
      this.$emit("func", true);
    },
    // 清空克隆表单
    handleReset() {
      this.sortable_item = [];
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
    },
    // modal点击取消执行事件，清空当前modal内容
    handleCancel() {
      this.showModal = false;
      setTimeout(() => {
        this.modalFormData = {
          color: "",
          loading: false
        };
      }, 500);
    },
    // 显示modal,配置被克隆控件
    confEle(data) {
      this.showModal = false;
      this.modalFormData = {
        color: "",
        loading: false
      };
      const listTemp = Object.assign({}, this.sortable_item[data.index]);
      for (let i in listTemp.obj) {
        this.modalFormData[i] = listTemp.obj[i];
      }
      // 配置项中未找到color，删除modalFormData中自带color属性
      if (!listTemp.obj["color"]) delete this.modalFormData.color;
      // 设置被配置控件的index，便于完成配置找到相应对象赋值
      this.modalFormData.listIndex = data.index;
      // Vue 不能检测到对象属性的添加或删除
      this.modalFormData = Object.assign({}, this.modalFormData);

      this.radioCheckboxList = this.modalFormData.items;

      this.showModal = true;
      let id = document.getElementById(data.id);
      let top = id.offsetTop;
      let height = id.offsetHeight;
      document.getElementById("configure_tool").style.top = top + height + "px";
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
      this.showModal = false;
    },
    // 更改当前渲染字段是否显示
    changeVisibility(index, visibility) {
      let v = this.sortable_item[index].obj;
      this.$set(this.sortable_item[index].obj, "index", index + 1);
      this.$set(this.sortable_item[index].obj, "name", v.label + index);
      this.$set(this.sortable_item[index].obj, "visibility", visibility);
    },
    // radioCheckbox
    radioCheckboxAdd() {
      this.radioCheckboxList.push({
        label_value: parseInt(new Date().getTime() / 1000) + "",
        label_name: ""
      });
    },
    radioCheckboxRemove(item) {
      this.radioCheckboxList.$remove(item);
    }
  },
  watch: {
    showModal(val) {
      if (!val) {
        this.handleCancel();
      }
    }
  },
  computed: {
    // 数据字典已选择项
    dataDictSelected() {
      return this.sortable_item.map(v => {
        const obj = JSON.parse(v.obj.dict || "{}");
        return obj.id || -1;
      });
    },
    // 对应控件的数据字典
    dataDictList() {
      return this.dataDict.filter(v => {
        return v.type == this.modalFormData.type;
      });
    },
    // 拖拽表单1
    dragOptions1() {
      return {
        animation: 0,
        ghostClass: "ghost",
        // 分组
        group: {
          name: "shared",
          pull: "clone",
          revertClone: false
        },
        // 禁止拖动排序
        sort: false
      };
    },
    // 拖拽表单2
    dragOptions2() {
      return {
        animation: 0,
        ghostClass: "ghost",
        group: {
          // 只允许放置shared的控件,禁止pull
          put: ["shared"]
        }
      };
    },
    // 被关联字段列表
    relationList() {
      // 只有type内三项可作为被关联字段
      let type = ["select", "radio", "checkbox"];
      const arr = this.sortable_item.filter(k => {
        return type.indexOf(k.ele) >= 0 && !!k.obj.name;
      });
      return arr;
    },
    // 被关联字段数据
    relationValue() {
      const name = this.modalFormData.relation_name;
      let items = [];
      if (!name) return items;
      for (let i in this.sortable_item) {
        if (this.sortable_item[i].obj.name == name) {
          items = this.sortable_item[i].obj.items;
        }
      }
      return items;
    }
  },
  mounted() {
    /* eslint-disable */
    // new ScrollBar("#sortable_form");
  },
  created() {
    this.sortable_item = JSON.parse(
      localStorage.getItem("templateForm") || "[]"
    );
  }
};
</script>
<style lang="less">
@import "~@/assets/css/configure.css";

.container {
  height: calc(100% - 80px);
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

.items,
.items * {
  cursor: move;
}

/* 提交按钮下方无 margin-bottom */

.form_content .ivu-form-item:last-child {
  margin-bottom: 0;
}

/* 表单校验选项样式 */

.ivu-form-item-required .ivu-form-item-label::before {
  content: "";
}

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
