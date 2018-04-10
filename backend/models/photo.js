
const mongoose = require('../common/util').mongoose;

const Schema = mongoose.Schema;

const PhotoSchema = new Schema({
    title: String,
    minUrl: Array,
    url: Array,
    body: String,
    author: String,
    date: Date,
    comments: [{ body: String, date: Date, commentator:  String}],
}, { collection: 'photo' });

const photo = mongoose.model("photo", PhotoSchema);

module.exports = {
    photo
}