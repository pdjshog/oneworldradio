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
  });

  win.allowExit = false;
  if (process.platform == 'darwin') {
    app.dock.hide();
  }

  win.on('close', (event) => {
    if (win.allowExit) {
      return true;
    }
    event.preventDefault();
    win.hide();
  });

  let tray = new Tray('assets/tray/icon.png');
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Play',
      type: 'normal',
      click: function (ecv) {
        win.webContents.send('play');
      }
    },
    {
      label: 'Pause',
      type: 'normal',
      click: function (ecv) {
        win.webContents.send('pause');
      }
    },
    {
      label: 'Toggle Player',
      type: 'normal',
      click: function (ecv) {
        if (win.isVisible()) {
          win.hide();
        } else {
          win.show();
        }
      }
    },
    {
      label: '',
      type: 'separator',
    },

    {
      label: 'Exit',
      type: 'normal',
      click: function () {
        win.allowExit = true;
        app.quit()
      }
    }
  ])
  tray.setToolTip('One World Radio');
  tray.setContextMenu(contextMenu);
  win.loadFile('index.html')
}

app.whenReady().then(createWindow)


app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})