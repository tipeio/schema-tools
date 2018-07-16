import * as queryResolvers from './query'
import * as mutationResolvers from './mutation'
import scalars from './scalars'

const {GraphQLObjectType, GraphQLSchema, typeFromAST, buildASTSchema, GraphQLNonNull, GraphQLList, extendSchema} = require('graphql')
const format = require('./convert')
const _ = require('lodash')
const {mergeSchemas, makeExecutableSchema} = require('graphql-tools')
const pascal = require('pascal-case')
const camel = require('camel-case')
const pluralize = require('pluralize')

const genNames = (name) => ({
  name,
  plural: pluralize(name),
  cap: pascal(name),
  capPlural: pascal(pluralize(name)),
  camel: camel(name),
  camPlural: camel(pluralize(name)),
  create: `new${pascal(name)}`,
  remove: `remove${pascal(name)}`
})

const deafultTypes = `
  scalar DateTime
  scalar LatLong
`

const defaultSchema = makeExecutableSchema({typeDefs: [deafultTypes], resolvers: {...scalars}})

export const createSchema = (connection => {
  const {tree, ast} = format()
  // const schema = buildASTSchema(ast, 'Query', 'Mutation')
  const schema = extendSchema(defaultSchema, ast)

  const newSchema = new GraphQLSchema({
    query: new GraphQLObjectType({
      name: 'Query',
      fields: () =>  _.reduce(tree.types, (fields, type) => {
        const names = genNames(type.name)
        fields[names.cap] = queryResolvers.getOne(type, tree, ast, schema)
        fields[names.camPlural] = queryResolvers.getMany(type, tree, ast, schema)
        return fields
      }, {})
    }),
    mutation: new GraphQLObjectType({
      name: 'Mutation',
      fields: () => _.reduce(tree.types, (fields, type) => {
        const names = genNames(type.name)
        fields[names.create] = mutationResolvers.createOne(type, tree, ast, schema)
        fields[names.remove] = mutationResolvers.removeOne(type, tree, ast, schema)
        return fields
      }, {})
    })
  })

  const finalSchema = mergeSchemas({
    schemas: [schema, newSchema]
  })

  return finalSchema
})
