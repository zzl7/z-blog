const router = require('express').Router();
const bodyParser = require('body-parser');
const blogModel = require('../controller/user')

router.use(bodyParser.json());

router.post('/v1/blog', blogModel.createBlog);
router.get('/v1/blog/:id', blogModel.getBlog);

module.exports = {
    router
}