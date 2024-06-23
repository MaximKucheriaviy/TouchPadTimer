const { BrowserWindow, app, ipcMain } = require("electron");
const {
  portConnectionEvents,
  getPorts,
} = require("./serialPort/portConnectionsEvents");
const path = require("path");
const {
  connectPort,
  disconnectPort,
  getCurrentPort,
  sendMessage,
  resetPort,
  onPortData,
} = require("./serialPort/serialPorecess");
const wraper = require("./service/wraper");

let window;

const onArduinoMessage = (data) => {
  window.webContents.send("arduinoMessage", data);
};

const onPortConnected = async () => {
  if (!window) {
    return;
  }
  window.webContents.send("newPorts", await getPorts());
};

const onPortDisconnected = async () => {
  const ports = JSON.parse(await getPorts());
  const currentPort = getCurrentPort();
  window.webContents.send("newPorts", await getPorts());
  if (!currentPort) {
    return;
  }
  if (!ports.some((port) => port.path === currentPort.settings.path)) {
    resetPort();
    window.webContents.send("disconnect");
  }
};

const createMainWindow = () => {
  window = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.resolve("./preload.js"),
    },
  });
  window.loadURL("http://localhost:3000");

  return window;
};

app.whenReady().then(() => {
  console.log("app start");
  window = createMainWindow();
  console.log("start port watching");
  portConnectionEvents.on("connect", onPortConnected);
  portConnectionEvents.on("disconnect", onPortDisconnected);
  ipcMain.handle("getPorts", async () => await getPorts());
  ipcMain.handle("connect", wraper(connectPort));
  ipcMain.handle("disconnect", wraper(disconnectPort));
  ipcMain.handle("arduinoCommand", wraper(sendMessage));
  onPortData(onArduinoMessage);
});
