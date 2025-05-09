import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

//next means if this one success, then call the "next" function
export const protectRoute = async (req, res, next) => {
    try {
        //check if have token from cookies
        const token = req.cookies.jwt; //.jwt cos cookie is called jwt
        if (!token) {
            return res.status(401).json({ message: "Unauthorized - No Token Provided" });
        }
        //extract user id from token
        const decoded = jwt.verify(token, process.env.JWT_SECRET); //verify the token using the secret key

        if (!decoded) {
            return res.status(401).json({ message: "Unauthorized - Invalid Token" });
        }
        //find user in the database using the id from the token
        const user = await User.findById(decoded.userId).select("-password"); //select -password to not return the password field

        //no user found with that id
        if (!user) {
            return res.status(401).json({ message: "Unauthorized - User Not Found" });
        }
        //gets here -> user found, token valid
        req.user = user;
        next();
    } catch (error) {
        console.log("Error in protectRoute middleware:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}