import Client from '../database'

//@TODO add tests

export type Product = {
  id?: number
  name: string
  price: number
  category?: string
}

export class ProductStore {
  index = async (): Promise<Product[]> => {
    const sql = 'SELECT * FROM products'
    try {
      const conn = await Client.connect()
      const result = await conn.query(sql)

      conn.release()

      return result.rows
    } catch (err) {
      throw new Error('Query failed! Error: ' + err)
    }
  }

  show = async (id: number): Promise<Product> => {
    const sql = 'SELECT * FROM products WHERE id=($1)'
    try {
      const conn = await Client.connect()
      const result = await conn.query(sql, [id])

      conn.release()

      return result.rows[0]
    } catch (err) {
      throw new Error('Query failed! Error: ' + err)
    }
  }

  create = async (p: Product): Promise<Product> => {
    try {
      const sql =
        'INSERT INTO products (name, price, category) VALUES($1, $2, $3) RETURNING *'
      const conn = await Client.connect()

      const result = await conn.query(sql, [p.name, p.price, p.category])

      conn.release()

      return result.rows[0]
    } catch (err) {
      throw new Error('Query failed! Error: ' + err)
    }
  }
}
