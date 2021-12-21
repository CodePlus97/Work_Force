import mongoose from "mongoose";

const WorkerSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },

    email: { type: String, lowercase: true, unique: true, required: true },

    password: { type: String, required: true },

    address: [
      { details: { type: String }, for: { type: String }, required: true },
    ],

    phoneNumber: [{ type: Number, required: true }],

    nic: { type: String, required: true },

    profilePic: { type: mongoose.Types.ObjectId, ref: "Images" },

    hourlyRate: { type: Number, required: true },

    workCatogery: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const WorkerModel = mongoose.model("Workers", WorkerSchema);
