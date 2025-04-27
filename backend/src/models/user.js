const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 50,
    },
    lastName: {
      type: String,
      maxLength: 50,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if(!validator.isEmail(value)){
            throw new Error("Invalid email addrerss: " + value);
        }
      }
    },
    password: {
      type: String,
      required: true,
      validator(value){
        if(validator.isStrongPassword(value)){
            throw new Error("Enter a strong password: " + value);
        }
      },
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      validate(value) {
        // adding custom validator checks
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender data is not valid");
        }
      },
    },
    isPremium : {
      type : Boolean,
      default : false,
    },
    memberShipType: {   // Gold or Silver
      type : String,
    },
    photoUrl: {
        type: String,
        default: "https://static.vecteezy.com/system/resources/previews/023/465/800/non_2x/remove-contact-dark-mode-glyph-ui-icon-delete-unwanted-user-address-book-user-interface-design-white-silhouette-symbol-on-black-space-solid-pictogram-for-web-mobile-isolated-illustration-vector.jpg",
        validate(value) {
            if(!validator.isURL(value)){
                throw new Error("Invalid photo URL: " + value);
            }
          }
    },
    about: {
      type: String,
      default: "This is a default about the user!.",
    },
    skills: {
      type: [String],
      validate(value) {
        if (value.length > 20) {
          // Ensures a maximum of 20 skills
          throw new Error("You cannot have more than 20 skills.");
        }
      },
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.getJWT = async function () {
    const user = this;
    const token = await jwt.sign({_id : user._id}, "DEV@Tinder$790", { 
        expiresIn: '8h',
    });
    return token;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
