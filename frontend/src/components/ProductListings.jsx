import { useEffect, useState } from "react";
import ProductListing from "./ProductListing";

const ProductListings = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");

        if (!res.ok) {
          console.error("Failed to fetch products");
          return;
        }

        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="product-listings">
      {products.map((product) => (
        <ProductListing
          key={product._id}
          product={product}
        />
      ))}
    </div>
  );
};

export default ProductListings;