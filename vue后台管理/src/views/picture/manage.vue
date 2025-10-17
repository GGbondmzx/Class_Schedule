<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>轮播图</el-breadcrumb-item>
      <el-breadcrumb-item>轮播图管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>
    <el-button type="success"
               plain
               @click.stop="addsm()">添加</el-button>
    <el-table :data="tableData"
              style="width: 100%"
              :header-cell-style="{ 'text-align': 'center' }">
      <el-table-column prop="id"
                       label="序号"
                       align="center"
                       width="100"></el-table-column>
      <el-table-column prop="school_id"
                       label="学校ID"
                       align="center"
                       width="100"></el-table-column>
      <el-table-column label="URL地址"
                       align="center">
        <template slot-scope="scope">
          <a :href="scope.row.url">{{ scope.row.url }}</a>
        </template>
      </el-table-column>
      <el-table-column prop="img"
                       label="预览"
                       align="center">
        <template slot-scope="scope">
          <img :src="scope.row.img"
               alt=""
               width="100%" />
        </template>
      </el-table-column>
      <el-table-column prop="centers"
                       label="操作"
                       align="center">
        <template slot-scope="scope">
          <el-button type="primary"
                     icon="el-icon-edit"
                     circle
                     @click.stop="change(scope.$index, scope.row)"></el-button>
          <el-button type="danger"
                     icon="el-icon-delete"
                     circle
                     @click.stop="deld(scope.row.id)"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="提示"
               :visible.sync="centerDialogVisible"
               width="30%"
               center>
      <span>确定删除吗？</span>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="
            isDel = true;
            dellist();
          ">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog :title="isadd ? '新增' : '编辑'"
               :visible.sync="DialogFormVisible">
      <el-form :model="form">
        <el-form-item label="学校ID">
          <el-input v-model="form.schoolid"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="URL地址">
          <el-input v-model="form.url"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片上传">
          <el-upload action=""
                     list-type="picture-card"
                     :on-remove="handleRemove"
                     :on-success="dealImgUp"
                     :file-list="imgList">
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click.stop="DialogFormVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="isadd ? addList() : changeList()">确 定</el-button>
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
        id: '',
        schoolid: '',
        url: '',
        img: '',
      },
      isDel: false,
    }
  },
  created() {
    this.getPicList()
  },
  methods: {
    isAdd() {
      let that = this
      if (this.isadd == false) {
        for (let key in that.form) {
          that.form[key] = ''
        }
      }
      console.log(this.form)
    },
    deld(id) {
      this.form.id = id
      this.centerDialogVisible = true
    },
    addsm() {
      this.isAdd()
      this.isadd = true
      this.DialogFormVisible = true
    },
    colsedd() {
      console.log(this.DialogFormVisible)
      console.log(this.isadd)
    },
    getPicList() {
      this.$http.picApi.getAllList().then((res) => {
        console.log(res)
        this.tableData = res.data.data
        console.log(this.tableData)
      })
    },
    handleClick(row) {
      console.log(row)
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    addList() {
      this.$http.picApi.addList(this.form).then((res) => {
        console.log(res)
        this.DialogFormVisible = false
      })
    },
    change(index, row) {
      console.log(index)
      this.isadd = false
      this.DialogFormVisible = true
      this.form.id = index + 1
      this.form.schoolid = this.tableData[index].school_id
      this.form.img = this.tableData[index].img
      this.form.url = this.tableData[index].url
      this.imgList = [
        {
          url: this.tableData[index].img,
        },
      ]
    },
    changeList() {
      let that = this
      this.$http.picApi.changeList(this.form).then((res) => {
        that.imgList = []
        console.log(res)
        this.DialogFormVisible = false
      })
    },
    dellist() {
      let that = this
      if (this.isDel == true) {
        console.log(that.form.id)
        this.centerDialogVisible = false
        this.$http.picApi.delList({ id: that.form.id }).then((res) => {
          console.log(res)
        })
      }
    },
    dealImgUp(res) {
      console.log(res)
      this.form.img = res.data
    },
  },
  watch: {
    DialogFormVisible() {
      if (this.DialogFormVisible == false) {
        this.imgList = []
      }
    },
  },
}
</script>