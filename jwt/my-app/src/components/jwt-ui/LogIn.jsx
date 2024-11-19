import React, { useContext, useState } from "react";
import { Button, Checkbox, Form } from "semantic-ui-react";
import { Link, useNavigate } from "react-router-dom";
import { login, saveToken } from "../../services/authService";
import { saveTokenWithExpiry } from "../../utils/tokenUtil";
import { UserContext } from "../../context/UserContext";

export default function LogIn() {
  const { setUser } = useContext(UserContext); // Access user from context
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [checkbox, setCheckbox] = useState(false);
  const navigate = useNavigate();

  const handleEmail = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(emailValue)) {
      setEmailError("Incorrect Email");
    } else {
      setEmailError("");
    }
  };

  const handlePassword = (e) => {
    const passwordValue = e.target.value;
    setPassword(passwordValue);

    const passwordRegex = /^[a-zA-Z0-9]+$/;
    if (!passwordRegex.test(passwordValue)) {
      setPasswordError("Password must contain alphabets and numbers");
    } else if (passwordValue.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
    } else {
      setPasswordError("");
    }
  };

  const handleConfirmPassword = (e) => {
    const confirmPasswordValue = e.target.value;
    setConfirmPassword(confirmPasswordValue);

    if (password !== confirmPasswordValue) {
      setConfirmPasswordError("Password and Confirm Password don't match");
    } else {
      setConfirmPasswordError("");
    }
  };

  const handleFormData = async (e) => {
    e.preventDefault();
    console.log(email, password);
    try {
      const { user, token, refreshToken } = await login({ email, password });
      console.log(user);

      if (user) {
        setUser({ ...user, isAuthenticated: true });
      }
      console.log("user data", user);
      localStorage.setItem("userEmail", user.email);
      localStorage.setItem("userName", user.username);
      if (token && refreshToken) {
        // save the token with the expiry time
        saveTokenWithExpiry(token, refreshToken);
        // saveToken(response.token);
        console.log("token", token);
        console.log("refreshToken", refreshToken);
        console.log("Login successful.");
        navigate("/home");
      } else {
        alert("Login failed. Invalid credentials.");
      }
    } catch (err) {
      alert("Login failed. Please try again.");
      console.log(err);
    }
  };

  return (
    <div className="container">
      <div className="form">
        <Form className="create-form">
          <h1 className="form-heading">Log In</h1>
          <Form.Field className="margin-top">
            <label>Email </label>
            <input
              placeholder="Email"
              type="email"
              value={email}
              onChange={handleEmail}
            />
          </Form.Field>
          <span style={{ color: "red" }}>{emailError}</span>
          <Form.Field className="margin-top">
            <label>Password</label>
            <input
              placeholder="Password"
              type="password"
              value={password}
              onChange={handlePassword}
            />
          </Form.Field>
          <span style={{ color: "red" }}>{passwordError}</span>
          {/* <Form.Field className="margin-top">
            <label>Confirm Password</label>
            <input
              placeholder="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPassword}
            />
          </Form.Field> */}
          <span style={{ color: "red" }}>{confirmPasswordError}</span>
          <Form.Field className="margin-top">
            <Checkbox
              label="I agree to the Terms and Conditions"
              onChange={(e) => setCheckbox(true)}
            />
          </Form.Field>
          <div className="btn-position">
            <Button
              className="form-button"
              type="submit"
              onClick={handleFormData}
            >
              Login
            </Button>
          </div>
          <div style={{ textAlign: "center", margin: "4px" }}>
            <span>
              New User ? <Link to="/signup">Signup</Link>
            </span>
          </div>
        </Form>
      </div>
    </div>
  );
}
