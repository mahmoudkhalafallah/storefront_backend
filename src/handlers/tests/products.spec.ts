import supertest from 'supertest'
import app from '../../server'

let token: string

describe('POST /products', () => {
  it('should create a new product and respond with the newly created product', async () => {
    const request = await supertest(app)

    const { body } = await request.post('/users').send({
      firstName: 'test',
      lastName: 'user',
      password: '123',
    })

    token = body.token

    const res = await request
      .post('/products')
      .set('Authorization', 'Bearer ' + token)
      .send({
        name: 'apple',
        price: 100,
        category: 'fruits',
      })

    expect(res.headers['content-type']).toMatch(/json/)
    expect(res.status).toEqual(200)
    expect(res.body.id).toBeDefined()
    expect(res.body.name).toEqual('apple')
    expect(res.body.price).toEqual(100)
    expect(res.body.category).toEqual('fruits')
  })
})

describe('GET /products', () => {
  it('should get all products', async () => {
    const request = await supertest(app)

    const res = await request
      .get('/products')
      .set('Authorization', 'Bearer ' + token)

    expect(res.headers['content-type']).toMatch(/json/)
    expect(res.status).toEqual(200)
    expect(res.body.length).toBeGreaterThan(0)
  })
})

describe('GET /products/:id', () => {
  it('should get product by id', async () => {
    const request = await supertest(app)

    const res = await request
      .get('/products/1')
      .set('Authorization', 'Bearer ' + token)

    expect(res.headers['content-type']).toMatch(/json/)
    expect(res.status).toEqual(200)
    expect(res.body.id).toBe(1)
  })
})
