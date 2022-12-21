import * as jwt from '../config/jwt'
import { ILogin } from '../interfaces/Login.interfaces'

import { IUser } from '../interfaces/Users.interfaces'

import UsersSchema from '../schemas/Users.schemas'
import UsersServices from '../services/Users.services'

export default class UsersModal extends UsersServices {
    public async listenUsers() {

        const users = await UsersSchema.find()
        return users

    }

    public async registerUser(options: IUser) {

        await this.verifyUserByEmail(options.email)

        const user = await new UsersSchema(options).save()
        const token = jwt.sign({ user: user.id })

        return {
            user,
            token
        }

    }

    public async login(options: ILogin) {

        const account = await this.getUserByEmail(options.email)
        if(!account) throw "O usuário não foi encontrado."

        const token = jwt.sign({ user: account.id })
        return token

    }

    public getUserByToken(token: string) {

        const account = jwt.verify(token)
        if(!account.user) throw "Esse TOKEN é inválido.";

        return this.getUserById(account.user)

    }

    public async deleteUserByEmail(email: string) {

        await UsersSchema.findOneAndDelete({ email })

    }
    public async editUserByEmail(email: string, options: IUser) {

        await UsersSchema.findOneAndUpdate({ email }, options)

    }
}