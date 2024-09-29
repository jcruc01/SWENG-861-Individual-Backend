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

router.get("/", isAuthenticated, getAllClasses);

router.get("/:id", isAuthenticated,  getClass);

router.post("/", isAuthenticated,   createClass);

router.delete("/:id", isAuthenticated,   deleteClass);

router.patch("/:id", isAuthenticated,   updateClass);

module.exports = router;
