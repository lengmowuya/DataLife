<template>
  <div id="DataLife">
    <header id="DataLifeNav" v-if="showNav">
      <!-- <router-link to="/"><i class="el-icon-s-home"></i>主页</router-link> -->
      <router-link to="/affair"><i class="el-icon-s-claim"></i>事务</router-link>
      <router-link to="/thought"><i class="el-icon-s-opportunity"></i>感语</router-link>
      <!-- <router-link to="/self"><i class="el-icon-s-custom"></i>自我</router-link> -->
    </header>
    <router-view/>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        showNav:true,
        List:[],
        writeText:"",
        dateList:[],
        EmotionList:[],
        thoughtEmotion:{
            name:"状态",
            _id:null
        },
        showEmotionList:false,
        date:{}
      };
    },
    methods:{
        //添加短文
        writeThou(){
            // ThoughtSurface.add(this.writeText);
            let data = {
                text:this.writeText,
                emotion:this.thoughtEmotion._id
            }
            if(this.writeText.trim() == ""){
                alert("记录内容不能为空");
                return;
            }
            if(this.thoughtEmotion._id == null){
                alert("请选择一个状态");
                return;
            }
            let that = this;
            this.axios.post('http://127.0.0.1:3000/thought/add',data)
                .then(()=>{
                  that.updateDate();
                });
            this.writeText = "";
        },
        //删除短文
        destoryThou(_id){
            let data = {
                _id
            }
            let that = this;
            this.axios.post('http://127.0.0.1:3000/thought/remove',data)
            .then(()=>{
                that.updateDate();
            });
        },
        changeEmotion(item){
            this.thoughtEmotion = item;
            // TCCase.$forceUpdate();
        },
        FormatDate(timeStamp){
          let TimeObj = new Date(timeStamp);
          let date = {
              year:TimeObj.getFullYear(),
              month:TimeObj.getMonth() + 1,
              day:TimeObj.getDate(),
              hour:TimeObj.getHours(),
              min:TimeObj.getMinutes(),
              sec:TimeObj.getSeconds()
          }
          return date;
        },
        getDateString(data){
          return data.year + '-' + data.month + '-' + data.day;
        },
        getTimeString(data){
          return data.hour + ':' + data.min;
        },
        setThoughtList(){
            this.List.forEach((item)=>{
                item.date = this.FormatDate(item.time);
                item.dateString = this.getDateString(item.date);
                item.timeSort = item.date.year * 12 * 31 + item.date.month * 31 + item.date.day;
            });
        },
        initDateList(){
            this.dateList = [];
            this.List.forEach((item)=>{
                // 如果时间数组是空的
                if(this.dateList.length == 0){
                    this.dateList.push({
                        dateString:item.dateString,
                        timeSort:item.timeSort,
                        date:item.date,
                        thoughtList:[item]
                    })

                }else{
                    let hasDate = false;
                    for(let i = 0; i < this.dateList.length ; i++){
                        if(this.dateList[i].dateString == item.dateString){
                            hasDate = true;
                            this.dateList[i].thoughtList.push(item);
                            break;
                        }
                    }
                    if(!hasDate){
                        this.dateList.push({
                            dateString:item.dateString,
                            timeSort:item.timeSort,
                            date:item.date,
                            thoughtList:[item]
                        })
                    }
                }
            });
            this.dateList.sort((a,b)=>{
                return b.timeSort - a.timeSort ;
            })
            let that = this;
            this.dateList.forEach((item)=>{
                let nowYear = that.date.year;
                let itemYear = item.date.year;
                let nowMonth = that.date.month;
                let itemMonth = item.date.month;
                let nowDay = that.date.day;
                let itemDay = item.date.day;
                item.showName = item.dateString;
                if(nowYear == itemYear){
                    item.showName = itemMonth + '-' + itemDay;
                }
                if(nowYear == itemYear && nowMonth == itemMonth && nowDay == itemDay){
                    item.showName = '今天';
                }
                if(nowYear == itemYear && nowMonth == itemMonth && nowDay == itemDay + 1){
                    item.showName = '昨天';
                }
                if(nowYear == itemYear && nowMonth == itemMonth && nowDay == itemDay + 2){
                    item.showName = '前天';
                }
            })
        },
        updateDate(){
          this.date = this.FormatDate(new Date().getTime());
          this.axios.get('http://127.0.0.1:3000/thought/all')
            .then(res=>{
                this.List = res.data;
                this.setThoughtList();
                this.initDateList();
                // this.$forceUpdate();
            });
          this.axios.get('http://127.0.0.1:3000/emotion/all')
            .then(res=>{
                this.EmotionList = res.data;
                // this.$forceUpdate();
            });
        }
    },
    mounted(){
        console.log(this.Tool.config.address);
        this.$watch(
            () => this.$route,
            (count, prevCount) => {
                // console.log(count);
                if(count.fullPath == '/sign'){
                    this.showNav = false;
                }else{
                    this.showNav = true;
                }
                /* ... */
            }
        )
        if(this.$store.state.user == undefined ||this.$store.state.user.email == undefined || this.$store.state.user.email == ''){
            this.$router.push('sign');
        }
    },
    updated(){
        if(this.$store.state.user == undefined ||this.$store.state.user.email == undefined || this.$store.state.user.email == ''){
            this.$router.push('sign');
        }
    }
  }
</script>
<style lang="less">
@import "./less/App.less";
</style>
