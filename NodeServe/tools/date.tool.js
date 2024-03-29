const DateTool = {
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
    }
}


module.exports = DateTool;