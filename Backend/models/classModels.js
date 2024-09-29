const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const classesDBConnection = mongoose.createConnection(
  process.env.MONGO_URI_CLASSES
);

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
    userId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = {
  classesDBConnection,
  Class: classesDBConnection.model("Class", classSchema),
};
