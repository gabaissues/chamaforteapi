import { IOrder } from '../interfaces/Orders.interfaces'
import OrdersSchema from '../schemas/Orders.schemas'

export default class OrdersServices {
    public async getOrdersByEmail(email: string) {

        const orders = await OrdersSchema.find({ email })
        return orders

    }

    public async editOrderById(_id: string, edit: IOrder) {

        return await OrdersSchema.updateOne({ _id }, edit)

    }

    public async getOrders() {

        const orders = await OrdersSchema.find()
        return orders

    }
}