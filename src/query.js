const {GraphQLNonNull, GraphQLList} = require('graphql')
const resolve = () => {}

export const getOne = (type, tree, ast, schema) => {
  return {
    resolve,
    type: new GraphQLNonNull(schema.getType(type.name))
  }
}

export const getMany = (type, tree, ast, schema) => {
  return {
    resolve,
    type: new GraphQLNonNull(new GraphQLList(schema.getType(type.name)))
  }
}
