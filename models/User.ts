import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String, required: true },

    email: { type: String, required: true, unique: true },

    password: { type: String, required: true },

    // ✅ ROLE SYSTEM (VERY IMPORTANT)
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    gender: {
      type: String,
      enum: ["male", "female"],
      default: null,
    },

    bio: {
      type: String,
      default: "",
    },

    location: {
      type: String,
      default: "",
    },

    // ✅ OPTIONAL (future-ready)
    avatar: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export default models.User || model("User", UserSchema);