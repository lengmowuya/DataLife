<template>
  <div id="SelfPage">
    <div class="Head">
          <!-- 用户信息 -->
    <div class="HeadLeft">
      <div class="User">
        <img :src="user.headImg" alt="">
        <div class="userInfo">
          <h1>{{user.name}}<el-icon><EditPen /></el-icon></h1>
          <h6>{{ user.email}}</h6>
          <div class="menu">
            <el-button type="danger" @click="loginOut()" round>登出</el-button>
          </div>
        </div>
        
      </div>
    </div>
    <div class="HeadRight">
      <div class="chart">

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
              <span class="LabelName">完成记录:</span>
              {{ affairRecordLength }}
              <span class="LabelName"></span>
            </span>
          </div>
          <div class="AffiarCareerDayBlock">
            <span class="AllAffairLength">
              <span class="LabelName">累计天数:</span>
              {{ affairRecordDays }}
              <!-- <span class="LabelName">天</span> -->
            </span>
          </div>
        </div>
        <!-- 短语生涯统计 -->
        <div class="ThoughtCareer">
          <p class="CareerTitle">
            <el-icon><ChatLineSquare /></el-icon>
              短语</p>
          <span class="RecordBlock"
            ><span class="LabelName">累计天数:</span> 
            {{ thoughtDays }}
            <!-- <span class="LabelName"> 天</span> -->
          </span>
          <span class="RecordBlock"
            ><span class="LabelName">累计记录:</span> 
            {{ thoughtLength }}
            <!-- <span class="LabelName"> 条</span> -->
          </span>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>
<script>
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import * as echarts from 'echarts';
import 'dayjs/locale/zh-cn'
import dayjs from 'dayjs';
dayjs.locale('zh-cn');
import {defineComponent , ref , computed , toRefs , getCurrentInstance} from 'vue'

export default {
  name:'User',
  data() {
    return {
      affairRecordLength:0,
      affairRecordDays:0,
      thoughtLength:0,
      thoughtDays:0,
      user:{
        id:'',
        headImg:'',
        name:'',
        email:''
      },
      xAxis:[],
      ChartData:[],
      myChart:null,
    };
  },
  mounted() {
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
    // 梳理出7天
    let days = [];
    while(days.length < 7){
        if(days.length == 0){
            days.push(dayjs(new Date()));
        }else{
            // 倒推一天
            let prev = days[0];
            // console.log(prev);
            days.unshift(dayjs(prev).add(-1,'day'));
        }
    }
    for(let i = 0;i < days.length;i++){
        let item = days[i];
        days[i] = dayjs(item).format('dddd').replace('星期','周');
    }
    this.xAxis = days;
    // 装载Echarts
    this.myChart = echarts.init(document.querySelector('.chart'));
    // 获取recent数据
    this.axios.get(this.Tool.config.address+'/affairRecord/recent7/'+this.user.id)
        .then(docs=>{
            let mapList = this.xAxis.concat();
            let data = docs.data.reduce((prev,item,i)=>{
                let week = dayjs(new Date(item.time)).format('dddd').replace('星期','周');
                // 对比归类
                for(let j = 0;j<mapList.length;j++){
                    if(week == mapList[j]){
                        if(prev[j] == undefined){
                            prev[j] = 0;
                        }
                        prev[j]++;
                    }
                }
                return prev;
            },[]);
            this.ChartData = data;
            this.drawChart();
          })
    document.title = "DataLife-我的生涯";
  },
  Updated(){
    // this.user.id = localStorage.getItem('id');
    // this.user.headImg = localStorage.getItem('headImg');
    // this.user.name = localStorage.getItem('name');
    // this.user.email = localStorage.getItem('email');
    this.drawChart();
  },
  methods:{
    loginOut(){
      localStorage.setItem('id','');
      localStorage.setItem('headImg','');
      localStorage.setItem('name','');
      localStorage.setItem('email','');
      this.$store.state.isLogin = false;
      this.$router.push("sign");
    },
    drawChart(){
      this.$data.myChart.setOption({
          xAxis: {
            type: 'category',
            data: this.$data.xAxis
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              // data:[8, 9, 1, 1, 1, 10, 6],
              data:this.$data.ChartData,
              type: 'bar',
              smooth: true
            }
          ]
        });
    }
  }
};
</script>
<style lang="less" scoped>
@import url("./User.less");
</style>