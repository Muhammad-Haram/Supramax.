import '../style.css';
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/authSlice.js";
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';


const Navbar = () => {
  const user = useSelector((state) => state.auth.currentUser);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      dispatch(logout());
      navigate("/dashboard/login");
      toast.success('Logout Successful')
    } catch (error) {
     toast.error('Logout Failed') 
    }
  };

  const [isProductsOpen, setProductsOpen] = useState(false);
  const [isSolutionsOpen, setSolutionsOpen] = useState(false);

  const toggleProductsDropdown = () => {
    setProductsOpen(prev => !prev);
    setSolutionsOpen(false); // Close Solutions dropdown if Products is opened
  };

  const toggleSolutionsDropdown = () => {
    setSolutionsOpen(prev => !prev);
    setProductsOpen(false); // Close Products dropdown if Solutions is opened
  };

  return (
    <div className='navbar'>
      <div className='navbar-logo'>
        <Link to="/">
          <img className="logo" src="/img/logo.png" alt="logo" />
        </Link>
      </div>

      <div className='navbar-details'>
        <div className='navbar-links'>
          <div className="navbar-single-link" onClick={toggleProductsDropdown}>
            All Products <img src="/img/Border.png" alt="" />
            {isProductsOpen && (
              <div className="dropdown">
                <Link to="/products/product1">Product 1</Link>
                <Link to="/products/product2">Product 2</Link>
                <Link to="/products/product3">Product 3</Link>
              </div>
            )}
          </div>

          <div className="navbar-single-link" onClick={toggleSolutionsDropdown}>
            Solutions <img src="/img/Border.png" alt="" />
            {isSolutionsOpen && (
              <div className="dropdown">
                <Link to="/products/solutions/solution1">Solution 1</Link>
                <Link to="/products/solutions/solution2">Solution 2</Link>
                <Link to="/products/solutions/solution3">Solution 3</Link>
              </div>
            )}
          </div>

          <Link className="navbar-single-link" to="/support">Support</Link>
          <Link className="navbar-single-link">About Us</Link>
          <Link className="navbar-single-link">Contact Us</Link>

          {user && <Link onClick={handleLogout} className="navbar-single-link">Logout</Link>}

        </div>

        <div className='navbar-search'>
          <input className='search-input' type="search" placeholder='Keyword, Part Number or Cross-Reference' />
          <button className='search-img'>
            <img src="/img/search.png" alt="" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
