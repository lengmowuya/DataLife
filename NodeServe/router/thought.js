const express = require("express");
const mongoose = require("mongoose");
const app = express();
const Export = require('./../mongodb/schema');
const jwt = require('./../api/jwt.js');


// 添加感悟
app.post('/thought/add',jwt.verify,(req,res)=>{
    // console.log(new Date(new Date().getTime() + 8 * 60 * 60));
    delete req.body.time;
    new Export.Thought(req.body).save((err,result)=>{
        if(err) res.send({type:'error'});
        res.send({type:'success'});
    });
})
// 删除感悟
app.post('/thought/remove',jwt.verify,(req,res)=>{
    Export.Thought.remove({_id:req.body._id},(err,result)=>{
        if(err) res.send({type:'error'});
        res.send();
    })
})
// 获取所有感悟
app.get('/thought/all/:userId',jwt.verify,(req,res)=>{
    Export.Thought.find({owner:req.params.userId})
        // .populate('emotion')
        .then(result=>{
            res.send(result);
        })
})
// 获取用户想法累计数量
app.get('/thought/length/:userId',jwt.verify,(req,res)=>{
    Export.Thought.find({owner:req.params.userId})
        .then(result=>{
            res.send({length:result.length});
        })
})
// 获取用户想法累计天数
app.get('/thought/days/:userId',jwt.verify,(req,res)=>{
    Export.Thought.find({owner:req.params.userId})
        .then(result=>{
            let days = 0;
            let daysObj = result.reduce((prev,item)=>{
                let str = new Date(item.time).toDateString();
                // console.log(item.str);
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