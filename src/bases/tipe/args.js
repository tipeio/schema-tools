import _ from 'lodash'
import { isOurType } from './utils'
import {
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
  GraphQLFloat,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLID
} from 'graphql'

export const formatMutation = field => type => {
  let finalType = type
  if (field.isArray) {
    if (!field.isNullableArray) {
      finalType = new GraphQLNonNull(finalType)
    }
    finalType = new GraphQLList(finalType)
  }

  if (field.isRequired) {
    finalType = new GraphQLNonNull(finalType)
  }

  return finalType
}

export const getSchemaType = (
  field,
  schema,
  schemaContext,
  mutation = false
) => {
  let wrap
  if (mutation) {
    wrap = formatMutation(field)
  }
  if (field.isScalar) {
    switch (field.type) {
      case 'String':
        return mutation
          ? wrap(GraphQLString)
          : schema.getType('StringFilterInput')
      case 'Float':
        return mutation
          ? wrap(GraphQLFloat)
          : schema.getType('FloatFilterInput')
      case 'Int':
        return mutation ? wrap(GraphQLInt) : schema.getType('IntFilterInput')
      case 'DateTime':
        return mutation
          ? wrap(schema.getType('DateTime'))
          : schema.getType('DateTimeFilterInput')
      case 'Boolean':
        return mutation
          ? wrap(GraphQLBoolean)
          : schema.getType('BooleanFilterInput')
      case 'ID':
        return mutation ? wrap(GraphQLID) : schema.getType('IDFilterInput')
      case 'Url':
        return mutation
          ? wrap(schema.getType('Url'))
          : schema.getType('UrlFilterInput')
    }
  }
}

export const createWhereArgs = (type, schema) => {
  const args = type.fields
    .filter(field => field.isScalar)
    .reduce((fields, field) => {
      fields[field.name] = { type: getSchemaType(field, schema) }
      return fields
    }, {})

  if (_.isEmpty(args)) {
    return false
  }

  const typeFields = new GraphQLInputObjectType({
    name: `${type.name}FiltersInput`,
    fields: () => ({
      ...args
    })
  })

  const whereType = new GraphQLInputObjectType({
    name: `${type.name}WhereInput`,
    fields: () => ({
      _and: { type: new GraphQLList(new GraphQLNonNull(typeFields)) },
      _or: { type: new GraphQLList(new GraphQLNonNull(typeFields)) },
      ...args
    })
  })

  return whereType
}

// TODO: possible memory leak
const inputTypeCache = {}

export const createMutationArgs = (type, schema, schemaContext) => {
  return type.fields
    .filter(field => {
      // filter out interface fields for mutations.
      return !(type.hasInterfaces && field.name === '_meta' && !field.isScalar)
    })
    .reduce((fields, field) => {
      if (field.isType) {
        const fieldType = _.find(
          schemaContext.types,
          type => type.name === field.type
        )

        if (!fieldType) {
          throw new Error(`${field.type} Does not exist`)
        }
        // is a document or page so the type is just ID for ref
        if (isOurType(fieldType)) {
          fields[field.name] = { type: formatMutation(field)(GraphQLID) }
        } else {
          // just a plain ObjecType, no ID because its not a document.
          // must create a new inputType or ref a created one
          let input = inputTypeCache[fieldType.name]
          if (!input) {
            input = new GraphQLInputObjectType({
              name: `${fieldType.name}Input`,
              fields: createMutationArgs(fieldType, schema, schemaContext)
            })

            inputTypeCache[fieldType.name] = input
          }
          fields[field.name] = {
            type: formatMutation(field)(input)
          }
        }
      } else {
        fields[field.name] = {
          type: getSchemaType(field, schema, schemaContext, true)
        }
      }
      return fields
    }, {})
}

export const createSortArgs = type => {}

export const createPaginateArgs = type => {}
