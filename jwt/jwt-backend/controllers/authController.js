import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";
import "dotenv/config";

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ error: "Authentication Failed: User not found." });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Incorrect Password..." });
    }
    const payload = {
      userId: user._id,
      role: user.role,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: "2m",
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });

    let refreshTokens = [refreshToken];

    const tokenExpiry = 2 * 60 * 1000;
    const refreshTokenExpiry = 86400 * 1000;

    return res.status(200).json({
      token,
      message: "Logged In...",
      refreshToken,
      tokenExpiry,
      refreshTokenExpiry,
      user,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Login failed..." });
  }
};

const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists..." });
    }

    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    return res.status(201).json({
      message: "User Registered Successfully...",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Registration Failed..." });
  }
};

const fetchRefreshToken = async (req, res) => {
  const { refreshToken } = req.body;
  console.log("refreshToken", refreshToken);

  if (!refreshToken) {
    return res.status(403).json({ error: "Refresh token required" });
  }

  try {
    console.log("try block");
    const { payload: user } = jwt.verify(refreshToken, process.env.JWT_SECRET_KEY, {
      complete: true,
    });
    const payload = {
      userId: user.userId,
      role: user.role,
    };
    // Create new access and refresh tokens
    const newToken = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });
    const newRefreshToken = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });
    console.log("newrefreshtoken generated");

    // Send the new tokens back in the response
    return res.status(200).json({
      token: newToken,
      refreshToken: newRefreshToken,
      tokenExpiry: Date.now() + 2 * 60 * 1000,
      refreshTokenExpiry: Date.now() + 86400 * 1000,
    });
  } catch (error) {
    return res.status(403).json({ error: "Invalid refresh token" });
  }
};

const user = (req, res) => {
  res.send("hello user !!");
};

const admin = (req, res) => {
  res.send("hello admin !!");
};
const seller = (req, res) => {
  res.send("hello seller !!");
};

export { login, signup, fetchRefreshToken, user, admin, seller };
