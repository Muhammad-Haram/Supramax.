import "../style.css";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/authSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Menu } from "lucide-react";
import { X } from "lucide-react";
import toast from "react-hot-toast";
import { publicRequest } from "../requestMethod";

const NavMini = () => {
  const user = useSelector((state) => state.auth.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [toggle, setToggle] = useState(false);
  const [isProductsOpen, setProductsOpen] = useState(false);
  const [isSolutionsOpen, setSolutionsOpen] = useState(false);
  const [forAdminOpen, setForAdmin] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleActive = () => {
    setToggle(!toggle);
  };

  const handleLogout = () => {
    try {
      dispatch(logout());
      navigate("/login");
      toast.success("Logout Successful");
    } catch (error) {
      toast.error("Logout Failed");
    }
  };

  const toggleProductsDropdown = () => {
    setProductsOpen((prev) => !prev);
    setSolutionsOpen(false);
    setForAdmin(false);
  };

  const toggleSolutionsDropdown = () => {
    setSolutionsOpen((prev) => !prev);
    setProductsOpen(false);
    setForAdmin(false);
  };

  const toggleForAdmin = () => {
    setForAdmin((prev) => !prev);
    setSolutionsOpen(false);
    setProductsOpen(false);
  };

  const handleSearch = async () => {
    if (!searchQuery) {
      toast.error("Please enter a search term");
      return;
    }

    try {
      const response = await publicRequest.get(
        `/products/search?q=${searchQuery}`
      );
      const products = response.data;

      if (products.length > 0) {
        navigate("/search-results", { state: { products } });
      } else {
        toast.error("No products found");
      }
    } catch (error) {
      toast.error("Search failed. Please try again.");
    }
  };

  return (
    <>
      <div className="navbar-mini">
        <div className="navbar-div">
          <div className="navbar-logo">
            <Link to="/">
              <img className="logo" src="/img/logo.png" alt="logo" />
            </Link>
          </div>

          <div className="navbarRight">
            <div className="navbar-search">
              <input
                className="search-input"
                type="search"
                placeholder="Keyword, Part Number or Cross-Reference"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="search-img" onClick={handleSearch}>
                <img src="/img/search.png" alt="" />
              </button>
            </div>

            <div className="toggle">
              <button onClick={toggleActive} className="toggle-button">
                <Menu />
              </button>
            </div>
          </div>
        </div>

        <div
          className={`${toggle ? "navbar-side navbar-active" : "navbar-side"}`}
        >
          <div className="navbar-links">
            <div className="toggle-close">
              <button onClick={toggleActive} className="toggle-button">
                <X />
              </button>
            </div>

            <div className="navbar-links-div">
              <div
                className="navbar-single-link"
                onClick={toggleProductsDropdown}
              >
                <p className="navbar-button">
                  All Products <img src="/img/Border.png" alt="" />
                </p>
                {isProductsOpen && (
                  <div className="dropdown">
                    <Link to="/products/copper-data-cable">
                      Copper Data Cable
                    </Link>
                    <Link to="/products/copper-multipair-cables">
                      Copper Multipair Cables
                    </Link>
                    <Link to="/products/copper-coaxial-special-cables">
                      Copper Coaxial Special Cables
                    </Link>
                    <Link to="/products/copper-voice-termination-solution">
                      Copper Voice Termination Solution
                    </Link>
                    <Link to="/products/copper-patch-cord">
                      Copper Patch Cord
                    </Link>
                    <Link to="/products/copper-patch-panel">
                      Copper Patch Panel
                    </Link>
                    <Link to="/products/copper-information-outlet">
                      Copper Information Outlet
                    </Link>
                    <Link to="/products/face-plate-floor-socket">
                      Face Plate Floor Socket
                    </Link>
                    <Link to="/products/fiber-accessories">
                      Fiber Accessories
                    </Link>
                    <Link to="/products/fiber-cable">Fiber Cable</Link>
                    <Link to="/products/fiber-patch-cord">
                      Fiber Patch Cord
                    </Link>
                    <Link to="/products/fiber-patch-panel">
                      Fiber Patch Panel
                    </Link>
                    <Link to="/products/fiber-patch-joint-enclosure">
                      Fiber Patch Joint Enclosure
                    </Link>
                    <Link to="/products/cable-manager">Cable Manager</Link>
                  </div>
                )}
              </div>

              {/* <div className="navbar-single-link" onClick={toggleSolutionsDropdown}>
                                <p className='navbar-button'>Solutions <img src="/img/Border.png" alt="" /></p>
                                {isSolutionsOpen && (
                                    <div className="dropdown">
                                        <Link to="/products/solutions/solution1">Solution 1</Link>
                                        <Link to="/products/solutions/solution2">Solution 2</Link>
                                        <Link to="/products/solutions/solution3">Solution 3</Link>
                                    </div>
                                )}
                            </div> */}

              {/* <Link className="navbar-single-link" to="/support">Support</Link> */}
              <Link className="navbar-single-link" to="/aboutus">
                About Us
              </Link>
              <Link className="navbar-single-link" to="/contactus">
                Contact Us
              </Link>

              {user && (
                <div className="navbar-single-link" onClick={toggleForAdmin}>
                  <p className="navbar-button">
                    For Admin <img src="/img/Border.png" alt="" />
                  </p>
                  {forAdminOpen && (
                    <div className="dropdown">
                      <Link to="/dashboard">Dashboard</Link>
                      <Link
                        onClick={handleLogout}
                        className="navbar-single-link"
                      >
                        Logout
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavMini;
