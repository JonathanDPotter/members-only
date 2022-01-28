import React, { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
// utils
import api from "../../api";
import { useAppSelector } from "../../store/hooks";
// styles
import "./Join.scss";

const Join = () => {
  const { auth } = useAppSelector((state) => state.auth);
  const [member, setMember] = useState("");

  const navigate = useNavigate();

  const handleChange = (event: FormEvent<HTMLInputElement>) => {
    setMember(event.currentTarget.value);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (auth && member === "MEMBER") {
      try {
        const { displayName } = auth;
        const response = await api.updateUser({ displayName, member: true });
        console.log(response.data.user);
        window.alert("success!");
        navigate("/");
        navigate(0);
      } catch (error: any) {
        window.alert(error.message);
      }
    } else if (auth && member === "ADMIN") {
      try {
        const { displayName } = auth;
        const response = await api.updateUser({
          displayName,
          admin: true,
        });
        console.log(response.data.user);
        window.alert("ADMIN");
        navigate("/");
        navigate(0);
      } catch (error: any) {
        window.alert(error.message);
      }
    } else {
      window.alert("Wrong Code!");
    }
  };

  return (
    <div className="join">
      <h1>Join</h1>
      <h2>Type "MEMBER" below to become a member.</h2>
      <form onSubmit={handleSubmit}>
        <div className="label-input">
          <label htmlFor="member">Enter Code: </label>
          <input
            type="text"
            name="member"
            onChange={handleChange}
            value={member}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Join;
