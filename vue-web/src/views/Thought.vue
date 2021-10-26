<template>
    <!-- 页面主体 -->
    <div id="ThoughtPage">
        <!-- 输入块 -->
        <div class="EnterBlock">
            <!-- 短文输入框 -->
            <textarea v-model="writeText" cols="30" rows="6" style="resize:none" placeholder="一个事物也许不止一种看法呢......" ></textarea>
            <div class="EnterTools">
                <button :class="{active:thoughtEmotion._id != undefined,EnterEmontion:true}" @click="showEmotionList = !showEmotionList">{{thoughtEmotion.name}}</button>
                <button class="EnterButton" @click="writeThou">记录</button>
            </div>
            <!-- 状态列表(默认隐藏) -->
            <div class="EmotionList" v-show="showEmotionList">
                <ul>
                    <li v-for="(item,index) in EmotionList"  :class="{active:item._id == thoughtEmotion._id}" :key="index" @click="changeEmotion(item)">{{item.name}}</li>
                </ul>
            </div>
        </div>
        <!-- 历史列表块 -->
        <ul class="ThougthList" v-if="List.length>0">
            <div class="DateLi" v-for="(item,key) in dateList" :key="key">
                <p class="DateLiTitle">{{item.showName}} <span class="DateThoughtNumber">{{item.thoughtList.length}} 感悟</span></p>
                <ul class="CurrentDateList">
                    <li v-for="(li,key) in item.thoughtList" :key="key" class="ThougthLi">
                        <div class="ThoughtMain">
                            <pre class="ThoughtText">{{li.text}}</pre>
                            <div class="ThoughtDetails">
                                <span class="ThoughtEmotion" v-if="li.emotion != null">
                                    {{li.emotion.name}}
                                </span>
                                <span class="thou_time">{{getTimeString(li.date)}}</span>
                                <span @click="destoryThou(li._id)" class="DestoryThought">删除</span>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </ul>
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
        showEmotionList:false,
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
            this.axios.post(this.Tool.config.address + '/thought/remove',data)
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
            let hourName = '';
            let hour = data.hour;
            if(hour <= 6){
                hourName = "凌晨";
            }else if(hour <= 10){
                hourName = "上午";
            }else if(hour <= 12){
                hourName = "中午";
            }else if(hour <= 17){
                hourName = "下午";
            }else if(hour <= 21){
                hourName = "晚上";
            }else{
                hourName = "半夜";
            }
            return hourName + '' + data.hour + ':' + data.min;
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
          this.axios.get(this.Tool.config.address + '/thought/all/'+this.$store.state.user.id)
            .then(res=>{
                this.List = res.data;
                this.setThoughtList();
                this.initDateList();
                // this.$forceUpdate();
            });
          this.axios.get(this.Tool.config.address + '/emotion/all')
            .then(res=>{
                this.EmotionList = res.data;
                // this.$forceUpdate();
            });
        }
    },
    mounted(){
        this.updateDate();
    }
}
</script>
<style lang="less" scoped>
    @import './../less/Thought.less';
</style>
