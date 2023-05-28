<template>
  <div id="SelfPage">
    <!-- 用户信息 -->
    <div class="UserInfo">
      <img :src="user.headImg" alt="">
      <div class="userInfo">
        <h1>{{user.name}}</h1>
        <h6>{{ user.email}}</h6>
        <el-button type="danger" @click="loginOut()" round>登出</el-button>
      </div>
      
    </div>
    <!-- 生涯详情 -->
    <div class="CareerBlock">
      <!-- 事务生涯统计 -->
      <div class="MyAffairCareer">
        <p class="CareerTitle">
          <el-icon><CircleCheck /></el-icon>事务
        </p>
        <div class="AffairLevelBlock">
          <span class="AllRecordLength">
            <span class="LabelName">总等级</span>
            {{ affairRecordLength }}
            <span class="LabelName">级</span>
          </span>
        </div>
        <div class="AffiarCareerDayBlock">
          <span class="AllAffairLength">
            <span class="LabelName">累计天数</span>
            {{ affairRecordDays }}
            <span class="LabelName">天</span>
          </span>
        </div>
      </div>
      <!-- 短语生涯统计 -->
      <div class="ThoughtCareer">
        <p class="CareerTitle">
          <el-icon><ChatLineSquare /></el-icon>
            短语</p>
        <span class="RecordBlock"
          ><span class="LabelName">总数</span> {{ thoughtDays
          }}<span class="LabelName"> 天</span></span
        >
        <span class="RecordBlock"
          ><span class="LabelName">累计</span> {{ thoughtLength
          }}<span class="LabelName"> 条</span></span
        >
      </div>
    </div>
  </div>
</template>
<script>
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
export default {
  data() {
    return {
      RecordList: [],
      affairRecordLength:0,
      affairRecordDays:0,
      thoughtLength:0,
      thoughtDays:0,
      List: [],
      dateList: [],
      user:{
        id:'',
        headImg:'',
        name:'',
        email:''
      },

    };
  },
  mounted() {
    this.RecordList = this.$store.state.AffairRecordList;
    this.List = this.$store.state.ThoughtRecordList;
    this.user.id = localStorage.getItem('id');
    this.user.headImg = localStorage.getItem('headImg');
    this.user.name = localStorage.getItem('name');
    this.user.email = localStorage.getItem('email');
    this.axios.get(this.Tool.config.address + '/affairRecord/days/'+this.user.id)
      .then((docs) => {
          this.affairRecordDays = docs.data.days;
      })
      this.axios.get(this.Tool.config.address + '/affairRecord/length/'+this.user.id)
      .then((docs) => {
          this.affairRecordLength= docs.data.length;
      })
      this.axios.get(this.Tool.config.address + '/thought/days/'+this.user.id)
      .then((docs) => {
          this.thoughtDays = docs.data.days;
      })
      this.axios.get(this.Tool.config.address + '/thought/length/'+this.user.id)
      .then((docs) => {
          this.thoughtLength = docs.data.length;
      })
  },
  updated(){
    this.user.id = localStorage.getItem('id');
    this.user.headImg = localStorage.getItem('headImg');
    this.user.name = localStorage.getItem('name');
    this.user.email = localStorage.getItem('email');
  },
  methods:{
    loginOut(){
      // console.log('uuu');
      localStorage.setItem('id','');
      localStorage.setItem('headImg','');
      localStorage.setItem('name','');
      localStorage.setItem('email','');
      this.$store.state.isLogin = false;
      this.$router.push("sign");
    }
  }
};
</script>
<style lang="less">
@import url("./User.less");
</style>