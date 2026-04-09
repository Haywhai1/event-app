import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String, required: true },

    email: { type: String, required: true, unique: true },

    password: { type: String, required: true },

    gender: {
      type: String,
      enum: ["male", "female"],
      default: "", // 🔥 important
    },

    bio: {
      type: String,
      default: "",
    },

    location: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export default models.User || model("User", UserSchema);