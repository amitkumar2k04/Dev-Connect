const express = require("express");
const { userAuth } = require("../middlewares/auth");
const connectionRequestModel = require("../models/connectionRequest");
const User = require("../models/user");
const userRouter = express.Router();

const USER_SAFE_DATA = "firstName lastName photoUrl age gender about skills";

// Get all the pending connection request received for loggedInUser
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  const loggedInUser = req.user;
  try {
    // making GET call from DB & get all the connection request of the loggedInUser
    const connectionRequest = await connectionRequestModel
      .find({
        toUserId: loggedInUser._id,
        status: "interested",
      })
      .populate("fromUserId", [
        "firstName",
        "lastName",
        "photoUrl",
        "age",
        "gender",
        "about",
        "skills",
      ]);
    res.json({
      message: "Data fetched successfully",
      data: connectionRequest,
    });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequests = await connectionRequestModel
      .find({
        $or: [
          { toUserId: loggedInUser._id, status: "accepted" },
          { fromUserId: loggedInUser._id, status: "accepted" },
        ],
      })
      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);
    //console.log( connectionRequests );

    // By this it will just give us the information about fromUserId
    const data = connectionRequests.map((row) => {
      if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return row.toUserId;
      }
      return row.fromUserId;
    });

    res.json({ data });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

/*
Amit => Abhishek  => Accepted
Abhishek => punam => Accepted

We have to check all the connection request where Abhiskek - Abhishek is toUser & Abhishek is fromUser 
But status should always be intrested 
*/

// creating feed API
userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const page = parseInt(req.query.page)    || 1;
    let limit = parseInt(req.query.limit)  || 10;
    limit = limit > 50 ? 50 : limit;
    
    const skip = ( page - 1 ) * limit;

    // CASE 1: finding out all the connection request [That we send & We received (Both)] - We doing bcz -> If I send & received request of somebody so, I should not see them on my feed.
    const connectionRequests = await connectionRequestModel
      .find({
        $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }], // finding all the connection request that either we send or received connection request
      })
      .select("fromUserId toUserId");

    const hideUsersFromFeed = new Set();
    connectionRequests.forEach((req) => {
      hideUsersFromFeed.add(req.fromUserId.toString());
      hideUsersFromFeed.add(req.toUserId.toString());
    });
    //console.log(hideUsersFromFeed);

    const users = await User.find({
      // Making DB call to find all the users whose ids is not present in <hideUsersFromFeed> array.
      $and: [
        { _id: { $nin: Array.from(hideUsersFromFeed) } },
        { _id: { $ne: loggedInUser._id } },
      ], // this fun </ Array.from(hideUsersFromFeed) /> is to convert the Set into Array
      // And we also don't want to visible my profile on feed - so bcz of that we write OR query - We write here whose ids is not equal to loggedIn UserId - i.e. </ $ne : loggedInUser._id />
    }).select(USER_SAFE_DATA).skip(skip).limit(limit);

    res.send(users);

    // User should see all the users card from DB but User can avoid certain cards
    // User should see all the users cards excepts :-
    //    1.  his own card
    //    2.  his connection (already friend of someones)
    //    3.  ignored people
    //    4.  already send the connection request
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = userRouter;
