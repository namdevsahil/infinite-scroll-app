import { useState } from "react";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "./context/ThemeContext";
import "./styles/App.css";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <ThemeProvider>
      <Navbar onSearch={setSearchQuery} />
      <Home searchQuery={searchQuery} />
    </ThemeProvider>
  );
};

export default App;
