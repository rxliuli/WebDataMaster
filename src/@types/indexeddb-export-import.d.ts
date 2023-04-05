declare module 'indexeddb-export-import' {
  export function exportToJsonString(db: IDBDatabase, callback: (err, jsonString) => void): void
  export function importFromJsonString(db: IDBDatabase, jsonString: string, callback: (err) => void): void
  export function clearDatabase(db: IDBDatabase, callback: (err) => void): void
}
