import User from "../models/UserModel";
//  const findUser = async (req, res, next) => {
//     const {user} = req;

//     console.log("user to find...", user.userId)
//     try{
//         const userDatafromdb = await User.findById(user.userId);

//       if (!userDatafromdb) {
//         return res.status(404).json({ message: 'User not found' });
//       }
//       console.log("User data from database: ", userDatafromdb);
//       return userDatafromdb;

//     }catch(error){
//         console.log("error in fetching user data from db", error);
//     }
//     next();
// }


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
// export default findUser;