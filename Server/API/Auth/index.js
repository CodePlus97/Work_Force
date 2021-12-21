// Library
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//Models
import { UserModel } from "../../Database/allModels.js";
// import { WorkerModel } from "../../Database/allModels";

//Create a Router

const Router = express.Router();

/**
 * Router       /signup
 * Desc          Register new user
 * Params       none
 * Access       Public
 * Method       POST
 */

Router.post("/signup", async (req, res) => {
  try {
    const { fullName, password, phoneNumber, email, nic } =
      req.body.credentials;
    const checkUserByEmail = await UserModel.findOne({ email });
    const checkUserByPhone = await UserModel.findOne({ phoneNumber });
    // const checkUserByEmail = await WorkerModel.findOne({ email });
    // const checkUserByPhone = await WorkerModel.findOne({ phoneNumber });

    if (checkUserByEmail || checkUserByPhone) {
      return res.json({ user: "User already exists!" });
    }

    //has password
    const bcryptSalt = await bcrypt.genSalt(8);
    const hashedPassword = await bcrypt.hash(password, bcryptSalt);

    // save data to database
    await UserModel.create({
      ...req.body.credentials,
      password: hashedPassword,
    });

    //generate JWT auth token (pag name jsonwebtoken)
    const token = jwt.sign({ user: { fullName, email } }, "Work_Force");

    return res.status(200).json({ token, status: "success" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default Router;
