const express = require('express');
const cors = require('cors');
const indexRouter = require('./routers/index');
const diaryRouter = require('./routers/diary');
const userRouter = require('./routers/user');
const app = express();

app.use(cors());
app.use(express.json());
app.use('/', indexRouter);
app.use('/diary', diaryRouter);
app.use('/users', userRouter);
module.exports = app;