const express = require("express");
const mongoose = require("mongoose");
const app = express();
const Export = require('./../mongodb/schema');

function CheckEmail(){

}
function CheckPassward(){

}
// 注册用户
app.post('/user/sign',(req,res)=>{
    // req.body.emotion = mongoose.Types.ObjectId(req.body.emotion);
    req.body.time = new Date().getTime();
    Export.User.findOne({email:req.body.email})
    .then((result)=>{
        // if(err) res.send({type:'ERROR'});
        // console.log(result);
        console.log(result);
        if(result == undefined){
            // res.send({type:'null'});
            new Export.User(req.body).save((err,result)=>{
                if(err) res.send({type:'ERROR'});
                res.send({type:'success',id:result._id});
            });
        }else{
            res.send({type:'error'});
        }
    })

})

// 用户登录
app.post('/user/login',(req,res)=>{
    // console.log(req.body);
    Export.User.findOne({email:req.body.email})
        .then((result)=>{
            // if(err){console.log(err);return;}
            // console.log(result);
            // console.log(result);
            if(result == undefined){
                res.send({type:'null'});
            }else if(result.passward == req.body.passward){
                res.send({type:'success',id:result._id});
            }else{
                res.send({type:'error'});
            }
        })
})
module.exports = app;