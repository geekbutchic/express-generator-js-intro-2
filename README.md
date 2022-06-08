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

//=================== VIDEO LESSON 5-17-2020 EVENING ==========================
## LESSON HIGHLIGHTS rec.query | req.params

### Query Params
* USED FOR SEARCHING ?
* EXAMPLE : user-name?[key:value]
* req.query 
* COMES IN AS A KEY VALUE PAIR 
* KEY CAN BE NAMED - WHATEVER
* MANY QUERY PARAMETERS CAN BE ADDED 
* http://localhost:4000/names/user-name?firstname=Sonny&lastname=Valenzuela
* THE USE OF & ALLOWS FOR ADDITIONAL QUERY PARAMETERS

```js script
//QUERY PARAMS USED FOR SORTING PARAMS OR SEARCHING
//http://localhost:4000/names/specific-user?usernumber=1
router.get("/specific-user", (req, res, next) => {
  const userNumber = req.query.usernumber;
  //NO CAMEL CASE FOR REQ.QUERY
  const foundUser = users[userNumber];
  console.log(foundUser);
  res.send(foundUser.name);
});
```
> REQ.QUERY:  { usernumber: '1' }

### ROUTE.PARAMS
* USED FOR LISTS
* http://localhost:4000/names/get-one/0
* get-one/0
* /: = WILL BE ASSIGNED TO A VARIABLE

```js script
//ROUTE PARAMS - USED FOR WHEN ONE HAS A LIST
//http://localhost:4000/names/get-one/0
router.get("/get-one/:userNumber", (req, res) => {
  const userNumber = req.params.userNumber;
  const foundUser = users[userNumber];
  //JSON: Javascript Object Notation
  res.send(foundUser.name);
});
```
> Req params:  { userNumber: '1' }


PROBLEM 3) Create a new GET route /users/myname in the users.js routes file. The route should return your name to the browser.
> http://localhost:4000/users/get-name

```js script
router.get("/get-name", (req, res, next) => {
  res.send(`Sonny Lee Valenzuela`);
});
GET NAME FUNCTION
```
> http://localhost:4000/names/user-name?firstname=Sonny&lastname=Valenzuela
```js script
router.get("/user-name", (req, res, next) => {
  const firstName = req.query.firstname;
  const lastName = req.query.lastname;
  console.log("My Name: ", firstName);
  res.send(`The current user is: ${firstName} ${lastName}`);
});
GET NAME FUNCTION THROUGH req.query
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


PROBLEM 6) Create and update GET routes nested under /blogs. /blogs/:blogId should return only a single blog post that matches the id field of the blog post to the blogId route param.

> http://localhost:4000/blogs/query/5
* IN THIS EXAMPLE TO ACQUIRE THE QUERY PARAMETER WE USE REQ.PARAMS.


```js script
// HELPER FUNCTION - TO FIND BLOG-ID
const findBlogId = function (blogId) {
  const foundBlog = blogPosts.find((element) => element.id === blogId);
  return foundBlog;
};

router.get("/query/:blog-number", (req, res, next) => {
  const blogId = req.params.blogId;
  res.json(findBlogId(blogId));
});
```

// ======================= VIDEO 5-18-2021 ==================================
* VIDEO 5-18-2022 MORNING
* SORT FUNCTION

PROBLEM 7)  Add query param handling to the /blogs/all route. The ?sort param should behave as follows: if ?sort=desc, the blog posts should be sorted by descending order based upon createdAt date; if ?sort=asc, the blog posts should be sorted by ascending order instead. Hint 1: Use the .sort() method to sort the blogs. Hint 2: Strings can be converted back into date objects for sorting like so: new Date("2022-03-22T10:36:37.176Z").

```js script
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
      const aCreatedAt = new Date(a.createdAt)
      const bCreatedAt = new Date(b.createdAt) 

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
    })
