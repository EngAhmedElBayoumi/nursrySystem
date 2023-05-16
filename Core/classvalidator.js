// import body , param , query from express-validator
const {body,param,query}=require("express-validator");

//exports post validator
exports.postValidator=[
    body('id').isNumeric().withMessage('id must be number'),
    body('name').isLength({max:15}).withMessage('name must be at max 15 chars')
    .isAlpha().withMessage('name must be alpha'),
    body('supervisor').isMongoId().withMessage('supervisor must be teacher id'),
    body('children').isArray().withMessage('students must be array of students id'),
    body('children.*').isNumeric().withMessage('students must be array of students id'),
]

//exports put validator
exports.putValidator=[
    body('id').isNumeric().withMessage('id must be number'),
    body('name').optional().isLength({max:15}).withMessage('name must be at max 15 chars')
    .optional().isAlpha().withMessage('name must be alpha'),
    body('supervisor').optional().isMongoId().withMessage('supervisor must be teacher id'),
    body('children').optional().isArray().withMessage('students must be array of students id'),
    body('children.*').optional().isNumeric().withMessage('students must be array of students id'),
]

//exports delete validator
exports.deleteValidator=[
    body('id').isNumeric().withMessage('id must be number')

]



//exports get teacher classes validator
exports.getTeacherClassesValidator=[
    param('id').isMongoId().withMessage('id must be teacher id')
]


//exports get class children validator
exports.getClassChildrenValidator=[
    param('id').isNumeric().withMessage('id must be number')
]


