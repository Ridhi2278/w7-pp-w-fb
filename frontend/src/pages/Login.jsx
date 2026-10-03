import { useNavigate } from "react-router-dom";
import useField from "../hooks/useField";
import useLogin from "../hooks/useLogin";

const Login = ({ setIsAuthenticated }) => {
  const email = useField("email");
  const password = useField("password");

  const { login, error } = useLogin("/api/users/login");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = await login({
      email: email.value,
      password: password.value,
    });

    if (data) {
      setIsAuthenticated(true);
      navigate("/");
    }
  };

  return (
    <div className="create">
      <h2>Log In</h2>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input {...email} />

        <label>Password:</label>
        <input {...password} />

        <button type="submit">Log In</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default Login;