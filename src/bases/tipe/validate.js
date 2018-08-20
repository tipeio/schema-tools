import { isOurType } from './utils'

export const validateSchemaContext = schemaCtx => {
  const validTypes = schemaCtx.types.filter(isOurType)

  if (!validTypes.length) {
    throw new Error(
      'TypeDefs must have at least one Type that uses Document or Page'
    )
  }
}
