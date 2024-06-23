const { contextBridge, ipcRenderer } = require("electron");
console.log("preload script");

contextBridge.exposeInMainWorld("mainApi", {
  invokeMain: (channel, data) => {
    return ipcRenderer.invoke(channel, data);
  },
  sendArduinoCommand: (command, params = "") => {
    return ipcRenderer.invoke(
      "arduinoCommand",
      JSON.stringify({ command, params })
    );
  },
  addListener: (channel, callback) => {
    ipcRenderer.addListener(channel, (event, value) => callback(value));
  },
  removeListener: (channel, callback) => {
    ipcRenderer.removeListener(channel, (event, value) => callback(value));
  },
});
