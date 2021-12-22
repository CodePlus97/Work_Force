import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const WorkerSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },

    email: { type: String, lowercase: true, unique: true, required: true },

    password: { type: String },

    district: { type: String, required: true },

    address: [{ details: { type: String }, for: { type: String } }],

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

WorkerSchema.methods.generateJwtToken = function () {
  return jwt.sign({ worker: this._id.toString() }, "Work_Force");
};

WorkerSchema.statics.findByEmailAndPhone = async ({ email, phoneNumber }) => {
  //check there is any worker for email and phone
  const checkWorkerByEmail = await WorkerModel.findOne({ email });
  const checkWorkerByPhone = await WorkerModel.findOne({ phoneNumber });

  if (checkUserByEmail || checkUserByPhone) {
    throw new Error("User already exists!");
  }
  return false;
};

WorkerSchema.statics.findByEmailAndPassword = async ({ email, password }) => {
  const worker = await WorkerModel.findOne({ email });
  if (!worker) throw new Error("User not exist !!");

  //compare password
  const doesPasswordMatch = await bcrypt.compare(password, worker.password);

  if (!doesPasswordMatch) throw new Error("Invalid password !!!");

  return worker;
};

WorkerSchema.pre("save", function (next) {
  const worker = this;

  //password is modified
  if (!worker.isModified("password")) return next();

  //generate bcryp salt
  bcrypt.genSalt(8, (error, salt) => {
    if (error) return next(error);

    //hash the password
    bcrypt.hash(worker.password, salt, (error, hash) => {
      if (error) return next(error);

      //assign hash password
      worker.password = hash;
      return next();
    });
  });
});

export const WorkerModel = mongoose.model("Workers", WorkerSchema);
