import * as queryResolvers from './query'
import * as mutationResolvers from './mutation'
import { getSchemaTemplateData } from './convert'
import {GraphQLObjectType, GraphQLSchema, extendSchema} from 'graphql'
import { mergeSchemas } from 'graphql-tools'
// import _ from 'lodash'

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
  many: `many${pascal(pluralize(name))}`,
  create: `new${pascal(name)}`,
  remove: `remove${pascal(name)}`
})

const ourTypes = {PageInfo: true}

export const createSchema = () => {
  const {schemaTemplateData, userSchema} = getSchemaTemplateData()
  const types = schemaTemplateData.types.filter(type => !ourTypes[type.name])
  const modelTypes = types.filter(type => type.usesDirectives && type.directives.type)
  console.log(JSON.stringify(modelTypes, null, 2))
  
  const newSchema = new GraphQLSchema({
    query: new GraphQLObjectType({
      name: 'Query',
      fields: () => modelTypes.reduce((fields, type) => {
        const names = genNames(type.name)
        fields[names.cap] = queryResolvers.getOne(type, schemaTemplateData, userSchema, names)
        fields[names.many] = queryResolvers.getMany(type, schemaTemplateData, userSchema, names)
        return fields
      }, {})
    }),
    mutation: new GraphQLObjectType({
      name: 'Mutation',
      fields: () => modelTypes.reduce((fields, type) => {
        const names = genNames(type.name)
        fields[names.create] = mutationResolvers.createOne(type, schemaTemplateData, userSchema)
        fields[names.remove] = mutationResolvers.removeOne(type, schemaTemplateData, userSchema)
        return fields
      }, {})
    })
  })

  const finalSchema = mergeSchemas({
    schemas: [userSchema, newSchema]
  })

  return finalSchema
}
