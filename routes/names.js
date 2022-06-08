const express = require("express");
const router = express.Router();

const users = [
  {
    name: "James",
    role: "Instructor",
  },
  {
    name: "Ginny",
    role: "TA",
  },
];

//http://localhost:4000/names/my-name
router.get("/my-name", (req, res, next) => {
  res.send("Sonny Lee Valenzuela");
});

//http://localhost:4000/names/user-name?firstname=Sonny
//http://localhost:4000/names/user-name?firstname=Sonny&lastname=Valenzuela
router.get("/user-name", (req, res, next) => {
  const firstName = req.query.firstName;
  const lastName = req.query.lastName;
  console.log("My Name: ", firstName);
  res.send(`The current user is: ${firstName} ${lastName}`);
});

//QUERY PARAMS USED FOR SORTING PARAMS OR SEARCHING
//http://localhost:4000/names/specific-user?usernumber=1
router.get("/specific-user", (req, res, next) => {
  console.log("REQ.QUERY: ", req.query);  
  const userNumber = req.query.usernumber;
  const foundUser = users[userNumber];
  console.log(foundUser);
  res.send(foundUser.name);
});

//ROUTE PARAMS - USED FOR WHEN ONE HAS A LIST
//http://localhost:4000/names/get-one/0
router.get("/get-one/:userNumber", (req, res) => {
  console.log("Req params: ", req.params);
  const userNumber = req.params.userNumber;
  const foundUser = users[userNumber];
  //JSON: Javascript Object Notation
  res.send(foundUser);
});

 

module.exports = router;
