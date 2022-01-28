import React from "react";
// components
import Message from "../Message/Message";
// utils
import { useAppSelector as useSelector } from "../../store/hooks";
// styles
import "./Home.scss";

const Home = () => {
  const { auth } = useSelector((store) => store.auth);
  const { messages } = useSelector((store) => store.messages);

  return (
    <div className="home">
      <h1>Home</h1>
      <h1>{`Hello ${auth ? auth.displayName : "guest"}.`}</h1>
      <div className="message-container">
        {messages &&
          messages.map((message) => (
            <Message
              key={message.createdAt}
              _id={message._id}
              title={message.title}
              author={message.author}
              body={message.body}
              createdAt={message.createdAt}
            />
          ))}
      </div>
    </div>
  );
};

export default Home;
