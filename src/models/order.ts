import Client from '../database'

//@TODO add tests

export type Order = {
  id: number
  name: string
  price: number
  category?: string
}

export class OrderStore {
  index = async (): Promise<Order[]> => {
    const sql = 'SELECT * FROM orders;'
    try {
      const conn = await Client.connect()
      const result = await conn.query(sql)

      const orders = result.rows[0]

      conn.release()

      return orders
    } catch (err) {
      throw new Error('Query failed! Error: ' + err)
    }
  }

  show = async (id: string): Promise<Order[]> => {
    const sql = 'SELECT * FROM orders WHERE id=($1)'
    try {
      const conn = await Client.connect()
      const result = await conn.query(sql, [id])

      const order = result.rows[0]

      conn.release()

      return order
    } catch (err) {
      throw new Error('Query failed! Error: ' + err)
    }
  }

  create = async (p: Order): Promise<Order> => {
    try {
      const sql =
        'INSERT INTO orders (name, price, category) VALUES($1, $2, $3) RETURNING *'
      const conn = await Client.connect()

      const result = await conn.query(sql, [p.name, p.price, p.category])

      const order = result.rows[0]

      conn.release()

      return order
    } catch (err) {
      throw new Error('Query failed! Error: ' + err)
    }
  }

  currentOrder = async (userId: string): Promise<Order> => {
    try {
      const sql = 'SELECT * FROM orders WHERE status=active AND id=($1)'
      const conn = await Client.connect()

      const result = await conn.query(sql, [userId])

      const order = result.rows[0]

      conn.release()

      return order
    } catch (err) {
      throw new Error('Query failed! Error: ' + err)
    }
  }
}
