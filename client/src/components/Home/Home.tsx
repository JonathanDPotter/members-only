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
    </div>
  );
};

export default Home;
