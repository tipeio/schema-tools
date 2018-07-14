const gql = require('graphql-tag')
const gqlx = require('graphql-anywhere')
const fs = require('fs')
const path = require('path')
const { SchemaDirectiveVisitor, makeExecutableSchema } = require('graphql-tools')
const {graphql, DirectiveLocation, GraphQLDirective, parse} = require('graphql')
const { visit } = require('graphql/language')

const loc = path.join(__dirname, '../tipe.graphql')
const schema = fs.readFileSync(loc, {encoding: 'utf8'})
const ast = parse(schema)

const format = () => {
  const result = {
    types: {},
    diff: {}
  }
  const newAST = visit(ast, {
    enter: {
      ObjectTypeDefinition(node, key) {
        if (!/Query|Mutation/ig.test(node.name.value)) {
          result.types[key] = {
            name: node.name.value,
            fieldCount: node.fields.length,
            fields: {}
          }
        } else {
          // console.log(node)
        }
      },
      FieldDefinition(node, key, parent, p, ancestor) {
        const type = result.types[p[1]]
        if (type) {
          const validations = {
            required: node.type.kind === 'NonNullType'
          }

          const fieldType = validations.required
            ? node.type.type.name.value
            : node.type.name.value

          const field = {
            type: fieldType,
            name: node.name.value,
            options: {
              validations: {
                type: 'validations',
                args: validations
              }
            }
          }
          type.fields[key] = field
        }
      },
      Directive(node, key, parent, p) {
        const field = result.types[p[1]].fields[p[3]]
        const type = node.name.value
        const option = {
          type,
          args: node.arguments.reduce((r, arg) => {
            r[arg.name.value] = arg.value.value
            return r
          }, {})
        }
        if (type === 'validations') {
          field.options.validations.args = {
            ...field.options.validations.args,
            ...option.args
          }
        } else {
          field.options[type] = option
        }
      }
    },
    leave: {
      Directive() {
        return null
      }
    }
  })

  return {
    ast: newAST,
    tree: result
  }
}

module.exports = format


// class LogDirective extends SchemaDirectiveVisitor {
//   static getDirectiveDeclaration(directiveName, schema) {
//     return new GraphQLDirective({
//       name: directiveName,
//       locations: [
//         DirectiveLocation.FIELD_DEFINITION
//       ]
//     })
//   }

//   visitFieldDefinition(field) {
//     const { resolve } = field

//     field.resolve = async function() {
//       const results = await resolve()
//       console.log('in directive ', results)
//       return results
//     }
//   }
// }

// class UIDirective extends SchemaDirectiveVisitor {
//   static getDirectiveDeclaration(directiveName, schema) {
//     return new GraphQLDirective({
//       name: directiveName,
//       locations: [
//         DirectiveLocation.FIELD_DEFINITION
//       ],
//       args: {
//         name: {
//           type: schema.getType('String')
//         }
//       }
//     })
//   }

//   visitFieldDefinition(field) {
//     const { resolve } = field
    
//     console.log('in ui ', this.args.name)
//     field.resolve = async function() {
//       const results = await resolve()
//       return results
//     }
//   }
// }

// const readySchema = makeExecutableSchema({
//   typeDefs: schema,
//   schemaDirectives: {
//     log: LogDirective,
//     ui: UIDirective
//   },
//   resolvers: {
//     Query: {
//       people() {
//         return {}
//       }
//     },
//     Person: {
//       firstName() {
//         return 'hello there'
//       }
//     }
//   }
// })

// const run = async () => {
//   const results = await graphql(readySchema, `query {people { firstName }}`)
//   // console.log(results)
// }
// run()
