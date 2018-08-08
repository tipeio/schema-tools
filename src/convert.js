import scalars from './scalars'
import { makeExecutableSchema } from 'graphql-tools'
import { schemaToTemplateContext } from 'graphql-codegen-core'
import { parse, extendSchema } from 'graphql'
import { typeDefs } from './baseSchema'
/**
 * Takes a graphql schema string, adds default typdefs
 * and creates and executable schema. Takes that schema
 * and creates a human-readable JSON structure for
 * code gen
 * @param {String} schema a graphql schema strong
 * @return {Object} an object with the JSON tree for codegen
 *                  and the compiled schema
 */
export const getSchemaTemplateData = schema => {
  // convert the schema string into an AST for mergin
  const ast = parse(schema)

  // need to convert default types into a full schema for merging with AST
  const defaultSchema = makeExecutableSchema({
    typeDefs: [typeDefs],
    resolvers: {
      ...scalars,
      Page: {
        __resolveType() {}
      }
    }
  })

  // merge the default schema with given AST to ensure extensions work
  schema = extendSchema(defaultSchema, ast)
  const schemaTemplateData = schemaToTemplateContext(schema)
  return { schemaTemplateData, userSchema: schema }
}
