import { validateSchemaContext } from '../../../src/bases/tipe/validate'

describe('tipe spec validate', () => {
  describe('validaeSchemaContext', () => {
    test('errors if no documents or pages', () => {
      const schemaContext = {
        types: [{ hasInterfaces: false, interfaces: ['Document'] }]
      }
      expect(() => {
        validateSchemaContext(schemaContext)
      }).toThrow()
    })

    test('valid if has one Page', () => {
      const schemaContext = {
        types: [{ hasInterfaces: true, interfaces: ['Page'] }]
      }
      expect(() => {
        validateSchemaContext(schemaContext)
      }).not.toThrow()
    })

    test('valid if has one Document', () => {
      const schemaContext = {
        types: [{ hasInterfaces: true, interfaces: ['Document'] }]
      }
      expect(() => {
        validateSchemaContext(schemaContext)
      }).not.toThrow()
    })
  })
})
