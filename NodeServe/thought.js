const express = require("express");
const mongoose = require("mongoose");
const app = express();
let Export = require('./schema.js');

// 添加感悟
app.post('/thought/add',(req,res)=>{
    req.body.emotion = mongoose.Types.ObjectId(req.body.emotion);
    req.body.time = new Date().getTime();
    new Export.ThoughtModel(req.body).save((err,result)=>{
        if(err) res.send({type:'error'});
        res.send({type:'success'});
    });
})
// 删除感悟
app.post('/thought/remove',(req,res)=>{
    // console.log(req.body);
    Export.ThoughtModel.remove({_id:req.body._id},(err,result)=>{
        if(err) res.send({type:'error'});
        res.send();
    })
})
// 获取所有感悟
app.get('/thought/all/:userId',(req,res)=>{
    Export.ThoughtModel.find({owner:req.params.userId})
        .populate('emotion')
        .then(result=>{
            res.send(result);
            // result.forEach(item=>{
            //     item.owner =  mongoose.Types.ObjectId('6173b2ab895c17975d21f24c');
            //     item.save();
            // })
        })
})
// 获取所有心情状态
app.get('/emotion/all',(req,res)=>{
    Export.EmotionModel.find({},(err,result)=>{
        if(err) res.send({type:'error'});
        res.send(result);
        // console.log(result);
    })
})
module.exports = app;