import React, { FC, MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
// utils
import api from "../../api";
import { useAppSelector } from "../../store/hooks";
// styles
import "./Message.scss";

interface Iprops {
  _id: string;
  author: string;
  title: string;
  body: string;
  createdAt: number;
}

const Message: FC<Iprops> = ({ _id, author, title, body, createdAt }) => {
  const { auth } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const deleteMessage = async (event: MouseEvent) => {
    const { id } = event.currentTarget;
    await api.deleteMessage(id);
    navigate(0);
  };

  return (
    <div className="message-card">
      <h2>{auth && auth.member ? author : "anonymous"}</h2>
      <h3>{title}</h3>
      <p>{body}</p>
      <p>{new Date(createdAt).toLocaleDateString()}</p>
      <p>{new Date(createdAt).toLocaleTimeString()}</p>
      <button
        id={_id}
        disabled={auth && auth.admin ? false : true}
        onClick={deleteMessage}
      >
        Delete Message
      </button>
    </div>
  );
};

export default Message;
