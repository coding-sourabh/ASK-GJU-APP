import React, { useEffect, useState, useContext } from "react";
import QuorBox from "./QuorBox";
import "./Feed.css";
import Post from "./Post";
import { AuthContext } from "./context/store";
import axios from "axios";

function Feed() {
  const [posts, setPosts] = useState([]);
  const context = useContext(AuthContext);
  const user = context.user;
  const [qID, setQID] = useState("");

  useEffect(() => {
    axios
      .post("http://localhost:8800/api/question/fetchQuestions")
      .then(function (response) {
        // console.log("hlo " , response.data);
        let data = response.data.allQuestions;
        setPosts(data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [posts]);

  // console.log(posts[0]);

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
