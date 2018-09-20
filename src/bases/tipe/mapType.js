import { isPage } from './utils'

export const mapType = type => {
  if (isPage(type)) {
    type.isPage = true
  }
  return type
}
