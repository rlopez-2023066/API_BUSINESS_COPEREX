import {Router} from 'express'

import {
    addCompany,
    listCompany,
    updateCompany,

    listCompanyYear,
    listCompanyCata,
    listCompanyAZ,
    listCompanyZA
    
} from '../company/company.controller.js'

import {
    isAdmin,
    validateJwt
} from '../../middlewares/validate.jwt.js'
import { companyValidator } from '../../middlewares/validators.js'


const api = Router()

api.post('/addCompany', validateJwt, isAdmin , companyValidator, addCompany)
api.get('/listCompany', validateJwt, isAdmin, listCompany)
api.put('/updateCompany/:id', validateJwt, isAdmin, updateCompany)

//Busquedas Personalizadas
//Años de Trayectoria
api.get('/listCompanyYear/:yearExperienceParam', validateJwt, isAdmin, listCompanyYear)

//Categoria 
api.get('/listCompanyCata/:categoryId', validateJwt, isAdmin, listCompanyCata)

//List AZ
api.get('/listCompanyAZ', validateJwt, isAdmin, listCompanyAZ)

//List ZA
api.get('/listCompanyZA', validateJwt, isAdmin, listCompanyZA)

export default api