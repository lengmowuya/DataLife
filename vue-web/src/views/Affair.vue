<template>
  <div id="AffairPage">
    <!-- 新建事务的输入板块 -->
    <div class="EnterBlock">
      <div class="NewBlock">
        <input type="text" class="NewBlockName" placeholder="新事务名称" v-model="NewBlock.name">
        <input type="text" class="NewBlockDescribe" placeholder="一句话描述我的新事务" v-model="NewBlock.describe">
      </div>
      <div class="AddButton">
        <button @click="addAffair()">+</button>
      </div>
    </div>
    <!-- 完成的记录板块 -->
    <div class="FinishBlock" v-if="RecordShowDate !=null && RecordShowDate.date != undefined">
      <div class="HistoryRecord">
        <div  v-for="(item,i) in HistoryRecord" :key="i" :title="Tool.getDateString(item.data)" :class="{HistoryBlock:true}">
          <span v-if="item.record.length > 0" 
            :class="{HistoryDateNumber:true,
              plus5:item.record.length >= 5,
              plus10:item.record.length >= 10,
              active:Tool.getDateString(RecordShowDate.data) == Tool.getDateString(item.data)}" @click="RecordShowDate = HistoryRecord[i],Record.activeIndex = i">
            <span class="HistroyDateIntraday">{{Tool.getMiniDateString(item.data)}}</span>
          </span>
        </div>
      </div>
      <p class="FinishDay"><span class="text">{{Tool.getDateString(RecordShowDate.data)}}号&nbsp; 周{{RecordShowDate.date.getDay()}}</span></p>
      <div class="FinishRecordList">
        <div class="FinishRecord" v-for="(item,index) in RecordShowDate.record" :key="index">
          <div class="FinishRecordHeader">
            <div class="FinishRecordIcon">
              <svg class="icon" aria-hidden="true">
                <use :xlink:href="'#icon-'+item.affair.icon"></use>
              </svg>
            </div>
            <div class="FinishRecordText">
              <p class="RecordName">{{item.affair.name}}</p>
              <p class="RecordTime">{{Tool.getTimeString(item.data)}}</p>
            </div>
            <div class="morePanel">
              <i class="el-icon-delete-solid button" title="删除" @click="removeAffairRecord(item._id)"></i>
            </div>
          </div>
          <pre class="RecordSentence">{{item.sentence}}</pre>
        </div>
      </div>
    </div>
    <div class="MyAffairBigBlock">
      <!-- 我事务的数据头衔 -->
      <div class="MyAffairCareer" v-if="RecordList.length>10">
        <span class="AllRecordLength"><span class="LabelName">总生涯等级</span>{{RecordList.length}}<span class="LabelName"> 级</span></span>
        <span class="AllAffairLength"><span class="LabelName">总生涯天数</span>{{AllAffairDay}}<span class="LabelName"> 天</span></span>
        <span class="AverageRecord"><span class="LabelName">平均生涯记录</span>{{(RecordList.length/AllAffairDay).toFixed(1)}}<span class="LabelName"> 条/天</span></span>
      </div>
      <!-- 我所有的事务 -->
      <div class="MyAffair">
        <div class="NullBlockTip" v-if="AffairList.length<=0">
          您暂无事务,先创建一个吧!
        </div>
        <div  v-for="(item,index) in AffairList"  :key="index" @click="changeActiveAffair(item._id)" :class="{AffairLi:true,active:activeAffairId==item._id}">
          <div class="AffairIcon">
            <svg class="icon" aria-hidden="true">
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
    </div>
    <!-- 完成该事务板块(默认隐藏) -->
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
    <!-- 编辑该事务板块(默认隐藏) -->
    <div class="EditorAffairPanel" v-if="Editor.onEditorAffair && Editor.editorAffair!=null">
      <div class="PushAlert">
        <div class="AffairIcon" @click="Editor.showIconList = !Editor.showIconList">
           <svg class="icon" aria-hidden="true">
              <use :xlink:href="'#icon-'+Editor.NewAffair.icon"></use>
          </svg>
        </div>
        <!-- 图标列表 -->
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
        <div class="deleteButton">
          <button title="警告,删除不可撤销!" @click="removeAffair(Editor.editorAffair)">删除事务</button>
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
      // 编辑板块信息
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
      Record:{
        activeIndex:0,
      },
      HistoryRecord:[],
      AffairList:[],
      RecordList:[],
      activeAffairId:'',
      IconList:[],
      // 新建事务板块信息
      NewBlock:{
        name:'',
        describe:''
      }
    }
  },
  methods:{
    keyDown() {
      document.onkeydown = (e) => {
        //事件对象兼容
        let e1 = e || event || window.event || arguments.callee.caller.arguments[0]
        //键盘按键判断:左箭头-37;上箭头-38；右箭头-39;下箭头-40
        if (e1 && e1.keyCode == 37 && this.Record.activeIndex < this.HistoryRecord.length-1) {
          if(this.HistoryRecord[this.Record.activeIndex+1].record.length>0){
            this.Record.activeIndex++;
            this.RecordShowDate = this.HistoryRecord[this.Record.activeIndex];
          }
          // 按下左箭头
        } else if (e1 && e1.keyCode == 39 && this.Record.activeIndex > 0 ) {
            // 按下右箭头
            this.Record.activeIndex--;
            this.RecordShowDate = this.HistoryRecord[this.Record.activeIndex];
        }
      }
    },
    // 切换选中的事务
    changeActiveAffair(id){
      this.activeAffairId = id;
    },
    // 新增事务
    addAffair(){
      let NewAffair = this.NewBlock;
      if(NewAffair.name.trim() == '' || NewAffair.describe.trim() == ''){
        alert("事务的名称或描述不能为空");
        return;
      }
      NewAffair.owner=this.$store.state.user.id;
      this.axios.post(this.Tool.config.address + '/affair/add',NewAffair)
        .then(()=>{
          this.NewBlock.name = '';
          this.NewBlock.describe = '';
          this.getAllAffair();
        })
    },
    removeAffairRecord(id){
      let Affair = {id};
      this.axios.post(this.Tool.config.address + '/affairRecord/remove',Affair)
        .then(()=>{
          this.Editor.onEditorAffair = false;
          this.getAllAffair();
        })
    },
    // 删除事务
    removeAffair(id){
      let Affair = {id};
      this.axios.post(this.Tool.config.address + '/affair/remove',Affair)
        .then(()=>{
          this.Editor.onEditorAffair = false;
          this.getAllAffair();
        })
    },
    // 新增事务记录
    addAffairRecord(){
      if(this.pushSentence.trim() == ''){
        alert("请填入您的总结");
        return;
      }
      let info = {
        affair:this.pushAffair._id,
        sentence:this.pushSentence
      }
      this.axios.post(this.Tool.config.address + '/affairRecord/add',info)
        .then(()=>{
          this.getAllAffair();
          this.onPushRecord = false;
          this.pushAffair = null;
          this.pushSentence = '';
        })
    },
    // 
    // 更新事务信息
    updateAffair(){
      let NewAffair = this.Editor.NewAffair;
      if(NewAffair.name.trim() == '' || NewAffair.describe.trim() == '' || NewAffair.icon.trim() == ''){
        alert("事务新信息不能为空!");
        return;
      }
      this.axios.post(this.Tool.config.address + '/affair/update',NewAffair)
        .then(()=>{
          this.getAllAffair();
          this.Editor.showIconList = false;
          this.Editor.onEditorAffair = false;
        })
    },
    // 本地修改事务
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
    // 获取所有图标
    getAllIcon(){
      this.axios.get(this.Tool.config.address + '/icon/all')
        .then(res=>{
          this.IconList = res.data;
          if(this.Editor.NewAffair.icon == ''){
            this.Editor.NewAffair.icon = this.IconList[0].font_class;
          }
        })
    },
    // 获取所有事务
    getAllAffair(){
      let that = this;
      this.axios.get(this.Tool.config.address + '/affair/all/'+this.$store.state.user.id )
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
                // 初始化历史记录索引
                if(this.HistoryRecord.length == 0){
                  let newDate = {
                    data:this.NowDate.data,
                    record:[],
                    date:new Date(this.NowDate.time)
                  }
                  this.HistoryRecord.push(newDate);
                  this.RecordShowDate = this.HistoryRecord[0];
                  for(let e=1;e<50;e++){
                    let dayTime = this.NowDate.time - e * 86400000;
                    let dayData = this.Tool.FormatDate(dayTime);
                    let newDate = {
                      data:dayData,
                      record:[],
                      date:new Date(dayTime)
                    }
                    this.HistoryRecord.push(newDate);
                  }
                }
                for(let j = 0 ; j < this.HistoryRecord.length;j++){
                  let HisDate = this.HistoryRecord[j].data;
                  let TargetRecord = record.data;
                  let Date = this.HistoryRecord[j];
                  if(HisDate.year == TargetRecord.year && HisDate.month == TargetRecord.month && HisDate.day == TargetRecord.day){
                    Date.record.push(record);
                    break;
                  }
                }
                this.AllAffairDay = 0;
                this.HistoryRecord.forEach(item=>{
                  if(item.record.length >= 1){
                    this.AllAffairDay += 1;
                  }
                })
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
  },
  mounted(){
    // console.log(this.$store.state.NowDate);
    // if(this.$store.state.user == undefined ||this.$store.state.user.email == undefined || this.$store.state.user.email == ''){
    //   this.$router.push('sign');
    // }
    // 初始化数据
    this.NowDate.data = this.Tool.FormatDate(this.NowDate.time);
    this.NowDate.Date = new Date(this.NowDate.time);
    this.getAllAffair();
    this.getAllIcon();
    // 页面标题
    document.title = "DataLife-" + "事务";
    // 跳转移动端
    if(document.documentElement.clientWidth < 1000){
      this.$router.push('affair_mobile');
    }
    this.keyDown();
    // console.log(this.$store.state.NowDate);
  },

}
</script>
<style lang="less" scoped>
  @import './../less/Affair.less';
</style>
