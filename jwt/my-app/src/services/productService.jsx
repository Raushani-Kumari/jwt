import axios from "axios";
const API_PATH = "http://localhost:8080/api/product";

export const postProduct = async ({ productDetails }) => {
  try {
    const response = await axios.post(`${API_PATH}/addproduct`, {
      productDetails,
    });
    console.log(
      "response after sending product data to backend ",
      response.data
    );
    return response.data;
  } catch (error) {
    console.error("error in adding product", error);
  }
};

