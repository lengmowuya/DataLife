let mongoose = require("mongoose");
let  EmotionSchema = {
    name:String,
    time:{
        type:Number,
        default:new Date().getTime()
    }
}
let  ThoughtSchema = {
    text:String,
    time:{
        type:Number,
        default:new Date().getTime()
    },
    emotion:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Emotion'
    }
}
let Export = {};
Export.ThoughtModel = mongoose.model('Thought',ThoughtSchema,"Thought");
Export.EmotionModel = mongoose.model('Emotion',EmotionSchema,"Emotion");

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
// exports.ThoughtModel = Export.ThoughtModel;
// exports.EmotionModel = Export.EmotionModel;
module.exports = Export;