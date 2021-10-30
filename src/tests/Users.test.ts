
import Express from '../functions/server'

import request from 'supertest'

let testing = new Express(3333)

describe('Testing route USERS', () => {
    it('Testing this Test', () => {

        const result = true
        expect(result).toBe(true)

    })

    it('Get all users', async () => {

        const res = await request(testing.express).get('/users/listen')
        expect(res.status).toBe(200)

    })
}) 