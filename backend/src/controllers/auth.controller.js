import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js"; //importing the User model from the user.model.js file
import bcrypt from "bcryptjs"; //for hashing the password
import cloudinary from "../lib/cloudinary.js"; //importing the cloudinary object from the cloudinary.js file

//takes in req and response as parameters
//send back a response to the client (browser) with a message
export const signup = async (req, res) => {
  const { fullName, email, password } = req.body; //destructuring the request body to get the email, fullName, password and profilePic fields
  try {
    //error handling : check if all fields are present in the request body
    if (!fullName || !email || !password) {
      //return a response with status code 400 and a message
      return res.status(400).json({ message: "Please fill all fields" });
    }
    //error handling : password must be at least 6 characters long
    if (password.length < 6) {
      //return a response with status code 400 and a message
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }
    //error handling : check if email is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //regex for validating email
    if (!emailRegex.test(email)) {
      //return a response with status code 400 and a message
      return res.status(400).json({ message: "Please enter a valid email" });
    }

    //check if user exists with this email
    //needs to be async to use await. Await ensures that they run in order, the later code cannot run before this code
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ message: "User already exists with this email" });
    }
    //go ahead and create a new user in the database
    //create salt
    const salt = await bcrypt.genSalt(10);
    //hash password using bcrypt
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      //generate JWT token
      generateToken(newUser._id, res);
      await newUser.save();

      //201 means something created
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      //something went wrong
      res.status(500).json({ message: "Invalid User Data" });
    }
  } catch (error) {
    console.log("Error in signup controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
    const { email, password } = req.body; //destructuring the request body to get the email and password fields
    try {
        const user = await User.findOne({email});
        //if email does not exist, return error message
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        //hash password entered to compare
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        //wrong password
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        //correct password -> generate JWT token
        generateToken(user._id, res);
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic,
        });
    } catch (error) {
        console.log("Error in login controller:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const logout = (req, res) => {
    //simply clear cookie from the browser
    try {
        //set cookie to empty string (2nd arg), maxAge to 0 to instantly expire it
        res.cookie("jwt", "", { maxAge:0});
        //send response back to client
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log("Error in logout controller:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

//already checked that user is logged in
//uses cloudinary for their service to upload images
export const updateProfile = async (req, res) => {
    //
    try {
        //destructuring the request body to get the profilePic field, cos they need to upload the pic for us to update it
        const {profilePic} = req.body; 
        //check which user it is
        const userId = req.user._id; //can just take like this cos already checked

        //no profile pic
        if (!profilePic) {
            return res.status(400).json({ message: "Please provide a profile picture" });
        }

        //upload image to cloudinary
        const uploadResponse = await cloudinary.uploader.upload(profilePic);

        //update profilepic in user in database
        const updatedUser = await User.findByIdAndUpdate(userId, {profilePic: uploadResponse.secure_url}, {new: true}); //new: true returns the updated user

        //send back the updated user
        res.status(200).json({updatedUser});

    } catch (error) {
        console.log("Error in update profile :", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const checkAuth = (req, res) => {
    try {
        res.status(200).json(req.user)
    } catch (error) {
        console.log("Error in checkAuth controller:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}