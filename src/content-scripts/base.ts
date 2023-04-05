import JSZip from 'jszip'

export interface Base {
  name: string
  export(zip: JSZip): Promise<void>
  import(zip: JSZip): Promise<void>
}
