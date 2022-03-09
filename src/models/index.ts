import { Client } from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const { POSTGRES_HOST, POSTGRES_DB_TEST, POSTGRES_USER, POSTGRES_PASSWORD } =
  process.env

const client = new Client({
  host: POSTGRES_HOST,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
})

export const createTestDB = async () => {
  try {
    await client.query('CREATE DATABASE ($1)', [POSTGRES_DB_TEST])
  } catch (err) {
    throw new Error('Failed' + err)
  }
}
