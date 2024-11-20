import express from "express";
import {
  fetchRefreshToken,
  login,
  signup,
} from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import authorizedRoles from "../middleware/roleMiddleware.js";
import User from "../models/UserModel.js";
// import { findUser } from "../middleware/userMiddleware.js";

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
router.get('/fetch-data', authMiddleware, async (req, res) => {
    const { user } = req;
    console.log("user to find...", user.userId)
    try {
        const userDatafromdb = await User.findById(user.userId);

        if (!userDatafromdb) {
            return res.status(404).json({ message: 'User not found' });
        }
        console.log("User data from database: ", userDatafromdb);
        const userFound = {
          email: userDatafromdb.email,
          username: userDatafromdb.username
        }
        return res.json({message: "user found" ,userFound});

    } catch (error) {
        console.log("error in fetching user data from db", error);
    }
    // console.log("fetched user and returned it")
})
router.get("/validate-token", authMiddleware, (req, res) => {
  const { userId, role } = req.user;
  console.log("req.user from uservalidate", req.user)
  return res.json({ message: "token validateddd", user: { userId, role } });
});


export default router;
