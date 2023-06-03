const express = require("express");
const mongoose = require("mongoose");
const app = express();
const Export = require('./../mongodb/schema');
// const md5 = require('md5');
const jwt = require('./../api/jwt.js');
const sendEmail = require('./../api/sendEmail')
const userCodeTable = {};


app.post('/user/sign/sendEmailCode',(req,res)=>{
    console.log(req.body.email);
    let emailCode = sendEmail(req.body.email);
    userCodeTable[req.body.email] = {emailCode,time:new Date().getTime()};
    console.log(userCodeTable);
    res.json({});
})

// 注册用户
app.post('/user/sign',(req,res)=>{
    delete req.body.time;
    // 判断邮箱验证码并查看是否过期
    // console.log(userCodeTable);
    // undefined地址避免
    if(userCodeTable[req.body.email] == undefined){
        {res.send({type:'codeLess'});return;}
    }
    if(userCodeTable[req.body.email].emailCode != req.body.emailCode 
        || (new Date().getTime() - userCodeTable[req.body.email].time) > 6000 * 1000)
        {res.send({type:'codeErrror'});return;}
    // 搜寻判断用户
    Export.User.findOne({email:req.body.email})
        .then((result)=>{
            // 判断用户是否存在
            if(result != undefined){res.send({type:'exist'});return;}

            new Export.User(req.body).save((err,result)=>{
                if(err) res.send({type:'ERROR'});

                // 去掉敏感数据
                let userCopy = {
                    _id:result._id,
                    email:result.email,
                    name:result.name,
                    headImg:result.headImg
                };
                res.send({type:'success',id:result._id,token: jwt.sign({ _id: result._id }),user:userCopy});
            });
                
        })

})

// 用户登录-账密
app.post('/user/login',(req,res)=>{
    // console.log(req.body);
    Export.User.findOne({email:req.body.email})
        .then((result)=>{
            if(result == undefined){
                res.send({type:'null'});
            }else if(result.passward == req.body.passward){
                
                // 去掉敏感数据
                let userCopy = {
                    _id:result._id,
                    email:result.email,
                    name:result.name,
                    headImg:result.headImg
                };
                res.send({type:'success',id:result._id,token:jwt.sign({ _id: result._id }),user:userCopy});
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