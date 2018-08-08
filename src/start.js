import { ApolloServer } from 'apollo-server'
import { createSchema } from './generate'

const types = `
  type Author {
    first: String
  }
`

const resolve = {
  resolve() {}
}

const resolvers = {
  getOne() {
    return resolve
  },
  getMany() {
    return resolve
  },
  create() {
    return resolve
  },
  remove() {
    return resolve
  },
  update() {
    return resolve
  }
}

const schema = createSchema(types, resolvers)
const server = new ApolloServer({ schema })

server
  .listen()
  .then(({ url }) => {
    console.log(`server on ${url}`)
  })
  .catch(e => console.error(e))
