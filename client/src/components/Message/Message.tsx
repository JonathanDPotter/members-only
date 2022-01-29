import React, { FC, MouseEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
// utils
import api from "../../api";
import { useAppSelector } from "../../store/hooks";
// styles
import "./Message.scss";

interface Iprops {
  _id: string;
  author: string;
  image: string;
  title: string;
  body: string;
  createdAt: number;
}

const Message: FC<Iprops> = ({
  _id,
  author,
  image,
  title,
  body,
  createdAt,
}) => {
  const { auth } = useAppSelector((state) => state.auth);
  const stock =
    "https://icon-library.com/images/default-user-icon/default-user-icon-13.jpg";
  const navigate = useNavigate();

  const deleteMessage = async (event: MouseEvent) => {
    const { id } = event.currentTarget;
    await api.deleteMessage(id);
    navigate(0);
  };

  return (
    <div className="message-card">
      <div className="image-author">
        <img src={auth && auth.member ? image : stock} alt="userAvatar" />
        <h2>{auth && auth.member ? author : "anonymous"}</h2>
      </div>
      <div className="title">
        <h3>{title}</h3>
      </div>
      <div className="body">
        <p>{body}</p>
      </div>
      <div className="date-time">
        <p>{new Date(createdAt).toLocaleDateString()}</p>
        <p>
          {new Date(createdAt).toLocaleTimeString("en-us", { hour: '2-digit', minute: '2-digit', hour12: true })}
        </p>
      </div>
      <div className={auth?.admin ? "delete auth" : "delete guest"}>
        <button
          id={_id}
          disabled={auth && auth.admin ? false : true}
          onClick={deleteMessage}
        >
          Delete Message
        </button>
        <span>ADMIN only!!</span>
      </div>
    </div>
  );
};

export default Message;
