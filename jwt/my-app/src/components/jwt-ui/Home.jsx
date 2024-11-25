import React, { useContext, useEffect, useState } from "react";
import { apiRequest, fetchCurrentUser } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import Navbar from "../jwt-ui/Navbar";
import { UserContext } from "../../context/UserContext";

const Home = () => {
  const [data, setData] = useState("Loading...");
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiRequest("/home", "GET");
        setData(response.message);
      } catch (error) {
        console.log("Error fetching data:", error);
        setData(error.message || "Failed to load data");
        navigate("/login");
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <p
        style={{
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
          margin: "20px",
          padding: "20px",
        }}
      >
        {data}
      </p>
    </div>
  );
};

export default Home;
