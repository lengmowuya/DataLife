<template>
  <div id="AffairPage">
    <div class="EnterBlock">
      <div class="NewBlock">
        <input type="text" class="NewBlockName" placeholder="新事务名称" v-model="NewBlock.name">
        <input type="text" class="NewBlockDescribe" placeholder="一句话描述我的新事务" v-model="NewBlock.describe">
      </div>
      <div class="AddButton">
        <button @click="addAffair()"><i class="el-icon-circle-plus"></i></button>
      </div>
    </div>
    <div class="MyAffair">
      <div class="AffairLi" v-for="(item,index) in AffairList" :key="index">
        <p class="AffairLiName">{{item.name}}</p>
        <p class="AffairLiDescribe">{{item.describe}}</p>
      </div>
    </div>
    <div class="FinishBlock">

    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      AffairList:[],
      NewBlock:{
        name:'',
        describe:''
      }
    }
  },
  methods:{
    addAffair(){
      let NewAffair = this.NewBlock;
      if(NewAffair.name.trim() == '' || NewAffair.describe.trim() == ''){
        alert("事务的名称或描述不能为空");
        return;
      }
      this.axios.post('http://127.0.0.1:3000/affair/add',NewAffair)
        .then(()=>{
          this.NewBlock.name = '';
          this.NewBlock.describe = '';
          this.getAllAffair();
        })
    },
    getAllAffair(){
      this.axios.get('http://127.0.0.1:3000/affair/all')
        .then(res=>{
          // console.log(res);
          this.AffairList = res.data;
        })
    }
  },
  mounted(){
    this.getAllAffair();
  }
}
</script>
<style lang="less" scoped>
@import './../less/Affair.less';
</style>
