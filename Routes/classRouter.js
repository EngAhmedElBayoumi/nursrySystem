// import express
const express = require('express');
//import express-validator
const { body, param,query } = require('express-validator');

// import classController 
const classController = require('./../Controller/classController');

// import validatevm
const validatevm = require('./../Core/validatevm');

// import classvalidator
const classvalidator = require('./../Core/classvalidator');
//import express-Router
const router = express.Router();


/**
* @swagger
*info:
*  title: Class API
*  version: 1.0.0
*paths:
*  /classes:
*    get:
*      summary: Get all classes
*      responses:
*        '200':
*          description: Successful operation
*    post:
*      summary: Add a new class
*      parameters:
*        - name: class
*          in: body
*          description: Class object that needs to be added
*          required: true
*      responses:
*        '200':
*          description: Successful operation

*    put:
*      summary: Update a class
*      parameters:
*        - name: class
*          in: body
*          description: Class object that needs to be updated
*          required: true
*      responses:
*        '200':
*          description: Successful operation
*    delete:
*      summary: Delete a class
*      parameters:
*        - name: id
*          in: query
*          description: ID of the class to be deleted
*          required: true
*          type: string
*      responses:
*        '200':
*          description: Successful operation
*/


router.route('/classes')
    .get(classController.getAllClasses)
    .post(classvalidator.postValidator,validatevm,classController.addNewClass)
    .put(classvalidator.putValidator,validatevm,classController.updateClass)
    .delete(classvalidator.deleteValidator,validatevm,classController.deleteClass);





/**
* @swagger
*info:
*  title: Class API
*  version: 1.0.0
*paths:
*  /classchildren/{id}:
*    get:
*      summary: Get children of a class
*      description: Retrieve a list of children in a class.
*      parameters:
*        - name: id
*          in: path
*          description: ID of the class
*          required: true
*          type: string
*      responses:
*        '200':
*          description: Successful operation
*          
*  /classteacher/{id}:
*    get:
*      summary: Get classes of a teacher
*      description: Retrieve a list of classes taught by a teacher.
*      parameters:
*        - name: id
*          in: path
*          description: ID of the teacher
*          required: true
*          type: string
*      responses:
*        '200':
*          description: Successful operation
*          
 */

router.route('/classchildren/:id')
    .get(classvalidator.getClassChildrenValidator,validatevm,classController.getChildrenClasses)

router.route('/classteacher/:id')
    .get(classvalidator.getTeacherClassesValidator,validatevm,classController.getTeacherClasses)
    


// export router
module.exports = router;