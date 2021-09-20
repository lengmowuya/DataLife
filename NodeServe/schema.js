let mongoose = require("mongoose");
let FontInfo = require("./FontInfo.json");
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
  function  getDateString(data){
    return data.year + '-' + data.month + '-' + data.day;
  }
  function getTimeString(data){
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
// 事务
let AffairSchema = {
    name:String,
    describe:String,
    isFreeze:{
        type:Boolean,
        default:false
    },
    time:Number,
    icon:{
        type:String,
        default:"dakaqiandao"
    },
    record:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'AffairRecord'
        }
    ]
        
}
// 事务记录
let AffairRecordSchema = {
    sentence:String,
    time:Number,
    data:{
        type:Object,
        default:FormatDate(new Date().getTime())
    }
    // affair:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Affair'
    // }
}
// 感悟-状态
let  EmotionSchema = {
    name:String,
    time:Number
}
// 感悟-短文
let  ThoughtSchema = {
    text:String,
    time:Number,
    emotion:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Emotion'
    }
}
let IconSchema = {
    icon_id:String,
    name:String,
    font_class:String,
    unicode:String,
    unicode_decimal:Number
}
let Export = {};
Export.ThoughtModel = mongoose.model('Thought',ThoughtSchema,"Thought");
Export.EmotionModel = mongoose.model('Emotion',EmotionSchema,"Emotion");
Export.AffairModel = mongoose.model('Affair',AffairSchema,"Affair");
Export.IconModel = mongoose.model('Icon',IconSchema,"Icon");
Export.AffairRecordModel= mongoose.model('AffairRecord',AffairRecordSchema,"AffairRecord");

// 初始化状态数据
Export.EmotionModel.find({},(err,res)=>{
    // console.log(res);
    if(res.length == 0){
        let NormalEmotion = ['忧愁','伤感',"无奈","愤怒","悲愤","痛惜","恍惚","埋怨","痛苦","兴奋","顿悟","无趣","恶心","憎恨","沮丧"];
        for(let i = 0;i<NormalEmotion.length;i++){
            new Export.EmotionModel({name:NormalEmotion[i]}).save();
        }
    }
})
Export.IconModel.find({},(err,res)=>{
    // console.log(res);
    if(res.length == 0){
        let glyphs = FontInfo.glyphs;
        // console.log(glyphs[0]);
        for(let i = 0;i<glyphs.length;i++){
            new Export.IconModel(glyphs[i]).save();
        }
    }
})
module.exports = Export;
