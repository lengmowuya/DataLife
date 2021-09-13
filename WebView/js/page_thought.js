let Controldata = {
    List:[],
    writeText:"",
    dateList:[],
    thoughtEmotion:{
        name:"状态"
    },
    EmotionList:[],
    showEmotionList:false,
}
const ThoughtControldata = {
    data(){
        return Controldata;
    },
    methods:{
        writeThou(){
            // ThoughtSurface.add(this.writeText);
            let data = {
                text:this.writeText
            }
            axios.post('http://127.0.0.1:3000/thought/add',data)
                .then(res=>{
                    page_thought();
                });
            this.writeText = "";
        },
        destoryThou(_id){
            let data = {
                _id
            }
            axios.post('http://127.0.0.1:3000/thought/remove',data)
            .then(res=>{
                page_thought();
            });
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
        }
    }
}
let ThoughtControl = Vue.createApp(ThoughtControldata);
let TCCase = ThoughtControl.mount("#ThoughtPage");

function page_thought(){
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
        Controldata.EmotionList = res.data;
        TCCase.$forceUpdate();
    });
}