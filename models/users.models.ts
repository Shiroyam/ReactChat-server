import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
  {
    email: {
      type: String,
      require: true,
      unique: true,
    },
    fullname: {
      type: String,
      required: "Fullname is required",
    },
    password: {
      type: String,
      required: "Password is required",
    },
    confirmed: {
      type: Boolean,
      default: false,
    },
    avatar: String,
    confirm_hash: String,
    last_seen: {
      type: Date,
      default: new Date(),
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);

export default User;
