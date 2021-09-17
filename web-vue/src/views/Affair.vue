<template>
  <div id="AffairPage">
    <div class="EnterBlock">
      <div class="NewBlock">
        <input type="text" class="NewBlockName" placeholder="新事务名称" v-model="NewBlock.name">
        <input type="text" class="NewBlockDescribe" placeholder="一句话描述我的新事务" v-model="NewBlock.describe">
      </div>
      <div class="AddButton">
        <button @click="addAffair()"><i class="el-icon-circle-plus"></i></button>
      </div>
    </div>
    <div class="HistoryRecord">
      <div class="HistoryBlock" v-for="(item,i) in HistoryRecord" :key="i">
        <span class="HistoryDateNumber">
          {{item.record.length}}
        </span>
      </div>
    </div>
    <div class="FinishBlock" v-if="NowDate.Date != undefined">
      <p class="FinishDay">[ 星期{{NowDate.Date.getDay()}} ]</p>
      <div class="FinishRecordList">
        <div class="FinishRecord" v-for="(item,index) in RecordList" :key="index">
          <div class="FinishRecordIcon">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-dakaqiandao"></use>
            </svg>
          </div>
          <div class="FinishRecordText">
            <p class="RecordName">{{item.affair.name}}</p>
            <p class="RecordTime">{{getTimeString(item.data)}}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="MyAffair">
      <!-- @click="addAffairRecord(item._id)" -->
      <div  v-for="(item,index) in AffairList"  :key="index" @click="changeActiveAffair(item._id)" :class="{AffairLi:true,active:activeAffairId==item._id}">
        <div class="AffairIcon">
          <!-- <i class="el-icon-medal-1"></i> -->
          <!-- <i class="iconfont icon-zhanghuxiugai"></i>
           -->
           <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-dakaqiandao"></use>
          </svg>
        </div>
        <div class="AffairText">
          <p class="AffairLiName">{{item.name}}</p>
          <p class="AffairLiDescribe">{{item.describe}}</p>
        </div>
        <div class="AffairTools">
          <button class="finish" @click.prevent="addAffairRecord(item._id)" title="完成一次">
            <i class="el-icon-plus"></i>
          </button>
          <button class="delete"  title="删除这个事务" @click.prevent="removeAffair(item._id)">
            <i class="el-icon-close"></i>
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data(){
    return {
      NowDate:{
        time:new Date().getTime(),
        data:{},
        Date:new Date()
      },
      HistoryRecord:[],
      AffairList:[],
      RecordList:[],
      activeAffairId:'',
      NewBlock:{
        name:'',
        describe:''
      }
    }
  },
  methods:{
    changeActiveAffair(id){
      this.activeAffairId = id;
    },
    addAffair(){
      let NewAffair = this.NewBlock;
      if(NewAffair.name.trim() == '' || NewAffair.describe.trim() == ''){
        alert("事务的名称或描述不能为空");
        return;
      }
      this.axios.post('http://127.0.0.1:3000/affair/add',NewAffair)
        .then(()=>{
          this.NewBlock.name = '';
          this.NewBlock.describe = '';
          this.getAllAffair();
        })
    },
    removeAffair(id){
      let Affair = {id};
      this.axios.post('http://127.0.0.1:3000/affair/remove',Affair)
        .then(()=>{
          this.getAllAffair();
        })
    },
    addAffairRecord(id){
      let info = {
        affair:id
      }
      this.axios.post('http://127.0.0.1:3000/affairRecord/add',info)
        .then(()=>{
          this.getAllAffair();
        })
    },
    FormatDate(timeStamp){
      let TimeObj = new Date(timeStamp);
      let date = {
          year:TimeObj.getFullYear(),
          month:TimeObj.getMonth() + 1,
          day:TimeObj.getDate(),
          hour:TimeObj.getHours(),
          min:TimeObj.getMinutes(),
          sec:TimeObj.getSeconds()
      }
      return date;
    },
    getDateString(data){
      return data.year + '-' + data.month + '-' + data.day;
    },
    getTimeString(data){
      let hourName = '';
      let hour = data.hour;
      if(hour <= 6){
        hourName = "凌晨";
      }else if(hour <= 10){
        hourName = "上午";
      }else if(hour <= 12){
        hourName = "中午";
      }else if(hour <= 17){
        hourName = "下午";
      }else if(hour <= 21){
        hourName = "晚上";
      }else{
        hourName = "半夜";
      }
      return hourName + '' + data.hour + ':' + data.min;
    },
    getAllAffair(){
      let that = this;
      this.axios.get('http://127.0.0.1:3000/affair/all')
        .then(res=>{
          this.AffairList = res.data;
          // console.log(this.AffairList)
          this.RecordList = [];
          this.HistoryRecord = [];
          this.AffairList.forEach(item=>{
            if(Array.isArray(item.record) && item.record.length > 0){
              for(let i = 0;i<item.record.length;i++){
                item.record[i].affair = item;
                that.RecordList.push(item.record[i]);
                // 设置单个记录
                let record = item.record[i];
                console.log(record._id);
                // 初始化历史记录索引
                if(this.HistoryRecord.length == 0){
                  // console.log("init");
                  let newDate = {
                    data:this.NowDate.data,
                    record:[],
                    date:new Date(this.NowDate.time)
                  }
                  this.HistoryRecord.push(newDate);
                  for(let e=1;e<40;e++){
                    let dayTime = this.NowDate.time - e * 86400000;
                    let dayData = this.FormatDate(dayTime);
                    let newDate = {
                      data:dayData,
                      record:[],
                      date:new Date(dayTime)
                    }
                    this.HistoryRecord.push(newDate);
                  }
                }
                // let hasDate = false;
                // 遍历日期
                // console.log(this.HistoryRecord.length);
                for(let j = 0 ; j < this.HistoryRecord.length;j++){
                  let HisDate = this.HistoryRecord[j].data;
                  let TargetRecord = record.data;
                  let Date = this.HistoryRecord[j];
                  // 如果目标日期和记录日期相同
                  // console.log(HisDate.day,TargetRecord.day);
                  if(HisDate.year == TargetRecord.year && HisDate.month == TargetRecord.month && HisDate.day == TargetRecord.day){
                    // hasDate = true;
                    Date.record.push(record);
                    // console.log("push",Date.record.length);
                    // lssz.push(record);
                    // console.log(lssz.length);
                    break;
                  }
                }
                // // 如果没有存在的日期
                // if(!hasDate){
                //   console.log("New");
                //   let newDate2 = {
                //     data:record.data,
                //     record:[record],
                //     date:new Date(record)
                //   }
                //   this.HistoryRecord.push(newDate2);
                // }
              }
            }
          })
          // 对记录进行时间排序
          this.RecordList.sort((a,b)=>{
            if(a.data.hour != b.data.hour){
              return b.data.hour - a.data.hour;
            }else if(a.data.min != b.data.min){
              return b.data.min - a.data.min;
            }else{
              return b.data.sec - a.data.sec;
            }
          })
        })
    }
  },
  computed:{
    isToday(data){
      let NowData = this.NowDate.data;
      if(data.year == NowData && data.month == NowData.month && data.day == NowData.day){
        return true;
      }
      return false;
    }
  },
  created(){
    // this.getAllAffair();
  },
  mounted(){
    this.NowDate.data = this.FormatDate(this.NowDate.time);
    this.NowDate.Date = new Date(this.NowDate.time);
    this.getAllAffair();
  }
}
</script>
<style lang="less" scoped>
@import './../less/Affair.less';
</style>
