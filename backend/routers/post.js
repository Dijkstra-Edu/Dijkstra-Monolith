//Create a Router
const router = require('express').Router()

const multer = require("../middleware/multer");
const {createPost, deletePost, updatePost, getPost, getFeaturedPosts, getPosts, searchPost, getRelatedPosts, uploadImage} = require("../controllers/post"); //CRUD
const { postValidator, validate } = require('../middleware/postValidator');
const { parseData } = require('../middleware/ParserForTagsFeatured');

//CRUD Operations 
//Create Route
router.post('/create',
 multer.single('thumbnail'),
 parseData,
 postValidator, 
 validate, 
 createPost);

 router.post('/upload-image', //For Image upload in Admin Dashboard
 multer.single('image'),
 uploadImage);

//Read Route(s)
router.get('/single/:slug', getPost); //Changed from /single/:postId to :slug
router.get('/featured-posts',getFeaturedPosts);
router.get('/posts', getPosts);
router.get('/search', searchPost);
router.get('/related-posts/:postId', getRelatedPosts);

//Update Route
router.put('/:postId',
 multer.single('thumbnail'),
 parseData,
 postValidator, 
 validate, 
 updatePost
 );

//Delete Route
router.delete('/:postId', deletePost)

module.exports = router;