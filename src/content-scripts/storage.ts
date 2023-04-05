import JSZip from 'jszip'
import { Base } from './base'

export function storage(name: string, s: Storage): Base {
  return {
    name,
    async export(zip: JSZip): Promise<void> {
      zip.file(this.name + '.json', JSON.stringify(s))
    },
    async import(zip: JSZip): Promise<void> {
      const file = zip.file(this.name + '.json')
      if (!file) {
        return
      }
      Object.assign(s, JSON.parse(await file.async('string')))
    },
  }
}
