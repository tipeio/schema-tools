import { isPage, isDocument, isInline, isAsset, enhanceField } from './utils'

export const mapType = type => {
  if (isPage(type)) {
    type.isPage = true
  } else if (isDocument(type)) {
    type.isDocument = true
  } else if (isInline(type)) {
    type.isInline = true
  } else if (isAsset(type)) {
    type.isAsset = true
  }
  // add metadata from directives to fields
  type.fields = (type.fields || []).map(enhanceField)
  return type
}
