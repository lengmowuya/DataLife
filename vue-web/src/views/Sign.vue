<template>
  <div id="SignPage" :class="{onSign:onSign}">
    <div class="backgroundLogo">DataLife</div>
    <div id="SignBlock" v-if="onSign">
      <div class="Header">
        <p class="title" @click="onSign=!onSign">注册</p>
        <p class="nodeError" v-if="nodeError">服务请求错误-请联系管理员</p>
      </div>
      <div class="Form">
        <input type="text" class="email" title="邮箱地址" placeholder="邮箱地址" v-model="SignBlock.email" />
        <input
          type="password"
          class="password"
          title="您的密码"
          placeholder="您的密码"
          v-model="SignBlock.passward"
          @keydown.enter="SignUser()"
        />
        <input type="button" class="submit" value="完成" @click="SignUser()" />
      </div>
      <div class="Footer">
        <span class="goLogin" @click="onSign=false">已有账号?转去登录</span>
      </div>
    </div>
    <div id="LoginBlock" v-if="!onSign">
      <div class="Header">
        <p class="title" @click="onSign=!onSign">现在就登录</p>
        <p class="nodeError" v-if="nodeError">服务请求错误-请联系管理员</p>
      </div>
      <div class="Form">
        <input type="text" class="email" title="邮箱地址" placeholder="邮箱地址" v-model="SignBlock.email" />
        <input
          type="password"
          class="password"
          title="您的密码"
          placeholder="您的密码"
          v-model="SignBlock.passward"
          @keydown.enter="LoginUser()"
        />
        <input type="button" class="submit" value="登录" @click="LoginUser(true)" />
      </div>
      <div class="Footer">
        <span class="goLogin" @click="onSign=true">新用户注册</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nodeError: false,
      onSign: false,
      SignBlock: {
        email: "",
        passward: ""
      }
    };
  },
  methods: {
    // 注册新用户
    SignUser() {
      this.Work.User.SignUser(this.SignBlock).then(
        data => {
          let res = data.res;
          let myUser = data.myUser;
          let log = res.data.type;
          myUser.id = res.data.id;
          if (log == "success") {
            this.$store.state.user = myUser;
            this.$router.push("affair");
          } else if (log == "error") {
            alert("该用户已存在");
          }
        },
        ErrorTip => {
          if (ErrorTip == "DataError") {
            alert("邮箱和密码请勿为空");
          } else if (ErrorTip == "NetError") {
            alert("服务请求错误");
          } else {
            alert("未知错误");
          }
        }
      );
    },
    // 用户登录
    LoginUser(isRemember, User) {
      if (this.$store.state.isLogin) {
        //   resolve();
        return;
      }
      this.Work.User.LoginUser(User).then(
        data => {
          let res = data.res;
          let myUser = data.myUser;
          let log = res.data.type;
          myUser.id = res.data.id;
          if (log == "success") {
            this.$store.state.user = myUser;
            this.$store.state.isLogin = true;
            if (isRemember) {
              this.Tool.writeUserStorage(myUser.email, myUser.passward);
            }
            this.$router.push("affair");
          } else if (log == "null") {
            alert("未找到用户");
          } else if (log == "error") {
            alert("密码错误");
          }
        },
        ErrorTip => {
          if (ErrorTip == "DataError") {
            alert("邮箱和密码请勿为空");
          } else if (ErrorTip == "NetError") {
            alert("服务请求错误");
          } else {
            alert("未知错误");
            console.log(ErrorTip);
          }
        }
      );
    }
  },
  mounted() {
    // 检测与服务器连接
    this.Work.User.TestServer().then(
      () => {
        this.nodeError = false;
      },
      error => {
        console.log(error);
        this.nodeError = true;
      }
    );
    if (this.$store.state.user.email == "") {
      let user = this.Tool.getUserStorage();
      if (user.email == "" || user.email == undefined) {
        return;
      }
      this.SignBlock.email = user.email;
      this.SignBlock.passward = user.passward;
      this.$store.state.user.email = user.email;
      this.$store.state.user.passward = user.passward;
    //   this.LoginUser(false, this.SignBlock);
    }
  }
};
</script>

<style scoped lang="less">
@import url(./../less/Sign.less);
</style>