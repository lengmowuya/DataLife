const mongoose = require("mongoose");
// const {FormatDate} = require('./../../tools/date.tool');
// 事务记录
let AffairRecordSchema = {
    sentence:String,
    time:{
        type:Date,
        default:new Date()
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    affair:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Affair'
    }
    // ,
    // data:{
    //     type:Object,
    //     default:FormatDate(new Date().getTime())
    // }
}
const AffairRecord = mongoose.model('AffairRecord',AffairRecordSchema,"AffairRecord");
module.exports = AffairRecord;
