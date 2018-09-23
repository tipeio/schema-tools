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
    },
    ID: {
      ui: {
        name,
        component: components.READONLY_TEXT
      }
    }
  }[type])

// TODO: need to validate if the type can use given component
export const enhanceField = field => {
  const { type, name } = field
  const defaults = fieldDefaults(type, name)
  const directives = {
    ...defaults,
    ...field.directives
  }

  const { validations = {}, ui = {} } = directives

  return {
    ...field,
    directives,
    usesDirectives: true,
    validations: validations.options || {},
    ui: ui.options || {}
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

export const isOurType = type => {
  return Boolean(
    type.hasInterfaces &&
      type.interfaces.length &&
      /Document|Page/.test(type.interfaces[0])
  )
}

export const isPage = type => isOurType(type) && type.interfaces[0] === 'Page'
export const isInline = type => !isOurType(type)
export const isDocument = type =>
  (isOurType(type) && type.interfaces[0] === 'Document') ||
  type.name === 'Asset'
