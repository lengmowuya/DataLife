<template>
  <div id="SelfPage">
    <!-- 用户信息 -->
    <div class="UserInfo">
      <h3>{{ $store.state.user.email }}</h3>
    </div>
    <!-- 生涯详情 -->
    <div class="CareerBlock">
      <!-- 事务生涯统计 -->
      <div class="MyAffairCareer">
        <div class="AffairLevelBlock">
          <span class="AllRecordLength">
            <span class="LabelName">总生涯等级</span>
            {{ RecordList.length }}
            <span class="LabelName">级</span>
          </span>
        </div>
        <div class="AffiarCareerDayBlock">
          <span class="AllAffairLength">
            <span class="LabelName">总生涯天数</span>
            {{ AllAffairDay }}
            <span class="LabelName">天</span>
          </span>
        </div>
        <div class="AffairAverageBlock">
          <span class="AverageRecord">
            <span class="LabelName">平均生涯记录</span>
            {{ (RecordList.length / AllAffairDay).toFixed(1) }}
            <span class="LabelName">条/天</span>
          </span>
        </div>
      </div>
      <!-- 短语生涯统计 -->
      <div class="ThoughtCareer">
        <span class="RecordBlock"
          ><span class="LabelName">生涯</span>{{ dateList.length
          }}<span class="LabelName"> 天</span></span
        >
        <span class="RecordBlock"
          ><span class="LabelName">短语</span>{{ List.length
          }}<span class="LabelName"> 条</span></span
        >
        <span class="RecordBlock"
          ><span class="LabelName">共</span>{{ careerTextLength
          }}<span class="LabelName"> 字</span></span
        >
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      RecordList: [],
      List: [],
      dateList: [],
    };
  },
  mounted() {
    this.RecordList = this.$store.state.AffairRecordList;
    this.List = this.$store.state.ThoughtRecordList;
  },
};
</script>
<style lang="less">
@import url("./../less/Self.less");
</style>