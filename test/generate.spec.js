import { createSchema } from '../src/index'
import { GraphQLSchema } from 'graphql'

describe('createSchema', () => {
  test('creates a server ready schema', () => {
    const typeDefs = `type Doc implements Document {_meta: Meta!}`
    const crudResolvers = {
      getOne() {},
      getMany() {},
      create() {},
      remove() {},
      update() {}
    }
    const schema = createSchema({ typeDefs, crudResolvers })
    expect(schema).toBeInstanceOf(GraphQLSchema)
  })
})
