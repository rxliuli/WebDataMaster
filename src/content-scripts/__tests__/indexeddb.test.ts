import 'fake-indexeddb/auto'
import { expect, it } from 'vitest'
import { DBSchema, openDB } from 'idb'
import { exportIndexDBByInfo, importIndexDBByInfo } from '../indexeddb'

it('import and export', async () => {
  interface AllSchema extends DBSchema {
    user: {
      key: string
      value: {
        id: string
        name: string
      }
    }
  }

  const db = await openDB<AllSchema>('test', 1, {
    upgrade(db) {
      db.createObjectStore('user', { keyPath: 'id' })
    },
  })

  await db.add('user', {
    id: Date.now().toString(),
    name: 'liuli',
  })

  const r = await exportIndexDBByInfo({ name: 'test', version: 1 })
  expect(r).includes('liuli')
  console.log(r)
})
