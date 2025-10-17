<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>轮播图</el-breadcrumb-item>
            <el-breadcrumb-item>轮播图管理</el-breadcrumb-item>
        </el-breadcrumb>
        <el-divider></el-divider>
        <el-button></el-button>
        <el-table :data="tableData" style="width:100%;" :header-cell-style="{ 'text-align': 'center' }">
            <el-table-column prop="id" label="序号" align="center" width="100"></el-table-column>
            <!-- <el-table-column prop="created_at" label="创建时间" width="150"></el-table-column> -->
            <el-table-column prop="school_id" label="学校ID" align="center" width="100"></el-table-column>
            <!-- <el-table-column prop="updated_at" label="更新时间" width="150"></el-table-column> -->
            <el-table-column label="内容" align="center">
                <template slot-scope="scope">
                    <a :href="scope.row.url">{{ scope.row.url }}</a>
                </template>
            </el-table-column>
            <el-table-column prop="img" label="预览" align="center">
                <template slot-scope="scope">
                    <img :src="scope.row.img" alt="" width="100%">
                </template>
            </el-table-column>
            <el-table-column prop="centers" label="操作" align="center">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" plain size="small">查看</el-button>
                    <el-button type="text" size="small">编辑</el-button>
                    <el-button type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            token: localStorage.getItem('token'),
            tableData: []
        }
    },
    created() {
        this.getPicList();
    },
    methods: {
        getPicList() {
            this.$http.picApi.getAllList(this.token).then(res => {
                console.log(res);
                if (res.code == 203) {
                    this.$alert('账号登陆已过期，请重新登陆', '警告', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.$message({
                                type: 'info',
                                message: `action: ${action}`
                            });
                            this.$router.push('/')
                        }
                    });
                } else {
                    this.tableData = res.data.data;
                    console.log(this.tableData);
                }
            })
        },
        handleClick(row) {
            console.log(row);
        }
    },
}
</script>

<style scoped></style>