import { useEffect, useState } from "react";
import { Select, Box, FormControl, MenuItem, Button } from "@mui/material";

export const PortConnecting = () => {
  const [ports, setPorts] = useState([]);
  const [port, setPort] = useState("");
  const [connected, setConnected] = useState(false);
  const onConnect = () => {
    window.mainApi.invokeMain("connect", port).then((data) => {
      const result = JSON.parse(data);
      console.log(result);
      if (result) {
        setConnected(true);
      }
    });
  };
  const onDisconnect = () => {
    window.mainApi.invokeMain("disconnect", port).then((data) => {
      const result = JSON.parse(data);
      console.log(result);
      if (result) {
        setConnected(false);
      }
    });
  };
  useEffect(() => {
    const onPortConnected = (data) => {
      const ports = JSON.parse(data);
      setPorts(ports);
    };
    const onDisconnect = () => {
      setConnected(false);
      setPort("");
    };
    const onArduinoMessage = (data) => {
      console.log(data);
    };
    window.mainApi.invokeMain("getPorts").then((data) => {
      setPorts(JSON.parse(data));
    });
    window.mainApi.addListener("newPorts", onPortConnected);
    window.mainApi.addListener("disconnect", onDisconnect);
    window.mainApi.addListener("arduinoMessage", onArduinoMessage);
    return () => {
      window.mainApi.removeListener("newPorts", onPortConnected);
      window.mainApi.removeListener("disconnect", onDisconnect);
      window.mainApi.removeListener("arduinoMessage", onArduinoMessage);
    };
  }, []);
  return (
    <Box
      padding={2}
      display={"flex"}
      gap={2}
      borderBottom={"1px solid black"}
      marginBottom={2}
    >
      <Box width={"300px"}>
        <FormControl fullWidth>
          {/* <InputLabel>Порт</InputLabel> */}
          <Select
            sx={{ height: "40px" }}
            onChange={(event) => {
              setPort(event.target.value);
            }}
            value={port}
          >
            {ports.map((item) => (
              <MenuItem key={item.path} value={item.path}>
                {item.path}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      {connected ? (
        <Button onClick={onDisconnect} variant="contained">
          Роз'єднати
        </Button>
      ) : (
        <Button onClick={onConnect} variant="contained">
          З'єднати
        </Button>
      )}
    </Box>
  );
};
