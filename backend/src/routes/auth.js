const express = require('express');
const authRouter = express.Router();
const User = require("../models/user");
const {validateSignUpData} = require("../utils/validation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// creating signup API
authRouter.post("/signup",async(req, res) => {
    // console.log(req.body);
    // Step 1 : validate your data 
    try{
        validateSignUpData(req);
       // console.log(req.body);
    } catch (err){
        res.status(400).send("Error : " + err.message);
    }
    // step 2 : Encrypt the password
    const {firstName, lastName, emailId, password} = req.body; // extracting the data out
    const passwordHash = await bcrypt.hash(password, 10);
    // console.log(passwordHash);
    // Step 3: Store the data in DB - creating new instance of User model (i.e we're creating a new user with these data)
    const user = new User({
        firstName, 
        lastName, 
        emailId,
        password : passwordHash,
    });

    try{
        // saving data to DB
        const savedUser = await user.save();

        const token = await jwt.sign({_id : savedUser._id}, process.env.JWT_SECRET, { 
            expiresIn: '8h',
        });
        res.cookie("token", token, {
            expires: new Date(Date.now() + 8 * 3600000)
        });
        
        res.json({message : "User added successfully!", data : savedUser});
    } catch(err){
        res.status(400).send("Error saving the user:" + err.message);
    }
});

// Creating Login API
authRouter.post("/login", async (req, res) => {
    try{
        const {emailId, password} = req.body;

        const user = await User.findOne({emailId : emailId});
        if(!user){
            throw new Error("Invalid credentials");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(isPasswordValid) {
            // ===========================================
            // Create a JWT token 
            const token = await jwt.sign({_id : user._id}, process.env.JWT_SECRET, { 
                    expiresIn: '8h',
                });
            //console.log(token);
            // Add the token to cookie and send the response back to the user
            res.cookie("token", token, {
                expires: new Date(Date.now() + 8 * 3600000) // cookie will be removed after 8 hours
            });
            // ===========================================
            res.send(user);
        } else {
            throw new Error("Invalid credentials");
        }

    } catch(err){
        res.status(400).send("Error:" + err.message);
    }
});


// creating Loggout API
authRouter.post("/logout", (req, res) => {
    res.cookie("token", null, {
        expires : new Date(Date.now()),
    });
    res.send("Logout successful!");
});

module.exports = authRouter;