let Tool = {
    config:{
        address:"http://127.0.0.1:3000",
        process:""
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
    getMiniDateString(data){
        return data.month + '-' + data.day;
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
}

// console.log(process.env.NODE_ENV == "development");
Tool.config.process = process.env.NODE_ENV;
if(Tool.config.process == "development"){
    Tool.config.address = "http://" + "127.0.0.1:3000";
}else{
    Tool.config.address = "http://" + "101.35.144.20:3000";
}
module.exports = Tool;