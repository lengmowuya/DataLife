<template>
    <div id="LoginBlock">
        <div class="logo">
            <img src="./../../../assets/logo.png" alt="">
        </div>
        <div class="Header">
            <p class="title" @click="toSignPage()">现在就登录</p>
        </div>
        <div class="Form">
            <input type="text" class="email" title="邮箱地址" placeholder="邮箱地址" v-model="LoginBlock.email" />
            <input type="password" class="password" title="您的密码" placeholder="您的密码" v-model="LoginBlock.passward"
                @keydown.enter="LoginUser()" />
            <input type="button" class="submit" value="登录账号" @click="LoginUser(true)" />
        </div>
        <div class="Footer">
            <span class="goLogin" @click="toSignPage()">新用户注册<el-icon><Right /></el-icon></span>
        </div>
    </div>
</template>

<script>
import { ElMessage } from 'element-plus'
export default {
    name:'LoginBlock',
    data() {
        return {
            LoginBlock: {
                email: "",
                passward: "",
            },
        };
    },
    methods: {
        toSignPage(){
            // this.$parent.changePage(true);
            this.$emit('changePage',true);
        },
        LoginUser(){
            this.Work.User.LoginUserGlobal(this.LoginBlock)
                .then((data)=>{
                    // console.log(data);
                    ElMessage({
                        showClose: true,
                        message: '欢迎回来!',
                        type: 'success',
                    })
                    this.$store.state.user = data.user;
                    this.$router.push("affair");
                })
        }
    },
    mounted() {
        document.title = "DataLife-用户登录";
    },
};
</script>

<style scoped lang="less">
    @import url(./LoginBlock.less);
</style>