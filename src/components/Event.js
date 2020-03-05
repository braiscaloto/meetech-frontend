import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { MiniAvatarContainer } from "./MiniAvatarContainer";

function formatDate(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}
function formatTime(string) {
  const time = new Date(string);
  const hour = " Hora: " + time.getHours() + " " + time.getMinutes() + "0";
  return hour;
}
export function Event({
  defaultEvent = {},
  defaultAttendees = {},
  defaultComments = []
}) {
  console.log(defaultComments);
  const [comments] = defaultComments;
  const history = useHistory();

  const date = formatDate(defaultEvent.event_at);
  const time = formatTime(defaultEvent.event_at);

  return (
    <React.Fragment>
      <div className="event">
        <div className="event-information">
          <h1>{defaultEvent.title}</h1>
          <h4>
            {date}
            {time}
          </h4>
          <h4>{defaultEvent.location}</h4>
        </div>
        <div className="content-event-container">
          <p id="content" className="content">
            {defaultEvent.content}
          </p>
        </div>
        <div className="style-event">
          <div className="comments-event-container">
            <h3>Comments...</h3>
            <ul>
              {defaultComments.map(comment => (
                <li key={comment.comment}>
                  <p id="content">{comment.comment}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="attendees-event-container">
            <ul>
              <h3>Attendees...</h3>
              {defaultAttendees.map(attendee => (
                <li className="attendees-list" key={attendee.id}>
                  <h3 id="content">{attendee.name}</h3>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
