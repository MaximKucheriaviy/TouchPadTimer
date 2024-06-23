const { SerialPort } = require("serialport");
const { DelimiterParser } = require("@serialport/parser-delimiter");

let port;
let parser;
let onPortDataCallback = (data) => {
  console.log(data);
};

const wraper = (data) => {
  onPortDataCallback(data.toString("utf-8"));
};

const connectPort = (path) => {
  if (port) {
    port.unpipe();
    port.close();
  }
  port = new SerialPort({ path, baudRate: 9600 }, (err) => {
    if (err) {
      console.log(err);
      throw err;
    }
    console.log("port connected");
  });
  parser = port.pipe(new DelimiterParser({ delimiter: "\n" }));
  parser.on("data", wraper);
  return "port connected";
};

const onPortData = (callback) => {
  onPortDataCallback = callback;
};

const disconnectPort = () => {
  port.unpipe();
  port.close();
  port = undefined;
  parser = undefined;
  return "port disconnected";
};
const resetPort = () => {
  port = undefined;
  parser = undefined;
};

const sendMessage = (message) => {
  if (!port) {
    return;
  }
  port.write(`${message}\n`);
};

const getCurrentPort = () => {
  return port;
};

module.exports = {
  connectPort,
  disconnectPort,
  onPortData,
  sendMessage,
  getCurrentPort,
  resetPort,
};
