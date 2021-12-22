import mongoose from "mongoose";

const ComplainSchema = new mongoose.Schema(
  {
    worker: { type: mongoose.Types.ObjectId, ref: "Workers" },
    user: { type: mongoose.Types.ObjectId, ref: "Users" },
    ComplainText: { type: String, required: true },
    isWorkerComplain: Boolean,
    isUserComplain: Boolean,
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

export const ComplainModel = mongoose.model("Complains", ComplainSchema);
