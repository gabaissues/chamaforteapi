import { IOrder } from "./Orders.interfaces";
import { IStock } from "./Stock.interfaces";

export interface IUser {
    id?: string,
    name: string,
    telephone: string,
    documentation: string,
    typeDocumentation: string,
    email: string,
    password: string,
    status: string,
    role: string,
    earn: number,
    marketValue: number,
    orders: IOrder[],
    invoices: IOrder[],
    stock: IStock[],
    location: {
        street: string,
        district: string,
        cep: number,
        city: string,
        country: string,
    }
    statistics: {
        month: number,
        week: number,
        total: number
    }
}