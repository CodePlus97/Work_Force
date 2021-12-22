// Library
import express from "express";
import passport from "passport";

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
    await UserModel.findByEmailAndPhone(req.body.credentials);
    const newUser = await UserModel.create(req.body.credentials);
    const token = newUser.generateJwtToken();
    return res.status(200).json({ token, status: "success" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Router       /signin
 * Desc         log in to account
 * Params       none
 * Access       Public
 * Method       POST
 */

Router.post("/signin", async (req, res) => {
  try {
    const user = await UserModel.findByEmailAndPassword(req.body.credentials);
    const token = user.generateJwtToken();
    return res.status(200).json({ token, status: "success" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Router       /google
 * Desc         google signin
 * Params       none
 * Access       Public
 * Method       get
 */

Router.get(
  "/google",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
  })
);

/**
 * Router       /google/callback
 * Desc         google signup callback
 * Params       none
 * Access       Public
 * Method       get
 */

Router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    return res
      .status(200)
      .json({ token: req.session.passport.user.token, status: "success" });
  }
);

// Router.get(
//   "/google/callback",
//   passport.authenticate("google", { failureRedirect: "/" }),
//   (req, res) => {
//     return res.redirect(
//       `http://localhost:4000/google/${req.session.passport.user.token}`
//     );
//   }
// );

export default Router;

//Dummy code fro reference

// Router.post("/signup", async (req, res) => {
//   try {
//     const { fullName, password, phoneNumber, email, nic } =
//       req.body.credentials;
//     const checkUserByEmail = await UserModel.findOne({ email });
//     const checkUserByPhone = await UserModel.findOne({ phoneNumber });
//     // const checkUserByEmail = await WorkerModel.findOne({ email });
//     // const checkUserByPhone = await WorkerModel.findOne({ phoneNumber });

//     if (checkUserByEmail || checkUserByPhone) {
//       return res.json({ user: "User already exists!" });
//     }

//     //has password
//     const bcryptSalt = await bcrypt.genSalt(8);
//     const hashedPassword = await bcrypt.hash(password, bcryptSalt);

//     // save data to database
//     await UserModel.create({
//       ...req.body.credentials,
//       password: hashedPassword,
//     });

//     //generate JWT auth token (pag name jsonwebtoken)
//     const token = jwt.sign({ user: { fullName, email } }, "");

//     return res.status(200).json({ token, status: "success" });
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// });
