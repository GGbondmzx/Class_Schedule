<template>
    <div>
        <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
            <el-form-item label="学校ID">
                <el-input v-model="formLabelAlign.school_id"></el-input>
            </el-form-item>
            <el-form-item label="内容">
                <el-input v-model="formLabelAlign.url"></el-input>
            </el-form-item>
            <el-form-item label="图片">
                <el-input v-model="formLabelAlign.img"></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            labelPosition: 'top',
            formLabelAlign: {
                school_id: '',
                url: '',
                img: ''
            }
        }
    },
}
</script>

<style scoped></style>