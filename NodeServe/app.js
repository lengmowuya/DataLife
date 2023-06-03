// 1.引入包
const bodyParser = require('body-parser');
const express = require("express");
const app = express();
const port = 3000;
const router = require('./router/Router.js');

require('./mongodb/db.js');
require('./mongodb/schema.js');


// 3.使用中间件
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// 4.设置跨域访问
app.all("*",function(req,res,next){
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin","*");
    //允许的header类型
    // res.header("Access-Control-Allow-Headers",);
    res.header("Access-Control-Allow-Headers",["token","content-type"]);
    //跨域允许的请求方式 
    res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
    if (req.method.toLowerCase() == 'options')
        res.status(200).send();  //让options尝试请求快速结束
        // res.send(200);  //让options尝试请求快速结束
    else
        next();
})

app.get('/test',(req,res)=>{
    res.json({type:'success'});
})
app.use(router);

app.listen(port,()=>{
    console.log('服务器正在运行...');
})


