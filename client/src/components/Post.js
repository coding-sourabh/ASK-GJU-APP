import { Avatar } from "@material-ui/core";
import React, { useEffect, useState, useContext } from "react";
import "./Post.css";
import ArrowUpwardOutlinedIcon from "@material-ui/icons/ArrowUpwardOutlined";
import ArrowDownwardOutlinedIcon from "@material-ui/icons/ArrowDownwardOutlined";
import RepeatOutlinedIcon from "@material-ui/icons/RepeatOutlined";
import ChatBubbleOutlineOutlinedIcon from "@material-ui/icons/ChatBubbleOutlineOutlined";
import { MoreHorizOutlined, ShareOutlined } from "@material-ui/icons";
import axios from "axios";
import avatar from "../avatar.jpg";

import Modal from "react-modal";
import { AuthContext } from "./context/store";
import { red } from "@material-ui/core/colors";
import { logDOM } from "@testing-library/react";

function Post({
  questionUser,
  question,
  questionID,
  imageUrl,
  timestamp,
  qID,
  setQID,
}) {
  const context = useContext(AuthContext);
  const currentUser = context.user;

  const [IsmodalOpen, setIsModalOpen] = useState(false);
  const [answer, setAnswer] = useState("");
  const [getAnswers, setGetAnswers] = useState([]);

  useEffect(() => {
    if (questionID) {
      axios
        .post("http://localhost:8800/api/answer/fetchAnswer/", {
          questionID: questionID,
        })
        .then(function (response) {
          setGetAnswers(response.data.allAnswer);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [questionID, getAnswers]);

  const handleAnswer = (e) => {
    e.preventDefault();
    // Save answer
    axios
      .post("http://localhost:8800/api/answer/addAnswer/", {
        user: currentUser,
        questionID: questionID,
        answer: answer,
      })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });

    setAnswer("");
    setIsModalOpen(false);
  };

  const handleOnPostClick = () => {
    setQID(questionID);
  };

  return (
    <div className="post" onClick={handleOnPostClick}>
      <div className="post__info">
        <img
          className="avv"
          src={currentUser.photo ? currentUser.photo : avatar}
        />
        <h4>
          {questionUser.username ? questionUser.username : questionUser.email}
        </h4>
        <h6 style={{ marginLeft: "15px", marginTop: "3px", color: "grey" }}>
          {timestamp ? timestamp : "28/8/2021 @ 17:36:23"}
        </h6>
      </div>
      <div className="post__body">
        <div className="post__question">
          <p>{question}</p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="post__btnAnswer"
          >
            Answer
          </button>
          <Modal
            isOpen={IsmodalOpen}
            onRequestClose={() => setIsModalOpen(false)}
            shouldCloseOnOverlayClick={false}
            style={{
              overlay: {
                width: 680,
                height: 550,
                backgroundColor: "rgba(0,0,0,0.8)",
                zIndex: "1000",
                top: "50%",
                left: "50%",
                marginTop: "-250px",
                marginLeft: "-350px",
              },
            }}
          >
            <div className="modal__question">
              <h1>{question}</h1>
              <p>
                asked by{" "}
                <span className="name">
                  {questionUser.username
                    ? questionUser.username
                    : questionUser.email}
                </span>{" "}
                on{" "}
                <span className="name">
                  {timestamp ? timestamp : "28/8/2021 @ 17:36:23"}
                </span>
              </p>
            </div>
            <div className="modal__answer">
              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Enter Your Answer"
                type="text"
              />
            </div>
            <div className="modal__button">
              <button className="cancle" onClick={() => setIsModalOpen(false)}>
                Cancel
              </button>
              <button type="sumbit" onClick={handleAnswer} className="add">
                Add Answer
              </button>
            </div>
          </Modal>
        </div>

        <img src={imageUrl} alt="" />
        {imageUrl ? (
          <span>
            <br />
            <br />
          </span>
        ) : (
          ""
        )}

        <div
          className="post__answer"
          style={{ position: "relative", paddingBottom: "5px" }}
        >
          {getAnswers.map((answers) => (
            <span>
              {qID === answers.questionID ? (
                <span>
                  {answers.answer}

                  <span
                    style={{
                      position: "absolute",
                      color: "gray",
                      fontSize: "small",
                      display: "flex",
                      right: "0px",
                    }}
                  >
                    <span style={{ color: "grey" }}>
                      {answers.user.username
                        ? answers.user.username
                        : answers.user.email}{" "}
                      on {answers.answerTime}
                    </span>
                  </span>
                  <br />
                  <br />
                </span>
              ) : (
                ""
              )}
            </span>
          ))}
        </div>
      </div>
      <div className="post__footer">
        <div className="post__footerAction">
          <ArrowUpwardOutlinedIcon />
          <ArrowDownwardOutlinedIcon />
        </div>

        <RepeatOutlinedIcon />
        <ChatBubbleOutlineOutlinedIcon />
        <div className="post__footerLeft">
          <ShareOutlined />
          <MoreHorizOutlined />
        </div>
      </div>
    </div>
  );
}

export default Post;
