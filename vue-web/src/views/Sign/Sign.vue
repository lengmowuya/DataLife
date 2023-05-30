<template>
    <div id="SignPage" :class="{onSign:onSign}">
        <div class="backgroundLogo">DataLife</div>
        <transition name="appear">
            <div id="SignBlock" v-if="onSign">
                <div class="logo">
                    <img src="./../../assets/logo.png" alt="">
                </div>
                <div class="Header">
                    <p class="title" @click="onSign=!onSign">注册</p>
                    <p class="nodeError" v-if="nodeError">服务请求错误-请联系管理员</p>
                </div>
                <div class="Form">
                    <input type="text" class="email" title="邮箱地址" placeholder="邮箱地址" v-model="SignBlock.email" />
                    <input type="password" class="password" title="您的密码" placeholder="您的密码" v-model="SignBlock.passward"
                        @keydown.enter="SignUser()" />
                    <input type="button" class="submit" value="注册账号" @click="SignUser()" />
                </div>
                <div class="Footer">
                    <span class="goLogin" @click="onSign=false">已有账号?转去登录</span>
                </div>
            </div>
        </transition>
        <transition name="appear">
            <div id="LoginBlock" v-if="!onSign">
                <div class="logo">
                    <img src="./../../assets/logo.png" alt="">
                </div>
                <div class="Header">
                    <p class="title" @click="onSign=!onSign">现在就登录</p>
                    <p class="nodeError" v-if="nodeError">服务请求错误-请联系管理员</p>
                </div>
                <div class="Form">
                    <input type="text" class="email" title="邮箱地址" placeholder="邮箱地址" v-model="SignBlock.email" />
                    <input type="password" class="password" title="您的密码" placeholder="您的密码" v-model="SignBlock.passward"
                        @keydown.enter="LoginUser()" />
                    <input type="button" class="submit" value="登录账号" @click="LoginUser(true)" />
                </div>
                <div class="Footer">
                    <span class="goLogin" @click="onSign=true">新用户注册</span>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    name:'Sign',
    data() {
        return {
            nodeError: false,
            onSign: false,
            SignBlock: {
                email: "",
                passward: "",
            },
        };
    },
    methods: {
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
                        alert("该用户已存在,请直接登录");
                        this.onSign = false;
                    } else if (log == "error") {
                        alert("未知错误,请直接联系DataLife管理人员!");
                    }
                },
                (ErrorTip) => {
                    if (ErrorTip == "DataError") {
                        alert("邮箱和密码请勿为空");
                    } else if (ErrorTip == "NetError") {
                        alert("服务请求错误,请直接联系DataLife管理人员!");
                    } else {
                        alert("未知错误,请直接联系DataLife管理人员!");
                    }
                }
            );
        },
        LoginUser(){
            // console.log(this.SignBlock);
            this.Work.User.LoginUserGlobal(this.SignBlock)
                .then((data)=>{
                    console.log(data);
                    this.$store.state.user = data.user;
                    // this.$store.state.user.id = data.user.id;
                    // this.$store.state.isLogin = true;
                    this.$router.push("affair");
                })
        }
    },
    updated(){
        if(this.onSign){
            document.title = "DataLife-用户注册";
        }else{
            document.title = "DataLife-用户登录";
        }
    },
    mounted() {
        if(this.onSign){
            document.title = "DataLife-用户注册";
        }else{
            document.title = "DataLife-用户登录";
        }
        // 检测与服务器连接
        this.Work.User.TestServer().then(
            () => {
                this.nodeError = false;
            },
            (error) => {
                console.log(error);
                this.nodeError = true;
            }
        );
    },
};
</script>

<style scoped lang="less">
@import url(./Sign.less);
</style>