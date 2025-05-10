import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        senderId: {
            type: mongoose.Schema.Types.ObjectId, //the id is that of a user, since it is a reference to a user (a sender is a user)
            ref: "User", //reference to user model
            required: true, 
        },
        receiverId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        text: {
            type: String, //text not always required, can be just an image
        },
        image: {
            type: String, //image not always required, can be just a text
        },
    },
    {timestamps: true}  //createdAt and updatedAt fields
)

// Custom validation to prevent empty messages
messageSchema.pre("validate", function (next) {
  if (!this.text && !this.image) {
    next(new Error("Message must contain either text or image"));
  } else {
    next();
  }
});

const Message = mongoose.model("Message", messageSchema);

export default Message;