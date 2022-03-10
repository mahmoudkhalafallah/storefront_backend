import { User, UserStore } from '../user'
import { Order, OrderStore } from '../order'

const store = new OrderStore()
const userStore = new UserStore()

describe('Order Model', () => {
  let user: User
  let order: Order

  beforeAll(async () => {
    user = await userStore.create({
      first_name: 'test',
      last_name: 'user',
      password: '123',
    })
  })

  it('should add an order when calling create method ', async () => {
    expect(store.create).toBeDefined()

    const result = await store.create({
      status: 'active',
      user_id: user.id as string,
    })

    order = result

    expect(result.status).toEqual('active')
    expect(+result.user_id).toEqual(user.id as number)
  })

  it('should get all orders using index method', async () => {
    expect(store.index).toBeDefined()
    const result = await store.index()
    expect(result.length).toBeTruthy()
  })

  it('should get the order by id using show method', async () => {
    expect(store.show).toBeDefined()
    const result = await store.show(order.id as unknown as string)
    expect(result.id).toBeDefined()
    expect(result.user_id).toBeDefined()
    expect(result.status).toBeDefined()
  })

  it('should get the current order by user id using currentOrderByUserId method', async () => {
    expect(store.currentOrderByUserId).toBeDefined()
    const result = await store.currentOrderByUserId(user.id as string)

    expect(result.status).toEqual('active')
    expect(+result.user_id).toEqual(user.id as number)
  })
})
