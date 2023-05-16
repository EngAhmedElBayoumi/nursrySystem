// import express
const express = require('express');
//import express-validator
const { body, param,query } = require('express-validator');
// import childrenController 
const childrenController = require('./../Controller/childrenController');
//import report
const report =require('./../Controller/report')

// import validatevm
const validatevm = require('./../Core/validatevm');


// import childrenvalidator
const childrenvalidator = require('./../Core/childrenvalidator');
//import express-Router
const router = express.Router();


/**
 * @swagger
 * /children:
 *   get:
 *     summary: Get all children
 *     description: Retrieve a list of all children
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *       500:
 *         description: Internal server error
 *
 *   post:
 *     summary: Add a new child
 *     description: Add a new child to the system
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *     responses:
 *       201:
 *         description: Child created successfully
 *         content:
 *           application/json:
 *       400:
 *         description: Invalid request payload
 *       500:
 *         description: Internal server error
 *
 *   put:
 *     summary: Update a child
 *     description: Update an existing child by ID
 *     parameters:
 *       - in: query
 *         name: id
 *         description: ID of the child
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *     responses:
 *       200:
 *         description: Child updated successfully
 *         content:
 *           application/json:
 *       400:
 *         description: Invalid request payload or ID
 *       500:
 *         description: Internal server error
 *
 *   delete:
 *     summary: Delete a child
 *     description: Delete an existing child by ID
 *     parameters:
 *       - in: query
 *         name: id
 *         description: ID of the child
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Child deleted successfully
 *       400:
 *         description: Invalid ID
 *       500:
 *         description: Internal server error
 */
router.route('/children')
    .get(childrenController.getAllChildren)
    .post(childrenvalidator.postValidator,validatevm,childrenController.addNewChild)
    .put(childrenvalidator.putValidator,validatevm,childrenController.updateChild)
    .delete(childrenvalidator.deleteValidator,validatevm,childrenController.deleteChild);
    

//add swagger 
/**
 * @swagger
 * /createpdf:
 *   get:
 *     summary: generate report in pdf file
 *     description: generate report in pdf file
 *     responses:
 *       200:
 *         description: Successful response
 *         content:application/json:  
 *      500:
 *            
 */


router.route('/createpdf')
    .get(report.reportRoute);

//add swagger 
/**
 * @swagger
 * /child/{id}:
 *   get:
 *     summary: Get specific child
 *     description: Retrieve information about a specific child by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the child
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Child'
 *       404:
 *         description: Child not found
 *       500:
 *         description: Internal server error
 */
router.route('/child/:id')
    .get(childrenvalidator.getValidator,validatevm,childrenController.getspecificChildren)




    // export router
module.exports = router;

