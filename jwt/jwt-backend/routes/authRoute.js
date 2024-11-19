import express from "express";
import {
  admin,
  fetchRefreshToken,
  login,
  seller,
  signup,
  user,
} from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import authorizedRoles from "../middleware/roleMiddleware.js";
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
router.get("/validate-token", authMiddleware, (req, res) => {
  const { userId, role } = req.user;
  return res.json({ message: "token validateddd", user: { userId, role } });
});
// user routes
router.get("/admin", authMiddleware, authorizedRoles("admin"), admin);
router.get("/seller", authMiddleware, authorizedRoles("seller"), seller);

export default router;
