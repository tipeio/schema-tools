import { SchemaDirectiveVisitor } from 'graphql-tools'
import { GraphQLDirective, DirectiveLocation } from 'graphql'

class UIDirective extends SchemaDirectiveVisitor {
  static getDirectiveDeclaration(directiveName, schema) {
    return new GraphQLDirective({
      name: directiveName,
      locations: [
        DirectiveLocation.FIELD_DEFINITION
      ],
      args: {
        name: {
          type: schema.getType('String')
        }
      }
    })
  }

  visitFieldDefinition(field) {
    const { resolve } = field
  
    field.resolve = async function() {
      const results = await resolve()
      return results
    }
  }
}

class ValidationDirective extends SchemaDirectiveVisitor {
  static getDirectiveDeclaration(directiveName, schema) {
    return new GraphQLDirective({
      name: directiveName,
      locations: [
        DirectiveLocation.FIELD_DEFINITION
      ],
      args: {
        name: {
          type: schema.getType('String')
        }
      }
    })
  }

  visitFieldDefinition(field) {
    const { resolve } = field
  
    field.resolve = async function() {
      const results = await resolve()
      return results
    }
  }
}

export const directives = {
  ui: UIDirective,
  validations: ValidationDirective
}
