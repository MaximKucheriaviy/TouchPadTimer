const { SerialPort } = require("serialport");
const { EventEmitter } = require("events");

const portConnectionEvents = new EventEmitter();

let portsCount = 0;
let portList = [];

const watchPorts = async () => {
  portList = await SerialPort.list();
  if (portList.length > portsCount) {
    portsCount = portList.length;
    portConnectionEvents.emit("connect");
  } else if (portList.length < portsCount) {
    portsCount = portList.length;
    portConnectionEvents.emit("disconnect");
  }
};

const getPorts = async () => {
  const p = (await SerialPort.list()).filter((item) => item.vendorId);

  return JSON.stringify(p);
};

setInterval(watchPorts, 400);

module.exports = {
  portConnectionEvents,
  portList,
  getPorts,
};
