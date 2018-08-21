import { formatMutation } from '../../../src/bases/tipe/args'
import { GraphQLString, GraphQLList, GraphQLNonNull } from 'graphql'

describe('tipe spec args', () => {
  describe('formatMutation', () => {
    test('handles null array type', () => {
      const field = {
        isArray: true
      }
      const type = GraphQLString
      const result = formatMutation(field)(type)
      expect(result).toBeInstanceOf(GraphQLList)
    })

    test('handles non null array type', () => {
      const field = {
        isArray: true,
        isNullableArray: false
      }

      const type = GraphQLString
      const result = formatMutation(field)(type)
      expect(result).toBeInstanceOf(GraphQLList)
      expect(result).toEqual(new GraphQLList(new GraphQLNonNull(type)))
    })

    test('handles required arrays', () => {
      const field = {
        isArray: true,
        isRequired: true,
        isNullableArray: true
      }

      const type = GraphQLString
      const result = formatMutation(field)(type)
      expect(result).toBeInstanceOf(GraphQLNonNull)
      expect(result).toEqual(new GraphQLNonNull(new GraphQLList(type)))
    })
  })
})
