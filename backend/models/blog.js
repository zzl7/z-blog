
const mongoose = require('../common/util').mongoose;

const Schema = mongoose.Schema;

const BlogSchema = new Schema({
    title: String,
    imgUrl: String,
    iconUrl: String,
    body: String,
    author: String,
    date: Date,
    comments: [{ body: String, date: Date, commentator:  String}],
    meta: {
        votes: Number,
        favs: Number
    }
}, { collection: 'blog' });
const blog = mongoose.model("blog", BlogSchema);

module.exports = {
    blog
}