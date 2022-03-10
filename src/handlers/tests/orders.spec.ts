import supertest from 'supertest'
import jwt, { JwtPayload } from 'jsonwebtoken'
import app from '../../server'

let token: string

describe('POST /orders', () => {
  it('should create a new order and respond with the newly created order', async () => {
    const request = await supertest(app)

    const { body } = await request.post('/users').send({
      firstName: 'test',
      lastName: 'user',
      password: '123',
    })

    token = body.token

    const { user } = jwt.decode(token) as JwtPayload

    const res = await request
      .post('/orders')
      .set('Authorization', 'Bearer ' + token)
      .send({
        status: 'active',
        userId: user.id,
      })

    expect(res.headers['content-type']).toMatch(/json/)
    expect(res.status).toEqual(200)
    expect(res.body.id).toBeDefined()
    expect(+res.body.user_id).toEqual(user.id)
    expect(res.body.status).toEqual('active')
  })
})

describe('GET /orders', () => {
  it('should get all orders', async () => {
    const request = await supertest(app)

    const res = await request
      .get('/orders')
      .set('Authorization', 'Bearer ' + token)

    expect(res.headers['content-type']).toMatch(/json/)
    expect(res.status).toEqual(200)
    expect(res.body.length).toBeGreaterThan(0)
  })
})

describe('GET /orders/:id', () => {
  it('should get order by id', async () => {
    const request = await supertest(app)

    const res = await request
      .get('/orders/1')
      .set('Authorization', 'Bearer ' + token)

    expect(res.headers['content-type']).toMatch(/json/)
    expect(res.status).toEqual(200)
    expect(res.body.id).toBe(1)
  })
})
