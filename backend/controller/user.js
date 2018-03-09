
const model = require('../models/user');

let user = {
    getUser(req, res, next) {
        model.user.find((err, results) => {
            res.json({
                data: results
            });
            res.status(200);
            next();
        })
    },
    createUser(req, res, next) {
        let params = req.body;
        model.user.create([params], (err, results) => {
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
    login(req, res, next) {
        let params = req.body;
        model.user.find({userName : params.userName, password: params.password}, (err, results) => {
            if(err){
                res.status(400);
                res.json({
                    data: 'error'
                });
                return
            }
            res.json({
                data: results
            });
            res.status(200);
            next();
        })
    }

}

module.exports = user;