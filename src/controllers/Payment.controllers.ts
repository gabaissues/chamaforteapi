import mercadopago from 'mercadopago'
import { Request, Response } from 'express'

import OrdersModal from '../models/Orders.models'
import PaymentModal from '../models/Payment.models'

const modal = new PaymentModal()
const ordersModal = new OrdersModal()

export default class PaymentController {
    public async listen(req: Request, res: Response) {

        const payments = await modal.getPayments()
        res.status(200).send(payments)

    }

    public listenAId(req: Request, res: Response) {



    }

    public async create(req: Request, res: Response) {

        if(!req.query.id || !req.query.topic) return res.status(206).send({ message: 'Falta contéudo na QUERY...' })
        if(req.query.topic != "payment") return res.status(404).send({ message: 'O tópico não é de pagamento...' })

        try {

            const paymentMp = await modal.getPaymentByIdUsingMP(Number(req.query.id))
            const paymentDb = await modal.getPaymentByPaymentId(`${paymentMp.response.collector_id}`)

            if(paymentMp.body.status != "approved") return res.status(404).send({ message: 'O pagamento não foi aprovado...' })
            
            res.status(200).send({ message: 'Pagamento CRIADO com sucesso.'})

            //Buscando os ORDERS
            const orders = await ordersModal.getOrdersByEmail(paymentDb.tech)

            //Atualizando os ORDERS
            orders.forEach(x => {

                ordersModal.editOrderById(x._id, { 
                    id: x.id,
                    client: x.client,
                    images: x.images,
                    value: x.value,
                    equipment: x.equipment,
                    brand: x.brand,
                    problem: x.problem,
                    date: x.date,
                    comments: x.comments,
                    tech: x.tech,
                    pieces: x.pieces,
                    status: 'pago'
                })
                
            })

            /*
            
                [x] - Pegar todos as informações
                [x] - Buscar o técnico
                [x] - Setar como PAGO todas as faturas do técnico
                [] - Remover as peças usadas do estoque do técnico
                [] - Criar uma LOG informado que o pagamento do técnico tal foi aprovado

            */

        } catch(e) {

            res.status(501).send({ message: e })

        }
    }

    public async delete(req: Request, res: Response) {

        

    }
}
