import React, { useState, useContext } from "react";
import HomeIcon from "@material-ui/icons/Home";
import FeaturedPlayListOutlinedIcon from "@material-ui/icons/FeaturedPlayListOutlined";
import AssignmentTurnedInOutlinedIcon from "@material-ui/icons/AssignmentTurnedInOutlined";
import PeopleAltOutlinedIcon from "@material-ui/icons/PeopleAltOutlined";
import NotificationsOutlinedIcon from "@material-ui/icons/NotificationsOutlined";
import SearchIcon from "@material-ui/icons/Search";
import LanguageIcon from "@material-ui/icons/Language";
import Modal from "react-modal";
import { AuthContext } from "./context/store";
import axios from "axios";
import avatar from "../avatar.jpg";
import thinkingAnimeBoy from "../thinking.jpeg";

import "./QHeader.css";
import { Avatar, Button, Input } from "@material-ui/core";
import { ExpandMore, Link } from "@material-ui/icons";

Modal.setAppElement("#root");

function QHeader() {
  const context = useContext(AuthContext);
  const user = context.user;

  const [IsmodalOpen, setIsModalOpen] = useState(false);
  const [input, setInput] = useState("");
  const [inputUrl, setInputUrl] = useState("");
  const questionName = input;
  const handleQuestion = (e) => {
    e.preventDefault();
    setIsModalOpen(false);

    if (questionName) {
      // db.collection("questions").add({
      //   user: user,
      //   question: input,
      //   imageUrl: inputUrl,
      //   timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      // });
      axios
        .post("http://localhost:8800/api/question/addQuestion", {
          user: user,
          question: input,
          questionID: 2000,
          imageUrl: inputUrl,
        })
        .then(function (response) {
          console.log("successfully Added Question", response.status);
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    setInput("");
    setInputUrl("");
  };

  return (
    <div className="qHeader">
      <div className="qHeader__logo">
        <img className="logoThinking" src={thinkingAnimeBoy} alt="" />
      </div>
      <div className="qHeader__icons">
        <div className="active qHeader__icon">
          <HomeIcon />
        </div>
        <div className="qHeader__icon">
          <FeaturedPlayListOutlinedIcon />
        </div>
        <div className="qHeader__icon">
          <AssignmentTurnedInOutlinedIcon />
        </div>
        <div className="qHeader__icon">
          <PeopleAltOutlinedIcon />
        </div>
        <div className="qHeader__icon">
          <NotificationsOutlinedIcon />
        </div>
      </div>
      <div className="qHeader__input">
        <SearchIcon />
        <input type="text" placeholder="Search Quora" />
      </div>
      <div className="qHeader__Rem">
        <div className="qHeader__avatar">
          <Avatar
            onClick={() => context.logout()}
            className="Avatar"
            src={user.photo ? user.photo : avatar}
          />
        </div>
        <LanguageIcon />
        <Button onClick={() => setIsModalOpen(true)}>Add Question</Button>
        <Modal
          isOpen={IsmodalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          shouldCloseOnOverlayClick={false}
          style={{
            overlay: {
              width: 700,
              height: 600,
              backgroundColor: "rgba(0,0,0,0.8)",
              zIndex: "1000",
              top: "50%",
              left: "50%",
              marginTop: "-300px",
              marginLeft: "-350px",
            },
          }}
        >
          <div className="modal__title">
            <h5>Add Question</h5>
            <h5>Share Link</h5>
          </div>
          <div className="modal__info">
            <Avatar
              className="avatar"
              src={
                user.photo
                  ? user.photo
                  : "https://images-platform.99static.com//_QXV_u2KU7-ihGjWZVHQb5d-yVM=/238x1326:821x1909/fit-in/500x500/99designs-contests-attachments/119/119362/attachment_119362573"
              }
            />
            <p>{user.username} asked</p>
            <div className="modal__scope">
              <PeopleAltOutlinedIcon />
              <p>Public</p>
              <ExpandMore />
            </div>
          </div>
          <div className="modal__Field">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type="text"
              placeholder="Start your question with 'What', 'How', 'Why', etc. "
            />
            <div className="modal__fieldLink">
              <Link />
              <input
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                type="text"
                placeholder="Optional: inclue a link that gives context"
              ></input>
            </div>
          </div>
          <div className="modal__buttons">
            <button className="cancle" onClick={() => setIsModalOpen(false)}>
              Cancel
            </button>
            <button type="sumbit" onClick={handleQuestion} className="add">
              Add Question
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default QHeader;