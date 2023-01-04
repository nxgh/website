import Dexie, { Table } from 'dexie'
import { FundResponse } from '../fund/api.response'

export interface FundDetail {
  fS_code: string
  date: string
  net: number
  amount: number
}

export class MySubClassedDexie extends Dexie {
  fund!: Table<FundResponse>
  fundDetail!: Table<FundDetail>

  constructor() {
    super('myDatabase')
    this.version(0.2).stores({
      fund: '&fS_code, fS_name',
      fundDetail: '++id, fS_code',
    })
  }
}

export const db = new MySubClassedDexie()
