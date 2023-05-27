const mongoose = require("mongoose");
// 感悟-短文
let  ThoughtSchema = {
    text:String,
    time:{
        type:Date,
        default:new Date(new Date() + 8*60*60)
    },
    // emotion:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Emotion'
    // },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}
const Thought = mongoose.model('Thought',ThoughtSchema,"Thought");
module.exports = Thought;
