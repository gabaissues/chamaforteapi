import { IOrder } from '../interfaces/Orders.interfaces'
import OrdersSchema from '../schemas/Orders.schemas'

export default class OrdersServices {
    public async getOrdersByEmail(tech: string) {

        const orders = await OrdersSchema.find({ tech })
        return orders

    }

    public async editOrderById(id: number, edit: IOrder) {

        if(isNaN(id)) throw "O ID é inválido"
        
        const order = await OrdersSchema.findOne({ id })
        if(!order) throw "O ID é inválido"

        const orderUpdated = await order.updateOne(edit)
        return orderUpdated

    }

    public async getOrders() {

        const orders = await OrdersSchema.find()
        return orders

    }
}