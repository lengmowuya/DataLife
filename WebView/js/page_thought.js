let Controldata = {
    List:[],
    writeText:"",
    dateList:[],
    thoughtEmotion:{
        name:"状态"
    },
    Emotion:[]
}
const ThoughtControldata = {
    data(){
        return Controldata;
    },
    methods:{
        writeThou(){
            ThoughtSurface.add(this.writeText);
            this.writeText = "";
            page_thought();
        },
        FormatDate,
        getDateString,
        setThoughtList(){
            this.List.forEach((item)=>{
                item.date = FormatDate(item.time);
                item.dateString = this.getDateString(item.date);
                item.timeSort = item.date.year * 12 * 31 + item.date.month * 31 + item.date.day;
                // console.log(item.date.year * 1000);
                // console.log(item.timeSort);
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
    // let List;
    // let DomList = document.querySelector(".ThougthList");
    // console.log(DomList);
    ThoughtSurface.all((event)=>{
        console.log(event.target.result);
        Controldata.List = event.target.result;
        // Controldate.List.forEach((item)=>{
        // })
        TCCase.setThoughtList()
        TCCase.initDateList()
        TCCase.$forceUpdate();
    });
}