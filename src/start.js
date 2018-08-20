import { ApolloServer } from 'apollo-server'
import { createSchema } from './index'

const typeDefs = `
  type Addy {
    name: String!
  } 
  type Author implements Document {
    _meta: Meta!
    more: [String]
    names: [String!]
    hello: [String]!
    even: [String!]!
    addy: Addy!
    firstName: String!
      @ui(options: {component: MARKDOWN})
      @validations(options: {minlength: 30})
  }

  type Post implements Document {
    _meta: Meta!
    addy: Addy!
    hello: String
  }

  type HomePage implements Page {
    _pageMeta: PageMeta!
    _meta: Meta!
    title: String!
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
  debug: true,
  schema,
  formatError(error) {
    console.log(error)
    return error
  }
})

server
  .listen()
  .then(({ url }) => {
    console.log(`server on ${url}`)
  })
  .catch(e => console.error(e))
