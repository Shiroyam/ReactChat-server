import mongoose, { Schema } from "mongoose";

const MessageSchema = new Schema(
  {
    text: { type: String, require: Boolean },
    dialog: { type: Schema.Types.ObjectId, ref: "Dialog", require: true },
    read: {
      type: Boolean,
      default: false,
    },
    user: { type: Schema.Types.ObjectId, ref: "User", require: true },
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model("Message", MessageSchema)

export default Message
