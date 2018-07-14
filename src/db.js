import {createConnection} from "typeorm"
import entities from './models'

export const startDB = () => {
  return createConnection({
    entities,
    type: 'postgres',
    url: 'postgres://localhost/hendrixer'
  })
}
