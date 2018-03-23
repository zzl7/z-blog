
const model = require('../models/photo');

let photo = {
    uploadImg(req, res, next) {
        let params = req.file;
        // params.date = new Date();
        console.log(params)
        res.json({
            data: {status: 'success', path: params.path.replace(/\\/g, '/')}
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
}

module.exports = photo;