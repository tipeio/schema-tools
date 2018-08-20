export const validateSchemaContext = schemaCtx => {
  const validTypes = schemaCtx.types.filter(type => {
    return (
      type.hasInterfaces &&
      type.interfaces.length === 1 &&
      /(Document|Page)/.test(type.interfaces[0])
    )
  })

  if (!validTypes.length) {
    throw new Error(
      'TypeDefs must have at least one Type that uses Document or Page'
    )
  }
}
