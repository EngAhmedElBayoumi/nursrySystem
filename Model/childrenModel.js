let mongoose = require("mongoose");

// Children Schema
let childrenSchema = new mongoose.Schema({
  _id: Number,
  fullName: {
    type: String,
    required: [true, "Please Enter Child Name"],
  },
  age: Number,
  level: String,
  address: {
    city: {
      type: String,
      required: [true, "Please Enter Child City"],
    },
    street: {
      type: String,
      required: [true, "Please Enter Child Street"],
    },
    building: {
      type: Number,
      required: [true, "Please Enter Child Building"],
    },
  },
});

// Mapping Schema to Model
mongoose.model("children", childrenSchema);