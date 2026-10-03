import { Link } from "react-router-dom";

const ProductListing = ({ product }) => {
  return (
    <div className="product-listing">
      <h3>
        <Link to={`/products/${product._id}`}>
          {product.productName}
        </Link>
      </h3>

      <p>Category: {product.category}</p>
      <p>Price: {product.price}</p>
    </div>
  );
};

export default ProductListing;