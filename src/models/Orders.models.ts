import mercadopago from 'mercadopago'

import { IOrder } from '../interfaces/Orders.interfaces'

import OrdersServices from '../services/Orders.services'
import OrdersSchema from '../schemas/Orders.schemas'

interface ICreateLink {
    names: string,
    ids: string,
    soma: number
}

export default class OrdersModal extends OrdersServices {

    public async listenOrders() {

        const orders: IOrder[] = await OrdersSchema.find()
        return orders

    }

    public async listenOrder(email: string) {

        const orders = await this.getOrdersByEmail(email)
        return orders

    }

    public async listenOrdersByEmailAndFilteredByStatus(email: string, status: string) {

        const orders = await this.getOrdersByEmail(email)
        const ordersFiltered = orders.filter(x => x.status === status)

        return ordersFiltered

    }

    public async editOrder(id: string, edit: IOrder) {

        const order = await this.editOrderById(id, edit)
        return order

    }

    public async deleteOneById(_id: string) {

        await OrdersSchema.deleteOne({ _id })

    }

    public async createOrder(options: IOrder) {

        let order = options
        const orders = await this.listenOrders()

        order.id = orders.length + 1

        const orderResult = await new OrdersSchema(order).save()
        return orderResult

    }

    public async createLink(options: ICreateLink) {

        const time = new Date()

        const hours = time.getHours()
        time.setHours(hours + 24)

        const preference = {
            items: [
                {
                    title: `Fatura - ${options.names}`,
                    unit_price: options.soma,
                    quantity: 1
                }
            ],
            expires: true,
            date_of_expiration: new Date(time),
            notification_url: process.env.Notification_URL
        }

        const link = await mercadopago.preferences.create(preference)
        return link

    }

}