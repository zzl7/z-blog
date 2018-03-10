
const model = require('../models/blog');

let blog = {
    createBlog(req, res, next) {
        let params = req.body;
        params.date = new Date();
        model.blog.create([params], (err, results) => {
            if(err){
                res.status(400);
                res.json({
                    data: 'error'
                });
                return
            }
            res.status(200);
            res.json({
                data: 'success'
            });
            next();
        })
    },
    getBlog(req, res, next) {
        let params = req.params;
        model.blog.find({_id: params.id}, (err, results) => {
            res.status(200);
            res.json({
                data: results
            });
            next();
        })
    },
    getBlogs(req, res, next) {
        let params = req.body;
        model.blog.find().sort({'date':-1}).exec((err, results) => {
            res.status(200);
            res.json({
                data: results
            });
            next();
        })
    },
    getRecentBlog(req, res, next) {
        let params = req.body;
        model.blog.find().sort({'date':-1}).limit(5).exec((err, results)=>{
            res.status(200);
            res.json({
                data: results
            });
            next();
        })
    },
    deleteBlog(req, res, next) {
        let params = req.params;
        model.blog.remove({_id: params.id}, (err, results) => {
            if(err || results.n === 0){
                res.status(400);
                res.json({
                    data: '未找到改博客'
                });
                return
            }
            res.status(200);
            res.json({
                data: 'success'
            });
            next();
        })
    },
    commentBlog(req, res, next) {
        let body = req.body;
        let params = req.params;
        body.date = new Date();
        model.blog.update({_id: params.id}, {$addToSet: {comments:body}}, (err, results) => {
            res.status(200);
            res.json({
                data: results
            });
            next();
        })
    },
}

module.exports = blog;