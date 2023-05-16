

// import mongoose
const mongoose = require('mongoose');

require('../Model/classModel');
const classSchema = mongoose.model("class");

const NodeCache = require("node-cache");
const cache = new NodeCache({
  stdTTL: 3600, // Time to live for cache entries (in seconds)
});

// export get all classes function
exports.getAllClasses = (request, response,next) => {
    const cacheKey = 'allClasses';
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
     // Data found in the cache, return it
        console.log("test");    
        response.setHeader('Cache-Control', 'max-age=3600'); // Cache the response for 1 hour
        response.status(204).send();    
    } else {
            // Data not found in the cache, retrieve it from the database
        classSchema
        .find({})
        .then((data) => {
            // Store the retrieved data in the cache
            cache.set(cacheKey, data);
        response.status(200).json({ data });
    }
    )
    .catch((error) => next(error));
    }
}

//export add new Class function
exports.addNewClass = (request, response, next) => {
    new classSchema({
        _id: request.body.id,
        name: request.body.name,
        supervisor: request.body.supervisor,
        children: request.body.children,
    })
    .save()
    .then((data) => {
        response.status(200).json({ data });
    }
    )
    .catch((error) => next(error));
}
//export update Class function
exports.updateClass = (request, response, next) => {
    classSchema
    .updateOne
    (
        { _id: request.body.id },
        {
            $set: {
                _id: request.body.id,
                name: request.body.name,
                supervisor: request.body.teacher,
                children: request.body.children,
            }
        }
    )
    .then((data) => {
        response.status(200).json({ data });
    }
    )
    .catch((error) => next(error));
}

//export delete Class function
exports.deleteClass = (request, response, next) => {
    classSchema
    .deleteOne({ _id: request.body.id })
    .then((data) => {
        response.status(200).json({ data });
    }
    )
    .catch((error) => next(error));
}


// export get children classes

exports.getChildrenClasses = (request, response,next) => {
    // get all children that ref with class in array children 
    classSchema
    .find({children:request.params.id},{_id:1,name:1})
    .then((data) => {

         response.status(200).json({ data });
    }
    )
    .catch((error) => next(error));
}

// export get teacher classes
exports.getTeacherClasses = (request, response,next) => {
    classSchema
    .find({supervisor:request.params.id},{_id:1,name:1})
    .then((data) => {

    response.status(200).json({ data });
    }
    )
    .catch((error) => next(error));
}

