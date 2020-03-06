import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { MiniAvatarContainer } from "./MiniAvatarContainer";

export function AllEventsList({ events, userEvents }) {
  console.log(userEvents);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const handleChange = e => {
    setSearchTerm(e.target.value);
  };
  useEffect(() => {
    const results = events.filter(event =>
      event.title.toLowerCase().includes(searchTerm)
    );
    setSearchResults(results);
  }, [searchTerm]);

  return (
    <React.Fragment>
      <input
        type="text"
        placeholder="Search"
        className="input-search"
        value={searchTerm}
        onChange={handleChange}
      />
      <div>
        <ul>
          {searchResults.map((event, index) => (
            <li key={event.id} className="all-event-list">
              <Link to={`/events/${event.id}`} className="btn-event-user">
                View more..
              </Link>
              <article>
                <h3>{event.title || "Untitled Event"}</h3>
                <p>{event.content || "No content"}</p>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </React.Fragment>
  );
}
