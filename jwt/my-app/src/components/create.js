import React, { useState } from "react";
import { Button, Checkbox, Form } from 'semantic-ui-react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function Create() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [checkbox, setCheckbox] = useState(false);

    const navigate = useNavigate();

    const postFormData = () => {
        axios.post('https://6735a3dd5995834c8a937d4b.mockapi.io/dummyData', {
           firstName, lastName, checkbox
        }).then(() => {
            navigate('/read');
        })
    }

    return (
        <Form className="create-form">
            <Form.Field>
                <label>First Name</label>
                <input placeholder='First Name' onChange={(e) => setFirstName(e.target.value)} />
            </Form.Field>
            <Form.Field>
                <label>Last Name</label>
                <input placeholder='Last Name' onChange={(e) => setLastName(e.target.value)}/>
            </Form.Field>
            <Form.Field>
                <Checkbox label='I agree to the Terms and Conditions'onChange={(e) => setCheckbox(true)}/>
            </Form.Field>
            <Button type='submit' onClick={postFormData}>Submit</Button>
        </Form>
    )
}