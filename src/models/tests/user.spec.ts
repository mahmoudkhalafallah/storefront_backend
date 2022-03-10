import { User } from './../user'
import { UserStore } from '../user'
import bcrypt from 'bcrypt'

const store = new UserStore()

describe('User Model', () => {
  let user: User
  it('should add a user when calling create method', async () => {
    expect(store.create).toBeDefined()

    const pepper = process.env.BCRYPT_PASSWORD

    const result = await store.create({
      first_name: 'test',
      last_name: 'user',
      password: '123',
    })

    user = result

    expect(result.first_name).toEqual('test')
    expect(result.last_name).toEqual('user')
    expect(bcrypt.compareSync('123' + pepper, result.password)).toBeTrue() //compare
  })

  it('should get all users using index method', async () => {
    expect(store.index).toBeDefined()
    const result = await store.index()
    expect(result.length).toBeTruthy()
  })

  it('should get the user by id using show method', async () => {
    expect(store.show).toBeDefined()
    const result = await store.show(user.id as unknown as string)
    expect(result.id).toBe(user.id)
    expect(result.first_name).toBe(user.first_name)
    expect(result.last_name).toBe(user.last_name)
  })
})
