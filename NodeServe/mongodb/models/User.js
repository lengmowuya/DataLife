const mongoose = require("mongoose");
let UserSchema = {
    name:{
        type:String,
        default:'DataLife-新用户'
    },
    telephone:Number,
    time:{
        type:Date,
        default:Date.now
    },
    headImg:{
        type:String,
        default:'http://pic.imeitou.com/uploads/allimg/2021040523/dwbiqhq3dmx.png'
    },
    email:String,
    passward:String
}
const User = mongoose.model('User',UserSchema,"User");
module.exports = User;
