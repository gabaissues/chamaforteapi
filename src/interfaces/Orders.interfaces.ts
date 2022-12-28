import { IStock } from "./Stock.interfaces";

export interface IOrder {
    _id?: number,
    id: number,
    client: {
        name: string,
        telephone: string,
        address: string,
    },
    status: string,
    equipment: string,
    brand: string,
    problem: string,
    date: string,
    value: number,
    comments: string,
    tech: string,
    pieces: IStock[],
    images: string[],
}