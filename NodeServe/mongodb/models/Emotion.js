const mongoose = require("mongoose");
// 感悟-状态
let  EmotionSchema = {
    name:String,
    time:{
        type:Date,
        default:new Date()
    }
}
const Emotion = mongoose.model('Emotion',EmotionSchema,"Emotion");

// 初始化状态数据
Emotion.find({},(err,res)=>{
    if(res.length == 0){
        let NormalEmotion = ['忧愁','伤感',"无奈","愤怒","悲愤","痛惜","恍惚","埋怨","痛苦","兴奋","顿悟","无趣","恶心","憎恨","沮丧"
                ,"麻木","惆怅","确幸","幸福","懊恼","迷茫","无语","平静","恍然","黯然","丧气","寡欢","舒畅","满意","甜蜜","心旷神怡","安然不破","向往","入迷","赞美","恐惧"];
        for(let i = 0;i<NormalEmotion.length;i++){
            new Export.EmotionModel({name:NormalEmotion[i]}).save();
        }
    }
})

module.exports = Emotion;