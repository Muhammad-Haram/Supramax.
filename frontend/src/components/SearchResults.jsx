import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import NavMini from "./NavMini";
import SearchProduct from "./SearchProduct";

const SearchResults = () => {
    const location = useLocation();
    const { products } = location.state;

    return (

        <>
            <Navbar />
            <NavMini />

            <div className="search-results">
                {/* <h2 className="search-results-title">Search Results</h2> */}
                {products.length > 0 ? (
                    <div className="product-grid">
                        {products.map((product) => (
                            <Link key={product._id} to={`/product/${product._id}`} className="single-search-link">
                                <SearchProduct item={product} />
                            </Link>
                        ))}
                    </div>
                ) : (
                    <p className="no-results">No products found.</p>
                )}
            </div>
        </>
    );
};

export default SearchResults;
