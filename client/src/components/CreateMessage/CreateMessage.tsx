import React, { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
// utils
import { useAppSelector as useSelector } from "../../store/hooks";
import api from "../../api";

const CreateMessage = () => {
  const initialState = { title: "", message: "" };
  const [state, setState] = useState(initialState);
  const { title, message } = state;

  const navigate = useNavigate();

  const author = useSelector((state) => state.auth.auth?.displayName);

  const handleChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    if (name === "title") setState({ ...state, title: value });
    if (name === "message") setState({ ...state, message: value });
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    author &&
      api
        .createMessage({ ...state, author, createdAt: Date.now() })
        .then((response) => {
          if (response.status === 201) {
            navigate("/");
            navigate(0);
          } else {
            window.alert(response.data);
          }
        });
  };

  return (
    <div className="create-message">
      <form onSubmit={handleSubmit}>
        <div className="label-input">
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            name="title"
            onChange={handleChange}
            value={title}
            required
          />
        </div>
        <div className="label-input">
          <label htmlFor="message">Message: </label>
          <textarea
            name="message"
            onChange={handleChange}
            value={message}
            maxLength={1500}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateMessage;
