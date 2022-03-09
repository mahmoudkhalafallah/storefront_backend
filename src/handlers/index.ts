import { Application } from 'express'
import orderRoutes from './orders'
import productRoutes from './products'
import userRoutes from './users'

const mount = (app: Application) => {
  productRoutes(app)
  userRoutes(app)
  orderRoutes(app)
}

export default mount
