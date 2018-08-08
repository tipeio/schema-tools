export const components = [
  'TEXT_BOX',
  'NUMBER_SELECT',
  'CALENDAR',
  'EMAIL',
  'URL',
  'ASSET_PICKER',
  'LINK_PICKER',
  'MARKDOWN',
  'SWITCH'
].reduce((mem, component) => (mem[component] = component), {})

export const ourTypes = { PageInfo: false, Asset: false }
