import express from "express";
import bcrypt from "bcryptjs";
import {
  fetchRefreshToken,
  login,
  signup,
} from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import authorizedRoles from "../middleware/roleMiddleware.js";
import User from "../models/UserModel.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", signup);
router.post("/refresh-token", fetchRefreshToken);
router.get("/home", authMiddleware, (req, res) => {
  return res.json({
    message:
      "You have an access to protected Route. Thank you for logging in...",
  });
});
router.get("/me", authMiddleware, async (req, res) => {
  const { user } = req;
  try {
    const foundUser = await User.findById(user.userId);

    if (!foundUser) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log("User data from database: ", foundUser);
    const { email, _id: userId, username, role } = foundUser;
    return res.json({ user: { email, username, role, userId } });
  } catch (error) {
    console.log("error in fetching user data from db", error);
  }
});
router.get("/validate-token", authMiddleware, (req, res) => {
  const { userId, role } = req.user;
  return res.json({ message: "token validateddd", user: { userId, role } });
});

router.post("/update-user", async (req, res) => {
  console.log("user details for profile update", req.body)
  const { id, username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const UpdatedUser = await User.updateOne({ _id: id }, {
      $set: {
        username: username,
        password: hashedPassword
      }
    });
    if (UpdatedUser.modifiedCount === 0) {
      return res.status(400).json({ data: "No changes made or user not found" });
    }
    console.log("user updated");
    return res.status(200).json({ id, username })
  } catch (error) {
    console.log("error", error)
    return res.json({ data: "error in updating in db" })
  }
})



export default router;
