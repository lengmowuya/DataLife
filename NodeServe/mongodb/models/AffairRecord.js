const mongoose = require("mongoose");
const {FormatDate} = require('./../../tools/date.tool');
// 事务记录
let AffairRecordSchema = {
    sentence:String,
    time:Number,
    data:{
        type:Object,
        default:FormatDate(new Date().getTime())
    }
}
const AffairRecord = mongoose.model('AffairRecord',AffairRecordSchema,"AffairRecord");
module.exports = AffairRecord;
