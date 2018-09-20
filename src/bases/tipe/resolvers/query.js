import { createWhereArgs } from '../args'
import { parseResolveInfo } from 'graphql-parse-resolve-info'
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
      const parsedInfo = parseResolveInfo(info)
      return resolver(
        _,
        args,
        {
          ...ctx,
          ...{ type, schemaContext, parsedInfo }
        },
        info
      )
    },
    type: new GraphQLNonNull(schema.getType(type.name))
  }
}

export const getMany = (resolver, type, schemaContext, schema) => {
  return {
    resolve(_, args, ctx = {}, info) {
      const parsedInfo = parseResolveInfo(info)
      return resolver(
        _,
        args,
        {
          ...ctx,
          ...{ type, schemaContext, parsedInfo }
        },
        info
      )
    },
    args: {
      input: {
        type: new GraphQLInputObjectType({
          name: `${type.name}QueryManyInput`,
          fields: () => ({
            where: { type: createWhereArgs(type, schema) },
            order_by: {
              type: new GraphQLList(new GraphQLNonNull(GraphQLString)),
              description: 'List of fields to order the results by'
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
