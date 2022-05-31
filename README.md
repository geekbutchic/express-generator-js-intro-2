# EXPRESS-GENERATOR-JS-INTRO-2
### VIDEO LESSON 5-17-2020 MORNING 

## TERMINAL SETUP
> npx express-generator -e
* PREFERRED METHOD 
> npm i --save-dev nodemon

> npm i
* INSTALLS DEPENDENCIES

## SCRIPTS SETUP
> "start": "node ./bin/www",
* npm start

> "dev": "nodemon ./bin/www",
* npm run dev

PROBLEM 1) Change the start command to do PORT=4000 before node bin/www.
> "dev": "PORT=4000 nodemon ./bin/www"
> npm run dev
* PORT HAS NO BEEN CHANGED ONCE THE TERMINAL COMMAND IS INSERTED.

PROBLEM 2) Create a new GET route /datetime that will send the current date and time as a string to the browser. Hint: The method new Date() will create a new date object that has methods for retrieving the current date and time as strings.
> http://localhost:4000/users/date/time
* URL NEEDED TO RENDER DATE

```js script
router.get("/date/time", (req, res, next) => {
  let date = new Date().toLocaleDateString("en-US");
  let time = new Date().toLocaleTimeString("en-US");
  res.send(`Date: ${date} Local Time: ${time}`);
});
DATE / TIME GET FUNCTION
```

PROBLEM 3) Create a new GET route /users/myname in the users.js routes file. The route should return your name to the browser.
> http://localhost:4000/users/get-name

```js script
router.get("/get-name", (req, res, next) => {
  res.send(`Sonny Lee Valenzuela`);
});
GET NAME FUNCTION
```

PROBLEM 4) Create a new GET route /users/myfavoritemovies in the users.js routes file. The route should return your three favorite movies in an array to the browser. Hint: You may need to use res.json() instead of res.send().
> http://localhost:4000/users/my-favorite-movies

```js script
router.get("/my-favorite-movies", (req, res, next) => {
  let movies = [
    "God Father", 
    "Lost Boys", 
    "Ferris Bueller's Day Off"
  ];
  res.json(movies);
});
RETURNS FAVORITE MOVIES IN AN ARRAY
```

//========================= VIDEO LESSON 5-17-2020 ==========================

## BLOG ROUTES

PROBLEM 5) Create a new base route called /blogs. Copy the sampleBlogs.js file into your project and use require to import blogPosts into your file. Create a new GET route /blogs/all that returns an array of all the blog posts to the browser.

```js script 
//CHANGES IN APP.JS
const blogsRouter = require("./routes/blogs");
app.use("/blogs", blogsRouter);
```

* CREATES NEW ROUTE IN APP.JS

//http://localhost:4000/blogs/blogs
```js script
const express = require("express");
const router = express.Router();
//TEMPLATE CODE FOR EXPRESS

const blogs = require("../public/javascripts/sampleBlogs")
const blogPosts = blogs.blogPosts;
//REQUIRE IN BLOG-POSTS 

//http://localhost:4000/blogs/all
router.get("/all-blogs", (req, res, next) => {
  res.json(blogPosts);
  //RETURNS ALL BLOGS IN JSON FORMAT
});

module.exports = router;
```


PROBLEM 6) Create and update GET routes nested under /blogs. /blogs/:blogId should return only a single blog post that matches the id field of the blog post to the blogId route param. Add query param handling to the /blogs/all route. The ?sort param should behave as follows: if ?sort=desc, the blog posts should be sorted by descending order based upon createdAt date; if ?sort=asc, the blog posts should be sorted by ascending order instead. Hint 1: Use the .sort() method to sort the blogs. Hint 2: Strings can be converted back into date objects for sorting like so: new Date("2022-03-22T10:36:37.176Z").