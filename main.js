const { app, BrowserWindow } = require("electron");
var Toaster = require("electron-toaster");
const { Children } = require("react");
var toaster = new Toaster();
const exec = require("child_process").exec;

let mainWindow;

function createWindow() {
  process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";
  variable = exec("node backend/server.js");
  mainWindow = new BrowserWindow({
    width: 1380,
    height: 840,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  });

  // mainWindow.removeMenu();

  mainWindow.loadURL(`file://${__dirname}/index.html`);

  mainWindow.on("closed", () => {
    mainWindow = null;
  });

  variable.on("exit", () => {
    variable.kill();
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  app.quit();
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
