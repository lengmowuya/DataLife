function FormatDate(timeStamp){
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
}
function getDateString(data){
    return data.year + '-' + data.month + '-' + data.day;
}
function getTimeString(data){
    return data.hour + ':' + data.min;
}