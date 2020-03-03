import React from "react";

export function EventsCards(defaultEvents = {}) {
  console.log(defaultEvents);
  return (
    <React.Fragment>
      <div className="App">
        <div className="container">
          <div className="card">
            <h5 className="title">{defaultEvents.defaultEvents[0].title}</h5>
            <div></div>
            <div className="bar">
              <div className="emptybar"></div>
              <div className="filledbar"></div>
            </div>
          </div>
          <div className="card">
            <h5 className="title">{defaultEvents.defaultEvents[1].title}</h5>
            <div className="bar">
              <div className="emptybar"></div>

              <div className="filledbar"></div>
            </div>
          </div>
          <div className="card">
            <h5 className="title">{defaultEvents.defaultEvents[2].title}</h5>
            <div className="bar">
              <div className="emptybar"></div>
              <div className="filledbar"></div>
            </div>
          </div>
          <div className="card">
            <h5 className="title">{defaultEvents.defaultEvents[3].title}</h5>
            <div className="bar">
              <div className="emptybar"></div>
              <div className="filledbar"></div>
            </div>
          </div>
          <div className="card">
            <h5 className="title">{defaultEvents.defaultEvents[4].title}</h5>
            <div className="bar">
              <div className="emptybar"></div>
              <div className="filledbar"></div>
            </div>
          </div>
          <div className="card">
            <h5 className="title">{defaultEvents.defaultEvents[5].title}</h5>
            <div className="bar">
              <div className="emptybar"></div>
              <div className="filledbar"></div>
            </div>
          </div>
          <div className="card">
            <h5 className="title">{defaultEvents.defaultEvents[6].title}</h5>
            <div className="bar">
              <div className="emptybar"></div>
              <div className="filledbar"></div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
