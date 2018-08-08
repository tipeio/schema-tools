import { components } from './constants'

const fieldDefaults = (type, name) =>
  ({
    String: {
      ui: {
        name,
        component: components.TEXT_BOX
      }
    },
    Int: {
      ui: {
        name,
        component: components.NUMBER_SELECT
      }
    },
    Float: {
      ui: {
        name,
        component: components.NUMBER_SELECT
      }
    },
    DateTime: {
      ui: {
        name,
        component: components.CALENDAR
      }
    },
    Email: {
      ui: {
        name,
        component: components.EMAIL
      }
    },
    Url: {
      ui: {
        name,
        component: components.URL
      }
    },
    Asset: {
      ui: {
        name,
        component: components.ASSET_PICKER
      }
    },
    Link: {
      ui: {
        name,
        component: components.LINK_PICKER
      }
    }
  }[type])

export const mixDefaults = field => {
  const { type, name } = field
  const defaults = fieldDefaults(type, name)
  return {
    ...field,
    directives: {
      ...defaults,
      ...field.directives
    },
    usesDirectives: true
  }
}

export const addDefaults = abstractType => {
  const fields = abstractType.fields.map(mixDefaults)
  return {
    ...abstractType,
    fields
  }
}
