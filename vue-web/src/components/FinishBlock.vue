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
.HistoryRecord {
  padding: 5px;
  margin: 10px 0px;
  margin-top: 0px;
  display: flex;
  flex-wrap: wrap-reverse;
  flex-direction: row-reverse;
  align-content: flex-start;
  // justify-content: space-between;
  // align-items: ;
  box-sizing: border-box;
  // flex-grow: 1;
  width: 100%;
  .HistoryBlock {
    @height: 30px;
    width: @height;
    height: @height;
    background: #f9f9f9;
    margin: 2px;
    // overflow: hidden;
    border-radius: 7px;
    .HistoryDateNumber {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      color: #fff;
      // background:#fff;
      // background:#f6f6f6;
      background: #9be9a8;
      user-select: none;
      vertical-align: middle;
      cursor: pointer;
      transition: all 0.25s;
      border: 2px solid transparent;
      box-sizing: border-box;
      flex-direction: column;
      border-radius: 7px;
      .HistroyDateLength {
        font-weight: bold;
        font-size: 19px;
      }
      .HistroyDateIntraday {
        font-size: 14px;
        opacity: 0.5;
        // color:#252525;
        font-family: caner;
        // font-weight: bold;
        display: none;
      }
      &:not(.active):hover {
        opacity: 0.5;
        // background-color: #00a0d6;
      }
      &.plus5 {
        // color:gold;
        background-color: #40c463;
        // border-color: gold;
      }
      &.plus10 {
        // color:tomato;
        background-color: #30a14e;
        // border-color: tomato;
      }
      &.active {
        // box-shadow: 6px 0px 6px #666;
        // box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        border-color: green !important;
        // background:#333;
        .HistroyDateIntraday {
          // color:#333;
          opacity: 1;
        }
      }
    }
  }
}
.CoreTop{
  display:flex;
  flex-direction: column;
    background: #fff;
  box-shadow: 0 4px 20px rgba(0, 25, 104, 0.05);
  border-radius: 6px;
  padding:10px;
  padding-top:14px;

}
.FinishBlock {
  // margin:25px 0px;
  // margin-top:40px;
  background: #fff;
  // border:10px solid #fff;
  // background: #f3f3f3;
        background:#e9e9f0;
  //box-shadow:inset 0px 0px 20px 0 rgba(55,99,170,0.11);

  // box-shadow:inset 0px 0px 20px 0 rgba(55,99,170,0.11);
  // border-radius: 6px;
  min-height: 400px;
  padding: 15px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  order: 1;
  height: 100vh;
  max-height: calc(100vh - 50px);
  flex-grow: 1;
  .FinishCore{
    max-width: 1200px;
      display: flex;
    flex-direction: column;
  }
  .FinishDay {
    text-align: center;
    // margin-bottom:10px;
    font-size: 16px;
    // font-weight: bold;
    padding: 16px 0px;
    // padding-bottom:24px;
    display: flex;
    justify-content: center;
    .text {
      // color:#98a3b7;
      // background:#ffffff99;
      // padding:10px;
      height: 20px;
      font-family: caner;
      color: #333;
      user-select: none;
      border-radius: 6px;
      line-height: 20px;
      overflow: hidden;
      padding: 0px 12px;
    }
    .length {
      margin-left: 4px;
      height: 20px;
      // width:24px;
      padding: 0px 8px;
      line-height: 20px;
      // margin-top:-5px;
      font-family: caner;
      font-size: 14px;
      background: #00a1d655;
      letter-spacing: 1px;
      color: #fff;
      // padding:1px 6px;
      border-radius: 10px;
    }
  }
  .FinishRecordList {
    // background:#f6f7f9;
    // box-shadow:inset 0px 0px 20px 0 rgba(55,99,170,0.11);
    display: flex;
    flex-wrap: wrap;
    margin-right: -5px;
    padding-top: 10px;
  }
  .FinishRecord {
    // background:#00a0d699;
    // border:2px solid #00a0d6;
    // color:#fff;
    background: #fff;
    color: #363636;
    // border:1px solid rgba(157,173,193,.5);
    // background-image: linear-gradient(0deg,#fff,#f3f5f8);
    background: #fff;
    box-shadow: 2px 2px 15px 0 rgba(55, 99, 170, 0.11), -8px -8px 20px 0 #fff;
    padding: 10px;
    // height:34px;
    margin-right: 12px;
    border-radius: 6px;
    flex-direction: column;
    display: flex;
    margin-bottom: 12px;
    flex-grow: 1;
    // min-width: 15%;
    width: 20%;
    max-width: calc(25% - 10.5px);
    box-sizing: border-box;
    transition: all 0.25s;
    &:nth-child(4n) {
      margin-right: 0px;
    }
    &:hover {
      .morePanel {
        opacity: 1 !important;
      }
      // .FinishRecordIcon{
      //     background:#eee !important;
      // }
      // .FinishRecordText{
      //     color:#252525;
      // }
      // background:#fff;
      // .RecordSentence{
      //     color:#252525;
      // }
    }
    .FinishRecordHeader {
      display: flex;
      .FinishRecordIcon {
        background: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-shrink: 0;
        font-size: 36px;
        width: 42px;
        height: 42px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-shrink: 0;
        border-radius: 12px;
        margin: 5px;
        overflow: hidden;
        position: relative;
        .iconBackground {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translateX(-50%) translateY(-50%);
          filter: blur(8px);
          opacity: 0.2;
        }
        .icon {
          // font-size:35px;
        }
      }
      .FinishRecordText {
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
        padding: 5px;
        flex-grow: 1;
        font-family: caner;
        .RecordName {
          flex-grow: 1;
          font-size: 15px;
          letter-spacing: 1px;
          user-select: none;
          line-height: 26px;
        }
        .RecordTime {
          font-size: 13px;
          opacity: 0.6;
          user-select: none;
        }
      }
    }
    .RecordSentence {
      padding: 5px;
      font-size: 15px;
      line-height: 1.35em;
      // text-indent: 2em;
      letter-spacing: 0.5px;
      transition: all 0.25s;
      cursor: pointer;
      // width:100%;
      color: #98a3b7;
      // box-sizing: border-box;
      white-space: pre-wrap;
      // word-wrap: break-word;
      font-family: caner;
    }
    .morePanel {
      opacity: 0;
      transition: all 0.25s;
      .button {
        transition: all 0.25s;
        background: #fff;
        line-height: 21px;
        padding: 5px;
        font-size: 16px;
        width: 20px;
        text-align: center;
        border-radius: 4px;
        // opacity: 0.5;
        cursor: pointer;
        color: #98a3b799;
        &:hover {
          background: #f9f9f9;
          // opacity: 1;
          color: red;
        }
      }
      // height:21px;
    }
  }
}
</style>