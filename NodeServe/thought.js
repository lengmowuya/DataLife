// import {Througth,Enomtion} from './schema.js';
const express = require("express");
const app = express();

// console.log("装备端口")
app.post('/thought/add',(req,res)=>{
    console.log("短文增加");
    res.send(req.body);
})