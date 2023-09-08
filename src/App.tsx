import icon from './assets/icon.svg'
import Browser from 'webextension-polyfill'

function App() {
  async function onExport() {
    await Browser.runtime.sendMessage({ action: 'export' })
  }

  return (
    <div className="w-screen h-screen min-w-[320px] bg-stone-800 text-white flex items-center justify-center font-sans">
      <div className="max-w-md p-8 text-center">
        <img
          src={icon}
          className={'h-[6rem] inline-block p-6'}
          alt="Vite logo"
        />
        <div className={'p-6 flex space-x-4'}>
          <button
            className={
              'rounded-lg border border-transparent px-3 py-2 text-base font-medium bg-stone-950 cursor-pointer transition-colors duration-200'
            }
            onClick={onExport}
          >
            Export
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
