const express = require("express");
const app = express();
const Export = require('./../mongodb/schema');
const mongoose = require("mongoose");
const {FormatDate} = require('./../tools/date.tool')

// 添加事务
app.post('/affair/add',(req,res)=>{
    // req.body.emotion = mongoose.Types.ObjectId(req.body.emotion);
    // req.body.time = new Date().getTime();
    delete req.body.time;
    req.body.icon = "miaosha";
    
    new Export.Affair(req.body).save((err,result)=>{
        if(err) res.send({type:'error'});
        res.send({type:'success'});
    });
})
// 删除事务
app.post('/affair/remove',(req,res)=>{
    Export.Affair.findById(req.body.id)
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
app.get('/affair/single/:userId/:affairId',(req,res)=>{
    Export.Affair.findById(req.params.affairId)
        .populate('record')
        .then(result=>{
            res.send(result);
            // result.forEach(item=>{
            //     item.owner =  mongoose.Types.ObjectId('6173b2ab895c17975d21f24c');
            //     item.save();
            // })
        })
})
// 获取所有事务
app.get('/affair/all/:userId',(req,res)=>{
    Export.Affair.find({owner:req.params.userId})
        .populate('record')
        .then(result=>{
            res.send(result);
            // result.forEach(item=>{
            //     item.owner =  mongoose.Types.ObjectId('6173b2ab895c17975d21f24c');
            //     item.save();
            // })
        })
})
// 修改事务
app.post('/affair/update',(req,res)=>{
    let data = {
        name:req.body.name,
        describe:req.body.describe,
        icon:req.body.icon
    }
    // console.log(req.body);
    Export.Affair.updateOne({_id:req.body._id},data,(err,result)=>{
        if(err){
            console.log(err);
            res.send({type:'error'});

        }else{
            console.log(result);
            res.send({type:'success'});

        }
    })
        // .then((result)=>{
        //     console.log(result);
        // }).catch(()=>{
        // })
})




module.exports = app;