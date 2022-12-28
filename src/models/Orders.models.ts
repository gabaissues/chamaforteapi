import mercadopago from "mercadopago";
import { IOrder } from "../interfaces/Orders.interfaces";
import OrdersServices from "../services/Orders.services";
import OrdersSchema from "../schemas/Orders.schemas";

interface ICreateLink {
  names: string;
  ids: string;
  soma: number;
}

export default class OrdersModal extends OrdersServices {
  public async listenOrders(): Promise<IOrder[]> {
    const orders: IOrder[] = await OrdersSchema.find();
    return orders;
  }

  public async listenOrder(tech: string): Promise<IOrder[]> {
    const orders = await this.getOrdersByEmail(tech);
    return orders;
  }

  public async listenOrdersByEmailAndFilteredByStatus(
    email: string,
    status: string
  ): Promise<IOrder[]> {
    const orders = await this.getOrdersByEmail(email);
    const ordersFiltered = orders.filter((x) => x.status === status);

    return ordersFiltered;
  }

  public async editOrder(id: string, edit: IOrder): Promise<IOrder> {
    const order: IOrder = await this.editOrderById(+id, edit);
    return order;
  }

  public async deleteOneById(id: string): Promise<void> {
    await OrdersSchema.deleteOne({ id: +id });
  }

  public async createOrder(options: IOrder): Promise<IOrder> {
    let order = options;
    const orders = await this.listenOrders();

    order.id = ++orders.length;

    const orderResult = await new OrdersSchema(order).save();
    return orderResult;
  }

  public async createLink(options: ICreateLink): Promise<any> {
    const time = new Date();

    const hours = time.getHours();
    time.setHours(hours + 24);

    const preference = {
      items: [
        {
          title: `Fatura - ${options.names}`,
          unit_price: options.soma,
          quantity: 1,
        },
      ],
      expires: true,
      notification_url: process.env.Notification_URL,
    };

    const link = await mercadopago.preferences.create(preference);
    return link;
  }
}
