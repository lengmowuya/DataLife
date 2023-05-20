const express = require("express");
const app = express();
const Export = require('./../mongodb/schema');
const mongoose = require("mongoose");
const {FormatDate} = require('./../tools/date.tool')

// 添加事务
app.post('/affair/add',(req,res)=>{
    // req.body.emotion = mongoose.Types.ObjectId(req.body.emotion);
    req.body.time = new Date().getTime();
    req.body.icon = "miaosha";
    new Export.Affair(req.body).save((err,result)=>{
        if(err) res.send({type:'error'});
        res.send({type:'success'});
    });
})
// 删除事务
app.post('/affair/remove',(req,res)=>{
    Export.Affair.remove({_id:req.body.id},(err,result)=>{
        if(err) res.send({type:'error'});
        res.send();
    })
})
// 获取所有事务
app.get('/affair/all/:userId',(req,res)=>{
    Export.Affair.find({owner:req.params.userId})
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
    Export.Affair.update({_id:req.body._id},data)
        .then(()=>{
            res.send("success");
        })
})



module.exports = app;