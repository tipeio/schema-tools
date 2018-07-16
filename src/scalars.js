import { GraphQLScalarType } from 'graphql'
import validator from 'validator'

export const DateTimeScalar = new GraphQLScalarType({
  name: 'DateTime',
  description: 'A real date',
  serialize(value) {
    if (validator.isISO8601(value)) {
      return value
    }
    throw new Error('DateTime cannot represent an invalid ISO-8601 Date string')
  },
  parseValue(value) {
    if (validator.isISO8601(value)) {
      return value
    }
    throw new Error('DateTime cannot represent an invalid ISO-8601 Date string')
  },
  parseLiteral(ast) {
    if (validator.isISO8601(ast.value)) {
      return ast.value
    }
    throw new Error('DateTime cannot represent an invalid ISO-8601 Date string')
  }
})

export const LatLongScalar = new GraphQLScalarType({
  name: 'LatLong',
  description: 'Lat Long String',
  serialize(value) {
    if (validator.isLatLong(value)) {
      return value
    }
    throw new Error('LatLong must be a valid "lat,long" string')
  },
  parseValue(value) {
    if (validator.isLatLong(value)) {
      return value
    }
    throw new Error('LatLong must be a valid "lat,long" string')
  },
  parseLiteral(ast) {
    if (validator.isLatLong(ast.value)) {
      return ast.value
    }
    throw new Error('LatLong must be a valid "lat,long" string')
  }
})

export default {
  LatLong: LatLongScalar,
  DateTime: DateTimeScalar
}
