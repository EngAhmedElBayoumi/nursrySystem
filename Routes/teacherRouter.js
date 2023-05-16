// import express
const express = require('express');
//import express-validator
const { body, param,query } = require('express-validator');
// import controlers
const teacherController = require('./../Controller/teacherController');
//import teachervalidator
const teachervalidator = require('./../Core/teachervalidator');
// import validatevm
const validatevm = require('./../Core/validatevm');
//import express-Router
const router = express.Router();
// route /teacher get all data , post new teacher , update teacher date

/**
* @swagger
*info:
*  title: Teacher API
*  version: 1.0.0
*paths:
*  /teachers:
*    get:
*      summary: Get all teachers
*      description: Retrieve a list of all teachers.
*      responses:
*        '200':
*          description: Successful operation
*          
*    post:
*      summary: Add a new teacher
*      description: Create a new teacher record.
*      parameters:
*        - fullName: string
*        - password : string
*        - email : string
*        - image : string
*          in: body
*          description: Teacher object that needs to be added
*          required: true
*        
*      responses:
*        '200':
*          description: Successful operation
*    put:
*      summary: Update a teacher
*      description: Update an existing teacher record.
*      parameters:
*        - fullName: string
*        - password : string
*        - email : string
*        - image : string
*          in: body
*          description: Teacher object that needs to be updated
*          required: true
*      responses:
*        '200':
*          description: Successful operation
*    delete:
*      summary: Delete a teacher
*      description: Delete an existing teacher record.
*      parameters:
*        - name: id
*          in: query
*          description: ID of the teacher to be deleted
*          required: true
*          type: string
*      responses:
*        '200':
*          description: Successful operation
*/




router.route('/teachers')
    .get(teacherController.getAllTeacher)
    .post(teachervalidator.postValidator,validatevm,teacherController.addNewTeacher)
    .put(teachervalidator.putValidator,validatevm,teacherController.updateTeacher)
    .delete(teachervalidator.deleteValidator,validatevm,teacherController.deleteTeacher);



// export router
module.exports = router;