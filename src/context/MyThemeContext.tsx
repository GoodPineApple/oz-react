/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useState,
  useContext,
  type ReactNode,
} from "react";

type ThemeMode = "light" | "dark";

interface MyThemeContextValue {
  theme: ThemeMode;
  toggleTheme: () => void;
}

const MyThemeContext = createContext<MyThemeContextValue | null>(null);

interface MyThemeProviderProps {
  children: ReactNode;
}

const MyThemeProvider = ({ children }: MyThemeProviderProps) => {
  const [theme, setTheme] = useState<ThemeMode>("light");
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  return (
    <MyThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </MyThemeContext.Provider>
  );
};

const useMyTheme = (): MyThemeContextValue => {
  const context = useContext(MyThemeContext);
  if (!context) {
    throw new Error("useMyTheme must be used within a MyThemeProvider");
  }
  return context;
};

export { MyThemeContext, MyThemeProvider, useMyTheme };
