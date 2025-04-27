const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const connectionRequestModel = require("../models/connectionRequest");
const User = require("../models/user");
const  sendEmail  = require("../utils/sendEmail");
 
// sending connection request
requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      // Adding allowed connection request - validation
      const allowedStatus = ["ignored", "interested"];
      if (!allowedStatus.includes(status)) {
        return res
          .status(404)
          .send({ message: "Invalid status type : " + status });
      }

      // Handling if user not present on DB - then for the random userId connection request should not made.
      const toUser = await User.findById(toUserId); // finding the existing user
      if (!toUser) {
        return res.status(404).json({ message: "User not found" });
      }

      // If there is an existing Connection request [pending from [A to B || B to A]- then not allowed to send connection request once again
      const existingConnectionRequest = await connectionRequestModel.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });
      if (existingConnectionRequest) {
        // if any existing request is present
        return res
          .status(400)
          .send({ message: "Connection request already exists!!" });
      }

      // creating new instance of connectionRequestModel
      const connectionRequest = new connectionRequestModel({
        fromUserId,
        toUserId,
        status,
      });
      const data = await connectionRequest.save();


      // const emailRes = await sendEmail.run(
      //   "A new friend request from " + req.user.firstName, 
      //   req.user.firstName + " is " + status + " in " + toUser.firstName,
      // );
      // console.log(emailRes);


      res.json({
        message:
          req.user.firstName + " is " + status + " in " + toUser.firstName,
        data,
      });
    } catch (err) {
      res.status(400).send("ERROR :" + err.message);
    }
  }
);

// Creating API for request review
requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try{
        const loggedInUser = req.user;
        const { status, requestId } = req.params;

        // Step1 : validating the status 
        const allowedStatus = ["accepted", "rejected"];
        // console.log(allowedStatus);
        if (!allowedStatus.includes(status)) {
            return res.status(400).send({message: "status is not allowed"})
        }

        // step 2: checking that weather the requestId is present in DB or not
        // Finding  the connection request with these 3 parameters 
        const connectionRequest = await connectionRequestModel.findOne({
            _id : requestId,              // requestId should be valid 
            toUserId : loggedInUser._id,  // this line make sure that: user2 is accepting the connection request 
            status : "interested",        // e.g: if status is already is in accepted state: and user try to accept it again - so, there will no any request found 
        });
        if(!connectionRequest){
            return res.status(404).json({message : "Connection request not found!!"});
        }
        // if i find the connection request after these all 3 parameters are correctly passed - then I'm safe to change the status 
        connectionRequest.status = status;
        const data = await connectionRequest.save();   // this will give me modified connection request data back 
        res.json({message : "Connection requested " + status, data});

/*
Amit -> Ketan 
loggedInUser -> toUserId
status -> intrested
requestId should be valid 
*/


    }catch(err){
        res.status(400).send("ERROR" + err.message);
    }
  }
);

module.exports = requestRouter;
