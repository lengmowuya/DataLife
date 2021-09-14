let Controldata = {
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
}
const ThoughtControldata = {
    data(){
        return Controldata;
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
            axios.post('http://127.0.0.1:3000/thought/add',data)
                .then(res=>{
                    page_thought();
                });
            this.writeText = "";
        },
        //删除短文
        destoryThou(_id){
            let data = {
                _id
            }
            axios.post('http://127.0.0.1:3000/thought/remove',data)
            .then(res=>{
                page_thought();
            });
        },
        changeEmotion(item){
            this.thoughtEmotion = item;
            // TCCase.$forceUpdate();
        },
        FormatDate,
        getDateString,
        setThoughtList(){
            this.List.forEach((item)=>{
                item.date = FormatDate(item.time);
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
        }
    }
}
let ThoughtControl = Vue.createApp(ThoughtControldata);
let TCCase = ThoughtControl.mount("#ThoughtPage");

function page_thought(){
    Controldata.date = FormatDate(new Date().getTime());
    axios.get('http://127.0.0.1:3000/thought/all')
    .then(res=>{
        Controldata.List = res.data;
        console.log(res);
        TCCase.setThoughtList();
        TCCase.initDateList();
        TCCase.$forceUpdate();
    });
    axios.get('http://127.0.0.1:3000/emotion/all')
    .then(res=>{
        // res.data.forEach(item=>{
        //     item.id = item._id;
        //     item._id = item.id;
        //     // Controldata.EmotionList.push(item);
        // })
        Controldata.EmotionList = res.data;
        // console.log(res.data[0])
        TCCase.$forceUpdate();
    });
    // debugger ;
}