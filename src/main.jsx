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
import { Provider } from "react-redux";
import { store } from "./store/index.js";

createRoot(document.getElementById("root")).render(
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
