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
