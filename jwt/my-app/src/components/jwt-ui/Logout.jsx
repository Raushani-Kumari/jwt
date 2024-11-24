import React, { useContext } from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated, removeLoginToken } from '../../services/authService';
import { UserContext } from '../../context/UserContext';
import { AuthModelContext } from '../../context/AuthModelContext';

const Logout = () => {
    const navigate = useNavigate();
    const {setUser} = useContext(UserContext);
    const {setShowAuthModel } = useContext(AuthModelContext);
    const handleLogout = async () => {
        try {
            removeLoginToken();
            setUser({isAuthenticated:false});
            setShowAuthModel(false)
            console.log("logged out...");
            navigate('/')
        } catch (error) {
            console.log("error in logout", error)

        }

    }
    return (
        <>
            <div onClick={handleLogout}>Logout</div>
        </>
    )
}

export default Logout;