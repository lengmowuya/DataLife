<template>
  <div id="AffairPage">
    <!-- 新建事务的输入板块 -->
    <div class="EnterBlock" v-if="false">
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
      <p class="FinishDay" @click="showDateList = !showDateList"><span class="text">{{Tool.getDateString(RecordShowDate.data)}}号&nbsp; 周{{Tool.FormatDateWeekChinese(RecordShowDate.date.getDay())}}</span></p>
      <div class="HistoryRecord" v-show="showDateList">
        <div  v-for="(item,i) in HistoryRecord" :key="i" :title="Tool.getDateString(item.data)" :class="{HistoryBlock:true}">
          <span v-if="item.record.length > 0" 
            :class="{HistoryDateNumber:true,
              plus5:item.record.length >= 5,
              plus10:item.record.length >= 10,
              active:Tool.getDateString(RecordShowDate.data) == Tool.getDateString(item.data)}" @click="RecordShowDate = HistoryRecord[i],Record.activeIndex = i">
            <span class="HistroyDateIntraday">{{Tool.FormatDateWeekChinese(item.date.getDay())}}</span>
          </span>
        </div>
      </div>
      <div class="FinishRecordList">
        <div class="FinishRecord" v-for="(item,index) in RecordShowDate.record" :key="index">
          <div class="FinishRecordHeader">
            <div class="FinishRecordIcon">
              <svg class="iconBackground" aria-hidden="true">
                <use :xlink:href="'#icon-'+item.affair.icon"></use>
            </svg>
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
  </div>
</template>
<script>
// import {addAffair,removeAffairRecord,removeAffair,addAffairRecord,updateAffair,
//   getAllIcon,getAllAffair} from "./../../js/Affair_Work";
export default {
  data(){
    return {
      AllAffairDay:0,
      showDateList:false,
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
    // keyDown() {
    //   document.onkeydown = (e) => {
    //     //事件对象兼容
    //     let e1 = e || event || window.event || arguments.callee.caller.arguments[0]
    //     //键盘按键判断:左箭头-37;上箭头-38；右箭头-39;下箭头-40
    //     if (e1 && e1.keyCode == 37 && this.Record.activeIndex < this.HistoryRecord.length-1) {
    //       if(this.HistoryRecord[this.Record.activeIndex+1].record.length>0){
    //         this.Record.activeIndex++;
    //         this.RecordShowDate = this.HistoryRecord[this.Record.activeIndex];
    //       }
    //       // 按下左箭头
    //     } else if (e1 && e1.keyCode == 39 && this.Record.activeIndex > 0 ) {
    //         // 按下右箭头
    //         this.Record.activeIndex--;
    //         this.RecordShowDate = this.HistoryRecord[this.Record.activeIndex];
    //     }
    //   }
    // },
    // // 切换选中的事务
    // changeActiveAffair(id){
    //   this.activeAffairId = id;
    // },
    // // 新增事务
    // addAffair,
    // // 删除事务记录
    // removeAffairRecord,
    // // 删除事务
    // removeAffair,
    // // 新增事务记录
    // addAffairRecord,
    // // 更新事务信息
    // updateAffair,
    // // 获取所有图标
    // getAllIcon,
    // // 获取所有事务
    // getAllAffair,
    // // 本地修改事务
    // changeAffairInfo(item){
    //   this.Editor.editorAffair = item;
    //   this.Editor.NewAffair._id = item._id;
    //   this.Editor.NewAffair.name = item.name;
    //   this.Editor.NewAffair.describe = item.describe;
    //   this.Editor.NewAffair.icon = item.icon;
    //   if(this.Editor.NewAffair.icon == ''){
    //     this.Editor.NewAffair.icon = this.IconList[0].font_class;
    //   }
    // }
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
    // 初始化数据
    this.NowDate.data = this.Tool.FormatDate(this.NowDate.time);
    this.NowDate.Date = new Date(this.NowDate.time);
    this.getAllAffair();
    this.getAllIcon();
    // 页面标题
    document.title = "DataLife-" + "事务";
    this.keyDown();
  },
}
</script>
<style lang="less" scoped>
  @import './../../less/mobile/m_Record.less';
</style>
