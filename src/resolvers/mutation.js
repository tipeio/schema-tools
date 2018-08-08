const { GraphQLNonNull } = require('graphql')

export const create = (resolver, type, schemaTemplateData, userSchema) => {
  return {
    resolve: resolver(type, schemaTemplateData, userSchema).resolve,
    type: new GraphQLNonNull(userSchema.getType(type.name))
  }
}

export const remove = (resolver, type, schemaTemplateData, userSchema) => {
  return {
    resolve: resolver(type, schemaTemplateData, userSchema).resolve,
    type: new GraphQLNonNull(userSchema.getType(type.name))
  }
}

export const update = (resolver, type, schemaTemplateData, userSchema) => ({
  resolve: resolver(type, schemaTemplateData, userSchema).resolve,
  type: new GraphQLNonNull(userSchema.getType(type.name))
})
