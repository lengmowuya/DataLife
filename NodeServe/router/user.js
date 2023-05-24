const express = require("express");
const mongoose = require("mongoose");
const app = express();
const Export = require('./../mongodb/schema');
// const md5 = require('md5');
const jwt = require('./../api/jwt.js');

// 注册用户
app.post('/user/sign',(req,res)=>{
    // req.body.emotion = mongoose.Types.ObjectId(req.body.emotion);
    delete req.body.time;
    Export.User.findOne({email:req.body.email})
    .then((result)=>{
        // console.log(result);
        if(result == undefined){
            new Export.User(req.body).save((err,result)=>{
                if(err) res.send({type:'ERROR'});
                res.send({type:'success',id:result._id,token: jwt.sign({ _id: result._id }),user:result});
            });
        }else{
            res.send({type:'exist'});
        }
    })

})

// 用户登录-账密
app.post('/user/login',(req,res)=>{
    // console.log(req.body);
    Export.User.findOne({email:req.body.email})
        select({passward:0})
        .then((result)=>{
            if(result == undefined){
                res.send({type:'null'});
            }else if(result.passward == req.body.passward){
                res.send({type:'success',id:result._id,token:jwt.sign({ _id: result._id }),user:result});
            }else{
                res.send({type:'error'});
            }
        })
})
// 用户登录-Token
// app.post('/user/loginToken',jwt.verify,(req,res)=>{
//     Export.User.findOne({email:req.body.email}).then((result)=>{
//         res.json({type:'success',id:result._id,token:jwt.sign({ _id: result._id })});
//     })
// })
module.exports = app;