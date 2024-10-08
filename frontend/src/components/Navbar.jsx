import { Search } from 'lucide-react';
import React, { useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { AlignJustify } from 'lucide-react';
import { X } from 'lucide-react';
import '../style.css'
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/authSlice.js"
import { useDispatch, useSelector } from 'react-redux';

const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;


const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;


const Navbar = () => {

  const user = useSelector((state) => state.auth.currentUser);
  console.log(user)

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/dashboard/register");
  };

  const [isOpen, setIsOpen] = useState(false);

  const [toggleMenu, setToggleMenu] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  return (
    <>

      <div className='navbar'>
        <div className='navbar-logo'>
          <img className="logo" src="/img/logo.png" alt="logo" />
        </div>

        <div className='navbar-details'>
          <div className='navbar-links'>
            <Link className="navbar-single-link">All Products<img src="/img/Border.png" alt="" /></Link>
            <Link className="navbar-single-link">Solutions<img src="/img/Border.png" alt="" /></Link>
            <Link className="navbar-single-link" to="/support">Support</Link>
            <Link className="navbar-single-link">About Us</Link>
            <Link className="navbar-single-link">Contact Us</Link>
          </div>
          <div className='navbar-search'>
            <input className='search-input' type="search" placeholder='Keyword, Part Number or Cross-Reference' />
            <button className='search-img'>
              <img src="/img/search.png" alt="" />
            </button>
          </div>
        </div>

      </div>

      {
        toggleMenu && (
          <div className="navbar-info">

            <Container>
              <Wrapper>
                <Right>
                  <MenuItem><button className="menu-btn" onClick={() => setToggleMenu(false)}>
                    <X />
                  </button></MenuItem>
                </Right>
              </Wrapper>
            </Container>

            <div className="navbar-links-group">
              <ul>
                <li className="nav-link"><Link className="nav-link-anchor" to="/">Home</Link></li>


                <div className="dropdown" onMouseLeave={closeDropdown}>
                  <button
                    className="dropdown-toggle"
                    onClick={toggleDropdown}
                    onMouseEnter={toggleDropdown}
                  >
                    Products
                  </button>
                  {isOpen && (
                    <ul className="dropdown-menu">
                      <li className="dropdown-item nav-link" onClick={closeDropdown}>
                        <Link className="nav-link-anchor" to="/products/network-communication">Network Communication</Link>
                      </li>
                      <li className="dropdown-item nav-link" onClick={closeDropdown}>
                        <Link className="nav-link-anchor" to="/data-center-infrastructure">Data Center Infrastructure</Link>
                      </li>
                      <li className="dropdown-item nav-link" onClick={closeDropdown}>
                        <Link className="nav-link-anchor" to="smart-city-solutions">Smart City Solutions</Link>
                      </li>
                    </ul>
                  )}
                </div>



                <li className="nav-link"><Link className="nav-link-anchor" to="/">About</Link></li>
                <li className="nav-link"><Link className="nav-link-anchor" to="/" >Support</Link></li>
              </ul>
            </div>

          </div>
        )
      }
    </>
  );
};

export default Navbar;
