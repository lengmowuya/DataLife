const express = require("express");
const app = express();
const Export = require('./../mongodb/schema');
const mongoose = require("mongoose");
const {FormatDate} = require('./../tools/date.tool')

// 获取所有心情状态
app.get('/emotion/all',(req,res)=>{
    Export.Emotion.find({},(err,result)=>{
        if(err) res.send({type:'error'});
        res.send(result);
        // console.log(result);
    })
})

module.exports = app;