import { Router } from 'express'
import Orders from '../controllers/Orders.controllers'
const router = Router()

const orders = new Orders()

router.get('/listen', orders.listen)//Lista todos os pedidos da empresa
router.get('/listen/:email', orders.listenOrder)//Lista todos os pedidos de um certo email.

router.post('/create', orders.create)//Cria um pedido
router.post('/invoice/:email', orders.invoice)//Gera uma fatura de um pedido

router.put('/edit/:id', orders.edit)//Edita um pedido da empresa

router.delete('/delete/:id', orders.delete)//Deleta um pedido da empresa

export default router;