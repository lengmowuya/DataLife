<template>
  <div class="MyAffairBigBlock">
    <!-- 我事务的数据头衔 -->
    <div class="MyAffairCareer" v-if="RecordList.length>3">
      <span class="AllRecordLength">
        <span class="LabelName">总生涯等级</span>
        {{RecordList.length}}
        <span class="LabelName">级</span>
      </span>
      <span class="AllAffairLength">
        <span class="LabelName">总生涯天数</span>
        {{AllAffairDay}}
        <span class="LabelName">天</span>
      </span>
      <span class="AverageRecord">
        <span class="LabelName">平均生涯记录</span>
        {{(RecordList.length/AllAffairDay).toFixed(1)}}
        <span class="LabelName">条/天</span>
      </span>
    </div>
    <!-- 我所有的事务 -->
    <div class="MyAffair">
      <div class="NullBlockTip" v-if="AffairList.length<=0">您暂无事务,先创建一个吧!</div>
      <div
        v-for="(item,index) in AffairList"
        :key="index"
        @click="changeActiveAffair(item._id)"
        :class="{AffairLi:true,active:activeAffairId==item._id}"
      >
        <div class="AffairContent">
          <div class="AffairIconBlock">
            <div class="AffairIcon">
              <svg class="iconBackground" aria-hidden="true">
                <use :xlink:href="'#icon-'+item.icon" />
              </svg>
              <svg class="icon" aria-hidden="true">
                <use :xlink:href="'#icon-'+item.icon" />
              </svg>
            </div>
          </div>
          <div class="AffairText">
            <p class="AffairLiName">{{item.name}}</p>
            <p class="AffairLiDescribe">{{item.describe}}</p>
            <span class="AffairLevel" v-show="item.level > 0">Lv.{{item.level}}</span>
          </div>
          <div class="AffairTools">
            <button
              class="AffairFinishButton"
              @click="onPushRecord = true;pushAffair = item"
              title="完成一次"
            >
              <i class="el-icon-check"></i>
              完成
            </button>
            <button
              class="AffairEditorButton"
              title="编辑这个事务!"
              @click="Editor.onEditorAffair = true;changeAffairInfo(item)"
            >
              <i class="el-icon-s-tools"></i>
              编辑
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      HistoryRecord: [],
      AffairList: [],
      RecordList: [],
    }
  },
  mounted(){
    this.HistoryRecord = this.$store.state.RecordDateList;
    // this.HistoryRecord = this.$store.state.RecordDateList;
    this.AffairList = this.$store.state.AffairList;
    setInterval(()=>{
      if(!this.AffairList.length == 0){
        this.AffairList = this.$store.state.AffairList;
        this.$forceUpdate();
      }
    },500);
    setTimeout(()=>{
        this.AffairList = this.$store.state.AffairList;
        this.$forceUpdate();
    },2000)
  }
};
</script>

