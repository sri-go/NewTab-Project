import React, { useState, useEffect } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import NoteTab from "./Note";
import HintContainer from "./Hint";

function App() {
  const [showSearch, SetShowSearch] = useState(false);
  const [searchedText, SetSearchedText] = useState("");

  const [showNotes, setShowNotes] = useState(false);

  const [currentDay, setDay] = useState(theCurrentDay);
  const [currentTime, setTime] = useState(theCurrentTime);
  const [currentWeek, setWeek] = useState(theCurrentWeek);

  // Hot Keys to quickly take you to different websites
  // LinkedIn Hotkey
  useHotkeys("l", () => window.location.replace("https://linkedin.com"));
  //The Verge Hotkey
  useHotkeys("t", () => window.location.replace("https://theverge.com"));
  // YouTube Hotkey
  useHotkeys("y", () => window.location.replace("https://www.youtube.com/"));
  // Show notes tab
  useHotkeys("n", () => {
    setShowNotes(true);
  });
  // Hotkey for for showing search
  useHotkeys("space", () => {
    SetShowSearch(true);
    SetSearchedText("");
  });
  // Escape logic for notes and search
  const handleEsc = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      SetSearchedText("");
      SetShowSearch(false);
      setShowNotes(false);
    }
  };
  // add event listener for escape key
  useEffect(() => {
    if (showSearch || showNotes) {
      window.addEventListener("keydown", handleEsc);
    }
    return window.removeEventListener("keydown", (e) => {
      console.log(e);
    });
  }, [showSearch || showNotes]);
  // Submit search query to google
  function submitSearch(event: React.FormEvent) {
    window.location.replace("https://www.google.com/search?q=" + searchedText);
    event.preventDefault();
  }
  // Get current time as string
  function theCurrentTime(): string {
    const currentD = new Date();
    const currentT: string = currentD.toLocaleTimeString("en-GB");
    if (currentT === "00:00:01") {
      setDay(theCurrentDay);
      setWeek(theCurrentWeek);
    }
    const hour: number = currentD.getHours();

    return currentT.slice(0, -3);
  }
  // Get curremt day as string
  function theCurrentDay(): string {
    const today: Date = new Date();
    const month = today.toLocaleString("default", { month: "long" });
    const day = today.toLocaleString("default", { weekday: "long" });
    const year = today.getFullYear().toString();
    return day + ", " + " " + month + " " + today.getDate() + ", " + year;
  }
  // Get current week out of 52 as string
  function theCurrentWeek(): string {
    // https://stackoverflow.com/a/6117889/9295292
    const today: Date = new Date();
    let d = new Date(
      Date.UTC(today.getFullYear(), today.getMonth(), today.getDate())
    );
    var dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return (
      "Week " +
      Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7)
    );
  }
  // import background image data
  const currentBackground = require("./background.json").background;
  return (
    <>
      <section className="hero is-fullheight">
        <div
          className="hero-body"
          style={{
            width: "100vw",
            height: "100vh",
            backgroundSize: "cover",
            backgroundColor: "black",
            backgroundImage:
              "url(data:image/png;base64," + currentBackground + ")",
          }}
        >
          <div className="container">
            <div className="container has-text-centered">
              <p className="is-size-6">{currentWeek}</p>
              <h1 className="is-size-1">{currentTime}</h1>
              <h1 className="is-size-3">{currentDay}</h1>
            </div>
            {showSearch && (
              <div
                className="container mt-4"
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <form
                  id="search"
                  onSubmit={submitSearch}
                  style={{ width: "50%" }}
                >
                  <div className="control has-icons-left">
                    <input
                      autoFocus
                      className="input is-rounded is-medium is-static"
                      style={{ borderColor: "#fbfbfb", color: "#fbfbfb" }}
                      type="text"
                      name="search"
                      placeholder="Search "
                      onChange={(e: { target: { value: any } }) =>
                        SetSearchedText(e.target.value)
                      }
                      value={searchedText}
                    />
                    <span className="icon is-large is-left">
                      <i className="fas fa-search" />
                    </span>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>
      <HintContainer />
      <NoteTab showNote={showNotes} />
    </>
  );
}

export default App;
