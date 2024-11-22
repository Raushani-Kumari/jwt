import React, { useContext, useEffect, useState } from 'react'
import Navbar from './Navbar'
import { Button, Checkbox, Form, Input, message, Row, Col } from "antd";
import { UserContext } from '../../context/UserContext';
import { updateUser } from '../../services/authService';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const { user, setUser } = useContext(UserContext);
    console.log("user from profile", user)
    const navigate = useNavigate();
    // console.log("userid from profile :", user._id)
    
    const [email, setEmail] = useState('');
    const [username, setUserName] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

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
        setNewPassword(passwordValue);

        const passwordRegex = /^[a-zA-Z0-9]+$/;
        if (!passwordRegex.test(passwordValue)) {
            setPasswordError("Password must contain alphabets and numbers");
        } else if (passwordValue.length < 8) {
            setPasswordError("Password must be at least 8 characters long");
        } else {
            setPasswordError("");
        }
    };

    const handleUsername = (e) => {
        const usernameValue = e.target.value;
        console.log("username to be set", usernameValue)
        setUserName(usernameValue);

        const usernameRegex = /^[A-Za-z\s]+$/;
        if (!usernameRegex.test(usernameValue)) {
            setUsernameError("Username must contain only letters and spaces");
        } else {
            setUsernameError("");
        }
    }

    const updateData = async () => {
        console.log(username, newPassword);
        try {
            const updateResponse = await updateUser(user._id, username, newPassword);
            if (!updateResponse) {
                alert("could not update user detail");
                return;
            }
            console.log("hello")
            console.log("updateResponse.data.username" ,updateResponse.username )
            setUser((prevUser) => ({
                ...prevUser, 
                username: updateResponse.username, 
              }));
              navigate('/home');
            console.log("user from usercontext", user)
            console.log("update response from backend", updateResponse);
        } catch (error) {
            console.log("error", error);

        }
    }

    return (
        <>
            <Navbar />
            <div>
                <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
                    <Col xs={24} sm={16} md={12} lg={8}>
                        <div className="form" style={{ border: "1px solid rgb(40, 60, 92)", padding: "20px", borderRadius: "5px" }}>
                            <Form className="create-form" >
                                <h1 className="form-heading">Edit your Profile</h1>

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
                                        defaultValue={user.username}
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
                                        // disabled
                                        defaultValue={user.email}
                                        onChange={handleEmail}
                                    />
                                </Form.Item>

                                <Form.Item
                                    style={{ width: "100%" }}
                                    label="New Password"
                                    validateStatus={passwordError ? "error" : ""}
                                    help={passwordError || ""}
                                    labelCol={{ span: 24 }}
                                    wrapperCol={{ span: 24 }}
                                >
                                    <Input.Password
                                        placeholder="New Password"
                                        onChange={handlePassword}
                                    />
                                </Form.Item>

                                <Form.Item>
                                    <Button
                                        style={{ backgroundColor: "navy", color: "white" }}
                                        className="custom-button"
                                        type="primary"
                                        htmlType="submit"
                                        block
                                        disabled={emailError || passwordError || usernameError}
                                        onClick={updateData}
                                    >
                                        Update
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </Col>
                </Row>


            </div>
        </>
    )
}

export default Profile