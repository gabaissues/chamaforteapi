import mercadopago from 'mercadopago'

mercadopago.configure({
    sandbox: true,
    access_token: process.env.AcessTokenTST
})