import React, { useState, useReducer, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory, Link } from "react-router-dom";
import { addComment, addAttendee, addLike } from "../http/eventsService";
import { useAuth } from "../context/auth-context";

function eventReducer(state, action) {
  switch (action.type) {
    case "CREATE_COMMENT":
      return { ...state, comments: { ...state.comment, ...action.comments } };
    case "CREATE_ATTENDEE":
      return { ...state, attendee: { ...state.attendee, ...action.attendees } };

    default:
      return state;
  }
}

export function AddComment() {
  const { register, errors, formState, handleSubmit } = useForm({
    mode: "onBlur"
  });
  const { currentUser } = useAuth();
  const history = useHistory();

  const [state, dispatch] = useReducer(eventReducer, {
    attendees: [],
    comments: []
  });

  const urlParts = window.location.href.split("/");
  const eventId = urlParts[4];

  const handleCreateComment = formData => {
    console.log(formData);
    window.location.reload();
    const dataComment = {
      comment: formData.comment
    };

    addComment(eventId, dataComment).then(response => {
      dispatch({ type: "CREATE_COMMENT", comment: dataComment });
      history.push(`/events/${eventId}`);
    });
  };

  const handleCreateAttendee = data => {
    const dataAttendee = {
      ...data
    };
    addAttendee(eventId, data).then(response => {
      dispatch({ type: "CREATE_ATTENDEE", attendee: dataAttendee });
      history.push(`/events/${eventId}`);
    });
  };

  return (
    <React.Fragment>
      <div className="style-event-form">
        <div className="form-comments">
          <form onSubmit={handleSubmit(handleCreateComment)} noValidate>
            <label>Comment</label>
            <input
              ref={register({
                required: "The content is mandatory"
              })}
              id="comment"
              name="comment"
              type="text"
              placeholder="Please enter your comment"
            ></input>
            {errors.title && (
              <span className="errorMessage">{errors.title.message}</span>
            )}

            <div className="btn-container">
              <button
                type="submit"
                className="btn"
                disabled={formState.isSubmitting}
              >
                COMMENT
              </button>
            </div>
          </form>
        </div>

        <button
          className="btn"
          onClick={() => {
            handleCreateAttendee(currentUser);
          }}
        >
          subscribe this event!!!
        </button>
      </div>
    </React.Fragment>
  );
}
