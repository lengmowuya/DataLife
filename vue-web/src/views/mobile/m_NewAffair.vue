<template>
  <div id="AffairPage">
    <!-- 新建事务的输入板块 -->
    <div class="PageTitle">新建事务</div>
    <div class="EnterBlock">
      <div class="NewBlock">
        <input type="text" class="NewBlockName" placeholder="新事务名称" v-model="NewBlock.name">
        <textarea type="text" class="NewBlockDescribe" placeholder="一句话描述我的新事务" v-model="NewBlock.describe"></textarea>
      </div>
      <div class="AddButton">
        <button @click="addAffair()">完成</button>
      </div>
    </div>
  </div>
</template>
<script>
import {addAffair,removeAffairRecord,removeAffair,addAffairRecord,updateAffair,
  getAllIcon,getAllAffair} from "./../../js/Affair_Work";
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
    addAffair,
    // 删除事务记录
    removeAffairRecord,
    // 删除事务
    removeAffair,
    // 新增事务记录
    addAffairRecord,
    // 更新事务信息
    updateAffair,
    // 获取所有图标
    getAllIcon,
    // 获取所有事务
    getAllAffair,
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
  @import './../../less/mobile/m_NewAffair.less';
</style>
