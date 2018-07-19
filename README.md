# THIS IS A PROTOTYPE!

## What?
This is a prototype to test the technical feasbility of allowing developers to use a Graphql schema file with declartive types and directives, to control the content data model, api, and UI for the content editors

## How?
The `tipe.graphql` file has some GraphQL types in it, this is essentially the developers GraphQL file. The program reads this file and converts it to an AST and a more human readable JSON respresentation. Using that AST and other JSON structure, GraphQL queries, mutations, inputs, enumns, and resovlvers are generated. You can then access the API.

## What does work?
* GQL SDL file to GQL quries and mutations
* queries have filtering for each type of field scalar
* Queries are only generated for `@type` types and `@page` types
* Mutations are generated
* Fake content is generated for queries. Matches schema types

## and what doesn't work
* mutations resolvers don't do anything yet
* query resolvers don't support formatting directives
* Not sanitizing the GraphQL file, so things may break if you add stuff like enums, inputs, or query types

## Getting started
* `yarn start`
