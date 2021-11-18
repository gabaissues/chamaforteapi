import mongoose from 'mongoose'
import { ILog } from '../interfaces/Logs.interfaces'

export default mongoose.model('Logs', new mongoose.Schema<ILog>({
    type: String,
    message: String,
    date: String
}))