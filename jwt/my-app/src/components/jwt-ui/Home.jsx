import React, { useContext, useEffect, useState } from 'react';
import { apiRequest, fetchCurrentUser } from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import Navbar from '../jwt-ui/Navbar'
import { UserContext } from '../../context/UserContext';

const Home = () => {
  const [data, setData] = useState('Loading...');
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiRequest('/home', 'GET');
        setData(response.message);
        const token = localStorage.getItem('token');
         // make an api call to fetch profile data from backend
        // check if token present or not, 
        // if present then
        // post the token to backend
        // get user data as response from that api call
        // setuser using useContext
        try {
          const fetchCurrentUser = await fetchCurrentUser(token);
          if (!fetchCurrentUser) {
            console.error("No user found....need to logout")
            navigate('/login');
          }

          // if (fetchCurrentUser) {
            console.log("fetched data in home component : ", fetchCurrentUser);
            const fetchedUserfromDb = JSON.parse(fetchCurrentUser.userFound);
            setUser(fetchedUserfromDb);
            console.log("user set...")
          // }
        } catch (error) {
          console.error("error in fetching user data from db")
        }
       
      } catch (error) {
        console.log('Error fetching data:', error);
        setData(error.message || 'Failed to load data');
        navigate('/login');
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Navbar />
      <p style={{ display: "flex", justifyContent: "center", textAlign: "center", margin: "20px", padding: "20px" }}>{data}</p>
    </div>
  );
};

export default Home;
