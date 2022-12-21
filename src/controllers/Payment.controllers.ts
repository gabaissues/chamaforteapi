import mercadopago from 'mercadopago'
import { Request, Response } from 'express'

import OrdersModal from '../models/Orders.models'
import PaymentModal from '../models/Payment.models'
import UsersModal from '../models/Users.models'
import { IStock } from '../interfaces/Stock.interfaces'
import LogsModal from '../models/Logs.models'

const modal = new PaymentModal()
const ordersModal = new OrdersModal()
const usersModal = new UsersModal()

export default class PaymentController {
    public async listen(req: Request, res: Response) {

        const payments = await modal.getPayments()
        res.status(200).send(payments)

    }

    public listenAId(req: Request, res: Response) {



    }

    public async create(req: Request, res: Response) {

        if (!req.query.id || !req.query.topic) return res.status(206).send({ message: 'Falta contéudo na QUERY...' })
        if (req.query.topic != "payment") return res.status(404).send({ message: 'O tópico não é de pagamento...' })

        try {

            const paymentMp = await modal.getPaymentByIdUsingMP(Number(req.query.id))
            const paymentDb = await modal.getPaymentByPaymentId(`${paymentMp.response.collector_id}`)

            if (paymentMp.body.status != "approved") return res.status(404).send({ message: 'O pagamento não foi aprovado...' })

            res.status(200).send({ message: 'Pagamento CRIADO com sucesso.' })

            //Buscando os ORDERS
            const orders = await ordersModal.getOrdersByEmail(paymentDb.tech)

            //Atualizando os ORDERS

            //O = Order
            orders.forEach((o) => {

                ordersModal.editOrderById(o._id, {
                    id: o.id,
                    client: o.client,
                    images: o.images,
                    value: o.value,
                    equipment: o.equipment,
                    brand: o.brand,
                    problem: o.problem,
                    date: o.date,
                    comments: o.comments,
                    tech: o.tech,
                    pieces: o.pieces,
                    status: 'pago'
                })

            })

            //Buscando o técnico 
            const tech = await usersModal.getUserByEmail(paymentDb.tech)
            if (!tech) return res.status(404).send({ message: 'Não foi encontrado o técnico' })

            //Novo estoque
            const stock: IStock[] = []

            //Adicionando o novo estoque
            tech.stock.forEach((s) => {
                paymentDb.pieces.split(',').forEach((p) => {

                    if (s.piece === p) {

                        stock.push({ piece: s.piece, quantity: s.quantity - 1, value: s.value, pieceId: s.pieceId })

                    } else {

                        stock.push({ piece: s.piece, quantity: s.quantity, value: s.value, pieceId: s.pieceId })

                    }

                })
            })

            //Editando o técnico
            await usersModal.editUserByEmail(paymentDb.tech, {
                name: tech.name,
                telephone: tech.telephone,
                documentation: tech.documentation,
                typeDocumentation: tech.typeDocumentation,
                email: tech.email,
                password: tech.password,
                status: tech.status,
                role: tech.role,
                earn: tech.earn,
                marketValue: tech.marketValue,
                orders: tech.orders,
                invoices: tech.invoices,
                location: tech.location,
                statistics: tech.statistics,
                stock: stock
            })

            new LogsModal().create({
                type: 'info',
                message: `O ${tech.name} teve suas faturas pagas no dia ${new Date().toLocaleString('pt-br')}, e as peças usadas já foram removidas do banco de dados.`,
                date: new Date().toLocaleString('pt-br')
            })

            /*
            
                [x] - Pegar todos as informações
                [x] - Buscar o técnico
                [x] - Setar como PAGO todas as faturas do técnico
                [x] - Remover as peças usadas do estoque do técnico
                [x] - Criar uma LOG informado que o pagamento do técnico tal foi aprovado
                [] - Enviar a fatura pelo Whatsapp

            */

        } catch (e) {

            res.status(501).send({ message: e })

        }
    }

    public async delete(req: Request, res: Response) {



    }
}
