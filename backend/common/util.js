
const mongoose = require('mongoose');//引用mongoose模块
const path = require('path');//引用mongoose模块
const fs = require('fs');

let configPath = path.join(__dirname, '..', 'config.json');
console.log('conddfig:', configPath)
let config = JSON.parse(fs.readFileSync(configPath));
console.log('config:', config)

// mongoose.connect('mongodb://127.0.0.1:27017'); //创建数据库连接
mongoose.connect('mongodb://'+ config.mongodb.url + ':' + config.mongodb.port + '/' + config.mongodb.dbName); //创建数据库连接
const db = mongoose.connection;

db.on("error", (err) => {
    console.log('连接数据库失败' + err);
});

db.once("open", (err) => {
    if (err) {
        console.log('打开数据库失败:', err);
    } else {
        console.log('打开数据库成功');
    }
});

module.exports = {
    db: db,
    mongoose: mongoose
}