let mongoose = require("mongoose");

// Classes Schema
let classSchema = new mongoose.Schema({
  _id: Number,
  name: {
    type: String,
    required: [true, "Please Enter Class Name"],
  },

  supervisor: {
    ref: "teachers",
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Please Enter  teacher id"],
  },
  children: [
    {
      ref: "childrens",
      type: Number,
      required: [true, "Please Enter Array of Children id"],
    },
  ],
});

// Mapping Schema to Model
mongoose.model("class", classSchema);