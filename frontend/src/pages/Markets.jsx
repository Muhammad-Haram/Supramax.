import React from "react";
import Navbar from "../components/Navbar";
import NavMini from "../components/NavMini";
import ConnectTheWorld from "../components/ConnectTheWorld";
import Footer from "../components/Footer";

const Markets = () => {
  return (
    <>
      <Navbar />
      <NavMini />
      <div className="page-section">
        <div className="aboutus-img-div">
          <img className="aboutus-img" src="/img/about.png" alt="" />
        </div>

        <div className="aboutus-content">
          <h1 className="aboutus-h1">Market</h1>

          <ul className="ul-item">
            <li className="list-items-2">
              <span className="sprmx-span">Data Centers:</span>Ensures
              high-speed data transmission and reliable connectivity.
            </li>
            <li className="list-items-2">
              <span className="sprmx-span">Healthcare:</span>Medical imaging,
              patient monitoring systems, accessing patient’s records via
              database and electronic health records, all require a reliable
              communication network.
            </li>
            <li className="list-items-2">
              <span className="sprmx-span">Education:</span>Vital for internet
              access, video conferencing, campus-wide network and smart
              classroom technologies.
            </li>
            <li className="list-items-2">
              <span className="sprmx-span">
                Enterprise & Commercial Buildings:
              </span>
              Office buildings and commercial spaces use structured cabling for
              internet, phone systems, and building automation. communication
              network.
            </li>
            <li className="list-items-2">
              <span className="sprmx-span">Residential:</span>Access of
              high-speed internet, home automation, surveillance and
              entertainment systems, all require a reliable communication
              network.
            </li>
            <li className="list-items-2">
              <span className="sprmx-span">Transportation:</span>Airports, railways, and other transportation hubs need reliable network for smooth operations
            </li>
          </ul>
        </div>
      </div>
      <ConnectTheWorld />
      <Footer />
    </>
  );
};

export default Markets;
