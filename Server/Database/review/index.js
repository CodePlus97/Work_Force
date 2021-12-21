import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema(
  {
    worker: { type: mongoose.Types.ObjectId, ref: "Workers" },
    user: { type: mongoose.Types.ObjectId, ref: "Users" },
    rating: { type: Number, required: true },
    reviewText: { type: String, required: true },
    isWorkerReview: Boolean,
    photos: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Images",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const ReviewModel = mongoose.model("Reviews", ReviewSchema);
