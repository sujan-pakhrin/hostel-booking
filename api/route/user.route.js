import express from "express";
import {
    changeNewPassword,
  changePassword,
  changeProfile,
  createUser,
  deleteUser,
  forgetPassword,
  getUser,
  getUsers,
  resendOTP,
  updateUser,
  verifyForgetOtp,
  verifyOtp,
} from "../controller/user.controller.js";
import upload from "../middleware/multerconfig.js";
const router = express.Router();

router.get("/user", getUsers);
router.get("/user/:id", getUser);
router.post("/user", createUser);
router.post("/user/resend-otp", resendOTP);
router.post("/user/verify-otp", verifyOtp);
router.post("/user/forget-password", forgetPassword);
router.post("/user/verify-forget-otp", verifyForgetOtp);
router.post("/user/change-password", changeNewPassword);
router.put("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);
router.put("/user/password/:id", changePassword);
router.put("/user/profile/:id", upload.single("profile"), changeProfile);

export default router;
