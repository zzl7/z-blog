
const model = require('../models/blog');

let blog = {
    createBlog(req, res, next) {
        let params = req.body;
        params.date = new Date();
        model.blog.create([params], (err, results) => {
            if(err){
                res.json({
                    data: 'error'
                });
                return
            }
            res.json({
                data: 'success'
            });
            res.status(200);
            next();
        })
    },
    getBlog(req, res, next) {
        let params = req.body;
        console.log(112);
        model.blog.find({_id: params.id}, (err, results) => {
            res.json({
                data: results
            });
            res.status(200);
            next();
        })
    },
    getBlogs(req, res, next) {
        let params = req.body;
        model.blog.find((err, results) => {
            res.json({
                data: results
            });
            res.status(200);
            next();
        })
    }
}

module.exports = blog;