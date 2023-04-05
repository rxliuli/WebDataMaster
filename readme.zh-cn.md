# WebDataMaster

WebDataMaster 是一款高效实用的 Chrome 扩展，为用户提供便捷地导入和导出网站本地数据的功能，涵盖 Cookie、localStorage、sessionStorage 以及 IndexedDB 等多种数据类型。

使用场景：

1. 数据备份与恢复：借助 WebDataMaster，您可以轻松备份网站本地数据，防止意外丢失。如有需要，可随时将备份数据恢复至对应网站。
2. 调试与开发：WebDataMaster 为网站开发者提供便利，帮助获取用户出现错误时的本地缓存，从而更容易地复现特定情况下的错误。

使用：

1. 安装 WebDataMaster 扩展
2. 在网站上打开右键菜单选择“Export Data”或“Import Data”

局限性：

受 IndexedDB API 限制，恢复 IndexedDB 数据时，需要数据库和表已经存在（即使它们为空），否则无法完成恢复。
