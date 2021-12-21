// modules

import express from "express";
import cors from "cors";
import helmet from "helmet";
//import { Mongoose } from "mongoose";

//database connection
import ConnectDB from "./Database/Connection.js";

//API
import Auth from "./API/Auth/index.js";

//console.log(Auth);

// use the modules
const Worker_Force = express();
Worker_Force.use(cors());
Worker_Force.use(express.json());
Worker_Force.use(helmet());

//Aplication Routes
Worker_Force.use("/auth", Auth);

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
