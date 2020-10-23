import React, { useState } from "react";
import "./hint.css";

const HintContainer = () => {
  const [openHint, setOpenHint] = useState(false);

  const onClick = (e) => {
    const element = document.querySelector(".hint");
    const element2 = document.querySelector(".hint-container");

    if (openHint) {
      //element open, now closing
      element.classList.remove("expand");
      element2.classList.remove("expand");
      e.stopPropagation();
      setOpenHint(false);
    } else {
      //element closed, now opening
      element.classList.add("expand");
      element2.classList.add("expand");
      setOpenHint(true);
    }
  };
  return (
    <div className="hint-container">
      {/* email */}
      <div className="hint" onClick={onClick}>
        {/* from */}
        <div className="hint-click-container">
          {/* from-contents */}
          <div className="hint-click">View Shortcuts</div>
        </div>
        {/* to */}
        <div className="hints-container">
          {/* to-contents */}
          <div className="hints-contents">
            {/* top */}
            <div className="hints-top-container">
              <div className="hints-large">Shortcuts</div>
              <div className="x-touch" onClick={onClick}>
                <div className="x">
                  <div className="line1"></div>
                  <div className="line2"></div>
                </div>
              </div>
            </div>
            {/* bottom */}
            <div className="hints-bottom-container">
              <div className="columns" style={{ marginTop: "0px" }}>
                <div className="column">Search</div>
                <div className="column">Space</div>
              </div>
              <div className="columns">
                <div className="column ">LinkedIn</div>
                <div className="column">L</div>
              </div>
              <div className="columns">
                <div className="column">YouTube</div>
                <div className="column">Y</div>
              </div>
              <div className="columns">
                <div className="column">Notes</div>
                <div className="column">N</div>
              </div>
              <div className="columns">
                <div className="column">
                  Close Search <br />
                  Notes
                </div>
                <div className="column">Esc</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HintContainer;
