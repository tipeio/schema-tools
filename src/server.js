import { createSchema } from './gen'
import { GraphQLServer } from 'graphql-yoga'
import scalars from './scalars'

const options = {
  port: 8000,
  endpoint: '/graphql',
  subscriptions: '/subscriptions',
  playground: '/playground',
}

const server = new GraphQLServer({
  schema: createSchema()
})

server.start(options, ({ port }) =>
  console.log(
    `Server started, listening on port ${port} for incoming requests.`,
  )
)
