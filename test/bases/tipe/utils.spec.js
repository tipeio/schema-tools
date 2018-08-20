import * as utils from '../../../src/bases/tipe/utils'
import * as constants from '../../../src/bases/tipe/constants'

describe('utils', () => {
  describe('genNames', () => {
    test('generates correct names', () => {
      const names = utils.genNames('peson')
      const props = [
        'name',
        'plural',
        'cap',
        'capPlural',
        'camel',
        'camPlural',
        'many',
        'create',
        'remove',
        'update'
      ]
      props.forEach(prop => expect(names).toHaveProperty(prop))
    })

    test('handles multi word names', () => {
      const name = 'big author'
      const names = utils.genNames(name)

      expect(names.name).toBe(name)
      expect(names.plural).toBe('bigAuthors')
      expect(names.cap).toBe('BigAuthor')
      expect(names.capPlural).toBe('BigAuthors')
      expect(names.many).toBe('bigAuthors')
      expect(names.create).toBe('newBigAuthor')
      expect(names.remove).toBe('removeBigAuthor')
      expect(names.update).toBe('updateBigAuthor')
    })
  })

  describe('mixDefaults', () => {
    test('mix in defaults', () => {
      const field = {
        type: 'String',
        name: 'the email of the user',
        usesDirectives: false
      }
      const newField = utils.mixDefaults(field)

      expect(newField.usesDirectives).toBe(true)
      expect(newField.directives).toBeTruthy()
      expect(newField.directives.ui.component).toBe(
        constants.components.TEXT_BOX
      )
      expect(newField.directives.ui.name).toBe(field.name)
    })

    test('does not override existing', () => {
      const field = {
        type: 'Email',
        name: 'the email of the user',
        usesDirectives: true,
        directives: {
          ui: {
            component: 'HELLO',
            name: 'poop'
          }
        }
      }
      const newField = utils.mixDefaults(field)

      expect(newField.usesDirectives).toBe(true)
      expect(newField.directives).toBeTruthy()
      expect(newField.directives.ui.component).toBe('HELLO')
      expect(newField.directives.ui.name).toBe('poop')
    })
  })
})
