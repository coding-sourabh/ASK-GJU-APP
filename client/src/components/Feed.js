import React, { useEffect, useState, useContext } from "react";
import QuorBox from "./QuorBox";
import "./Feed.css";
import Post from "./Post";
import axios from "axios";

function Feed() {
  const [posts, setPosts] = useState([]);
  const [qID, setQID] = useState("");

  useEffect(() => {
    axios
      .post("http://localhost:8800/api/question/fetchQuestions")
      .then(function (response) {
        let data = response.data.allQuestions;
        setPosts(data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [posts]);

  return (
    <div className="feed">
      <QuorBox />
      {posts?.map((questions, index) => (
        <Post
          questionUser={questions.user}
          question={questions.question}
          questionID={questions._id}
          imageUrl={questions.imageUrl}
          timestamp={questions.questionTime}
          qID={qID}
          setQID={setQID}
        />
      ))}
    </div>
  );
}

export default Feed;
