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
  }
}

const schema = createSchema(types, resolvers)
console.log(schema)
