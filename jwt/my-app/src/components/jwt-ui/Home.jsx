import React, { useEffect, useState } from 'react';
import { apiRequest } from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import Navbar from '../jwt-ui/Navbar'

const Home = () => {
  const [data, setData] = useState('Loading...');
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Home use Effect");
    
    const fetchData = async () => {
      try {
        const response = await apiRequest('/home', 'GET');
        setData(response.message);
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
      <p>{data}</p>
    </div>
  );
};

export default Home;
