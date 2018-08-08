import scalars from './scalars'
import { makeExecutableSchema } from 'graphql-tools'

export const typeDefs = `
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

type Asset {
  url: Url!
  name: String!
  type: String!
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

input FloatFilterInput {
  _eq: Float
  _neq: Float
  _gt: Float
  _lt: Float
  _gte: Float
  _lte: Float
  _in: [Float!]
  _nin: [Float!]
}

input IntFilterInput {
  _eq: Int
  _neq: Int
  _gt: Int
  _lt: Int
  _gte: Int
  _lte: Int
  _in: [Int!]
  _nin: [Int!]
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

input UrlFilterInput {
  _eq: Url
  _neq: Url
  _in: [Url!]
  _nin: [Url!]
  _contains: Url
  _does_not_contain: Url
}
`
export const baseExecutableSchema = makeExecutableSchema({
  typeDefs: [typeDefs],
  resolvers: {
    ...scalars,
    Page: {
      __resolveType() {}
    }
  }
})
