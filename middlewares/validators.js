
//Validar campos en las rutas
import { body } from "express-validator"
import { validateErrors, validateErrorsWithoutFiles } from "./validate.errors.js"
import { existEmail, existUsername, existCompany,  } from "../utils/db.validators.js"

//Arreglo de validaciones (por cada ruta)
export const registerValidator = [
    body('name', 'Name cannot be empty')
        .notEmpty(),
    body('surname', 'Surname cannot be empty')
        .notEmpty(),
        body('username', 'Username cannot be empty')
        .notEmpty()
        .toLowerCase(),
    body('email', 'Email cannot be empty')
        .notEmpty()
        .isEmail()
        .custom(existEmail),
    body('username')
        .notEmpty()
        .toLowerCase()
        .custom(existUsername),
    body('password', 'Password cannot be empty')
        .notEmpty()
        .isStrongPassword()
        .withMessage('Password must be strong')
        .isLength({min: 8})
        .withMessage('Password need min characters'),
    validateErrors
]

export const companyValidator = [
    body('name', 'Name cannot be empty')
    .notEmpty()
    .custom(existCompany),
    body('address', 'Address cannot be empty')
    .notEmpty(),
    body('phone', 'Phone cannot be empty')
    .notEmpty(),
    body('yearExperience', 'Year experience cannot be empty')
    .notEmpty(),
    body('impactLevel', 'Impact level cannot be empty')
    .notEmpty(),
    body('category', 'Category cannot be empty')
    .notEmpty(),
    validateErrors
]


