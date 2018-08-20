import { components } from './constants'
const pascal = require('pascal-case')
const camel = require('camel-case')
const pluralize = require('pluralize')

export const fieldDefaults = (type, name) =>
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
    Asset: {
      ui: {
        name,
        component: components.MEDIA
      }
    },
    Boolean: {
      ui: {
        name,
        component: components.TOGGLE
      }
    }
  }[type])

// TODO: need to validate if the type can use given component
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

export const genNames = name => ({
  name,
  plural: camel(pluralize(name)),
  cap: pascal(name),
  capPlural: pascal(pluralize(name)),
  camel: camel(name),
  camPlural: camel(pluralize(name)),
  many: `${camel(pluralize(name))}`,
  create: `new${pascal(name)}`,
  remove: `remove${pascal(name)}`,
  update: `update${pascal(name)}`
})
