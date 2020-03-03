import React, { useState, useReducer, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory, Link } from "react-router-dom";
import {
  addLike,
  getComments,
  getEvent,
  getAttendees,
  getLikes,
  deleteLike
} from "../http/eventsService";
import { useAuth } from "../context/auth-context";
import { Event } from "../components/Event";
import { Header } from "../components/Header";
import { AddComment } from "./AddComments";

function eventReducer(state, action) {
  switch (action.type) {
    case "GET_EVENT_SUCCESS":
      return {
        ...state,
        event: action.initialEvents
      };
    case "GET_LIKES_EVENTS":
      return {
        ...state,
        likes: action.initialLikes.length
      };
    case "GET_ATTENDEES_EVENTS":
      return {
        ...state,
        attendees: action.initialAttendees
      };
    case "GET_COMMENTS_EVENTS":
      return {
        ...state,
        comments: action.initialComments
      };
    case "CREATE_COMMENT":
      return { ...state, comments: { ...state.comment, ...action.comments } };
    case "CREATE_ATTENDEE":
      return { ...state, attendee: { ...state.attendee, ...action.attendees } };
    case "DELETE_LIKE":
      return {
        ...state,
        likes: { ...state }
      };

    default:
      return state;
  }
}

export function GetEvent() {
  const { register, errors, formState, handleSubmit } = useForm({
    mode: "onBlur"
  });
  const { currentUser } = useAuth();
  const history = useHistory();

  const [state, dispatch] = useReducer(eventReducer, {
    attendees: [],
    comments: [],
    event: []
  });

  const urlParts = window.location.href.split("/");
  const eventId = urlParts[4];

  useEffect(() => {
    getEvent(eventId).then(response =>
      dispatch({
        type: "GET_EVENT_SUCCESS",
        initialEvents: response.data
      })
    );
    getLikes(eventId).then(response => {
      dispatch({
        type: "GET_LIKES_EVENTS",
        initialLikes: response.data
      });
    });
    getAttendees(eventId).then(response =>
      dispatch({
        type: "GET_ATTENDEES_EVENTS",
        initialAttendees: response.data
      })
    );
    getComments(eventId).then(response => {
      dispatch({
        type: "GET_COMMENTS_EVENTS",
        initialComments: response.data
      });
    });
  }, []);
  const handleCreateLike = () => {
    window.location.reload();
    addLike(eventId).then(response => {});
  };

  const handleDeleteLike = data => {
    const dataLike = {
      ...data
    };

    deleteLike(eventId, dataLike).then(response => {
      dispatch({ type: "DELETE_LIKE", currentUser });
    });
  };

  return (
    <React.Fragment>
      <header className="header-event">
        <Link className="btn-private" to="/CalendarPrivate">
          Calendar
        </Link>
        <Link className="btn-private" to="/home">
          Events
        </Link>
        <Header />
      </header>
      {state.comments.length > 0 && (
        <Event
          defaultEvent={state.event}
          defaultAttendees={state.attendees}
          defaultLikes={state.likes}
          defaultComments={state.comments}
        />
      )}

      <AddComment />
      <button
        className="btn-like"
        onClick={() => {
          handleCreateLike();
        }}
        onDoubleClick={() => {
          handleDeleteLike(currentUser);
        }}
      >
        ❤️ {state.likes}
      </button>
    </React.Fragment>
  );
}
