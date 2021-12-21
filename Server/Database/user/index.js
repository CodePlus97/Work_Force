import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },

    email: { type: String, lowercase: true, unique: true },

    password: { type: String, required: true },

    address: [
      {
        details: { type: String, required: true },
        for: { type: String, required: true },
      },
    ],

    phoneNumber: [{ type: Number, required: true }],

    nic: { type: String, required: true },

    profilePic: { type: mongoose.Types.ObjectId, ref: "Images" },
  },

  {
    timestamps: true,
  }
);

export const UserModel = mongoose.model("Users", UserSchema);
