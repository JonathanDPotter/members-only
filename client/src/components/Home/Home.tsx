import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// utils
import { useAppSelector as useSelector } from "../../store/hooks";
// styles
import "./Home.scss";

const Home = () => {
  const { auth } = useSelector((store) => store.auth);

  return (
    <div className="home">
      <h1>Home</h1>
      <h1>{`Hello ${auth ? auth.displayName : "guest"}.`}</h1>
      {auth && (
        <ul>
          <li>{auth.admin ? "true" : "false"}</li>
          <li>{auth.createdAt}</li>
          <li>{auth.displayName}</li>
          <li>{auth.firstName}</li>
          <li>{auth.lastName}</li>
          <li>{auth.image}</li>
          <li>{auth.member ? "true" : "false"}</li>
        </ul>
      )}
    </div>
  );
};

export default Home;
