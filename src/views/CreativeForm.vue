<template>
  <div class="manage">
    <div class="manage-top">
      <span class="icon-title">检查模版</span>
      <div class="btn-bar">
        <span class="btn" @click="add">新增模版</span>
        <span class="btn" @click="deletAll">批量删除</span>
      </div>
      <div class="search">
        <Input
          class="search-input"
          suffix="ios-search"
          v-model.trim="searchForm.name"
          @on-change="nameChange"
          placeholder="搜索"
        />
      </div>
    </div>

    <div class="manage-content">
      <Table
        class="table"
        id="table"
        border
        :loading="load.loading"
        :columns="table.columns"
        :data="table.tableData"
        sortable="custom"
        @on-selection-change="selectionChange"
        ref="table"
      ></Table>
      <Page
        class="table-page"
        :current="searchForm.pageNumber"
        :total="table.total"
        :page-size="searchForm.pageSize"
        :page-size-opts="[10, 25, 50, 100]"
        show-total
        show-sizer
        @on-change="changePage"
        @on-page-size-change="changePageSize"
      ></Page>
    </div>

    <Modal
      v-model="delModal.flag"
      :title="delModal.title"
      :mask-closable="false"
      class="modal"
      @on-ok="delOK"
    >
      <p>确定删除该记录?</p>
    </Modal>

    <Modal
      class="modal full"
      id="configure_modal"
      v-model="configureModal.flag"
      :title="configureModal.title"
      :mask-closable="false"
      :footer-hide="true"
    >
      <ul class="modal-tab">
        <li
          v-for="(item, key) in configureModal.tabs"
          :class="[key + 1 === configureModal.step ? 'on' : '']"
          :key="item"
          @click="tabsHaddle(item, key)"
        >
          {{ item.name }}
        </li>
      </ul>

      <div v-if="configureModal.step === 1" class="modal-tab-step attribute">
        <div class="modal-tab-title">
          <h3>新增模版属性详情填写</h3>
          <div class="btn-bar">
            <span class="btn">完成编辑</span>
          </div>
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

      <v-configure
        v-if="configureModal.step === 2"
        @func="renderFlag"
        :form="form"
        class="modal-tab-step"
      ></v-configure>
    </Modal>

    <div class="pop-modal" v-if="renderModal.flag">
      <div class="pop-content">
        <div class="pop-title">
          <span>{{ renderModal.title }}</span>
          <a class="ivu-modal-close" @click="close">
            <i class="ivu-icon ivu-icon-ios-close"></i>
          </a>
        </div>
        <v-render></v-render>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
