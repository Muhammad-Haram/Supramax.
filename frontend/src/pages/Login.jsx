import styled from "styled-components";
import { mobile } from "../responsive";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/apiCalls.js";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("/img/slider.jpg") center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })};
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: #7bb700;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  &:disabled {
    color: green;
    cursor: not-allowed;
  }
`;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Loading state for admin check

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isFetching, currentUser } = useSelector((store) => store.auth);

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true); // Start loading when login is attempted
      const response = await login(dispatch, { username, password });
      
      if (response && response.error) {
        toast.error(response.error);
      } else {
        toast.success('Login Successful');
      }
    } catch (error) {
      toast.error("An error occurred during login. Please try again.");
    } finally {
      setLoading(false); // Stop loading after login attempt
    }
  };

  const checkAdminStatus = () => {
    try {
      const storedData = JSON.parse(localStorage.getItem("persist:root"));
      const authData = storedData ? JSON.parse(storedData.auth) : null;
      return authData?.currentUser?.isAdmin;
    } catch (err) {
      console.error("Error reading admin data from localStorage:", err);
      return undefined;
    }
  };

  const admin = checkAdminStatus();

  useEffect(() => {
    if (currentUser && admin === undefined) {
      setLoading(true);
    }

    if (admin !== undefined) {
      setLoading(false); // Stop loading when admin status is resolved

      if (admin === true) {
        navigate("/dashboard"); 
      } else if (admin === false) {
        navigate("/"); // Non-admin user navigated to home
      }
    }
  }, [currentUser, navigate, admin]);

  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form onSubmit={loginHandler}>
          <Input
            placeholder="username"
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
          <Input
            placeholder="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <Button type="submit" disabled={isFetching || loading}>
            {loading ? "Loading..." : "LOGIN"}
          </Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
