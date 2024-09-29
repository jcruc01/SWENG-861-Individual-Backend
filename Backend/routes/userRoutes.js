const express = require("express");
const {
  createUser,
  getAllUsers,
  getUser,
  deleteUser,
  updateUser,
} = require("../controllers/UserController");
const isAuthenticated = require("../middleware/isAuthenticated");
const router = express.Router();

router.get("/", isAuthenticated,   getAllUsers);

router.get("/:id", isAuthenticated,   getUser);

router.post("/", isAuthenticated,   createUser);

router.delete("/:id", isAuthenticated,   deleteUser);

router.patch("/:id", isAuthenticated,   updateUser);

module.exports = router;
