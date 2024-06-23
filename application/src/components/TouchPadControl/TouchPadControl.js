import { Box, Button } from "@mui/material";

export const TouchPadContol = ({ number }) => {
  const enableTouchPad = () => {
    window.mainApi.sendArduinoCommand("setEnable", { padNumber: number });
  };
  const disableTouchPad = () => {
    window.mainApi.sendArduinoCommand("setDisable", { padNumber: number });
  };
  return (
    <Box display={"flex"} flexDirection={"column"}>
      <h2>Трек {number + 1}</h2>
      <Button onClick={enableTouchPad} variant="contained">
        Включити
      </Button>
      <Button onClick={disableTouchPad} variant="contained">
        Виключити
      </Button>
    </Box>
  );
};
