import { bases } from './bases'
import invariant from 'invariant'
import _ from 'lodash'

const validateOptions = opts => {
  invariant(
    opts.typeDefs && (_.isString(opts.typeDefs) || _.isArray(opts.typeDefs)),
    'Must supply "options.typeDefs"'
  )
  invariant(opts.crudResolvers, 'Must supply "options.crudResolvers"')

  const methods = ['getOne', 'getMany', 'create', 'remove', 'update']
  methods.forEach(method => {
    const crudMethod = opts.crudResolvers[method]
    invariant(
      crudMethod && _.isFunction(crudMethod),
      `Must supply a function for "options.crudResolvers.${method}"`
    )
  })

  const typeDefs = _.isArray(opts.typeDefs)
    ? opts.typeDefs.join('\n')
    : opts.typeDefs

  return { spec: 'tipe', ...opts, typeDefs }
}
export const createSchema = (options = {}) => {
  const opts = validateOptions(options)
  switch (opts.spec) {
    case 'tipe':
    case 'Tipe':
      return bases.tipe().createFinalSchema(opts.typeDefs, opts.crudResolvers)
  }

  throw new Error(`"${options.spec}" is not a valid CRUD Spec.`)
}
