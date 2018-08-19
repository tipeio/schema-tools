import { mergeSchemas } from 'graphql-tools'
import { GraphQLObjectType, GraphQLSchema } from 'graphql'
import { addDefaults, genNames } from './utils'
import { ourTypes } from './constants'
import { processSchemaString } from './transform'
import * as resolvers from './resolvers'
/**
 * Formats query and mutation fields for the model types.
 * Making sure they are ready for final graphql schema creation.
 * Resolvers have to be provided, allowing the ability to use
 * different set of resolvers (local vs live)
 * @param {Array<Object>} models array if model types
 * @param {*} schemaTemplateData full schema template data
 * @param {*} userSchema compiled user schema
 * @param {*} resolvers map of genric resolvers (getOne, create, etc)
 */
export const makeModelActions = (
  models,
  schemaTemplateData,
  userSchema,
  providedResolvers
) => {
  return models.reduce(
    (fields, type) => {
      const names = genNames(type.name)
      fields.queries[names.cap] = resolvers.getOne(
        providedResolvers.getOne,
        type,
        schemaTemplateData,
        userSchema
      )
      fields.queries[names.many] = resolvers.getMany(
        providedResolvers.getMany,
        type,
        schemaTemplateData,
        userSchema
      )

      fields.mutations[names.create] = resolvers.create(
        providedResolvers.create,
        type,
        schemaTemplateData,
        userSchema
      )
      fields.mutations[names.remove] = resolvers.remove(
        providedResolvers.remove,
        type,
        schemaTemplateData,
        userSchema
      )
      fields.mutations[names.update] = resolvers.update(
        providedResolvers.update,
        type,
        schemaTemplateData,
        userSchema
      )
      return fields
    },
    { mutations: {}, queries: {} }
  )
}

/**
 * Formats query and mutation fields for the page types.
 * Making sure they are ready for final graphql schema creation.
 * Resolvers have to be provided, allowing the ability to use
 * different set of resolvers (local vs live)
 * @param {Array<Object>} models array of page types
 * @param {*} schemaTemplateData full schema template data
 * @param {*} userSchema compiled user schema
 * @param {*} resolvers map of genric resolvers (getPage, createPage, etc)
 */
const makePageActions = (pages, schemaTemplateData, userSchema, resolvers) => {
  return pages.reduce(
    (fields, type) => {
      fields.queries[type.name] = resolvers.getPage(
        type,
        schemaTemplateData,
        userSchema
      )
      return fields
    },
    { mutations: {}, queries: {} }
  )
}

/**
 * Groups graphql types by different "types"
 * @param {Array<Object>} types array of graphql types from schemaTemplateData
 */
export const seperateTypes = types =>
  types.reduce(
    (mem, type) => {
      if (type.usesDirectives) {
        if (type.directives.type) {
          mem.models.push(type)
        }
        if (type.directives.page) {
          mem.pages.push(type)
        }
      }
      return mem
    },
    { models: [], pages: [] }
  )

/**
 *
 * @param {Array<Object>} types filter out our provided Types
 */
export const removeOurTypes = types =>
  types.filter(type => !ourTypes[type.name]).map(addDefaults)

/**
 * Creates a new schema with the provied queries and mutations.
 * Then merges that schema with the schema provided. Used to merge
 * user schema with generated mutations and resolvers
 * @param {Object} queries object of quries for final schema
 * @param {Object} mutations object of mutations for final schema
 * @param {Schema} userSchema compiled user schema
 */
const composeSchema = (queries, mutations, userSchema) => {
  const newSchema = new GraphQLSchema({
    query: new GraphQLObjectType({
      name: 'Query',
      fields: () => ({
        ...queries
      })
    }),
    mutation: new GraphQLObjectType({
      name: 'Mutation',
      fields: () => ({
        ...mutations
      })
    })
  })

  return mergeSchemas({
    schemas: [userSchema, newSchema]
  })
}

/**
 * Given a schema string and generic resolver map,
 * creates a schema ready to be used on a server
 * @param {String} schemaString Tipe Graphql schema string
 * @param {Obejct} resolvers Objet containing generic resolvers for mapping
 */
export const createSchema = (schemaString, providedResolvers) => {
  const { schemaTemplateData, userSchema } = processSchemaString(schemaString)
  const types = removeOurTypes(schemaTemplateData.types)
  const { models, pages } = seperateTypes(types)

  if (!models.length && !pages.length) {
    throw new Error(
      'You must create at least one @type or @page type in your schema'
    )
  }

  const modelActions = makeModelActions(
    models,
    schemaTemplateData,
    userSchema,
    providedResolvers
  )
  const pageActions = makePageActions(
    pages,
    schemaTemplateData,
    userSchema,
    providedResolvers
  )

  const queries = { ...modelActions.queries, ...pageActions.queries }
  const mutations = { ...modelActions.mutations, ...pageActions.mutations }

  return composeSchema(queries, mutations, userSchema)
}
