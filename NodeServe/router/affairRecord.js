const express = require("express");
const app = express();
const Export = require('./../mongodb/schema');
const mongoose = require("mongoose");
const {FormatDate} = require('./../tools/date.tool')
const jwt = require('./../api/jwt.js');
const dayjs = require('dayjs');

// 获取用户今天的记录
app.get('/affairRecord/today/:userId',jwt.verify,(req,res)=>{
    let today = new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate());
    Export.AffairRecord.find({owner:req.params.userId,time:{$gte:today}})
        .populate({ path: "affair",populate: { path: 'icon' }})
        .then(result=>{
            res.send(result);
        })
})
// 获取用户所有的Record
app.get('/affairRecord/all/:userId',jwt.verify,(req,res)=>{
    Export.AffairRecord.find({owner:req.params.userId})
        .populate({ path: "affair",populate: { path: 'icon' }})
        .then(result=>{
            res.send(result);
        })
})

// 获取用户7天内的记录
app.get('/affairRecord/recent7/:userId',jwt.verify,(req,res)=>{
    let startDate = dayjs(new Date()).add(-7,'day');
    let endDate = new Date();

    Export.AffairRecord.find({owner:req.params.userId,time:{$gte:startDate,$lte:endDate}})
        .populate({ path: "affair",populate: { path: 'icon' }})
        .then(result=>{
            res.send(result);
        })
})
// 获取用户30天内的记录
app.get('/affairRecord/recent30/:userId',jwt.verify,(req,res)=>{
    let startDate = dayjs(new Date()).add(-30,'day');
    let endDate = new Date();

    Export.AffairRecord.find({owner:req.params.userId,time:{$gte:startDate,$lte:endDate}})
        .populate({ path: "affair",populate: { path: 'icon' }})
        .then(result=>{
            res.send(result);
        })
})

// 获取用户范围日期内的记录
app.get('/affairRecord/date/:userId',jwt.verify,(req,res)=>{
    let startDate;
    let endDate;
    Export.AffairRecord.find({owner:req.params.userId,time:{$gte:startDate,$lte:endDate}})
        .populate({ path: "affair",populate: { path: 'icon' }})
        .then(result=>{
            res.send(result);
        })
})
// 删除指定记录
app.post('/affairRecord/remove',jwt.verify,(req,res)=>{
    Export.AffairRecord.deleteOne({_id:req.body.id})
        .then(()=>{
            res.send({type:'success'});
        }).catch((err)=>{
            res.send({type:'error'})
        })
})
// 添加记录
app.post('/affairRecord/add',jwt.verify,(req,res)=>{
    // 创建新记录
    let  AffairRecord = {
        sentence:req.body.sentence,
        owner:req.body.owner,
        affair:req.body.affair
        // time:new Date().getTime(),
        // data:FormatDate(new Date().getTime())
    }
    // delete req.body.time;
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

// 获取用户事务记录累计数量
app.get('/affairRecord/length/:userId',jwt.verify,(req,res)=>{
    Export.AffairRecord.find({owner:req.params.userId})
        .then(result=>{
            res.send({length:result.length});
        })
})
// 获取用户事务记录累计天数
app.get('/affairRecord/days/:userId',jwt.verify,(req,res)=>{
    Export.AffairRecord.find({owner:req.params.userId})
        .then(result=>{
            let days = 0;
            let daysObj = result.reduce((prev,item)=>{
                let str = new Date(item.time).toDateString();
                if(prev[str] == undefined){
                    prev[str] = [];
                }
                prev[str].push(item);
                return prev;
            },{})
            for(let key in daysObj){
                days++;
            }
            res.send({days});

        })
})

module.exports = app;