<template>
  <!-- 完成的记录板块 -->
  <div class="FinishBlock" v-if="RecordShowDate">
    <!-- <div class="FinishBlock"> -->
    <!-- 选择的日期头 -->
    <div class="FinishCore">
      <div class="CoreTop">
        <p class="FinishDay">
          <span class="text">{{Tool.getDateString(RecordShowDate.data)}}号&nbsp; 周{{
            Tool.FormatDateWeekChinese(RecordShowDate.time.getDay())
          }}</span>
          <span class="length" v-if="RecordShowDate.record.length > 0">{{ RecordShowDate.record.length }}条</span>
        </p>
        <!-- 可供选择的日期 -->
        <div class="HistoryRecord">
          <div v-for="(item, i) in dateList" :key="i" :title="Tool.getDateString(item.data)"
            :class="{ HistoryBlock: true }">
            <span v-if="item.record.length > 0" :class="{
              HistoryDateNumber: true,
              plus5: item.record.length >= 5,
              plus10: item.record.length >= 10,
              active:
                Tool.getDateString(RecordShowDate.data) ==
                Tool.getDateString(item.data),
            }" @click="
  (RecordShowDate = dateList[i]), (Record.activeIndex = i)
  ">
              <span class="HistroyDateIntraday">{{
                Tool.getMiniDateString(item.data)
              }}</span>
            </span>
          </div>
        </div>
      </div>
      <!-- 日期下的记录列表 -->
      <div class="FinishRecordList">
        <!-- 记录块 -->
        <RecordLi v-for="(item, index) in RecordShowDate.record" :key="index" :item="item">
        </RecordLi>
      </div>
    </div>
  </div>
</template>

<script>
import RecordLi from './RecordLi/RecordLi.vue'
export default {
  name:'FinishBlock',
  components: {
    RecordLi
  },
  data() {
    return {
      dateList:[],
      recordDateList: [],
      AllAffairDay: 0,
      RecordShowDate: null,
      Record: {
        activeIndex: 0,
      },
      // HistoryRecord: new Array(30),
    };
  },
  methods: {
    removeAffairRecord(id) {
      let Affair = { id };
      this.axios
        .post(this.Tool.config.address + "/affairRecord/remove", Affair)
        .then(() => {
        });
    },
  },
  updated() { },
  mounted() {

    // 将记录按日期归档
    const CreateDateList = (recordList)=>{
      // console.log(recordList);
      let dateObj = recordList.reduce((prev,item)=>{
        let time = new Date(item.time);
        item.time = time;
        this.Tool.CreateDate(item,item.time);
        let date =   'date ' + time.getFullYear() + '-' + (time.getMonth()+1) + '-' + time.getDate();
        if(!prev[date]){
          prev[date] = [];
        }
        prev[date].push(item);
        return prev;
      },{});
      let recordDateList = [];
      for(let key in dateObj){
        recordDateList.push({time:key,record:dateObj[key]});
      }
      this.recordDateList = recordDateList;
      return recordDateList;
    }

    // 生成当月日期表
    const extendDateList = ()=>{
      let dateList = new Array(30);
      // time每次递减一天,并创建Data
      for(let i = 0; i < dateList.length ; i++ ){
        dateList[i] = {time:new Date(new Date().getTime() - (i) * 86400000),record:[]};
        let item = dateList[i];
        this.Tool.CreateDate(item,item.time);
      }
      // 将record整合到date
      dateList.forEach(item=>{
        this.recordDateList.forEach(date=>{
          let time = item.time;
          let dateStr =   'date ' + time.getFullYear() + '-' + (time.getMonth()+1) + '-' + time.getDate();

          if(date.time == dateStr){
            item.record = date.record;
          }
        })
      })
      this.dateList = dateList;
      this.RecordShowDate = dateList[0];
    }

    // 获取所有记录
    this.axios.get(this.Tool.config.address + '/affairRecord/all/' + this.$store.state.user.id)
      .then(docs => {
        CreateDateList(docs.data);
        extendDateList();
      })
  },
};
</script>

<style  scoped lang="less">
@import url('./FinishBlock.less');
</style>