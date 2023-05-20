const express = require("express");
const app = express();
const Export = require('./../mongodb/schema');
const mongoose = require("mongoose");
const {FormatDate} = require('./../tools/date.tool')


// 删除事务记录
app.post('/affairRecord/remove',(req,res)=>{
    Export.AffairRecord.remove({_id:req.body.id},(err,result)=>{
        if(err) res.send({type:'error'});
        res.send();
    })
})
// 添加事务记录
app.post('/affairRecord/add',(req,res)=>{
    // 创建新记录
    // console.log(req.body);
    let  AffairRecord = {
        sentence:req.body.sentence,
        time:new Date().getTime(),
        data:FormatDate(new Date().getTime())
    }
    new Export.AffairRecord(AffairRecord).save()
        .then(affairRecord=>{
            // 添加外键
            Export.Affair.findOne({_id:req.body.affair})
            .then(affair=>{
                if(!Array.isArray(affair.record)){
                    affair.record = [];
                }
                affair.record.push(affairRecord._id);
                affair.save();
            })
            res.send({type:'success'});
        })
})

module.exports = app;