<template>
    <!-- 页面主体 -->
    <div id="NewThoughtPage">
        <div class="PageTitle"><span class="titleName">短语</span></div>
        <!-- 输入块 -->
        <div class="EnterBlock">
            <!-- 短文输入框 -->
            <textarea v-model="writeText" cols="30" rows="6" style="resize:none" placeholder="一个事物也许不止一种看法呢......" ></textarea>
            <div class="EnterTools" v-if="false">
                <button :class="{active:thoughtEmotion._id != undefined,EnterEmontion:true}" @click="showEmotionList = !showEmotionList">{{thoughtEmotion.name}}</button>
            </div>
            <!-- 状态列表(默认隐藏) -->
            <div class="EmotionList" v-show="showEmotionList">
                <ul>
                    <li v-for="(item,index) in EmotionList"  :class="{active:item._id == thoughtEmotion._id}" :key="index" @click="changeEmotion(item)">{{item.name}}</li>
                </ul>
            </div>
        </div>
        <div class="IssueButton" @click="writeThou">
            <button>确认</button>
        </div>
    </div>
</template>
<script>
export default {
      data(){
      return {
        List:[],
        writeText:"",
        dateList:[],
        EmotionList:[],
        thoughtEmotion:{
            name:"状态",
            _id:null
        },
        showEmotionList:true,
        date:{}
      };
    },
    methods:{
        //添加短文
        writeThou(){
            let data = {
                text:this.writeText,
                emotion:this.thoughtEmotion._id,
                owner:this.$store.state.user.id
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
            this.axios.post(this.Tool.config.address + '/thought/add',data)
                .then(()=>{
                    this.$router.push('thought_mobile');
                //   that.updateDate();
                });
            this.writeText = "";
        },
        changeEmotion(item){
            this.thoughtEmotion = item;
        },
        setThoughtList(){
            this.List.forEach((item)=>{
                item.date = this.Tool.FormatDate(item.time);
                item.dateString = this.Tool.getDateString(item.date);
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
          this.date = this.Tool.FormatDate(new Date().getTime());
          this.axios.get(this.Tool.config.address + '/thought/all/'+this.$store.state.user.id)
            .then(res=>{
                this.List = res.data;
                this.setThoughtList();
                this.initDateList();
            });
          this.axios.get(this.Tool.config.address + '/emotion/all')
            .then(res=>{
                this.EmotionList = res.data;
            });
        }
    },
    mounted(){
        this.updateDate();
    }
}
</script>
<style lang="less" scoped>
    @import './../../less/mobile/m_NewThought.less';
</style>
