import * as graphqlCodeGen from 'graphql-codegen-core'
import * as defaults from './defaults'

const addDefaultsToUIDirective = field => {
  const defaultUIComponent = field.isScalar
    ? defaults.ui[field.type]
    : defaults.ui.Object

  const UIcomponent =
    field.directives.ui && field.directives.ui.component
      ? field.directives.ui.component
      : defaultUIComponent

  const UIdirective = {
    options: { component: UIcomponent, list: field.isArray }
  }

  return {
    ...field,
    directives: {
      ...field.directives,
      ui: UIdirective
    }
  }
}

const addDefaultsToField = field => ({
  ...field,
  directives: {
    ...field.directives,
    ui: addDefaultsToUIDirective(field)
  }
})

const addDefaults = templatesContext => ({
  types: templatesContext.types.map(type => ({
    ...type,
    fields: type.fields.map(addDefaultsToField)
  }))
})

const extendTemplateContextWithDefaults = templatesContext => {
  return addDefaults(templatesContext)
}

export const schemaToTemplateContext = templateContext => {
  return extendTemplateContextWithDefaults(
    graphqlCodeGen.schemaToTemplateContext(templateContext)
  )
}
