import '../style.css';
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/authSlice.js";
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { publicRequest } from '../requestMethod';

const Navbar = () => {
  const user = useSelector((state) => state.auth.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isProductsOpen, setProductsOpen] = useState(false);
  const [isSolutionsOpen, setSolutionsOpen] = useState(false);
  const [isForAdminOpen, setForAdminOpen] = useState(false);

  const handleLogout = () => {
    try {
      dispatch(logout());
      navigate("/login");
      toast.success('Logout Successful');
    } catch (error) {
      toast.error('Logout Failed');
    }
  };

  const handleSearch = async () => {
    if (!searchQuery) {
      toast.error("Please enter a search term");
      return;
    }

    try {
      const response = await publicRequest.get(`/products/search?q=${searchQuery}`);
      const products = response.data;
      console.log(products);

      if (products.length > 0) {
        navigate("/search-results", { state: { products } });
      } else {
        toast.error("No products found");
      }
    } catch (error) {
      toast.error("Search failed. Please try again.");
    }
  };

  const toggleProductsMenu = () => {
    setProductsOpen(prev => !prev);
  };

  const closeProductsMenu = () => {
    setProductsOpen(false);
  };

  const toggleAdminMenu = () => {
    setForAdminOpen(prev => !prev);
  };

  const closeAdminMenu = () => {
    setForAdminOpen(false);
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
          <div
            className="navbar-single-link"
            onClick={toggleProductsMenu}
          >
            All Categories <img src="/img/Border.png" alt="" />

            {isProductsOpen && (
              <div
                className={`mega-dropdown ${isProductsOpen ? '' : 'hide'}`}
                onMouseLeave={closeProductsMenu}
              >
                <div className="dropdown-column">
                  <h3>Data Cables</h3>
                  <Link to="/products/copper-data-cable">Copper Data Cable</Link>
                  <Link to="/products/copper-multipair-cables">Copper Multipair Cables</Link>
                  <Link to="/products/copper-coaxial-special-cables">Copper Coaxial Special Cables</Link>
                  <Link to="/products/copper-voice-termination-solution">Copper Voice Termination Solution</Link>
                </div>
                <div className="dropdown-column">
                  <h3>Patch Cords & Panels</h3>
                  <Link to="/products/copper-patch-cord">Copper Patch Cord</Link>
                  <Link to="/products/copper-patch-panel">Copper Patch Panel</Link>
                  <Link to="/products/copper-information-outlet-connector">Copper Information Outlet Connector</Link>
                  <Link to="/products/face-plate-floor-socket">Face Plate Floor Socket</Link>
                </div>
                <div className="dropdown-column">
                  <h3>Fiber Products</h3>
                  <Link to="/products/fiber-accessories">Fiber Accessories</Link>
                  <Link to="/products/fiber-cable">Fiber Cable</Link>
                  <Link to="/products/fiber-patch-cord">Fiber Patch Cord</Link>
                </div>
                <div className="dropdown-column">
                  <h3>Miscellaneous</h3>
                  <Link to="/products/cabinets">Cabinets</Link>
                  <Link to="/products/cabinets-tray-accessories">Cabinets Tray Accessories</Link>
                  <Link to="/products/power-distribution-unit">Power Distribution Unit</Link>
                </div>
              </div>
            )}
          </div>

          <Link className="navbar-single-link" to="/aboutus">About Us</Link>
          <Link className="navbar-single-link" to="/contactus">Contact Us</Link>

          {user && (
            <div
              className="navbar-single-link"
              onClick={toggleAdminMenu}
            >
              For Admin <img src="/img/Border.png" alt="" />

              {isForAdminOpen && (
                <div
                  className="dropdown"
                  onMouseLeave={closeAdminMenu}
                >
                  <Link to="/dashboard">Dashboard</Link>
                  <Link onClick={handleLogout} className="navbar-single-link">Logout</Link>
                </div>
              )}
            </div>
          )}

        </div>

        <div className='navbar-search'>
          <input className='search-input' type="search" placeholder='Keyword, Part Number or Cross-Reference' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          <button className='search-img' onClick={handleSearch}>
            <img src="/img/search.png" alt="" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
