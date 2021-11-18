import { IStock } from './Stock.interfaces'

export interface IPayment {
    payment_id: string,
    tech: string,
    value: number,
    pieces: string
}