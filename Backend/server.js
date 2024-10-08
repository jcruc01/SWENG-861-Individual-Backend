require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const classRoutes = require("./routes/classRoutes");
const userRoutes = require("./routes/userRoutes");
const loginRoute = require("./routes/loginRoute");
const cors = require("cors");
const { classesDBConnection } = require("./models/classModels");
const { usersDBConnection } = require("./models/userModels");

const session = require("express-session");

const App = express();

App.use(cors());
App.use(express.json());

App.use(
  session({
    secret: "GrCJmD321",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

App.use("/api/classes", classRoutes);
App.use("/api/users", userRoutes);
App.use("/api/login", loginRoute);

//db
Promise.all([classesDBConnection.readyState, usersDBConnection.readyState])
  .then(() => {
    App.listen(process.env.PORT, (error) => {
      if (!error) {
        console.log(
          "DB is connected, Server is Successfully Running, and App is listening on port " +
            process.env.PORT
        );
      } else console.log("Error occurred, server can't start", error);
    });
  })
  .catch((error) => {
    console.log(error);
  });
