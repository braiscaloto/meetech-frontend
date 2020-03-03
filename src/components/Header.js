import React, { useReducer } from "react";
import { useMatchMedia } from "../hooks/useMatchMedia";
import { MiniAvatarContainer } from "./MiniAvatarContainer";
import { Link } from "react-router-dom";

export function Header({ title, user, onMenuOpenedChange, onLogout }) {
  const isMobile = useMatchMedia("(max-width:576px)");
  return (
    <header className="header">
      <MiniAvatarContainer />
      {!isMobile && <p className="header-name">{user}</p>}
      <Link
        className="btn-header"
        href="/"
        onClick={() => {
          localStorage.clear();
          window.location.href = "/";
        }}
      >
        logout
      </Link>
    </header>
  );
}
