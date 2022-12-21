import { decrypt } from '../config/crypto';

import UsersModal from "../models/Users.models";
import UsersSchema from '../schemas/Users.schemas'

export default class UsersServices {
    public async getUserByEmail(email: string) {

        const user = await UsersSchema.findOne({ email })
        return user

    }

    public async getUserById(id: string) {

        const user = await UsersSchema.findOne({ _id: id })
        return user

    }

    public async verifyUserByEmail(email: string) {

        const user = await UsersSchema.findOne({ email })
        if(user) throw "O usuário já existe em nosso banco de dados."

        return user

    }

    public async verifyPassword(password: string, expected: string) {

        if(password != expected) throw "A senha esperada não coincide com a registrada."
        return password

    }
}