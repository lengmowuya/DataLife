let mongoose = require("mongoose");
let db = mongoose.connection;
let dbConfig = require("./../../../DataLife.json");
db.on('error',()=>{
    console.log("数据库异常!");
})
db.once('open',()=>{
    console.log("数据库连接成功!");
})
// let options = {
//     user:dbConfig.user,
//     passward:dbConfig.passward,
// }
// mongoose.connect('mongodb://localhost:27017/DataLife',options)
mongoose.connect(`mongodb://${dbConfig.user}:${dbConfig.passward}@127.0.0.1:27017/datalife`)

// mongoose.connect('mongodb://adminuser:123456@localhost:2017/mydb');