import { Router } from 'express'
const router = Router()

import Users from '../controllers/Users.controllers'
const users = new Users()

router.get('/listen', users.listen)//Lista todos os usuários
router.get('/listen/:id', users.listenUser)//Lista um usuário em especifico
router.get('/token', users.token)//Verifica se um token é válido

router.put('/edit/:email', users.edit)//Edita um usuário

router.post('/sign-in', users.signIn)//Loga um usuário e fornece um TOKEN
router.post('/sign-up', users.signUp)//Cadastra um usuário e retorna um TOKEN

router.delete('/delete', users.delete)//Deleta um usuário

export default router;