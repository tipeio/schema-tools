import { typeDefs } from './typeDefs'
import { scalars } from './scalars'
import { schemaDirectives } from './directives'
import { typeResolvers } from './typeResolvers'
import { createResolversForType } from './resolvers'
import { validateSchemaContext } from './validate'
import { Base } from '../base'

export const createBase = () =>
  new Base({
    name: 'Tipe',
    validateSchemaContext,
    baseTypeDefs: [typeDefs],
    scalars,
    schemaDirectives,
    typeResolvers,
    onTypeResolverFn: createResolversForType
  })
