const express = require("express");
const app = express();
let Export = require('./schema.js');

// 添加事务
app.post('/affair/add',(req,res)=>{
    // req.body.emotion = mongoose.Types.ObjectId(req.body.emotion);
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
app.get('/affair/all',(req,res)=>{
    // Export.AffairModel.find({},(err,result)=>{
    //     if(err) res.send({type:'error'});
    //     res.send(result);
    // })
    Export.AffairModel.find()
        .populate('record')
        .then(result=>{
            res.send(result);
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
// 添加事务记录
app.post('/affairRecord/add',(req,res)=>{
    // 创建新记录
    console.log(req.body);
    new Export.AffairRecordModel({sentence:req.body.sentence}).save()
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

    // 添加外键
    // Export.AffairModel.findOne({_id:req.body.affair})
    // .then(affair=>{
    //     if(!Array.isArray(affair.record)){
    //         affair.record = [];
    //     }
    //     affair.record.push(new Date().getTime());
    //     affair.save();
    // })
    // res.send({type:'success'});
})
module.exports = app;