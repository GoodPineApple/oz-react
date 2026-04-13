import { createContext, useState } from "react";

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

export { MyThemeContext, MyThemeProvider };

// export const useMyTheme = () => {
//   const context = useContext(MyThemeContext);
//   if (!context) {
//     throw new Error("useMyTheme must be used within a MyThemeProvider");
//   }
//   return context;
// };
