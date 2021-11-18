import mongoose from 'mongoose'
import { IUser } from '../interfaces/Users.interfaces'

export default mongoose.model('Users', new mongoose.Schema<IUser>({
    name: String,
    telephone: String,
    documentation: String,
    typeDocumentation: String,
    email: String,
    password: String,
    status: String,
    role: String,
    earn: Number,
    marketValue: Number,
    orders: Array,
    invoices: Array,
    stock: Array,
    location: Object,
    statistics: Object
}))