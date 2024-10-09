import React from "react";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Products from "../components/Products";
import Hero from "../components/Hero";
import Solution from "../components/Solution";
import ConnectTheWorld from "../components/ConnectTheWorld";
import AboutUs from "../components/AboutUs";
import Blogs from "../components/Blogs";

const Home = () => {
  return (
    <div>
      {/* <Announcement /> */}
      <Navbar />
      <Hero />
      <Categories />
      <Solution/>
      <ConnectTheWorld/>
      <AboutUs/>
      <Blogs/>
      <Footer/>
    </div>
  );
};

export default Home;
