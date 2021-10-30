import jwt from 'jsonwebtoken';
const secret = 'JWT-3xLrb5MHibPBVexZxzG2w1DhyvqjtDR4'

export const sign = (options: object) => jwt.sign(options, secret)
export const verify = (token: string) => jwt.verify(token, secret)