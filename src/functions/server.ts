import users from '../routes/users'

import cors from 'cors'
import express from 'express';

export default class Express {

    public express: express.Application;
    private port: number;

    constructor(port: number) {

        console.log('[express] Express iniciado com sucesso.')

        this.port = port
        this.express = express()

        this.listen()
        this.middlewares()
        this.routes()

    }

    public listen() {

        return this.express.listen(this.port, () => console.log('[express] Servidor iniciado na porta ' + this.port))

    }

    private middlewares() {

        this.express.use(express.json())
        this.express.use(cors())

    }

    private routes() {

        this.express.use('/users', users)//Carregando a ROTA de autenticação

    }

    public app() {
        return this.express
    }

}