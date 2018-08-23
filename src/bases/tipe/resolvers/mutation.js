import { GraphQLInputObjectType } from 'graphql'
import { createMutationArgs } from '../args'
import { parseResolveInfo } from 'graphql-parse-resolve-info'

const { GraphQLNonNull } = require('graphql')

export const create = (resolver, type, schemaContext, schema) => {
  return {
    resolve(_, args, ctx = {}, info) {
      const parsedInfo = parseResolveInfo(info)
      return resolver(_, args, {
        ...ctx,
        ...{ type, schemaContext, schema, parsedInfo },
        info
      })
    },
    args: {
      input: {
        type: new GraphQLInputObjectType({
          name: `${type.name}CreateInput`,
          fields: () => createMutationArgs(type, schema, schemaContext)
        })
      }
    },
    type: new GraphQLNonNull(schema.getType(type.name))
  }
}

export const remove = (resolver, type, schemaContext, schema) => {
  return {
    resolve(_, args, ctx = {}, info) {
      const parsedInfo = parseResolveInfo(info)
      return resolver(_, args, {
        ...ctx,
        ...{ type, schemaContext, schema, parsedInfo },
        info
      })
    },
    type: new GraphQLNonNull(schema.getType(type.name))
  }
}

export const update = (resolver, type, schemaContext, schema) => ({
  resolve(_, args, ctx = {}, info) {
    const parsedInfo = parseResolveInfo(info)
    return resolver(_, args, {
      ...ctx,
      ...{ type, schemaContext, schema, parsedInfo },
      info
    })
  },
  type: new GraphQLNonNull(schema.getType(type.name))
})
