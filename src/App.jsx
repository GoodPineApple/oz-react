import "./App.css";
import { Routes, Route } from "react-router-dom";
import MainPage from "./main/MainPage";
import Day25Page from "./day25/Day25Page";
import Day26Page from "./day26/Day26Page";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/day25" element={<Day25Page />} />
      <Route path="/day26" element={<Day26Page />} />
    </Routes>
  );
}

export default App;
