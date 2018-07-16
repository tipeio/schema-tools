const {GraphQLNonNull, GraphQLList} = require('graphql')
const resolve = () => {}

export const createOne = (type, tree, ast, schema) => {
  return {
    resolve,
    type: new GraphQLNonNull(schema.getType(type.name))
  }
}

export const removeOne = (type, tree, ast, schema) => {
  return {
    resolve,
    type: new GraphQLNonNull(schema.getType(type.name))
  }
}
