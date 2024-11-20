// verifying the token...if its correct or not
import jwt from "jsonwebtoken";
import "dotenv/config";

const tokenVerify = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({
      status: "fail",
      message: "Unauthorized!!!",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    // const user = jwt.decode(token)
    const { payload: user } = jwt.verify(token, process.env.JWT_SECRET_KEY, {
      complete: true,
    });
    console.log("decoded user", user);
    if (!user || !user.role) {
      return res.status(401).json({
        status: "fail",
        message: "Token is missing role or user data",
      });
    }

    req.user = user;
    console.log("userRole", req.user.role);
    // return req.user;
    next();
  } catch {
    return res.status(401).json({
      status: "fail",
      message: "Unauthorized!!!",
    });
  }
};

export default tokenVerify;