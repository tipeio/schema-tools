import * as queryResolvers from './query'
import * as mutationResolvers from './mutation'
import { getSchemaTemplateData } from './convert'
import {GraphQLObjectType, GraphQLSchema, printSchema, extendSchema} from 'graphql'
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
  many: `${camel(pluralize(name))}`,
  create: `new${pascal(name)}`,
  remove: `remove${pascal(name)}`,
  update: `update${pascal(name)}`
})

const ourTypes = {PageInfo: true}

const makeModelActions = (modelTypes, schemaTemplateData, userSchema) => {
  return modelTypes.reduce((fields, type) => {
    const names = genNames(type.name)
    fields.queries[names.cap] = queryResolvers.getOne(type, schemaTemplateData, userSchema, names)
    fields.queries[names.many] = queryResolvers.getMany(type, schemaTemplateData, userSchema, names)

    fields.mutations[names.create] = mutationResolvers.create(type, schemaTemplateData, userSchema)
    fields.mutations[names.remove] = mutationResolvers.remove(type, schemaTemplateData, userSchema)
    fields.mutations[names.update] = mutationResolvers.update(type, schemaTemplateData, userSchema)
    return fields
  }, {mutations: {}, queries: {}})
}

const makePageActions = (pageTypes, schemaTemplateData, userSchema) => {
  return pageTypes.reduce((fields, type) => {
    fields.queries[type.name] = queryResolvers.getPage(type, schemaTemplateData, userSchema)
    return fields
  }, {mutations: {}, queries: {}})
}


export const createSchema = () => {
  const {schemaTemplateData, userSchema} = getSchemaTemplateData()
  const types = schemaTemplateData.types.filter(type => !ourTypes[type.name])
  const modelTypes = types.filter(type => type.usesDirectives && type.directives.type)
  const pageTypes = types.filter(type => type.usesDirectives && type.directives.page)

  const modelActions = makeModelActions(modelTypes, schemaTemplateData, userSchema)
  const pageActions = makePageActions(pageTypes, schemaTemplateData, userSchema)
  const newSchema = new GraphQLSchema({
    query: new GraphQLObjectType({
      name: 'Query',
      fields: () => ({
        ...modelActions.queries,
        ...pageActions.queries
      })
    }),
    mutation: new GraphQLObjectType({
      name: 'Mutation',
      fields: () => ({
        ...modelActions.mutations,
        ...pageActions.mutations
      })
    })
  })

  const finalSchema = mergeSchemas({
    schemas: [userSchema, newSchema]
  })

  // console.log(printSchema(finalSchema))

  return finalSchema
}
