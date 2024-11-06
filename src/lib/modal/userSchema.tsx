import { Schema, model, models } from "mongoose";

const userSchema = new Schema(
  {
    tg_id: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    profilePicture: { type: String },
    premium: { Boolean },
    first_name: { type: String },
    last_name: { type: String },
    auth_date: { Number },
  },
  {
    timestamps: true,
  }
);

const User = models.User || model("User", userSchema);

export default User;
