const express = require("express");
const {
  createUser,
  getAllUsers,
  getUser,
  deleteUser,
  updateUser,
} = require("../controllers/UserController");
const router = express.Router();

router.get("/", getAllUsers);

router.get("/:id", getUser);

router.post("/", createUser);

router.delete("/:id", deleteUser);

router.patch("/:id", updateUser);

module.exports = router;
