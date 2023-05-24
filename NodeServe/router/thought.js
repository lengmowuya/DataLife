const express = require("express");
const mongoose = require("mongoose");
const app = express();
const Export = require('./../mongodb/schema');

// 添加感悟
app.post('/thought/add',(req,res)=>{
    req.body.emotion = mongoose.Types.ObjectId(req.body.emotion);
    // req.body.time = new Date().getTime();
    delete req.body.time;
    new Export.Thought(req.body).save((err,result)=>{
        if(err) res.send({type:'error'});
        res.send({type:'success'});
    });
})
// 删除感悟
app.post('/thought/remove',(req,res)=>{
    // console.log(req.body);
    Export.Thought.remove({_id:req.body._id},(err,result)=>{
        if(err) res.send({type:'error'});
        res.send();
    })
})
// 获取所有感悟
app.get('/thought/all/:userId',(req,res)=>{
    Export.Thought.find({owner:req.params.userId})
        .populate('emotion')
        .then(result=>{
            res.send(result);
            // result.forEach(item=>{
            //     item.owner =  mongoose.Types.ObjectId('6173b2ab895c17975d21f24c');
            //     item.save();
            // })
        })
})

module.exports = app;