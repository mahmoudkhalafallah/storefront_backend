import express, { Request, Response } from 'express'
import { User, UserStore } from '../models/user'
import jwt from 'jsonwebtoken'
import { verifyAuthToken } from '../middlewares/verifyAuthToken'

const store = new UserStore()

const index = async (_req: Request, res: Response) => {
  const users = await store.index()
  res.json(users)
}

const show = async (req: Request, res: Response) => {
  const user = await store.show(req.params.id)
  res.json(user)
}

const create = async (req: Request, res: Response) => {
  const user: User = {
    first_name: req.body.firstName,
    last_name: req.body.lastName,
    password: req.body.password,
  }

  try {
    const { password: _, ...newUser } = await store.create(user)

    const token = jwt.sign(
      { user: newUser },
      process.env.TOKEN_SECRET as string
    )

    res.json({ token })
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const userRoutes = (app: express.Application) => {
  app.get('/users', verifyAuthToken, index)
  app.get('/users/:id', verifyAuthToken, show)
  app.post('/users', create)
}

export default userRoutes
