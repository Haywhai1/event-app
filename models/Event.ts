import { Schema, model, models } from "mongoose";

const EventSchema = new Schema(
  {
    title: { type: String, required: true },

    category: {
      type: String,
      enum: ["Concert", "Movie", "Tech", "Party", "Sport", "Others"],
      default: "Others",
    },

    date: { type: Date, required: true },

    time: { type: String, required: true },

    price: { type: Number, required: false, default: 0 },

    coverImage: { type: String, required: true }, // URL path

    location: { type: String, required: true },

    about: { type: String, required: true },

    participants: [{ type: String }], // simple list of names

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    isFeatured: { type: Boolean, default: false }, // For homepage "Popular Events"
  },
  { timestamps: true }
);

export default models.Event || model("Event", EventSchema);