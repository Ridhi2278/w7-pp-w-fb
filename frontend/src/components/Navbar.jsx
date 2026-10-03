import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <Link to="/">Home</Link> | <Link to="/add-product">Add Product</Link>
    </nav>
  );
};

export default Navbar;