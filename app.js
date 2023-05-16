// import express
const express = require('express');
// import mongoose
const mongoose = require('mongoose');
//import morgan
const morgan = require('morgan');
//import cors
const cors = require('cors')
//import swagger
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');



//import routes
const teacherRoute = require('./Routes/teacherRouter');
const childRoute = require('./Routes/childRouter');
const classRoute = require('./Routes/classRouter');

const app = express();

// Swagger configuration
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'NurserySystem',
      version: '1.0.0',
      description: 'NurserySystem is a REST API for managing a nursery system.',
    },
    basePath: '/',
  },
  apis: ['./Routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));





mongoose.set('strictQuery', true);

// Connect to the database on locolhost->127.0.0.1 on port 27017 
mongoose.connect('mongodb://127.0.0.1:27017/nurserysystem')
.then(() => {
    console.log('Connected to the database');
    // Start the server on port 8080
    app.listen(8080, () => {
      console.log('Server listening on port 8080');
    });  
  })
  .catch((error) => {
    console.log('Error connecting to the database'+error);
  });

// Middleware for enabling CORS
app.use(cors());

// Middleware to print request url and method using morgan
app.use(morgan(':url :method'));

// Middleware for parsing request body


app.use(express.json());
app.use(express.urlencoded({ extended: false }));



//Routes
app.use(teacherRoute);
app.use(childRoute);
app.use(classRoute);

















// Middleware for handling non-existent routes
app.use((req, res, next) => {
    res.status(404).json({ message: 'Route Not Found' });
  });



// Error handling middleware
app.use((error, req, res, next) => {
    const status = error.status || 500;
    const message = error.message || 'Internal Server Error';
    res.status(status).json({message:message});
    console.log("Error");
});



