import * as queryResolvers from './query'
const {GraphQLObjectType, GraphQLSchema, typeFromAST, buildASTSchema, GraphQLNonNull, GraphQLList} = require('graphql')
const format = require('./convert')
const _ = require('lodash')
const {mergeSchemas} = require('graphql-tools')
const pascal = require('pascal-case')
const camel = require('camel-case')
const pluralize = require('pluralize')

const genNames = (name) => {
  return {
    name,
    plural: pluralize(name),
    cap: pascal(name),
    capPlural: pascal(pluralize(name)),
    camel: camel(name),
    camPlural: camel(pluralize(name))
  }
}

export const createSchema = (connection => {
  const {tree, ast} = format()
  const schema = buildASTSchema(ast, 'Query', 'Mutation')

  const newSchema = new GraphQLSchema({
    query: new GraphQLObjectType({
      name: 'Query',
      fields: _.reduce(tree.types, (fields, type) => {
        const names = genNames(type.name)
        fields[type.name] = queryResolvers.getOne(type, tree, ast, schema)
        fields[names.camPlural] = queryResolvers.getMany(type, tree, ast, schema)
        return fields
      }, {})
    })
  })

  const finalSchema = mergeSchemas({
    schemas: [schema, newSchema]
  })

  return finalSchema
})
