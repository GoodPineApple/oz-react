import { createContext, useState, type ReactNode } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert, { type AlertColor } from "@mui/material/Alert";

type ShowAlert = (
  message: string,
  severity: AlertColor,
  duration?: number,
) => void;

interface AlertState {
  open: boolean;
  message: string;
  severity: AlertColor;
  duration: number;
}

const AlertContext = createContext<ShowAlert>(() => {});

interface AlertProviderProps {
  children: ReactNode;
}

const AlertProvider = ({ children }: AlertProviderProps) => {
  const [alert, setAlert] = useState<AlertState>({
    open: false,
    message: "",
    severity: "info",
    duration: 6000,
  });

  const showAlert: ShowAlert = (message, severity, duration = 6000) => {
    setAlert({ open: true, message, severity, duration });
  };
  const handleClose = () => {
    setAlert({ ...alert, open: false });
  };

  return (
    <AlertContext.Provider value={showAlert}>
      {children}
      <Snackbar
        open={alert.open}
        autoHideDuration={alert.duration}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={alert.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </AlertContext.Provider>
  );
};

export { AlertContext, AlertProvider };
