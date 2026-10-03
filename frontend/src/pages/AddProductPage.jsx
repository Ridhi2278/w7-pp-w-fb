import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProductPage = () => {
  const navigate = useNavigate();

  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [inventoryCount, setInventoryCount] = useState("");
  const [supplierName, setSupplierName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const token = user ? user.token : null;

  const submitForm = async (e) => {
    e.preventDefault();

    const newProduct = {
      productName,
      category,
      description,
      price: Number(price),
      inventoryCount: Number(inventoryCount),
      supplier: {
        name: supplierName,
        contactEmail,
        contactPhone,
        isVerified,
      },
    };

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Iteration 7: send the token
        },
        body: JSON.stringify(newProduct),
      });

      if (!res.ok) {
        console.error("Failed to add product");
        return;
      }

      navigate("/");
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="create">
      <h2>Add a New Product</h2>

      <form onSubmit={submitForm}>
        <label>Product Name:</label>
        <input
          type="text"
          required
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />

        <label>Category:</label>
        <select
          required
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">-- Select --</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
          <option value="Food">Food</option>
          <option value="Books">Books</option>
          <option value="Other">Other</option>
        </select>

        <label>Description:</label>
        <textarea
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label>Price:</label>
        <input
          type="number"
          required
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <label>Inventory Count:</label>
        <input
          type="number"
          required
          value={inventoryCount}
          onChange={(e) => setInventoryCount(e.target.value)}
        />

        <h3>Supplier</h3>

        <label>Supplier Name:</label>
        <input
          type="text"
          required
          value={supplierName}
          onChange={(e) => setSupplierName(e.target.value)}
        />

        <label>Contact Email:</label>
        <input
          type="email"
          required
          value={contactEmail}
          onChange={(e) => setContactEmail(e.target.value)}
        />

        <label>Contact Phone:</label>
        <input
          type="text"
          required
          value={contactPhone}
          onChange={(e) => setContactPhone(e.target.value)}
        />

        <label>
          <input
            type="checkbox"
            checked={isVerified}
            onChange={(e) => setIsVerified(e.target.checked)}
          />{" "}
          Verified supplier
        </label>

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProductPage;