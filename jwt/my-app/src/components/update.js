import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Checkbox, Form } from 'semantic-ui-react';



export default function Update() {
    const [id, setID] = useState(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [checkbox, setCheckbox] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        setID(localStorage.getItem('ID'));
        setFirstName(localStorage.getItem('First Name'));
        setLastName(localStorage.getItem('Last Name'));
        // setCheckbox(localStorage.getItem('Checkbox Value'));
        var checked = JSON.parse(localStorage.getItem('Checkbox Value'));
        if (checked == true) {
            setCheckbox(checked);
        }
    }, []);

    const updateAPIData = () => {
        axios.put(`https://6735a3dd5995834c8a937d4b.mockapi.io/dummyData/${id}`, {
            firstName,
            lastName,
            checkbox
        }).then(() => {
            navigate('/read');
        })
        console.log("checkbox", checkbox)
    }

    return (
        <div>
            <Form className="create-form">
                <Form.Field>
                    <label>First Name</label>
                    <input placeholder='First Name' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </Form.Field>
                <Form.Field>
                    <label>Last Name</label>
                    <input placeholder='Last Name' value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </Form.Field>
                <Form.Field>
                    <Checkbox label='I agree to the Terms and Conditions' onChange={() => setCheckbox(!checkbox)} checked={checkbox} />
                </Form.Field>
                <Button type='submit' onClick={updateAPIData}>Update</Button>
            </Form>
        </div>
    )
}