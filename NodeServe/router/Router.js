const express = require("express");
const app = express();
// 2.引入路由
let thoughtRouter = require('./thought.js');
let affairRouter = require('./affair.js');
let userRouter = require('./user.js');
let iconRouter = require('./icon.js');
let emotionRouter = require('./emotion.js');
let affairRecordRouter = require('./affairRecord.js');


app.use(thoughtRouter);
app.use(affairRouter);
app.use(userRouter);
app.use(iconRouter);
app.use(affairRecordRouter);
app.use(emotionRouter);

module.exports = app;