const express = require("express");
const app = express();
const Export = require('./../mongodb/schema');
const mongoose = require("mongoose");
const {FormatDate} = require('./../tools/date.tool')
const jwt = require('./../api/jwt.js');
// 添加事务
app.post('/affair/add',jwt.verify,(req,res)=>{
    // req.body.emotion = mongoose.Types.ObjectId(req.body.emotion);
    // req.body.time = new Date().getTime();
    delete req.body.time;
    // req.body.icon = "miaosha";
    new Export.Affair(req.body).save((err,result)=>{
        if(err) {res.send({type:'error'});return;};
        res.send({type:'success'});
    });
})
// 删除事务
app.post('/affair/remove',jwt.verify,(req,res)=>{
    Export.Affair.findById(req.body.id)
        .populate('icon')
        .then(result=>{
            result.record.forEach(item=>{
                Export.AffairRecord.deleteOne({_id:item._id})
            })
            Export.Affair.deleteOne({_id:req.body.id})
                .then((result)=>{
                    res.send({type:'success'});
                })
        })

})
// 获取单个事务
app.get('/affair/single/:userId/:affairId',jwt.verify,(req,res)=>{
    Export.Affair.findById(req.params.affairId)
        .populate('icon')
        .populate('record')
        .then(result=>{
            res.send(result);
        })
})
// 获取所有事务
app.get('/affair/all/:userId',jwt.verify,(req,res)=>{
    Export.Affair.find({owner:req.params.userId})
        .populate('icon')
        .populate('record')
        .then(result=>{
            res.send(result);
        })
})
// 修改事务
app.post('/affair/update',jwt.verify,(req,res)=>{
    let data = {
        name:req.body.name,
        describe:req.body.describe,
        icon:req.body.icon
    }
    Export.Affair.updateOne({_id:req.body.id},data,(err,result)=>{
        if(err){
            // console.log(err);
            res.send({type:'error'});

        }else{
            // console.log(result);
            res.send({type:'success'});

        }
    })
        // .then((result)=>{
        //     console.log(result);
        // }).catch(()=>{
        // })
})




module.exports = app;