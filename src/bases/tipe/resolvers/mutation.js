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
