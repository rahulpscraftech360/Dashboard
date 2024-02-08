import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const getUser = async () => {
    try {
      const response = await axios.get("http://localhost:3001/login/success", {
        withCredentials: true,
      });
      console.log("response", response);
    } catch (error) {
      console.error("An error occurred:", error.response || error.message);

      if (error.response && error.response.status === 401) {
        // Handle unauthorized access
        navigate("/login");
      } else {
        // Handle other errors
        navigate("*");
      }
    }
  };

  useEffect(() => {
    getUser();
  }, []);
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Dashboard</h1>
    </div>
  );
};

export default Dashboard;
