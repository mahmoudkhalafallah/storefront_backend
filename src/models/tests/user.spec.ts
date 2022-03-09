import { UserStore } from '../user'
import bcrypt from 'bcrypt'

const store = new UserStore()

describe('User Model', () => {
  it('should have index method', () => {
    expect(store.index).toBeDefined()
  })

  it('should have a show method', () => {
    expect(store.show).toBeDefined()
  })

  it('should have a create method', () => {
    expect(store.create).toBeDefined()
  })

  it('create method should add a user', async () => {
    const pepper = process.env.BCRYPT_PASSWORD

    const result = await store.create({
      first_name: 'test',
      last_name: 'user',
      password: '123',
    })

    expect(result.first_name).toEqual('test')
    expect(result.last_name).toEqual('user')
    expect(bcrypt.compareSync('123' + pepper, result.password)).toBeTrue() //compare
  })
})
