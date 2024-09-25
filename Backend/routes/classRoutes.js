const express = require("express");
const Class = require("../models/classModels");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ mssg: "GET all classes" });
});

router.get("/:id", (req, res) => {
  res.json({ mssg: "GET a single class" });
});

router.post("/", async (req, res) => {
  const {
    classTitle,
    classNumber,
    classDescription,
    startDate,
    endDate,
    professorName,
    areaOfStudy,
    daysOfWeek,
    hoursOfDay,
  } = req.body;

  try {
    const newClass = await Class.create({
      classTitle,
      classNumber,
      classDescription,
      startDate,
      endDate,
      professorName,
      areaOfStudy,
      daysOfWeek,
      hoursOfDay,
    });
    res.status(200).json(newClass);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", (req, res) => {
  res.json({ mssg: "DELETE a class" });
});

router.patch("/:id", (req, res) => {
  res.json({ mssg: "UPDATE a class" });
});

module.exports = router;
