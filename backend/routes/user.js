const router = require('express').Router();
const bodyParser = require('body-parser');
const userModel = require('../controller/user')

router.use(bodyParser.json());

router.get('/v1/user', userModel.getUser);
router.post('/v1/user', userModel.createUser);
router.post('/v1/user/login', userModel.login);

module.exports = {
    router
}