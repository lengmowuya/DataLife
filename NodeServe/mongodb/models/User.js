const mongoose = require("mongoose");
let UserSchema = {
    name:String,
    telephone:Number,
    time:Number,
    email:String,
    passward:String
}
const User = mongoose.model('User',UserSchema,"User");
module.exports = User;
