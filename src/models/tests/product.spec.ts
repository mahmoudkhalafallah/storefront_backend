import { Product } from './../product'
import { ProductStore } from '../product'

const store = new ProductStore()

describe('Product Model', () => {
  let product: Product

  it('create method should add a product', async () => {
    expect(store.create).toBeDefined()

    const result = await store.create({
      name: 'apple',
      price: 100,
      category: 'fruits',
    })

    product = result

    expect(result.id).toBeDefined()
    expect(result.name).toEqual('apple')
    expect(result.price).toEqual(100)
    expect(result.category).toEqual('fruits')
  })

  it('should get all products using index method', async () => {
    expect(store.index).toBeDefined()
    const result = await store.index()
    expect(result.length).toBeTruthy()
  })

  it('should get the product by id using show method', async () => {
    expect(store.show).toBeDefined()
    const result = await store.show(product.id as number)
    expect(result.id).toBeDefined()
    expect(result.name).toBeDefined()
    expect(result.price).toBeDefined()
  })
})
