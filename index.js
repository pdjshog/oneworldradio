const { app, BrowserWindow, Menu, Tray } = require('electron')

function createWindow() {
  const win = new BrowserWindow({
    width: 450,
    height: 85,
    resizable: false,
    autoHideMenuBar: true,
    icon: 'assets/img/icon.png',
    titleBarStyle: 'customButtonsOnHover',
    alwaysOnTop: true,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false
    }
  })

  // let tray = new Tray('assets/img/icon.png');
  // const contextMenu = Menu.buildFromTemplate([
  //   { label: 'Item1', type: 'radio' },
  //   { label: 'Item2', type: 'radio' },
  //   { label: 'Item4', type: 'radio' }
  // ])
  // tray.setToolTip('This is my application.')
  // tray.setContextMenu(contextMenu)

  win.loadFile('index.html')
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})