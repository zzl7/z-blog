const router = require('express').Router();
const bodyParser = require('body-parser');
const userModel = require('../controller/user')

router.use(bodyParser.json());

router.get('/v1/user', userModel.getUser);

module.exports = {
    router
}