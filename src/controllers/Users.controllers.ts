import { Request, Response } from 'express'
import { HttpStatus } from "../errors/error.handler.enum";

import UsersModal from '../models/Users.models'

const modal = new UsersModal()

export default class Users {
    public async listen(req: Request, res: Response): Promise<void> {

        const users = await modal.listenUsers()
        res.status(200).send(users)

    }
    public async token(req: Request, res: Response) {
        try {

            if(!req.headers.token) return res.status(401).send({ message: 'Falta contéudo no HEADER...' })

            const response = await modal.getUserByToken(String(req.headers.token))
            res.status(200).send({ user: response })    

        } catch(e) {

            res.status(404).send({ message: 'TOKEN inválido.' })

        }
    }
    public async signIn(req: Request, res: Response) {
        
        try {

            if(!req.body.email || !req.body.password) return res.status(406).send({ message: 'Falta contéudo no BODY...'})

            const response = await modal.login(req.body)
            res.status(200).json({ token: response })

        } catch(e) {

            console.log(e)
            res.status(404).send({ message: 'Não consegui encontrar o usuário.' })

        }

    }
    public async signUp(req: Request, res: Response): Promise<void> {
        try {

            const user = await modal.registerUser(req.body)
            res.json({ token: user.token })

        } catch(e) {

            res.status(303).send({ message: e })

        }
    }
    public async delete(req: Request, res: Response): Promise<void> {

        await modal.deleteUserByEmail(req.body.email)
        res.status(200).send({ message: 'Usuário deletado com sucesso' })

    }
}