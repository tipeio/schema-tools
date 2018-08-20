export const typeResolvers = {
  Page: {
    __resolveType(page) {
      return page.type
    }
  },
  Document: {
    __resolveType(doc) {
      return doc.type
    }
  }
}
