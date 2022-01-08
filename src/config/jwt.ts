import jwt from 'jsonwebtoken';
const secret = process.env.JWT

export const sign = (options: object) => jwt.sign(options, secret)
export const verify = (token: string) => jwt.verify(token, secret)