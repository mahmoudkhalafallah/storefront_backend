import supertest from 'supertest'
import jwt, { JwtPayload, Secret } from 'jsonwebtoken'
import app from '../../server'

let token: string

describe('POST /users', () => {
  it('should create a new user and respond with the newly created user', async () => {
    const request = await supertest(app)

    const res = await request.post('/users').send({
      firstName: 'test',
      lastName: 'user',
      password: '123',
    })

    token = res.body.token

    const { user } = getPayloadFromToken()

    expect(res.headers['content-type']).toMatch(/json/)
    expect(res.status).toEqual(200)
    expect(user.id).toBeDefined()
    expect(jwt.verify(token, process.env.TOKEN_SECRET as Secret)).toBeTruthy()
  })
})

describe('GET /users', () => {
  it('should get all users', async () => {
    const request = await supertest(app)

    const res = await await request
      .get('/users')
      .set('Authorization', 'Bearer ' + token)

    expect(res.headers['content-type']).toMatch(/json/)
    expect(res.status).toEqual(200)
    expect(res.body.length).toBeGreaterThan(0)
  })
})

describe('GET /users/:id', () => {
  it('should get user by id', async () => {
    const request = await supertest(app)

    const res = await request
      .get('/users/1')
      .set('Authorization', 'Bearer ' + token)

    expect(res.headers['content-type']).toMatch(/json/)
    expect(res.status).toEqual(200)
    expect(res.body.id).toBe(1)
  })
})
function getPayloadFromToken(): JwtPayload {
  return jwt.decode(token) as JwtPayload
}
