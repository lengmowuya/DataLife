<template>
  <div id="SignPage" :class="{onSign:onSign}">
      <div class="backgroundLogo">
          DataLife
      </div>
      <div id="SignBlock" v-if="onSign">
          <div class="Header">
              <p class="title">注册-Sign</p>
              <p class="nodeError" v-if="nodeError">服务器请求失败-请联系管理员404</p>
          </div>
          <div class="Form">
            <input type="text" class="email" title="邮箱地址" placeholder="邮箱地址" v-model="SignBlock.email">
            <input type="passward" class="passward" title="您的密码" placeholder="您的密码" v-model="SignBlock.passward" @keydown.enter="SignUser()">
            <input type="button" class="submit" value="完成" @click="SignUser()">
          </div>
          <div class="Footer">
              <span class="goLogin" @click="onSign=false">已有账号?转去登录</span>
          </div>
      </div>
      <div id="LoginBlock" v-if="!onSign">
          <div class="Header">
              <p class="title">登录-Login</p>
              <p class="nodeError" v-if="nodeError">服务器请求失败-请联系管理员404</p>
          </div>
          <div class="Form">
            <input type="text" class="email" title="邮箱地址" placeholder="邮箱地址" v-model="LoginBlock.email">
            <input type="passward" class="passward" title="您的密码" placeholder="您的密码" v-model="LoginBlock.passward" @keydown.enter="LoginUser()">
            <input type="button" class="submit" value="上线" @click="LoginUser()">
          </div>
          <div class="Footer">
              <span class="goLogin" @click="onSign=true">没有账号?现在就去注册</span>
          </div>
      </div>
  </div>
</template>

<script>
    export default {
        data(){
            return {
                nodeError:false,
                onSign:true,
                SignBlock:{
                    email:'',
                    passward:''
                },
                LoginBlock:{
                    email:'',
                    passward:''
                }
            }
        },
        methods:{
            SignUser(){
                if(this.SignBlock.email.trim() == '' || this.SignBlock.passward.trim() == ''){
                    alert("邮箱和密码请勿为空");
                    return;
                }
                let myUser = {
                    name:this.SignBlock.email,
                    email:this.SignBlock.email,
                    passward:this.SignBlock.passward
                }
                this.axios.post(this.Tool.config.address + '/user/sign',myUser)
                    .then((res)=>{
                        let log = res.data.type;
                        myUser.id = res.data.id;
                        if(log == 'success'){
                            this.$store.state.user = myUser;
                            this.$router.push('affair');
                        }else if(log == 'error'){
                            alert("该用户已存在");
                        }else if(log == 'ERROR'){
                            alert("服务器错误-请联系管理员");
                        }

                    })
            },
            LoginUser(){
                if(this.LoginBlock.email.trim() == '' || this.LoginBlock.passward.trim() == ''){
                    alert("邮箱和密码请勿为空");
                    return;
                }
                let myUser = {
                    name:this.LoginBlock.email,
                    email:this.LoginBlock.email,
                    passward:this.LoginBlock.passward
                }
                this.axios.post(this.Tool.config.address + '/user/login',myUser)
                    .then((res)=>{
                        // this.NewBlock.name = '';
                        // this.NewBlock.describe = '';
                        // this.getAllAffair();
                        let log = res.data.type;
                        myUser.id = res.data.id;
                        if(log == 'success'){
                            this.$store.state.user = myUser;
                            this.$router.push('affair');
                        }else if(log == 'null'){
                            alert("未找到用户");
                        }else if(log == 'error'){
                            alert("密码错误");
                        }else if(log == 'ERROR'){
                            alert("服务器错误-请联系管理员");
                        }
                        
                    })
            }
        },
        mounted(){
            this.axios.get(this.Tool.config.address + '/test')
                .then((res)=>{
                    console.log("test");
                    let log = res.data.type;
                    if(log == 'success'){
                        this.nodeError = false;
                    }else{
                        this.nodeError = true;
                    }
                })
        }
    }
</script>

<style scoped lang="less">
@import url(./../less/Sign.less);
</style>