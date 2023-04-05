import JSZip from 'jszip'
import { Base } from './base'

export function cookie(): Base {
  return {
    name: 'Cookie',
    async export(zip: JSZip): Promise<void> {
      zip.file(this.name + '.txt', document.cookie)
    },
    async import(zip: JSZip): Promise<void> {
      const file = zip.file(this.name + '.txt')
      if (!file) {
        return
      }
      document.cookie = await file.async('string')
    },
  }
}
