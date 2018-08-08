# Schema Tools
> tools to help make sense out of users graphql and json schemas.

## Using
All you have to do is provide a schema string, and resolver map. More on the resolvers bellow
```js
import { createSchema } from '@tipe/schema-tools'


const userSchemaString = `
  type Author @type {
    firstName: String!
  }
`

const resolverMap = {
  getOne() {},
  getMany() {},
  create() {},
  remove() {},
  update() {},
  getPage() {}
}

// you can use this schema on all graphql servers instead of typedefs + resolvers
const schemaReadyForServer = createSchema(userSchemaString, resolverMap)
```

### Resolver map
There resolver map will be used to generated real resolvers based on the schema string and other extensions. Each method recieve the same args:
`(type, schemaTemplateData, userSchema)`

* `type`
  * An object representation from `schemaTemplateData` on the current graphql type that this resolver is executing for. Has information about the type's fields, directives, arguments, etc.
* `schemaTemplateData`
  * the entire object representation of the supplied schema string + all the extensions we provide. Will tell you everything about the entire schema.
* `userSchema`
  * the graphql schema of the given schema string + all the extensions we provide

All the methods must return an object just like this:
```js
{
  resolve() {}
}
```
Use the provided content and create a resolver function which is then returned and used as the resolver for queries and mutations

