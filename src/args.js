import {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat
} from 'graphql'


export const createEqualityInput = (gqlType) => {
  return {
    _eq: {type: gqlType},
    _neq: {type: gqlType}
  }
}

export const createArgForField = (field, type, schema) => {
  let fields = {}

  switch(field.type) {
    case 'String':
      const eq = createEqualityInput(schema.getType(field.type))
      fields = {...fields, ...eq}
  }
  return new GraphQLInputObjectType({
    fields,
    name: `${type.name}_${field.name}_Input`
  })
}

export const createWhereArgs = (type, schema) => {
  const args = type.fields.reduce((fields, field) => {
    fields[field.name] = {type: createArgForField(field, type, schema)}
    return fields
  }, {})
  return new GraphQLInputObjectType({
    name: `${type.name}_Where_Input`,
    fields: {...args}
  })
}

export const createSortArgs = (type) => {

}

export const createPaginateArgs = (type) => {
  
}
