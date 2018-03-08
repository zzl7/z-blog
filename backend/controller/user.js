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
    login(req, res, next){
        model.user.find((err, results) => {
            res.json({
                data: results
            });
            res.status(200);
            next();
        })
    }

}

module.exports = user;