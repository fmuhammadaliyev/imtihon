import { useState, useRef } from "react";
import styles from "./Dictionary.module.css";
import playIcon from "/images/icon-play.svg";
import newWindowIcon from "/images/icon-new-window.svg";

export default function Dictionary({ darkTheme, fontFamily }) {
  const [searchWord, setSearchWord] = useState("");
  const [dictionaryData, setDictionaryData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorEmpty, setErrorEmpty] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const audioRef = useRef();

  function fetchWord(word) {
    setLoading(true);
    setDictionaryData(null);
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error("Word not found");
      })
      .then((data) => {
        setDictionaryData(data);
        setNotFound(false);
        setLoading(false);
      })
      .catch(() => {
        setNotFound(true);
        setLoading(false);
      });
  }

  function handleSearch() {
    if (searchWord.trim() === "") {
      setErrorEmpty(true);
      return;
    }
    setErrorEmpty(false);
    fetchWord(searchWord);
  }

  function playAudio() {
    if (audioRef.current) {
      audioRef.current.play();
    }
  }

  return (
    <div className={styles.wrapper} style={{ fontFamily }}>
      <input
        className={`${styles.searchInput} ${darkTheme ? styles.dark : ""} ${
          errorEmpty ? styles.inputError : ""
        }`}
        type="text"
        placeholder="Search for any word…"
        value={searchWord}
        onChange={(e) => setSearchWord(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      />

      {errorEmpty && (
        <span className={styles.errorText}>Whoops, can't be empty...</span>
      )}

      {loading && <h1 className={styles.loadingText}>Loading...</h1>}

      {dictionaryData && !loading && (
        <div className={styles.results}>
          <div className={styles.headerRow}>
            <div>
              <h1 className={styles.word}>{dictionaryData[0].word}</h1>
              <p className={styles.pronunciation}>
                {dictionaryData[0].phonetic}
              </p>
            </div>
            <img
              src={playIcon}
              alt="play icon"
              className={styles.playBtn}
              onClick={playAudio}
            />
          </div>

          <audio
            ref={audioRef}
            src={dictionaryData[0].phonetics?.find((p) => p.audio)?.audio}
          />

          {dictionaryData[0].meanings.map((meaning, idx) => (
            <div key={idx} className={styles.meaningSection}>
              <div className={styles.partSpeechRow}>
                <p
                  className={`${styles.partSpeech} ${
                    darkTheme ? styles.dark : ""
                  }`}
                >
                  {meaning.partOfSpeech}
                </p>
                <span
                  className={`${styles.separator} ${
                    darkTheme ? styles.dark : ""
                  }`}
                />
              </div>

              <h4 className={styles.meaningTitle}>Meaning</h4>
              <ul className={styles.definitionList}>
                {meaning.definitions.map((def, i) => (
                  <li key={i} className={styles.definitionItem}>
                    <p
                      className={`${styles.definitionText} ${
                        darkTheme ? styles.dark : ""
                      }`}
                    >
                      {def.definition}
                    </p>
                    {def.example && (
                      <span className={styles.example}>"{def.example}"</span>
                    )}
                  </li>
                ))}
              </ul>

              {meaning.synonyms?.length > 0 && (
                <div className={styles.synonyms}>
                  <p className={styles.synTitle}>Synonyms</p>
                  {meaning.synonyms.map((syn, i) => (
                    <span
                      key={i}
                      className={styles.synItem}
                      onClick={() => {
                        setSearchWord(syn);
                        fetchWord(syn);
                      }}
                    >
                      {syn}
                    </span>
                  ))}
                </div>
              )}

              {meaning.antonyms?.length > 0 && (
                <div className={styles.antonyms}>
                  <p className={styles.antTitle}>Antonyms</p>
                  {meaning.antonyms.map((ant, i) => (
                    <span
                      key={i}
                      className={styles.antItem}
                      onClick={() => {
                        setSearchWord(ant);
                        fetchWord(ant);
                      }}
                    >
                      {ant}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {notFound && !loading && (
        <div className={`${styles.notFound} ${darkTheme ? styles.dark : ""}`}>
          <h2>😢</h2>
          <h2>No Definitions Found</h2>
          <p>
            Sorry, we couldn't find definitions for the word you were looking
            for.
          </p>
        </div>
      )}
    </div>
  );
}
