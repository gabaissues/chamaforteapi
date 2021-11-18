import dotenv from 'dotenv'
dotenv.config()

import './connections/mongoose'
import './connections/mercadopago'

import app from './config/express'
app.listen(3333, () => console.log('[express] Express iniciado na porta 3333'))