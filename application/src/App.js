import { Box, Button } from "@mui/material";
import { PortConnecting } from "./components/PortConnecting/PortConnecting";
import { TouchPadContol } from "./components/TouchPadControl/TouchPadControl";

function App() {
  return (
    <div className="App">
      <PortConnecting />
      <Box>
        <Box display={"flex"} justifyContent={"space-around"}>
          <TouchPadContol number={0} />
          <TouchPadContol number={1} />
          <TouchPadContol number={2} />
          <TouchPadContol number={3} />
        </Box>
        <Box>
          <Button onClick={() => window.mainApi.sendArduinoCommand("reset")}>
            Рестарт
          </Button>
        </Box>
      </Box>
    </div>
  );
}

export default App;
