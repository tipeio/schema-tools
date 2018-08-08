import { schemaToTemplateContext } from 'graphql-codegen-core'
import { parse, extendSchema } from 'graphql'
import { baseExecutableSchema } from './baseSchema'

export const mergeSchemaWithAst = (schema, ast) => extendSchema(schema, ast)
export const createSchemaTemplateData = schema =>
  schemaToTemplateContext(schema)
export const schemaStringToAst = schema => parse(schema)

/**
 * Takes a graphql schema string, adds default typdefs
 * and creates and executable schema. Takes that schema
 * and creates a human-readable JSON structure for
 * code gen
 * @param {String} schema a graphql schema strong
 * @return {Object} an object with the JSON tree for codegen
 *                  and the compiled schema
 */
export const processSchemaString = schema => {
  // TODO: clean the schema first (remove and check things)
  // convert the schema string into an AST for mergin
  const ast = schemaStringToAst(schema)

  // merge the default schema with given AST to ensure extensions work
  const userSchema = mergeSchemaWithAst(baseExecutableSchema, ast)
  const schemaTemplateData = createSchemaTemplateData(userSchema)
  return { schemaTemplateData, userSchema, userAst: ast }
}
