import React, { useState } from "react";
import { Button, Checkbox, Form } from 'semantic-ui-react';
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../services/authService";


export default function Signup() {
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
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

    const handleSignupData = async (e) => {
        console.log("username : ", username, " email : ", email, " password: ", password)
        e.preventDefault();
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
        <div className="container">

            <div className="form">
                <Form className="create-form">
                    <h1 className="form-heading">SIGN UP</h1>
                    <Form.Field className="margin-top">
                        <label>Username</label>
                        <input placeholder='Last Name' onChange={handleUsername} />
                    </Form.Field>
                    <span style={{ color: "red" }}>{usernameError}</span>
                    <Form.Field className="margin-top">
                        <label>Email </label>
                        <input placeholder='Email' onChange={handleEmail} />
                    </Form.Field>
                    <span style={{ color: "red" }}>{emailError}</span>
                    <Form.Field className="margin-top">
                        <label>Password</label>
                        <input placeholder='Password' onChange={handlePassword} />
                    </Form.Field>
                    <span style={{ color: "red" }}>{passwordError}</span>
                    <Form.Field className="margin-top">
                        <Checkbox label='I agree to the Terms and Conditions' onChange={(e) => setCheckbox(true)} />
                    </Form.Field>
                    <div className="btn-position">
                        <Button className="form-button" type='submit' onClick={handleSignupData}>Submit</Button>
                    </div>
                    <div style={{ textAlign: "center", margin: "4px" }}>
                        <span>Alreday a member ? <Link to='/login'>Login</Link></span>
                    </div>
                </Form>
            </div>
        </div>

    )
}