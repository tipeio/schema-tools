import { isPage, isDocument, isInline, enhanceField } from './utils'

export const mapType = type => {
  if (isPage(type)) {
    type.isPage = true
  } else if (isDocument(type)) {
    type.isDocument = true
  } else if (isInline(type)) {
    type.isInline = true
  }
  // add metadata from directives to fields
  type.fields = (type.fields || []).map(enhanceField)
  return type
}
