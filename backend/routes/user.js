const router = require('express').Router();
const bodyParser = require('body-parser');
const userModel = require('../controller/user');
const blogModel = require('../controller/blog');
const photoModel = require('../controller/photo');
const multer = require('multer');

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    let fileFormat = (file.originalname).split(".");
    cb(null, Date.now() + '.' + fileFormat[fileFormat.length - 1])
  }
})
 
let upload = multer({ storage: storage })

router.use(bodyParser.json());

router.get('/v1/user', userModel.getUser);
router.post('/v1/user', userModel.createUser);
router.post('/v1/user/login', userModel.login);

router.post('/v1/blog', blogModel.createBlog);
router.get('/v1/blog/:id', blogModel.getBlog);
router.get('/v1/blogs/recent', blogModel.getRecentBlog);
router.get('/v1/blogs/favs', blogModel.getfavs);
router.put('/v1/blog/:id/comment', blogModel.commentBlog);
router.put('/v1/blog/:id/favs', blogModel.favs);
router.delete('/v1/blog/:id', blogModel.deleteBlog);
router.get('/v1/blogs', blogModel.getBlogs);

router.post('/v1/photo/upload',upload.single('file'), photoModel.uploadImg);

module.exports = {
    router
}