// RETURNS ID 
// res.json(blogPosts.map((el)=>{return el.id}));
// RETURNS BLOGS 
    res.json(blogPosts)
});
```

//============================== POST BLOGS =============================
* `VIDEO 5-18-2022 EVENING`
* POST REQUEST
* REQ.BODY
* CREATE A NEW OBJECT AND USE .PUSH() METHOD

### LESSON PORTION REQ.BODY
* console.log("Post Body: ", req.body)
* Payload being sent with HTTP request - Plain Text


PROBLEM 1)  Create a new file in /views called postBlog.ejs, copy and paste the provided code into it. Note that jquery is imported, there are user input fields and a button that sends a POST request.


PROBLEM 2) Create a GET new route /blogs/postblog and use the res.render() method to display this page to the browser.

> http://localhost:4000/blogs/postblog

* RENDERS STARTER CODE ON PAGE

```js script
//RENDERS INFO FROM POST BLOG EJS FILE 
router.get("/postblog", (req, res, next) => {
  console.log("Post Body: ", req.body);
  res.render("postBlog");
});
```

PROBLEM 3) Create a new POST route /blogs/submit, it should receive the new blog post information from the browser and add it to the array of blogs in sampleBlogs.js. Note that the createdAt and the id are NOT provided from the front end. You will have to create those two fields yourself server-side and add them to the incoming blog post data before adding it to the blogPosts array. Don't forget to send an "OK" response to the browser after the save!

```js script
router.post("/submit", (req, res, next) => {
  console.log("Post Body: ", req.body);
  console.log("Blog List Before: ", blogPosts);
  const today = new Date();
  const newPost = {
    title: req.body.title,
    text: req.body.text,
    author: req.body.author,
    createdAt: today.toISOString(),
    id: String(blogPosts.length + 1),
  };
  blogPosts.push(newPost);
  console.log("Blog List After: ", blogPosts);
  res.send("OK");
});
```

PROBLEM 4) Test your new route by adding a blog post via the browser and then retrieving the blog posts. /blogs/all should still work by returning all the posts, and the ?sort param should still work. /blogs/:blogId should be able to retrieve the new blog post by itself by passing in 6 as the blogId.

* ALL TESTS PASS

// ============================== DISPLAY BLOGS ================================
* VIDEO 5-19-2022 MORNING VIDEO NO INFORMATION 
* VIDEO 5-19-2022 EVENING VIDEO
* POST REQUEST - MAKING SOMETHING NEW
* PUT REQUEST - EDIT 


* Build out your blog site by adding the following features.

* Create a new file in /views called displayBlogs.ejs, copy and paste the provided code into it.

CODED PASTED INTO NEW EJS FILE

* Create a new GET route /blogs/displayBlogs that will render the displayBlogs page to the browser. Test that the basic functionality of the page is working by clicking the Get Blogs button, your various blog titles should appear in a list. Test that your postBlog page is still working by adding a new blog then go back to displayBlogs and click Get Blogs again. Your new blog title should appear on the page.

CHECK EJS FILE BLOGS ARE DISPLAYED

* Build out the displayBlogs page functionality by displaying the blog text and author to the page along with the title.

BLOGS ARE DISPLAYED CHECK EJS FILE

* Implement the ability for the user to sort blogs by ascending and descending. Hint: the easiest way to do this is to add two new <a> tags to the page which redirect the user to "http://localhost:4000/blogs/all?sort=asc" and "http://localhost:4000/blogs/all?sort=desc". 

CHECK EJS FILE FOR SOLUTION - APPENDS "?sort=asc" OR "?sort=desc"

* Stretch Goal: Instead of the two <a> tag redirects, add a dropdown that has two options "asc" and "desc". Implement jQuery functionality to modify the $.get "http://localhost:4000/blogs/all" url to send through the user selected sort order as query params when the user clicks the "Get Blogs" button.

//CRUD APP
* CREATE - POST
* READ - GET
* UPDATE - PUT 
* DELETE - DELETE 

### ======================= UPDATE FUNCTION ================================
* VIDEO 5-19-2022 EVENING 
* VIDEO 5-23-2022 MORNING - SOLUTION 

* UPDATE FUNCTION 

* Create a new file in /views called displaySingleBlog.ejs, copy and paste the provided code into it.

FILE CREATED - CODE PASTED 

* Create a new GET route /blogs/displaysingleblog that will render the displaySingleBlog.ejs page to the browser. Test that the page and /blogs/singleblog/:blogId route works by entering a blogId into the input field and clicking "Get Single Blog".

> http://localhost:4000/blogs/displaysingleblog

```js script
router.get("/singleblog/:blogId", (req, res, next) => {
  const blogId = req.params.blogId;
  res.json(findBlogId(blogId));
});
```

* Implement the delete single blog functionality. Hint: you will have to create a new route in the blogs.js file to handle the delete. The route should use a ROUTE PARAM to specify which blog to delete. I.E. /blogs/deleteblog/:blogId.

```js script

```

* Stretch Goal: Implement the PUT route for modifying a single blog. It will be a new route in blogs.js. You can copy much of the html and functionality from postBlog.ejs into displaySingleBlog.ejs. Except now when you make the PUT request, you'll have to send through the blogId you want to modify as a route param (similar to the DELETE route you just created), get the values from the input fields using jQuery, and send those through with the PUT request to update the specified blog.