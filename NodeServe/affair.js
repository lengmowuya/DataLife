const express = require("express");
const app = express();
let Export = require('./schema.js');
let mongoose = require("mongoose");
function FormatDate(timeStamp){
    let TimeObj = new Date(timeStamp);
    let date = {
        year:TimeObj.getFullYear(),
        month:TimeObj.getMonth() + 1,
        day:TimeObj.getDate(),
        hour:TimeObj.getHours(),
        min:TimeObj.getMinutes(),
        sec:TimeObj.getSeconds()
    }
    return date;
}
function getDateString(data){
    return data.year + '-' + data.month + '-' + data.day;
}
function getTimeString(data){
let hourName = '';
let hour = data.hour;
if(hour <= 6){
    hourName = "凌晨";
}else if(hour <= 10){
    hourName = "上午";
}else if(hour <= 12){
    hourName = "中午";
}else if(hour <= 17){
    hourName = "下午";
}else if(hour <= 21){
    hourName = "晚上";
}else{
    hourName = "半夜";
}
return hourName + '' + data.hour + ':' + data.min;
}

// 添加事务
app.post('/affair/add',(req,res)=>{
    // req.body.emotion = mongoose.Types.ObjectId(req.body.emotion);
    req.body.time = new Date().getTime();
    req.body.icon = "miaosha";
    new Export.AffairModel(req.body).save((err,result)=>{
        if(err) res.send({type:'error'});
        res.send({type:'success'});
    });
})
// 删除事务
app.post('/affair/remove',(req,res)=>{
    Export.AffairModel.remove({_id:req.body.id},(err,result)=>{
        if(err) res.send({type:'error'});
        res.send();
    })
})
// 获取所有事务
app.get('/affair/all/:userId',(req,res)=>{
    Export.AffairModel.find({owner:req.params.userId})
        .populate('record')
        .then(result=>{
            res.send(result);
            // result.forEach(item=>{
            //     item.owner =  mongoose.Types.ObjectId('6173b2ab895c17975d21f24c');
            //     item.save();
            // })
        })
})
app.post('/affair/update',(req,res)=>{
    let data = {
        name:req.body.name,
        describe:req.body.describe,
        icon:req.body.icon
    }
    Export.AffairModel.update({_id:req.body._id},data)
        .then(()=>{
            res.send("success");
        })
})
// 获取所有图标
app.get('/icon/all',(req,res)=>{
    Export.IconModel.find()
        .then(result=>{
            res.send(result);
        })
})

// 以下为事务记录
// 删除事务
app.post('/affairRecord/remove',(req,res)=>{
    Export.AffairRecordModel.remove({_id:req.body.id},(err,result)=>{
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
    new Export.AffairRecordModel(AffairRecord).save()
        .then(affairRecord=>{
            // 添加外键
            Export.AffairModel.findOne({_id:req.body.affair})
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