const {GraphQLNonNull, GraphQLList, GraphQLString} = require('graphql')
const resolve = () => {}

export const getOne = (type, tree, ast, schema) => {
  return {
    resolve,
    args: {
      age: {type: GraphQLString}
    },
    type: new GraphQLNonNull(schema.getType(type.name))
  }
}

export const getMany = (type, tree, ast, schema) => {
  return {
    resolve,
    type: new GraphQLNonNull(new GraphQLList(schema.getType(type.name)))
  }
}
