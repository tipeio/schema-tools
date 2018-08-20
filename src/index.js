import { bases } from './bases'

export const createSchema = options => {
  const spec = options.spec || 'tipe'
  switch (spec) {
    case 'tipe':
    case 'Tipe':
      return bases
        .tipe()
        .createFinalSchema(options.typeDefs, options.crudResolvers)
  }

  throw new Error(`"${options.spec}" is not a valid CRUD Spec.`)
}
