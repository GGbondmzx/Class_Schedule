<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>校园头条</el-breadcrumb-item>
      <el-breadcrumb-item>头条管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>
    <el-button type="success" plain @click.stop="addsm()">添加</el-button>
    <el-table
      :data="tableData"
      style="width: 100%"
      :header-cell-style="{ 'text-align': 'center' }"
    >
      <el-table-column
        prop="id"
        label="序号"
        align="center"
        width="100"
      ></el-table-column>
      <el-table-column
        prop="school_id"
        label="学校ID"
        align="center"
        width="100"
      ></el-table-column>
      <el-table-column
        prop="time"
        label="时间"
        align="center"
        width="100"
      ></el-table-column>
      <el-table-column label="URL地址" align="center">
        <template slot-scope="scope">
          <a :href="scope.row.url">{{ scope.row.url }}</a>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="标题" align="center">
      </el-table-column>
      <el-table-column prop="centers" label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            circle
            @click.stop="change(scope.$index, scope.row)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            @click.stop="deld(scope.row.id)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      title="提示"
      :visible.sync="centerDialogVisible"
      width="30%"
      center
    >
      <span>确定删除吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="
            isDel = true;
            dellist();
          "
          >确 定</el-button
        >
      </span>
    </el-dialog>

    <el-dialog
      :title="isadd ? '新增' : '编辑'"
      :visible.sync="DialogFormVisible"
    >
      <el-form :model="form">
        <el-form-item label="时间">
          <el-input v-model="form.time" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学校ID">
          <el-input v-model="form.schoolid" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="URL地址">
          <el-input v-model="form.url" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="标题">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.stop="DialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="isadd ? addList() : changeList()"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isadd: false,
      centerDialogVisible: false,
      DialogFormVisible: false,
      tableData: [],
      imgList: [],
      form: {
        id: "",
        time: "",
        schoolid: "",
        url: "",
        title: "",
      },
      isDel: false,
    };
  },
  created() {
    this.getNewsList();
  },
  methods: {
    isAdd() {
      let that = this;
      if (this.isadd == false) {
        for (let key in that.form) {
          that.form[key] = "";
        }
      }
      console.log(this.form);
    },
    deld(id) {
      this.form.id = id;
      this.centerDialogVisible = true;
    },
    addsm() {
      this.isAdd();
      this.isadd = true;
      this.DialogFormVisible = true;
    },
    colsedd() {
      console.log(this.DialogFormVisible);
      console.log(this.isadd);
    },
    getNewsList() {
      this.$http.newsApi.getAllInfo().then((res) => {
        console.log(res);
        this.tableData = res.data.data;
        console.log(this.tableData);
      });
    },
    handleClick(row) {
      console.log(row);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    addList() {
      this.$http.newsApi.addNews(this.form).then((res) => {
        console.log(res);
        this.DialogFormVisible = false;
      });
    },
    change(index, row) {
      this.isadd = false;
      this.DialogFormVisible = true;
      this.form.id = index + 1;
      this.form.time = this.tableData[index].time;
      this.form.schoolid = this.tableData[index].school_id;
      this.form.title = this.tableData[index].title;
      this.form.url = this.tableData[index].url;
    },
    changeList() {
      this.$http.newsApi.changeNews(this.form).then((res) => {
        console.log(res);
        this.DialogFormVisible = false;
      });
    },
    dellist() {
      let that = this;
      if (this.isDel == true) {
        console.log(that.form.id);
        this.centerDialogVisible = false;
        this.$http.newsApi.delNews({ id: that.form.id }).then((res) => {
          console.log(res);
        });
      }
    },
  },
};
</script>