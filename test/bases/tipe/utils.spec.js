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

  describe('enhanceField', () => {
    test('mix in defaults', () => {
      const field = {
        type: 'String',
        name: 'the email of the user',
        usesDirectives: false
      }
      const newField = utils.enhanceField(field)

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
      const newField = utils.enhanceField(field)

      expect(newField.usesDirectives).toBe(true)
      expect(newField.directives).toBeTruthy()
      expect(newField.directives.ui.component).toBe('HELLO')
      expect(newField.directives.ui.name).toBe('poop')
    })
  })

  describe('types', () => {
    test('isOurType', () => {
      let doc = { hasInterfaces: true, interfaces: ['Document'] }
      let page = { hasInterfaces: true, interfaces: ['Page'] }
      expect(utils.isOurType(doc)).toBe(true)
      expect(utils.isOurType(page)).toBe(true)

      doc = { hasInterfaces: true, interfaces: ['Document', 'Page'] }
      page = { hasInterfaces: true, interfaces: ['Page', 'Document'] }
      expect(utils.isOurType(doc)).toBe(true)
      expect(utils.isOurType(page)).toBe(true)

      doc = { hasInterfaces: false, interfaces: ['Document', 'Page'] }
      page = { hasInterfaces: false, interfaces: ['Page', 'Document'] }
      expect(utils.isOurType(doc)).toBe(false)
      expect(utils.isOurType(page)).toBe(false)

      doc = { hasInterfaces: true, interfaces: ['Poop'] }
      page = { hasInterfaces: true, interfaces: [] }
      expect(utils.isOurType(doc)).toBe(false)
      expect(utils.isOurType(page)).toBe(false)
    })
    test('isDocument', () => {
      const type = { hasInterfaces: true, interfaces: ['Document'] }
      expect(utils.isDocument(type)).toBe(true)
    })
    test('isPage', () => {
      const type = { hasInterfaces: true, interfaces: ['Page'] }
      expect(utils.isPage(type)).toBe(true)
    })
  })
})
