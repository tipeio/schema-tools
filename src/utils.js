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
  }
}[type])

export const addDefaults = (abstractType) => {
  const fields = abstractType.fields.map(field => {
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
  })

  return {
    ...abstractType,
    fields
  }
}
