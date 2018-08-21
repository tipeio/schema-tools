import {
  formatMutation,
  getSchemaType,
  createMutationArgs
} from '../../../src/bases/tipe/args'
import {
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInputObjectType,
  GraphQLID
} from 'graphql'
import _ from 'lodash'

const fakeSchema = {
  getType(type) {
    return type
  }
}

const types = {
  String: 'StringFilterInput',
  Float: 'FloatFilterInput',
  Int: 'IntFilterInput',
  DateTime: 'DateTimeFilterInput',
  Boolean: 'BooleanFilterInput',
  ID: 'IDFilterInput',
  Url: 'UrlFilterInput'
}

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

  describe('getSchemaType', () => {
    test('gets type for query scalars', () => {
      expect.assertions(_.size(types))

      const field = {
        isScalar: true
      }

      _.forEach(types, (type, k) => {
        const f = { ...field, type: k }
        expect(getSchemaType(f, fakeSchema)).toBe(type)
      })
    })

    test('gets types for mutation scalars', () => {
      const field = {
        isScalar: true,
        isRequired: true
      }
      const schema = {
        getType() {
          return GraphQLString
        }
      }

      _.forEach(types, (type, k) => {
        const f = { ...field, type: k }

        expect(getSchemaType(f, schema, null, true)).toBeInstanceOf(
          GraphQLNonNull
        )
      })
    })
  })

  describe('createMutationArgs', () => {
    test('create args for object types', () => {
      const type = {
        fields: [
          { isType: true, type: 'Author', name: 'author' },
          { isType: true, type: 'Bio', name: 'bio' }
        ]
      }
      const schema = {}
      const schemaContext = {
        types: [
          {
            name: 'Author',
            fields: [{ isType: false, type: 'String', name: 'firstName' }]
          },
          {
            name: 'Bio',
            hasInterfaces: true,
            interfaces: ['Document'],
            fields: [{ isType: false, type: 'Boolean', name: 'isStaff' }]
          }
        ]
      }

      const result = createMutationArgs(type, schema, schemaContext)
      expect(result).toHaveProperty('author')
      expect(result.author.type).toBeInstanceOf(GraphQLInputObjectType)
      expect(result.author.type.toString()).toBe('AuthorInput')

      expect(result.bio.type).not.toBeInstanceOf(GraphQLInputObjectType)
      expect(result.bio.type).toEqual(GraphQLID)
    })
  })
})
