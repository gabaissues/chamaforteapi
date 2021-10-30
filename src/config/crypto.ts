import crypto from 'crypto-js'
const secret = "CRYPTO-%40z6I$JUQE7&IpX$MZ%XmMf77V&2xst"

export const encrypt = (message: string) => crypto.AES.encrypt(message, secret).toString()
export const decrypt = (message: string) => crypto.AES.decrypt(message, secret).toString(crypto.enc.Utf8)