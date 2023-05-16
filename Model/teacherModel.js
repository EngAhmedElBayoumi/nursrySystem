// import mongoose
const mongoose = require('mongoose');
// teacher schema
const teacherSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    fullName: {
        type: String,
        required: [true, "Please Enter Teacher Name"],
      },
      password: {
        type: String,
        minlength: 4,
        required: [true, "Please Enter Teacher Password"],
      },
      email: {
        type: String,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please Enter Valid Email"],
        required: [true, "Please Enter Teacher Email"],
      },
      image: String,
    })

// Mapping Schema to Model
mongoose.model("teachers", teacherSchema);