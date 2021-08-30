import { Avatar } from "@material-ui/core";
import React, { useContext } from "react";
import "./QuoraBox.css";
import { AuthContext } from "./context/store";
import avatar from "../avatar.jpg";

export default function QuorBox() {
  const context = useContext(AuthContext);
  const user = context.user; // Need to have user here

  return (
    <div className="quoraBox">
      <div className="quoraBox__info">
        <Avatar
          src={
            user.photo
              ? user.photo
              : avatar}
          className="quoraBox__infoAvatar"
        />
        <h5>{user.username}</h5>
      </div>
      <div className="quoraBox__quora">
        <p>What is your question or link?</p>
      </div>
    </div>
  );
}
