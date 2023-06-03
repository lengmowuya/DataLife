<!-- 组件说明 -->
<template>
  <div class='conten FinishRecord' v-if="item != null && item != undefined">
    <div class="FinishRecordHeader">
      <div class="FinishRecordIcon">
        <svg class="iconBackground" aria-hidden="true">
          <use :xlink:href="`#icon${item.affair.icon.group}-${item.affair.icon.font_class}`" />
        </svg>
        <svg class="icon" aria-hidden="true">
          <use :xlink:href="`#icon${item.affair.icon.group}-${item.affair.icon.font_class}`" />
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
import { ElMessage } from 'element-plus'

//import x from ''
export default {
  name:'RecordLi',
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
    removeAffairRecord(id){
      if(confirm('你确定要删除改记录吗')){
        this.Work.AffairRecord.RemoveAffairRecord(id)
          .then(doc=>{
            this.$parent.confirm();
              ElMessage({
                  showClose: true,
                  message: '该记录已删除',
                  // type: 'success',
              })
            // this.$forceUpdate();
          })
      }
    }
  },
}
</script>

<style lang='less' scoped>
  @import url('./RecordLi.less');
</style>