const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const usersDBConnection = mongoose.createConnection(
  process.env.MONGO_URI_USERS
);

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = {
  usersDBConnection,
  User: usersDBConnection.model("User", userSchema),
};