<style lang="less" scoped>
.MyAffairBigBlock{
    // background:#f6f7f9;
    // border:1px solid #d0d7de;
    // box-shadow:inset 0px 0px 20px 0 rgba(55,99,170,0.11);
    border-radius: 6px;
    // margin-top:60px;
    max-width: 1200px;
    width:100%;
    margin-top:20px;
}
.MyAffairCareer{
    display:flex;
    justify-content: center;
    align-items: center;
    padding:15px;
    padding-bottom:0px;
    margin-top:10px;
    // margin-bottom:10px;
    .LabelName{
        margin-right:4px;
        font-size:16px;
        // opacity: 0.9;
        user-select: none;
        color:#999;
        color:#98a3b799;
        cursor: pointer;
        user-select: none;
        font-family: caner;
    }
    .AllRecordLength,
    .AverageRecord,
    .AllAffairLength{
        padding:8px 16px;
        color:gold;
        border-radius: 4px;
        font-size:16px;
        margin-right:16px;
        // font-family: caner;
        // font-weight: bold;
        user-select: none;
    }
    .AverageRecord{
        margin:0px;
    }
}
.MyAffair{
    width:100%;
    display:flex;
    flex-wrap: wrap;
    padding:20px;
    // padding-top:20px;
    box-sizing: border-box;
    min-height: 300px;
    .NullBlockTip{
        flex-grow: 1;
        display:flex;
        justify-content: center;
        align-items: center;
        color:#98a3b7;
        font-size:20px;
        user-select: none;
    }
    .AffairLi{
        padding:36px 0px;
        margin:0px 30px;
        // border-bottom:1px solid #d8dee4;
        background:#fff;
        min-width:40%;
        flex-grow: 1;
        cursor: pointer;
        transition:all 0.25s;
        display:flex;
        transition:all 0.25s;
        width: calc(50% - 60px);
        max-width: calc(50% - 60px);
        position: relative;
        .AffairContent{
            width:100%;
            flex-grow: 1;
            display:flex;
            position: relative;
        }
        .AffairIconBlock{
            height:100%;
            display:flex;
            justify-content: center;
            align-items: center;
            padding:0px 10px;
        }
        .AffairIcon{
            font-size:36px;
            width:42px;
            height: 42px;
            display:flex;
            justify-content: center;
            align-items: center;
            flex-shrink: 0;
            // color:#00a0d6;
            // margin-right:10px;
            // width:50px;
            display:flex;
            justify-content: center;
            align-items: center;
            flex-shrink: 0;
            border-radius: 12px;
            // border:1px  solid #eee;
            // margin-top:5px;
            margin:5px;
            overflow: hidden;
            position: relative;
            .iconBackground{
                position: absolute;
                left:50%;
                top:50%;
                transform: translateX(-50%) translateY(-50%);
                filter:blur(8px);
                opacity: 0.2;
            }
        }
        .AffairText{
            flex-grow: 1;
            // margin-right:10px;
            // padding:10px;
            padding-left:5px;
            opacity: 1;
            transition: all 0.25s;
            .AffairLiName{
                font-size:15px;
                color:#252525;
                // color:#218bff;
                font-weight: bold;   
                user-select: none;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                // max-width: 190px;
                line-height: 24px;
            }
            .AffairLiDescribe{
                margin-top:2px;
                font-size:14px;
                color:#98a3b799;
                user-select: none;
                // white-space: nowrap;
                // overflow: hidden;
                // text-overflow: ellipsis;
                // max-width: calc(100% - 60px);
                // max-width: 190px;
                line-height: 20px;
            }
            .AffairLevel{
                color:gold;
                // margin-left:4px;
                font-size:10px;
                padding:2px 4px;
                background:#252525;
                font-weight: normal;
                border-radius: 3px;
                line-height: 26px;
                // position: absolute;
                // transform: scale(0.8) translateX(-50%);
                // left:33.5px;
                // bottom:4.5px;
            }
        }
        .AffairTools{
            position: absolute;
            right:0px;
            top:0px;
            // top:50%;
            // transform: translateY(-50%);
            flex-shrink: 0;
            display:flex;
            align-items: center;
            margin-right:10px;
            justify-content: center;
            flex-grow: 1;
            transition: all 0.25s;
            button{
                flex-shrink: 0;
                border:none;
                background:transparent;
                cursor: pointer;
                // padding:3x;
                color:#fff;
                // font-weight: bold;
                display:flex;
                // width:24px;
                font-size:12px;
                height:24px;
                align-items: center;
                justify-content: center;
                margin-right:4px;
                background:#f6f8fa;
                color:#24292f;
                border-radius: 4px;
                transition:all 0.25s;
                border:1px solid #d0d7de;
                padding:5px 6px;
                vertical-align: middle;
                font-weight: bold;
                i{
                    font-size:14px;
                    margin-right: 2px;
                }
                &:hover{
                    // opacity: 1;
                    background:#f3f4f6;
                }
            }
            // .AffairFinishButton{
            //     background:#00a0d6;
            // }
            // .AffairEditorButton{
            //     background:#E6A23C;
            // }
        }
    }
}
</style>