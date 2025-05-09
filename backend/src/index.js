import express from "express"; //framework for building web applications in Node.js
import authRoutes from "./routes/auth.routes.js"; //importing the auth routes. Local file need the .js at the end because of "type : module"
import dotenv from "dotenv"; //for environment variables
import { connectDB } from "./lib/db.js"; //importing the connectDB function from the db.js file
import cookieParser from "cookie-parser"; //for parsing cookies

dotenv.config(); //load environment variables from .env file
const app = express();

//allow u to extract json data from body
app.use(express.json());
//allow cookie parsing
app.use(cookieParser());
//authentication routes
app.use("/api/auth", authRoutes);



const PORT = process.env.PORT;
// 5001-port for the server, can modify in .env
app.listen(PORT, () => {
  console.log("Server is running on PORT:" + PORT);
  connectDB(); //connect to the database
});
