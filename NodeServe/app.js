require('./db.js');
require('./schema.js');
require('./thought.js');
const express = require("express");
const app = express();
const port = 3000;

app.get('/',(req,res)=>{
    res.send('你好,世界');
})

app.listen(port,()=>{
    console.log('服务器正在运行...');
})