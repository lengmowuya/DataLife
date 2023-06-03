const mongoose = require("mongoose");
// 事务
let AffairSchema = {
    name:String,
    describe:String,
    isFreeze:{
        type:Boolean,
        default:false
    },
    time:{
        type:Date,
        default:Date.now
    },
    icon:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Icon'
    },
    record:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'AffairRecord'
        }
    ],
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}
const Affair = mongoose.model('Affair',AffairSchema,"Affair");
module.exports = Affair;
