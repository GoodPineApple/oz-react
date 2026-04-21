import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { CssBaseline, ThemeProvider } from "@mui/material";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { appTheme } from "./theme";
import { AuthProvider } from "./context/AuthContext";
import { MyThemeProvider } from "./context/MyThemeContext";
import { AlertProvider } from "./context/AlertContext";
import { Provider } from "react-redux";
import { store } from "./store";

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found");
}

createRoot(rootElement).render(
  <StrictMode>
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Provider store={store}>
          <AuthProvider>
            <MyThemeProvider>
              <AlertProvider>
                <App />
              </AlertProvider>
            </MyThemeProvider>
          </AuthProvider>
        </Provider>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
);
