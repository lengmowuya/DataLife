<template>
  <div id="SelfPage">
    <!-- 用户信息 -->
    <div class="UserInfo">
      <img src="https://avatars.githubusercontent.com/u/50391842?v=4" alt="">
      <div class="userInfo">
        <h1>冷漠乌鸦</h1>
        <h6>{{ $store.state.user.email }}</h6>
        <!-- <el-button type="danger" :icon="Delete" circle /> -->
        <el-button type="danger" round>登出</el-button>
      </div>
      
    </div>
    <!-- 生涯详情 -->
    <div class="CareerBlock">
      <!-- 事务生涯统计 -->
      <div class="MyAffairCareer">
        <p class="CareerTitle">事务生涯</p>
        <div class="AffairLevelBlock">
          <span class="AllRecordLength">
            <span class="LabelName">总等级</span>
            {{ RecordList.length }}
            <span class="LabelName">级</span>
          </span>
        </div>
        <div class="AffiarCareerDayBlock">
          <span class="AllAffairLength">
            <span class="LabelName">累计天数</span>
            {{ AllAffairDay }}
            <span class="LabelName">天</span>
          </span>
        </div>
        <div class="AffairAverageBlock">
          <span class="AverageRecord">
            <span class="LabelName">平均</span>
            {{ (RecordList.length / AllAffairDay).toFixed(1) }}
            <span class="LabelName">条/天</span>
          </span>
        </div>
      </div>
      <!-- 短语生涯统计 -->
      <div class="ThoughtCareer">
        <p class="CareerTitle">短语生涯</p>
        <span class="RecordBlock"
          ><span class="LabelName">总数</span> {{ dateList.length
          }}<span class="LabelName"> 天</span></span
        >
        <span class="RecordBlock"
          ><span class="LabelName">累计</span> {{ List.length
          }}<span class="LabelName"> 条</span></span
        >
        <span class="RecordBlock"
          ><span class="LabelName">总数</span> {{ careerTextLength
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
@import url("./User.less");
</style>