// import body , param , query from express-validator
const {body,param,query}=require("express-validator");

//exports post validator 
exports.postValidator=[
    body('id').isMongoId().withMessage('id must be objectid '),
    body('fullName').isLength({max:15}).withMessage('name must be at max 15 chars')
    .isAlpha().withMessage('name must be alpha'),
    body('password').isString().withMessage('password must be string')
    .isLength({min:8}).withMessage('password must be at least 8 chars'),
    body('email').isEmail().withMessage('wrong emial format'),
    body('image').isString().withMessage('imagesource must be string')
]

//exports put validator
exports.putValidator=[
    body('id').isMongoId().withMessage('id must be objectid '),
    body('fullName').optional().isLength({max:15}).withMessage('name must be at max 15 chars')
    .optional().isAlpha().withMessage('name must be alpha'),
    body('password').optional().isString().withMessage('password must be string')
    .optional().isLength({min:8}).withMessage('password must be at least 8 chars'),
    body('email').optional().isEmail().withMessage('wrong emial format'),
    body('image').optional().isString().withMessage('imagesource must be string')
]


//exports delete validator
exports.deleteValidator=[
    body('id').isMongoId().withMessage('id must be objectid')
]

