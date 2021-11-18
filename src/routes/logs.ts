import { Router } from 'express'
import LogsController from '../controllers/Logs.controllers';
const router = Router()

const controller = new LogsController()

router.get('/listen', controller.listen)
router.post('/create', controller.create)
router.delete('/delete/:id', controller.delete)

export default router;