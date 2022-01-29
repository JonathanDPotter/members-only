import React, { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// utils
import api from "../../api";
// icons
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
// styles
import "./SignUp.scss";

const SignUp = () => {
  const initialState = {
    displayName: "",
    password: "",
    passwordTwo: "",
    firstName: "",
    lastName: "",
    avatar: { gender: "m", id: 0 },
  };

  const [state, setState] = useState(initialState);
  const [image, setImage] = useState(
    "https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/male/100.png"
  );

  const { displayName, firstName, lastName, password, passwordTwo, avatar } =
    state;

  const navigate = useNavigate();

  const handleChange = (event: FormEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    console.log(name, value);
    if (name === "displayName") setState({ ...state, displayName: value });
    if (name === "password") setState({ ...state, password: value });
    if (name === "passwordTwo") setState({ ...state, passwordTwo: value });
    if (name === "firstName") setState({ ...state, firstName: value });
    if (name === "lastName") setState({ ...state, lastName: value });
  };

  const handleGenerateAvatar = () => {
    setState({
      ...state,
      avatar: { gender: "m", id: Math.floor(Math.random() * 100) },
    });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const response = await api.createUser({
        displayName,
        password,
        firstName,
        lastName,
        image,
        member: false,
        admin: false,
      });
      console.log(response);
    } catch (error: any) {
      console.error(error);
    }
    setState(initialState);
    navigate("/login");
  };

  const handleGoogle = () => {
    window.open("http://localhost:1337/api/auth/google", "_self");
  };

  useEffect(() => {
    api.getAvatar(avatar).then((url) => {
      if (url) setImage(url.data);
    });
  }, [avatar]);

  return (
    <div className="sign-up">
      <h1>Sign Up</h1>
      <img src={image} alt="userAvatar" />
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
          <label htmlFor="displayName">First Name: </label>
          <input
            type="text"
            name="firstName"
            onChange={handleChange}
            value={firstName}
            autoComplete="username"
            required
          />
        </div>
        <div className="label-input">
          <label htmlFor="displayName">Last Name: </label>
          <input
            type="text"
            name="lastName"
            onChange={handleChange}
            value={lastName}
            autoComplete="username"
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
          {password && passwordTwo && password !== passwordTwo && (
            <span>!!!</span>
          )}
        </div>
        <div className="label-input">
          <label htmlFor="passwordTwo">Repeat Password: </label>
          <input
            type="password"
            name="passwordTwo"
            onChange={handleChange}
            value={passwordTwo}
            autoComplete="new-password"
            required
          />
          {password && passwordTwo && password !== passwordTwo && (
            <span>!!!</span>
          )}
        </div>
        <div className="label-input">
          <label htmlFor="avatar">New Avatar:</label>
          <input
            type="button"
            onClick={handleGenerateAvatar}
            value="Generate New Avatar"
          />
        </div>
        <button
          type="submit"
          disabled={
            !displayName ||
            !firstName ||
            !lastName ||
            !password ||
            !passwordTwo ||
            password !== passwordTwo
          }
        >
          Submit
        </button>
      </form>
      <div className="line">
        <div className="or">or</div>
      </div>
      <button onClick={handleGoogle}>
        <FontAwesomeIcon icon={faGoogle} />
        <span>Sign Up with Google</span>
      </button>
    </div>
  );
};

export default SignUp;