// import ScrollBar from "perfect-scrollbar";
// import "perfect-scrollbar/css/perfect-scrollbar.css";
import Configure from "../components/template/Configure";
import Render from "../components/template/Render";
export default {
  components: {
    "v-configure": Configure,
    "v-render": Render
  },
  data() {
    return {
      load: {
        loading: true
      },
      // 分页搜索
      searchForm: {
        pageNumber: 1,
        pageSize: 15,
        name: "",
        responsibility_person: ""
      },
      table: {
        total: 0,
        columns: [
          { type: "selection", width: 60, align: "center" },
          { title: "序号", type: "index", width: 80 },
          { title: "模版名称", key: "name" },
          { title: "状态", key: "status", width: 300 },
          { title: "创建时间", key: "createTime" },
          { title: "创建人", key: "createMan" },
          { title: "所属部门", key: "responsibility_person" },
          { title: "描述", key: "notes" },
          { title: "更新时间", key: "updateTime" },
          {
            title: "操作",
            key: "action",
            width: 340,
            render: (h, params) => {
              return h("div", [
                h(
                  "Button",
                  {
                    props: { size: "small" },
                    class: "ivu-btn-del",
                    on: {
                      click: () => {
                        this.del(params.row.id);
                      }
                    }
                  },
                  "删除"
                ),
                h(
                  "Button",
                  {
                    props: { size: "small" },
                    class: "ivu-btn-edit",
                    on: {
                      click: () => {
                        this.edit(params.row);
                      }
                    }
                  },
                  "修改"
                ),
                h(
                  "Button",
                  {
                    props: { size: "small" },
                    class: "ivu-btn-see",
                    on: {
                      click: () => {
                        this.preview(params.row);
                      }
                    }
                  },
                  "预览"
                )
              ]);
            }
          }
        ],
        tableData: [],
        tableSelect: []
      },
      // 删除
      delModal: {
        flag: false,
        title: "删除提示",
        ids: null
      },
      // 新增
      configureModal: {
        flag: false,
        title: "配置模版",
        tabs: [
          { name: "模版属性", type: "attribute" },
          { name: "模版内容", type: "configure" }
        ],
        step: 1
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
      // 预览
      renderModal: {
        flag: false,
        title: "模版预览"
      },
      uploadData: {}
    };
  },
  computed: {
    ...mapState({})
  },
  watch: {
    // 搜索
    searchForm: {
      handler() {
        this.dataInit();
      },
      deep: true
    }
  },
  methods: {
    ...mapActions(["updateParam"]),
    nameChange() {
      this.searchForm.pageNumber = 1;
    },
    dataInit() {
      const url = "/opp-server/baseData/soilEvent/soilEventManage";
      this.get(url, this.searchForm).then(res => {
        if (res.status === 1) {
          this.load.loading = false;
          this.table.tableData = res.data.list;
          this.table.total = res.data.pager.recordCount;
          /* eslint-disable */
          // new ScrollBar("#table div.ivu-table-body");
        } else {
          this.load.loading = false;
        }
      });
    },
    changePage(v) {
      this.searchForm.pageNumber = v;
      this.dataInit();
    },
    changePageSize(v) {
      this.searchForm.pageSize = v;
      this.dataInit();
    },
    /*
     * 添加事件
     */
    add() {
      this.configureModal.flag = true;
    },
    tabsHaddle(item, index) {
      this.configureModal.step = index + 1;
    },
    edit(data) {
      this.configureModal.flag = true;
    },
    addHaddle(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          const url = "/opp-server/baseData/soilEvent/saveByOperate";
          this.postUrlencode(url, this.form)
            .then(res => {
              if (res.status === 1) {
                this.$Message.success("提交成功！");
              } else {
                this.$Message.success("提交失败！");
              }
              this.resetHaddle(name);
            })
            .finally(() => {
              if (this.searchForm.pageNumber === 1) {
                setTimeout(() => {
                  this.dataInit();
                }, 1000);
              } else {
                this.searchForm.pageNumber = 1;
              }
            });
        } else {
          this.$Message.error("请补充完整信息");
        }
      });
    },
    resetHaddle(name) {
      this.newModal.flag = false;
      this.$refs[name].resetFields();
    },
    // 筛选
    selectionChange(v) {
      this.table.tableSelect = v;
    },
    // id 组合
    idsHaddle() {
      let idArray = [];
      let ids = null;
      this.table.tableSelect.map(item => {
        idArray.push(item.id);
      });
      ids = idArray.join(",");
      return ids;
    },
    /*
     * 删除
     */
    del(ids) {
      this.delModal.flag = true;
      this.delModal.ids = ids;
    },
    deletAll() {
      if (this.table.tableSelect.length === 0) {
        this.$Notice.open({
          title: "请选择删除行",
          duration: 2
        });
        return;
      }

      this.del(this.idsHaddle());
    },
    delOK() {
      const url = "/opp-server/baseData/soilEvent/delete";
      this.postUrlencode(url, { ids: this.delModal.ids })
        .then(res => {
          if (res.status === 1) {
            this.$Message.success("删除成功");
          } else {
            this.$Message.success("删除失败");
          }
        })
        .finally(() => {
          if (
            this.table.tableData.length === 1 &&
            this.searchForm.pageNumber > 1
          ) {
            this.searchForm.pageNumber = this.searchForm.pageNumber - 1;
          } else {
            setTimeout(() => {
              this.dataInit();
            }, 1000);
          }
        });
    },
    /*
     * 复制
     */
    preview(row) {
      console.info(row);
      this.renderModal.flag = true;
    },
    /*
     * 预览
     */
    renderFlag(flag) {
      this.renderModal.flag = flag;
    },
    close() {
      this.renderModal.flag = false;
    }
  },
  mounted() {
    this.dataInit();
  }
};
</script>
<style lang="less">
@import "~@/assets/css/configure.css";

.attribute {
  height: calc(100% - 40px);
}
</style>
