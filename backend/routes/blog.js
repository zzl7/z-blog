const router = require('express').Router();
const bodyParser = require('body-parser');
const blogModel = require('../controller/user')

router.use(bodyParser.json());



module.exports = {
    router
}