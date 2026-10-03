import { useNavigate } from "react-router-dom";
import useField from "../hooks/useField";
import useSignup from "../hooks/useSignup";

const Signup = ({ setIsAuthenticated }) => {
  const fullName = useField("text");
  const email = useField("email");
  const password = useField("password");
  const phoneNumber = useField("text");
  const gender = useField("text");
  const dateOfBirth = useField("date");
  const accountType = useField("text");

  const { signup, error } = useSignup("/api/users/signup");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = await signup({
      fullName: fullName.value,
      email: email.value,
      password: password.value,
      phoneNumber: phoneNumber.value,
      gender: gender.value,
      date_of_birth: dateOfBirth.value,
      accountType: accountType.value,
    });

    if (data) {
      setIsAuthenticated(true);
      navigate("/");
    }
  };

  return (
    <div className="create">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <label>Full Name:</label>
        <input {...fullName} />

        <label>Email:</label>
        <input {...email} />

        <label>Password:</label>
        <input {...password} />

        <label>Phone Number:</label>
        <input {...phoneNumber} />

        <label>Gender:</label>
        <select value={gender.value} onChange={gender.onChange}>
          <option value="">Select</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <label>Date of Birth:</label>
        <input {...dateOfBirth} />

        <label>Account Type:</label>
        <select value={accountType.value} onChange={accountType.onChange}>
          <option value="">Select</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        <button type="submit">Sign Up</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default Signup;