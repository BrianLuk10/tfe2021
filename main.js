const { app, ipcMain, BrowserWindow } = require("electron");
var Toaster = require("electron-toaster");
var toaster = new Toaster();

let mainWindow;

function createWindow() {
  process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";

  mainWindow = new BrowserWindow({
    width: 1380,
    height: 840,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  });

  //mainWindow.removeMenu();

  toaster.init(mainWindow);

  mainWindow.loadURL(`file://${__dirname}/index.html`);

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
