import Client from '../database'

export type Order = {
  id?: number
  user_id: string | number
  status: 'active' | 'completed'
}

export class OrderStore {
  index = async (): Promise<Order[]> => {
    const sql = 'SELECT * FROM orders;'
    try {
      const conn = await Client.connect()
      const result = await conn.query(sql)

      conn.release()

      return result.rows
    } catch (err) {
      throw new Error('Query failed! Error: ' + err)
    }
  }

  show = async (id: string): Promise<Order> => {
    const sql = 'SELECT * FROM orders WHERE id=($1)'
    try {
      const conn = await Client.connect()
      const result = await conn.query(sql, [id])

      conn.release()

      return result.rows[0]
    } catch (err) {
      throw new Error('Query failed! Error: ' + err)
    }
  }

  create = async (o: Order): Promise<Order> => {
    try {
      const sql =
        'INSERT INTO orders (status, user_id) VALUES($1, $2) RETURNING *'
      const conn = await Client.connect()

      const result = await conn.query(sql, [o.status, o.user_id])

      conn.release()

      return result.rows[0]
    } catch (err) {
      throw new Error('Query failed! Error: ' + err)
    }
  }

  // Get current Order for a user
  currentOrderByUserId = async (userId: string): Promise<Order> => {
    try {
      const sql =
        "SELECT * FROM orders WHERE (user_id=($1) AND status='active')"
      const conn = await Client.connect()

      const result = await conn.query(sql, [userId])

      conn.release()

      return result.rows[0]
    } catch (err) {
      throw new Error('Query failed! Error: ' + err)
    }
  }
}
