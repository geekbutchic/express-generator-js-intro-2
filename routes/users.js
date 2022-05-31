const express = require("express");
const router = express.Router();

/* GET USERS LISTING */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

//http://localhost:4000/users/date/time
router.get("/date/time", (req, res, next) => {
  let date = new Date().toLocaleDateString("en-US");
  let time = new Date().toLocaleTimeString("en-US");
  res.send(`Date: ${date} Local Time: ${time}`);
});

//http://localhost:4000/users/get-name
router.get("/get-name", (req, res, next) => {
  res.send(`Sonny Lee Valenzuela`);
});

//http://localhost:4000/users//my-favorite-movies
router.get("/my-favorite-movies", (req, res, next) => {
  let movies = [
    "God Father", 
    "Lost Boys", 
    "Ferris Bueller's Day Off"
];
  res.json(movies);
});

module.exports = router;
