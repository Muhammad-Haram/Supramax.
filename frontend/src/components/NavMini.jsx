import '../style.css';
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/authSlice.js";
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { Menu } from 'lucide-react';
import { X } from 'lucide-react';

const NavMini = () => {
    const user = useSelector((state) => state.auth.currentUser);
    const [toggle, setToggle] = useState(false)

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const toggleActive = () => {
        setToggle(!toggle)
        console.log(toggle)
    }

    const handleLogout = () => {
        dispatch(logout());
        navigate("/dashboard/register");
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
        <>
            <div className='navbar-mini'>

                <div className="navbar-div">
                    <div className='navbar-logo'>
                        <Link to="/">
                            <img className="logo" src="/img/logo.png" alt="logo" />
                        </Link>
                    </div>

                    <div className='navbarRight'>

                        <div className='navbar-search'>
                            <input className='search-input' type="search" placeholder='Keyword, Part Number or Cross-Reference' />
                            <button className='search-img'>
                                <img src="/img/search.png" alt="" />
                            </button>
                        </div>

                        <div className='toggle'>
                            <button onClick={toggleActive} className='toggle-button'><Menu /></button>
                        </div>

                    </div>

                </div>

                <div className={`${toggle ? "navbar-side navbar-active" : "navbar-side"}`}>


                    <div className='navbar-links'>

                        <div className='toggle-close'>
                            <button onClick={toggleActive} className='toggle-button'><X /></button>
                        </div>

                        <div className='navbar-links-div'>
                            <div className="navbar-single-link" onClick={toggleProductsDropdown}>
                                <p className='navbar-button'>All Products <img src="/img/Border.png" alt="" /></p>
                                {isProductsOpen && (
                                    <div className="dropdown">
                                        <Link to="/products/product1">Product 1</Link>
                                        <Link to="/products/product2">Product 2</Link>
                                        <Link to="/products/product3">Product 3</Link>
                                    </div>
                                )}
                            </div>

                            <div className="navbar-single-link" onClick={toggleSolutionsDropdown}>
                            <p className='navbar-button'>Solutions <img src="/img/Border.png" alt="" /></p>
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
                        </div>
                    </div>

                </div>

            </div>
        </>
        // navbar-active

    );
};

export default NavMini; 