// import express from "express";
const express = require('express');
const app = express();
const mongoose = require('mongoose');//引用mongoose模块

mongoose.connect('mongodb://127.0.0.1:27017/test11'); //创建一个数据库连接
const db = mongoose.connection;



db.on('error', console.error.bind(console, '连接错误:'));

db.once('open', function () {
    // 一次打开记录
    let kittySchema = mongoose.Schema({
        name: String
    });//定义Schema结构

    kittySchema.methods.speak = function () {
        let greeting = this.name
            ? "Meow name is " + this.name
            : "I don't have a name";
        console.log(greeting);
    }//自定义方法

    let Kitten = mongoose.model('Kitten', kittySchema);//实例化出文档对象document

    let silence = new Kitten({ name: 'Silence' });//实例化为文档
    let fluffy = new Kitten({ name: 'fluffy' });

    fluffy.save(function (err, fluffy) {
        if (err) return console.error(err);
        fluffy.speak();
    });//文档保存

    Kitten.find(function (err, kitten) {
        if (err) return console.error(err);
        console.log(kitten);
    })//查询
    
    Kitten.find({ name: /^fluff/ }, function(err, res){
        console.log('查询结果:' , res);
    });//查询

    console.log("连接数据库成功！");
});


app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
})