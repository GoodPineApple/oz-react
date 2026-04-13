import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { CssBaseline, ThemeProvider } from "@mui/material";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { appTheme } from "./theme.js";
import { AuthProvider } from "./context/AuthContext.jsx";
import { MyThemeProvider } from "./context/MyThemeContext.jsx";
import { AlertProvider } from "./context/AlertContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <BrowserRouter>
        <AuthProvider>
          <MyThemeProvider>
            <AlertProvider>
              <App />
            </AlertProvider>
          </MyThemeProvider>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
);
