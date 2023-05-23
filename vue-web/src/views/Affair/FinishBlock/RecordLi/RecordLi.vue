<!-- 组件说明 -->
<template>
  <div class='conten FinishRecord'>
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
        <!-- <i class="el-icon-delete-solid button" ></i> -->
        <el-icon title="删除" @click="removeAffairRecord(item._id)"><DeleteFilled /></el-icon>
      </div>
    </div>
    <pre class="RecordSentence">{{ item.sentence }}</pre>
  </div>
</template>

<script>
//import x from ''
export default {
  components: {

  },
  props:['item'],
  data() {
    return {

    };
  },
  computed: {

  },
  methods: {

  },
}
</script>

<style lang='less' scoped>
  @import url('./RecordLi.less');
</style>