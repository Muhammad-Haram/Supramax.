import styled from "styled-components";
import { mobile } from "../responsive";
import { register } from "../redux/apiCalls";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast'; // Importing toast for notifications

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("/img/slider2.jpg") center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 5px;
  padding: 10px;
`;

const Button = styled.button`
  width: 100%;
  border: none;
  padding: 15px 20px;
  background-color: #7bb700;
  color: white;
  cursor: pointer;
  margin: 5px;
  margin-top: 15px;
`;

const Register = () => {
  const [inputs, setInputs] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }



  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const response = await register(dispatch, inputs);

      if (response && response.error) {
        toast.error(response.error);
      } else {
        toast.success("Registration successful! You can now log in.");

        // Check if persistedRoot exists
        const persistedRoot = localStorage.getItem("persist:root");
        if (persistedRoot) {
          const user = JSON.parse(persistedRoot).currentUser;

          if (user) {
            navigate("/login");
          }
        } else {
          console.error("No persisted root found in local storage.");
        }
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Registration failed. Please try again.");
    }
  };




  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form onSubmit={handleClick}>
          <Input name="username" type="text" placeholder="username" onChange={handleChange} />
          <Input name="email" type="email" placeholder="email" onChange={handleChange} />
          <Input name="password" type="password" placeholder="password" onChange={handleChange} />
          <Button type="submit">CREATE</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
