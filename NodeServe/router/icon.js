const express = require("express");
const app = express();
const Export = require('./../mongodb/schema');
const mongoose = require("mongoose");
const {FormatDate} = require('./../tools/date.tool')

// 获取所有图标
app.get('/icon/all',(req,res)=>{
    Export.Icon.find()
        .then(result=>{
            res.send(result);
        })
})

module.exports = app;