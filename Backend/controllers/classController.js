const { Class } = require("../models/classModels");
const mongoose = require("mongoose");
//get all classes
const getAllClasses = async (req, res) => {
  const allClasses = await Class.find({}).sort({ createdAt: -1 });
  res.status(200).json(allClasses);
};
// get single class
const getClass = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Class does not exist" });
  }
  const singleClass = await Class.findById(id);

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

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Class does not exist" });
  }

  const deleteClass = await Class.findOneAndDelete({ _id: id });

  if (!deleteClass) {
    return res.status(404).json({ error: "Class does not exist" });
  }

  res.status(200).json(deleteClass);
};
//update class
const updateClass = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Class does not exist" });
  }

  const updateClass = await Class.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
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
