import { Router } from 'express'
const router = Router()

import Users from '../controllers/Users.controllers'
const users = new Users()

router.get('/listen', users.listen)//Lista todos os usuários
router.get('/token', users.token)//Verifica se um token é válido
router.post('/sign-in', users.signIn)//Loga um usuário e fornece um TOKEN
router.post('/sign-up', users.signUp)//Cadastra um usuário e retorna um TOKEN
router.delete('/delete', users.delete)//Deleta um usuário

export default router;