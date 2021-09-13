let mongoose = require("mongoose");
let  ThoughtSchema = {
    text:String,
    time:{
        type:Number,
        default:new Date().getTime()
    }
}
let  EmotionSchema = {
    name:String,
    time:{
        type:Number,
        default:new Date().getTime()
    }
}
let Export = {};
Export.ThoughtModel = mongoose.model('Thought',ThoughtSchema,"Thought");
Export.EmotionModel = mongoose.model('Emotion',EmotionSchema,"Emotion");

// 初始化状态数据
Export.EmotionModel.find({},(err,res)=>{
    // console.log(res);
    if(res.length == 0){
        let NormalEmotion = ['忧愁','伤感',"无奈","愤怒","悲愤","痛惜","恍惚"];
        for(let i = 0;i<NormalEmotion.length;i++){
            new Export.EmotionModel({name:NormalEmotion[i]}).save();
        }
    }
})
// exports.ThoughtModel = Export.ThoughtModel;
// exports.EmotionModel = Export.EmotionModel;
module.exports = Export;
