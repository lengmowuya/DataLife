const bodyParser = require('body-parser');
let mongoose = require("mongoose");
const express = require("express");
const app = express();
const port = 3000;
require('./db.js');
require('./schema.js');
let thoughtRouter = require('./thought.js');
let affairRouter = require('./affair.js');
let UserRouter = require('./UserRouter.js');
let Export = require('./schema.js');
let TokenTools = require('./jsonwebtoken.js');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
//设置跨域访问
app.all("*",function(req,res,next){
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin","*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers","content-type");
    //跨域允许的请求方式 
    res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
    if (req.method.toLowerCase() == 'options')
        res.status(200).send();  //让options尝试请求快速结束
        // res.send(200);  //让options尝试请求快速结束
    else
        next();
})
// 添加感悟
app.get('/test',(req,res)=>{
    res.send({type:'success'});
})
app.use((req,res,next)=>{
    if(!TokenTools.whiteList.includes(req.url)){
        TokenTools.verifyToken(req.header.authorization)
            .then(res=>{next()})
            .catch(e=>{res.status(401).send('invalid token')})
    }else{
        next()
    }
})
app.use(thoughtRouter);
app.use(affairRouter);
app.use(UserRouter);
app.listen(port,()=>{
    console.log('服务器正在运行...');
})


