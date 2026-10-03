import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`/api/products/${id}`);

      if (!res.ok) {
        console.error("Failed to fetch product");
        return;
      }

      const data = await res.json();
      setProduct(data);
    };

    fetchProduct();
  }, [id]);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmed) return;

    const res = await fetch(`/api/products/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      console.error("Failed to delete product");
      return;
    }

    navigate("/");
  };

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div className="product-page">
      <h1>{product.productName}</h1>

      <p>
        <strong>Category:</strong> {product.category}
      </p>

      <p>
        <strong>Description:</strong> {product.description}
      </p>

      <p>
        <strong>Price:</strong> {product.price}
      </p>

      <p>
        <strong>Inventory Count:</strong> {product.inventoryCount}
      </p>

      <h2>Supplier</h2>

      <p>
        <strong>Name:</strong> {product.supplier.name}
      </p>

      <p>
        <strong>Email:</strong> {product.supplier.contactEmail}
      </p>

      <p>
        <strong>Phone:</strong> {product.supplier.contactPhone}
      </p>

      <p>
        <strong>Verified:</strong>{" "}
        {product.supplier.isVerified ? "Yes" : "No"}
      </p>

      <Link to={`/edit/${id}`}>Edit</Link>

      <br />
      <br />

      <button onClick={handleDelete}>Delete</button>

      <br />
      <br />

      <Link to="/">Back</Link>
    </div>
  );
};

export default ProductPage;