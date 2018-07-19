import scalars from './scalars'
// import { directives } from './directives'
import { makeExecutableSchema } from 'graphql-tools'
import { schemaToTemplateContext } from 'graphql-codegen-core'
import { parse, extendSchema, visit } from 'graphql'

const fs = require('fs')
const path = require('path')
const loc = path.join(__dirname, '../tipe.graphql')

export const getSchemaTemplateData = () => {
  let schema = fs.readFileSync(loc, {encoding: 'utf8'})

  const ast = parse(schema)
  const deafultTypes = `
    directive @ui(component: String, name: String) on FIELD
    directive @validations(minlength: Int, maxlength: Int) on FIELD
    directive @date(format: String) on FIELD
    directive @type on OBJECT
    directive @page(prodUrl: Url, previewUrl: Url) on OBJECT

    scalar DateTime
    scalar LatLong
    scalar Url
    
    interface Page {
      pageInfo: PageInfo!
    }
    type PageInfo {
      title: String
      description: String
    }

    input StringFilterInput {
      _eq: String
      _neq: String
      _gt: String
      _lt: String
      _gte: String
      _lte: String
      _in: [String!]
      _nin: [String!]
      _contains: String
      _does_not_contain: String
      _starts_with: String
      _ends_with: String
    }

    input NumberFilterInput {
      _eq: String
      _neq: String
      _gt: String
      _lt: String
      _gte: String
      _lte: String
      _in: [String!]
      _nin: [String!]
    }

    input DateTimeFilterInput {
      _eq: DateTime
      _neq: DateTime
      _gt: DateTime
      _lt: DateTime
      _gte: DateTime
      _lte: DateTime
      _in: [DateTime!]
      _nin: [DateTime!]
    }

    input BooleanFilterInput {
      _eq: Boolean
      _neq: Boolean
    }

    input IDFilterInput {
      _eq: ID
      _neq: ID
    }
  `

  const defaultSchema = makeExecutableSchema({
    typeDefs: [deafultTypes],
    resolvers: {
      ...scalars,
      Page: {
        __resolveType() {}
      }
    }
  })

  schema = extendSchema(defaultSchema, ast)
  const schemaTemplateData = schemaToTemplateContext(schema)
  return {schemaTemplateData, userSchema: schema}
}
