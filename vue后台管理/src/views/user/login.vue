<template>
    <div>
        <div class="back">
            <el-form class="form" label-position="left" :model="form" :rules="rules" ref="form">
                <p class="title">柏学于扬</p>
                <el-form-item prop="username">
                    <el-input v-model="form.username" placeholder="请输入管理员账号"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="form.password" type="password" placeholder="请输入管理员密码"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" style="width: 100%" @click="onSubmit()">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import { md5 } from 'md5js';
export default {
    data() {
        return {
            form: {
                username: "",
                password: "",
                expire:Date.now()
            },
            rules: {
                username: [
                    { required: true, message: "请填写用户名", trigger: "blur" },
                    {
                        pattern: /^\w{3,15}$/,
                        message: "3~15位字符，可以包含：数字、字母、下划线",
                        trigger: "blur",
                    },
                ],
                password: [
                    { required: true, message: "请填写用户名", trigger: "blur" },
                    {
                        pattern: /^\w{6,15}$/,
                        message: "6~15位字符，可以包含：数字、字母、下划线",
                        trigger: "blur",
                    },
                ],
            },
        };
    },
    created() {
        this.isLogin()
    },
    methods: {
        onSubmit() {
            this.$refs["form"].validate((valid) => {
                if (valid) {
                    this.form.password = md5(this.form.password, 32)
                    this.$http.adminApi.login(this.form).then(res => {
                        console.log(res);
                        if (res.data.code == 200) {
                            localStorage.setItem('token', res.data.data)
                            let expired = Date.now()+3600000
                            localStorage.setItem('expire', expired)
                            console.log(localStorage.getItem('token'));
                            this.$router.push('/home')
                        } else {
                            this.$message.error('账号密码输入错误，请重新输入')
                            this.form.username = ''
                            this.form.password = ''
                        }
                    })
                } else {
                    this.$message.warning('账号密码输入错误，请重新输入')
                }
            });
        },
        isLogin() {
            let token = localStorage.getItem('token')
            if (token) {
                this.$router.push('/home')
            } else {
                console.log()
            }
        },
    },
}; 
</script>

<style scoped>
.form {
    display: block;
    width: 20%;
    position: absolute;
    top: 30%;
    left: 40%;
}

.form .title {
    text-align: center;
    font-size: 1.5em;
    color: white;
    margin-bottom: 20px;
}

span {
    color: white;
}

.back {
    height: 100vh;
    background-image: linear-gradient(125deg, #e14040, #b050cd, #4842c9, #34828d);
    background-size: 500%;
    animation: animate 20s infinite;
}

@keyframes animate {
    0% {
        background-position: 0% 50%;
    }

    50% {
        background-position: 100% 50%;
    }

    100% {
        background-position: 0% 50%;
    }
}
</style>