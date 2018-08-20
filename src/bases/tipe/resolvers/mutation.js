import { GraphQLInputObjectType } from 'graphql'
import { createMutationArgs } from '../args'

const { GraphQLNonNull } = require('graphql')

export const create = (resolver, type, schemaContext, schema) => {
  return {
    resolve(_, args, ctx = {}, info) {
      return resolver(_, args, {
        ...ctx,
        ...{ type, schemaContext, schema },
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
      return resolver(_, args, {
        ...ctx,
        ...{ type, schemaContext, schema },
        info
      })
    },
    type: new GraphQLNonNull(schema.getType(type.name))
  }
}

export const update = (resolver, type, schemaContext, schema) => ({
  resolve(_, args, ctx = {}, info) {
    return resolver(_, args, {
      ...ctx,
      ...{ type, schemaContext, schema },
      info
    })
  },
  type: new GraphQLNonNull(schema.getType(type.name))
})
