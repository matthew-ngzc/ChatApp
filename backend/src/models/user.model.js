import mongoose from "mongoose";

//takes in an object
const userSchema = new mongoose.Schema(
    //all the fields that we want to store in the database for users
    {
        email : {
            type : String,
            required : true,
            unique : true, //no two users can have the same email
            trim : true, //remove any whitespace from the start and end of the string
        },
        fullName : {
            type : String,
            required : true,
            trim : true, //remove any whitespace from the start and end of the string
        },
        password : {
            type : String,
            required : true,
            minLength : 6, //minimum length of the password
            trim : true, //remove any whitespace from the start and end of the string
        },
        profilePic : {
            type : String,
            default : "", //default value is empty string
        },
    },
    {timestamps : true} //automatically add createdAt and updatedAt fields to the schema
);

//create a model from the schema. User is the name of the model and userSchema is the schema we created above
const User = mongoose.model("User", userSchema);
//mongoose wants singular and capitalized name for the model. It will create a collection with the name users in the database. Mongoose will automatically create a collection with the name of the model in lowercase and pluralized form. So, User will create a collection named users in the database.

export default User; //export the model so that we can use it in other files