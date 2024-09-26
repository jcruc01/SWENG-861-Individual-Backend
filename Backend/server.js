require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const classRoutes = require("./routes/classRoutes");
const cors = require("cors");

const App = express();

App.use(cors({ origin: "http://localhost:8081" }));

App.use(express.json());

App.use("/api/classes", classRoutes);

//db
mongoose
  .connect(process.env.MONGO_URI)
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
