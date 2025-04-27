const express = require('express');
const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validation");

const profileRouter = express.Router();

// get user profile 
profileRouter.get("/profile/view", userAuth, async(req, res) => {
    try{
        const user = req.user;

        res.send(user);
    }catch(err){
        res.status(400).send("Something went wrong!");
    }
});

// profile edit 
profileRouter.patch("/profile/edit", userAuth, async (req, res) => { 
    try{
        // validate profile edit data
        if(!validateEditProfileData(req)){
            throw new Error("Invalid Edit Request");
        }
        const loggedInUser = req.user;
        // console.log(loggedInUser);
        // edit loggedInUser
        Object.keys(req.body).forEach((keys) => loggedInUser[keys] = req.body[keys]);

        await loggedInUser.save();

        res.json({
            message : `${loggedInUser.firstName}, Your Profile Updated Successfully`,
            data : loggedInUser,
        });

    }catch(err){
        res.status(400).send("Something went wrong!");
    }
});

module.exports = profileRouter;