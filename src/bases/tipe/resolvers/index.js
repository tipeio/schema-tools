import { genNames, isDocument, isPage } from '../utils'
import { ourTypes } from '../constants'
import _ from 'lodash'
import * as mutations from './mutation'
import * as queries from './query'

export const createResolverForDocument = (type, crudResolvers, base) => {
  const resolvers = {
    queries: {},
    mutations: {}
  }

  const names = genNames(type.name)

  resolvers.queries[names.cap] = queries.getOne(
    crudResolvers.getOne,
    type,
    base.schemaContext,
    base.schemaWithoutActions
  )
  resolvers.queries[names.many] = queries.getMany(
    crudResolvers.getMany,
    type,
    base.schemaContext,
    base.schemaWithoutActions
  )

  resolvers.mutations[names.create] = mutations.create(
    crudResolvers.create,
    type,
    base.schemaContext,
    base.schemaWithoutActions
  )
  resolvers.mutations[names.remove] = mutations.remove(
    crudResolvers.remove,
    type,
    base.schemaContext,
    base.schemaWithoutActions
  )
  resolvers.mutations[names.update] = mutations.update(
    crudResolvers.update,
    type,
    base.schemaContext,
    base.schemaWithoutActions
  )

  return resolvers
}

export const createResolverForPage = (type, crudResolvers, base) => {
  const resolvers = {
    queries: {},
    mutations: {}
  }

  resolvers.queries[type.name] = queries.getOne(
    crudResolvers.getOne,
    type,
    base.schemaContext,
    base.schemaWithoutActions
  )
  return resolvers
}

export const createResolversForType = (type, crudResolvers, base) => {
  // don't create resolvers for Types we provide in the foundational schema like Page and Document
  if (_.has(ourTypes, type.name)) {
    return { queries: {}, mutations: {} }
  }

  if (isDocument(type)) {
    return createResolverForDocument(type, crudResolvers, base)
  }
  if (isPage(type)) {
    return createResolverForPage(type, crudResolvers, base)
  }

  return { queries: {}, mutations: {} }
}
