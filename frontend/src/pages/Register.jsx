import styled from "styled-components";
import { mobile } from "../responsive";
import { register } from "../redux/apiCalls";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("/img/slider2.jpg")
      center;
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
  margin:5px;
  padding: 10px;
`;

const Button = styled.button`
  width: 100%;
  border: none;
  padding: 15px 20px;
  background-color: #7bb700;
  color: white;
  cursor: pointer;
  margin:5px;
  margin-top: 15px;
`;

const Register = () => {

  const [inputs, setInputs] = useState({});

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      register(dispatch, inputs);

      const persistedRoot = JSON.parse(localStorage.getItem("persist:root"));
      const user = persistedRoot && JSON.parse(persistedRoot.currentUser);
      console.log(user)

      if (user) {
        navigate("/dashboard/login");
      }
    } catch (error) { 
      console.log(error, "register error");
    }
  }

  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          <Input name="username" type="text" placeholder="username" onChange={handleChange} />
          <Input name="email" type="email" placeholder="email" onChange={handleChange} />
          <Input name="password" type="password" placeholder="password" onChange={handleChange} />
          <Button onClick={handleClick}>CREATE</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
