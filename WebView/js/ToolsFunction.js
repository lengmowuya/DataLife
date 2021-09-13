function FormatDate(timeStamp){
    let TimeObj = new Date(timeStamp);
    let date = {
        year:TimeObj.getFullYear(),
        month:TimeObj.getMonth() + 1,
        day:TimeObj.getDate()
    }
    return date;
}
function getDateString(data){
    return data.year + '-' + data.month + '-' + data.day;
}