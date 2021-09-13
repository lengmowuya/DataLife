let mongoose = require("mongoose");
let db = mongoose.connection;

db.on('error',()=>{
    console.log("数据库异常!");
})

db.once('open',()=>{
    console.log("数据库连接成功!");
})

mongoose.connect('mongodb://localhost:27017/DataLife')