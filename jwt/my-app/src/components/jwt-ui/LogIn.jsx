import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login, saveToken } from "../../services/authService";
import { saveTokenWithExpiry } from "../../utils/tokenUtil";
import { UserContext } from "../../context/UserContext";
import { Button, Checkbox, Form, Input, message, Row, Col } from "antd";
import Signup from "./Signup";
import { AuthModelContext } from "../../context/AuthModelContext";

export default function LogIn({ setShowModalContent, isModel }) {
  const { setShowAuthModel } = useContext(AuthModelContext);

  const { setUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
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
        console.log("Login successful.");
        setShowAuthModel(false)
        navigate("/home");
      } else {
        alert("Login failed. Invalid credentials.");
      }
    } catch (err) {
      alert("Login failed. Please try again.");
      console.log(err);
    }
  };

  const formStyle = {
    border: "1px solid rgb(40, 60, 92)",
    padding: "20px",
    borderRadius: "5px",
  };
  const handleSignupModal = () => {
    setShowModalContent();
  };

  const renderForm = (
    <div className={!isModel && "form"} style={{ ...(!isModel && formStyle) }}>
      <Form className="create-form" onSubmitCapture={handleFormData}>
        <h1 className="form-heading">Log In</h1>

        <Form.Item
          style={{ width: "100%" }}
          label="Email"
          validateStatus={emailError ? "error" : ""}
          help={emailError || ""}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
        >
          <Input
            placeholder="Email"
            type="email"
            value={email}
            onChange={handleEmail}
          />
        </Form.Item>

        <Form.Item
          style={{ width: "100%" }}
          label="Password"
          validateStatus={passwordError ? "error" : ""}
          help={passwordError || ""}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
        >
          <Input.Password
            placeholder="Password"
            value={password}
            onChange={handlePassword}
          />
        </Form.Item>

        <Form.Item>
          <Checkbox
            wrapperCol={{ span: 24 }}
            onChange={(e) => setCheckbox(e.target.checked)}
          >
            I agree to the Terms and Conditions
          </Checkbox>
        </Form.Item>

        <Form.Item>
          <Button
            style={{ backgroundColor: "navy", color: "white" }}
            className="custom-button"
            type="primary"
            htmlType="submit"
            block
            disabled={emailError || passwordError || !checkbox}
          >
            Log In
          </Button>
        </Form.Item>

        <div style={{ textAlign: "center", marginTop: "16px" }}>
          <span>
            New User?{" "}
            <Button type="text" onClick={handleSignupModal}>
              Sign Up
            </Button>
          </span>
        </div>
      </Form>
    </div>
  );

  return (
    <>
      {isModel ? (
        renderForm
      ) : (
        <Row
          justify="center"
          align="middle"
          style={{ minHeight: isModel ? "auto" : "100vh" }}
        >
          <Col xs={24} sm={16} md={12} lg={8}>
            {renderForm}
          </Col>
        </Row>
      )}
    </>
  );
}
