const { Class } = require("../models/classModels");
const mongoose = require("mongoose");
//get all classes
const getAllClasses = async (req, res) => {
  const userID = req.user._id;
  const allClasses = await Class.find({userID}).sort({ createdAt: -1 });
  res.status(200).json(allClasses);
};
// get single class
const getClass = async (req, res) => {
  const { id } = req.params;
  const userID = req.user._id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Class does not exist" });
  }
  const singleClass = await Class.findOne({ _id: id, userId });

  if (!singleClass) {
    return res.status(404).json({ error: "Class does not exist" });
  }

  res.status(200).json(singleClass);
};
//create new class

const createClass = async (req, res) => {
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

  const userId = req.user._id;

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
};

//delete class
const deleteClass = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Class does not exist" });
  }

  const deleteClass = await Class.findOneAndDelete({ _id: id, userID });

  if (!deleteClass) {
    return res.status(404).json({ error: "Class does not exist" });
  }

  res.status(200).json(deleteClass);
};
//update class
const updateClass = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Class does not exist" });
  }

  const updateClass = await Class.findOneAndUpdate(
    { _id: id, userId },
    { ...req.body },
    { new: true } 
  );

  if (!updateClass) {
    return res.status(404).json({ error: "Class does not exist" });
  }

  res.status(200).json(updateClass);
};

module.exports = {
  getAllClasses,
  getClass,
  createClass,
  deleteClass,
  updateClass,
};
