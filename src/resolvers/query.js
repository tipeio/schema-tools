import { createWhereArgs } from '../args'
import { GraphQLNonNull, GraphQLList, GraphQLString, GraphQLInt } from 'graphql'

export const getOne = (resolver, type, schemaTemplateData, userSchema) => {
  return {
    resolve: resolver(type, schemaTemplateData, userSchema),
    type: new GraphQLNonNull(userSchema.getType(type.name))
  }
}

export const getMany = (resolver, type, schemaTemplateData, userSchema) => {
  return {
    resolve: resolver(type, schemaTemplateData, userSchema),
    args: {
      where: { type: createWhereArgs(type, userSchema) },
      order_by: {
        type: new GraphQLList(new GraphQLNonNull(GraphQLString)),
        description:
          'List of fields to order the results by. Defaults to ["+updated_at"]',
        defaultValue: ['+updated_at']
      },
      limit: {
        type: GraphQLInt,
        description: 'Maximum number of results to return. Defaults to 50',
        defaultValue: 50
      },
      skip: {
        type: GraphQLInt,
        description:
          'For pagination, how many items to skip to continue the next page',
        defaultValue: 0
      }
    },
    type: new GraphQLNonNull(new GraphQLList(userSchema.getType(type.name)))
  }
}

export const getPage = (resolver, type, schemaTemplateData, userSchema) => {
  return {
    resolve: resolver(type, schemaTemplateData, userSchema),
    type: new GraphQLNonNull(userSchema.getType(type.name))
  }
}
