const { User } = require("../models/userModels");
const mongoose = require("mongoose");
//get all Users
const getAllUsers = async (req, res) => {
  const allUsers = await User.find({}).sort({ createdAt: -1 });
  res.status(200).json(allUsers);
};
// get single User
const getUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "User does not exist" });
  }
  const singleUser = await User.findById(id);

  if (!singleUser) {
    return res.status(404).json({ error: "User does not exist" });
  }

  res.status(200).json(singleUser);
};
//create new User

const createUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const newUser = await User.create({
      username,
      password,
    });
    res.status(200).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//delete User
const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "User does not exist" });
  }

  const deleteUser = await User.findOneAndDelete({ _id: id });

  if (!deleteUser) {
    return res.status(404).json({ error: "User does not exist" });
  }

  res.status(200).json(deleteUser);
};
//update User
const updateUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "User does not exist" });
  }

  const updateUser = await User.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!updateUser) {
    return res.status(404).json({ error: "User does not exist" });
  }

  res.status(200).json(updateUser);
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
};
