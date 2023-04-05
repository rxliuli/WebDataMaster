import Browser from 'webextension-polyfill'
import saveAs from 'file-saver'
import { AsyncArray } from '@liuli-util/async'
import JSZip from 'jszip'
import idb from './indexeddb'
import { cookie } from './cookie'
import { storage } from './storage'

const list = [idb(), cookie(), storage('localStorage', localStorage), storage('sessionStorage', sessionStorage)]

async function exportData() {
  const zip = new JSZip()
  await AsyncArray.forEach(list, async (it) => it.export(zip))
  const blob = await zip.generateAsync({ type: 'blob' })
  saveAs(blob, 'export.zip')
}

async function importData() {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = '.zip'
  input.onchange = async () => {
    const file = input.files?.[0]
    if (!file) {
      return
    }
    try {
      const zip = await JSZip.loadAsync(file)
      await AsyncArray.forEach(list, async (it) => it.import(zip))
      alert('Import success')
    } catch (e) {
      alert('Import failed')
      throw e
    }
  }
  input.click()
}

Browser.runtime.onMessage.addListener(async (message) => {
  console.log('message', message)
  switch (message.action) {
    case 'export':
      await exportData()
      break
    case 'import':
      await importData()
      break
  }
  return true
})
