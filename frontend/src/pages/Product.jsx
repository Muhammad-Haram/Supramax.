import styled from "styled-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { publicRequest } from "../requestMethod";
import DOMPurify from 'dompurify';


const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection: "column" })}
`;

const ImgContainer = styled.div`
flex:1;
background-color: #EDEDED;
display: flex;
align-items: center;
justify-content: center;
padding: 30px 0px;
`;

const Image = styled.img`
  object-fit: cover;
  width: 40%;
  ${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Product = () => {

  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const [product, setProduct] = useState(null);

  useEffect(() => {
    const getProductDetails = async () => {
      try {
        const res = await publicRequest.get(`/products/find/${id}`, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        setProduct(res.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    getProductDetails();
  }, [id]);

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <Container>
      <Navbar />
      {/* <Announcement /> */}
      <Wrapper>
        <ImgContainer>
          <Image src={product.img} />
        </ImgContainer>
        <InfoContainer>
          <Title>{product.title}</Title>
          <Desc>
            <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product.desc) }} />
          </Desc>
        </InfoContainer>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Product;
