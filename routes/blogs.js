const express = require("express");
const router = express.Router();
const blogs = require("../public/javascripts/sampleBlogs")
const blogPosts = blogs.blogPosts;

//http://localhost:4000/blogs/all-blogs
router.get("/all-blogs", (req, res, next) => {
  res.json(blogPosts);
  //RETURNS ALL BLOGS IN JSON FORMAT
});

//URL = blogs/sorted?sort=asc === 3, 4, 1, 5, 2
//URL = blogs/sorted?sort=desc === 2, 5, 1, 4, 3
router.get("/sorted", (req, res, next) => {
    
})





module.exports = router;
