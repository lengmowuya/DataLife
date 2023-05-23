const express = require("express");
const app = express();
const Export = require('./../mongodb/schema');
const mongoose = require("mongoose");
const {FormatDate} = require('./../tools/date.tool')

// 获取用户今天的记录
app.get('/affairRecord/today/:userId',(req,res)=>{
    let today = new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate());
    // console.log(today);
    Export.AffairRecord.find({owner:req.params.userId,time:{$gte:today}})
        .populate('affair')
        .then(result=>{
            // console.log(result);
            res.send(result);
        })
})
// 获取用户所有的Record
app.get('/affairRecord/all/:userId',(req,res)=>{
    Export.AffairRecord.find({owner:req.params.userId})
        .populate('affair')
        .then(result=>{
            res.send(result);
        })
})
// 获取用户范围日期内的记录
app.get('/affairRecord/date/:userId',(req,res)=>{
    let startDate;
    let endDate;
    Export.AffairRecord.find({owner:req.params.userId,time:{$gte:startDate,$lte:endDate}})
        .populate('affair')
        .then(result=>{
            // console.log(result);
            res.send(result);
        })
})
// 删除指定记录
app.post('/affairRecord/remove',(req,res)=>{
    Export.AffairRecord.remove({_id:req.body.id},(err,result)=>{
        if(err) res.send({type:'error'});
        res.send();
    })
})
// 添加记录
app.post('/affairRecord/add',(req,res)=>{
    // 创建新记录
    // console.log(req.body);
    let  AffairRecord = {
        sentence:req.body.sentence,
        owner:req.body.owner,
        affair:req.body.affair
        // time:new Date().getTime(),
        // data:FormatDate(new Date().getTime())
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