import { Box, Button } from "@mui/material";
import { PortConnecting } from "./components/PortConnecting/PortConnecting";

function App() {
  const echoClick = () => {
    window.mainApi.sendArduinoCommand("echo");
  };

  return (
    <div className="App">
      <PortConnecting />
      <Box>
        <Button onClick={echoClick} variant="contained">
          echo
        </Button>
      </Box>
    </div>
  );
}

export default App;
