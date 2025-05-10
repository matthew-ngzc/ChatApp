import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  getUsersForSidebar,
  getMessages,
  sendMessage,
} from "../controllers/message.controller.js";

const router = express.Router();

//need protectRoute for all methods because only authenticated users can use messaging functions
router.get("/users", protectRoute, getUsersForSidebar);
//:id is a dynamic value
//even if id = "users" it will still call the static endpoint. Static > dynamic endpoints priority
router.get("/:id", protectRoute, getMessages);

router.post("/send/:id", protectRoute, sendMessage);

export default router;
