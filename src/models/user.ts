import Client from '../database'
import bcrypt from 'bcrypt'

//@TODO add tests

export type User = {
  id?: number | string
  first_name: string
  last_name: string
  password: string
}

export class UserStore {
  index = async (): Promise<User[]> => {
    const sql = 'SELECT * FROM users;'
    try {
      const conn = await Client.connect()
      const result = await conn.query(sql)

      conn.release()

      return result.rows
    } catch (err) {
      throw new Error('Query failed! Error: ' + err)
    }
  }

  show = async (id: string): Promise<User> => {
    const sql = 'SELECT * FROM users WHERE id=($1)'
    try {
      const conn = await Client.connect()
      const result = await conn.query(sql, [id])

      conn.release()

      return result.rows[0]
    } catch (err) {
      throw new Error('Query failed! Error: ' + err)
    }
  }

  create = async (u: User): Promise<User> => {
    const pepper = process.env.BCRYPT_PASSWORD
    const saltRounds = process.env.SALT_ROUNDS || '10'

    try {
      const sql =
        'INSERT INTO users (first_name, last_name, password) VALUES($1, $2, $3) RETURNING *'
      const conn = await Client.connect()

      const hash = bcrypt.hashSync(u.password + pepper, parseInt(saltRounds))

      const result = await conn.query(sql, [u.first_name, u.last_name, hash])

      conn.release()

      return result.rows[0]
    } catch (err) {
      throw new Error('Query failed! Error: ' + err)
    }
  }
}
