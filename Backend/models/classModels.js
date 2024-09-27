const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const classSchema = new Schema(
  {
    classTitle: {
      type: String,
      required: true,
    },
    classNumber: {
      type: Number,
      required: true,
    },
    classDescription: {
      type: String,
      required: true,
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
    professorName: {
      type: String,
      required: true,
    },
    areaOfStudy: {
      type: String,
      required: true,
    },
    daysOfWeek: {
      type: String,
      required: true,
    },
    hoursOfDay: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Class", classSchema);
