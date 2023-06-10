export default {
    isToday(date){
        var today = new Date()
            today.setHours(0);
            today.setMinutes(0);
            today.setSeconds(0);
            today.setMilliseconds(0);
        var otime = today.getTime()
            //给出时间 - 今天0点
        var offset= date-otime
        var isToday = offset/1000/60/60
        if(isToday > 0 && isToday<= 24){
            return true
        }else{
            return false;
        }
    }
}
