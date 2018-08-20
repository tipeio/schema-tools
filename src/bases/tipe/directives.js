import { SchemaDirectiveVisitor } from 'graphql-tools'
import { GraphQLDirective, DirectiveLocation } from 'graphql'

class UIDirective extends SchemaDirectiveVisitor {
  static getDirectiveDeclaration(directiveName, schema) {
    return new GraphQLDirective({
      name: directiveName,
      locations: [DirectiveLocation.FIELD_DEFINITION],
      args: {
        options: {
          type: schema.getType('UIDirectiveInput')
        }
      }
    })
  }

  visitFieldDefinition(field) {
    console.log(field)
  }
  visitSchema() {
    console.log(this.visitedType)
  }
}

class ValidationDirective extends SchemaDirectiveVisitor {
  static getDirectiveDeclaration(directiveName, schema) {
    return new GraphQLDirective({
      name: directiveName,
      locations: [DirectiveLocation.FIELD_DEFINITION],
      args: {
        name: {
          type: schema.getType('String')
        }
      }
    })
  }

  visitFieldDefinition() {}
}

export const directives = {
  ui: UIDirective,
  validations: ValidationDirective
}
