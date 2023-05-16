// import body , param , query from express-validator
const {body,param,query}=require("express-validator");

// export post validator

exports.postValidator=[
    body('id').isNumeric().withMessage('id must be number'),
    body('fullName').isLength({max:15}).withMessage('name must be at max 15 chars')
    .isAlpha().withMessage('name must be alpha'),
    body('age').isNumeric().withMessage('age must be number'),
    body('level').isIn(['PreKG','KG1','KG2']).withMessage('level must be one of them [PreKG,KG1,KG2]'),
    body('address').isObject().withMessage('address must be object'),
    body('address.city').isString().withMessage('city must be string'),
    body('address.street').isString().withMessage('street must be string'),
    body('address.building').isString().withMessage('building must be string'),
]

// export put validator
exports.putValidator=[
    body('id').isNumeric().withMessage('id must be number'),
    body('fullName').optional().isLength({max:15}).withMessage('name must be at max 15 chars')
    .optional().isAlpha().withMessage('name must be alpha'),
    body('age').optional().isNumeric().withMessage('age must be number'),
    body('level').optional().isIn(['PreKG','KG1','KG2']).withMessage('level must be one of them [PreKG,KG1,KG2]'),
    body('address').isObject().withMessage('address must be object'),
    body('address.city').optional().isString().withMessage('city must be string'),
    body('address.street').optional().isString().withMessage('street must be string'),
    body('address.building').optional().isString().withMessage('building must be string'),
]

// export delete validator
exports.deleteValidator=[
    body('id').isNumeric().withMessage('id must be number')
]

// export get validator
exports.getValidator=[
    param('id').isNumeric().withMessage('id must be number')
]
