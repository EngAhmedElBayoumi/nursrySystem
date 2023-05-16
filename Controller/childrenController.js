// import mongoose
const mongoose = require('mongoose');
const pdf = require('html-pdf');
const fs = require('fs');
const Chart = require('chart.js');
// load children model
require('../Model/childrenModel');
const childrenSchema = mongoose.model("children");
//load node-cache
const NodeCache = require("node-cache");
const cache = new NodeCache({
    stdTTL: 3600, // Time to live for cache entries (in seconds)
});


// export get all children function
exports.getAllChildren = (request, response,next) => { 
    const cacheKey = 'allChildren';
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
        // Data found in the cache, return it
        response.setHeader('Cache-Control', 'max-age=3600'); // Cache the response for 1 hour
        response.status(204).send();
    } else {
   
    childrenSchema
    .find({})
    .then((data) => { 
        // Store the retrieved data in the cache
        cache.set(cacheKey, data);
        response.status(200).json({ data } );
    })
    .catch((error) => next(error));
    }
};

// export get specific child function
exports.getspecificChildren = (request, response,next) => {
    childrenSchema
    .findOne({ _id: request.params.id })
    .then((data) => {
      if (data == null) {
        throw new Error("Child not Found");
      } else {
        res.status(200).json({ data });
      }
    })
    .catch((error) => next(error));
};


//export add new child function
exports.addNewChild = (request, response, next) => { 
     new childrenSchema({
        _id: request.body.id,
        fullName: request.body.fullName,
        age: request.body.age,
        level: request.body.level,
        address: {
            street: request.body.address.street,
            city: request.body.address.city,
            building: request.body.address.building,
        },
    })
    .save()
    .then((data) => {
        response.status(200).json({ data });
    }
    )
    .catch((error) => next(error));

}

//export update child function
exports.updateChild = (request, response, next) => {
    childrenSchema
    .updateOne
    (
                { _id: request.body.id },
                {
                    $set: {
                        _id:request.body.id,
                        fullName: request.body.fullName,
                        age: request.body.age,
                        level: request.body.level,
                        address: {
                            street: request.body.address.street,
                            city: request.body.address.city,
                            building: request.body.address.building,
                        },
                    },
                }
    )
    .then((data) => 
    {
        if (data.matchedCount == 0) {
            throw new Error("Child not Found");
        } else {
            response.status(200).json({ data });
        }
    })
    .catch((error) => next(error));
}






//export delete child function
exports.deleteChild = (request, response, next) => {
    childrenSchema
    .deleteOne({ _id: request.body.id })
    .then((data) => {
      if (data.deletedCount == 0) {
        next(new Error("child not found"));
      } else response.status(200).json({ data });
    })
    .catch((error) => {
      next(error);
    });

}