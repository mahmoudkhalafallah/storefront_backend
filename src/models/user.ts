import Client from '../database'
import bcrypt from 'bcrypt'

//@TODO add tests

export type User = {
  id: number
  firstName: string
  lastName: string
  password: string
}

export class UserStore {
  index = async (): Promise<User[]> => {
    const sql = 'SELECT * FROM users;'
    try {
      const conn = await Client.connect()
      const result = await conn.query(sql)
      const users = result.rows[0]

      conn.release()

      return users
    } catch (err) {
      throw new Error('Query failed! Error: ' + err)
    }
  }

  show = async (id: string): Promise<User[]> => {
    const sql = 'SELECT * FROM users WHERE id=($1)'
    try {
      const conn = await Client.connect()
      const result = await conn.query(sql, [id])

      const user = result.rows[0]

      conn.release()

      return user
    } catch (err) {
      throw new Error('Query failed! Error: ' + err)
    }
  }

  create = async (u: User): Promise<User> => {
    const pepper = process.env.BCRYPT_PASSWORD
    const saltRounds = process.env.SALT_ROUNDS || '10'

    try {
      const sql =
        'INSERT INTO users (name, price, category) VALUES($1, $2, $3) RETURNING *'
      const conn = await Client.connect()

      const hash = bcrypt.hashSync(u.password + pepper, parseInt(saltRounds))

      const result = await conn.query(sql, [u.firstName, u.lastName, hash])

      const user = result.rows[0]

      conn.release()

      return user
    } catch (err) {
      throw new Error('Query failed! Error: ' + err)
    }
  }
}
