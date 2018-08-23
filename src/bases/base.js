import { makeExecutableSchema, mergeSchemas } from 'graphql-tools'
import { schemaToTemplateContext } from 'graphql-codegen-core'
import _ from 'lodash'
import {
  parse,
  extendSchema,
  buildSchema,
  GraphQLObjectType,
  GraphQLSchema
} from 'graphql'

export const mergeSchemaWithAst = (schema, ast) => extendSchema(schema, ast)
export const createSchemaContext = schema => schemaToTemplateContext(schema)
export const schemaStringToAst = schema => parse(schema)

export const schemaStringToSchema = schema => buildSchema(schema)

const defaultConfig = {
  name: 'Base',
  baseTypeDefs: [],
  baseSchema: null,
  scalars: {},
  schemaDirectives: {},
  directives: {},
  typeResolvers: {},
  onTypeResolverFn() {},
  validateSchemaContext() {},
  schema: null
}

export const configureConfig = (config, defaultConfig) => {
  // TODO: check and correce config here
  return {
    ...defaultConfig,
    ...config
  }
}

export class Base {
  constructor(config = {}) {
    Object.assign(this, configureConfig(config, defaultConfig))
  }

  getBaseSchema() {
    if (this.baseSchema) {
      return this.baseSchema
    }
    const schema = makeExecutableSchema({
      typeDefs: this.baseTypeDefs,
      schemaDirectives: this.schemaDirectives,
      resolvers: _.merge({}, this.scalars, this.directives, this.typeResolvers)
    })

    this.baseSchema = schema
    return this.baseSchema
  }

  readySchemaContext() {
    return {
      schemaContext: this.schemaContext,
      schemaWithoutActions: this.schemaWithoutActions,
      typeDefsAst: this.typeDefsAst
    }
  }

  getSchemaContext(typeDefs) {
    if (this.schemaContext) {
      return this.readySchemaContext()
    }

    this.typeDefsAst = schemaStringToAst(typeDefs)
    this.schemaWithoutActions = mergeSchemaWithAst(
      this.getBaseSchema(),
      this.typeDefsAst
    )
    const schemaCtx = createSchemaContext(this.schemaWithoutActions)
    this.validateSchemaContext(schemaCtx, this.schemaWithoutActions)
    this.schemaContext = schemaCtx
    this.schemaContext.inputs = {}

    return this.readySchemaContext()
  }

  createResolversForTypes(typeDefs, crudResolvers) {
    const { schemaContext } = this.getSchemaContext(typeDefs)
    const resolvers = { queries: {}, mutations: {} }

    return schemaContext.types.reduce((mem, type) => {
      const resolverFns = this.onTypeResolverFn(type, crudResolvers, this)
      return _.merge({}, mem, resolverFns)
    }, resolvers)
  }

  createFinalSchema(typeDefs, resolvers) {
    const { queries, mutations } = this.createResolversForTypes(
      typeDefs,
      resolvers
    )

    const resolverScehma = new GraphQLSchema({
      query: new GraphQLObjectType({
        name: 'Query',
        fields: () => queries
      }),
      mutation: new GraphQLObjectType({
        name: 'Mutation',
        fields: () => mutations
      })
    })

    this.schema = mergeSchemas({
      schemas: [this.schemaWithoutActions, resolverScehma]
    })
    return this.schema
  }
}
