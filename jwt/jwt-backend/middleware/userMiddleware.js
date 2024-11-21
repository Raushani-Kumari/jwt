import User from "../models/UserModel";

export const findUser = () => {
    return async (req, res, next) => {
        const { user } = req;

        console.log("user to find...", user.userId)
        try {
            const userDatafromdb = await User.findById(user.userId);

            if (!userDatafromdb) {
                return res.status(404).json({ message: 'User not found' });
            }
            console.log("User data from database: ", userDatafromdb);
            return userDatafromdb;

        } catch (error) {
            console.log("error in fetching user data from db", error);
        }
        next();
    }

}

export const fetchCurrentUser = async (req, res) => {
    const { user } = req;
    console.log("user to find...", user.userId);
    try {
      const foundUser = await User.findById(user.userId);
  
      if (!foundUser) {
        return res.status(404).json({ message: "User not found" });
      }
      console.log("User data from database: ", foundUser);
      const { email, _id: userId,  username, role } = foundUser;
      return res.json({ user: { email, username, role, userId } });
    } catch (error) {
      console.log("error in fetching user data from db", error);
    }
  }