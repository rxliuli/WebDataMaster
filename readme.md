# WebDataMaster

WebDataMaster is a highly efficient and practical Chrome extension that offers users the convenience of importing and exporting local website data, covering various data types such as Cookies, localStorage, sessionStorage, and IndexedDB.

Use cases:

1. Data backup and recovery: With WebDataMaster, you can easily back up local website data to prevent accidental loss. If needed, you can restore the backup data to the corresponding website at any time.
2. Debugging and development: WebDataMaster provides convenience for website developers by helping them retrieve local cache when users encounter errors, making it easier to reproduce errors under specific conditions.

Usage:

1. Install the WebDataMaster extension
2. On the website, open the right-click menu and select "Export Data" or "Import Data"

Limitations:

Due to IndexedDB API restrictions, when restoring IndexedDB data, the database and tables must already exist (even if they are empty) in order to complete the recovery.
