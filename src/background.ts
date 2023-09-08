import Browser from 'webextension-polyfill'

// 创建一个上下文菜单项
Browser.contextMenus.create({
  id: 'import',
  title: 'Import Data',
  contexts: ['page'],
})

// 创建另一个上下文菜单项
Browser.contextMenus.create({
  id: 'export',
  title: 'Export Data',
  contexts: ['page'],
})

// 为上下文菜单项添加事件监听器
Browser.contextMenus.onClicked.addListener(function (info, tab) {
  console.log('info', info, 'tab', tab)
  if (!tab?.id) {
    return
  }
  Browser.tabs.sendMessage(tab.id, { action: info.menuItemId })
})

// 监听来自 popup 的消息
Browser.runtime.onMessage.addListener(async function (
  message,
  sender,
  _sendResponse,
) {
  console.log('message', message, 'sender', sender)
  // 通过 sendResponse 返回消息
  const tab = (
    await Browser.tabs.query({ active: true, currentWindow: true })
  )[0]
  if (tab && tab.id) {
    await Browser.tabs.sendMessage(tab.id, { action: message.action })
  }
})
