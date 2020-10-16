import React, { useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import "./App.css";

function App() {
  const [showSearch, SetShowSearch] = useState(false);
  const [searchedText, SetSearchedText] = useState("");

  const [whatCurrentThing, setCurrentThing] = useState("sleeping");
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

  // Hotkey for for showing search
  useHotkeys(
    "space",
    () => {
      SetShowSearch(true);
      SetSearchedText("");
    },
    {
      filter: (e) => {
        return true;
      },
    }
  );

  useHotkeys("escape", () => {
    SetShowSearch(false);
    SetSearchedText("");
  });

  // // Escape Key For Google Search -> Hotkey doesn't work when focused on input :(
  // const handleEsc = (event: KeyboardEvent) => {
  //   if (event.key === "Escape") {
  //     SetShowSearch(false);
  //   }
  // };
  // window.addEventListener("keydown", handleEsc);

  // Submit search query to google
  function submitSearch(event: React.FormEvent) {
    window.location.replace("https://www.google.com/search?q=" + searchedText);
    event.preventDefault();
  }
  // setInterval(() => setTime(theCurrentTime), 60 * 1000);
  function capitalize(s: string): string {
    return s.charAt(0).toUpperCase() + s.slice(1);
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

    if (hour >= 9 && hour < 13 && whatCurrentThing) {
      setCurrentThing("🛠 working 9to5 - Morning");
    }
    if (hour >= 13 && hour < 14 && whatCurrentThing) {
      setCurrentThing("having Lunch 🍝");
    }
    if (hour >= 14 && hour < 18 && whatCurrentThing) {
      setCurrentThing("🛠 working 9to5 - Afternoon");
    }
    return currentT.slice(0, -3);
  }
  // Get curremt day as string
  function theCurrentDay(): string {
    const today: Date = new Date();
    const month = today.toLocaleString("default", { month: "long" });
    const day = today.toLocaleString("default", { weekday: "long" });
    return day + " " + today.getDate() + ", " + month;
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
    <section className="hero is-large">
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
          <div className="container has-text-centered	">
            <p className="">{currentWeek}</p>
            <h1 className="">{currentTime}</h1>
            <h1 className="">{currentDay}</h1>
            <p className="">
              Now you should be {capitalize(whatCurrentThing)}.
            </p>
            {showSearch && (
              <div className="container has-text-centered">
                <form onSubmit={submitSearch} style={{ width: "50%" }}>
                  <div className="control has-icons-left">
                    <input
                      autoFocus
                      className="input is-rounded is-medium"
                      type="text"
                      name="search"
                      placeholder="Search"
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
            {/* {calendarEventsComp} */}
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
