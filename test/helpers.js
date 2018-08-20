import fs from 'fs'
import path from 'path'
import { promisify } from 'util'

const readFileAsync = promisify(fs.readFile)

export const loadSchema = name => {
  return readFileAsync(path.resolve(__dirname, `fixtures/${name}.graphql`), {
    encoding: 'utf-8'
  })
}
