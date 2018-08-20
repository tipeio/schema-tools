[![Build Status](https://travis-ci.com/tipeio/schema-tools.svg?token=EQ5HvjJr8JfYeW6tMZwY&branch=master)](https://travis-ci.com/tipeio/schema-tools)
# GraphQL Flex
> Tools to help build GraphQL servers with nodejs 💯
___
-  [Overview](#what-is-this)
- 🙌🏾 [Usage](#usage)
    * ✅ [Requirements](#requirements)
    * 💻 [Installation](#installation)
    * 🚀[Quick Start](#quick-start)
    * 📖 [API](#api)
    * [Crud Specs](#crud-specs)
      * [Tipe Spec](#tipe-spec)
      * [OpenCRUD Spec](#opencrud-spec)
      * ➕ [Custom Spec](#custom-spec)
- ❓ [FAQ](#faq)
- 🔨 [Community](#community)
- 🗺 [Roadmap](#roadmap)


# Overview
* **Build CRUD GraphQL APIs on the fly**:
  * Dynamically generate APIs based off typeDefs and generic resolvers
  * Perfect for when you need many GraphQL API's with different typeDefs, against one DB, at runtime!
  * Use for production servers or locally for mocking
  * Outputs to GraphQL crud specs like Tipe or OpenCrud, or create your own spec!💯
* **Works with**: All GraphQL servers ♻️
# Usage
## Requirements
* `node v6+`
## Installation
With **npm**
`npm install @tipe/graphql-flex`

With **yarn**
`yarn add @tipe/graphql-flex`
## Quick Start
```js
import { createSchema } from '@tipe/graphql-flex'

// They don't actually do anything, but will be used for crud resolvers
const crudResolvers = {
  getOne() {},
  getMany() {},
  create() {},
  remove() {},
  update() {}
}

// Tipe GraphQL SDL Spec
const typeDefs = `
type Author implements Document {
  _meta: Meta!
  name: String!
  bio: String!
    @validations(options: {minlength: 140, maxlength: 300})

  posts: [Post]!
}

type Post implements Document {
  _meta: Meta!
  title: String!
    @validations(options: {unique: true})

  body: String!
    @validations(options: {minlength: 500})
}`

// you can now use this schema on any graphql server library or combine with other schemas.
const schema = createSchema({
  spec: 'tipe',
  typeDefs,
  crudResolvers
})
```

## API
### `createSchema(options: FlexOptions): GraphQLSchema`
the `options` argument takes the following fields:

| **Key**  | **Type**  | **Default**  | **Info**  |
| ------------ | ------------ | ------------ | ------------ |
| `spec`  | `String`  | `'tipe'`  | The crud spec you want to generate.  |
| `typeDefs`  | `String`  | `null`  | The GraphQL typeDefs that implement the spec you are outputing to.  |
| `crudResolvers` | `Object` | `{}` | A map of the generic resolvers used to create the actual resolvers by the spec that you are outputting to.   |


the `crudResolvers` is an `Object`with the following fields:

| **Key** | **Type** | **Default** | **Info** |
| ---------- | ---------- | ---------- | ---------- |
| `getOne` | `Function` | `null` | Used as the resolver for **queries** that return just one result |
| `getMany` | `Function` | `null` | Used as the resolver for **queries** that returns a list of results |
| `create` | `Function` | `null` | Used as the resolver for **mutations** that create |
| `update` | `Function` | `null` | Used as the resolver for **mutations** that update |
| `remove` | `Function` | `null` | Used as the resolver for **mutations** that remove |


All `crudResolver` functions accept standard [GraphQL Resolver args](https://www.apollographql.com/docs/graphql-tools/resolvers#Resolver-function-signature).


`crudResolverFn(startValue, args, context, info)`.


**Additional** properties will be added the `context` object to help assit with making the resolvers generic.


Here are the following properties added on the `context` object:

| **Key** | **Type** | **Info** |
| ---------- | ---------- | ---------- |
| `type` | [Type](https://github.com/dotansimha/graphql-code-generator/blob/master/packages/graphql-codegen-core/src/types.ts#L56) | The return type of the current resolver. Defined in the TypeDefs. Useful to ensure the correct type is returned.|
| `schemaContext` | [SchemaTemplateContext](https://github.com/dotansimha/graphql-code-generator/blob/master/packages/graphql-codegen-core/src/types.ts#L98) | The output of transforming the GraphQL AST with `graphql-code-generator`. Useful to refernce other types in the resolver |
| `schema` | `GraphQLSchema` | The GraphqlSchema instance |
---
## CRUD Specs
`GraphQL Flex` outputs to many different GraphQL CRUD specs. 
### Tipe Spec
coming soon
### OpenCRUD spec
coming soon
### Custom Spec
coming soon
# FAQ
coming soon
# Community
coming soon
# Roadmap
comming soon

