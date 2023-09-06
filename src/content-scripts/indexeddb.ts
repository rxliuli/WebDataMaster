import {
  exportToJsonString,
  importFromJsonString,
} from 'indexeddb-export-import'
import { Base } from './base'
import { AsyncArray } from '@liuli-util/async'
import JSZip from 'jszip'
import { openDB, unwrap } from 'idb'

export async function exportIndexDBByInfo(
  info: IDBDatabaseInfo,
): Promise<string> {
  return new Promise(async (resolve, reject) => {
    exportToJsonString(
      unwrap(await openDB(info.name!, info.version)),
      (err, jsonString) => {
        if (err) {
          reject(err)
        } else {
          resolve(jsonString)
        }
      },
    )
  })
}

export async function importIndexDBByInfo(
  info: IDBDatabaseInfo,
  json: string,
): Promise<void> {
  return new Promise(async (resolve, reject) => {
    importFromJsonString(
      unwrap(await openDB(info.name!, info.version)),
      json,
      (err) => {
        if (err) {
          reject(err)
        } else {
          resolve()
        }
      },
    )
  })
}

export default function idb(): Base {
  return {
    name: 'IndexedDB',
    async export(zip: JSZip): Promise<void> {
      const dbs = await indexedDB.databases()
      if (dbs.length === 0) {
        return
      }
      await AsyncArray.forEach(dbs, async (it) => {
        const r = await exportIndexDBByInfo(it)
        zip.folder(this.name)!.file(it.name + '.json', r)
      })
      zip.file(this.name + '.json', JSON.stringify(dbs, null, 2))
    },
    async import(zip: JSZip): Promise<void> {
      const dbFile = zip.file(this.name + '.json')
      if (!dbFile) {
        return
      }
      const dbs = JSON.parse(await dbFile.async('string')) as IDBDatabaseInfo[]
      await AsyncArray.forEach(dbs, async (it) => {
        const s = await zip
          .folder(this.name)!
          .file(it.name + '.json')!
          .async('string')
        await importIndexDBByInfo(it, s)
      })
    },
  }
}
