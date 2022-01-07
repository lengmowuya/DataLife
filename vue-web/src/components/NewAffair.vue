<template>
  <div class="Header">
    <!-- 新建事务的输入板块 -->
    <div class="EnterBlock">
      <div class="NewBlock">
        <input type="text" class="NewBlockName" placeholder="新事务名称" v-model="NewBlock.name" />
        <input
          type="text"
          class="NewBlockDescribe"
          placeholder="一句话描述我的新事务"
          v-model="NewBlock.describe"
        />
      </div>
      <div class="AddButton">
        <button @click="AddAffair()">+</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      // 新建事务板块信息
      NewBlock: {
        name: "",
        describe: ""
      }
    };
  },
  methods:{
    AddAffair(){
      this.Work.Affair.AddAffair(this.NewBlock)
        .then(()=>{
          this.NewBlock.name = '';
          this.NewBlock.describe = '';
        })
        .catch(ErrorTips=>{
          if(ErrorTips == 'DataError'){
            alert("事务的名称或描述不能为空");
          }else if(ErrorTips == 'NetError'){
            alert("网络请求错误");
          }else{
            alert("未知错误-请联系管理员");
            console.log(ErrorTips);
          }
        })
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.Header{
    width:100%;
    display:flex;
    justify-content: center;
    align-items: center;
    // background:#f6f7f9;
    padding:30px 0px;
    padding-top:60px;
    // box-shadow: 2px 2px 15px 0 rgba(55,99,170,0.05) inset, -8px -8px 20px 0 #fff;
    display:flex;
    flex-direction: column;
}
.EnterBlock{
    width:100%;
    max-width: 400px;
    margin:0 auto;
    display:flex;
    align-items: center;
    
    .NewBlock{
        height:80px;
        flex-grow: 1;
        background-color:#fff;
        border-radius:6px;
        display:flex;
        flex-direction: column;
        padding:10px 10px;
        box-sizing: border-box;
        // border:1px solid #e5e9ef;
        transition:all 0.25s;
        box-shadow: 2px 2px 15px 0 rgba(55,99,170,0.11), -8px -8px 20px 0 #fff;
        margin-right:12px;
        font-family: caner;
        &:hover{
            border-color:#98a3b7;
        }
        &:focus{
            border-color:#00a1d6;
        }
        .NewBlockName,
        .NewBlockDescribe{
            border:none;
            outline: none;
            background:transparent;
            padding:0px 5px;
            color:#252525;
            font-family: caner;
            transition:all 0.25s;
            &:hover{
              background:#f9f9f9;
            }
        }
        .NewBlockName::placeholder,
        .NewBlockDescribe::placeholder{
            color:#eee;
            color:#98a3b799;
        }
        .NewBlockName{
            height:35px;
            flex-grow: 1;
            font-size:22px;
            // font-weight: bold;
            line-height: 40px;
        }
        .NewBlockDescribe{
            flex-shrink: 0;
            height:30px;
            font-size:16px;
            line-height: 20px;
            // opacity: 0.8;
            color:#999;
        }
    }
    .AddButton{
        width:40px;
        height:40px;
        // margin-top:10px;
        button{
            width:100%;
            height:100%;
            background:transparent;
            border-radius:8px;
            // color:tomato;
            border:none;
            font-size:24px;
            display:flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            // opacity: 0.65;
            transition:all 0.25s;
            background:#fff;
            // border:2px solid #f6f7f9;
            box-shadow: 2px 2px 15px 0 rgba(55,99,170,0.11), -8px -8px 20px 0 #fff;
            &:hover{
                // opacity: 1;
                background:#f9f9f9;
            }
        }
    }
}
</style>
