
const model = require('../models/photo');

let photo = {
    uploadImg(req, res, next) {
        let params = req.file;
        // params.date = new Date();
        console.log(params)
        res.json({
            data: { status: 'success', path: params.path.replace(/\\/g, '/').replace('public', '') }
        });
        // model.blog.create([params], (err, results) => {
        //     if (err) {
        //         res.status(400);
        //         res.json({
        //             data: 'error'
        //         });
        //         return
        //     }
        //     res.status(200);
        //     res.json({
        //         data: 'success'
        //     });
        //     next();
        // })
    },
    photo(req, res, next) {
        let params = req.body
        params.date = new Date();
        console.log(params)
        model.photo.create([params], (err, results) => {
            if (err) {
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
    getPhoto(req, res, next){
        model.photo.find((err, results) => {
            res.json({
                data: results
            });
            res.status(200);
            next();
        })
    },
    getPhotoDetail(req, res, next){
        let params = req.params;
        model.photo.find({ _id: params.id }, (err, results) => {
            res.status(200);
            res.json({
                data: results
            });
            next();
        })
    }
}

module.exports = photo;