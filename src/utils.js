const fieldDefaults = (type, name) =>({
  String: {
    ui: {
      name,
      component: 'SINGLE_LINE'
    }
  },
  Int: {
    ui: {
      name,
      component: 'NUMBER_SELECT'
    }
  },
  Float: {
    ui: {
      name,
      component: 'NUMBER_SELECT'
    }
  },
  DateTime: {
    ui: {
      name,
      component: 'CALENDAR'
    }
  },
  Email: {
    ui: {
      name,
      component: "EMAIL_INPUT"
    }
  },
  Url: {
    ui: {
      name,
      component: 'URL_INPUT'
    }
  },
  Asset: {
    ui: {
      name,
      component: 'ASSET_PICKER'
    }
  }
}[type])

export const mixDefaults = (field) => {
  const {type, name} = field
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

export const addDefaults = (abstractType) => {
  const fields = abstractType.fields.map(mixDefaults)
  return {
    ...abstractType,
    fields
  }
}
