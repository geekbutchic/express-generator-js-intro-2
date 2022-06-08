const express = require("express");
const router = express.Router();
const { blogPosts } = require("../public/javascripts/sampleBlogs");
// const blogPosts = blogs.blogPosts;

//================= ALL BLOGS ==============================
//================= SORT BLOGS =============================

//http://localhost:4000/blogs/all-blogs
//URL = http://localhost:4000/blogs/all?sort=asc === 3, 4, 1, 5, 2
//URL = http://localhost:4000/blogs/all?sort=desc === 2, 5, 1, 4, 3
router.get("/all", function (req, res, next) {
  const sortOrder = req.query.sort;
  blogPosts.sort((a, b) => {
    // Compares by string
    // const aCreatedAt = a.createdAt
    // const bCreatedAt = b.createdAt

    // Compare by date object for extra utility
    const aCreatedAt = new Date(a.createdAt);
    const bCreatedAt = new Date(b.createdAt);

    if (sortOrder === "asc") {
      if (aCreatedAt < bCreatedAt) {
        return -1;
      }
      if (aCreatedAt > bCreatedAt) {
        return 1;
      }
    }
    if (sortOrder === "desc") {
      if (aCreatedAt > bCreatedAt) {
        return -1;
      }
      if (aCreatedAt < bCreatedAt) {
        return 1;
      }
    }
    return 0;
  });
  // RETURNS ID
  // res.json(blogPosts.map((el)=>{return el.id}));
  // RETURNS BLOGS
  res.json(blogPosts);
});

//================== BLOG ID SEARCH =============================

// URL = http://localhost:4000/blogs/single-blog/1
//ROUTE PARAMS FOR GRABBING ONE ITEM
router.get("/single-blog/:blogId", (req, res, next) => {
  console.log(req.params);
  const blogId = req.params.blogId;
  res.json(findBlogId(blogId));
  // RETURNS ONE BLOG BY ID
});

// HELPER FUNCTION - TO FIND BLOG-ID
const findBlogId = (blogId) => {
  const foundBlog = blogPosts.find((element) => element.id === blogId);
  console.log("Parameter: ", blogId);
  return foundBlog;
};

//===================== POST REQUEST ==============================

//RENDERS INFO FROM POST BLOG EJS FILE
// URL = http://localhost:4000/blogs/postblog
router.get("/postblog", (req, res, next) => {
  console.log("Post Body: ", req.body);
  res.render("postBlog");
});

// URL = http://localhost:4000/blogs/postblog + click SUBMIT
router.post("/submit", (req, res, next) => {
  console.log("Post Body: ", req.body);
  console.log("Blog List Before: ", blogPosts);
  let date = new Date().toLocaleDateString("en-US");
  let time = new Date().toLocaleTimeString("en-US");
  // const today = new Date()
  const newPost = {
    title: req.body.title,
    text: req.body.text,
    author: req.body.author,
    createdAt: `${date} - ${time}`,
    // createdAt: today.toISOString(),
    id: String(blogPosts.length + 1),
  };
  blogPosts.push(newPost);
  console.log("Blog List After: ", blogPosts);
  res.send("OK");
});

// URL = http://localhost:4000/blogs/displayblogs
router.get("/displayblogs", (req, res, next) => {
  console.log("Display Blogs: ", req.body);
  res.render("displayBlogs");
});

// URL = http://localhost:4000/blogs/displaysingleblog
router.get("/displaysingleblog", (req, res, next) => {
  res.render(`displaysingleblog`);
  //DISPLAYS CHOSEN BLOG
});

// URL = http://localhost:4000/blogs/displaysingleblog + ID + SUBMIT
router.get("/singleblog/:blogId", (req, res, next) => {
  const blogId = req.params.blogId;
  res.json(findBlogId(blogId));
});

// URL =
router.put("/update-blog/:blogId", (req, res, next) => {
  const blogId = req.params.blogId
  const title =  req.body.title
  const text  =  req.body.text
  const author  =  req.body.author
  
  const updatedPost = {
    title,
    text,
    author,
  }
  const updatedBlogPosts = generateUpdatedPosts(blogPosts, blogId, updatedPost)
  setBlogPosts(updatedBlogPosts)
  res.send("OK")
});

const generateUpdatedPosts = (blogList, blogIdToUpdate, updatedBlog) => {
  return blogList.map((blog) => {
    if (blog.id = blogIdToUpdate) {
      const newBlogData = {
        id: blog.id,
        createdAt: blog.createdAt,
        title: updatedBlog.title,
        text: updatedBlog.text,
        author: updatedBlog.author
      }
      return newBlogData
    }
    return blog
  })
}

//======================== FOR DELETE BLOG POSTS ==========================

const generateFilteredBlogs = (blogList, blogId) => {
  return blogList.filter((blog) => blog.id !== String(blogId));
};

const setBlogPosts = (blogList) => {
  blogPosts = blogList;
};


router.delete("/delete-blog/:blogId", (req, res, next) => {
  const filteredPosts = generateFilteredBlogs(blogPosts, req.params.blogId);
  console.log("Blog Posts After: ", blogPosts);
  console.log("FILTERED POSTS: ", filteredPosts);
  setBlogPosts(filteredPosts);
  console.log("Blog Posts After: ", blogPosts);
  res.send("DELETED BLOG");
});

module.exports = router;
