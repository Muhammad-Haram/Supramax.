import { useLocation } from "react-router-dom";

const SearchResults = () => {
    const location = useLocation();
    const { products } = location.state;

    return (
        <div className="search-results">
            <h2>Search Results</h2>
            {products.length > 0 ? (
                <div className="product-grid">
                    {products.map((product) => (
                        <div key={product._id} className="product-card">
                            <img src={product.img} alt={product.title} />
                            <h3>{product.title}</h3>
                            <p>{product.desc}</p>
                            <span>Part Number: {product.partNumber}</span>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No products found.</p>
            )}
        </div>
    );
};

export default SearchResults;
