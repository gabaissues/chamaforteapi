
import PaymentSchema from '../schemas/Payment.schemas';
import { IPayment } from '../interfaces/Payment.interfaces'

export default class PaymentModal {
    public async createPayment(options: IPayment) {

        const payment = await new PaymentSchema(options).save()
        return payment

    }
}