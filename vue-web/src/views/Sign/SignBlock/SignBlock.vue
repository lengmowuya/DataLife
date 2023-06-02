<template>
    <div id="SignBlock">
        <div class="logo">
            <img src="./../../../assets/logo.png" alt="">
        </div>
        <div class="Header">
            <p class="title" @click="toLoginPage()">注册</p>
        </div>
        <div class="Form">
            <div :class="[{FormLine:true},{error:formatEmailError}]" >
                <input type="text" class="email" title="邮箱地址" placeholder="邮箱地址" v-model="SignBlock.email" />
                <p class="formErrorHint" >
                    请输入有效格式的邮箱地址
                </p>
            </div>
            <div class="FormLine EmailCode">
                <input type="text" maxlength="6" title="邮箱验证码" placeholder="验证码" v-model="SignBlock.emailCode" /> 
                <el-button type="primary" @click="sendEmailCode()" :disabled="type.isSendCode">{{type.sendCodeButtonText}}</el-button>
            </div>
            <div class="FormLine">
                <input type="password" class="password" title="您的密码" placeholder="您的密码" v-model="SignBlock.passward"
                @keydown.enter="SignUser()" />
            </div>
            <br>
            <div class="FormLine">
                <input type="button" class="submit" value="注册账号" @click="SignUser()" />
            </div>
        </div>
        <div class="Footer">
            <span class="goLogin" @click="toLoginPage()"><el-icon><Back /></el-icon>转去登录</span>
        </div>
    </div>
</template>

<script>
import { ElMessage,ElMessageBox } from 'element-plus'
export default {
    name:'SignBlock',
    data() {
        return {
            type:{
                isSendCode:false,
                sendCodeButtonText:'获取验证码'
            },
            SignBlock: {
                email: "",
                emailCode:"",
                passward: "",
            },
        };
    },
    methods: {
        toLoginPage(){
            // this.$parent.changePage(false);
            this.$emit('changePage',false);
        },
        sendEmailCode(){
            // 地址有效性验证
            if(this.SignBlock.email.trim() == '' || this.formatEmailError){
                ElMessage({
                    showClose: true,
                    message: '请输入有效的邮箱地址!',
                })
                return;
            }
            this.Work.User.sendEmailCode(this.SignBlock.email);
            this.type.isSendCode = true;
            ElMessageBox.alert('验证码邮件已发送至您的邮箱，请注意查收。', '提示', {
                confirmButtonText: 'OK',
            });
            let time = 0;
            let interval = setInterval(()=>{
                this.type.sendCodeButtonText = 30 - time +'秒后重新获取';
                time++;
                if(time >= 30){
                    clearInterval(interval);
                    this.type.isSendCode = false;
                    this.type.sendCodeButtonText = '获取验证码';
                }
            },1000)
        },
        // 注册新用户
        SignUser() {
            this.Work.User.SignUser(this.SignBlock).then(
                (data) => {
                    console.log(data);
                    let log = data.type;
                    if (log == "success") {
                        this.$store.state.user = data.user;
                        this.$router.push("affair");
                    } else if (log == "exist") {
                        ElMessage({
                            showClose: true,
                            message: '该用户已存在,请直接登录',
                        })
                        // this.onSign = false;
                        this.toLoginPage();
                    } else if (log == "error") {
                        ElMessage({
                            showClose: true,
                            duration:0,
                            message: '未知错误,请直接联系DataLife管理人员!',
                            type: 'error'
                        })
                    }
                },
                (ErrorTip) => {
                    if (ErrorTip == "DataError") {
                        ElMessage({
                            showClose: true,
                            message: '邮箱和密码请勿为空',
                            duration:1000,
                            type: 'warning'
                        })
                    } else if (ErrorTip == "NetError") {
                        ElMessage({
                            showClose: true,
                            duration:0,
                            message: '服务请求错误,请直接联系DataLife管理人员!',
                            type: 'error'
                        })
                    } else {
                        ElMessage({
                            showClose: true,
                            duration:0,
                            message: '未知错误,请直接联系DataLife管理人员!',
                            type: 'error'
                        })
                    }
                }
            );
        },
        LoginUser(){
            this.Work.User.LoginUserGlobal(this.SignBlock)
                .then((data)=>{
                    console.log(data);
                    this.$store.state.user = data.user;
                    this.$router.push("affair");
                })
        }
    },
    computed:{
        formatEmailError(){
            if(this.SignBlock.email.trim() == '') return false;
            // let myReg=/^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/;
            let myReg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
            
            return !myReg.test(this.SignBlock.email);
        }
    },
    mounted() {
        document.title = "DataLife-用户注册";
    },
};
</script>

<style scoped lang="less">
    @import url(./SignBlock.less);
</style>