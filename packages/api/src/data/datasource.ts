import * as dotenv from 'dotenv'
import { DataSource, Repository } from 'typeorm'
import { Item } from '../entity/item'

dotenv.config()

export const ItemDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  entities: [Item]
})

export const ItemRepo = ItemDataSource.getRepository(Item)
