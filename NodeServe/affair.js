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
    // console.log(req.body);
    Export.AffairModel.remove({_id:req.body._id},(err,result)=>{
        if(err) res.send({type:'error'});
        res.send();
    })
})
// // 获取所有事务
// app.get('/affair/all',(req,res)=>{
//     Export.ThoughtModel.find()
//         .populate('emotion')
//         .then(result=>{
//             res.send(result);
//         })
// })
// 获取所有事务
app.get('/affair/all',(req,res)=>{
    Export.AffairModel.find({},(err,result)=>{
        if(err) res.send({type:'error'});
        res.send(result);
    })
})
module.exports = app;