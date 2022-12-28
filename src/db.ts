import Dexie, { Table } from 'dexie'
import { FundResponse } from './fund/api.response'

export class MySubClassedDexie extends Dexie {
  // 'friends' is added by dexie when declaring the stores()
  // We just tell the typing system this is the case
  fund!: Table<FundResponse>

  constructor() {
    super('myDatabase')
    this.version(1).stores({
      fund: '&fS_code, fS_name', // Primary key and indexed props
    })
  }
}

export const db = new MySubClassedDexie()
