import styled from "styled-components";
import Navbar from "../components/Navbar";
import Products from "../components/Products";
import Footer from "../components/Footer";
import { mobile } from "../responsive";
import { useLocation } from "react-router-dom";


const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
`;

const ProductList = () => {

  const location = useLocation();
  const category = location.pathname.split("/")[3];

  return (
    <Container>
      <Navbar />
      <Title>{category.toUpperCase()}</Title>
      <Products category={category} />
      <Footer />
    </Container>
  );
};

export default ProductList;
