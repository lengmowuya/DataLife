const bodyParser = require('body-parser');
const express = require("express");
const app = express();
const port = 3000;
require('./db.js');
require('./schema.js');
require('./thought.js');
let Export = require('./schema.js');
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
        res.send(200);  //让options尝试请求快速结束
    else
        next();
})
// app.get('/',(req,res)=>{
//     res.send(req.query);
// })
app.post('/thought/add',(req,res)=>{
    new Export.ThoughtModel(req.body).save((err,result)=>{
        if(err) res.send({type:'error'});
        res.send({type:'success'});
    });
})
app.post('/thought/remove',(req,res)=>{
    console.log(req.body);
    Export.ThoughtModel.remove({_id:req.body._id},(err,result)=>{
        if(err) res.send({type:'error'});
        res.send();
    })
})
app.get('/thought/all',(req,res)=>{
    Export.ThoughtModel.find({},(err,result)=>{
        if(err) res.send({type:'error'});
        res.send(result);
    })
})
app.get('/emotion/all',(req,res)=>{
    Export.EmotionModel.find({},(err,result)=>{
        if(err) res.send({type:'error'});
        res.send(result);
        // console.log(result);
    })
})
app.listen(port,()=>{
    console.log('服务器正在运行...');
})
