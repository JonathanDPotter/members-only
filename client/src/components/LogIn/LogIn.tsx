import React, { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
// utils
import api from "../../api";
// styles
import "./LogIn.scss";

const LogIn = () => {
  const initialState = {
    displayName: "",
    password: "",
  };

  const [state, setState] = useState(initialState);

  const navigate = useNavigate();

  const handleChange = (event: FormEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    if (name === "displayName") setState({ ...state, displayName: value });
    if (name === "password") setState({ ...state, password: value });
  };

  const { displayName, password } = state;

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const response = await api.login(state);
      console.log(response);
    } catch (error: any) {
      console.error(error);
    }
    setState(initialState);
    navigate("/");
    navigate(0);
  };

  return (
    <div className="log-in">
      <h1>Log In</h1>
      <form action="submit" onSubmit={handleSubmit}>
        <div className="label-input">
          <label htmlFor="displayName">Display Name: </label>
          <input
            type="text"
            name="displayName"
            onChange={handleChange}
            value={displayName}
            autoComplete="username"
            autoFocus
            required
          />
        </div>
        <div className="label-input">
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            value={password}
            autoComplete="new-password"
            required
          />
        </div>
        <button type="submit" disabled={!displayName || !password}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default LogIn;
