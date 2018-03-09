const router = require('express').Router();
const bodyParser = require('body-parser');
const userModel = require('../controller/user')
const blogModel = require('../controller/blog')

router.use(bodyParser.json());

router.get('/v1/user', userModel.getUser);
router.post('/v1/user', userModel.createUser);
router.post('/v1/user/login', userModel.login);

router.post('/v1/blog', blogModel.createBlog);
router.get('/v1/blog/:id', blogModel.getBlog);
router.get('/v1/blogs/recent', blogModel.getRecentBlog);
router.put('/v1/blog/:id/comment', blogModel.commentBlog);
router.delete('/v1/blog/:id', blogModel.deleteBlog);
router.get('/v1/blogs', blogModel.getBlogs);

module.exports = {
    router
}