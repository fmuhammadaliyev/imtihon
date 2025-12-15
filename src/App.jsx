import { useEffect, useState } from "react";
import "./App.css";
import Dictionary from "./components/Dictionary/Dictionary";
import DictionaryHeader from "./components/Header/DictionaryHeader";

function App() {
  const [darkTheme, setDarkTheme] = useState(() => {
    const storedTheme = localStorage.getItem("darkMode");
    return storedTheme ? JSON.parse(storedTheme) : false;
  });

  const [fontFamily, setFontFamily] = useState("Serif");

  useEffect(() => {
    if (darkTheme) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkTheme]);

  return (
    <div className="appContainer" style={{ fontFamily: fontFamily }}>
      <DictionaryHeader
        darkTheme={darkTheme}
        setDarkTheme={setDarkTheme}
        fontFamily={fontFamily}
        setFontFamily={setFontFamily}
      />
      <Dictionary darkTheme={darkTheme} fontFamily={fontFamily} />
    </div>
  );
}

export default App;
