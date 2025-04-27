const mongoose = require("mongoose");
const User = require("./user");
// creating schema
const connectionRequest = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref : "User",   // refrence to the user collections 
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref : "User",   // refrence to the user collections 
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["ignored", "interested", "accepted", "rejected"],
        message: `{VALUE} is incorrect status type`,
      },
    },
  },
  {
    timestamps: true,
  }
);


// schema methods - It is like a middleware that is called everytime before the connection request will save.
connectionRequest.pre("save", function(next) {
  const connectionRequest = this;
//CHECK IF THE fromUserId is same as toUserId - doing validation before saving 
  if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
    throw new Error(" Cannot send connection request to yourself!!");
  }
  next();
});


// creating model
const connectionRequestModel = new mongoose.model(
  "ConectionRequest",
  connectionRequest
);

module.exports = connectionRequestModel;
