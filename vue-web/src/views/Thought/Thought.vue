<template>
    <!-- 页面主体 -->
    <div id="ThoughtPage">
        <div class="Header">
            <!-- 输入块 -->
            <div class="EnterBlock">
                <!-- 短文输入框 -->
                <textarea v-model="writeText" cols="30" rows="6" style="resize:none" placeholder="一个事物也许不止一种看法呢......" ></textarea>
                <div class="EnterTools">
                    <button class="EnterButton" @click="writeThou"><el-icon><EditPen /></el-icon>记录</button>
                </div>

            </div>
        </div>
        <!-- 历史列表块 -->
        <ul class="ThougthList">
            <div class="NullBlockTip" v-if="List.length <= 0">
                <el-icon><IceCreamRound /></el-icon>
                给生活来一点记录!
            </div>
            <div class="DateLi" v-for="(item,key) in dateList" :key="key">
                <p class="DateLiTitle">{{item.showName}} <span class="DateThoughtNumber" v-if="false">{{item.thoughtList.length}} 感悟</span></p>
                <ul class="CurrentDateList">
                    <li v-for="(li,key) in item.thoughtList" :key="key" class="ThougthLi">
                        <div class="ThoughtMain">
                            <div class="ThoughtDetails">
                                <span class="thou_time">{{Tool.getTimeString(li.date)}}</span>
                                <span @click="destoryThou(li._id)" class="DestoryThought">删除</span>
                            </div>
                            <pre class="ThoughtText">{{li.text}}</pre>
                        </div>
                    </li>
                </ul>
            </div>
        </ul>
    </div>
</template>
<script>
import { ElMessage } from 'element-plus'
export default {
    name:'Thought',
      data(){
      return {
        List:[],
        writeText:"",
        careerTextLength:0,
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
        // 更新短语生涯字数
        updateCareerTextLength(){
            // this.careerTextLength = 0;
            let TextLength = 0;
            this.List.forEach(item=>{
                TextLength += item.text.length;
            })
            this.careerTextLength = TextLength;
        },
        //用户新加短语
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
            // if(this.thoughtEmotion._id == null){
            //     alert("请选择一个状态");
            //     return;
            // }
            let that = this;
            this.axios.post(this.Tool.config.address + '/thought/add',data)
                .then(()=>{
                    that.updateDate();
                    ElMessage({
                        showClose: true,
                        message: '记录成功!',
                        type: 'success',
                    })
                    this.writeText = "";
                });
        },
        //用户删除短语
        destoryThou(_id){
            if(!confirm('确定删除该短语吗?')){
                return;
            }
            let data = {
                _id
            }
            let that = this;
            this.axios.post(this.Tool.config.address + '/thought/remove',data)
            .then(()=>{
                ElMessage({
                    showClose: true,
                    message: '已删除该短语',
                })
                that.updateDate();
            });
        },
        // 更改新短语的状态
        changeEmotion(item){
            this.thoughtEmotion = item;
        },
        // 更新所有短语的日期
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
                this.updateCareerTextLength();
            });
          this.axios.get(this.Tool.config.address + '/emotion/all')
            .then(res=>{
                this.EmotionList = res.data;
            });
        }
    },
    mounted(){
        this.updateDate();
        document.title = "DataLife-想法短语";
    }
}
</script>
<style lang="less" scoped>
    @import './Thought.less';
</style>
