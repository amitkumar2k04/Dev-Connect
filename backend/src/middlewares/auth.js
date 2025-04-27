const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  // Step1: Read the token from the req cookies
  try {
    const cookies = req.cookies;
        // finding the token from cookies
    const { token } = cookies;
    if (!token) {
      return res.status(401).send("Please Login!");
    }
    // Step2: validate the token
    const decdedObj = await jwt.verify(token, process.env.JWT_SECRET);
    const { _id } = decdedObj;
    // Step3: Find the user - (through token checks does the user exists in DB)
        // if ID is present - then find the user from DB
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User does't exist");
    } else {
        req.user = user; // whatever the user data, we got from DB - here we attached to req
      next(); // if token is valid and User is found, then call next() - to move to the next handler
    }
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
};

module.exports = {
  userAuth,
};

/*
 Note : What this userAuth do? => This userAuth checks wheather the cookies has token & that token is valid or not.
        And then it will findout the information about loggedIn user & It will get the loggedIn user information from DB.
        & finally it will call the next(). 
*/
