// import mongoose 
const mongoose = require('mongoose');
// load teacher model
require('../Model/teacherModel');
// import node-cache
const NodeCache = require("node-cache");
const cache = new NodeCache({
  stdTTL: 3600, // Time to live for cache entries (in seconds)
});

// import bcrypt
const bcrypt = require('bcrypt');

const salt = bcrypt.genSaltSync(16);
// teacher schema
const teacherSchema = mongoose.model("teachers");

exports.getAllTeacher = (request, response, next) => {
    const cacheKey = 'allTeachers';
  
    // Check if the data exists in the cache
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
      // Data found in the cache, return it
      console.log("test");
      response.setHeader('Cache-Control', 'max-age=3600'); // Cache the response for 1 hour
      response.status(204).send();
    } else {
      // Data not found in the cache, retrieve it from the database
      teacherSchema
        .find({})
        .then((data) => {
          // Store the retrieved data in the cache
          cache.set(cacheKey, data);
          response.status(200).json({ data });
        })
        .catch((error) => next(error));
    }
  };



// export getallteacher function
// exports.getAllTeacher = (request, response) => {

//     teacherSchema
//     .find({})
//     .then((data) => {
//     response.status(200).json({ data });
//     }
//     )
//     .catch((error) => next(error));
// };

//export add new teacher function
exports.addNewTeacher = (request, response, next) => {
    new teacherSchema({
        _id: request.body.id,
        fullName: request.body.fullName,
        password: bcrypt.hashSync(request.body.password, salt),
        email: request.body.email,
        image: request.body.image,
    })
    .save()
    .then((data) => {
        response.status(200).json({ data });
})
    .catch((error) => next(error));
    }

//export update teacher function
exports.updateTeacher = (request, response, next) => {
    teacherSchema
    .updateOne
    (
        { _id: request.body.id },
        {
            $set: {
                fullName: request.body.fullName,
                password: bcrypt.hashSync(request.body.password, salt),
                email: request.body.email,
                image: request.body.image,
            }
        })
    .then((data) => {
        response.status(200).json({ data });
    })
    .catch((error) => next(error));
}

//export delete teacher function
exports.deleteTeacher = (request, response, next) => {
    teacherSchema
    .deleteOne({ _id: request.body.id })
    .then((data) => {
      if (data.deletedCount == 0) {
        next(new Error("teacher not found"));
      } else response.status(200).json({ data });
    })
    .catch((error) => {
      next(error);
    });
    }