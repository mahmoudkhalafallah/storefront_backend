import { ProductStore } from '../product'

const store = new ProductStore()

describe('Product Model', () => {
  it('should have index method', () => {
    expect(store.index).toBeDefined()
  })

  it('should have a show method', () => {
    expect(store.show).toBeDefined()
  })

  it('should have a create method', () => {
    expect(store.create).toBeDefined()
  })

  it('create method should add an product', async () => {
    const result = await store.create({
      name: 'apple',
      price: 100,
      category: 'fruits',
    })

    expect(result.id).toBeDefined()
    expect(result.name).toEqual('apple')
    expect(result.price).toEqual(100)
    expect(result.category).toEqual('fruits')
  })
})
