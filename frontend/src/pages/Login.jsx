import styled from "styled-components";
import { mobile } from "../responsive";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/apiCalls.js";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isFetching, currentUser } = useSelector((store) => store.auth);

  const loginHandler = async (e) => {
    e.preventDefault(); // Prevent default form submission
    console.log("Attempting to log in with:", { username, password });

    if (!username || !password) {
      toast.error("Username and password are required");
      return;
    }

    try {
      const response = await login(dispatch, { username, password });
      console.log("Login response:", response);

      if (response && response.error) {
        toast.error(response.error);
      } else {
        toast.success('Login Successful');
        navigate("/");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }

    } catch (error) {
      toast.error("An error occurred during login. Please try again.");
    }
  };


  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser])

  return (

    <div className="form-container">
      <div className="wrapper">
        <img className="form-cont-img" src="/img/logo.png" alt="" />
        <form className="wrapper-form" onSubmit={loginHandler}>
          <input
            className="wrapper-input"
            placeholder="username"
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
          <input
            className="wrapper-input"
            placeholder="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <button className="wrapper-button" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>

  );
};

export default Login;
