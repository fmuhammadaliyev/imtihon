import { useState } from "react";
import styles from "./Header.module.css";
import Logo from "/images/logo.svg";
import iconDown from "/images/icon-arrow-down.svg";
import darkModeOff from "/images/darkModeOff.svg";
import darkModeOn from "/images/darkModeOn.svg";
import Moon from "/images/icon-darkmode-moon.svg";
import moonIcon from "/images/icon-moon.svg";

function DictionaryHeader({
  darkTheme,
  setDarkTheme,
  fontFamily,
  setFontFamily,
}) {
  const [showFonts, setShowFonts] = useState(false);
  const [currentFontName, setCurrentFontName] = useState("Serif");

  function toggleDarkMode() {
    const newTheme = !darkTheme;
    setDarkTheme(newTheme);
    localStorage.setItem("darkMode", newTheme);
  }

  function toggleFontMenu() {
    setShowFonts(!showFonts);
  }

  function selectFont(font, name) {
    setFontFamily(font);
    setCurrentFontName(name);
    setShowFonts(false);
  }

  return (
    <header className={styles.container}>
      <div className={styles.headerWrapper} style={{ fontFamily: fontFamily }}>
        <a href="#">
          <img src={Logo} alt="Logo" />
        </a>

        <div className={styles.rightControls}>
          <div className={styles.fontSelector}>
            <span onClick={toggleFontMenu} className={styles.fontSelectBtn}>
              <p className={styles.fontName}>{currentFontName}</p>
              <img src={iconDown} alt="icon-down" />
            </span>

            {showFonts && (
              <div
                className={`${styles.fontOptions} ${
                  darkTheme ? styles.dark : ""
                }`}
              >
                <p
                  onClick={() => selectFont("sans-serif", "Sans Serif")}
                  className={styles.option}
                >
                  Sans Serif
                </p>
                <p
                  onClick={() => selectFont("serif", "Serif")}
                  className={styles.option}
                >
                  Serif
                </p>
                <p
                  onClick={() => selectFont("monospace", "Mono")}
                  className={styles.option}
                >
                  Mono
                </p>
              </div>
            )}
          </div>

          <span className={styles.divider}></span>

          <span className={styles.darkModeToggle}>
            <img
              onClick={toggleDarkMode}
              src={darkTheme ? darkModeOn : darkModeOff}
              alt="Toggle Dark Mode"
              className={styles.toggleIcon}
            />
          </span>

          <img src={darkTheme ? Moon : moonIcon} alt="moon icon" />
        </div>
      </div>
    </header>
  );
}

export default DictionaryHeader;
