import React, { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
// utils
import { useAppSelector as useSelector } from "../../store/hooks";
import api from "../../api";
// styles
import "./CreateMessage.scss";

const CreateMessage = () => {
  const initialState = { title: "", body: "" };
  const [state, setState] = useState(initialState);
  const { title, body } = state;

  const navigate = useNavigate();

  const { auth } = useSelector((state) => state.auth);

  const handleChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    if (name === "title") setState({ ...state, title: value });
    if (name === "body") setState({ ...state, body: value });
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    auth &&
      api
        .createMessage({
          ...state,
          author: auth.displayName,
          image: auth.image,
          createdAt: Date.now(),
        })
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
          <label htmlFor="body">Message: </label>
          <textarea
            name="body"
            onChange={handleChange}
            value={body}
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
