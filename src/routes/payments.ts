import PaymentController from '../controllers/Payment.controllers'

import { Router } from 'express'
const router = Router()

const controller = new PaymentController()

router.get('/listen', controller.listen)
router.get('/listen/:id', controller.listenAId)
router.post('/create', controller.create)
router.delete('/delete/:id', controller.delete)

export default router;