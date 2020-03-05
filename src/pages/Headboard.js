import React, { useEffect, useReducer } from "react";
import { getAllEvents } from "../http/eventsService";
import { Link } from "react-router-dom";
import { EventsCards } from "../components/EventsCards";

function eventsReducer(state, action) {
  switch (action.type) {
    case "GET_EVENTS_SUCCESS":
      return {
        ...state,
        events: action.initialEvents
      };
    default:
      return state;
  }
}
export function Headboard() {
  const [state, dispatch] = useReducer(eventsReducer, {
    events: []
  });

  useEffect(() => {
    getAllEvents().then(response =>
      dispatch({
        type: "GET_EVENTS_SUCCESS",
        initialEvents: response.data.data
      })
    );
  }, []);

  return (
    <React.Fragment>
      <div className="headboard">
        <section class="hero">
          <h1>meetech</h1>
          <article>
            <p>Explore the technology events in your city.</p>
          </article>
        </section>
        <header className="header-headboard">
          <div id="btn-headboard">
            <Link className="btn" to={"login"}>
              sign in
            </Link>
            <Link className="btn" to={"register"}>
              sign up
            </Link>
          </div>
          <div className="btn-headboard-right">
            <Link className="btn" to={"calendar"}>
              calendar
            </Link>
          </div>
        </header>
        <h3 className="title-headboard">Upcoming events</h3>
        {state.events.length > 0 && (
          <EventsCards defaultEvents={state.events} />
        )}
      </div>
    </React.Fragment>
  );
}
