import { Request, Response } from 'express'
import UsersModal from '../models/Users.models'

const modal = new UsersModal()

export default class Users {
    public async listen(req: Request, res: Response): Promise<void> {
        try {

            const users = await modal.listenUsers()
            res.status(200).send(users)

        } catch(e) {

            res.status(501).send({ message: e.message })
            
        }
    }

    public async listenUser(req: Request, res: Response): Promise<void> {
        try {

            const user = await modal.getUserById(req.params.id)
            res.status(200).send(user)

        } catch(e) {

            res.status(501).send({ message: e.message })

        }
    }

    public async token(req: Request, res: Response) {
        try {

            if(!req.headers.token) return res.status(401).send({ message: 'Falta contéudo no HEADER...' })

            const response = await modal.getUserByToken(String(req.headers.token))
            res.status(200).send({ user: response })    

        } catch(e) {

            res.status(404).send({ message: e })

        }
    }
    public async signIn(req: Request, res: Response) {
        try {

            if(!req.body.email || !req.body.password) return res.status(406).send({ message: 'Falta contéudo no BODY...'})

            const response = await modal.login(req.body)
            res.status(200).json({ token: response })

        } catch(e) {

            res.status(404).send({ message: 'Não consegui encontrar o usuário em nosso banco de dados.' })

        }
    }
    public async signUp(req: Request, res: Response){
        try {

            const user = await modal.registerUser(req.body)
            res.json({ token: user.token })

        } catch(e) {

            console.log(e)
            res.status(303).send({ message: e })

        }
    }
    public async delete(req: Request, res: Response) {
        try {

            if(!req.body.email) return res.status(406).send({ message: 'Falta contéudo no BODY...'})

            await modal.deleteUserByEmail(req.body.email)
            res.status(200).send({ message: 'Usuário deletado com sucesso.' })

        } catch(e) {

            res.status(501).send({ message: e.message })

        }
    }
    public async edit(req: Request, res: Response) {
        try {

            if(!req.params.email) return res.status(406).send({ message: 'Falta contéudo nos PARAMS...'})
            if(!req.body) return res.status(406).send({ message: 'Falta contéudo no BODY...'})
    
            await modal.editUserByEmail(req.params.email, req.body)
            res.status(200).send({ message: 'Usuário editado com sucesso.' })
    
        } catch(e) {

            res.status(501).send({ message: e })

        }
    }
}