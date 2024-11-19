import React from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { removeLoginToken } from '../../services/authService';

const Logout = () => {
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            removeLoginToken();
            console.log("logged out...");
            navigate('/login')
        } catch (error) {
            console.log("error in logout", error)

        }

    }
    return (
        <>
            <Button onClick={handleLogout} sx={{ color: "navy" }}>Logout</Button>
        </>
    )
}

export default Logout