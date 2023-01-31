import 'reflect-metadata'
import { buildSchema } from 'type-graphql'
import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { ItemResolver } from './resolvers/item.resolver'

const start = async (): Promise<void> => {
  const schema = await buildSchema({
    resolvers: [ItemResolver],
    validate: false
  })

  const server = new ApolloServer({
    schema
  })

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 }
  })
  console.log(`🚀  Server ready at: ${url}`)
}

start().then(() => { console.log('done') }).catch(() => { console.error('failed :(') })
