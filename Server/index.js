// modules

import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import helmet from "helmet";
import passport from "passport";
//import { Mongoose } from "mongoose";

//database connection
import ConnectDB from "./Database/Connection.js";

// google authentication config
import googleAuthConfig from "./config/google.config.js";

//API
import Auth from "./API/Auth/index.js";
import Image from "./API/Image/index.js";

//passport config
googleAuthConfig(passport);

// use the modules
const Worker_Force = express();
Worker_Force.use(cors());
Worker_Force.use(express.json());
Worker_Force.use(helmet());
Worker_Force.use(passport.initialize());

//Aplication Routes
Worker_Force.use("/auth", Auth);
Worker_Force.use("/image", Image);

// Server connection portS
Worker_Force.listen(4000, () => {
  ConnectDB()
    .then(() => {
      console.log("CONNECTED SUCCESFULLY");
    })
    .catch((error) => {
      console.log("server is running but database not conected");
      console.log(error);
    });
});
