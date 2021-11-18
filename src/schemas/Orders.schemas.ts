import mongoose from 'mongoose'
import { IOrder } from '../interfaces/Orders.interfaces'

export default mongoose.model('Orders', new mongoose.Schema<IOrder>({
    id: Number,
    client: Object,
    status: String,
    equipment: String,
    brand: String,
    problem: String,
    date: String,
    value: Number,
    comments: String,
    tech: String,
    pieces: Array,
    images: Array
}))