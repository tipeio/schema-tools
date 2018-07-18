import { createWhereArgs } from './args'
const {GraphQLNonNull, GraphQLList, GraphQLString} = require('graphql')
const resolve = () => {}

export const getOne = (type, schemaTemplateData, userSchema) => {
  return {
    resolve,
    type: new GraphQLNonNull(userSchema.getType(type.name))
  }
}

export const getMany = (type, schemaTemplateData, userSchema) => {
  return {
    resolve,
    args: {
      where: {type: createWhereArgs(type, userSchema)}
    },
    type: new GraphQLNonNull(new GraphQLList(userSchema.getType(type.name)))
  }
}
