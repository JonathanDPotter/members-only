import React, { FC } from "react";
import { useAppSelector } from "../../store/hooks";

interface Iprops {
  author: string;
  title: string;
  message: string;
  date: number;
}

const Message: FC<Iprops> = ({ author, title, message, date }) => {
  const { auth } = useAppSelector((state) => state.auth);
  return (
    <div className="message-card">
      <h2>{auth ? author : "anonymous"}</h2>
      <h3>{title}</h3>
      <p>{message}</p>
      <p>{new Date(date).toLocaleDateString()}</p>
      <p>{new Date(date).toLocaleTimeString()}</p>
    </div>
  );
};

export default Message;
