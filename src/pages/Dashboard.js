import React, { useEffect, useReducer } from "react";
import { useHistory, Link } from "react-router-dom";
import {
  getEvents,
  updateEvent,
  deleteEvent,
  getUserEvents
} from "../http/eventsService";
import { useMatchMedia } from "../hooks/useMatchMedia";
import { Header } from "../components/Header";
import { useAuth } from "../context/auth-context";
import { AllEventsList } from "../components/AllEventsList";
import { Event } from "../components/Event";
import { Charts } from "../components/Charts";

function eventsReducer(state, action) {
  switch (action.type) {
    case "GET_EVENTS_SUCCESS":
      return {
        ...state,
        events: action.initialEvents
      };
    case "GET_USER_EVENTS":
      return {
        ...state,
        userEvents: action.userEvents
      };
    default:
      return state;
  }
}

export function Dashboard() {
  const isMobile = useMatchMedia("(max-width:576px)");
  const history = useHistory();
  const { currentUser, setCurrentUser, setIsAuthenticated } = useAuth();

  const [state, dispatch] = useReducer(eventsReducer, {
    events: [],
    userEvents: [],
    selectedEvent: null,
    isMenuOpened: false,
    isEventOpened: false,
    searchText: ""
  });

  useEffect(() => {
    getEvents().then(response =>
      dispatch({
        type: "GET_EVENTS_SUCCESS",
        initialEvents: response.data.data
      })
    );
    // getUserEvents(state.events.id).then(response => {
    //   console.log(response);
    //   dispatch({
    //     type: "GET_USER_EVENTS",
    //     userEvents: response.data
    //   });
    // });
  }, []);

  const filteredEvents = state.events.filter(event => {
    const text = `${event.title} ${event.content}`.trim();
    const filterText = text
      .toLowerCase()
      .includes(state.searchText.toLowerCase());

    return filterText;
  });

  if (state.events.length === 0) return null;
  const eventId = state.events[0].id;
  return (
    <React.Fragment>
      <header className="header-calendar-events">
        <h1 className="logo-private">meetech</h1>
        <div className="items">
          <Link className="btn-private" to="/CalendarPrivate">
            calendar
          </Link>
          <Link className="btn-private" to="/events_user">
            my events
          </Link>
          <Header />
        </div>
      </header>

      <main id="dashboard">
        <div>
          <div>
            <AllEventsList
              events={filteredEvents}
              userEvents={state.userEvents}
            />
          </div>
          {state.selectedEvent === null && (
            <h3 className="no-event-selected"></h3>
          )}

          {state.selectedEvent !== null && <Charts />}
        </div>

        {isMobile && state.selectedEvent !== null && (
          <button
            onClick={() => {
              dispatch({ type: "TOGGLE_EVENT" });
              dispatch({ type: "SELECT_EVENT", index: null });
            }}
            className="icon-button add-event-mobile"
            style={{ position: "fixed", bottom: "20px", left: "20px" }}
          />
        )}
      </main>
    </React.Fragment>
  );
}
