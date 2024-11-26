import axios from "axios";
import { message } from "antd";
const API_PATH = "http://localhost:8080/api";

export const postProduct = async ({ productDetails }) => {
  console.log("product body in postporduct:", productDetails);
  try {
    const response = await axios.post(`${API_PATH}/upload`, productDetails, {
      headers: { "Content-Type": "application/json" },
    });
    message.success("Product uploaded successfully");
    return response.data;
  } catch (error) {
    console.log("error", error);
    message.error("Error uploading product");
    throw error;
  }
};

// export const updateProduct = async ({ productDetails }) => {
//   console.log("product received in updateproduct", productDetails);
//   try {
//     const response = await axios.put(
//       `${API_PATH}/product-update/${productDetails._id}`,
//       productDetails,
//       {
//         headers: { "Content-Type": "application/json" },
//       }
//     );
//     message.success("Product updated successfully");
//     return response.data;
//   } catch (error) {
//     console.log("error in updating the product : ", error);
//     message.error("error in updating.....");
//     throw error;
//   }
// };

// export const deleteProduct = async ({ productDetails }) => {
//   console.log("product received for deleting", productDetails);
//   try {
//     const response = await axios.delete(
//       `${API_PATH}/product-delete`,
//       productDetails,
//       {
//         headers: { "Content-Type": "application/json" },
//       }
//     );
//     message.success("product deleted successfully");
//     return response.data;
//   } catch (error) {
//     console.log("error in deleting the product : ", error);
//     message.error("error in deleting..try after some time");
//     throw error;
//   }
// };


// export const deleteProduct = async ({ productDetails }) => {
//   console.log("product received for deleting", productDetails);
//   try {
//     const response = await axios.delete(
//       `${API_PATH}/product-delete/${productDetails._id}`,  // Correctly passing the ID in the URL
//       {
//         headers: { "Content-Type": "application/json" },
//       }
//     );
//     message.success("Product deleted successfully");
//     return response.data;  // Return the response data as needed
//   } catch (error) {
//     console.log("error in deleting the product : ", error);
//     message.error("Error in deleting product, try after some time");
//     throw error;
//   }
// };

export const updateProduct = async (updatedProduct) => {
  try {
    const response = await axios.put(
      `${API_PATH}/product-update/${updatedProduct._id}`,  // Use product ID in the URL
      { currentProduct: updatedProduct },  // Send the updated product as the body
      { headers: { "Content-Type": "application/json" } }
    );
    message.success("Product updated successfully");
    return response.data;
  } catch (error) {
    console.log("error in updating the product:", error);
    // message.error("Error in updating...");
    throw error;
  }
};
export const deleteProduct = async (productId) => {
  try {
    const response = await axios.delete(
      `${API_PATH}/product-delete/${productId}`,  // Use product ID in the URL
      { headers: { "Content-Type": "application/json" } }
    );
    message.success("Product deleted successfully");
    return response.data;
  } catch (error) {
    console.log("error in deleting the product:", error);
    message.error("Error in deleting...");
    throw error;
  }
}