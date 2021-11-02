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
    <div class="MyAffairBigBlock">
      <!-- 我事务的数据头衔 -->
      <div class="MyAffairCareer" v-if="RecordList.length>10">
        <span class="AllRecordLength">
          <span class="awardText">{{RecordList.length}}</span>
          <span class="LabelName">总生涯等级</span></span>
        <span class="AllAffairLength">
          <span class="awardText">{{AllAffairDay}}</span>
          <span class="LabelName">总生涯天数</span>
        </span>
        <span class="AverageRecord">
          <span class="awardText">{{(RecordList.length/AllAffairDay).toFixed(1)}}</span>
          <span class="LabelName">平均生涯记录</span>
        </span>
      </div>
      <!-- 我所有的事务 -->
      <div class="MyAffair">
        <div class="NullBlockTip" v-if="AffairList.length<=0">
          您暂无事务,先创建一个吧!
        </div>
        <div  v-for="(item,index) in AffairList"  :key="index" @click="changeActiveAffair(item._id)" :class="{AffairLi:true,active:activeAffairId==item._id}">
          <div class="AffairIcon">
            <svg class="iconBackground" aria-hidden="true">
                <use :xlink:href="'#icon-'+item.icon"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use :xlink:href="'#icon-'+item.icon"></use>
            </svg>
          </div>
          <div class="AffairText">
            <p class="AffairLiName"> {{item.name}} </p>
            <span class="AffairLevel" v-show="item.record.length > 0">Lv.{{item.record.length}}</span>
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
    <div class="AddAffairButton">
        <button>创建我的新事务</button>
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
    // 跳转移动端
    if(document.documentElement.clientWidth < 1000){
      this.$router.push('affair_mobile');
    }
    this.keyDown();
  },
}
</script>
<style lang="less" scoped>
  @import './../../less/mobile/m_Affair.less';
</style>
