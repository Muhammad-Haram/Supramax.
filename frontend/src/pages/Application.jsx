import React from "react";
import Navbar from "../components/Navbar";
import NavMini from "../components/NavMini";
import Footer from "../components/Footer";
import ConnectTheWorld from "../components/ConnectTheWorld";

const Application = () => {
  return (
    <>
      <Navbar />
      <NavMini />
      <div className="page-section">
        <div className="aboutus-content">
          <h1 className="aboutus-h1">Application</h1>

          <ul className="ul-item">
            <li className="list-items">Local Area Networks (LAN)</li>
            <li className="list-items">Wide Area Networks (WAN)</li>
            <li className="list-items">Data Center Infrastructure</li>
            <li className="list-items">Voice Services (VoIP)</li>
            <li className="list-items">Video Services</li>
            <li className="list-items">Security Systems</li>
            <li className="list-items">Building Automation Systems</li>
            <li className="list-items">
              Internet of Things (IoT) Applications
            </li>
            <li className="list-items">Smart Buildings and Cities</li>
            <li className="list-items">5G and Edge Computing</li>
          </ul>
        </div>

        <div className="aboutus-img-div">
          <img className="aboutus-img" src="/img/about2.png" alt="" />
        </div>
      </div>
      <ConnectTheWorld />
      <Footer />
    </>
  );
};

export default Application;
