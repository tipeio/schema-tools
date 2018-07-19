import _ from 'lodash'
import { makeRemoteExecutableSchema } from 'graphql-tools';
const Chance = require('chance')

const getField = (fields, fieldName) => {
  return _.find(fields, field => field.name === fieldName)
}

const makeMarkdown = (isArray) => {
  const paragraph = chance.paragraph({sentences: 10})
  const text = `## ${chance.word()}\n${paragraph}`
  return isArray
    ? [text, text, text]
    : text
}

const makeSingleLineText = (isArray) => {
  return isArray
    ? [chance.word(), chance.word(), chance.word()]
    : chance.word()
}

const makeNumberSelect = (isArray) => {
  return isArray
    ? [
        chance.natural({ min: 1, max: 100000 }),
        chance.natural({ min: 1, max: 1000000 }),
        chance.natural({ min: 1, max: 1000 })
      ]
    : chance.natural({ min: 1, max: 100000 })
}

const makeCalendar = (isArray) => {
  return isArray
    ? [new Date(chance.date({string: true})).toISOString(), new Date(chance.date({string: true})).toISOString()]
    : new Date(chance.date({string: true})).toISOString()
}

const makeEamil = (isArray) => {
  return isArray
    ? [chance.email(), chance.email(), chance.email(), chance.email()]
    : chance.email()
}

const makeUrl = (isArray) => {
  return isArray
    ? [chance.url(), chance.url(), chance.url()]
    : chance.url()
}

const getConentForType = (component, isArray) => {
  switch(component) {
    case 'MARKDOWN':
      return makeMarkdown(isArray)
    case 'SINGLE_LINE':
      return makeSingleLineText(isArray)
    case 'NUMBER_SELECT':
      return makeNumberSelect(isArray)
    case 'CALENDAR':
      return makeCalendar(isArray)
    case 'EMAIL_INPUT':
      return makeEamil(isArray)
    case 'URL_INPUT':
      return makeUrl(isArray)
  }
}

const chance = new Chance()

export const genFakeContent = (infoObject, fields, result = {}) => {
  return _.reduce(infoObject.fieldsByTypeName, (_result, type) => {
    _.forEach(type, (field) => {
      if (_.isEmpty(field.fieldsByTypeName)) {
        const fieldInfo = getField(fields, field.name)
        _result[field.name] = getConentForType(fieldInfo.directives.ui.component, fieldInfo.isArray)
      } else {
        _result[field.name] = genFakeContent(field, fields, _result)
      }
    })
    return _result
  }, result)
}
