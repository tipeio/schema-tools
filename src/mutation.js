const {GraphQLNonNull, GraphQLList} = require('graphql')
const resolve = () => {}

export const createOne = (type, schemaTemplateData, userSchema) => {
  return {
    resolve,
    type: new GraphQLNonNull(userSchema.getType(type.name))
  }
}

export const removeOne = (type, schemaTemplateData, userSchema) => {
  return {
    resolve,
    type: new GraphQLNonNull(userSchema.getType(type.name))
  }
}
