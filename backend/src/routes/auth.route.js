//named with .route.js just to indicate that this is a route file
import {
  signup,
  login,
  logout,
  updateProfile,
  checkAuth,
} from "../controllers/auth.controller.js"; //importing the functions from the auth controller
import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js"; //importing the protectRoute middleware

//create router object (taken from express framework, used for routing stuff )
const router = express.Router();

//call this file when using signup or login
//POST methods as we are sending data to the server
router.post("/signup", signup);
router.post("/login", login);
//this functiion is called if "/api/auth/logout" is called
router.post("/logout", logout);

//updating profile
//protectRoute checks if logged in or not
router.put("/update-profile", protectRoute, updateProfile);

//check if user is authenticated or not. Call this everytime we refresh page
router.get("/check", protectRoute, checkAuth);

//so that other files can import router
export default router;
