import { ApolloServer } from 'apollo-server'
import { createSchema } from './index'

const typeDefs = `
  type Author implements Document {
    _meta: Meta!
    first: String!
      @ui(options: {component: MARKDOWN})
      @validations(options: {minlength: 30})
  }
`

const crudResolvers = {
  getOne() {
    return {}
  },
  getMany() {
    return {}
  },
  create() {},
  remove() {},
  update() {}
}

const schema = createSchema({
  spec: 'tipe',
  typeDefs,
  crudResolvers
})
const server = new ApolloServer({
  debug: false,
  schema
})

server
  .listen()
  .then(({ url }) => {
    console.log(`server on ${url}`)
  })
  .catch(e => console.error(e))
