import express from "express";
const router = express.Router();
import { register, login, updateUser } from "../controllers/userControllers.js";
import { protect } from "../middleware/authMiddleware.js";

router.route("/").post(register);
router.route("/login").post(login);
router.route("/profile").put(protect, updateUser);

export default router;
