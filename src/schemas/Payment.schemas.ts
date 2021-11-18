import mongoose from 'mongoose'
import { IPayment } from '../interfaces/Payment.interfaces'

export default mongoose.model('Payments', new mongoose.Schema<IPayment>({
    payment_id: String,
    tech: String,
    value: Number,
    pieces: String
}))