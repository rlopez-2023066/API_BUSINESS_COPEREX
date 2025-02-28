'use strict'

//ECModules | ESModules
import express from 'express' //Servidor HTTP
import morgan from 'morgan' //Logs
import helmet from 'helmet' //Seguridad para HTTP
import cors from 'cors' //Acceso al API
import {limiter} from '../middlewares/rate.limit.js'


import authRoutes from '../src/auth/auth.routes.js'
import companyRoutes from '../src/company/company.routes.js'
 

const configs = (app)=> {
    app.use(express.json()) 
    app.use(express.urlencoded({extended: false})) 
    app.use(cors())
    app.use(helmet())
    app.use(morgan('dev'))
    app.use(limiter)
}

const routes = (app)=> {
    app.use(authRoutes)
    app.use('/company', companyRoutes)
}

export const initServer = ()=> {
    const app = express() 
    try {
        configs(app)

        routes(app)

        app.listen(process.env.PORT)
        
        console.log(`Server running in port ${process.env.PORT}`)
    } catch (err) {
        console.error('Server init failed', err)
    }
}
