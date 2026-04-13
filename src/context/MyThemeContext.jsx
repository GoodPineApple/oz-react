// 이 파일에 대해서만 eslint 규칙 끄기
/* eslint-disable react-refresh/only-export-components */

import { createContext, useState, useContext } from "react";

// theme color : "light" or "dark"
const MyThemeContext = createContext("light");

const MyThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  return (
    <MyThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </MyThemeContext.Provider>
  );
};

const useMyTheme = () => {
  const context = useContext(MyThemeContext);
  if (!context) {
    throw new Error("useMyTheme must be used within a MyThemeProvider");
  }
  return context;
};

export { MyThemeContext, MyThemeProvider, useMyTheme };
