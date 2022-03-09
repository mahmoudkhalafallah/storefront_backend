import { UserStore } from '../user'
import { OrderStore } from '../order'

const store = new OrderStore()
const userStore = new UserStore()

describe('Order Model', () => {
  it('should have index method', () => {
    expect(store.index).toBeDefined()
  })

  it('should have a show method', () => {
    expect(store.show).toBeDefined()
  })

  it('should have a create method', () => {
    expect(store.create).toBeDefined()
  })

  it('should have a currentOrderByUserId method', () => {
    expect(store.currentOrderByUserId).toBeDefined()
  })

  it('create method should add an order', async () => {
    const user = await userStore.create({
      first_name: 'test',
      last_name: 'user',
      password: '123',
    })
    const result = await store.create({
      status: 'active',
      user_id: user.id as unknown as string,
    })
    expect(result.status).toEqual('active')
    expect(+result.user_id).toEqual(user.id as unknown as number)
  })
})
