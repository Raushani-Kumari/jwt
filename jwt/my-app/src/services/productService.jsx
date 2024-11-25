import axios from "axios";
import { message } from "antd";
const API_PATH = "http://localhost:8080/api";

export const postProduct = async ({ productDetails }) => {
  console.log("product body in postporduct:", productDetails)
  try {
    const response = await axios.post(
     `${API_PATH}/upload`,
      productDetails,
      {
        headers: { "Content-Type": "application/json" },
      },
     
    );
    message.success("Product uploaded successfully");
    return response.data; 
  } catch (error) {
    console.log("error",error)
    message.error("Error uploading product");
    throw error;
  }
};
