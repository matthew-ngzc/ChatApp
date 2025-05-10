import User from "../models/user.model.js";
import Message from "../models/message.model.js";

export const getUsersForSidebar = async (req, res) => {
  //getting all ppl in sidebar that has had its contents cleared
  try {
    //get the logged in user id from the request
    const loggedInUserId = req.user._id;
    //get the users in contact, excluding the password
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");
    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error in getUsersForSidebar:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

//get messages between two users
export const getMessages = async (req, res) => {
  try {
    //take the id property from req.params, put into a new variable called userToChatId
    //equivalent to "const userToChatId = req.params.id;"
    const { id: userToChatId } = req.params;
    const myId = req.user._id;

    //find all messages where i am either sender or recipient
    const messages = await Message.find({
      //$or means either of the conditions
      $or: [
        //find messages where i am sender
        { senderId: myId, receiverId: userToChatId },
        //find messages where i am recipient
        { senderId: userToChatId, receiverId: myId },
      ],
    });

    res.status(200).json(messages);
  } catch (error) {
    console.error("Error in getMessages:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    //get text and image from the request body'
    const { text, image } = req.body;
    //get receiver id from the request params
    const { id: receiverId } = req.params;
    const senderId = req.user._id; //sender is authenticated user

    let imageURL;
    //image uploaded, upload to cloudinary
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageURL = uploadResponse.secure_url;
    }

    //create a new message
    const newMessage = await Message.create({
      senderId,
      receiverId,
      text,
      image: imageURL, //blank or actual value if uploaded
    });

    await newMessage.save();

    //TODO : realtime functionality from socket.io goes here

    //send response back to client
    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error in sendMessage:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
