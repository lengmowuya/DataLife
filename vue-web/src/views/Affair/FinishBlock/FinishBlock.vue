<template>
  <!-- 完成的记录板块 -->
  <div
    class="FinishBlock"
    v-if="RecordShowDate != null && RecordShowDate.date != undefined"
  >
    <!-- <div class="FinishBlock"> -->
    <!-- 选择的日期头 -->
    <div class="FinishCore">
      <div class="CoreTop">
              <p class="FinishDay">
        <span class="text"
          >{{ Tool.getDateString(RecordShowDate.data) }}号&nbsp; 周{{
            Tool.FormatDateWeekChinese(RecordShowDate.date.getDay())
          }}</span
        >
        <span class="length" v-if="RecordShowDate.record.length > 0"
          >{{ RecordShowDate.record.length }}条</span
        >
      </p>
      <!-- 可供选择的日期 -->
      <div class="HistoryRecord">
        <div
          v-for="(item, i) in HistoryRecord"
          :key="i"
          :title="Tool.getDateString(item.data)"
          :class="{ HistoryBlock: true }"
        >
          <span
            v-if="item.record.length > 0"
            :class="{
              HistoryDateNumber: true,
              plus5: item.record.length >= 5,
              plus10: item.record.length >= 10,
              active:
                Tool.getDateString(RecordShowDate.data) ==
                Tool.getDateString(item.data),
            }"
            @click="
              (RecordShowDate = HistoryRecord[i]), (Record.activeIndex = i)
            "
          >
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
        <div
          class="FinishRecord"
          v-for="(item, index) in RecordShowDate.record"
          :key="index"
        >
          <div class="FinishRecordHeader">
            <div class="FinishRecordIcon">
              <svg class="iconBackground" aria-hidden="true">
                <use :xlink:href="'#icon-' + item.affair.icon" />
              </svg>
              <svg class="icon" aria-hidden="true">
                <use :xlink:href="'#icon-' + item.affair.icon" />
              </svg>
            </div>
            <div class="FinishRecordText">
              <p class="RecordName">{{ item.affair.name }}</p>
              <p class="RecordTime">{{ Tool.getTimeString(item.data) }}</p>
            </div>
            <div class="morePanel">
              <i
                class="el-icon-delete-solid button"
                title="删除"
                @click="removeAffairRecord(item._id)"
              ></i>
            </div>
          </div>
          <pre class="RecordSentence">{{ item.sentence }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      AllAffairDay: 0,
      // onPushRecord: false,
      // pushAffair: null,
      RecordShowDate: null,
      // pushSentence: "",
      Record: {
        activeIndex: 0,
      },
      HistoryRecord: this.$store.state.RecordDateList,
      // AffairList: [],
      // RecordList: [],
      // activeAffairId: "",
    };
  },
  methods: {
    removeAffairRecord(id) {
      let Affair = { id };
      this.axios
        .post(this.Tool.config.address + "/affairRecord/remove", Affair)
        .then(() => {
          // this.Editor.onEditorAffair = false;
          // this.getAllAffair();
        }); 
    },
  },
  updated() {},
  mounted() {
    this.HistoryRecord = this.$store.state.RecordDateList;
    let time = setInterval(() => {
      if (!this.RecordShowDate) {
        this.RecordShowDate = this.HistoryRecord[0];
        clearInterval(time);
      }
    }, 300);
  },
};
</script>

<style  scoped lang="less">
    @import url('./FinishBlock.less');
</style>