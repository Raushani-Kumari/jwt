import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../services/authService";
import { Button, Checkbox, Form, Input, message, Row, Col } from "antd";

export default function Signup() {
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState("");
    const [usernameError, setUsernameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
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
    }

    const handlePassword = (e) => {
        const passwordValue = e.target.value;
        setPassword(passwordValue);

        const passwordRegex = /^[a-zA-Z0-9]+$/;
        if (!passwordRegex.test(passwordValue)) {
            setPasswordError("Password must contain alphabets and numbers");
        }

        else if (passwordValue.length < 8) {
            setPasswordError("Password must be at least 8 characters long");
        }
        else {
            setPasswordError("");
        }
    }

    const handleUsername = (e) => {
        const usernameValue = e.target.value;
        setUserName(usernameValue);

        const usernameRegex = /^[A-Za-z\s]+$/;
        if (!usernameRegex.test(usernameValue)) {
            setUsernameError("Username must contain only letters and spaces");
        } else {
            setUsernameError("");
        }
    }

    const handleConfirmPassword = (e) => {
        const confirmPasswordValue = e.target.value;
        setConfirmPassword(confirmPasswordValue);

        if (password !== confirmPasswordValue) {
            setConfirmPasswordError("Password and Confirm Password don't match");
        } else {
            setConfirmPasswordError("");
        }
    };


    const handleSignupData = async (e) => {
        e.preventDefault();
        console.log("username : ", username, " email : ", email, " password: ", password)
        // validate the signup data and post it to backend server
        try {
            await register({ username, email, password });
            navigate('/login');
        } catch (err) {
            alert("Signup failed. Please try again.");
            console.log(err);
        }
    }

    return (
        <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
            <Col xs={24} sm={16} md={12} lg={8}>
                <div className="form" style={{ border: "1px solid rgb(40, 60, 92)", padding: "20px", borderRadius: "5px" }}>
                    <Form className="create-form"
                        onSubmitCapture={handleSignupData}>
                        <h1 className="form-heading">Sign Up</h1>
                        
                        <Form.Item
                            style={{ width: "100%" }}
                            label="Username"
                            validateStatus={usernameError ? "error" : ""}
                            help={usernameError || ""}
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                        >
                            <Input
                                placeholder="Username"
                                type="text"
                                value={username}
                                onChange={handleUsername}
                            />
                        </Form.Item>

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
                        <Form.Item
                            style={{ width: "100%" }}
                            label="Confirm Password"
                            validateStatus={confirmPasswordError ? "error" : ""}
                            help={confirmPasswordError || ""}
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                        >
                            <Input.Password
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={handleConfirmPassword}
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
                                disabled={usernameError || emailError || passwordError ||confirmPasswordError || !checkbox}
                            >
                                Sign Up
                            </Button>
                        </Form.Item>

                        <div style={{ textAlign: "center", marginTop: "16px" }}>
                            <span>
                                New User? <Link to='/login'>Log In</Link>
                            </span>
                        </div>
                    </Form>
                </div>
            </Col>
        </Row>

    )
}