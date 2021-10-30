import { decrypt } from '../config/crypto';

import UsersModal from "../models/Users.models";
import UsersSchema from '../schemas/Users.schemas'

export default class UsersServices {
    public async getUserByEmail(email: string) {

        const user = await UsersSchema.findOne({ email })
        return user

    }

    public async getUserById(id: string) {

        const user = await UsersSchema.findOne({ id })
        return user

    }

    public async verifyUserByEmail(email: string) {

        const user = await UsersSchema.findOne({ email })
        if(user) throw "O usuário existe"

        return user

    }

    public async verifyPassword(password: string, expected: string) {

        const passwordDecrypted = decrypt(password)
        if(passwordDecrypted != expected) throw "A senha esperada não coincide com a registrada"

        return passwordDecrypted

    }
}