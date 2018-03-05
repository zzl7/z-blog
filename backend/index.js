// import express from "express";
const express = require('express');
const app = express();
const mongoose = require('mongoose');//引用mongoose模块

mongoose.connect('mongodb://127.0.0.1:27017/test'); //创建一个数据库连接
const db = mongoose.connection;

let kittySchema = mongoose.Schema({
    name: String
});
// kittySchema.methods.speak = function () {
//     let greeting = this.name
//         ? "Meow name is " + this.name
//         : "I don't have a name";
//     console.log(greeting);
// }

// let Kitten = mongoose.model('Kitten', kittySchema);
// let silence = new Kitten({ name: 'Silence' });
// console.log(silence.name); // 'Silence'

db.on('error', console.error.bind(console, '连接错误:'));
db.once('open', function () {
    //一次打开记录
    console.log("连接数据库成功！");
    db.close();
});

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
})