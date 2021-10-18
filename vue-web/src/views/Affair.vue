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
    <div class="FinishBlock" v-if="RecordShowDate !=null && RecordShowDate.date != undefined">
      <div class="HistoryRecord">
        <div  v-for="(item,i) in HistoryRecord" :key="i" :title="getDateString(item.data)" :class="{HistoryBlock:true}">
          <span v-if="item.record.length > 0" 
            :class="{HistoryDateNumber:true,
              plus5:item.record.length >= 5,
              plus10:item.record.length >= 10,
              active:getDateString(RecordShowDate.data) == getDateString(item.data)}" @click="RecordShowDate = HistoryRecord[i]">
            <!-- <span class="HistroyDateLength">{{item.record.length}}</span> -->
            <span class="HistroyDateIntraday">{{getMiniDateString(item.data)}}</span>
          </span>
        </div>
      </div>
      <p class="FinishDay">{{getDateString(RecordShowDate.data)}}号&nbsp; 周{{RecordShowDate.date.getDay()}}</p>
      <div class="FinishRecordList">
        <div class="FinishRecord" v-for="(item,index) in RecordShowDate.record" :key="index">
          <div class="FinishRecordHeader">
            <div class="FinishRecordIcon">
              <svg class="icon" aria-hidden="true">
                  <!-- <use xlink:href="#icon-dakaqiandao"></use> -->
                <use :xlink:href="'#icon-'+item.affair.icon"></use>
              </svg>
            </div>
            <div class="FinishRecordText">
              <p class="RecordName">{{item.affair.name}}</p>
              <p class="RecordTime">{{getTimeString(item.data)}}</p>
            </div>
          </div>
          <pre class="RecordSentence">{{item.sentence}}</pre>
        </div>
      </div>
    </div>
    <div class="MyAffairCareer">
      <span class="AllRecordLength"><span class="LabelName">总生涯等级</span>{{RecordList.length}}<span class="LabelName"> 级</span></span>
      <span class="AllAffairLength"><span class="LabelName">总生涯天数</span>{{AllAffairDay}}<span class="LabelName"> 天</span></span>
      <span class="AverageRecord"><span class="LabelName">平均生涯记录</span>{{(RecordList.length/AllAffairDay).toFixed(1)}}<span class="LabelName"> 条/天</span></span>
    </div>
    <div class="MyAffair">
      
      <div  v-for="(item,index) in AffairList"  :key="index" @click="changeActiveAffair(item._id)" :class="{AffairLi:true,active:activeAffairId==item._id}">
        <div class="AffairIcon">
           <svg class="icon" aria-hidden="true">
              <!-- <use xlink:href="#icon-dakaqiandao"></use>
               -->
               <use :xlink:href="'#icon-'+item.icon"></use>
          </svg>
        </div>
        <span class="AffairLevel" v-show="item.record.length > 0">Lv.{{item.record.length}}</span>
        <div class="AffairText">
          <p class="AffairLiName"> {{item.name}} </p>
          <p class="AffairLiDescribe">{{item.describe}}</p>
        </div>
        <div class="AffairTools">
          <button class="AffairFinishButton" @click="onPushRecord = true;pushAffair = item"  title="完成一次">
            <i class="el-icon-check"></i>
          </button>
          <button class="AffairEditorButton"  title="编辑这个事务!" @click="Editor.onEditorAffair = true;changeAffairInfo(item)">
            <i class="el-icon-s-tools"> </i>
          </button>


        </div>
      </div>
    </div>
    <div class="FinishRecordPush" v-if="onPushRecord && pushAffair!=null">
      <div class="PushAlert">
        <p class="PushRecordName">{{pushAffair.name}}
          <span class="AffairLevel" v-show="pushAffair.record.length > 0">Lv.{{pushAffair.record.length}}</span>
        </p>
        <p class="PushRecordDescribe" >{{pushAffair.describe}}</p>
        <textarea type="text" v-model="pushSentence" class="PushSentence" placeholder="总结这次完成"></textarea>
        <p class="SentenceThum">{{pushSentence}}</p>
        <div class="PushTools">
          <button class="affirm" @click.prevent="addAffairRecord()">确认</button>
          <button class="cancel" @click="onPushRecord = false">取消</button>
        </div>
      </div>
    </div>
    <div class="EditorAffairPanel" v-if="Editor.onEditorAffair && Editor.editorAffair!=null">
      <div class="PushAlert">
        <div class="AffairIcon" @click="Editor.showIconList = !Editor.showIconList">
           <svg class="icon" aria-hidden="true">
              <use :xlink:href="'#icon-'+Editor.NewAffair.icon"></use>
          </svg>
        </div>
        <div class="IconList" v-show="Editor.showIconList">
          <div class="IconLI" v-for="(icon,i) in IconList" :key="i" @click="Editor.NewAffair.icon = icon.font_class" :title="icon.name">
            <svg class="icon" aria-hidden="true">
                <use :xlink:href="'#icon-'+icon.font_class"></use>
            </svg>
          </div>
        </div>
        <input type="text" v-model="Editor.NewAffair.name" class="NewAffairName" placeholder="事务新名称" title="名称">
        <input type="text" v-model="Editor.NewAffair.describe" class="NewAffairDescribe" placeholder="事务新描述" title="描述">
        <p class="SentenceThum">{{pushSentence}}</p>
        <div class="PushTools">
          <button class="affirm" @click="updateAffair()">修改</button>
          <button class="cancel" @click="Editor.onEditorAffair = false">取消</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      AllAffairDay:0,
      onPushRecord:false,
      pushAffair:null,
      RecordShowDate:null,
      Editor:{
        NewAffair:{
          name:'',
          describe:'',
          icon:''
        },
        showIconList:false,
        onEditorAffair:false,
        editorAffair:null,
      },
      pushSentence:'',
      NowDate:{
        time:new Date().getTime(),
        data:{},
        Date:new Date()
      },
      HistoryRecord:[],
      AffairList:[],
      RecordList:[],
      activeAffairId:'',
      IconList:[],
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
    addAffairRecord(){
      if(this.pushSentence.trim() == ''){
        alert("请填入您的总结");
        return;
      }
      let info = {
        affair:this.pushAffair._id,
        sentence:this.pushSentence
      }
      this.axios.post('http://127.0.0.1:3000/affairRecord/add',info)
        .then(()=>{
          this.getAllAffair();
          this.onPushRecord = false;
          this.pushAffair = null;
          this.pushSentence = '';
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
    getMiniDateString(data){
      return data.month + '-' + data.day;
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
    updateAffair(){
      let NewAffair = this.Editor.NewAffair;
      if(NewAffair.name.trim() == '' || NewAffair.describe.trim() == '' || NewAffair.icon.trim() == ''){
        alert("事务新信息不能为空!");
        return;
      }
      this.axios.post('http://127.0.0.1:3000/affair/update',NewAffair)
        .then(()=>{
          this.getAllAffair();
          this.Editor.showIconList = false;
          this.Editor.onEditorAffair = false;
        })
    },
    changeAffairInfo(item){
      this.Editor.editorAffair = item;
      this.Editor.NewAffair._id = item._id;
      this.Editor.NewAffair.name = item.name;
      this.Editor.NewAffair.describe = item.describe;
      this.Editor.NewAffair.icon = item.icon;
      if(this.Editor.NewAffair.icon == ''){
        this.Editor.NewAffair.icon = this.IconList[0].font_class;
      }
    },
    getAllIcon(){
      this.axios.get('http://127.0.0.1:3000/icon/all')
        .then(res=>{
          this.IconList = res.data;
          if(this.Editor.NewAffair.icon == ''){
            this.Editor.NewAffair.icon = this.IconList[0].font_class;
          }
        })
    },
    getAllAffair(){
      let that = this;
      this.axios.get('http://127.0.0.1:3000/affair/all')
        .then(res=>{
          this.AffairList = res.data;
          this.RecordList = [];
          this.HistoryRecord = [];
          this.AffairList.forEach(item=>{
            if(Array.isArray(item.record) && item.record.length > 0){
              for(let i = 0;i<item.record.length;i++){
                item.record[i].affair = item;
                that.RecordList.push(item.record[i]);
                // 设置单个记录
                let record = item.record[i];
                // console.log(record._id);
                // 初始化历史记录索引
                if(this.HistoryRecord.length == 0){
                  // console.log("init");
                  let newDate = {
                    data:this.NowDate.data,
                    record:[],
                    date:new Date(this.NowDate.time)
                  }
                  this.HistoryRecord.push(newDate);
                  this.RecordShowDate = this.HistoryRecord[0];
                  for(let e=1;e<50;e++){
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
                this.AllAffairDay = 0;
                this.HistoryRecord.forEach(item=>{
                  if(item.record.length >= 1){
                    this.AllAffairDay += 1;
                  }
                })
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
          this.AffairList.sort((a,b)=>{
            return b.record.length - a.record.length;
          })
          this.Editor.editorAffair = this.AffairList[0];
          this.Editor.NewAffair._id = this.Editor.editorAffair._id;
          this.Editor.NewAffair.name = this.Editor.editorAffair.name;
          this.Editor.NewAffair.describe = this.Editor.editorAffair.describe;
          this.Editor.NewAffair.icon = this.Editor.editorAffair.icon;
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
    this.getAllIcon();
    document.title = "DataLife-" + "事务";
    console.log("this is big");
    if(document.documentElement.clientWidth < 1000){
      this.$router.push('affair_mobile');
    }
  }
}
</script>
<style lang="less" scoped>
@import './../less/Affair.less';
</style>
