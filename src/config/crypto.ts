import crypto from 'crypto-js'
const secret = process.env.Crypto

export const encrypt = (message: string) => crypto.AES.encrypt(message, secret).toString()
export const decrypt = (message: string) => crypto.AES.decrypt(message, secret).toString(crypto.enc.Utf8)