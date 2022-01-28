import React, { useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useAppDispatch as useDispatch, useAppSelector } from "./store/hooks";
import { AnimatePresence } from "framer-motion";
// utils
import api from "./api";
import { addAuthUser } from "./store/slices/authSlice";
// components
import Home from "./components/Home/Home";
import LogOut from "./components/LogOut/LogOut";
import NavBar from "./components/NavBar/NavBar";
import SignUp from "./components/SignUp/SignUp";
import Framer from "./components/Framer/Framer";
import LogIn from "./components/LogIn/LogIn";
import CreateMessage from "./components/CreateMessage/CreateMessage";
import { addMessage } from "./store/slices/messageSlice";
import { Imessage } from "./interfaces/message";

const App = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { auth } = useAppSelector((store) => store.auth);

  useEffect(() => {
    api.getAuth().then((response) => {
      const user = response.data;
      dispatch(addAuthUser(user));
    });
    api.getMessages().then((response) => {
      const {messages} = response.data;
      messages.forEach((message: Imessage) => dispatch(addMessage(message)));
    });
  }, [dispatch]);

  return (
    <>
      <NavBar />
      <AnimatePresence exitBeforeEnter initial={false}>
        <Routes location={location} key={location.key}>
          <Route path="/" element={<Framer component={<Home />} />} />
          <Route
            path="/create-message"
            element={<Framer component={<CreateMessage />} />}
          />
          <Route
            path="/signup"
            element={
              <Framer component={!auth ? <SignUp /> : <Navigate to="/" />} />
            }
          />
          <Route
            path="/login"
            element={
              <Framer component={!auth ? <LogIn /> : <Navigate to="/" />} />
            }
          />
          <Route
            path="/logout"
            element={
              <Framer component={auth ? <LogOut /> : <Navigate to="/" />} />
            }
          />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </AnimatePresence>
    </>
  );
};

export default App;
