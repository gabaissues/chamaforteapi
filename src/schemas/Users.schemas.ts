import mongoose from 'mongoose'
import { encrypt } from '../config/crypto'
import { IUser } from '../interfaces/Users.interfaces'

export default mongoose.model('Users', new mongoose.Schema<IUser>({
    name: String,
    telephone: String,
    documentation: String,
    typeDocumentation: String,
    email: String,
    password: {
        type: String,
        required: true,
        select: false,
        set: (value: string) => encrypt(value)
    },
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