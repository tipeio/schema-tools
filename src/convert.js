import scalars from './scalars'
// import { directives } from './directives'
import { makeExecutableSchema } from 'graphql-tools'
import { schemaToTemplateContext } from 'graphql-codegen-core'
import { parse, extendSchema, visit } from 'graphql'

const fs = require('fs')
const path = require('path')
const loc = path.join(__dirname, '../tipe.graphql')

export const getSchemaTemplateData = () => {
  let schema = fs.readFileSync(loc, {encoding: 'utf8'})

  const ast = parse(schema)
  const deafultTypes = `
    directive @ui(component: String, name: String) on FIELD
    directive @validations(minlength: Int, maxlength: Int) on FIELD
    directive @date(format: String) on FIELD
    directive @type on OBJECT

    scalar DateTime
    scalar LatLong

    interface Page {
      pageInfo: PageInfo
    }

    type PageInfo {
      title: String
      description: String
    }
  `

  const defaultSchema = makeExecutableSchema({
    typeDefs: [deafultTypes],
    resolvers: {
      ...scalars,
      Page: {
        __resolveType() {}
      }
    }
  })

  schema = extendSchema(defaultSchema, ast)
  const schemaTemplateData = schemaToTemplateContext(schema)
  return {schemaTemplateData, userSchema: schema}
}
