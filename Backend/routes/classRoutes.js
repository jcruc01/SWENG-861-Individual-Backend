const express = require("express");
const {
  createClass,
  getAllClasses,
  getClass,
  deleteClass,
  updateClass,
} = require("../controllers/classController");
const isAuthenticated = require("../middleware/isAuthenticated");
const router = express.Router();

router.get("/", getAllClasses);

router.get("/:id", getClass);

router.post("/", createClass);

router.delete("/:id", deleteClass);

router.patch("/:id", updateClass);

module.exports = router;
