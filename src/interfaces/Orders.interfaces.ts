export interface IOrder {
    client: {
        name: string,
        telephone: string,
        address: string,
    },
    status: string,
    equipment: string,
    brand: string,
    problem: string,
    date: string
    hour: string,
    value: number,
    comments: string
    images: string[],
}