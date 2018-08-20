import { createWhereArgs } from '../args'
import {
  GraphQLNonNull,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
  GraphQLInputObjectType
} from 'graphql'

export const getOne = (resolver, type, schemaContext, schema) => {
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

export const getMany = (resolver, type, schemaContext, schema) => {
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
          name: 'ManyQueryInput',
          fields: () => ({
            where: { type: createWhereArgs(type, schema) },
            order_by: {
              type: new GraphQLList(new GraphQLNonNull(GraphQLString)),
              description:
                'List of fields to order the results by. Defaults to ["+updated_at"]',
              defaultValue: ['+updated_at']
            },
            limit: {
              type: GraphQLInt,
              description:
                'Maximum number of results to return. Defaults to 50',
              defaultValue: 50
            },
            skip: {
              type: GraphQLInt,
              description:
                'For pagination, how many items to skip to continue the next page',
              defaultValue: 0
            }
          })
        })
      }
    },
    type: new GraphQLNonNull(new GraphQLList(schema.getType(type.name)))
  }
}
