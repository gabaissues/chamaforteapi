import mercadopago from 'mercadopago'

import PaymentSchema from '../schemas/Payment.schemas';
import { IPayment } from '../interfaces/Payment.interfaces'

export default class PaymentModal {
    public async getPayments() {

        const payments = await PaymentSchema.find()
        return payments

    }

    public async createPayment(options: IPayment) {

        const payment = await new PaymentSchema(options).save()
        return payment

    }

    public async getPaymentByPaymentId(id: string) {

        const payment = await PaymentSchema.findOne({ payment_id: id })
        if(!payment) throw "O pagamento não foi encontrado."

        return payment

    }
    
    public async getPaymentByIdUsingMP(id: number) {

        try {

            const payment = await mercadopago.payment.get(id)
            return payment

        } catch(e) {

            throw "O pagamento não foi encontrado."

        }

    }
}