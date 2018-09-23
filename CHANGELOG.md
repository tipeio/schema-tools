## [2.3.1](https://github.com/tipeio/schema-tools/compare/v2.3.0...v2.3.1) (2018-09-23)

# [2.3.0](https://github.com/tipeio/schema-tools/compare/v2.2.0...v2.3.0) (2018-09-20)


### Features

* **fields:** add helpful meta to fields ([3144c53](https://github.com/tipeio/schema-tools/commit/3144c53))

# [2.2.0](https://github.com/tipeio/schema-tools/compare/v2.1.1...v2.2.0) (2018-09-20)


### Features

* **meta:** add type meta to types ([84b1866](https://github.com/tipeio/schema-tools/commit/84b1866))

## [2.1.1](https://github.com/tipeio/schema-tools/compare/v2.1.0...v2.1.1) (2018-08-23)


### Bug Fixes

* **args:** fix memory leak for inputs ([41c706b](https://github.com/tipeio/schema-tools/commit/41c706b)), closes [#19](https://github.com/tipeio/schema-tools/issues/19)

# [2.1.0](https://github.com/tipeio/schema-tools/compare/v2.0.0...v2.1.0) (2018-08-23)


### Bug Fixes

* **args:** fix mutation args for ID types ([1e3825f](https://github.com/tipeio/schema-tools/commit/1e3825f)), closes [#22](https://github.com/tipeio/schema-tools/issues/22)


### Features

* **resolvers:** add parsed info to context ([57d7b27](https://github.com/tipeio/schema-tools/commit/57d7b27))

# [2.0.0](https://github.com/tipeio/schema-tools/compare/v1.1.0...v2.0.0) (2018-08-21)


### Features

* **tipe-spec:** add mutation args ([d3f2009](https://github.com/tipeio/schema-tools/commit/d3f2009))


### BREAKING CHANGES

* **tipe-spec:** `Page` interface uses `_meta!` type of `Meta` now
* **tipe-spec:** `Page` interface uses `_pageMeta!` type of `PageMeta` instead of `pageInfo!` type of `PageInfo`
